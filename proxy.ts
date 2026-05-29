import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCALES = ['en', 'ka'] as const
type Locale = (typeof LOCALES)[number]

function getPreferredLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language') ?? ''
  // Parse the first preferred language tag
  const primaryTag = acceptLanguage.split(',')[0]?.split(';')[0]?.trim().toLowerCase() ?? ''
  if (primaryTag.startsWith('ka')) return 'ka'
  return 'en'
}

function getLocaleFromPathname(pathname: string): Locale | null {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return locale
    }
  }
  return null
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Already has a locale prefix — let it through
  if (getLocaleFromPathname(pathname)) {
    return NextResponse.next()
  }

  // Redirect to locale-prefixed URL
  const locale = getPreferredLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public assets (logos, images, fonts)
     */
    '/((?!_next/static|_next/image|favicon.ico|logos|fonts|icons|images|admin|api).*)',
  ],
}
