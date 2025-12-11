'use client'

import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe("pk_live_51RzPJtLHKTsmFWu4TRAYiMlGuhftPaPU8ZwcAkCX0fpdUcpQaMbvfIWawYYz6hczduRGsK6fTRBagR88hHPYEdvR00DahtPoma")

export default function StripeProvider({ children }) {
  return <Elements stripe={stripePromise}>{children}</Elements>
}