export const unstable_instant = { prefetch: 'static', unstable_disableValidation: true }

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { hasLocale } from '../dictionaries'

interface PrivacyPageProps {
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ka' }]
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { lang } = await params
  const isKa = lang === 'ka'
  return {
    title: isKa ? 'კონფიდენციალობის პოლიტიკა — Alivo' : 'Privacy Policy — Alivo',
    description: isKa
      ? 'Alivo-ს კონფიდენციალობის პოლიტიკა და მონაცემთა დაცვის წესები.'
      : 'Privacy Policy and data protection terms for Alivo.',
  }
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const isKa = lang === 'ka'

  return (
    <div className="bg-[#0C1A23] min-h-[85vh] text-[#DAEFFF] py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#DAEFFF] mb-6">
          {isKa ? 'კონფიდენციალობის პოლიტიკა' : 'Privacy Policy'}
        </h1>
        <p className="text-[#DAEFFF]/55 text-sm mb-12">
          {isKa ? 'ბოლო განახლება: 29 მაისი, 2026' : 'Last Updated: 29 May 2026'}
        </p>

        <div className="flex flex-col gap-10 text-[#DAEFFF]/80 leading-relaxed text-base sm:text-lg">
          {isKa ? (
            <>
              <section className="flex flex-col gap-3">
                <h2 className="text-[#DAEFFF] text-xl font-bold tracking-tight">1. ზოგადი დებულებები</h2>
                <p>
                  კეთილი იყოს თქვენი მობრძანება Alivo-ზე. ჩვენთვის უმნიშვნელოვანესია თქვენი პერსონალური მონაცემების დაცვა. ეს პოლიტიკა აღწერს, თუ როგორ ვაგროვებთ, ვიყენებთ და ვიცავთ თქვენს ინფორმაციას, როდესაც იყენებთ ჩვენს ვებგვერდს ან უკავშირდებით ჩვენს გუნდს საკონსულტაციოდ.
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="text-[#DAEFFF] text-xl font-bold tracking-tight">2. მონაცემები, რომლებსაც ვაგროვებთ</h2>
                <p>
                  ჩვენ ვაგროვებთ ინფორმაციას, რომელსაც თავად გვაწვდით საკონტაქტო ფორმის შევსებისას:
                </p>
                <ul className="list-disc pl-6 flex flex-col gap-2">
                  <li>სრული სახელი და გვარი</li>
                  <li>ტელეფონის ნომერი</li>
                  <li>ელექტრონული ფოსტის მისამართი</li>
                  <li>მესიჯის შინაარსი თქვენი სახლის ან პროექტის შესახებ</li>
                </ul>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="text-[#DAEFFF] text-xl font-bold tracking-tight">3. როგორ ვიყენებთ თქვენს მონაცემებს</h2>
                <p>
                  თქვენს მიერ მოწოდებულ პერსონალურ ინფორმაციას ვიყენებთ მხოლოდ შემდეგი მიზნებისთვის:
                </p>
                <ul className="list-disc pl-6 flex flex-col gap-2">
                  <li>თქვენს მოთხოვნებზე პასუხის გასაცემად და უფასო კონსულტაციის დასაგეგმად.</li>
                  <li>ფასის შეთავაზების (ინვოისის) მოსამზადებლად.</li>
                  <li>ინსტალაციისა და მიწოდების სერვისების კოორდინაციისთვის.</li>
                </ul>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="text-[#DAEFFF] text-xl font-bold tracking-tight">4. მონაცემთა უსაფრთხოება</h2>
                <p>
                  ჩვენ ვიყენებთ თანამედროვე ტექნოლოგიურ და ადმინისტრაციულ ზომებს თქვენი ინფორმაციის არასანქცირებული წვდომისგან, დაკარგვისგან ან გამჟღავნებისგან დასაცავად. Alivo არასოდეს ყიდის ან გადასცემს თქვენს პერსონალურ მონაცემებს მესამე პირებს კომერციული მიზნებისთვის.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="flex flex-col gap-3">
                <h2 className="text-[#DAEFFF] text-xl font-bold tracking-tight">1. General Overview</h2>
                <p>
                  Welcome to Alivo. We are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal data when you interact with our website, request a consultation, or purchase our products.
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="text-[#DAEFFF] text-xl font-bold tracking-tight">2. Information We Collect</h2>
                <p>
                  We collect personal information that you voluntarily provide to us when you fill out contact or quote request forms:
                </p>
                <ul className="list-disc pl-6 flex flex-col gap-2">
                  <li>Full Name</li>
                  <li>Phone Number</li>
                  <li>Email Address</li>
                  <li>Message or details regarding your home or project requirements</li>
                </ul>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="text-[#DAEFFF] text-xl font-bold tracking-tight">3. How We Use Your Data</h2>
                <p>
                  We process your personal information strictly to fulfill your requests and improve our services:
                </p>
                <ul className="list-disc pl-6 flex flex-col gap-2">
                  <li>To contact you regarding your inquiry or request for a free consultation.</li>
                  <li>To prepare custom system designs and pricing quotes.</li>
                  <li>To arrange delivery, installation, and follow-up support for your Fantini Cosmi systems.</li>
                </ul>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="text-[#DAEFFF] text-xl font-bold tracking-tight">4. Data Protection and Sharing</h2>
                <p>
                  We adopt state-of-the-art security measures to prevent unauthorized access, modification, or exposure of your data. Alivo never sells or distributes your personal details to third parties for marketing purposes.
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
