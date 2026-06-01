import { SectionHeading } from '@/components/ui/SectionHeading'
import { BenefitIcon } from '@/components/ui/BenefitIcon'
import type { Locale, Product } from '@/lib/types'

interface KeyBenefitsProps {
  product: Product
  lang: Locale
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
}

// Column count adapts to the number of benefits so few benefits don't leave empty cells.
const LG_COLS: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
}

export function KeyBenefits({ product, lang, dict }: KeyBenefitsProps) {
  const count = product.benefits.length
  if (count === 0) return null

  const lgCols = LG_COLS[Math.min(count, 4)]
  const smCols = count >= 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-1'

  return (
    <section className="bg-[#DAEFFF] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title={dict.product.keyBenefits} align="center" light />

        <div className={`grid grid-cols-1 ${smCols} ${lgCols} gap-px bg-[#0C1A23]/8 mt-14 rounded-2xl overflow-hidden ring-1 ring-[#0C1A23]/8`}>
          {product.benefits.map((benefit, i) => (
            <article
              key={benefit.title[lang]}
              className="group relative flex flex-col gap-4 bg-white p-7 hover:bg-[#FAFFC5]/40 transition-colors duration-300"
            >
              {/* Index */}
              <div className="flex items-center justify-between">
                <span className="text-[#0C1A23]/40 text-[11px] font-semibold tracking-[0.2em] tabular-nums">
                  {String(i + 1).padStart(2, '0')} / {String(product.benefits.length).padStart(2, '0')}
                </span>
                <BenefitIcon name={benefit.icon} className="text-[#0C1A23]" />
              </div>

              {/* Divider */}
              <div className="h-px bg-[#0C1A23]/10 w-8 group-hover:w-16 group-hover:bg-[#0C1A23]/30 transition-all duration-500" />

              <h3 className="text-[#0C1A23] font-bold text-lg leading-tight">{benefit.title[lang]}</h3>
              <p className="text-[#263947]/70 text-sm leading-relaxed">{benefit.body[lang]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
