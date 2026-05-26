import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Category, Locale } from '@/lib/types'

interface ExplainerSectionProps {
  category: Category
  lang: Locale
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
}

export function ExplainerSection({ category, lang, dict }: ExplainerSectionProps) {
  return (
    <section className="bg-[#DAEFFF] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header rail */}
        <div className="flex items-center justify-between mb-14 text-[10px] font-semibold tracking-[0.25em] uppercase text-[#0C1A23]/45">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-[#0C1A23]/30" />
            <span>{dict.category.howItWorks}</span>
          </div>
          <span className="tabular-nums">§ 03</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          {/* Left: explainer copy */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
            <SectionHeading title={category.explainerTitle[lang]} light />
            <p className="text-[#263947]/80 text-[17px] leading-[1.7] font-light max-w-md">
              {category.explainerBody[lang]}
            </p>
          </div>

          {/* Right: step timeline */}
          <div className="lg:col-span-7">
            <ol className="relative">
              {/* Vertical line */}
              <span
                className="absolute left-[18px] top-2 bottom-2 w-px bg-[#0C1A23]/15"
                aria-hidden="true"
              />
              {category.howItWorks.map((step, i) => (
                <li key={step.step} className="relative pl-16 pb-10 last:pb-0">
                  {/* Step number bubble */}
                  <div className="absolute left-0 top-0 w-9 h-9 rounded-full bg-[#0C1A23] text-[#DAEFFF] text-xs font-black flex items-center justify-center tabular-nums ring-4 ring-[#DAEFFF]">
                    {String(step.step).padStart(2, '0')}
                  </div>

                  <div className="flex items-baseline gap-3 mb-2">
                    <p className="text-[#0C1A23] font-bold text-lg tracking-tight">
                      {step.title[lang]}
                    </p>
                    <span className="text-[#0C1A23]/35 text-[10px] tracking-[0.25em] uppercase tabular-nums">
                      Step {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="text-[#263947]/70 text-[15px] leading-[1.7] max-w-md">
                    {step.description[lang]}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
