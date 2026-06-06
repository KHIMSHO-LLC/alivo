export const unstable_instant = { prefetch: 'static', unstable_disableValidation: true }

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { hasLocale, getDictionary } from '../../../dictionaries'
import { getProductBySlug, getProducts } from '@/lib/data/supabase-products'
import { ProductHero } from '@/components/product/ProductHero'
import { KeyBenefits } from '@/components/product/KeyBenefits'
import { AllFeatures } from '@/components/product/AllFeatures'
import { ProductFaq } from '@/components/product/ProductFaq'
import { AboutFantiniSection } from '@/components/category/AboutFantiniSection'
import type { Locale } from '@/lib/types'

interface ProductPageProps {
  params: Promise<{ lang: string; slug: string; product: string }>
}

export async function generateStaticParams() {
  const products = await getProducts()
  const entries = products.flatMap((product) =>
    ['en', 'ka'].map((lang) => ({
      lang,
      slug: product.categorySlug,
      product: product.slug,
    }))
  )
  // Deduplicate
  return entries.filter((entry, index, arr) =>
    arr.findIndex((e) => e.lang === entry.lang && e.slug === entry.slug && e.product === entry.product) === index
  )
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { lang, slug, product: productSlug } = await params
  const product = await getProductBySlug(slug, productSlug)
  if (!product) return {}
  return {
    title: `${product.name[lang as Locale]} — Alivo`,
    description: product.description[lang as Locale],
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { lang, slug, product: productSlug } = await params

  if (!hasLocale(lang)) notFound()

  const product = await getProductBySlug(slug, productSlug)
  if (!product) notFound()

  const dict = await getDictionary(lang as Locale)

  return (
    <>
      <ProductHero product={product} lang={lang as Locale} dict={dict} />
      <KeyBenefits product={product} lang={lang as Locale} dict={dict} />
      <AllFeatures product={product} lang={lang as Locale} dict={dict} />
      <ProductFaq faqs={product.faqs ?? []} lang={lang as Locale} heading={dict.product.faq} />
      <AboutFantiniSection dict={dict} />
    </>
  )
}
