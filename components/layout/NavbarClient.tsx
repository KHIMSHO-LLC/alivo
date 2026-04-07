'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useModal } from '@/components/providers/ModalProvider'
import type { Locale } from '@/lib/types'

interface NavbarClientProps {
  lang: Locale
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
}

export function NavbarClient({ lang, dict }: NavbarClientProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { openModal } = useModal()
  const nav = dict.nav

  function switchLang() {
    const newLang = lang === 'en' ? 'ka' : 'en'
    // Replace locale segment in pathname: /en/... → /ka/...
    const newPath = pathname.replace(/^\/(en|ka)/, `/${newLang}`)
    router.push(newPath)
  }

  const links = [
    { label: nav.home, href: `/${lang}` },
    { label: nav.recuperators, href: `/${lang}/category/recuperators` },
    { label: nav.ventilators, href: `/${lang}/category/ventilators` },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      {/* Backdrop blur bar */}
      <div className="absolute inset-0 bg-[#0C1A23]/90 backdrop-blur-md border-b border-[#263947]/60" />

      <div className="relative max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex-shrink-0">
          <Image
            src="/logos/Alivo-white.png"
            alt="Alivo"
            width={90}
            height={28}
            className="h-7 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#DAEFFF]/70 hover:text-[#DAEFFF] text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Lang switcher */}
          <button
            onClick={switchLang}
            className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-[#DAEFFF]/50 hover:text-[#E4E969] transition-colors px-2 py-1 rounded border border-[#263947] hover:border-[#E4E969]/40"
          >
            {lang === 'en' ? 'GEO' : 'ENG'}
          </button>

          {/* CTA */}
          <button
            onClick={() => {
              // Trigger modal via a custom event since we're in a client navbar
              openModal()
            }}
            className="hidden md:flex bg-[#E4E969] hover:bg-[#FAFFC5] text-[#0C1A23] text-xs font-bold px-5 py-2.5 rounded-full transition-colors tracking-wide"
          >
            {nav.contact}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#DAEFFF] p-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="relative md:hidden bg-[#0C1A23] border-t border-[#263947]/60 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-[#DAEFFF]/80 hover:text-[#E4E969] text-base font-medium transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-2 border-t border-[#263947]">
            <button
              onClick={() => { switchLang(); setMobileOpen(false) }}
              className="text-xs font-semibold text-[#DAEFFF]/50 hover:text-[#E4E969] transition-colors px-3 py-1.5 rounded border border-[#263947]"
            >
              {lang === 'en' ? 'GEO' : 'ENG'}
            </button>
            <button
              onClick={() => {
                openModal()
                setMobileOpen(false)
              }}
              className="bg-[#E4E969] text-[#0C1A23] text-xs font-bold px-5 py-2.5 rounded-full"
            >
              {nav.contact}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
