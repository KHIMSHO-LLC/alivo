import Image from 'next/image'
import Link from 'next/link'
import { PlaceholderImage } from './PlaceholderImage'
import type { Locale, Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
  lang: Locale
  bestsellersLabel?: string
  learnMoreLabel?: string
}

export function ProductCard({
  product,
  lang,
  bestsellersLabel = 'Bestseller',
  learnMoreLabel = 'View product',
}: ProductCardProps) {
  const quickSpec = product.features?.[0]

  return (
    <Link
      href={`/${lang}/category/${product.categorySlug}/${product.slug}`}
      className="group relative flex flex-col bg-[#0C1A23] ring-1 ring-[#DAEFFF]/10 hover:ring-[#DAEFFF]/35 rounded-2xl overflow-hidden transition-all duration-500"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        {product.images[0] ? (
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name[lang]}
              fill
              className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.06]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Bottom darken */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0C1A23]/60 to-transparent" />
          </div>
        ) : (
          <PlaceholderImage
            color={product.placeholderColor}
            accentColor="#DAEFFF"
            aspectRatio="4/3"
            className="rounded-none"
          />
        )}

        {/* Bestseller */}
        {product.isBestseller && (
          <span className="absolute top-3 right-3 bg-[#E4E969] text-[#0C1A23] text-[10px] font-bold px-2.5 py-1 rounded-full tracking-[0.15em] uppercase">
            {bestsellersLabel}
          </span>
        )}

        {/* Quick spec — appears on hover */}
        {quickSpec && (
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[#DAEFFF] text-[11px] font-semibold tracking-wide opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            <span className="text-[#DAEFFF]/60 uppercase tracking-[0.2em] text-[10px]">
              {quickSpec.label?.[lang]}
            </span>
            <span className="tabular-nums">{quickSpec.value?.[lang]}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-6 py-6 flex flex-col gap-2 flex-1">
        <p className="text-[#DAEFFF]/45 text-[10px] font-semibold tracking-[0.25em] uppercase">
          Fantini Cosmi
        </p>
        <h3 className="text-[#DAEFFF] font-bold text-xl leading-tight tracking-tight">
          {product.name[lang]}
        </h3>
        <p className="text-[#DAEFFF]/55 text-sm leading-relaxed line-clamp-2">
          {product.tagline[lang]}
        </p>

        {typeof product.price === 'number' && (
          <p className="text-[#DAEFFF] font-black text-2xl tabular-nums tracking-tight mt-3">
            ₾{product.price.toLocaleString()}
          </p>
        )}

        <div className="mt-auto pt-5">
          <div className="h-px bg-[#DAEFFF]/10 mb-4" />
          <div className="flex items-center justify-between gap-2 text-[#DAEFFF] text-xs font-semibold tracking-[0.15em] uppercase">
            <span className="border-b border-transparent group-hover:border-[#DAEFFF]/50 pb-0.5 transition-colors">
              {learnMoreLabel}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-500 group-hover:translate-x-1.5"
            >
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
