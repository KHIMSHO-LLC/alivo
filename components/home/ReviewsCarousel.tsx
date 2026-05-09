'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ReviewCard } from '@/components/ui/ReviewCard'
import type { Locale, Review } from '@/lib/types'

interface ReviewsCarouselProps {
  reviews: Review[]
  lang: Locale
}

export function ReviewsCarousel({ reviews, lang }: ReviewsCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const updateButtons = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    updateButtons()
    const el = scrollerRef.current
    if (!el) return
    el.addEventListener('scroll', updateButtons, { passive: true })
    window.addEventListener('resize', updateButtons)
    return () => {
      el.removeEventListener('scroll', updateButtons)
      window.removeEventListener('resize', updateButtons)
    }
  }, [updateButtons])

  function scrollBy(dir: 1 | -1) {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-review-card]')
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      {/* Arrow controls (desktop) */}
      <div className="hidden md:flex absolute -top-14 right-0 gap-2">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          disabled={!canPrev}
          aria-label="Previous reviews"
          className="w-10 h-10 rounded-full border border-[#DAEFFF]/30 text-[#DAEFFF] hover:bg-[#DAEFFF]/10 hover:border-[#DAEFFF]/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          disabled={!canNext}
          aria-label="Next reviews"
          className="w-10 h-10 rounded-full border border-[#DAEFFF]/30 text-[#DAEFFF] hover:bg-[#DAEFFF]/10 hover:border-[#DAEFFF]/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Scroller */}
      <div
        ref={scrollerRef}
        className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review) => (
          <div
            key={review.author}
            data-review-card
            className="snap-start flex-shrink-0 w-[270px] sm:w-[300px]"
          >
            <ReviewCard review={review} lang={lang} />
          </div>
        ))}
      </div>
    </div>
  )
}
