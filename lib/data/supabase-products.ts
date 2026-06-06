import { supabase as getSupabase } from '@/lib/supabase'
import type { Category, Product, SpecGroup } from '@/lib/types'

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
    benefits: dbProduct.benefits,
    features: dbProduct.features,
    price: dbProduct.price ?? undefined,
    specGroups: dbProduct.spec_groups ?? undefined,
    faqs: dbProduct.faqs ?? [],
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

