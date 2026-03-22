import { NextResponse } from 'next/server'
import { stripe } from '@/utils/stripe/server'
import { supabaseAdmin } from '@/utils/supabase/admin'

export async function POST(req) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')
  let event

  try { 
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET) 
  } catch (err) { 
    console.error(`⚠️ Webhook error: ${err.message}`)
    console.error(`1️⃣ Signature: ${sig}`)
    console.error(`2️⃣ Secret available? ${!!process.env.STRIPE_WEBHOOK_SECRET}`)
    console.error(`3️⃣ Body length: ${body?.length}`)
    return NextResponse.json({ error: err.message }, { status: 400 }) 
  }

  console.log(`🔔 Webhook accepted! Event type: ${event.type}`)

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    if (session.client_reference_id && session.customer) {
      const { error } = await supabaseAdmin.from('profiles').update({ stripe_customer_id: session.customer }).eq('id', session.client_reference_id)
      if (error) {
        console.error('❌ Failed to update profile with customer ID:', error.message)
      } else {
        console.log(`✅ Profile updated with Stripe customer ID: ${session.customer}`)
      }

      // Fix race condition: Insert subscription immediately using checkout session data
      if (session.subscription) {
        try {
          const sub = await stripe.subscriptions.retrieve(session.subscription)
          const planType = sub.items.data[0].plan.interval === 'month' ? 'monthly' : 'yearly'
          const { error: subErr } = await supabaseAdmin.from('subscriptions').upsert({
            id: sub.id, user_id: session.client_reference_id, status: sub.status, plan_type: planType,
            current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
            current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
            cancel_at_period_end: sub.cancel_at_period_end
          })
          if (subErr) console.error('❌ Failed to upsert subscription from checkout:', subErr.message)
          else console.log(`✅ Subscription ${sub.id} explicitly created from checkout session!`)
        } catch (subFetchErr) {
          console.error(`⚠️ Could not retrieve subscription ${session.subscription}:`, subFetchErr.message)
        }
      }
    } else {
      console.warn('⚠️ Missing client_reference_id or customer in session')
    }
  }

  if (['customer.subscription.created', 'customer.subscription.updated', 'customer.subscription.deleted'].includes(event.type)) {
    const sub = event.data.object
    
    // 1. Try metadata first (most reliable, avoids race condition!)
    let userId = sub.metadata?.userId
    
    // 2. Fallback to profile lookup
    if (!userId) {
      const { data: profile } = await supabaseAdmin.from('profiles').select('id').eq('stripe_customer_id', sub.customer).single()
      if (profile) userId = profile.id
    }
    
    if (!userId) {
      console.error(`⚠️ Cannot find user for subscription. Metadata missing and profile not found for customer: ${sub.customer}`)
    } else {
      const planType = sub.items.data[0].plan.interval === 'month' ? 'monthly' : 'yearly'
      const { error: upsertError } = await supabaseAdmin.from('subscriptions').upsert({
        id: sub.id, user_id: userId, status: sub.status, plan_type: planType,
        current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
        current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
        cancel_at_period_end: sub.cancel_at_period_end
      })
      if (upsertError) {
        console.error('❌ Failed to upsert subscription in sub event:', upsertError.message)
      } else {
        console.log(`✅ Subscription ${sub.id} upserted securely via ${event.type}. Status: ${sub.status}`)
      }
    }
  }
  return NextResponse.json({ received: true })
}
