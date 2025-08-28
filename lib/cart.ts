/**
 * Utilities for managing the cart in localStorage.
 * Extended with promo code validation to support discount placeholders.
 */
import type { Product, CartItem } from '../types'

const STORAGE_KEY = 'crew_cart'

/** Retrieve all cart items from localStorage. */
export function getCart(): CartItem[] {
  if (typeof localStorage === 'undefined') return []
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

/** Add a product to the cart or increment quantity if it exists. */
export function addToCart(product: Product) {
  if (typeof localStorage === 'undefined') return
  const cart = getCart()
  const existing = cart.find(item => item.id === product.id)
  if (existing) {
    existing.quantity += 1
  } else {
    cart.push({ ...product, quantity: 1 })
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
}

/** Remove an item from the cart by id. */
export function removeFromCart(id: string) {
  if (typeof localStorage === 'undefined') return
  const cart = getCart().filter(item => item.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
}

/** Clear the cart entirely. */
export function clearCart() {
  if (typeof localStorage === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

/**
 * Mock promo code validation.
 * @param code - code entered by the user
 * @returns discount fraction (0.1 for 10%)
 */
export function validatePromo(code: string): number {
  return code.trim().toUpperCase() === 'SAVE10' ? 0.1 : 0
}
