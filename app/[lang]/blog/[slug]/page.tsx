export const unstable_instant = { prefetch: 'static', unstable_disableValidation: true }

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { hasLocale, getDictionary } from '../../dictionaries'
import { getBlogs, getBlogBySlug } from '@/lib/data/supabase-blogs'
import { BlogCard } from '@/components/ui/BlogCard'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import { YouTubeEmbed } from '@/components/ui/YouTubeEmbed'
import type { Locale } from '@/lib/types'

interface BlogPostPageProps {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateStaticParams() {
  const posts = await getBlogs()
  return posts.flatMap((post) =>
    ['en', 'ka'].map((lang) => ({
      lang,
      slug: post.slug,
    }))
  )
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { lang, slug } = await params
  const post = await getBlogBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title[lang as Locale]} — Alivo`,
    description: post.summary[lang as Locale],
  }
}

// Comprehensive localized content for the three default blog posts
const BLOG_CONTENTS: Record<string, Record<Locale, Array<{ title: string; paragraphs: string[] }>>> = {
  'why-indoor-air-quality-matters': {
    en: [
      {
        title: 'The Hidden Danger Inside Our Homes',
        paragraphs: [
          'We spend roughly 90% of our daily lives indoors, whether at home, in offices, or inside classrooms. Yet, the air we breathe inside can be 2 to 5 times more polluted than outdoor air. Without proper circulation, pollutants accumulate quickly.',
          'Common household items are frequent sources of contamination: furniture and paint release volatile organic compounds (VOCs), damp bathrooms promote mold spores, and pets continuously shed dander. Over time, breathing this stale, recirculated air leads to chronic fatigue, headaches, allergies, and reduced focus.',
        ],
      },
      {
        title: "Why Open Windows Aren't Enough",
        paragraphs: [
          'The most intuitive response to stuffiness is opening a window. While this provides temporary relief, it introduces serious drawbacks. You bring in outdoor allergens like pollen, highway soot, and PM2.5 particulates.',
          'Additionally, window ventilation represents a massive energy waste. In winter, all your expensive heating escape within minutes. In summer, your air conditioner works double-time to combat the hot, humid outdoor air. True comfort requires a continuous, controlled solution.',
        ],
      },
      {
        title: 'The Active Solution: Mechanical Ventilation with Heat Recovery',
        paragraphs: [
          'This is where heat-recovery ventilators (recuperators) come in. A recuperator actively extracts stale, humid air from your home and continuously brings in fresh, clean outdoor air.',
          'Inside the unit, a highly specialized heat-exchange core transfers up to 92-95% of the thermal energy from the exhaust air to the incoming fresh air. This means you breathe perfectly clean, pre-warmed or pre-cooled air round the clock — without wasting energy or inflating your utility bills.',
        ],
      },
    ],
    ka: [
      {
        title: 'ფარული საფრთხე ჩვენს სახლებში',
        paragraphs: [
          'ჩვენი ცხოვრების დაახლოებით 90%-ს დახურულ სივრცეში ვატარებთ: სახლში, ოფისში თუ სკოლაში. თუმცა, შიდა ჰაერი შეიძლება 2-დან 5-ჯერ უფრო დაბინძურებული იყოს, ვიდრე გარე ჰაერი. სათანადო ცირკულაციის გარეშე, მავნე ნივთიერებები სწრაფად გროვდება.',
          'დაბინძურების წყარო ხშირად ყოველდღიური ნივთებია: ავეჯი და საღებავები გამოყოფენ აქროლად ორგანულ ნაერთებს (VOC), ნესტიანი სველი წერტილები ხელს უწყობენ ობის სპორების გავრცელებას, ხოლო შინაური ცხოველები მუდმივად ტოვებენ ბეწვს. დროთა განმავლობაში, ამ ჰაერის სუნთქვა იწვევს დაღლილობას, თავის ტკივილს და ალერგიას.',
        ],
      },
      {
        title: 'რატომ არ არის საკმარისი ფანჯრების გაღება',
        paragraphs: [
          'როდესაც ოთახში ჰაერი მძიმდება, პირველი ინსტინქტი ფანჯრის გაღებაა. თუმცა, ამ დროს სახლში შემოდის გარე დამაბინძურებლები, როგორიცაა მტვერი, გამონაბოლქვი და ალერგენები.',
          'ამასთანავე, ფანჯრიდან ვენტილაცია იწვევს ენერგიის კოლოსალურ კარგვას. ზამთარში ძვირადღირებული სითბო წამებში გადის გარეთ, ხოლო ზაფხულში კონდიციონერს უწევს გაორმაგებული მუშაობა ცხელი ჰაერის გასაგრილებლად.',
        ],
      },
      {
        title: 'აქტიური გადაწყვეტა: მექანიკური ვენტილაცია სითბოს აღდგენით',
        paragraphs: [
          'სწორედ აქ გვეხმარება სითბოს აღდგენის ვენტილაციის სისტემები (რეკუპერატორები). მოწყობილობა მუდმივად გამოდევნის ძველ ჰაერს და შემოაქვს გაფილტრული სუფთა ჰაერი.',
          'სითბოს გამცვლელი ბირთვის მეშვეობით, შემოსული ჰაერი ითვისებს გამოსული ჰაერის სითბოს 92-95%-ს. შედეგად, სახლში მუდმივად გაქვთ სუფთა და თბილი ჰაერი, ზედმეტი კომუნალური ხარჯების გარეშე.',
        ],
      },
    ],
  },
  'recuperator-vs-traditional-ventilation': {
    en: [
      {
        title: 'The Hidden Costs of Traditional Air Exchange',
        paragraphs: [
          'In architecture, ventilation has historically been passive — relying on leaks around windows and exhaust fans in kitchens and bathrooms. While this setup does move air, it operates at a steep cost.',
          'When stale warm air is expelled, it is replaced by freezing outdoor drafts. Your heating system is forced to run continuously to maintain temperature. During cold months, traditional ventilation can account for up to 50% of a home’s total heat loss.',
        ],
      },
      {
        title: 'What Makes a Recuperator Different?',
        paragraphs: [
          'A recuperator is an active, balanced system. It utilizes dual fans to extract and supply identical volumes of air simultaneously, ensuring balanced pressure across your entire home.',
          'The core magic is the counter-flow heat exchanger. As the stale exhaust air and fresh supply air pass past each other through micro-channels (never physically mixing), heat is naturally transferred. The incoming cold air is pre-warmed using the heat that would have otherwise been wasted.',
        ],
      },
      {
        title: 'Analyzing the Payback Period',
        paragraphs: [
          'While a mechanical ventilation system requires a higher initial investment in equipment and installation compared to simple extraction fans, it is a financially sound long-term decision.',
          'By recovering over 90% of heat energy, the load on your heating and air-conditioning units is significantly reduced. Homeowners in Georgia typically report a 30-40% reduction in winter heating bills, resulting in a full system payback within 4 to 5 years, along with invaluable health benefits from pure air.',
        ],
      },
    ],
    ka: [
      {
        title: 'ტრადიციული ვენტილაციის ფარული ხარჯები',
        paragraphs: [
          'ისტორიულად, ვენტილაცია პასიური იყო — ეყრდნობოდა ფანჯრების ღრიჭოებსა და სველი წერტილების მარტივ გამწოვებს. მართალია, ეს ჰაერის მიმოქცევას უზრუნველყოფს, მაგრამ ძალიან ძვირი ჯდება.',
          'როდესაც ძველი თბილი ჰაერი გადის გარეთ, მის ადგილს იკავებს ყინულიანი გარე ნაკადი. თქვენი გათბობის სისტემა იძულებულია მუდმივად იმუშაოს ტემპერატურის შესანარჩუნებლად. ზამთარში, ტრადიციული ვენტილაცია სახლის სითბოს დანაკარგის 50%-ზე მეტზეა პასუხისმგებელი.',
        ],
      },
      {
        title: 'რით განსხვავდება რეკუპერატორი?',
        paragraphs: [
          'რეკუპერატორი არის აქტიური, დაბალანსებული სისტემა. ის იყენებს ორ ვენტილატორს ჰაერის ერთდროული მიწოდებისა და გამოტანისთვის, რაც უზრუნველყოფს დაბალანსებულ წნევას სახლში.',
          'მთავარი საიდუმლო სითბოს საწინააღმდეგო გამცვლელშია. შემომავალი და გამავალი ჰაერის ნაკადები გადიან მიკრო-არხებში ფიზიკური შერევის გარეშე და სითბო ბუნებრივად გადაეცემა შემომავალ ცივ ჰაერს.',
        ],
      },
      {
        title: 'საინვესტიციო ანაზღაურების ანალიზი',
        paragraphs: [
          'მიუხედავად იმისა, რომ მექანიკური ვენტილაცია თავიდან უფრო მეტ ინვესტიციას მოითხოვს, ვიდრე უბრალო გამწოვი, ფინანსურად ეს გრძელვადიანი და გონივრული ნაბიჯია.',
          'სითბოს ენერგიის 90%-ზე მეტის შენარჩუნებით, გათბობისა და კონდიცირების დატვირთვა მნიშვნელოვნად მცირდება. საქართველოში მომხმარებლები ზამთარში გათბობის ხარჯების 30-40%-იან შემცირებას აღნიშნავენ, რაც სისტემის სრულ ანაზღაურებას 4-5 წელიწადში უზრუნველყოფს.',
        ],
      },
    ],
  },
  'fantini-cosmi-heritage': {
    en: [
      {
        title: 'Milan, 1951: The Birth of a Climate Control Pioneer',
        paragraphs: [
          'Seven decades ago, in the industrial heart of Milan, Fantini Cosmi was founded with a singular, clear vision: to design precision controls and technologies that elevate the comfort and safety of indoor spaces.',
          'Throughout its history, Fantini Cosmi has been synonymous with high quality, rugged reliability, and forward-thinking Italian design. What began as a localized engineering shop has evolved into a global leader, operating across dozens of countries while retaining its commitment to local European manufacturing.',
        ],
      },
      {
        title: 'Engineering Meets Elegant Design',
        paragraphs: [
          'Italian design is celebrated globally for its ability to marry form and function. Fantini Cosmi product design strictly adheres to this philosophy. A recuperator or ventilator should not look like an industrial appliance.',
          'Instead, every grille, interface, and panel is designed with sleek lines, neutral finishes, and intuitive controls that seamlessly disappear into modern architecture. Behind the beautiful exterior lies rigorous technical standards — whisper-quiet EC motors and highly advanced thermodynamic cores.',
        ],
      },
      {
        title: 'Alivo & Fantini Cosmi: Pure Air for Georgia',
        paragraphs: [
          'As the official partner of Fantini Cosmi in Georgia, Alivo is proud to deliver these world-class ventilation solutions to Tbilisi, Batumi, Kutaisi, and beyond.',
          'We pair Fantini Cosmi’s decades of precision engineering with our expert local team, covering every stage from design to professional installation and continuous maintenance. When you choose Alivo, you are investing in a healthier life, supported by 70 years of world-class engineering.',
        ],
      },
    ],
    ka: [
      {
        title: 'მილანი, 1951: კლიმატის კონტროლის პიონერის დაბადება',
        paragraphs: [
          'შვიდი ათეული წლის წინ, მილანის ინდუსტრიულ გულში, Fantini Cosmi დაარსდა ერთი ნათელი ხედვით: შეექმნა ზუსტი კონტროლის სისტემები და ტექნოლოგიები, რომლებიც გააუმჯობესებდნენ შიდა სივრცეების კომფორტსა და უსაფრთხოებას.',
          'თავისი ისტორიის განმავლობაში, Fantini Cosmi გახდა ხარისხის, საიმედოობისა და იტალიური დიზაინის სინონიმი. მცირე საინჟინრო სახელოსნოდან ბრენდი იქცა გლობალურ ლიდერად, რომელიც ათეულობით ქვეყანაში ოპერირებს.',
        ],
      },
      {
        title: 'საინჟინრო სიზუსტე და ელეგანტური დიზაინი',
        paragraphs: [
          'იტალიური დიზაინი ცნობილია ფორმისა და ფუნქციის იდეალური შერწყმით. Fantini Cosmi მკაცრად მიჰყვება ამ ფილოსოფიას. რეკუპერატორი ან ვენტილატორი არ უნდა ჰგავდეს უხეშ ინდუსტრიულ დანადგარს.',
          'პირიქით, ყოველი დეტალი და პანელი შექმნილია ელეგანტური ხაზებითა და ინტუიტიური მართვით, რომლებიც ბუნებრივად ერწყმის თანამედროვე არქიტექტურას. მშვენიერი ექსტერიერის მიღმა კი უახლესი ტექნოლოგიები და ჩუმი EC ძრავები იმალება.',
        ],
      },
      {
        title: 'Alivo & Fantini Cosmi: სუფთა ჰაერი საქართველოსთვის',
        paragraphs: [
          'როგორც Fantini Cosmi-ს ოფიციალური პარტნიორი საქართველოში, Alivo ამაყობს, რომ გთავაზობთ ამ პრემიუმ კლასის სისტემებს თბილისში, ბათუმში, ქუთაისსა და სხვა ქალაქებში.',
          'ჩვენ ვაერთიანებთ Fantini Cosmi-ს მრავალწლიან გამოცდილებას ჩვენს ადგილობრივ პროფესიონალიზმთან — ვფარავთ ყველა ეტაპს პროექტირებიდან მონტაჟამდე და სერვისამდე. Alivo-ს არჩევით თქვენ ინვესტიციას აკეთებთ ჯანმრთელობაში.',
        ],
      },
    ],
  },
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const { lang, slug } = await params

  if (!hasLocale(lang)) notFound()

  const post = await getBlogBySlug(slug)
  if (!post) notFound()

  const dict = await getDictionary(lang as Locale)
  const b = dict.blogs
  const locale = lang as Locale

  // Admin-authored posts carry structured `body` blocks. The original seed posts
  // fall back to the rich, hand-written section content below.
  const blocks = post.body ?? []
  const legacyContent = blocks.length === 0 ? BLOG_CONTENTS[slug]?.[locale] || [] : []

  // Get similar articles (excluding this one)
  const relatedPosts = (await getBlogs()).filter((p) => p.slug !== slug).slice(0, 2)

  const dateFormatted = new Date(post.date).toLocaleDateString(lang === 'ka' ? 'ka-GE' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="bg-[#0C1A23] min-h-[85vh] text-[#DAEFFF] py-16 px-6">
      <article className="max-w-4xl mx-auto">
        {/* Editorial Breadcrumb */}
        <nav className="flex items-center gap-2 text-[#DAEFFF]/40 text-xs font-semibold tracking-wider uppercase mb-8">
          <Link href={`/${lang}`} className="hover:text-[#DAEFFF] transition-colors">
            {lang === 'ka' ? 'მთავარი' : 'Home'}
          </Link>
          <span>/</span>
          <Link href={`/${lang}/blog`} className="hover:text-[#DAEFFF] transition-colors">
            {lang === 'ka' ? 'ბლოგი' : 'Blog'}
          </Link>
          <span>/</span>
          <span className="text-[#DAEFFF]/80 truncate max-w-[200px]">
            {post.category[lang as Locale]}
          </span>
        </nav>

        {/* Header Block */}
        <div className="flex flex-col gap-4 mb-10">
          <div className="flex items-center gap-3">
            <span className="bg-[#DAEFFF]/10 text-[#DAEFFF] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-[#DAEFFF]/20">
              {post.category[lang as Locale]}
            </span>
            <span className="text-[#DAEFFF]/40 text-xs">{dateFormatted}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-[#DAEFFF]">
            {post.title[lang as Locale]}
          </h1>
          <p className="text-[#DAEFFF]/70 text-base sm:text-lg leading-relaxed font-medium max-w-3xl mt-2">
            {post.summary[lang as Locale]}
          </p>
        </div>

        {/* Feature / cover image */}
        <div className="relative rounded-3xl overflow-hidden border border-[#DAEFFF]/15 mb-14">
          {post.coverImage ? (
            <div className="relative w-full aspect-[21/9]">
              <Image
                src={post.coverImage}
                alt={post.title[locale]}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <PlaceholderImage
              color={post.placeholderColor}
              accentColor="#DAEFFF"
              aspectRatio="21/9"
              className="w-full h-full"
              pattern="grid"
            />
          )}
        </div>

        {/* Article Body */}
        <div className="max-w-3xl mx-auto flex flex-col gap-8 text-[#DAEFFF]/85 text-base sm:text-lg leading-relaxed">
          {/* Admin-authored content blocks */}
          {blocks.map((block, idx) => {
            switch (block.type) {
              case 'heading':
                return (
                  <h2 key={idx} className="text-[#DAEFFF] text-xl sm:text-2xl font-bold tracking-tight mt-2">
                    {block.text[locale]}
                  </h2>
                )
              case 'paragraph':
                return (
                  <p key={idx} className="whitespace-pre-line">
                    {block.text[locale]}
                  </p>
                )
              case 'image':
                return (
                  <figure key={idx} className="flex flex-col gap-2">
                    <div className="relative w-full overflow-hidden rounded-2xl border border-[#DAEFFF]/15">
                      <Image
                        src={block.url}
                        alt={block.caption?.[locale] ?? post.title[locale]}
                        width={1280}
                        height={720}
                        sizes="(max-width: 1024px) 100vw, 768px"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    {block.caption?.[locale] && (
                      <figcaption className="text-[#DAEFFF]/45 text-sm text-center">
                        {block.caption[locale]}
                      </figcaption>
                    )}
                  </figure>
                )
              case 'youtube':
                return <YouTubeEmbed key={idx} url={block.url} />
              default:
                return null
            }
          })}

          {/* Legacy seed-post content */}
          {legacyContent.map((sec, idx) => (
            <section key={idx} className="flex flex-col gap-4">
              <h2 className="text-[#DAEFFF] text-xl sm:text-2xl font-bold tracking-tight">
                {sec.title}
              </h2>
              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </section>
          ))}
        </div>

        {/* Horizontal separator */}
        <div className="h-px bg-[#DAEFFF]/10 my-16" />

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="max-w-5xl mx-auto">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-8 text-center uppercase tracking-[0.15em] text-[#DAEFFF]/70">
              {lang === 'ka' ? 'სხვა სტატიები' : 'Keep Reading'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center max-w-3xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <BlogCard
                  key={relatedPost.slug}
                  post={relatedPost}
                  lang={lang as Locale}
                  readMoreLabel={b.readMore}
                />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
