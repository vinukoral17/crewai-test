/**
 * Basic behavioural tests for components and utilities introduced in this change.
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import { validatePromo } from '../lib/cart'

describe('ui enhancements', () => {
  it('header uses sticky positioning', () => {
    const src = fs.readFileSync('components/layout/Header.tsx', 'utf8')
    expect(src).toMatch(/sticky/)
  })

  it('promo code SAVE10 yields 10% discount', () => {
    expect(validatePromo('SAVE10')).toBe(0.1)
    expect(validatePromo('other')).toBe(0)
  })
})
