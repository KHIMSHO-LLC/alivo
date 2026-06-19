export type Locale = 'en' | 'ka'

export interface BilingualText {
  en: string
  ka: string
}

export interface Product {
  slug: string
  name: BilingualText
  categorySlug: string
  tagline: BilingualText
  description: BilingualText
  isBestseller: boolean
  placeholderColor: string
  images: string[]
  /** Short bullet points shown in the hero section. Falls back to benefit titles when empty. */
  heroBullets?: BilingualText[]
  benefits: ProductBenefit[]
  features: ProductFeature[]
  /** Price in Georgian lari (₾). Optional — hidden in UI when absent. */
  price?: number
  /** Specs grouped into named categories. Falls back to a single group built from `features` when absent. */
  specGroups?: SpecGroup[]
  /** Frequently asked questions shown on the product page. Empty/absent hides the section. */
  faqs?: FaqItem[]
}

export interface FaqItem {
  question: BilingualText
  answer: BilingualText
}

export interface ProductBenefit {
  icon: string
  title: BilingualText
  body: BilingualText
}

export interface ProductFeature {
  label: BilingualText
  value: BilingualText
}

export interface SpecGroup {
  title: BilingualText
  items: ProductFeature[]
}

export interface Category {
  slug: string
  name: BilingualText
  description: BilingualText
  heroTagline: BilingualText
  placeholderColor: string
  images: string[]
  explainerTitle: BilingualText
  explainerBody: BilingualText
  howItWorks: HowItWorksStep[]
}

export interface HowItWorksStep {
  step: number
  title: BilingualText
  description: BilingualText
  /** Image shown when this step is the active reason. Falls back to the category image. */
  image?: string
}

export interface Review {
  author: string
  location: BilingualText
  rating: number
  body: BilingualText
}

/** A single piece of blog body content. Rendered in order. */
export type BlogBlock =
  | { type: 'heading'; text: BilingualText }
  | { type: 'paragraph'; text: BilingualText }
  | { type: 'image'; url: string; caption?: BilingualText }
  | { type: 'youtube'; url: string }

export interface BlogPost {
  slug: string
  date: string
  title: BilingualText
  summary: BilingualText
  category: BilingualText
  placeholderColor: string
  /** Real cover image URL. Falls back to a generated placeholder when absent. */
  coverImage?: string
  /** Structured body content authored from the admin panel. */
  body?: BlogBlock[]
}
