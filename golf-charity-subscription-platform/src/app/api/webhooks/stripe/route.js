import { NextResponse } from 'next/server'
import { stripe } from '@/utils/stripe/server'
import { supabaseAdmin } from '@/utils/supabase/admin'

// Ensure a profile row exists - create it if the trigger missed it
async function ensureProfile(userId) {
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('id')
    .eq('id', userId)
    .maybeSingle()

  if (profile) return true

  console.log(`⚠️ Profile missing for ${userId} — auto-creating from auth...`)

  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.getUserById(userId)

  if (authError || !authData?.user) {
    console.error(`❌ Could not fetch auth user ${userId}:`, authError?.message)
    return false
  }

  const authUser = authData.user

  const { error: insertError } = await supabaseAdmin
    .from('profiles')
    .insert({
      id: authUser.id,
      email: authUser.email,
      full_name: authUser.user_metadata?.full_name || null,
      role: 'user',
    })

  if (insertError) {
    console.error(`❌ Failed to create profile for ${userId}:`, insertError.message)
    return false
  }

  console.log(`✅ Auto-created profile for user ${userId}`)
  return true
}

// Safely convert Stripe timestamp to ISO string
function stripeTimestampToISO(ts) {
  if (!ts) return null
  // If it looks like seconds (< year 3000 in ms), multiply by 1000
  // Unix seconds for year 3000 = ~32503680000, so anything < 1e12 is seconds
  const ms = ts < 1e12 ? ts * 1000 : ts
  const d = new Date(ms)
  if (isNaN(d.getTime())) return null
  return d.toISOString()
}

// Upsert subscription - auto-creates profile if missing
async function upsertSubscription(sub, userId) {
  if (!userId) {
    console.error('⚠️ No userId provided for subscription upsert')
    return
  }

  // Ensure profile exists (auto-create if trigger missed it)
  const profileReady = await ensureProfile(userId)
  if (!profileReady) {
    console.error(`❌ Cannot upsert subscription - profile unavailable for ${userId}`)
    return
  }

  const planType =
    sub.items?.data?.[0]?.plan?.interval === 'month' ? 'monthly' : 'yearly'

  const periodStart = stripeTimestampToISO(sub.current_period_start)
  const periodEnd = stripeTimestampToISO(sub.current_period_end)

  if (!periodStart || !periodEnd) {
    console.error('❌ Invalid period timestamps:', sub.current_period_start, sub.current_period_end)
    return
  }

  const { error } = await supabaseAdmin
    .from('subscriptions')
    .upsert({
      id: sub.id,
      user_id: userId,
      status: sub.status,
      plan_type: planType,
      current_period_start: periodStart,
      current_period_end: periodEnd,
      cancel_at_period_end: sub.cancel_at_period_end ?? false,
    })

  if (error) {
    console.error('❌ Subscription upsert failed:', error.message)
  } else {
    console.log(`✅ Subscription ${sub.id} upserted for user ${userId} (${sub.status})`)
  }
}

export async function POST(req) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error(`⚠️ Webhook signature error: ${err.message}`)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  console.log(`🔔 Webhook accepted! Event type: ${event.type}`)

  // ✅ Checkout completed - link Stripe customer to Supabase user
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const userId = session.client_reference_id
    const customerId = session.customer

    if (userId && customerId) {
      // Ensure profile exists FIRST before anything else
      await ensureProfile(userId)

      // Update profile with Stripe customer ID
      const { error } = await supabaseAdmin
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', userId)

      if (error) {
        console.error('❌ Failed to update profile with customer ID:', error.message)
      } else {
        console.log(`✅ Linked Stripe customer ${customerId} to user ${userId}`)
      }

      // Handle subscription from checkout
      if (session.subscription) {
        try {
          const sub = await stripe.subscriptions.retrieve(session.subscription)
          await upsertSubscription(sub, userId)
        } catch (err) {
          console.error('⚠️ Error retrieving subscription from checkout:', err.message)
        }
      }
    } else {
      console.warn('⚠️ checkout.session.completed missing client_reference_id or customer')
    }
  }

  // ✅ Subscription lifecycle events
  if (
    event.type === 'customer.subscription.created' ||
    event.type === 'customer.subscription.updated' ||
    event.type === 'customer.subscription.deleted'
  ) {
    const sub = event.data.object

    // Try to get userId from metadata first
    let userId = sub.metadata?.userId

    // Fall back to looking up by Stripe customer ID
    if (!userId) {
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .eq('stripe_customer_id', sub.customer)
        .maybeSingle()

      if (profile) {
        userId = profile.id
      } else {
        console.warn(`⚠️ No profile found for Stripe customer ${sub.customer}. Subscription not saved.`)
      }
    }

    await upsertSubscription(sub, userId)
  }

  return NextResponse.json({ received: true })
}