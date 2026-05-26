import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from '../dictionaries'
import { ModalTrigger } from '@/components/ui/ModalTrigger'
import type { Locale } from '@/lib/types'

interface ContactPageProps {
  params: Promise<{ lang: string }>
}

const CONTACT_IMAGE =
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang as Locale)
  const c = dict.contactPage
  const m = dict.modal

  const items: { label: string; value: string; href?: string }[] = [
    { label: c.phone, value: '+995 568 97 01 00', href: 'tel:+995568970100' },
    { label: c.email, value: 'alivogeorgia@gmail.com', href: 'mailto:alivogeorgia@gmail.com' },
    { label: c.address, value: dict.footer.addressLabel },
    { label: c.hours, value: c.hoursValue },
  ]

  return (
    <section className="bg-[#0C1A23] pt-28 pb-24 min-h-[80vh] grain-overlay">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.25em] uppercase text-[#DAEFFF]/55 mb-10 reveal">
          <Link href={`/${lang}`} className="hover:text-[#DAEFFF] transition-colors">
            Alivo
          </Link>
          <span className="text-[#DAEFFF]/25">/</span>
          <span className="text-[#DAEFFF]">{c.badge}</span>
        </nav>

        {/* Section rail */}
        <div className="flex items-center justify-between mb-14 text-[10px] font-semibold tracking-[0.25em] uppercase text-[#DAEFFF]/40 reveal" style={{ animationDelay: '80ms' }}>
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-[#DAEFFF]/30" />
            <span>Get in touch</span>
          </div>
          <span className="tabular-nums">§ 01</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          {/* Left: editorial column */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <h1
              className="text-[clamp(2.5rem,6vw,5rem)] font-black text-[#DAEFFF] leading-[0.95] tracking-[-0.02em] max-w-3xl reveal"
              style={{ animationDelay: '160ms' }}
            >
              {c.title}
            </h1>

            <div className="relative pl-6 border-l border-[#DAEFFF]/25 max-w-xl reveal" style={{ animationDelay: '240ms' }}>
              <p className="text-[#DAEFFF]/75 text-[17px] leading-[1.7] font-light italic">
                {c.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-6 pt-2 reveal" style={{ animationDelay: '320ms' }}>
              <ModalTrigger label={m.submit} variant="primary" />
              <a
                href="tel:+995568970100"
                className="hidden sm:inline-flex items-center gap-2 text-[#DAEFFF] text-xs font-semibold tracking-[0.2em] uppercase group"
              >
                <span className="border-b border-[#DAEFFF]/35 group-hover:border-[#DAEFFF] pb-0.5 transition-colors">
                  Call directly
                </span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            {/* Editorial info rows */}
            <dl className="border-t border-[#DAEFFF]/15 mt-6 reveal" style={{ animationDelay: '400ms' }}>
              {items.map((item, i) => (
                <div
                  key={item.label}
                  className="group flex items-baseline justify-between gap-6 py-5 border-b border-[#DAEFFF]/10"
                >
                  <dt className="flex items-baseline gap-4">
                    <span className="text-[#DAEFFF]/35 text-[10px] tracking-[0.25em] uppercase tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[#DAEFFF]/55 text-[11px] tracking-[0.25em] uppercase">
                      {item.label}
                    </span>
                  </dt>
                  <dd className="text-right">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-[#DAEFFF] text-base font-semibold border-b border-transparent hover:border-[#DAEFFF]/50 pb-0.5 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-[#DAEFFF] text-base font-semibold">{item.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: editorial photo */}
          <div className="lg:col-span-5 reveal" style={{ animationDelay: '300ms' }}>
            <figure className="relative">
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-[#263947] ring-1 ring-[#DAEFFF]/10">
                <Image
                  src={CONTACT_IMAGE}
                  alt="Alivo team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0C1A23]/80 to-transparent" />

                <div className="absolute top-5 left-5 text-[#DAEFFF]/70 text-[10px] tracking-[0.25em] uppercase font-semibold tabular-nums">
                  GE — TBILISI
                </div>

                <figcaption className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[#DAEFFF]/60 text-[10px] tracking-[0.25em] uppercase mb-2">Showroom</p>
                  <p className="text-[#DAEFFF] text-lg font-bold tracking-tight">By appointment</p>
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
