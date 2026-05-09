import Link from "next/link";
import type { Locale } from "@/lib/types";

interface FooterProps {
  lang: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>;
}

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const SOCIALS: SocialLink[] = [
  {
    name: "Facebook",
    href: "https://facebook.com/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M13.5 8H11V6.5c0-.6.4-1 1-1h1.5V3H11.5C9.6 3 8.5 4.4 8.5 6.3V8H6v2.5h2.5V17H11v-6.5h2.1l.4-2.5z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <rect x="3.5" y="3.5" width="13" height="13" rx="4" />
        <circle cx="10" cy="10" r="3.2" />
        <circle cx="14" cy="6" r="0.7" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/995568970100",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M10 3.5a6.5 6.5 0 0 0-5.6 9.8L3.5 17l3.8-1A6.5 6.5 0 1 0 10 3.5zm3.5 9.1c-.2.4-.9.8-1.3.9-.4.1-.8.1-1.3-.1-.3-.1-.7-.2-1.2-.5-2.1-.9-3.5-3.1-3.6-3.2-.1-.1-.9-1.2-.9-2.3s.6-1.7.8-1.9c.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .5.4l.7 1.6c.1.2.1.4 0 .5-.1.2-.1.3-.3.4l-.3.4c-.1.1-.2.2-.1.4.1.2.5.9 1.1 1.4.7.6 1.3.8 1.5.9.2.1.3.1.4 0l.7-.8c.1-.2.3-.1.5-.1l1.4.7c.2.1.4.2.4.3.1.1.1.5-.1.9z" />
      </svg>
    ),
  },
];

export function Footer({ lang, dict }: FooterProps) {
  const f = dict.footer;
  const year = new Date().getFullYear();

  // CSS mask to tint the white logo PNG to light blue
  const maskedLogoStyle: React.CSSProperties = {
    WebkitMaskImage: 'url(/logos/Alivo-white.png)',
    maskImage: 'url(/logos/Alivo-white.png)',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    backgroundColor: '#DAEFFF',
  };

  return (
    <footer className="bg-[#0C1A23] border-t border-[#263947]/60">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand — centered stack on the left */}
          <div className="md:col-span-1 flex flex-col items-center text-center gap-4">
            <Link href={`/${lang}`} aria-label="Alivo home">
              <span
                role="img"
                aria-label="Alivo"
                className="block h-8 w-[110px]"
                style={maskedLogoStyle}
              />
            </Link>
            <p className="text-[#DAEFFF]/60 text-sm leading-relaxed">{f.tagline}</p>
            <p className="text-[#DAEFFF]/40 text-xs">{f.addressLabel}</p>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-1">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[#DAEFFF]/25 text-[#DAEFFF] hover:text-[#0C1A23] hover:bg-[#DAEFFF] hover:border-[#DAEFFF] transition-colors flex items-center justify-center"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-[#DAEFFF] text-xs font-semibold tracking-widest uppercase mb-4">
              {f.products}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href={`/${lang}/category/recuperators`}
                  className="text-[#DAEFFF]/55 hover:text-[#DAEFFF] text-sm transition-colors"
                >
                  {dict.nav.recuperators}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/category/ventilators`}
                  className="text-[#DAEFFF]/55 hover:text-[#DAEFFF] text-sm transition-colors"
                >
                  {dict.nav.ventilators}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[#DAEFFF] text-xs font-semibold tracking-widest uppercase mb-4">
              {f.company}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href={`/${lang}`}
                  className="text-[#DAEFFF]/55 hover:text-[#DAEFFF] text-sm transition-colors"
                >
                  {f.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/blog`}
                  className="text-[#DAEFFF]/55 hover:text-[#DAEFFF] text-sm transition-colors"
                >
                  {f.blog}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/contact`}
                  className="text-[#DAEFFF]/55 hover:text-[#DAEFFF] text-sm transition-colors"
                >
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#DAEFFF] text-xs font-semibold tracking-widest uppercase mb-4">
              {f.contact}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="tel:+995568970100"
                  className="text-[#DAEFFF]/55 hover:text-[#DAEFFF] text-sm transition-colors"
                >
                  +995 568 97 01 00
                </a>
              </li>
              <li>
                <a
                  href="mailto:alivogeorgia@gmail.com"
                  className="text-[#DAEFFF]/55 hover:text-[#DAEFFF] text-sm transition-colors"
                >
                  alivogeorgia@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#263947]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#DAEFFF]/35 text-xs">
            © {year} Alivo. {f.rights}.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href={`/${lang}/privacy`}
              className="text-[#DAEFFF]/35 hover:text-[#DAEFFF]/70 text-xs transition-colors"
            >
              {f.privacy}
            </Link>
            <Link
              href={`/${lang}/terms`}
              className="text-[#DAEFFF]/35 hover:text-[#DAEFFF]/70 text-xs transition-colors"
            >
              {f.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
