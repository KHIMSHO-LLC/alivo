import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { hasLocale, getDictionary } from '../../dictionaries'
import { getCategoryBySlug, getProductsByCategory, getBestsellers } from '@/lib/data/products'
import { CategoryHero } from '@/components/category/CategoryHero'
import { ProductGrid } from '@/components/category/ProductGrid'
import { ExplainerSection } from '@/components/category/ExplainerSection'
import { AboutFantiniSection } from '@/components/category/AboutFantiniSection'
import type { Locale } from '@/lib/types'

interface CategoryPageProps {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateStaticParams() {
  return [
    { lang: 'en', slug: 'recuperators' },
    { lang: 'en', slug: 'ventilators' },
    { lang: 'ka', slug: 'recuperators' },
    { lang: 'ka', slug: 'ventilators' },
  ]
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { lang, slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) return {}
  return {
    title: `${category.name[lang as Locale]} — Alivo`,
    description: category.description[lang as Locale],
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { lang, slug } = await params

  if (!hasLocale(lang)) notFound()

  const category = getCategoryBySlug(slug)
  if (!category) notFound()

  const dict = await getDictionary(lang as Locale)
  const allProducts = getProductsByCategory(slug)
  const bestsellers = getBestsellers(slug)

  return (
    <>
      <CategoryHero category={category} lang={lang as Locale} dict={dict} />

      {/* Bestsellers */}
      {bestsellers.length > 0 && (
        <ProductGrid
          products={bestsellers}
          lang={lang as Locale}
          dict={dict}
          title={dict.category.bestsellers}
        />
      )}

      {/* All products */}
      <div className="bg-[#263947]/10">
        <ProductGrid
          products={allProducts}
          lang={lang as Locale}
          dict={dict}
          title={dict.category.allProducts}
        />
      </div>

      <ExplainerSection category={category} lang={lang as Locale} dict={dict} />
      <AboutFantiniSection dict={dict} />
    </>
  )
}
