/**
 * Mock product catalogue used throughout the demo application.
 * Extended with placeholder image URLs to support the gallery component.
 */
import type { Product } from '../types'

/** Example products. Real implementations would fetch from an API. */
export const products: Product[] = [
  {
    id: '1',
    name: 'Sample Cruise',
    description: 'A relaxing cruise.',
    price: 999,
    images: [
      'https://via.placeholder.com/800x400?text=Cruise+1',
      'https://via.placeholder.com/800x400?text=Deck',
      'https://via.placeholder.com/800x400?text=Cabin'
    ]
  },
  {
    id: '2',
    name: 'Adventure Cruise',
    description: 'Adventure on the sea.',
    price: 1299,
    images: [
      'https://via.placeholder.com/800x400?text=Adventure+1',
      'https://via.placeholder.com/800x400?text=Excursion'
    ]
  }
]

/**
 * Retrieve a product by id.
 * @param id - product identifier
 * @returns the matching product or undefined
 */
export function getProduct(id: string) {
  return products.find(p => p.id === id)
}
