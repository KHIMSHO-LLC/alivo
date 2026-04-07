import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { hasLocale, getDictionary } from '../../../dictionaries'
import { getProductBySlug, getSimilarProducts, PRODUCTS } from '@/lib/data/products'
import { ProductHero } from '@/components/product/ProductHero'
import { KeyBenefits } from '@/components/product/KeyBenefits'
import { AllFeatures } from '@/components/product/AllFeatures'
import { AboutFantiniSection } from '@/components/category/AboutFantiniSection'
import { SimilarProducts } from '@/components/product/SimilarProducts'
import type { Locale } from '@/lib/types'

interface ProductPageProps {
  params: Promise<{ lang: string; slug: string; product: string }>
}

export async function generateStaticParams() {
  const entries = PRODUCTS.flatMap((product) =>
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
  const product = getProductBySlug(slug, productSlug)
  if (!product) return {}
  return {
    title: `${product.name[lang as Locale]} — Alivo`,
    description: product.description[lang as Locale],
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { lang, slug, product: productSlug } = await params

  if (!hasLocale(lang)) notFound()

  const product = getProductBySlug(slug, productSlug)
  if (!product) notFound()

  const dict = await getDictionary(lang as Locale)
  const similar = getSimilarProducts(product)

  return (
    <>
      <ProductHero product={product} lang={lang as Locale} dict={dict} />
      <KeyBenefits product={product} lang={lang as Locale} dict={dict} />
      <AllFeatures product={product} lang={lang as Locale} dict={dict} />
      <AboutFantiniSection dict={dict} />
      <SimilarProducts products={similar} lang={lang as Locale} dict={dict} />
    </>
  )
}
