import Stripe from 'stripe'

// Do NOT instantiate Stripe at module scope.
// During Vercel build, env vars are not available and it will crash.
// Use getStripe() everywhere instead — it only runs at request time.

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error(
      'STRIPE_SECRET_KEY is not set. Add it to your environment variables.'
    )
  }
  return new Stripe(key, {
    apiVersion: '2023-10-16',
  })
}