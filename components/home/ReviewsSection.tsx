import { SectionHeading } from '@/components/ui/SectionHeading'
import { ReviewsCarousel } from '@/components/home/ReviewsCarousel'
import { REVIEWS } from '@/lib/data/reviews'
import type { Locale } from '@/lib/types'

interface ReviewsSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
  lang: Locale
}

export function ReviewsSection({ dict, lang }: ReviewsSectionProps) {
  const r = dict.reviews

  return (
    <section className="bg-[#0C1A23] py-24 border-y border-[#263947]/40">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title={r.sectionTitle}
          subtitle={r.sectionSubtitle}
          align="center"
        />

        <div className="mt-12">
          <ReviewsCarousel reviews={REVIEWS} lang={lang} />
        </div>
      </div>
    </section>
  )
}
