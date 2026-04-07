'use client'

import { useState, useCallback } from 'react'

interface ImageSliderProps {
  slides: number
  placeholderColor: string
  productName: string
}

const ACCENT_COLORS = ['#263947', '#0C1A23', '#1a2d3d', '#1e3448']

export function ImageSlider({ slides, placeholderColor, productName }: ImageSliderProps) {
  const [active, setActive] = useState(0)

  const prev = useCallback(() => setActive((i) => (i - 1 + slides) % slides), [slides])
  const next = useCallback(() => setActive((i) => (i + 1) % slides), [slides])

  return (
    <div className="flex flex-col gap-4">
      {/* Main slide */}
      <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3', backgroundColor: placeholderColor }}>
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #E4E969 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40" />

        {/* Centered label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="w-24 h-24 rounded-full border-2 border-[#E4E969]/30 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border-2 border-[#E4E969]/50 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-[#E4E969]/20 border border-[#E4E969]" />
            </div>
          </div>
          <p className="text-white/30 text-xs tracking-widest uppercase">{productName}</p>
        </div>

        {/* Slide counter */}
        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white/70 text-xs px-2.5 py-1 rounded-full">
          {active + 1} / {slides}
        </div>

        {/* Arrows */}
        {slides > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail dots / thumbnails */}
      {slides > 1 && (
        <div className="flex gap-2">
          {Array.from({ length: slides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="relative rounded-lg overflow-hidden flex-1 transition-all duration-200"
              style={{ aspectRatio: '4/3', backgroundColor: ACCENT_COLORS[i % ACCENT_COLORS.length] }}
            >
              <div
                className={`absolute inset-0 transition-opacity ${i === active ? 'opacity-0' : 'opacity-60 bg-black'}`}
              />
              <div
                className={`absolute inset-0 border-2 rounded-lg transition-colors ${i === active ? 'border-[#E4E969]' : 'border-transparent'}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
