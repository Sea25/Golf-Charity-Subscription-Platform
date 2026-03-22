import Stripe from 'stripe'
<<<<<<< HEAD
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' })
=======

// Initialize Stripe with the secret key from .env.local
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Always specify a stable API version
})
>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c
