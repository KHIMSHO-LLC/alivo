import Image from 'next/image'
import Link from 'next/link'
import { ModalTrigger } from '@/components/ui/ModalTrigger'
import type { Category, Locale } from '@/lib/types'

interface CategoryHeroProps {
  category: Category
  lang: Locale
  productCount?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
}

const FALLBACK_HERO =
  'https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80'

export function CategoryHero({ category, lang, productCount, dict }: CategoryHeroProps) {
  const heroImage = category.images[0] || FALLBACK_HERO

  return (
    <section className="relative min-h-[78vh] flex flex-col justify-end overflow-hidden bg-[#0C1A23] grain-overlay">
      {/* Background photo */}
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Solid readability overlays */}
      <div className="absolute inset-0 bg-[#0C1A23]/55" aria-hidden="true" />
      <div className="absolute inset-y-0 left-0 w-full md:w-2/3 bg-[#0C1A23]/45" aria-hidden="true" />

      {/* Top editorial bar: breadcrumb + meta */}
      <div className="relative max-w-7xl mx-auto px-6 pt-28 w-full">
        <div className="flex items-center justify-between gap-4 text-[#DAEFFF]/70 text-[11px] font-medium tracking-[0.2em] uppercase">
          <nav className="flex items-center gap-2 reveal" style={{ animationDelay: '80ms' }}>
            <Link href={`/${lang}`} className="hover:text-[#DAEFFF] transition-colors">
              Alivo
            </Link>
            <span className="text-[#DAEFFF]/30">/</span>
            <span className="text-[#DAEFFF]">{category.name[lang]}</span>
          </nav>
          <span className="hidden sm:inline tabular-nums reveal" style={{ animationDelay: '160ms' }}>
            {String(productCount ?? 0).padStart(2, '0')} {productCount === 1 ? 'product' : 'products'}
          </span>
        </div>
      </div>

      {/* Headline block */}
      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 w-full">
        <div className="grid grid-cols-12 gap-6 items-end">
          {/* Vertical accent line */}
          <div className="hidden md:block col-span-1">
            <div className="h-32 w-px bg-[#DAEFFF]/30 ml-auto reveal" style={{ animationDelay: '240ms' }} />
          </div>

          {/* Main content */}
          <div className="col-span-12 md:col-span-8 flex flex-col gap-6">
            <span
              className="inline-flex w-fit items-center gap-2 text-[10px] font-semibold tracking-[0.25em] uppercase text-[#DAEFFF]/80 reveal"
              style={{ animationDelay: '120ms' }}
            >
              <span className="w-6 h-px bg-[#DAEFFF]/60" />
              {category.name[lang]}
            </span>

            <h1
              className="text-[clamp(2.75rem,7vw,5.5rem)] font-black leading-[0.95] tracking-[-0.02em] text-[#DAEFFF] reveal"
              style={{ animationDelay: '200ms' }}
            >
              {category.heroTagline[lang]}
            </h1>

            <p
              className="text-[#DAEFFF]/75 text-lg leading-relaxed max-w-xl reveal"
              style={{ animationDelay: '320ms' }}
            >
              {category.description[lang]}
            </p>

            <div className="pt-4 flex items-center gap-6 reveal" style={{ animationDelay: '420ms' }}>
              <ModalTrigger label={dict.category.getQuote} variant="primary" />
              <a
                href="#products"
                className="hidden sm:inline-flex items-center gap-2 text-[#DAEFFF] text-sm font-semibold group"
              >
                <span className="border-b border-[#DAEFFF]/40 group-hover:border-[#DAEFFF] transition-colors pb-0.5">
                  Browse all
                </span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-y-0.5">
                  <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right meta column */}
          <div className="hidden md:flex col-span-3 flex-col gap-4 items-end text-right reveal" style={{ animationDelay: '380ms' }}>
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#DAEFFF]/40 mb-1.5">Origin</p>
              <p className="text-[#DAEFFF] text-sm font-semibold">Milano, Italia</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#DAEFFF]/40 mb-1.5">Brand</p>
              <p className="text-[#DAEFFF] text-sm font-semibold">Fantini Cosmi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom hairline */}
      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="h-px bg-[#DAEFFF]/15" />
      </div>
    </section>
  )
}
