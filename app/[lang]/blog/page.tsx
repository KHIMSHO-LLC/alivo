export const unstable_instant = { prefetch: 'static', unstable_disableValidation: true }

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { hasLocale, getDictionary } from '../dictionaries'
import { getBlogs } from '@/lib/data/supabase-blogs'
import { BlogCard } from '@/components/ui/BlogCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Locale } from '@/lib/types'

interface BlogPageProps {
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ka' }]
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { lang } = await params
  const isKa = lang === 'ka'
  return {
    title: isKa ? 'ბლოგი — Alivo' : 'Blog — Alivo',
    description: isKa
      ? 'სტატიები და რჩევები შიდა ჰაერის ხარისხის, ვენტილაციისა და ჯანსაღი ცხოვრების შესახებ.'
      : 'Insights, guides and stories about indoor air quality, ventilation, and healthy living.',
  }
}

export default async function BlogIndexPage({ params }: BlogPageProps) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang as Locale)
  const b = dict.blogs
  const posts = await getBlogs()

  return (
    <div className="bg-[#0C1A23] min-h-[85vh] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <SectionHeading
            title={b.sectionTitle}
            subtitle={b.sectionSubtitle}
          />
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                post={post}
                lang={lang as Locale}
                readMoreLabel={b.readMore}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-[#DAEFFF]/10 rounded-2xl bg-[#DAEFFF]/[0.02]">
            <p className="text-[#DAEFFF]/40 text-sm">
              {lang === 'ka' ? 'სტატიები არ მოიძებნა' : 'No articles found.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
