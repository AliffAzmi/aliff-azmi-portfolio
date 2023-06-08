import { json } from '@sveltejs/kit'
import Stripe from 'stripe'
import {
  SECRET_STRIPE_KEY,
  PUBLIC_CONNECTED_ACCOUNT_ID
} from '$env/static/private'

const stripe = new Stripe(SECRET_STRIPE_KEY)

export async function POST ({ request }) {
  const { amount, paymentID } = await request.json()

  const paymentIntent = await stripe.paymentIntents.update(
    paymentID,
    {
      amount,
      currency: 'myr',
      // payment_method_types: ['card', 'fpx', 'grabpay']
      automatic_payment_methods: {
        enabled: true
      }
    },
    {
      stripeAccount: PUBLIC_CONNECTED_ACCOUNT_ID
    }
  )

  return json({
    paymentMethodId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret
  })
}
