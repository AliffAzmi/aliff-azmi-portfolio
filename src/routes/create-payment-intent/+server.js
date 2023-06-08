import { json } from '@sveltejs/kit'
import Stripe from 'stripe'
import {
  SECRET_STRIPE_KEY,
  PUBLIC_CONNECTED_ACCOUNT_ID
} from '$env/static/private'

const stripe = new Stripe(SECRET_STRIPE_KEY)

export async function POST ({ request }) {
  // const paymentIntent = await stripe.checkout.sessions.create({
  //   line_items: [
  //     {
  //       price_data: {
  //         currency: 'myr',
  //         product_data: {
  //           name: 'donate'
  //         },
  //         unit_amount: 1000
  //       },
  //       quantity: 1
  //     }
  //   ],
  //   mode: 'payment',
  //   success_url: 'http://localhost:4242/success',
  //   cancel_url: 'http://localhost:4242/cancel'
  // })

  const { amount } = await request.json()

  const paymentIntent = await stripe.paymentIntents.create(
    {
      amount,
      currency: 'myr',
      // payment_method_types: ['card', 'fpx', 'grabpay']
      // automatic_payment_methods: { enabled: true }
      // confirm: true,
      // return_url: 'http://localhost/return'
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
