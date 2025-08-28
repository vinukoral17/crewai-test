/**
 * Image gallery with thumbnail selection and basic keyboard navigation.
 * Provides UX parity with the target site while using placeholder images.
 * Used by components/organisms/ProductDetail.tsx.
 */
'use client'

import { useState, useRef, KeyboardEvent } from 'react'
import Image from 'next/image'

/** Props for {@link ProductGallery}. */
export interface ProductGalleryProps {
  /** Array of image URLs; placeholders are acceptable. */
  images: string[]
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [index, setIndex] = useState(0)
  const mainRef = useRef<HTMLImageElement>(null)

  // Handle arrow key navigation between images
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') setIndex(i => Math.min(i + 1, images.length - 1))
    if (e.key === 'ArrowLeft') setIndex(i => Math.max(i - 1, 0))
  }

  return (
    <div className="space-y-2" onKeyDown={onKey} tabIndex={0} aria-label="Product image gallery">
      {/* Main image */}
      <div className="relative h-64 w-full bg-gray-100">
        <Image
          ref={mainRef}
          src={images[index]}
          alt="Product image"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.map((src, i) => (
          <button
            key={src}
            className={`h-16 w-16 border ${i === index ? 'border-blue-600' : 'border-transparent'}`}
            onClick={() => setIndex(i)}
            aria-label={`Show image ${i + 1}`}
          >
            <Image src={src} alt="" width={64} height={64} className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
