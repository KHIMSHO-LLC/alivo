import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { avivoFont } from '@/app/fonts'
import { hasLocale, getDictionary } from './dictionaries'
import { ModalProvider } from '@/components/providers/ModalProvider'
import { NavbarClient } from '@/components/layout/NavbarClient'
import { Footer } from '@/components/layout/Footer'
import type { Locale } from '@/lib/types'

interface LangLayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ka' }]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const isKa = lang === 'ka'
  return {
    title: isKa ? 'Alivo — პრემიუმ ჰაერის გამწმენდი' : 'Alivo — Premium Air Purification',
    description: isKa
      ? 'Fantini Cosmi-ს რეკუპერატორებისა და ვენტილატორების ოფიციალური დისტრიბუტორი საქართველოში.'
      : 'Official distributor of Fantini Cosmi recuperators and ventilators in Georgia.',
  }
}

function PageLoader() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="relative w-12 h-12">
        {/* Outer glowing track */}
        <div className="absolute inset-0 rounded-full border-2 border-[#DAEFFF]/10" />
        {/* Spinning accent */}
        <div className="absolute inset-0 rounded-full border-2 border-t-[#E4E969] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      </div>
      <p className="text-[#DAEFFF]/45 text-[10px] font-semibold tracking-[0.25em] uppercase animate-pulse">
        Loading...
      </p>
    </div>
  )
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params

  if (!hasLocale(lang)) {
    notFound()
  }

  const dict = await getDictionary(lang as Locale)

  return (
    <html lang={lang} className={`${avivoFont.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#0C1A23] antialiased">
        <ModalProvider dict={dict}>
          <NavbarClient lang={lang as Locale} dict={dict} />
          <main className="flex-1 pt-16">
            <Suspense fallback={<PageLoader />}>
              {children}
            </Suspense>
          </main>
          <Footer lang={lang as Locale} dict={dict} />
        </ModalProvider>
      </body>
    </html>
  )
}

