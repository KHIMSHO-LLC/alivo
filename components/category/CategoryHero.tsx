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

export function CategoryHero({ category, lang, dict }: CategoryHeroProps) {
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

      {/* Uniform readability overlay across the entire visual */}
      <div className="absolute inset-0 bg-[#0C1A23]/60" aria-hidden="true" />

      {/* Top editorial bar: breadcrumb + meta */}
      <div className="relative max-w-7xl mx-auto px-6 pt-28 w-full">
        <div className="flex items-center gap-4 text-[#DAEFFF]/70 text-[11px] font-medium tracking-[0.2em] uppercase">
          <nav className="flex items-center gap-2 reveal" style={{ animationDelay: '80ms' }}>
            <Link href={`/${lang}`} className="hover:text-[#DAEFFF] transition-colors">
              Alivo
            </Link>
            <span className="text-[#DAEFFF]/30">/</span>
            <span className="text-[#DAEFFF]">{category.name[lang]}</span>
          </nav>
        </div>
      </div>

      {/* Headline block — left-aligned, flush with the breadcrumb above */}
      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 w-full">
        <div className="flex flex-col gap-6 items-start max-w-3xl">
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
      </div>

      {/* Bottom hairline */}
      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="h-px bg-[#DAEFFF]/15" />
      </div>
    </section>
  )
}
