import type { BlogPost } from '../types'

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'why-indoor-air-quality-matters',
    date: '2026-03-15',
    placeholderColor: '#0C1A23',
    category: { en: 'Air Quality', ka: 'ჰაერის ხარისხი' },
    title: {
      en: 'Why Indoor Air Quality Matters More Than You Think',
      ka: 'რატომ არის შიდა ჰაერის ხარისხი უფრო მნიშვნელოვანი, ვიდრე ფიქრობთ',
    },
    summary: {
      en: 'We spend 90% of our time indoors, yet indoor air can be 2–5× more polluted than outdoor air. Learn the hidden sources of indoor pollution and how recuperators address them.',
      ka: 'ჩვენ დროის 90%-ს სახლში ვატარებთ, მაგრამ შიდა ჰაერი შეიძლება 2–5-ჯერ უფრო დაბინძურებული იყოს, ვიდრე გარე ჰაერი.',
    },
  },
  {
    slug: 'recuperator-vs-traditional-ventilation',
    date: '2026-02-28',
    placeholderColor: '#263947',
    category: { en: 'Guides', ka: 'სახელმძღვანელო' },
    title: {
      en: 'Recuperator vs Traditional Ventilation: The Real Cost Comparison',
      ka: 'რეკუპერატორი vs ტრადიციული ვენტილაცია: ფასის რეალური შედარება',
    },
    summary: {
      en: 'Traditional ventilation wastes 60–70% of your heating energy through the exhaust. We break down the numbers — installation cost, running cost, and payback period.',
      ka: 'ტრადიციული ვენტილაცია გამოტანის მეშვეობით კარგავს გათბობის ენერგიის 60–70%-ს. ვანგარიშობთ ციფრებს — ინსტალაციის ფასი, ოპერაციული ხარჯი, ანაზღაურების ვადა.',
    },
  },
  {
    slug: 'fantini-cosmi-heritage',
    date: '2026-02-10',
    placeholderColor: '#DAEFFF',
    category: { en: 'Brand Story', ka: 'ბრენდის ამბავი' },
    title: {
      en: 'Fantini Cosmi: 70 Years of Italian Engineering in Your Home',
      ka: 'Fantini Cosmi: 70 წელი იტალიური ინჟინერია თქვენს სახლში',
    },
    summary: {
      en: 'Founded in Milan in 1951, Fantini Cosmi has been engineering climate control and ventilation solutions for seven decades. Here is the story behind the technology in every Alivo product.',
      ka: 'დაარსდა მილანში 1951 წელს, Fantini Cosmi შვიდი ათეული წელია ქმნის კლიმატის კონტროლისა და ვენტილაციის გადაწყვეტილებებს.',
    },
  },
]
