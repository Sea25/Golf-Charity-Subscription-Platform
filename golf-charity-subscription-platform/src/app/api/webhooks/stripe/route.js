import { NextResponse } from 'next/server'
import { stripe } from '@/utils/stripe/server'
import { supabaseAdmin } from '@/utils/supabase/admin'

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
    console.error(`⚠️ Webhook error: ${err.message}`)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  console.log(`🔔 Webhook accepted! Event type: ${event.type}`)

  // ✅ Checkout completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    if (session.client_reference_id && session.customer) {
      const { error } = await supabaseAdmin
        .from('profiles')
        .update({ stripe_customer_id: session.customer })
        .eq('id', session.client_reference_id)

      if (error) {
        console.error('❌ Failed to update profile:', error.message)
      }

      if (session.subscription) {
        try {
          const sub = await stripe.subscriptions.retrieve(session.subscription)

          const planType =
            sub.items.data[0].plan.interval === 'month'
              ? 'monthly'
              : 'yearly'

          const { error: subErr } = await supabaseAdmin
            .from('subscriptions')
            .upsert({
              id: sub.id,
              user_id: session.client_reference_id,
              status: sub.status,
              plan_type: planType,
              current_period_start: new Date(
                sub.current_period_start * 1000
              ).toISOString(),
              current_period_end: new Date(
                sub.current_period_end * 1000
              ).toISOString(),
              cancel_at_period_end: sub.cancel_at_period_end,
            })

          if (subErr) {
            console.error('❌ Failed to upsert subscription:', subErr.message)
          }
        } catch (err) {
          console.error('⚠️ Subscription fetch error:', err.message)
        }
      }
    }
  }

  // ✅ Subscription updates
  if (
    event.type === 'customer.subscription.created' ||
    event.type === 'customer.subscription.updated' ||
    event.type === 'customer.subscription.deleted'
  ) {
    const sub = event.data.object

    let userId = sub.metadata?.userId

    if (!userId) {
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .eq('stripe_customer_id', sub.customer)
        .single()

      if (profile) userId = profile.id
    }

    if (!userId) {
      console.error('⚠️ No user found for subscription')
    } else {
      const planType =
        sub.items.data[0].plan.interval === 'month'
          ? 'monthly'
          : 'yearly'

      const { error } = await supabaseAdmin
        .from('subscriptions')
        .upsert({
          id: sub.id,
          user_id: userId,
          status: sub.status,
          plan_type: planType,
          current_period_start: new Date(
            sub.current_period_start * 1000
          ).toISOString(),
          current_period_end: new Date(
            sub.current_period_end * 1000
          ).toISOString(),
          cancel_at_period_end: sub.cancel_at_period_end,
        })

      if (error) {
        console.error('❌ Subscription upsert failed:', error.message)
      }
    }
  }

  return NextResponse.json({ received: true })
}