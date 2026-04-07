import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from './dictionaries'
import { HeroSection } from '@/components/home/HeroSection'
import { ProductCategories } from '@/components/home/ProductCategories'
import { AboutSection } from '@/components/home/AboutSection'
import { ReviewsSection } from '@/components/home/ReviewsSection'
import { BlogsSection } from '@/components/home/BlogsSection'
import type { Locale } from '@/lib/types'

interface HomePageProps {
  params: Promise<{ lang: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang as Locale)

  return (
    <>
      <HeroSection dict={dict} lang={lang as Locale} />
      <ProductCategories dict={dict} lang={lang as Locale} />
      <AboutSection dict={dict} lang={lang as Locale} />
      <ReviewsSection dict={dict} lang={lang as Locale} />
      <BlogsSection dict={dict} lang={lang as Locale} />
    </>
  )
}
