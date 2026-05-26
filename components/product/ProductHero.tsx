import Link from 'next/link'
import { ImageSlider } from './ImageSlider'
import { ModalTrigger } from '@/components/ui/ModalTrigger'
import type { Locale, Product } from '@/lib/types'

interface ProductHeroProps {
  product: Product
  lang: Locale
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
}

function categoryLabel(slug: string, dict: Record<string, { recuperators: string; ventilators: string }>): string {
  const map: Record<string, string> = {
    recuperators: dict.nav.recuperators as unknown as string,
    ventilators: dict.nav.ventilators as unknown as string,
  }
  return map[slug] || slug
}

export function ProductHero({ product, lang, dict }: ProductHeroProps) {
  const p = dict.product
  const catLabel = categoryLabel(product.categorySlug, dict)

  return (
    <section className="bg-[#0C1A23] pt-28 pb-20 md:pb-24 grain-overlay">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.25em] uppercase text-[#DAEFFF]/55 mb-10 reveal">
          <Link href={`/${lang}`} className="hover:text-[#DAEFFF] transition-colors">
            Alivo
          </Link>
          <span className="text-[#DAEFFF]/25">/</span>
          <Link href={`/${lang}/category/${product.categorySlug}`} className="hover:text-[#DAEFFF] transition-colors">
            {catLabel}
          </Link>
          <span className="text-[#DAEFFF]/25">/</span>
          <span className="text-[#DAEFFF]">{product.name[lang]}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: image slider (7/12) */}
          <div className="lg:col-span-7 reveal" style={{ animationDelay: '120ms' }}>
            <ImageSlider
              images={product.images}
              placeholderColor={product.placeholderColor}
              productName={product.name[lang]}
            />
          </div>

          {/* Right: product info (5/12) */}
          <div className="lg:col-span-5 flex flex-col gap-7 reveal" style={{ animationDelay: '240ms' }}>
            {/* Eyebrow + bestseller */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.25em] uppercase text-[#DAEFFF]/70">
                <span className="w-6 h-px bg-[#DAEFFF]/50" />
                Fantini Cosmi · {catLabel}
              </span>
              {product.isBestseller && (
                <span className="bg-[#E4E969] text-[#0C1A23] text-[10px] font-bold px-2.5 py-1 rounded-full tracking-[0.15em] uppercase">
                  {p.bestseller}
                </span>
              )}
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#DAEFFF] leading-[0.95] tracking-[-0.02em]">
                {product.name[lang]}
              </h1>
              <p className="text-[#DAEFFF]/75 text-lg font-light leading-relaxed mt-4 max-w-md">
                {product.tagline[lang]}
              </p>
            </div>

            <p className="text-[#DAEFFF]/55 text-[15px] leading-[1.7]">{product.description[lang]}</p>

            {/* Quick specs — clean row layout */}
            {product.features.length > 0 && (
              <div className="border-t border-[#DAEFFF]/15 divide-y divide-[#DAEFFF]/10">
                {product.features.slice(0, 4).map((feat) => (
                  <div key={feat.label[lang]} className="flex items-center justify-between py-3.5 gap-4">
                    <span className="text-[#DAEFFF]/45 text-[11px] tracking-[0.2em] uppercase">
                      {feat.label[lang]}
                    </span>
                    <span className="text-[#DAEFFF] text-sm font-semibold tabular-nums">
                      {feat.value[lang]}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA row */}
            <div className="flex items-center gap-6 pt-2">
              <ModalTrigger label={p.getQuote} variant="primary" />
              <a
                href="#specs"
                className="hidden sm:inline-flex items-center gap-2 text-[#DAEFFF] text-xs font-semibold tracking-[0.2em] uppercase group"
              >
                <span className="border-b border-[#DAEFFF]/35 group-hover:border-[#DAEFFF] pb-0.5 transition-colors">
                  Full specs
                </span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-y-0.5">
                  <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
