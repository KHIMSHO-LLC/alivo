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
    <section className="bg-[#DAEFFF] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: heading */}
          <div className="flex flex-col gap-4">
            <SectionHeading
              title={dict.product.allFeatures}
              subtitle={`${product.name[lang]} — ${product.tagline[lang]}`}
              light
            />
          </div>

          {/* Right: spec table */}
          <div className="flex flex-col divide-y divide-[#263947]/20">
            {product.features.map((feat) => (
              <div key={feat.label[lang]} className="flex items-center justify-between py-3.5 gap-4">
                <span className="text-[#263947]/70 text-sm">{feat.label[lang]}</span>
                <span className="text-[#0C1A23] font-semibold text-sm text-right">{feat.value[lang]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
