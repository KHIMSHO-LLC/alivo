import Image from 'next/image'
import { ModalTrigger } from '@/components/ui/ModalTrigger'

interface AboutFantiniSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
}

const FANTINI_IMAGE =
  'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'

export function AboutFantiniSection({ dict }: AboutFantiniSectionProps) {
  const f = dict.fantini
  const stats = [f.stat1, f.stat2, f.stat3] as { value: string; label: string }[]

  return (
    <section className="bg-[#0C1A23] py-24 md:py-32 overflow-hidden grain-overlay">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header rail */}
        <div className="flex items-center justify-between mb-16 text-[10px] font-semibold tracking-[0.25em] uppercase text-[#DAEFFF]/40">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-[#DAEFFF]/30" />
            <span>The Brand</span>
          </div>
          <span className="tabular-nums">§ 04</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          {/* Left: editorial column */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-black text-[#DAEFFF] leading-[1] tracking-[-0.02em] max-w-2xl">
              {f.headline}
            </h2>

            {/* Pull-quote body */}
            <div className="relative pl-6 border-l border-[#DAEFFF]/25 max-w-xl">
              <p className="text-[#DAEFFF]/75 text-[17px] leading-[1.7] font-light italic">
                {f.body}
              </p>
            </div>

            {/* Stats — large numerals with hairlines */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl">
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-[10px] text-[#DAEFFF]/40 tracking-[0.25em] uppercase mb-3 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="h-px bg-[#DAEFFF]/15 mb-4" />
                  <span className="text-[#DAEFFF] font-black text-4xl md:text-5xl tabular-nums tracking-[-0.02em]">
                    {stat.value}
                  </span>
                  <span className="text-[#DAEFFF]/55 text-xs mt-2 tracking-wide">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <ModalTrigger label={dict.nav.contact} variant="primary" />
            </div>
          </div>

          {/* Right: photo card */}
          <div className="lg:col-span-5">
            <figure className="relative">
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-[#263947] ring-1 ring-[#DAEFFF]/10">
                <Image
                  src={FANTINI_IMAGE}
                  alt="Fantini Cosmi — Italian engineering"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                {/* Subtle bottom darken */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0C1A23]/80 to-transparent" />

                {/* Top-left index */}
                <div className="absolute top-5 left-5 text-[#DAEFFF]/70 text-[10px] tracking-[0.25em] uppercase font-semibold tabular-nums">
                  IT — 1951
                </div>

                {/* Bottom caption */}
                <figcaption className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[#DAEFFF]/60 text-[10px] tracking-[0.25em] uppercase mb-2">
                    Headquarters
                  </p>
                  <p className="text-[#DAEFFF] text-lg font-bold tracking-tight">Milano, Italia</p>
                  <div className="mt-3 h-px w-10 bg-[#DAEFFF]/40" />
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
