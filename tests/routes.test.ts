/**
 * Ensures key route and component files exist so the scaffolded app renders correctly.
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const files = [
  // pages
  'app/(routes)/(home)/page.tsx',
  'app/category/[slug]/page.tsx',
  'app/product/[id]/page.tsx',
  'app/cart/page.tsx',
  'app/checkout/page.tsx',
  'app/order/success/page.tsx',
  // components added in this change
  'components/organisms/Hero.tsx',
  'components/molecules/CategoryFilters.tsx',
  'components/molecules/ProductGallery.tsx',
  'components/organisms/ProductDetail.tsx'
]

describe('scaffolded files', () => {
  files.forEach(f => {
    it(`${f} exists`, () => {
      expect(fs.existsSync(path.join(__dirname, '..', f))).toBe(true)
    })
  })
})
