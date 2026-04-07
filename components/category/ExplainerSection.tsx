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
    <section className="bg-[#DAEFFF] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: explainer */}
          <div className="flex flex-col gap-6">
            <SectionHeading
              title={category.explainerTitle[lang]}
              light
            />
            <p className="text-[#263947]/80 text-base leading-relaxed">
              {category.explainerBody[lang]}
            </p>
          </div>

          {/* Right: how it works */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[#0C1A23] text-lg font-bold mb-2">{dict.category.howItWorks}</h3>
            <ol className="space-y-4">
              {category.howItWorks.map((step) => (
                <li key={step.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0C1A23] text-[#E4E969] text-sm font-black flex items-center justify-center">
                    {step.step}
                  </div>
                  <div className="pt-0.5">
                    <p className="text-[#0C1A23] font-semibold text-sm">{step.title[lang]}</p>
                    <p className="text-[#263947]/70 text-sm leading-relaxed mt-0.5">{step.description[lang]}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
