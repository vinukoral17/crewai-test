/**
 * Client-side category filter controls.
 * Introduces price, size and color filters that sync state with the URL query string.
 * Used by app/category/[slug]/page.tsx.
 */
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

/** Available filter options. In a real app these would be data-driven. */
const sizes = ['S', 'M', 'L']
const colors = ['red', 'blue', 'green']

/**
 * Renders simple select elements for price, size and color.
 * On change, updates the URL without a full page reload.
 */
export default function CategoryFilters() {
  const router = useRouter()
  const params = useSearchParams()

  // Helper to update query string whilst preserving other params
  const updateParam = useCallback(
    (key: string, value: string) => {
      const search = new URLSearchParams(params.toString())
      if (value) search.set(key, value)
      else search.delete(key)
      router.replace(`?${search.toString()}`)
    },
    [router, params]
  )

  return (
    <form className="flex flex-wrap gap-4" aria-label="Category filters">
      {/* Price range filter */}
      <label className="flex flex-col">
        <span className="text-sm">Max Price</span>
        <input
          type="number"
          className="border p-1"
          defaultValue={params.get('max') || ''}
          onChange={e => updateParam('max', e.target.value)}
        />
      </label>
      {/* Size filter */}
      <label className="flex flex-col">
        <span className="text-sm">Size</span>
        <select
          className="border p-1"
          defaultValue={params.get('size') || ''}
          onChange={e => updateParam('size', e.target.value)}
        >
          <option value="">Any</option>
          {sizes.map(s => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>
      {/* Color filter */}
      <label className="flex flex-col">
        <span className="text-sm">Color</span>
        <select
          className="border p-1"
          defaultValue={params.get('color') || ''}
          onChange={e => updateParam('color', e.target.value)}
        >
          <option value="">Any</option>
          {colors.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
    </form>
  )
}
