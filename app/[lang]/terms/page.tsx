export const unstable_instant = { prefetch: 'static', unstable_disableValidation: true }

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { hasLocale } from '../dictionaries'

interface TermsPageProps {
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ka' }]
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { lang } = await params
  const isKa = lang === 'ka'
  return {
    title: isKa ? 'გამოყენების პირობები — Alivo' : 'Terms of Use — Alivo',
    description: isKa
      ? 'Alivo-ს ვებგვერდის გამოყენების წესები და პირობები.'
      : 'Terms and conditions for using the Alivo website.',
  }
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const isKa = lang === 'ka'

  return (
    <div className="bg-[#0C1A23] min-h-[85vh] text-[#DAEFFF] py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#DAEFFF] mb-6">
          {isKa ? 'გამოყენების პირობები' : 'Terms of Use'}
        </h1>
        <p className="text-[#DAEFFF]/55 text-sm mb-12">
          {isKa ? 'ბოლო განახლება: 29 მაისი, 2026' : 'Last Updated: 29 May 2026'}
        </p>

        <div className="flex flex-col gap-10 text-[#DAEFFF]/80 leading-relaxed text-base sm:text-lg">
          {isKa ? (
            <>
              <section className="flex flex-col gap-3">
                <h2 className="text-[#DAEFFF] text-xl font-bold tracking-tight">1. პირობების მიღება</h2>
                <p>
                  ამ ვებგვერდზე შესვლით და მისი გამოყენებით, თქვენ ადასტურებთ, რომ წაიკითხეთ, გაიგეთ და ეთანხმებით ამ გამოყენების პირობებს, კონფიდენციალობის პოლიტიკასთან ერთად. თუ არ ეთანხმებით რომელიმე პირობას, გთხოვთ, შეწყვიტოთ ვებგვერდის გამოყენება.
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="text-[#DAEFFF] text-xl font-bold tracking-tight">2. ინტელექტუალური საკუთრება</h2>
                <p>
                  ვებგვერდზე განთავსებული ყველა მასალა, მათ შორის ტექსტი, გრაფიკა, ლოგოები, სურათები და კოდი, წარმოადგენს Alivo-ს ან Fantini Cosmi-ს საკუთრებას და დაცულია ინტელექტუალური საკუთრებისა და საავტორო უფლებების შესახებ კანონმდებლობით. მათი უნებართვო კოპირება ან გავრცელება აკრძალულია.
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="text-[#DAEFFF] text-xl font-bold tracking-tight">3. პროდუქციის ინფორმაცია და პასუხისმგებლობა</h2>
                <p>
                  ჩვენ მაქსიმალურად ვცდილობთ, რომ საიტზე წარმოდგენილი ტექნიკური მახასიათებლები და ინფორმაცია იყოს ზუსტი და განახლებული. თუმცა, კონკრეტული შენობისა თუ ოთახის პარამეტრების გათვალისწინებით, რეალური შესრულების მონაცემები შეიძლება ოდნავ განსხვავდებოდეს. საბოლოო საინჟინრო გადაწყვეტა მიიღება მხოლოდ ჩვენი გუნდის მიერ ადგილზე ობიექტის შესწავლის შემდეგ.
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="text-[#DAEFFF] text-xl font-bold tracking-tight">4. ცვლილებები პირობებში</h2>
                <p>
                  Alivo იტოვებს უფლებას, ნებისმიერ დროს შეცვალოს ან განაახლოს ეს პირობები წინასწარი შეტყობინების გარეშე. ცვლილებები ძალაში შედის ვებგვერდზე გამოქვეყნებისთანავე. საიტის შემდგომი გამოყენება ნიშნავს თქვენს თანხმობას შეცვლილ პირობებზე.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="flex flex-col gap-3">
                <h2 className="text-[#DAEFFF] text-xl font-bold tracking-tight">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using this website, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Use, along with our Privacy Policy. If you do not agree with any part of these terms, please discontinue using this website.
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="text-[#DAEFFF] text-xl font-bold tracking-tight">2. Intellectual Property</h2>
                <p>
                  All content on this website, including text, graphics, logos, images, custom illustrations, and software code, is the exclusive property of Alivo or Fantini Cosmi and is protected by international copyright and intellectual property laws. Unauthorized reproduction or distribution is strictly prohibited.
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="text-[#DAEFFF] text-xl font-bold tracking-tight">3. Product Specifications and Liability</h2>
                <p>
                  While we make every effort to display accurate specifications and performance data for Fantini Cosmi products, actual values can vary depending on individual building characteristics, climate conditions, and quality of installation. Final engineering designs and sizing quotes are verified solely by Alivo engineers upon physical site surveys.
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="text-[#DAEFFF] text-xl font-bold tracking-tight">4. Revisions and Updates</h2>
                <p>
                  Alivo reserves the right to modify these terms at any time without prior notice. Any updates will be immediately active upon being published here. Your continued use of the website following changes indicates your formal acceptance of the revised terms.
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
