/**
 * Client-side product details with image gallery and add-to-cart behaviour.
 * Added to enhance the product page with richer interactions.
 * Consumed by app/product/[id]/page.tsx.
 */
'use client'

import { useState } from 'react'
import { addToCart } from '../../lib/cart'
import ProductGallery from '../molecules/ProductGallery'
import type { Product } from '../../types'

/** Props for {@link ProductDetail}. */
export interface ProductDetailProps {
  /** Product to display. */
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [added, setAdded] = useState(false)

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">{product.name}</h1>
      <ProductGallery images={product.images} />
      <p>{product.description}</p>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => {
          addToCart(product)
          setAdded(true)
        }}
      >
        {added ? 'Added!' : 'Add to Cart'}
      </button>
    </div>
  )
}
