import { SectionHeading } from '@/components/ui/SectionHeading'
import { ModalTrigger } from '@/components/ui/ModalTrigger'
import type { Locale } from '@/lib/types'

interface AboutSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
  lang: Locale
}

export function AboutSection({ dict }: AboutSectionProps) {
  const a = dict.about

  return (
    <section className="bg-[#0C1A23] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: main content */}
          <div className="flex flex-col gap-8">
            <SectionHeading
              badge={a.sectionBadge}
              title={a.headline}
            />
            <p className="text-[#DAEFFF]/70 text-base leading-relaxed">{a.body}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6 border-y border-[#263947]">
              {[a.stat1, a.stat2, a.stat3].map((stat: { value: string; label: string }) => (
                <div key={stat.label}>
                  <div className="text-[#E4E969] font-black text-3xl">{stat.value}</div>
                  <div className="text-[#DAEFFF]/40 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <ModalTrigger label={dict.nav.contact} variant="primary" />
          </div>

          {/* Right: mission / vision / values cards */}
          <div className="flex flex-col gap-4">
            {/* Mission */}
            <div className="bg-[#263947]/40 border border-[#263947] rounded-2xl p-6">
              <span className="text-[#E4E969] text-xs font-semibold tracking-widest uppercase">{a.mission.label}</span>
              <p className="text-[#DAEFFF]/80 text-sm leading-relaxed mt-2">{a.mission.text}</p>
            </div>

            {/* Vision */}
            <div className="bg-[#263947]/40 border border-[#263947] rounded-2xl p-6">
              <span className="text-[#E4E969] text-xs font-semibold tracking-widest uppercase">{a.vision.label}</span>
              <p className="text-[#DAEFFF]/80 text-sm leading-relaxed mt-2">{a.vision.text}</p>
            </div>

            {/* Values */}
            <div className="bg-[#E4E969]/10 border border-[#E4E969]/20 rounded-2xl p-6">
              <span className="text-[#E4E969] text-xs font-semibold tracking-widest uppercase">{a.values.label}</span>
              <ul className="mt-3 space-y-2">
                {(a.values.items as string[]).map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[#DAEFFF]/80 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E4E969] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
