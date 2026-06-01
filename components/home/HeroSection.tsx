import Image from 'next/image'
import { ModalTrigger } from '@/components/ui/ModalTrigger'
import type { Locale } from '@/lib/types'

interface HeroSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
  lang: Locale
}

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80'

export function HeroSection({ dict }: HeroSectionProps) {
  const h = dict.hero

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#0C1A23]">
      {/* Background photo */}
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Uniform readability overlay across the entire visual */}
      <div className="absolute inset-0 bg-[#0C1A23]/60" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="max-w-2xl flex flex-col gap-6">
          {/* Badge */}
          <span className="inline-flex w-fit items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#DAEFFF] bg-[#DAEFFF]/15 border border-[#DAEFFF]/30 px-4 py-2 rounded-full backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DAEFFF]" />
            {h.badge}
          </span>

          {/* Headline */}
          <h1 className="text-[clamp(2.5rem,6vw,4.75rem)] font-black leading-[1.05] tracking-tight text-[#DAEFFF]">
            {h.headline}
          </h1>

          {/* Subtext */}
          <p className="text-[#DAEFFF]/85 text-lg leading-relaxed max-w-xl">
            {h.subtext}
          </p>

          {/* Single CTA → lead form */}
          <div className="pt-3">
            <ModalTrigger label={h.cta} variant="primary" />
          </div>
        </div>
      </div>
    </section>
  )
}
