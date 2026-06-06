import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Locale, Product } from '@/lib/types'

interface ProductFaqProps {
  product: Product
  lang: Locale
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
}

export function ProductFaq({ product, lang, dict }: ProductFaqProps) {
  // Only render valid Q&A entries; skip rows with empty question or answer in this locale.
  const faqs = (product.faqs ?? []).filter(
    (f) => f.question?.[lang]?.trim() && f.answer?.[lang]?.trim()
  )
  if (faqs.length === 0) return null

  return (
    <section className="bg-[#0C1A23] py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12 text-center flex flex-col items-center">
          <SectionHeading title={dict.product.faq} align="center" />
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-[#DAEFFF]/15 bg-[#263947]/30 px-6 py-1 open:bg-[#263947]/50 transition-colors"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-5 text-[#DAEFFF] font-semibold text-base sm:text-lg tracking-tight">
                <span>{faq.question[lang]}</span>
                <span className="flex-shrink-0 text-[#E4E969] text-2xl leading-none transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-5 -mt-1 text-[#DAEFFF]/70 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {faq.answer[lang]}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
