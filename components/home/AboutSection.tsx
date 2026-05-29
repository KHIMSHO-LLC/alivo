import Image from 'next/image'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ModalTrigger } from '@/components/ui/ModalTrigger'
import type { Locale } from '@/lib/types'

interface AboutSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
  lang: Locale
}

interface AboutFeature {
  title: string
  description: string
  image: string
}

export function AboutSection({ dict }: AboutSectionProps) {
  const a = dict.about
  const features: AboutFeature[] = a.features ?? []

  return (
    <section className="bg-[#0C1A23] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: headline + short description */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <SectionHeading badge={a.sectionBadge} title={a.headline} />
            <p className="text-[#DAEFFF]/70 text-base leading-relaxed">{a.body}</p>
            <div className="pt-2">
              <ModalTrigger label={dict.nav.contact} variant="outline" />
            </div>
          </div>

          {/* Right: 3 feature cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {features.map((f) => (
              <article
                key={f.title}
                className="flex flex-col gap-4"
              >
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-[#263947]">
                  <Image
                    src={f.image}
                    alt={f.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-[#DAEFFF] text-lg font-bold leading-snug">{f.title}</h3>
                  <p className="text-[#DAEFFF]/60 text-sm leading-relaxed mt-1.5">{f.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
