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
        {/* Title — top left */}
        <div className="flex flex-col gap-4 mb-12 max-w-2xl">
          <span className="inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.25em] uppercase text-[#DAEFFF]/40">
            <span className="w-8 h-px bg-[#DAEFFF]/30" />
            {dict.category.aboutBrand}
          </span>
          <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-black text-[#DAEFFF] leading-[1] tracking-[-0.02em]">
            {f.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: square photo */}
          <figure className="relative">
            <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-[#263947] ring-1 ring-[#DAEFFF]/10">
              <Image
                src={FANTINI_IMAGE}
                alt="Fantini Cosmi — Italian engineering"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0C1A23]/80 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[#DAEFFF]/60 text-[10px] tracking-[0.25em] uppercase mb-2">
                  Milano, Italia · 1951
                </p>
                <div className="h-px w-10 bg-[#DAEFFF]/40" />
              </figcaption>
            </div>
          </figure>

          {/* Right: description + key numbers */}
          <div className="flex flex-col gap-10">
            <div className="relative pl-6 border-l border-[#DAEFFF]/25">
              <p className="text-[#DAEFFF]/75 text-[17px] leading-[1.7] font-light italic">
                {f.body}
              </p>
            </div>

            {/* Key numbers with short explanations */}
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <div className="h-px bg-[#DAEFFF]/15 mb-4" />
                  <span className="text-[#DAEFFF] font-black text-4xl md:text-5xl tabular-nums tracking-[-0.02em]">
                    {stat.value}
                  </span>
                  <span className="text-[#DAEFFF]/55 text-xs mt-2 tracking-wide leading-relaxed">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <ModalTrigger label={dict.nav.contact} variant="primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
