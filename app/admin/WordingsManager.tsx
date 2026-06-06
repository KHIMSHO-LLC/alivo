'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase as getSupabase } from '@/lib/supabase'
import { flattenWordings, type FlatWording } from '@/lib/wordings'
import en from '@/app/[lang]/dictionaries/en.json'
import ka from '@/app/[lang]/dictionaries/ka.json'

type Edit = { en: string; ka: string }

export function WordingsManager() {
  // Canonical list of editable strings + their static defaults.
  const defaults = useMemo<FlatWording[]>(() => flattenWordings(en, ka), [])

  // Current values keyed by path. Initialised to defaults, then overlaid with
  // any saved overrides from the DB.
  const [edits, setEdits] = useState<Record<string, Edit>>({})
  const [loadedOverrides, setLoadedOverrides] = useState<Set<string>>(new Set())
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const base: Record<string, Edit> = {}
    for (const d of defaults) base[d.path] = { en: d.en, ka: d.ka }

    async function load() {
      const sb = getSupabase()
      if (!sb) {
        setEdits(base)
        return
      }
      const { data } = await sb.from('site_text').select('key, en, ka')
      const overridden = new Set<string>()
      for (const row of data ?? []) {
        if (base[row.key]) {
          base[row.key] = { en: row.en ?? '', ka: row.ka ?? '' }
          overridden.add(row.key)
        }
      }
      setLoadedOverrides(overridden)
      setEdits(base)
    }
    load()
  }, [defaults])

  const defaultsByPath = useMemo(() => {
    const m = new Map<string, Edit>()
    for (const d of defaults) m.set(d.path, { en: d.en, ka: d.ka })
    return m
  }, [defaults])

  function isOverridden(path: string): boolean {
    const cur = edits[path]
    const def = defaultsByPath.get(path)
    if (!cur || !def) return false
    return cur.en !== def.en || cur.ka !== def.ka
  }

  function update(path: string, locale: 'en' | 'ka', value: string) {
    setEdits((prev) => ({ ...prev, [path]: { ...prev[path], [locale]: value } }))
  }

  function resetField(path: string) {
    const def = defaultsByPath.get(path)
    if (def) setEdits((prev) => ({ ...prev, [path]: { ...def } }))
  }

  async function save() {
    const sb = getSupabase()
    if (!sb) { setError('Supabase not configured'); return }

    setLoading(true)
    setError('')
    setStatus('')

    const toUpsert: { key: string; en: string; ka: string }[] = []
    const upsertKeys = new Set<string>()
    for (const d of defaults) {
      if (isOverridden(d.path)) {
        const cur = edits[d.path]
        toUpsert.push({ key: d.path, en: cur.en, ka: cur.ka })
        upsertKeys.add(d.path)
      }
    }
    // Rows that were overridden before but are now back at default → delete.
    const toDelete = [...loadedOverrides].filter((k) => !upsertKeys.has(k))

    if (toUpsert.length > 0) {
      const { error: upErr } = await sb.from('site_text').upsert(toUpsert, { onConflict: 'key' })
      if (upErr) { setError(upErr.message); setLoading(false); return }
    }
    if (toDelete.length > 0) {
      const { error: delErr } = await sb.from('site_text').delete().in('key', toDelete)
      if (delErr) { setError(delErr.message); setLoading(false); return }
    }

    setLoadedOverrides(new Set(upsertKeys))
    setStatus(`Saved. ${toUpsert.length} custom, ${toDelete.length} reset to default.`)
    setLoading(false)
  }

  // Group filtered entries by top-level section.
  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase()
    const groups: Record<string, FlatWording[]> = {}
    for (const d of defaults) {
      const cur = edits[d.path]
      if (q) {
        const haystack = `${d.path} ${d.en} ${d.ka} ${cur?.en ?? ''} ${cur?.ka ?? ''}`.toLowerCase()
        if (!haystack.includes(q)) continue
      }
      ;(groups[d.section] ??= []).push(d)
    }
    return groups
  }, [defaults, edits, query])

  const overrideCount = defaults.filter((d) => isOverridden(d.path)).length

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <h2 className="text-lg font-bold">
          Wordings <span className="text-[#DAEFFF]/40 font-normal text-sm">({overrideCount} customized)</span>
        </h2>
        <button
          onClick={save}
          disabled={loading}
          className="bg-[#E4E969] text-[#0C1A23] px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#FAFFC5] disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save changes'}
        </button>
      </div>

      <p className="text-xs text-[#DAEFFF]/40 mb-4">
        Edit any UI text below. Clearing a field falls back to the default. Image links are not listed.
      </p>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search wordings…"
        className="w-full mb-6 bg-[#263947] border border-[#263947]/50 rounded-lg px-3 py-2 text-sm text-[#DAEFFF] focus:outline-none focus:border-[#E4E969]"
      />

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
      {status && <p className="text-[#E4E969] text-sm mb-4">{status}</p>}

      <div className="space-y-3">
        {Object.keys(grouped).length === 0 && (
          <p className="text-[#DAEFFF]/40 text-sm">No wordings match “{query}”.</p>
        )}
        {Object.entries(grouped).map(([section, items]) => (
          <details key={section} open={!!query.trim()} className="rounded-xl border border-[#263947] bg-[#263947]/20">
            <summary className="cursor-pointer list-none px-4 py-3 font-semibold text-sm capitalize flex items-center justify-between">
              <span>{section}</span>
              <span className="text-[#DAEFFF]/40 text-xs font-normal">{items.length}</span>
            </summary>
            <div className="px-4 pb-4 space-y-4">
              {items.map((d) => {
                const cur = edits[d.path] ?? { en: '', ka: '' }
                const overridden = isOverridden(d.path)
                return (
                  <div key={d.path} className="border-t border-[#263947]/60 pt-3">
                    <div className="flex items-center justify-between mb-1">
                      <code className="text-[10px] text-[#DAEFFF]/40">{d.path}</code>
                      {overridden && (
                        <button
                          onClick={() => resetField(d.path)}
                          className="text-[10px] text-[#E4E969]/80 hover:text-[#E4E969]"
                        >
                          reset
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-[#DAEFFF]/40 mb-1 block">English</span>
                        <textarea
                          value={cur.en}
                          onChange={(e) => update(d.path, 'en', e.target.value)}
                          rows={1}
                          className="w-full bg-[#263947] border border-[#263947]/50 rounded-lg px-3 py-2 text-sm text-[#DAEFFF] focus:outline-none focus:border-[#E4E969] resize-y"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-[#DAEFFF]/40 mb-1 block">Georgian</span>
                        <textarea
                          value={cur.ka}
                          onChange={(e) => update(d.path, 'ka', e.target.value)}
                          rows={1}
                          className="w-full bg-[#263947] border border-[#263947]/50 rounded-lg px-3 py-2 text-sm text-[#DAEFFF] focus:outline-none focus:border-[#E4E969] resize-y"
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
