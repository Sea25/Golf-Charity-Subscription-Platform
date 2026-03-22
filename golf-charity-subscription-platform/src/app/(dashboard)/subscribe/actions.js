'use server'
import { createClient } from '@/utils/supabase/server'
import { stripe } from '@/utils/stripe/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function createCheckoutSession(formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const planType = formData.get('plan_type')
  const unitAmount = planType === 'monthly' ? 1500 : 15000
  const interval = planType === 'monthly' ? 'month' : 'year'

  const headersList = await headers()
  const origin = headersList.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  let session
  try {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      client_reference_id: user.id,
      subscription_data: {
        metadata: { userId: user.id }
      },
      line_items: [{
        price_data: { currency: 'usd', product_data: { name: `Impact Golf - ${planType} Plan` }, unit_amount: unitAmount, recurring: { interval } },
        quantity: 1
      }],
      success_url: `${origin}/dashboard?success=true`, cancel_url: `${origin}/subscribe?canceled=true`
    })
  } catch (error) {
    console.error(error)
    redirect('/subscribe?error=failed')
  }
  if (session.url) redirect(session.url)
}
