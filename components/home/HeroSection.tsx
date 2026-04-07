import { ModalTrigger } from '@/components/ui/ModalTrigger'
import type { Locale } from '@/lib/types'

interface HeroSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
  lang: Locale
}

export function HeroSection({ dict }: HeroSectionProps) {
  const h = dict.hero

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0C1A23]">
      {/* Background decoration */}
      <div className="absolute inset-0">
        {/* Large accent circle */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#263947]/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-[#E4E969]/5 blur-3xl" />

        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #DAEFFF 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div className="flex flex-col gap-7">
            {/* Badge */}
            <span className="inline-flex w-fit items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#E4E969] bg-[#E4E969]/10 border border-[#E4E969]/20 px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E4E969] animate-pulse" />
              {h.badge}
            </span>

            {/* Headline */}
            <div>
              <h1 className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.9] tracking-tight text-[#DAEFFF]">
                {h.headline1}
                <br />
                <span className="text-[#E4E969]">{h.headline2}</span>
                <br />
                {h.headline3}
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-[#DAEFFF]/60 text-lg leading-relaxed max-w-md">
              {h.subtext}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <ModalTrigger label={h.cta} variant="primary" />
              <ModalTrigger label={h.ctaSecondary} variant="outline" />
            </div>
          </div>

          {/* Right: visual */}
          <div className="relative hidden lg:block">
            {/* Main visual card */}
            <div className="relative bg-[#263947]/50 border border-[#263947] rounded-3xl p-8 backdrop-blur-sm">
              {/* Decorative circles */}
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-[#E4E969]/20 blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-[#DAEFFF]/10 blur-lg" />

              {/* Placeholder product visual */}
              <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-[#263947] to-[#0C1A23] overflow-hidden flex items-center justify-center">
                {/* Dot pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #E4E969 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
                {/* Product icon placeholder */}
                <div className="relative flex flex-col items-center gap-4">
                  <div className="w-32 h-32 rounded-full border-2 border-[#E4E969]/30 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border-2 border-[#E4E969]/50 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-[#E4E969]/20 border border-[#E4E969]" />
                    </div>
                  </div>
                  <span className="text-[#E4E969]/50 text-xs tracking-widest uppercase">Fantini Cosmi</span>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  { value: '95%', label: 'Heat recovery' },
                  { value: '<22dB', label: 'Silent' },
                  { value: '3yr', label: 'Warranty' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-[#E4E969] font-black text-xl">{stat.value}</div>
                    <div className="text-[#DAEFFF]/40 text-xs mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#DAEFFF]/30">
          <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-[#DAEFFF]/30" />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-bounce">
            <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  )
}
