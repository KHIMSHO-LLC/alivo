'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'

interface ImageSliderProps {
  images: string[]
  placeholderColor: string
  productName: string
}

export function ImageSlider({ images, placeholderColor, productName }: ImageSliderProps) {
  const [active, setActive] = useState(0)
  const slides = images.length || 1

  const prev = useCallback(() => setActive((i) => (i - 1 + slides) % slides), [slides])
  const next = useCallback(() => setActive((i) => (i + 1) % slides), [slides])

  return (
    <div className="flex flex-col gap-4">
      {/* Main slide */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ aspectRatio: '4/3', backgroundColor: placeholderColor }}
      >
        {images.length > 0 && images[active] ? (
          <Image
            src={images[active]}
            alt={`${productName} - image ${active + 1}`}
            fill
            className="object-cover"
            priority={active === 0}
          />
        ) : (
          <>
            {/* Subtle dot pattern (light blue accent) */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle, #DAEFFF 1px, transparent 1px)',
                backgroundSize: '22px 22px',
              }}
            />
            {/* Centered label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-24 h-24 rounded-full border-2 border-[#DAEFFF]/25 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full border-2 border-[#DAEFFF]/40 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-[#DAEFFF]/20 border border-[#DAEFFF]/60" />
                </div>
              </div>
              <p className="text-[#DAEFFF]/40 text-xs tracking-widest uppercase">{productName}</p>
            </div>
          </>
        )}

        {/* Slide counter */}
        <div className="absolute top-4 right-4 bg-[#0C1A23]/55 backdrop-blur-sm text-[#DAEFFF]/80 text-xs px-2.5 py-1 rounded-full">
          {active + 1} / {slides}
        </div>

        {/* Arrows */}
        {slides > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#0C1A23]/55 backdrop-blur-sm hover:bg-[#0C1A23]/80 text-[#DAEFFF] flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#0C1A23]/55 backdrop-blur-sm hover:bg-[#0C1A23]/80 text-[#DAEFFF] flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {slides > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="relative rounded-lg overflow-hidden flex-1 transition-all duration-200"
              style={{ aspectRatio: '4/3', backgroundColor: placeholderColor }}
            >
              {img ? (
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                />
              ) : null}
              <div
                className={`absolute inset-0 transition-opacity ${
                  i === active ? 'opacity-0' : 'opacity-60 bg-[#0C1A23]'
                }`}
              />
              <div
                className={`absolute inset-0 border-2 rounded-lg transition-colors ${
                  i === active ? 'border-[#DAEFFF]' : 'border-transparent'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
