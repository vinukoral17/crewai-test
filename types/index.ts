/**
 * Minimal representation of a product used across pages and APIs.
 * Expanded with an image list so the gallery can render placeholders.
 */
export interface Product {
  /** Product identifier */
  id: string
  /** Display name */
  name: string
  /** Short description */
  description: string
  /** Unit price in USD */
  price: number
  /** URLs of product images */
  images: string[]
}

export interface CartItem extends Product {
  quantity: number
}
