import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProductCard } from '@/components/ui/ProductCard'
import type { Locale, Product } from '@/lib/types'

interface SimilarProductsProps {
  products: Product[]
  lang: Locale
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
}

export function SimilarProducts({ products, lang, dict }: SimilarProductsProps) {
  if (products.length === 0) return null

  return (
    <section className="bg-[#0C1A23] py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
          <SectionHeading title={dict.product.similar} />
          <span className="text-[#DAEFFF]/40 text-[11px] font-semibold tracking-[0.25em] uppercase tabular-nums">
            {String(products.length).padStart(2, '0')} more
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <ProductCard
              key={product.slug}
              product={product}
              lang={lang}
              index={i}
              total={products.length}
              bestsellersLabel={dict.product.bestseller}
              learnMoreLabel={dict.category.learnMore}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
