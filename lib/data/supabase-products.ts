import { supabase as getSupabase } from '@/lib/supabase'
import type { Category, FaqItem, Product, ProductBenefit, ProductFeature, SpecGroup } from '@/lib/types'

function normalizeFeatures(raw: unknown): ProductFeature[] {
  if (!Array.isArray(raw)) return []
  return raw
    .filter((f) => f && typeof f === 'object')
    .map((f) => ({
      label: { en: f.label?.en ?? f.title?.en ?? '', ka: f.label?.ka ?? f.title?.ka ?? '' },
      value: { en: f.value?.en ?? '', ka: f.value?.ka ?? '' },
    }))
}

function normalizeBenefits(raw: unknown): ProductBenefit[] {
  if (!Array.isArray(raw)) return []
  return raw
    .filter((b) => b && typeof b === 'object')
    .map((b) => ({
      icon: typeof b.icon === 'string' ? b.icon : '',
      title: { en: b.title?.en ?? '', ka: b.title?.ka ?? '' },
      body: { en: b.body?.en ?? '', ka: b.body?.ka ?? '' },
    }))
}

function normalizeFaqs(raw: unknown): FaqItem[] {
  if (!Array.isArray(raw)) return []
  return raw
    .filter((f) => f && typeof f === 'object')
    .map((f) => ({
      question: { en: f.question?.en ?? '', ka: f.question?.ka ?? '' },
      answer: { en: f.answer?.en ?? '', ka: f.answer?.ka ?? '' },
    }))
}

type DatabaseCategory = {
  id: string
  slug: string
  name: any
  description: any
  hero_tagline: any
  placeholder_color: string
  images: string[]
  explainer_title: any
  explainer_body: any
  how_it_works: any
  created_at: string
}

type DatabaseProduct = {
  id: string
  slug: string
  name: any
  category_slug: string
  tagline: any
  description: any
  is_bestseller: boolean
  placeholder_color: string
  images: string[]
  benefits: any
  features: any
  price: number | null
  spec_groups: SpecGroup[] | null
  faqs: any
  created_at: string
}

function mapCategory(dbCategory: DatabaseCategory): Category {
  return {
    slug: dbCategory.slug,
    name: dbCategory.name,
    description: dbCategory.description,
    heroTagline: dbCategory.hero_tagline,
    placeholderColor: dbCategory.placeholder_color,
    images: dbCategory.images || [],
    explainerTitle: dbCategory.explainer_title,
    explainerBody: dbCategory.explainer_body,
    howItWorks: dbCategory.how_it_works,
  }
}

function mapProduct(dbProduct: DatabaseProduct): Product {
  return {
    slug: dbProduct.slug,
    name: dbProduct.name,
    categorySlug: dbProduct.category_slug,
    tagline: dbProduct.tagline,
    description: dbProduct.description,
    isBestseller: dbProduct.is_bestseller,
    placeholderColor: dbProduct.placeholder_color,
    images: dbProduct.images || [],
    benefits: normalizeBenefits(dbProduct.benefits),
    features: normalizeFeatures(dbProduct.features),
    price: dbProduct.price ?? undefined,
    specGroups: dbProduct.spec_groups ?? undefined,
    faqs: normalizeFaqs(dbProduct.faqs),
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const supabase = getSupabase()
    if (!supabase) return []
    const { data, error } = await supabase.from('categories').select('*').order('created_at', { ascending: true })

    if (error) {
      console.warn('Warning fetching categories:', error.message)
      return []
    }

    return (data || []).map(mapCategory)
  } catch (err) {
    console.warn('Error connecting to Supabase. Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local')
    return []
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  try {
    const supabase = getSupabase()
    if (!supabase) return undefined
    const { data, error } = await supabase.from('categories').select('*').eq('slug', slug).single()

    if (error) {
      if (error.code === 'PGRST116') return undefined // Not found
      console.warn('Warning fetching category:', error.message)
      return undefined
    }

    return data ? mapCategory(data) : undefined
  } catch (err) {
    console.warn('Error connecting to Supabase')
    return undefined
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const supabase = getSupabase()
    if (!supabase) return []
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: true })

    if (error) {
      console.warn('Warning fetching products:', error.message)
      return []
    }

    return (data || []).map(mapProduct)
  } catch (err) {
    console.warn('Error connecting to Supabase')
    return []
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const supabase = getSupabase()
    if (!supabase) return []
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_slug', categorySlug)
      .order('created_at', { ascending: true })

    if (error) {
      console.warn('Warning fetching products by category:', error.message)
      return []
    }

    return (data || []).map(mapProduct)
  } catch (err) {
    console.warn('Error connecting to Supabase')
    return []
  }
}

export async function getBestsellers(categorySlug: string): Promise<Product[]> {
  try {
    const supabase = getSupabase()
    if (!supabase) return []
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_slug', categorySlug)
      .eq('is_bestseller', true)
      .order('created_at', { ascending: true })

    if (error) {
      console.warn('Warning fetching bestsellers:', error.message)
      return []
    }

    return (data || []).map(mapProduct)
  } catch (err) {
    console.warn('Error connecting to Supabase')
    return []
  }
}

export async function getProductBySlug(categorySlug: string, productSlug: string): Promise<Product | undefined> {
  try {
    const supabase = getSupabase()
    if (!supabase) return undefined
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_slug', categorySlug)
      .eq('slug', productSlug)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return undefined // Not found
      console.warn('Warning fetching product:', error.message)
      return undefined
    }

    return data ? mapProduct(data) : undefined
  } catch (err) {
    console.warn('Error connecting to Supabase')
    return undefined
  }
}

