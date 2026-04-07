import Link from 'next/link'
import { PlaceholderImage } from './PlaceholderImage'
import type { BlogPost, Locale } from '@/lib/types'

interface BlogCardProps {
  post: BlogPost
  lang: Locale
  readMoreLabel?: string
}

function formatDate(dateStr: string, lang: Locale): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString(lang === 'ka' ? 'ka-GE' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function BlogCard({ post, lang, readMoreLabel = 'Read Article' }: BlogCardProps) {
  return (
    <Link
      href={`/${lang}/blog/${post.slug}`}
      className="group flex flex-col bg-[#263947]/20 hover:bg-[#263947]/40 border border-[#263947] hover:border-[#E4E969]/30 rounded-2xl overflow-hidden transition-all duration-300"
    >
      <PlaceholderImage
        color={post.placeholderColor}
        aspectRatio="16/9"
        className="rounded-none"
        pattern="grid"
      />
      <div className="p-5 flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[#E4E969] text-xs font-semibold tracking-wider uppercase">
            {post.category[lang]}
          </span>
          <span className="text-[#DAEFFF]/30 text-xs">·</span>
          <span className="text-[#DAEFFF]/40 text-xs">{formatDate(post.date, lang)}</span>
        </div>
        <h3 className="text-[#DAEFFF] font-bold text-base leading-snug group-hover:text-[#E4E969] transition-colors line-clamp-2">
          {post.title[lang]}
        </h3>
        <p className="text-[#DAEFFF]/60 text-sm leading-relaxed line-clamp-2 flex-1">
          {post.summary[lang]}
        </p>
        <div className="mt-2 flex items-center gap-1 text-[#E4E969] text-xs font-semibold">
          {readMoreLabel}
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform group-hover:translate-x-1"
          >
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
