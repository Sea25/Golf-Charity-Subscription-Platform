import Stripe from 'stripe'

// Initialize Stripe with the secret key from .env.local
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Always specify a stable API version
})
