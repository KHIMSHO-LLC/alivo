'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/lib/types'

interface NavbarClientProps {
  lang: Locale
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
}

const LANG_OPTIONS: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ka', label: 'GE' },
]

export function NavbarClient({ lang, dict }: NavbarClientProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const langRef = useRef<HTMLDivElement>(null)
  const nav = dict.nav

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    if (langOpen) document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [langOpen])

  function selectLang(newLang: Locale) {
    setLangOpen(false)
    if (newLang === lang) return
    const newPath = pathname.replace(/^\/(en|ka)/, `/${newLang}`)
    router.push(newPath)
  }

  const links = [
    { label: nav.home, href: `/${lang}` },
    { label: nav.recuperators, href: `/${lang}/category/recuperators` },
    { label: nav.ventilators, href: `/${lang}/category/ventilators` },
    { label: nav.blog, href: `/${lang}/blog` },
    { label: nav.contact, href: `/${lang}/contact` },
  ]

  const currentLang = LANG_OPTIONS.find((l) => l.code === lang)?.label ?? 'EN'

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
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
              className="text-[#DAEFFF]/75 hover:text-[#DAEFFF] text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Language dropdown */}
          <div ref={langRef} className="relative hidden md:block">
            <button
              onClick={() => setLangOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#DAEFFF]/80 hover:text-[#DAEFFF] transition-colors px-3 py-1.5 rounded-full border border-[#DAEFFF]/30 hover:border-[#DAEFFF]/60"
            >
              {currentLang}
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                className={`transition-transform ${langOpen ? 'rotate-180' : ''}`}
              >
                <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {langOpen && (
              <ul
                role="listbox"
                className="absolute right-0 mt-2 w-28 bg-[#0C1A23] border border-[#263947] rounded-lg shadow-lg overflow-hidden"
              >
                {LANG_OPTIONS.map((opt) => (
                  <li key={opt.code}>
                    <button
                      role="option"
                      aria-selected={opt.code === lang}
                      onClick={() => selectLang(opt.code)}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold tracking-wide transition-colors ${
                        opt.code === lang
                          ? 'bg-[#DAEFFF]/10 text-[#DAEFFF]'
                          : 'text-[#DAEFFF]/60 hover:text-[#DAEFFF] hover:bg-[#263947]/60'
                      }`}
                    >
                      {opt.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

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
              className="text-[#DAEFFF]/85 hover:text-[#DAEFFF] text-base font-medium transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 pt-3 border-t border-[#263947]">
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.code}
                onClick={() => {
                  selectLang(opt.code)
                  setMobileOpen(false)
                }}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                  opt.code === lang
                    ? 'bg-[#DAEFFF] text-[#0C1A23] border-[#DAEFFF]'
                    : 'text-[#DAEFFF]/70 border-[#DAEFFF]/30 hover:border-[#DAEFFF]/60'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
