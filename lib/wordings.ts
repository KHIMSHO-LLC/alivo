// Helpers for the editable-wordings feature. The static dictionary JSON files
// (en.json / ka.json) are the source of truth for *which* strings exist and their
// defaults; the `site_text` table holds per-key overrides keyed by dot-path.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Dict = Record<string, any>

export interface FlatWording {
  /** Dot-path into the dictionary, e.g. "product.faq" or "about.features.0.title". */
  path: string
  /** Top-level section (first path segment) for grouping in the UI. */
  section: string
  en: string
  ka: string
}

const URL_RE = /^https?:\/\//

/**
 * Walks the EN and KA dictionaries in parallel and collects every editable
 * string leaf as a dot-path. Skips values that look like URLs (image/asset
 * links are not editable copy).
 */
export function flattenWordings(en: Dict, ka: Dict): FlatWording[] {
  const out: FlatWording[] = []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const walk = (e: any, k: any, path: string) => {
    if (typeof e === 'string') {
      if (URL_RE.test(e)) return
      out.push({
        path,
        section: path.split('.')[0],
        en: e,
        ka: typeof k === 'string' ? k : '',
      })
      return
    }
    if (Array.isArray(e)) {
      e.forEach((item, i) => walk(item, Array.isArray(k) ? k[i] : undefined, `${path}.${i}`))
      return
    }
    if (e && typeof e === 'object') {
      for (const key of Object.keys(e)) {
        walk(e[key], k?.[key], path ? `${path}.${key}` : key)
      }
    }
  }

  walk(en, ka, '')
  return out
}

/** Sets a value at a dot-path, creating intermediate objects/arrays as needed. */
export function setByPath(obj: Dict, path: string, value: string): void {
  const parts = path.split('.')
  let cur = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i]
    if (cur[key] == null) {
      cur[key] = /^\d+$/.test(parts[i + 1]) ? [] : {}
    }
    cur = cur[key]
  }
  cur[parts[parts.length - 1]] = value
}

/**
 * Returns a deep copy of `base` with the given overrides applied. Empty
 * override values are ignored so the static default shows through.
 */
export function applyOverrides(base: Dict, overrides: { key: string; value: string }[]): Dict {
  const clone: Dict = structuredClone(base)
  for (const { key, value } of overrides) {
    if (value && value.trim() !== '') setByPath(clone, key, value)
  }
  return clone
}
