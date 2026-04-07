import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Locale, Product } from '@/lib/types'

interface KeyBenefitsProps {
  product: Product
  lang: Locale
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
}

export function KeyBenefits({ product, lang, dict }: KeyBenefitsProps) {
  return (
    <section className="bg-[#263947]/20 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title={dict.product.keyBenefits} align="center" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {product.benefits.map((benefit) => (
            <div
              key={benefit.title[lang]}
              className="flex flex-col gap-3 bg-[#0C1A23] border border-[#263947] rounded-2xl p-6 hover:border-[#E4E969]/30 transition-colors"
            >
              {/* Icon */}
              <div className="text-3xl">{benefit.icon}</div>
              <h3 className="text-[#DAEFFF] font-bold text-base">{benefit.title[lang]}</h3>
              <p className="text-[#DAEFFF]/60 text-sm leading-relaxed">{benefit.body[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
