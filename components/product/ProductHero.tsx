import { ImageSlider } from './ImageSlider'
import { ModalTrigger } from '@/components/ui/ModalTrigger'
import type { Locale, Product } from '@/lib/types'

interface ProductHeroProps {
  product: Product
  lang: Locale
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
}

export function ProductHero({ product, lang, dict }: ProductHeroProps) {
  const p = dict.product

  return (
    <section className="bg-[#0C1A23] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: image slider */}
          <ImageSlider
            images={product.images}
            placeholderColor={product.placeholderColor}
            productName={product.name[lang]}
          />

          {/* Right: product info */}
          <div className="flex flex-col gap-6">
            {/* Category badge + bestseller */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#DAEFFF]/40">
                Fantini Cosmi
              </span>
              {product.isBestseller && (
                <span className="bg-[#E4E969] text-[#0C1A23] text-xs font-bold px-3 py-1 rounded-full">
                  {p.bestseller}
                </span>
              )}
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-black text-[#DAEFFF] leading-tight">
                {product.name[lang]}
              </h1>
              <p className="text-[#E4E969] text-lg font-medium mt-2">{product.tagline[lang]}</p>
            </div>

            <p className="text-[#DAEFFF]/70 text-base leading-relaxed">{product.description[lang]}</p>

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-3">
              {product.features.slice(0, 4).map((feat) => (
                <div key={feat.label[lang]} className="bg-[#263947]/40 rounded-xl p-3">
                  <p className="text-[#DAEFFF]/40 text-xs mb-0.5">{feat.label[lang]}</p>
                  <p className="text-[#DAEFFF] text-sm font-semibold">{feat.value[lang]}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <ModalTrigger label={p.getQuote} variant="primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
