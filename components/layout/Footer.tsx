import Link from "next/link";
import Image from "next/image";
import { ModalTrigger } from "@/components/ui/ModalTrigger";
import type { Locale } from "@/lib/types";

interface FooterProps {
  lang: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>;
}

export function Footer({ lang, dict }: FooterProps) {
  const f = dict.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0C1A23] border-t border-[#263947]/60">
      {/* Lead form banner */}
      <div className="bg-[#263947]/40 border-b border-[#263947]/60">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-[#DAEFFF] text-xl font-bold mb-1">
              {f.formTitle}
            </h3>
            <p className="text-[#DAEFFF]/60 text-sm">{f.formSubtitle}</p>
          </div>
          <ModalTrigger label={dict.nav.contact} variant="primary" />
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="/logos/Alivo-white.png"
              alt="Alivo"
              width={90}
              height={28}
              className="h-7 w-auto mb-4"
            />
            <p className="text-[#DAEFFF]/50 text-sm leading-relaxed">
              {f.tagline}
            </p>
            <p className="text-[#DAEFFF]/30 text-xs mt-3">{f.addressLabel}</p>
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
                  className="text-[#DAEFFF]/50 hover:text-[#E4E969] text-sm transition-colors"
                >
                  {dict.nav.recuperators}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/category/ventilators`}
                  className="text-[#DAEFFF]/50 hover:text-[#E4E969] text-sm transition-colors"
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
                  className="text-[#DAEFFF]/50 hover:text-[#E4E969] text-sm transition-colors"
                >
                  {f.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/blog`}
                  className="text-[#DAEFFF]/50 hover:text-[#E4E969] text-sm transition-colors"
                >
                  {f.blog}
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
              <li className="text-[#DAEFFF]/50 text-sm">+995 568 97 01 00</li>
              <li className="text-[#DAEFFF]/50 text-sm">
                alivogeorgia@gmail.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[#263947]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#DAEFFF]/30 text-xs">
            © {year} Alivo. {f.rights}.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href={`/${lang}/privacy`}
              className="text-[#DAEFFF]/30 hover:text-[#DAEFFF]/60 text-xs transition-colors"
            >
              {f.privacy}
            </Link>
            <Link
              href={`/${lang}/terms`}
              className="text-[#DAEFFF]/30 hover:text-[#DAEFFF]/60 text-xs transition-colors"
            >
              {f.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
