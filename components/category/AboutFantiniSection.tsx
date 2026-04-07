import { ModalTrigger } from '@/components/ui/ModalTrigger'

interface AboutFantiniSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
}

export function AboutFantiniSection({ dict }: AboutFantiniSectionProps) {
  const f = dict.fantini

  return (
    <section className="bg-[#263947]/20 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit text-xs font-semibold tracking-widest uppercase text-[#E4E969] bg-[#E4E969]/10 border border-[#E4E969]/20 px-4 py-2 rounded-full">
              {f.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#DAEFFF] leading-tight">{f.headline}</h2>
            <p className="text-[#DAEFFF]/70 text-base leading-relaxed">{f.body}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6 border-y border-[#263947]">
              {[f.stat1, f.stat2, f.stat3].map((stat: { value: string; label: string }) => (
                <div key={stat.label}>
                  <div className="text-[#E4E969] font-black text-3xl">{stat.value}</div>
                  <div className="text-[#DAEFFF]/40 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <ModalTrigger label={dict.nav.contact} variant="outline" />
          </div>

          {/* Right: brand visual card */}
          <div className="relative">
            <div className="bg-[#0C1A23] border border-[#263947] rounded-3xl p-8 relative overflow-hidden">
              {/* Background accent */}
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[#E4E969]/10 blur-3xl" />

              {/* Brand name */}
              <div className="text-center py-12">
                <p className="text-[#DAEFFF]/30 text-xs tracking-widest uppercase mb-3">Est. 1951 · Milan, Italy</p>
                <h3 className="text-[#DAEFFF] text-4xl font-black tracking-tight">Fantini</h3>
                <h3 className="text-[#E4E969] text-4xl font-black tracking-tight">Cosmi</h3>
                <div className="w-16 h-0.5 bg-[#E4E969]/40 mx-auto mt-4" />
                <p className="text-[#DAEFFF]/40 text-xs mt-4 tracking-wide">
                  Precision ventilation & climate control
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
