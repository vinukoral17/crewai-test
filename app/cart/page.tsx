/**
 * Cart page displaying items and allowing simple promo code entry.
 * Promo code logic is mocked to demonstrate line-item discounts.
 * Flow: browse → cart → checkout
 */
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getCart, removeFromCart, validatePromo } from '../../lib/cart'
import type { CartItem } from '../../types'

/** Metadata for the cart page. */
export const metadata: Metadata = {
  title: 'Cart',
  description: 'Your selected items'
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [promo, setPromo] = useState('')
  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    setItems(getCart())
  }, [])

  const handleRemove = (id: string) => {
    removeFromCart(id)
    setItems(getCart())
  }

  const applyPromo = () => {
    // validatePromo returns fractional discount (e.g., 0.1 for 10%)
    setDiscount(validatePromo(promo))
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <main className="p-4 space-y-4">
      {/* <auto-gen start: crew-site-mimicker> */}
      <h1 className="text-xl font-bold">Cart</h1>
      {items.length === 0 && <p>Your cart is empty.</p>}
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item.id} className="flex justify-between">
            <span>{item.name} x {item.quantity}</span>
            <button className="text-sm text-red-600" onClick={() => handleRemove(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      {/* Promo code entry */}
      <div className="flex gap-2 items-center">
        <input
          className="border p-2 flex-1"
          placeholder="Promo code"
          value={promo}
          onChange={e => setPromo(e.target.value)}
        />
        <button
          className="px-3 py-2 bg-gray-200"
          onClick={applyPromo}
        >
          Apply
        </button>
      </div>
      {promo && discount === 0 && <p className="text-sm text-red-600">Invalid code</p>}
      <p className="font-semibold">Total: ${'{'}(total * (1 - discount)).toFixed(2){'}'}</p>
      <Link href="/checkout?step=shipping" className="px-4 py-2 bg-blue-600 text-white rounded">Checkout</Link>
      {/* <auto-gen end: crew-site-mimicker> */}
    </main>
  )
}
