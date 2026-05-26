import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Locale, Product } from '@/lib/types'

interface AllFeaturesProps {
  product: Product
  lang: Locale
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
}

export function AllFeatures({ product, lang, dict }: AllFeaturesProps) {
  return (
    <section id="specs" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section rail */}
        <div className="flex items-center justify-between mb-16 text-[10px] font-semibold tracking-[0.25em] uppercase text-[#0C1A23]/40">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-[#0C1A23]/25" />
            <span>Specification sheet</span>
          </div>
          <span className="tabular-nums">{product.features.length.toString().padStart(2, '0')} fields</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          {/* Left: sticky heading */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col gap-6">
            <SectionHeading
              title={dict.product.allFeatures}
              subtitle={`${product.name[lang]} — ${product.tagline[lang]}`}
              light
            />
            <div className="hidden lg:block pt-4">
              <p className="text-[#263947]/60 text-[13px] leading-relaxed max-w-sm">
                Engineered in Italy by Fantini Cosmi. Performance figures verified against EN 13141-7.
              </p>
            </div>
          </div>

          {/* Right: spec table */}
          <div className="lg:col-span-7">
            {/* Table header */}
            <div className="flex items-center justify-between pb-3 mb-1 border-b border-[#0C1A23]/20 text-[10px] font-semibold tracking-[0.25em] uppercase text-[#0C1A23]/45">
              <span>Specification</span>
              <span>Value</span>
            </div>

            <dl className="flex flex-col">
              {product.features.map((feat, i) => (
                <div
                  key={feat.label[lang]}
                  className="group flex items-center justify-between py-4 gap-4 border-b border-[#0C1A23]/8 hover:bg-[#FAFFC5]/25 transition-colors"
                >
                  <dt className="flex items-baseline gap-3">
                    <span className="text-[#0C1A23]/35 text-[10px] tracking-[0.2em] uppercase tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[#263947] text-sm">{feat.label[lang]}</span>
                  </dt>
                  <dd className="text-[#0C1A23] font-semibold text-sm text-right tabular-nums">
                    {feat.value[lang]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
