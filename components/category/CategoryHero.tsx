import { ModalTrigger } from '@/components/ui/ModalTrigger'
import type { Category, Locale } from '@/lib/types'

interface CategoryHeroProps {
  category: Category
  lang: Locale
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
}

export function CategoryHero({ category, lang, dict }: CategoryHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center bg-[#0C1A23] overflow-hidden">
      {/* Background decor */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#263947]/30 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #DAEFFF 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="max-w-2xl flex flex-col gap-6">
          <span className="inline-flex w-fit text-xs font-semibold tracking-widest uppercase text-[#E4E969] bg-[#E4E969]/10 border border-[#E4E969]/20 px-4 py-2 rounded-full">
            {category.name[lang]}
          </span>
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tight text-[#DAEFFF]">
            {category.heroTagline[lang]}
          </h1>
          <p className="text-[#DAEFFF]/60 text-lg leading-relaxed">{category.description[lang]}</p>
          <div className="flex flex-wrap gap-4 pt-2">
            <ModalTrigger label={dict.category.getQuote} variant="primary" />
          </div>
        </div>
      </div>
    </section>
  )
}
