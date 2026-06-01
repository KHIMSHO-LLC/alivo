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
        <div className="mb-12">
          <SectionHeading title={dict.product.similar} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              lang={lang}
              bestsellersLabel={dict.product.bestseller}
              learnMoreLabel={dict.category.learnMore}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
