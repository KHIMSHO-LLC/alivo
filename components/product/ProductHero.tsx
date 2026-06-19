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
          {/* Left: product info */}
          <div className="lg:col-span-6 flex flex-col gap-7 reveal" style={{ animationDelay: '120ms' }}>
            {/* Bestseller badge */}
            {product.isBestseller && (
              <div className="flex items-center gap-3 flex-wrap">
                <span className="bg-[#E4E969] text-[#0C1A23] text-[10px] font-bold px-2.5 py-1 rounded-full tracking-[0.15em] uppercase">
                  {p.bestseller}
                </span>
              </div>
            )}

            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#DAEFFF] leading-[0.95] tracking-[-0.02em]">
                {product.name[lang]}
              </h1>
              <p className="text-[#E4E969] text-base font-light leading-relaxed mt-4 max-w-md">
                {product.tagline[lang]}
              </p>
            </div>

            <p className="text-[#DAEFFF]/55 text-[15px] leading-[1.7]">{product.description[lang]}</p>

            {/* Hero bullet list — uses heroBullets when set, falls back to benefit titles */}
            {(() => {
              const bullets =
                product.heroBullets && product.heroBullets.length > 0
                  ? product.heroBullets
                  : product.benefits.map((b) => b.title)
              return bullets.length > 0 ? (
                <ul className="flex flex-col gap-3">
                  {bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="mt-0.5 flex-shrink-0 text-[#E4E969]"
                      >
                        <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[#DAEFFF]/85 text-[15px] leading-snug">{bullet[lang]}</span>
                    </li>
                  ))}
                </ul>
              ) : null
            })()}

            {/* Price — below bullet list */}
            {typeof product.price === 'number' && (
              <p className="text-[#DAEFFF] font-black text-3xl md:text-4xl tabular-nums tracking-tight">
                ₾{product.price.toLocaleString()}
              </p>
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

          {/* Right: image slider (square frame) */}
          <div className="lg:col-span-6 reveal" style={{ animationDelay: '240ms' }}>
            <ImageSlider
              images={product.images}
              placeholderColor={product.placeholderColor}
              productName={product.name[lang]}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
