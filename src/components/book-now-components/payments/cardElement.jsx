'use client'
import React from "react"
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';


export default function CardElementStripe() {
    return(
         <CardElement
                    options={{
                      style: {
                        base: { fontSize: '16px', color: '#000' },
                        invalid: { color: 'red' },
                      },
                      hidePostalCode: true,
                    }}
                  />
    )
}