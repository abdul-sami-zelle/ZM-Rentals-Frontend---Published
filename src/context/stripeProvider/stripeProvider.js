'use client'

import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe("pk_live_51RzPJtLHKTsmFWu4TRAYiMlGuhftPaPU8ZwcAkCX0fpdUcpQaMbvfIWawYYz6hczduRGsK6fTRBagR88hHPYEdvR00DahtPoma")

// const stripePromise = loadStripe("pk_test_51RzPKGPsOkyCJsOveVe2iXArEXyZTYupPN5zbOYMvILMhFVxPfEdDsFYDid0P4Z61i9ylFwqt8af4Od1nlfXs3GZ00WUs6b2h5")

export default function StripeProvider({ children }) {
  return <Elements stripe={stripePromise}>{children}</Elements>
}