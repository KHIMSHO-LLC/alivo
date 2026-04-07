import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
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
          <main className="flex-1 pt-16">{children}</main>
          <Footer lang={lang as Locale} dict={dict} />
        </ModalProvider>
      </body>
    </html>
  )
}
