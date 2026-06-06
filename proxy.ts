import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCALES = ['en', 'ka'] as const
type Locale = (typeof LOCALES)[number]

// Georgian is the default language for everyone entering the site.
// English visitors switch to it themselves via the language switcher.
const DEFAULT_LOCALE: Locale = 'ka'

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

  // Redirect to locale-prefixed URL (Georgian by default)
  const url = request.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`
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
