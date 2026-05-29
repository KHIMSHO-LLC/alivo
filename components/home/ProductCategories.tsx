import Image from 'next/image'
import Link from 'next/link'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import type { Locale } from '@/lib/types'
import { getCategories } from '@/lib/data/supabase-products'

interface ProductCategoriesProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
  lang: Locale
}

export async function ProductCategories({ dict, lang }: ProductCategoriesProps) {
  const categories = await getCategories()
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
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${lang}/category/${cat.slug}`}
              className="group relative overflow-hidden rounded-3xl bg-[#0C1A23] ring-1 ring-[#DAEFFF]/15 hover:ring-2 hover:ring-[#DAEFFF]/55 hover:shadow-2xl hover:shadow-[#DAEFFF]/5 transition-all duration-300"
            >
              {/* Image area */}
              <div className="relative w-full aspect-video overflow-hidden">
                {cat.images[0] ? (
                  <Image
                    src={cat.images[0]}
                    alt={cat.name[lang]}
                    fill
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:brightness-[1.08]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <PlaceholderImage
                    color={cat.placeholderColor}
                    accentColor="#DAEFFF"
                    aspectRatio="16/9"
                    className="rounded-none w-full h-full"
                    pattern="dots"
                  />
                )}
              </div>

              {/* Content overlay (solid bottom band, not gradient) */}
              <div className="absolute inset-x-0 bottom-0 bg-[#0C1A23]/85 p-7">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[#DAEFFF] text-xs font-semibold tracking-widest uppercase mb-2">
                      {cat.name[lang]}
                    </p>
                    <h3 className="text-[#DAEFFF] text-2xl md:text-3xl font-black leading-tight">
                      {cat.heroTagline[lang]}
                    </h3>
                    <p className="text-[#DAEFFF]/70 text-sm mt-2 max-w-sm">
                      {cat.description[lang]}
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#E4E969] group-hover:bg-[#FAFFC5] flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
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
