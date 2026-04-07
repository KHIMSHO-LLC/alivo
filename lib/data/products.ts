import type { Category, Product } from '../types'

export const CATEGORIES: Category[] = [
  {
    slug: 'recuperators',
    name: { en: 'Recuperators', ka: 'რეკუპერატორები' },
    description: {
      en: 'Energy-recovery ventilation systems that bring fresh air indoors while retaining heat.',
      ka: 'ენერგოდაზოგვის ვენტილაციის სისტემები, რომლებიც სუფთა ჰაერს შეაქვს სახლში სითბოს შენარჩუნებით.',
    },
    heroTagline: {
      en: 'Breathe Fresh. Save Energy.',
      ka: 'ისუნთქე სუფთად. დაზოგე ენერგია.',
    },
    placeholderColor: '#263947',
    explainerTitle: {
      en: 'What is a Recuperator?',
      ka: 'რა არის რეკუპერატორი?',
    },
    explainerBody: {
      en: 'A recuperator is a heat-exchange ventilation unit that continuously supplies filtered fresh air to your living space while recovering up to 95% of the energy from exhaust air. Unlike traditional ventilation, it maintains comfortable indoor temperatures year-round — without wasting energy.',
      ka: 'რეკუპერატორი არის სითბოს გაცვლის ვენტილაციის მოწყობილობა, რომელიც უწყვეტად მიაწვდის გაფილტრულ სუფთა ჰაერს თქვენს სახლში, ამავდროულად გამოტანილი ჰაერის ენერგიის 95%-ამდე ინარჩუნებს. ჩვეულებრივი ვენტილაციისგან განსხვავებით, ის მთელი წლის განმავლობაში ინარჩუნებს კომფორტულ ტემპერატურას — ენერგიის დაკარგვის გარეშე.',
    },
    howItWorks: [
      {
        step: 1,
        title: { en: 'Fresh Air In', ka: 'სუფთა ჰაერი შედის' },
        description: {
          en: 'Outside air is drawn in through the intake filter, removing dust, pollen and pollutants.',
          ka: 'გარე ჰაერი შედის შიდა ფილტრის მეშვეობით, თან წაიღებს მტვერს, მტვერვარდნას და დამაბინძურებლებს.',
        },
      },
      {
        step: 2,
        title: { en: 'Heat Exchange', ka: 'სითბოს გაცვლა' },
        description: {
          en: 'Incoming cold air passes through the heat exchanger, absorbing warmth from outgoing stale air.',
          ka: 'შემომავალი ცივი ჰაერი გადის სითბოს გამცვლელზე, სადაც ითვისებს გამოსული ჰაერის სითბოს.',
        },
      },
      {
        step: 3,
        title: { en: 'Pure Air Circulated', ka: 'სუფთა ჰაერის მიმოქცევა' },
        description: {
          en: 'Pre-warmed, filtered air is quietly distributed throughout your home.',
          ka: 'წინასწარ გახურებული, გაფილტრული ჰაერი ჩუმად ნაწილდება სახლის ყველა ოთახში.',
        },
      },
      {
        step: 4,
        title: { en: 'Stale Air Expelled', ka: 'ჩამდინარე ჰაერის გაძევება' },
        description: {
          en: 'Used air is expelled outdoors — cleanly, without cross-contamination.',
          ka: 'გამოყენებული ჰაერი გარეთ გაიდევნება — სუფთად, ჯვარედინი დაბინძურების გარეშე.',
        },
      },
    ],
  },
  {
    slug: 'ventilators',
    name: { en: 'Ventilators', ka: 'ვენტილატორები' },
    description: {
      en: 'High-performance ventilation systems engineered for optimal airflow and silent operation.',
      ka: 'მაღალი ეფექტურობის ვენტილაციის სისტემები, შექმნილი ოპტიმალური ჰაერის ნაკადისა და ჩუმი მუშაობისთვის.',
    },
    heroTagline: {
      en: 'Silent Power. Pure Air.',
      ka: 'ჩუმი სიმძლავრე. სუფთა ჰაერი.',
    },
    placeholderColor: '#0C1A23',
    explainerTitle: {
      en: 'What is a Ventilator?',
      ka: 'რა არის ვენტილატორი?',
    },
    explainerBody: {
      en: 'A mechanical ventilator is an active air exchange system that removes stale, humid or polluted indoor air and replaces it with fresh outdoor air. Fantini Cosmi ventilators are engineered for whisper-quiet operation, low energy consumption and installation flexibility — from single rooms to whole-house systems.',
      ka: 'მექანიკური ვენტილატორი არის ჰაერის გაცვლის აქტიური სისტემა, რომელიც ამოიღებს დახუჭულ, ნოტიო ან დაბინძურებულ შიდა ჰაერს და ცვლის სუფთა გარე ჰაერით. Fantini Cosmi-ის ვენტილატორები შექმნილია ჩუმი მუშაობის, დაბალი ენერგიის მოხმარების და ინსტალაციის მოქნილობისთვის — ერთი ოთახიდან სრულ სახლამდე.',
    },
    howItWorks: [
      {
        step: 1,
        title: { en: 'Detect & Measure', ka: 'გამოვლენა და გაზომვა' },
        description: {
          en: 'Integrated sensors detect CO₂, humidity and air quality in real time.',
          ka: 'ინტეგრირებული სენსორები რეალური დროით ზომავენ CO₂-ს, ტენიანობას და ჰაერის ხარისხს.',
        },
      },
      {
        step: 2,
        title: { en: 'Smart Adjustment', ka: 'ჭკვიანი რეგულირება' },
        description: {
          en: 'Fan speed adjusts automatically to meet air quality targets, saving energy when demand is low.',
          ka: 'ვენტილატორის სიჩქარე ავტომატურად რეგულირდება ჰაერის ხარისხის მიზნების მისაღწევად, ნაკლები მოთხოვნისას ენერგია იზოგება.',
        },
      },
      {
        step: 3,
        title: { en: 'Silent Operation', ka: 'ჩუმი მუშაობა' },
        description: {
          en: 'EC motor technology delivers powerful airflow at noise levels below 25 dB(A).',
          ka: 'EC ძრავის ტექნოლოგია უზრუნველყოფს ძლიერ ჰაერის ნაკადს 25 dB(A)-ზე დაბალი ხმაურის დონეზე.',
        },
      },
    ],
  },
]

