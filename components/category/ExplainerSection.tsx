'use client'

import { useState } from 'react'
import Image from 'next/image'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Category, Locale } from '@/lib/types'

interface ExplainerSectionProps {
  category: Category
  lang: Locale
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
}

const FALLBACK_HERO =
  'https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80'

export function ExplainerSection({ category, lang, dict }: ExplainerSectionProps) {
  const [active, setActive] = useState(0)
  const steps = category.howItWorks
  const activeStep = steps[active] ?? steps[0]
  const image = activeStep?.image || category.images[0] || FALLBACK_HERO

  return (
    <section className="bg-[#DAEFFF] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Centered headline */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <SectionHeading title={category.explainerTitle[lang]} align="center" light />
          <p className="text-[#263947]/80 text-[17px] leading-[1.7] font-light max-w-2xl">
            {category.explainerBody[lang]}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: clickable reasons */}
          <ul className="flex flex-col">
            {steps.map((step, i) => {
              const isActive = i === active
              return (
                <li key={step.step}>
                  <button
                    type="button"
                    onClick={() => setActive(isActive ? -1 : i)}
                    aria-expanded={isActive}
                    className={`group w-full text-left flex gap-5 py-6 border-b border-[#0C1A23]/10 transition-colors ${
                      isActive ? '' : 'opacity-55 hover:opacity-100'
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-black tabular-nums transition-colors ${
                        isActive
                          ? 'bg-[#0C1A23] text-[#DAEFFF]'
                          : 'bg-[#0C1A23]/10 text-[#0C1A23] group-hover:bg-[#0C1A23]/20'
                      }`}
                    >
                      {String(step.step).padStart(2, '0')}
                    </span>
                    <span className="flex-1 flex flex-col">
                      <span className="flex items-center justify-between gap-3">
                        <span className="text-[#0C1A23] font-bold text-lg tracking-tight">
                          {step.title[lang]}
                        </span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 10 10"
                          fill="none"
                          className={`flex-shrink-0 text-[#0C1A23]/50 transition-transform duration-300 ${
                            isActive ? 'rotate-180' : ''
                          }`}
                        >
                          <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {/* Accordion: description expands only when this reason is active */}
                      <span
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span className="block text-[#263947]/70 text-[15px] leading-[1.6] pt-1.5">
                            {step.description[lang]}
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Right: image panel that responds to the active reason */}
          <div className="lg:sticky lg:top-24">
            <figure className="relative w-full aspect-[4/5] sm:aspect-square overflow-hidden rounded-2xl bg-[#263947] ring-1 ring-[#0C1A23]/10">
              <Image
                key={image}
                src={image}
                alt={activeStep?.title[lang] ?? category.name[lang]}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover reveal"
              />
              <div className="absolute inset-0 bg-[#0C1A23]/35" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0C1A23]/85 to-transparent" />

              {/* Active reason overlay */}
              <figcaption
                key={active}
                className="absolute inset-x-0 bottom-0 p-7 reveal"
              >
                <p className="text-[#DAEFFF]/60 text-[10px] tracking-[0.25em] uppercase mb-2 tabular-nums">
                  {dict.category.howItWorks} · {String(activeStep.step).padStart(2, '0')}
                </p>
                <p className="text-[#DAEFFF] text-2xl font-black tracking-tight">
                  {activeStep.title[lang]}
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
