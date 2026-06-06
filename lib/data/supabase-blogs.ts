import { supabase as getSupabase } from '@/lib/supabase'
import type { BlogBlock, BlogPost } from '@/lib/types'
import { BLOG_POSTS } from './blogs'

type DatabaseBlog = {
  id: string
  slug: string
  date: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  title: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  summary: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  category: any
  placeholder_color: string
  cover_image: string | null
  body: BlogBlock[] | null
  created_at: string
}

function mapBlog(row: DatabaseBlog): BlogPost {
  return {
    slug: row.slug,
    date: row.date,
    title: row.title,
    summary: row.summary,
    category: row.category,
    placeholderColor: row.placeholder_color,
    coverImage: row.cover_image ?? undefined,
    body: Array.isArray(row.body) ? row.body : [],
  }
}

async function fetchDbBlogs(): Promise<BlogPost[]> {
  try {
    const supabase = getSupabase()
    if (!supabase) return []
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      console.warn('Warning fetching blogs:', error.message)
      return []
    }
    return (data || []).map(mapBlog)
  } catch {
    console.warn('Error connecting to Supabase for blogs')
    return []
  }
}

/**
 * All posts: DB-authored posts first (newest by date), followed by the built-in
 * seed posts that haven't been overridden in the DB. The merge guarantees the
 * original posts keep showing even before the blogs table exists.
 */
export async function getBlogs(): Promise<BlogPost[]> {
  const dbPosts = await fetchDbBlogs()
  const dbSlugs = new Set(dbPosts.map((p) => p.slug))
  const seedOnly = BLOG_POSTS.filter((p) => !dbSlugs.has(p.slug))
  return [...dbPosts, ...seedOnly]
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const supabase = getSupabase()
    if (supabase) {
      const { data, error } = await supabase.from('blogs').select('*').eq('slug', slug).single()
      if (!error && data) return mapBlog(data)
      if (error && error.code !== 'PGRST116') {
        console.warn('Warning fetching blog:', error.message)
      }
    }
  } catch {
    console.warn('Error connecting to Supabase for blog')
  }
  return BLOG_POSTS.find((p) => p.slug === slug)
}
