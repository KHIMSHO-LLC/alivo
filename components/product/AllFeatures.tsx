import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Locale, Product, ProductFeature } from '@/lib/types'

interface AllFeaturesProps {
  product: Product
  lang: Locale
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
}

export function AllFeatures({ product, lang, dict }: AllFeaturesProps) {
  // Flatten any grouped specs into a single list — each spec shows as a title (left) + value (right).
  const specs: ProductFeature[] =
    product.specGroups && product.specGroups.length > 0
      ? product.specGroups.flatMap((group) => group.items)
      : product.features

  return (
    <section id="specs" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Centered title */}
        <div className="flex flex-col items-center text-center mb-16">
          <SectionHeading
            title={dict.product.allFeatures}
            align="center"
            light
          />
        </div>

        {/* Specification rows — label as title (left), value as description (right) */}
        <dl className="flex flex-col border-t border-[#0C1A23]/15">
          {specs.map((feat) => {
            const lines = feat.value[lang].split('\n').filter(Boolean)
            return (
              <div
                key={feat.label[lang]}
                className="group grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-12 py-6 border-b border-[#0C1A23]/10 hover:bg-[#FAFFC5]/25 transition-colors"
              >
                <dt className="text-[#0C1A23] font-bold text-lg tracking-tight">
                  {feat.label[lang]}
                </dt>
                <dd className="text-[#263947] text-base sm:text-right tabular-nums">
                  {lines.length > 1 ? (
                    <ul className="flex flex-col gap-1">
                      {lines.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  ) : (
                    feat.value[lang]
                  )}
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
