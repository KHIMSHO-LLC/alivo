import type { Review } from '../types'

export const REVIEWS: Review[] = [
  {
    author: 'Giorgi Beridze',
    location: { en: 'Tbilisi', ka: 'თბილისი' },
    rating: 5,
    body: {
      en: 'Installed the Reco 200 in our new apartment and the difference is night and day. No more condensation on windows in winter, and the air feels genuinely fresh. The noise level is almost imperceptible.',
      ka: 'Reco 200 დავაყენეთ ახალ ბინაში და განსხვავება გასაოცარია. ზამთარში ფანჯრებზე არარ ხდება კონდენსაცია და ჰაერი ნამდვილად სუფთა გრძნობს. ხმაური თითქმის შეუმჩნეველია.',
    },
  },
  {
    author: 'Nino Kvaratskhelia',
    location: { en: 'Batumi', ka: 'ბათუმი' },
    rating: 5,
    body: {
      en: 'The Vento Silent in our bedroom has transformed our sleep. We used to wake up with dry throats — that problem is completely gone. Alivo\'s team was helpful throughout the installation process.',
      ka: 'Vento Silent საძინებელში ჩვენი ძილი სრულიად შეიცვალა. ადრე გვიწევდა მშრალი ყელით გაღვიძება — ეს პრობლემა სრულიად გაქრა. Alivo-ს გუნდი მთელი ინსტალაციის პროცესში გვეხმარებოდა.',
    },
  },
  {
    author: 'Luka Mchedlishvili',
    location: { en: 'Kutaisi', ka: 'ქუთაისი' },
    rating: 5,
    body: {
      en: 'After 6 months with the Reco 100, our heating bills dropped noticeably. The heat recovery is real — you can actually feel that the incoming air is warm even in January. Very impressed.',
      ka: 'Reco 100-ით 6 თვის შემდეგ, გათბობის გადასახადი შეამჩნევი შემცირდა. სითბოს რეკუპერაცია ნამდვილია — შეგიძლია გრძნობდე, რომ შემომავალი ჰაერი იანვარშიც კი თბილია. ძალიან შთამბეჭდავია.',
    },
  },
  {
    author: 'Ana Tsiklauri',
    location: { en: 'Tbilisi', ka: 'თბილისი' },
    rating: 5,
    body: {
      en: 'We have two young children with allergies and the HEPA filtration in the Reco 100 has made a significant difference. Dust levels are visibly lower and both kids sleep better. Worth every lari.',
      ka: 'ჩვენ გვყავს ორი პატარა ბავშვი ალერგიით და Reco 100-ის HEPA ფილტრაციამ მნიშვნელოვანი სხვაობა შეიტანა. მტვრის დონე თვალსაჩინოდ შემცირდა და ორივე ბავშვი უკეთ სძინავს.',
    },
  },
  {
    author: 'David Javakhishvili',
    location: { en: 'Rustavi', ka: 'რუსთავი' },
    rating: 4,
    body: {
      en: 'The Vento Pro in our bathroom is exactly what we needed. No more mould issues and it turns on automatically without us thinking about it. Installation was straightforward and quick.',
      ka: 'Vento Pro სველ წერტილში ზუსტად ის არის, რაც გვჭირდებოდა. ობის პრობლემები აღარ არის და ავტომატურად ირთვება ჩვენი ფიქრის გარეშე. ინსტალაცია მარტივი და სწრაფი იყო.',
    },
  },
]
