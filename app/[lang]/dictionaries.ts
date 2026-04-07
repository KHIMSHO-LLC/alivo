import type { Locale } from '@/lib/types'

export const LOCALES: Locale[] = ['en', 'ka']

export function hasLocale(lang: string): lang is Locale {
  return LOCALES.includes(lang as Locale)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Dictionary = Record<string, any>

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  ka: () => import('./dictionaries/ka.json').then((m) => m.default),
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]()
}
