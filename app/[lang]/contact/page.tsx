import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from '../dictionaries'
import { ModalTrigger } from '@/components/ui/ModalTrigger'
import type { Locale } from '@/lib/types'

interface ContactPageProps {
  params: Promise<{ lang: string }>
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang as Locale)
  const c = dict.contactPage
  const m = dict.modal

  const items = [
    { label: c.phone, value: '+995 568 97 01 00', href: 'tel:+995568970100' },
    { label: c.email, value: 'alivogeorgia@gmail.com', href: 'mailto:alivogeorgia@gmail.com' },
    { label: c.address, value: dict.footer.addressLabel, href: null },
    { label: c.hours, value: c.hoursValue, href: null },
  ]

  return (
    <section className="bg-[#0C1A23] py-24 min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: copy */}
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit text-xs font-semibold tracking-widest uppercase text-[#DAEFFF] bg-[#DAEFFF]/10 border border-[#DAEFFF]/20 px-3 py-1.5 rounded-full">
              {c.badge}
            </span>
            <h1 className="text-[#DAEFFF] text-4xl md:text-5xl font-black leading-tight">{c.title}</h1>
            <p className="text-[#DAEFFF]/70 text-base leading-relaxed max-w-md">{c.subtitle}</p>
            <div className="pt-2">
              <ModalTrigger label={m.submit} variant="primary" />
            </div>
          </div>

          {/* Right: contact info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 self-start">
            {items.map((item) => (
              <div
                key={item.label}
                className="bg-[#DAEFFF]/5 border border-[#DAEFFF]/15 rounded-2xl p-6 hover:border-[#DAEFFF]/40 transition-colors"
              >
                <p className="text-[#DAEFFF]/50 text-xs font-semibold tracking-widest uppercase mb-2">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-[#DAEFFF] text-base font-medium hover:text-white transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-[#DAEFFF] text-base font-medium">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
