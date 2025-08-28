/**
 * Sticky site header with a mega-menu stub and basic focus management.
 * Allows navigation and demonstrates accessible menu patterns.
 */
'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export function Header() {
  const [open, setOpen] = useState(false)
  const firstItemRef = useRef<HTMLAnchorElement>(null)

  // Close menu on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  // When menu opens, focus first item for accessibility
  useEffect(() => {
    if (open) firstItemRef.current?.focus()
  }, [open])

  return (
    <header className="sticky top-0 z-50 bg-gray-100 p-4">
      {/* <auto-gen start: crew-site-mimicker> */}
      <nav aria-label="Main navigation" className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/cart">Cart</Link>
        {/* Mega-menu stub */}
        <div className="relative">
          <button
            aria-haspopup="true"
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
            className="focus:outline-none"
          >
            Menu
          </button>
          {open && (
            <div className="absolute left-0 mt-2 w-40 bg-white p-2 shadow" role="menu">
              <Link
                href="/category/cruises"
                className="block px-2 py-1"
                role="menuitem"
                ref={firstItemRef}
              >
                Cruises
              </Link>
              <Link href="/category/adventure" className="block px-2 py-1" role="menuitem">
                Adventure
              </Link>
            </div>
          )}
        </div>
      </nav>
      {/* <auto-gen end: crew-site-mimicker> */}
    </header>
  )
}
