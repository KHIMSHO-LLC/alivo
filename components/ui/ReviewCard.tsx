import type { Locale, Review } from '@/lib/types'

interface ReviewCardProps {
  review: Review
  lang: Locale
}

export function ReviewCard({ review, lang }: ReviewCardProps) {
  return (
    <div className="flex flex-col gap-3 bg-[#DAEFFF]/[0.04] border border-[#DAEFFF]/15 rounded-2xl p-5 h-full">
      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill={i < review.rating ? '#E4E969' : 'none'}
            stroke={i < review.rating ? '#E4E969' : '#DAEFFF'}
            strokeOpacity={i < review.rating ? 1 : 0.3}
            strokeWidth="1"
          >
            <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L2.2 5.2l4-.6z" />
          </svg>
        ))}
      </div>

      {/* Body */}
      <p className="text-[#DAEFFF]/80 text-[13px] leading-relaxed flex-1 line-clamp-5">
        &ldquo;{review.body[lang]}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-3 border-t border-[#DAEFFF]/10">
        <div className="w-8 h-8 rounded-full bg-[#DAEFFF]/15 flex items-center justify-center text-[#DAEFFF] font-bold text-xs flex-shrink-0">
          {review.author[0]}
        </div>
        <div>
          <p className="text-[#DAEFFF] text-xs font-semibold">{review.author}</p>
          <p className="text-[#DAEFFF]/40 text-[11px]">{review.location[lang]}</p>
        </div>
      </div>
    </div>
  )
}
