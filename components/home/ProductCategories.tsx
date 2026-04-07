import Link from 'next/link'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import type { Locale } from '@/lib/types'
import { CATEGORIES } from '@/lib/data/products'

interface ProductCategoriesProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
  lang: Locale
}

export function ProductCategories({ dict, lang }: ProductCategoriesProps) {
  const c = dict.categories

  return (
    <section className="bg-[#DAEFFF] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title={c.sectionTitle}
          subtitle={c.sectionSubtitle}
          align="center"
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${lang}/category/${cat.slug}`}
              className="group relative overflow-hidden rounded-3xl bg-[#0C1A23] hover:scale-[1.01] transition-transform duration-300"
            >
              {/* Image area */}
              <PlaceholderImage
                color={cat.placeholderColor}
                aspectRatio="16/9"
                className="rounded-none"
                pattern="dots"
              />

              {/* Content overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A23] via-[#0C1A23]/60 to-transparent flex flex-col justify-end p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[#E4E969] text-xs font-semibold tracking-widest uppercase mb-2">
                      {cat.name[lang]}
                    </p>
                    <h3 className="text-[#DAEFFF] text-2xl md:text-3xl font-black leading-tight">
                      {cat.heroTagline[lang]}
                    </h3>
                    <p className="text-[#DAEFFF]/60 text-sm mt-2 max-w-sm">
                      {cat.description[lang]}
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-4 w-12 h-12 rounded-full bg-[#E4E969] group-hover:bg-[#FAFFC5] flex items-center justify-center transition-colors">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3 9h12M11 5l4 4-4 4" stroke="#0C1A23" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