export const PRODUCTS: Product[] = [
  // Recuperators
  {
    slug: 'reco-100',
    name: { en: 'Reco 100', ka: 'Reco 100' },
    categorySlug: 'recuperators',
    tagline: {
      en: 'Compact whole-home recovery ventilation',
      ka: 'კომპაქტური სახლის ვენტილაცია ენერგიის რეკუპერაციით',
    },
    description: {
      en: 'The Reco 100 delivers continuous balanced ventilation for apartments up to 120 m², recovering up to 92% of heat energy. Ultra-quiet EC fan motor. Built-in bypass for summer free-cooling.',
      ka: 'Reco 100 უზრუნველყოფს უწყვეტ დაბალანსებულ ვენტილაციას 120 მ²-მდე ბინებისთვის, ინარჩუნებს სითბო-ენერგიის 92%-მდე. ულტრამშვიდი EC ვენტილატორის ძრავა. ჩაშენებული bypass ზაფხულის უფასო გაგრილებისთვის.',
    },
    isBestseller: true,
    placeholderColor: '#263947',
    imageCount: 3,
    benefits: [
      {
        icon: '🌬️',
        title: { en: 'Up to 92% Heat Recovery', ka: 'სითბოს 92%-მდე დაბრუნება' },
        body: {
          en: 'Cross-flow aluminium heat exchanger retains almost all thermal energy from exhaust air.',
          ka: 'ჯვარედინი ალუმინის სითბოს გამცვლელი ინარჩუნებს გამოტანილი ჰაერის თითქმის ყველა თერმულ ენერგიას.',
        },
      },
      {
        icon: '🔇',
        title: { en: 'Ultra-Quiet — < 22 dB', ka: 'ულტრა-ჩუმი — < 22 dB' },
        body: {
          en: 'EC motor with aerodynamic fan blades operates below the threshold of human perception.',
          ka: 'EC ძრავა აეროდინამიური ფრთებით მუშაობს ადამიანის აღქმის ზღვარს ქვემოთ.',
        },
      },
      {
        icon: '🍃',
        title: { en: 'HEPA-Grade Filtration', ka: 'HEPA-კლასის ფილტრაცია' },
        body: {
          en: 'G4 + F7 dual-stage filters trap pollen, dust mites and fine particulates (PM2.5).',
          ka: 'G4 + F7 ორსაფეხურიანი ფილტრები ჭერს მტვერვარდნას, მტვრის ტკიპებს და წვრილ ნაწილაკებს (PM2.5).',
        },
      },
      {
        icon: '⚡',
        title: { en: 'Low Energy Consumption', ka: 'დაბალი ენერგიის მოხმარება' },
        body: {
          en: 'Runs on as little as 18W — less than a standard light bulb — at nominal flow rate.',
          ka: 'მუშაობს სულ 18W-ზე — ჩვეულებრივ ნათურაზე ნაკლები — ნომინალური ნაკადის სიჩქარეზე.',
        },
      },
    ],
    features: [
      { label: { en: 'Air Flow', ka: 'ჰაერის ნაკადი' }, value: { en: '20–100 m³/h', ka: '20–100 მ³/სთ' } },
      { label: { en: 'Heat Recovery', ka: 'სითბოს რეკუპერაცია' }, value: { en: 'Up to 92%', ka: '92%-მდე' } },
      { label: { en: 'Noise Level', ka: 'ხმაური' }, value: { en: '< 22 dB(A)', ka: '< 22 dB(A)' } },
      { label: { en: 'Power Consumption', ka: 'ენერგიის მოხმარება' }, value: { en: '18–45 W', ka: '18–45 W' } },
      { label: { en: 'Filter Class', ka: 'ფილტრის კლასი' }, value: { en: 'G4 + F7', ka: 'G4 + F7' } },
      { label: { en: 'Coverage Area', ka: 'სივრცე' }, value: { en: 'Up to 120 m²', ka: '120 მ²-მდე' } },
      { label: { en: 'Dimensions', ka: 'ზომები' }, value: { en: '520 × 390 × 180 mm', ka: '520 × 390 × 180 მმ' } },
      { label: { en: 'Weight', ka: 'წონა' }, value: { en: '8.5 kg', ka: '8.5 კგ' } },
    ],
  },
  {
    slug: 'reco-200',
    name: { en: 'Reco 200', ka: 'Reco 200' },
    categorySlug: 'recuperators',
    tagline: {
      en: 'Premium dual-flow recuperator for larger homes',
      ka: 'პრემიუმ ორმხრივი ნაკადის რეკუპერატორი დიდი სახლებისთვის',
    },
    description: {
      en: 'Designed for homes up to 250 m², the Reco 200 features a counterflow enthalpy exchanger for year-round moisture balancing alongside class-leading heat recovery.',
      ka: 'შექმნილია 250 მ²-მდე სახლებისთვის, Reco 200-ს აქვს საწინააღმდეგო ნაკადის ენტალპიის გამცვლელი წლიური ტენიანობის დაბალანსებისთვის.',
    },
    isBestseller: true,
    placeholderColor: '#0C1A23',
    imageCount: 4,
    benefits: [
      {
        icon: '💧',
        title: { en: 'Enthalpy Exchange', ka: 'ენტალპიის გაცვლა' },
        body: {
          en: 'Recovers both heat and moisture — preventing dry air in winter and over-humidification in summer.',
          ka: 'ბრუნებს სითბოს და ტენიანობას — ზამთარში მშრალი ჰაერის და ზაფხულში გადაჭარბებული ტენიანობის თავიდან ასაცილებლად.',
        },
      },
      {
        icon: '🏠',
        title: { en: 'Covers 250 m²', ka: 'ფარავს 250 მ²-ს' },
        body: {
          en: 'Dual-fan design ensures balanced pressure in large multi-room homes.',
          ka: 'ორმხრივი ვენტილატორის კონსტრუქცია უზრუნველყოფს დაბალანსებულ წნევას დიდ მრავალოთახიან სახლებში.',
        },
      },
      {
        icon: '📱',
        title: { en: 'Smart Control', ka: 'ჭკვიანი კონტროლი' },
        body: {
          en: 'Wi-Fi module included. Control via the Fantini Cosmi app or smart home integrations.',
          ka: 'Wi-Fi მოდული ჩართულია. კონტროლი Fantini Cosmi-ს აპლიკაციით ან ჭკვიანი სახლის ინტეგრაციებით.',
        },
      },
      {
        icon: '❄️',
        title: { en: 'Summer Bypass', ka: 'ზაფხულის Bypass' },
        body: {
          en: 'Automatic bypass mode for night-time free-cooling when outdoor air is cooler than indoors.',
          ka: 'ავტომატური bypass რეჟიმი ღამის უფასო გაგრილებისთვის, როდესაც გარე ჰაერი შიდა ჰაერზე გრილია.',
        },
      },
    ],
    features: [
      { label: { en: 'Air Flow', ka: 'ჰაერის ნაკადი' }, value: { en: '30–200 m³/h', ka: '30–200 მ³/სთ' } },
      { label: { en: 'Heat Recovery', ka: 'სითბოს რეკუპერაცია' }, value: { en: 'Up to 95%', ka: '95%-მდე' } },
      { label: { en: 'Exchanger Type', ka: 'გამცვლელის ტიპი' }, value: { en: 'Enthalpy counterflow', ka: 'ენტალპიის საწინააღმდეგო' } },
      { label: { en: 'Noise Level', ka: 'ხმაური' }, value: { en: '< 26 dB(A)', ka: '< 26 dB(A)' } },
      { label: { en: 'Power Consumption', ka: 'ენერგიის მოხმარება' }, value: { en: '30–80 W', ka: '30–80 W' } },
      { label: { en: 'Coverage Area', ka: 'სივრცე' }, value: { en: 'Up to 250 m²', ka: '250 მ²-მდე' } },
      { label: { en: 'Connectivity', ka: 'კავშირი' }, value: { en: 'Wi-Fi (app control)', ka: 'Wi-Fi (აპ კონტროლი)' } },
      { label: { en: 'Weight', ka: 'წონა' }, value: { en: '12 kg', ka: '12 კგ' } },
    ],
  },
  {
    slug: 'reco-slim',
    name: { en: 'Reco Slim', ka: 'Reco Slim' },
    categorySlug: 'recuperators',
    tagline: {
      en: 'Wall-mounted single-room recuperator',
      ka: 'კედელზე დამაგრებული ერთოთახიანი რეკუპერატორი',
    },
    description: {
      en: 'Perfect for retrofitting individual rooms without ductwork. The Reco Slim mounts through a single 160mm wall core and operates in alternating push-pull cycles.',
      ka: 'სრულყოფილია ცალკეული ოთახების განახლებისთვის სადინარების გარეშე. Reco Slim მაგრდება 160 მმ კედლის ბირთვის მეშვეობით.',
    },
    isBestseller: false,
    placeholderColor: '#DAEFFF',
    imageCount: 2,
    benefits: [
      {
        icon: '🔧',
        title: { en: 'No Ductwork Needed', ka: 'სადინარები საჭირო არ არის' },
        body: {
          en: 'Single 160mm core drill is all it takes. Ideal for renovations and retrofits.',
          ka: 'საჭიროა მხოლოდ 160 მმ-იანი ბირთვის ბურღვა. იდეალურია რემონტისა და განახლებისთვის.',
        },
      },
      {
        icon: '🔄',
        title: { en: 'Alternating Cycle', ka: 'მონაცვლე ციკლი' },
        body: {
          en: 'Ceramic regenerator stores and returns heat on each 70-second supply/exhaust cycle.',
          ka: 'კერამიკული რეგენერატორი ინახავს და აბრუნებს სითბოს ყოველ 70-წამიან მიწოდება/გამოტანის ციკლზე.',
        },
      },
      {
        icon: '🎨',
        title: { en: 'Minimal Wall Presence', ka: 'მინიმალური კედლის ყოფნა' },
        body: {
          en: 'Flush-mounted front grille in white or anthracite — barely visible when installed.',
          ka: 'ჩაშენებული წინა მცველი თეთრ ან ანტრაციტის ფერში — ინსტალაციის შემდეგ თითქმის შეუმჩნეველია.',
        },
      },
    ],
    features: [
      { label: { en: 'Air Flow', ka: 'ჰაერის ნაკადი' }, value: { en: '15–40 m³/h', ka: '15–40 მ³/სთ' } },
      { label: { en: 'Heat Recovery', ka: 'სითბოს რეკუპერაცია' }, value: { en: 'Up to 88%', ka: '88%-მდე' } },
      { label: { en: 'Core Diameter', ka: 'ბირთვის დიამეტრი' }, value: { en: '160 mm', ka: '160 მმ' } },
      { label: { en: 'Noise Level', ka: 'ხმაური' }, value: { en: '< 19 dB(A)', ka: '< 19 dB(A)' } },
      { label: { en: 'Power Consumption', ka: 'ენერგიის მოხმარება' }, value: { en: '1.5–5 W', ka: '1.5–5 W' } },
      { label: { en: 'Coverage Area', ka: 'სივრცე' }, value: { en: 'Up to 40 m²', ka: '40 მ²-მდე' } },
    ],
  },
  // Ventilators
  {
    slug: 'vento-pro',
    name: { en: 'Vento Pro', ka: 'Vento Pro' },
    categorySlug: 'ventilators',
    tagline: {
      en: 'Demand-controlled bathroom & kitchen ventilation',
      ka: 'მოთხოვნაზე კონტროლირებული სველი წერტილის ვენტილაცია',
    },
    description: {
      en: 'The Vento Pro uses integrated humidity and motion sensors to run only when needed — eliminating over-ventilation while ensuring perfect air quality in wet rooms.',
      ka: 'Vento Pro იყენებს ინტეგრირებულ ტენიანობის და მოძრაობის სენსორებს, მუშაობს მხოლოდ საჭიროების შემთხვევაში.',
    },
    isBestseller: true,
    placeholderColor: '#263947',
    imageCount: 3,
    benefits: [
      {
        icon: '💧',
        title: { en: 'Humidity Sensing', ka: 'ტენიანობის სენსორი' },
        body: {
          en: 'Automatic activation when relative humidity exceeds 70% — prevents mould and condensation.',
          ka: 'ავტომატური ჩართვა, როდესაც შედარებითი ტენიანობა 70%-ს გადააჭარბებს — ხელს უშლის ობს და კონდენსაციას.',
        },
      },
      {
        icon: '🏃',
        title: { en: 'Motion Detection', ka: 'მოძრაობის გამოვლენა' },
        body: {
          en: 'PIR sensor activates ventilation on entry and runs for a configurable period after exit.',
          ka: 'PIR სენსორი ააქტიურებს ვენტილაციას შესვლისას და მუშაობს კონფიგურირებადი პერიოდის განმავლობაში გასვლის შემდეგ.',
        },
      },
      {
        icon: '⚡',
        title: { en: '3W Standby Power', ka: '3W მუდმივი სიმძლავრე' },
        body: {
          en: 'EC motor sips just 3W on trickle mode — always ready, never wasteful.',
          ka: 'EC ძრავა მოიხმარს სულ 3W ნაკადის რეჟიმში — ყოველთვის მზადაა, არასდროს ზვიადი.',
        },
      },
    ],
    features: [
      { label: { en: 'Air Flow', ka: 'ჰაერის ნაკადი' }, value: { en: '15–100 m³/h', ka: '15–100 მ³/სთ' } },
      { label: { en: 'Humidity Sensor', ka: 'ტენიანობის სენსორი' }, value: { en: '40–90% RH', ka: '40–90% RH' } },
      { label: { en: 'Noise Level', ka: 'ხმაური' }, value: { en: '< 25 dB(A)', ka: '< 25 dB(A)' } },
      { label: { en: 'Power Consumption', ka: 'ენერგიის მოხმარება' }, value: { en: '3–18 W', ka: '3–18 W' } },
      { label: { en: 'Sensors', ka: 'სენსორები' }, value: { en: 'Humidity + PIR', ka: 'ტენიანობა + PIR' } },
      { label: { en: 'Duct Diameter', ka: 'სადინარის დიამეტრი' }, value: { en: '100 / 125 mm', ka: '100 / 125 მმ' } },
    ],
  },
  {
    slug: 'vento-silent',
    name: { en: 'Vento Silent', ka: 'Vento Silent' },
    categorySlug: 'ventilators',
    tagline: {
      en: 'The quietest ventilator in its class',
      ka: 'ყველაზე ჩუმი ვენტილატორი თავის კლასში',
    },
    description: {
      en: 'Engineered for bedrooms and living rooms where silence matters. The Vento Silent runs at an imperceptible 17 dB(A) on minimum speed — you will not know it is there.',
      ka: 'შექმნილია საძინებლებისა და მისაღებებისთვის, სადაც სიჩუმე მნიშვნელოვანია. Vento Silent მუშაობს 17 dB(A)-ზე მინიმალური სიჩქარეზე.',
    },
    isBestseller: true,
    placeholderColor: '#0C1A23',
    imageCount: 3,
    benefits: [
      {
        icon: '🔇',
        title: { en: '17 dB(A) at Min Speed', ka: '17 dB(A) მინიმალურ სიჩქარეზე' },
        body: {
          en: 'Acoustically decoupled motor mount and vibration-absorbing housing reduce noise to near silence.',
          ka: 'აკუსტიკურად გამოყოფილი ძრავის სახმარი და ვიბრაციის შთამნთქმელი კორპუსი ხმაურს თითქმის სიჩუმემდე ამცირებს.',
        },
      },
      {
        icon: '🌙',
        title: { en: 'Night Mode', ka: 'ღამის რეჟიმი' },
        body: {
          en: 'Automatically reduces speed from 23:00–07:00, keeping bedrooms perfectly ventilated while you sleep.',
          ka: 'ავტომატურად ამცირებს სიჩქარეს 23:00–07:00, საძინებლებს სრულყოფილი ვენტილაციით ინახავს ძილის დროს.',
        },
      },
      {
        icon: '🌿',
        title: { en: 'CO₂ Monitoring', ka: 'CO₂ მონიტორინგი' },
        body: {
          en: 'Built-in NDIR CO₂ sensor auto-increases ventilation when occupancy rises.',
          ka: 'ჩაშენებული NDIR CO₂ სენსორი ავტომატურად ზრდის ვენტილაციას, როდესაც ოკუპაცია მატულობს.',
        },
      },
    ],
    features: [
      { label: { en: 'Air Flow', ka: 'ჰაერის ნაკადი' }, value: { en: '20–120 m³/h', ka: '20–120 მ³/სთ' } },
      { label: { en: 'Min Noise Level', ka: 'მინ. ხმაური' }, value: { en: '17 dB(A)', ka: '17 dB(A)' } },
      { label: { en: 'CO₂ Sensor', ka: 'CO₂ სენსორი' }, value: { en: 'NDIR, 400–2000 ppm', ka: 'NDIR, 400–2000 ppm' } },
      { label: { en: 'Power Consumption', ka: 'ენერგიის მოხმარება' }, value: { en: '5–22 W', ka: '5–22 W' } },
      { label: { en: 'Night Mode', ka: 'ღამის რეჟიმი' }, value: { en: 'Configurable schedule', ka: 'კონფიგურირებადი' } },
      { label: { en: 'Duct Diameter', ka: 'სადინარის დიამეტრი' }, value: { en: '125 / 150 mm', ka: '125 / 150 მმ' } },
    ],
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug)
}

export function getBestsellers(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug && p.isBestseller)
}

export function getProductBySlug(categorySlug: string, productSlug: string): Product | undefined {
  return PRODUCTS.find((p) => p.categorySlug === categorySlug && p.slug === productSlug)
}

export function getSimilarProducts(product: Product, limit = 3): Product[] {
  return PRODUCTS.filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug).slice(0, limit)
}
