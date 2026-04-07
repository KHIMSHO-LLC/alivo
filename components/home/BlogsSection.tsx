import Link from 'next/link'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { BlogCard } from '@/components/ui/BlogCard'
import { BLOG_POSTS } from '@/lib/data/blogs'
import type { Locale } from '@/lib/types'

interface BlogsSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
  lang: Locale
}

export function BlogsSection({ dict, lang }: BlogsSectionProps) {
  const b = dict.blogs

  return (
    <section className="bg-[#0C1A23] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between gap-4 mb-12">
          <SectionHeading
            title={b.sectionTitle}
            subtitle={b.sectionSubtitle}
          />
          <Link
            href={`/${lang}/blog`}
            className="hidden sm:flex items-center gap-1.5 text-[#E4E969] text-sm font-semibold flex-shrink-0 hover:text-[#FAFFC5] transition-colors"
          >
            {b.viewAll}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              lang={lang}
              readMoreLabel={b.readMore}
            />
          ))}
        </div>

        {/* Mobile view all */}
        <div className="sm:hidden flex justify-center mt-8">
          <Link
            href={`/${lang}/blog`}
            className="flex items-center gap-1.5 text-[#E4E969] text-sm font-semibold"
          >
            {b.viewAll}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
