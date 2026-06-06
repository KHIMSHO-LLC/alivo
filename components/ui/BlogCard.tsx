import Link from 'next/link'
import Image from 'next/image'
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
      className="group flex flex-col bg-[#DAEFFF]/[0.04] hover:bg-[#DAEFFF]/[0.08] border border-[#DAEFFF]/15 hover:border-[#DAEFFF]/40 rounded-2xl overflow-hidden transition-all duration-300"
    >
      {post.coverImage ? (
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title[lang]}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <PlaceholderImage
          color={post.placeholderColor}
          accentColor="#DAEFFF"
          aspectRatio="16/9"
          className="rounded-none"
          pattern="grid"
        />
      )}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[#DAEFFF] text-xs font-semibold tracking-wider uppercase">
            {post.category[lang]}
          </span>
          <span className="text-[#DAEFFF]/30 text-xs">·</span>
          <span className="text-[#DAEFFF]/40 text-xs">{formatDate(post.date, lang)}</span>
        </div>
        <h3 className="text-[#DAEFFF] font-bold text-base leading-snug group-hover:text-white transition-colors line-clamp-2">
          {post.title[lang]}
        </h3>
        <p className="text-[#DAEFFF]/60 text-sm leading-relaxed line-clamp-2 flex-1">
          {post.summary[lang]}
        </p>
        <div className="mt-2 flex items-center gap-1 text-[#DAEFFF] text-xs font-semibold">
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
