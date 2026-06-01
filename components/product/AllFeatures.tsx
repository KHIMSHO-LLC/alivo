import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Locale, Product, SpecGroup } from '@/lib/types'

interface AllFeaturesProps {
  product: Product
  lang: Locale
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
}

export function AllFeatures({ product, lang, dict }: AllFeaturesProps) {
  // Use grouped specs when available; otherwise fall back to a single group built from the flat feature list.
  const groups: SpecGroup[] =
    product.specGroups && product.specGroups.length > 0
      ? product.specGroups
      : [
          {
            title: { en: dict.product.allFeatures, ka: dict.product.allFeatures },
            items: product.features,
          },
        ]

  return (
    <section id="specs" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Centered title */}
        <div className="flex flex-col items-center text-center mb-16">
          <SectionHeading
            title={dict.product.allFeatures}
            subtitle={`${product.name[lang]} — ${product.tagline[lang]}`}
            align="center"
            light
          />
        </div>

        {/* Grouped specification blocks */}
        <div className="flex flex-col divide-y divide-[#0C1A23]/10 border-t border-[#0C1A23]/15">
          {groups.map((group) => (
            <div
              key={group.title[lang]}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 py-10"
            >
              {/* Left: category subtitle */}
              <div className="lg:col-span-4">
                <h3 className="text-[#0C1A23] font-bold text-xl tracking-tight">
                  {group.title[lang]}
                </h3>
              </div>

              {/* Right: detailed rows */}
              <dl className="lg:col-span-8 flex flex-col">
                {group.items.map((feat) => (
                  <div
                    key={feat.label[lang]}
                    className="group flex items-center justify-between py-4 gap-4 border-b border-[#0C1A23]/8 last:border-b-0 hover:bg-[#FAFFC5]/25 transition-colors"
                  >
                    <dt className="text-[#263947] text-sm">{feat.label[lang]}</dt>
                    <dd className="text-[#0C1A23] font-semibold text-sm text-right tabular-nums">
                      {feat.value[lang]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
