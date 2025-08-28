/**
 * Checkout page managing a multi-step form.
 * Includes progress indicator and validations for shipping and payment details.
 * Checkout FSM:
 *   shipping → payment → review → success
 */
'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import type { Metadata } from 'next'
import { getCart, clearCart } from '../../lib/cart'

/** Metadata for the checkout flow. */
export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your purchase'
}

const shippingSchema = z.object({
  name: z.string().min(1, 'Name required'),
  address: z.string().min(1, 'Address required')
})
const paymentSchema = z.object({
  card: z.string().min(16, 'Card must be 16 digits')
})

export default function CheckoutPage() {
  const params = useSearchParams()
  const router = useRouter()
  const step = params.get('step') || 'shipping'
  const [shipping, setShipping] = useState({ name: '', address: '' })
  const [payment, setPayment] = useState({ card: '' })
  const [errors, setErrors] = useState<string | null>(null)

  const handleShipping = (e: React.FormEvent) => {
    e.preventDefault()
    const result = shippingSchema.safeParse(shipping)
    if (result.success) {
      setErrors(null)
      router.push('/checkout?step=payment')
    } else {
      setErrors(result.error.issues[0]?.message)
    }
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    const result = paymentSchema.safeParse(payment)
    if (result.success) {
      setErrors(null)
      router.push('/checkout?step=review')
    } else {
      setErrors(result.error.issues[0]?.message)
    }
  }

  const handleSubmit = async () => {
    await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ items: getCart(), shipping, payment })
    })
    clearCart()
    router.push('/order/success')
  }

  const steps = ['shipping', 'payment', 'review']

  return (
    <main className="p-4 space-y-4">
      {/* <auto-gen start: crew-site-mimicker> */}
      {/* Progress indicator */}
      <ol className="flex gap-2" aria-label="Checkout progress">
        {steps.map(s => (
          <li
            key={s}
            className={`flex-1 border-b-2 pb-1 text-center ${step === s ? 'border-blue-600' : 'border-gray-300'}`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </li>
        ))}
      </ol>
      {errors && <p className="text-sm text-red-600">{errors}</p>}
      {step === 'shipping' && (
        <form onSubmit={handleShipping} className="space-y-2">
          <input
            className="border p-2 w-full"
            placeholder="Name"
            value={shipping.name}
            onChange={e => setShipping({ ...shipping, name: e.target.value })}
          />
          <input
            className="border p-2 w-full"
            placeholder="Address"
            value={shipping.address}
            onChange={e => setShipping({ ...shipping, address: e.target.value })}
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit">
            Next
          </button>
        </form>
      )}
      {step === 'payment' && (
        <form onSubmit={handlePayment} className="space-y-2">
          <input
            className="border p-2 w-full"
            placeholder="Card"
            value={payment.card}
            onChange={e => setPayment({ card: e.target.value })}
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit">
            Next
          </button>
        </form>
      )}
      {step === 'review' && (
        <div className="space-y-2">
          <p>Review your order.</p>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={handleSubmit}
          >
            Place order
          </button>
        </div>
      )}
      {/* <auto-gen end: crew-site-mimicker> */}
    </main>
  )
}
