import { SectionHeading } from '@/components/ui/SectionHeading'
import { ReviewCard } from '@/components/ui/ReviewCard'
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
    <section className="bg-[#263947]/20 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title={r.sectionTitle}
          subtitle={r.sectionSubtitle}
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {REVIEWS.slice(0, 3).map((review) => (
            <ReviewCard key={review.author} review={review} lang={lang} />
          ))}
        </div>

        {/* Additional reviews row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 max-w-3xl mx-auto">
          {REVIEWS.slice(3, 5).map((review) => (
            <ReviewCard key={review.author} review={review} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  )
}
