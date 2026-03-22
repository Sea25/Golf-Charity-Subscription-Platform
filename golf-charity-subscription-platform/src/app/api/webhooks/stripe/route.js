import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/utils/stripe/server'
import { supabaseAdmin } from '@/utils/supabase/admin'

export async function POST(req) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  let event

  // 1. Verify the Stripe Webhook Signature is legit
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error.message)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  try {
    // 2. Handle the "Checkout Completed" event
    // This happens the first time they ever buy a subscription using our Checkout Page
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const userId = session.client_reference_id
      const customerId = session.customer

      // Save their Stripe Customer ID to their Supabase Profile!
      if (userId && customerId) {
        await supabaseAdmin
          .from('profiles')
          .update({ stripe_customer_id: customerId })
          .eq('id', userId)
      }
    }

    // 3. Handle Subscription Updates (Renewals, Cancellations, Status changes)
    if (
      event.type === 'customer.subscription.created' ||
      event.type === 'customer.subscription.updated' ||
      event.type === 'customer.subscription.deleted'
    ) {
      const subscription = event.data.object

      // First, find out WHICH user this subscription belongs to based on the Stripe customer ID
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .eq('stripe_customer_id', subscription.customer)
        .single()

      if (profile) {
        const planType = subscription.items.data[0].plan.interval === 'month' ? 'monthly' : 'yearly'
        
        // Save the current state to the subscriptions table!
        await supabaseAdmin
          .from('subscriptions')
          .upsert({
            id: subscription.id,
            user_id: profile.id,
            status: subscription.status,
            plan_type: planType,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
          })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler failed:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
