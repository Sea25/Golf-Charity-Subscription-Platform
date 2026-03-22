'use server'

import { createClient } from '@/utils/supabase/server'
import { stripe } from '@/utils/stripe/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function createCheckoutSession(formData) {
  const supabase = await createClient()

  // 1. Check if user is logged in
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('You must be logged in to subscribe')
  }

  const planType = formData.get('plan_type') // Expects 'monthly' or 'yearly'
  
  // 2. Set Prices (In Cents - $10.00 = 1000)
  let unitAmount = 0
  let interval = 'month'
  
  if (planType === 'monthly') {
    unitAmount = 1500 // $15 per month
    interval = 'month'
  } else if (planType === 'yearly') {
    unitAmount = 15000 // $150 per year (discounted)
    interval = 'year'
  } else {
    throw new Error('Invalid plan type selected')
  }

  // 3. Create Stripe Checkout Session
  // We use inline price data so you don't have to manually create products in the Stripe Dashboard!
  const headersList = await headers()
  const origin = headersList.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  let session
  try {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Impact Golf - ${planType.charAt(0).toUpperCase() + planType.slice(1)} Subscription`,
              description: 'Access to Monthly Draws and Game Tracking',
            },
            unit_amount: unitAmount,
            recurring: {
              interval: interval,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/dashboard?success=true`,
      cancel_url: `${origin}/subscribe?canceled=true`,
      // We pass the user ID in metadata so the webhook knows who paid!
      client_reference_id: user.id,
    })
  } catch (error) {
    console.error("Stripe Error: ", error)
    redirect('/subscribe?error=Could not create checkout session')
  }

  // 4. Redirect the user to Stripe's hosted checkout page
  if (session.url) {
    redirect(session.url)
  }
}
