import Link from 'next/link'
import { PlaceholderImage } from './PlaceholderImage'
import type { Locale, Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
  lang: Locale
  bestsellersLabel?: string
  learnMoreLabel?: string
}

export function ProductCard({ product, lang, bestsellersLabel = 'Bestseller', learnMoreLabel = 'Learn More' }: ProductCardProps) {
  return (
    <Link
      href={`/${lang}/category/${product.categorySlug}/${product.slug}`}
      className="group flex flex-col bg-[#263947]/30 hover:bg-[#263947]/60 border border-[#263947] hover:border-[#E4E969]/30 rounded-2xl overflow-hidden transition-all duration-300"
    >
      {/* Image */}
      <div className="relative">
        <PlaceholderImage
          color={product.placeholderColor}
          aspectRatio="4/3"
          className="rounded-none"
        />
        {product.isBestseller && (
          <span className="absolute top-3 left-3 bg-[#E4E969] text-[#0C1A23] text-xs font-bold px-3 py-1 rounded-full tracking-wide">
            {bestsellersLabel}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3 className="text-[#DAEFFF] font-bold text-lg group-hover:text-[#E4E969] transition-colors">
          {product.name[lang]}
        </h3>
        <p className="text-[#DAEFFF]/60 text-sm leading-relaxed line-clamp-2">
          {product.tagline[lang]}
        </p>
        <div className="mt-auto pt-3 flex items-center gap-1 text-[#E4E969] text-sm font-semibold">
          {learnMoreLabel}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform group-hover:translate-x-1"
          >
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
