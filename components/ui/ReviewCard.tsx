import type { Locale, Review } from '@/lib/types'

interface ReviewCardProps {
  review: Review
  lang: Locale
}

export function ReviewCard({ review, lang }: ReviewCardProps) {
  return (
    <div className="flex flex-col gap-4 bg-[#263947]/30 border border-[#263947] rounded-2xl p-6 h-full">
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill={i < review.rating ? '#E4E969' : 'none'}
            stroke={i < review.rating ? '#E4E969' : '#263947'}
            strokeWidth="1"
          >
            <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L2.2 5.2l4-.6z" />
          </svg>
        ))}
      </div>

      {/* Body */}
      <p className="text-[#DAEFFF]/80 text-sm leading-relaxed flex-1">
        &ldquo;{review.body[lang]}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-[#263947]">
        <div className="w-9 h-9 rounded-full bg-[#E4E969]/20 flex items-center justify-center text-[#E4E969] font-bold text-sm flex-shrink-0">
          {review.author[0]}
        </div>
        <div>
          <p className="text-[#DAEFFF] text-sm font-semibold">{review.author}</p>
          <p className="text-[#DAEFFF]/40 text-xs">{review.location[lang]}</p>
        </div>
      </div>
    </div>
  )
}
