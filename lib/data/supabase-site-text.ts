import { cacheLife } from 'next/cache'
import { supabase as getSupabase } from '@/lib/supabase'

export interface SiteTextOverride {
  /** Dot-path into the dictionary, e.g. "product.faq". */
  key: string
  en: string | null
  ka: string | null
}

/**
 * Fetches all wording overrides. Returns [] when Supabase is unconfigured or
 * the table is missing, so the site falls back to the static dictionary JSON.
 *
 * Cached: `getDictionary` runs this in the (uncached) root layout, so without
 * caching the DB read would block navigation under Cache Components. Overrides
 * change rarely, so a short revalidate keeps admin edits visible within minutes.
 */
export async function getSiteTextOverrides(): Promise<SiteTextOverride[]> {
  'use cache'
  cacheLife('minutes')
  try {
    const supabase = getSupabase()
    if (!supabase) return []
    const { data, error } = await supabase.from('site_text').select('key, en, ka')

    if (error) {
      console.warn('Warning fetching site_text:', error.message)
      return []
    }

    return (data || []) as SiteTextOverride[]
  } catch {
    console.warn('Error connecting to Supabase')
    return []
  }
}
