'use server'

import { createClient } from '@/utils/supabase/server'
import { stripe } from '@/utils/stripe/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function createCheckoutSession(formData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('You must be logged in to subscribe')
  }

  const planType = formData.get('plan_type')

  let unitAmount = 0
  let interval = 'month'

  if (planType === 'monthly') {
    unitAmount = 1500
    interval = 'month'
  } else if (planType === 'yearly') {
    unitAmount = 15000
    interval = 'year'
  } else {
    throw new Error('Invalid plan type selected')
  }

  const headersList = await headers()
  const origin =
    headersList.get('origin') ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'http://localhost:3000'

  let session

  try {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      client_reference_id: user.id,
      subscription_data: {
        metadata: { userId: user.id },
      },
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
    })
  } catch (error) {
    console.error('Stripe Error:', error)
    redirect('/subscribe?error=Could not create checkout session')
  }

  if (session.url) {
    redirect(session.url)
  }
}