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
  imageCount: number
  benefits: ProductBenefit[]
  features: ProductFeature[]
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

export interface Category {
  slug: string
  name: BilingualText
  description: BilingualText
  heroTagline: BilingualText
  placeholderColor: string
  explainerTitle: BilingualText
  explainerBody: BilingualText
  howItWorks: HowItWorksStep[]
}

export interface HowItWorksStep {
  step: number
  title: BilingualText
  description: BilingualText
}

export interface Review {
  author: string
  location: BilingualText
  rating: number
  body: BilingualText
}

export interface BlogPost {
  slug: string
  date: string
  title: BilingualText
  summary: BilingualText
  category: BilingualText
  placeholderColor: string
}
