'use client'

import { useState } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { FaqItem, Locale } from '@/lib/types'

interface ProductFaqProps {
  faqs: FaqItem[]
  lang: Locale
  heading: string
}

export function ProductFaq({ faqs, lang, heading }: ProductFaqProps) {
  // Only valid Q&A entries; skip rows with empty question or answer in this locale.
  const items = (faqs ?? []).filter(
    (f) => f.question?.[lang]?.trim() && f.answer?.[lang]?.trim()
  )

  const [open, setOpen] = useState<number | null>(null)

  if (items.length === 0) return null

  const toggle = (i: number) => setOpen((cur) => (cur === i ? null : i))

  return (
    <section className="bg-[#0C1A23] py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12 text-center flex flex-col items-center">
          <SectionHeading title={heading} align="center" />
        </div>

        <div className="flex flex-col gap-3">
          {items.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-colors ${
                  isOpen
                    ? 'border-[#E4E969]/40 bg-[#263947]/50'
                    : 'border-[#DAEFFF]/15 bg-[#263947]/30 hover:border-[#DAEFFF]/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                >
                  <span className="text-[#DAEFFF] font-semibold text-base sm:text-lg tracking-tight">
                    {faq.question[lang]}
                  </span>
                  <span
                    className={`flex-shrink-0 text-[#E4E969] text-2xl leading-none transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>

                {/* grid-rows trick: animates height smoothly without measuring */}
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-[#DAEFFF]/70 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                      {faq.answer[lang]}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
