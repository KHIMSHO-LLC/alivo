'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase as getSupabase } from '@/lib/supabase'
import type { BlogBlock } from '@/lib/types'

type BilText = { en: string; ka: string }

type BlogRow = {
  id: string
  slug: string
  date: string
  title: BilText
  summary: BilText
  category: BilText
  placeholder_color: string
  cover_image: string | null
  body: BlogBlock[] | null
}

const emptyBil = (): BilText => ({ en: '', ka: '' })

const EMPTY_FORM = {
  id: '',
  slug: '',
  date: new Date().toISOString().slice(0, 10),
  title: emptyBil(),
  summary: emptyBil(),
  category: emptyBil(),
  placeholder_color: '#0C1A23',
  cover_image: '' as string,
  body: [] as BlogBlock[],
}

type FormState = typeof EMPTY_FORM

function BilInput({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string
  value: BilText
  onChange: (v: BilText) => void
  textarea?: boolean
}) {
  const cls =
    'w-full bg-[#263947] border border-[#263947]/50 rounded-lg px-3 py-2 text-sm text-[#DAEFFF] focus:outline-none focus:border-[#E4E969]'
  return (
    <div className="mb-4">
      <label className="block text-xs text-[#DAEFFF]/50 mb-1 uppercase tracking-wider">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        {(['en', 'ka'] as const).map((loc) => (
          <div key={loc}>
            <span className="text-xs text-[#DAEFFF]/40 mb-1 block">{loc === 'en' ? 'English' : 'Georgian'}</span>
            {textarea ? (
              <textarea
                rows={4}
                value={value[loc]}
                onChange={(e) => onChange({ ...value, [loc]: e.target.value })}
                className={cls}
              />
            ) : (
              <input value={value[loc]} onChange={(e) => onChange({ ...value, [loc]: e.target.value })} className={cls} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function BlogManager() {
  const [blogs, setBlogs] = useState<BlogRow[]>([])
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [showForm, setShowForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [coverUploading, setCoverUploading] = useState(false)
  const [blockUploading, setBlockUploading] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { fetchBlogs() }, [])

  async function fetchBlogs() {
    const sb = getSupabase()
    if (!sb) return
    const { data } = await sb.from('blogs').select('*').order('date', { ascending: false })
    if (data) setBlogs(data as BlogRow[])
  }

  function startNew() {
    setForm({ ...EMPTY_FORM, title: emptyBil(), summary: emptyBil(), category: emptyBil(), body: [] })
    setIsEditing(false)
    setShowForm(true)
    setError('')
  }

  function startEdit(blog: BlogRow) {
    setForm({
      id: blog.id,
      slug: blog.slug,
      date: blog.date,
      title: blog.title ?? emptyBil(),
      summary: blog.summary ?? emptyBil(),
      category: blog.category ?? emptyBil(),
      placeholder_color: blog.placeholder_color ?? '#0C1A23',
      cover_image: blog.cover_image ?? '',
      body: Array.isArray(blog.body) ? blog.body : [],
    })
    setIsEditing(true)
    setShowForm(true)
    setError('')
  }

  function cancel() {
    setShowForm(false)
    setForm(EMPTY_FORM)
    setError('')
  }

  async function uploadImage(file: File): Promise<string | null> {
    const sb = getSupabase()
    if (!sb) { setError('Supabase not configured'); return null }
    if (file.size > 1024 * 1024) { setError('Image must be under 1 MB'); return null }
    const path = `${Date.now()}_${file.name}`
    const { data, error: uploadError } = await sb.storage.from('blog images').upload(path, file, { upsert: false })
    if (uploadError) {
      setError(`Image upload failed: ${uploadError.message}`)
      return null
    }
    const { data: urlData } = sb.storage.from('blog images').getPublicUrl(data.path)
    return urlData.publicUrl
  }

  async function handleCoverImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setError('')
    setCoverUploading(true)
    const url = await uploadImage(file)
    setCoverUploading(false)
    if (url) setForm(f => ({ ...f, cover_image: url }))
  }

  // --- Content block editing ---
  function addBlock(block: BlogBlock) {
    setForm(f => ({ ...f, body: [...f.body, block] }))
  }

  function updateBlock(index: number, block: BlogBlock) {
    setForm(f => ({ ...f, body: f.body.map((b, i) => (i === index ? block : b)) }))
  }

  function removeBlock(index: number) {
    setForm(f => ({ ...f, body: f.body.filter((_, i) => i !== index) }))
  }

  function moveBlock(index: number, dir: -1 | 1) {
    setForm(f => {
      const next = [...f.body]
      const target = index + dir
      if (target < 0 || target >= next.length) return f
      ;[next[index], next[target]] = [next[target], next[index]]
      return { ...f, body: next }
    })
  }

  async function handleBlockImage(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setError('')
    setBlockUploading(index)
    const url = await uploadImage(file)
    setBlockUploading(null)
    if (url) {
      const current = form.body[index]
      const caption = current.type === 'image' ? current.caption : undefined
      updateBlock(index, { type: 'image', url, ...(caption ? { caption } : {}) })
    }
  }

  async function save() {
    const sb = getSupabase()
    if (!sb) { setError('Supabase not configured'); return }
    if (!form.slug.trim()) { setError('Slug is required'); return }
    if (!form.title.en.trim() && !form.title.ka.trim()) { setError('Title is required'); return }

    setLoading(true)
    setError('')

    const record = {
      slug: form.slug.trim(),
      date: form.date,
      title: form.title,
      summary: form.summary,
      category: form.category,
      placeholder_color: form.placeholder_color,
      cover_image: form.cover_image || null,
      body: form.body,
    }

    const { error: dbError } = isEditing && form.id
      ? await sb.from('blogs').update(record).eq('id', form.id)
      : await sb.from('blogs').insert(record)

    if (dbError) {
      setError(dbError.message)
      setLoading(false)
      return
    }

    await fetchBlogs()
    cancel()
    setLoading(false)
  }

  async function deleteBlog(id: string, slug: string) {
    if (!confirm(`Delete article "${slug}"? This cannot be undone.`)) return
    const sb = getSupabase()
    if (!sb) return
    await sb.from('blogs').delete().eq('id', id)
    await fetchBlogs()
  }

  const inputCls =
    'w-full bg-[#263947] border border-[#263947]/50 rounded-lg px-3 py-2 text-sm text-[#DAEFFF] focus:outline-none focus:border-[#E4E969]'

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Articles ({blogs.length})</h2>
        {!showForm && (
          <button onClick={startNew} className="bg-[#E4E969] text-[#0C1A23] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#FAFFC5]">
            + New Article
          </button>
        )}
      </div>

      {!showForm && (
        <div className="space-y-3">
          {blogs.length === 0 && (
            <p className="text-[#DAEFFF]/40 text-sm">
              No articles in the database yet. The 3 built-in sample posts still show on the site until you add your own.
            </p>
          )}
          {blogs.map((blog) => (
            <div key={blog.id} className="flex items-center gap-4 bg-[#263947]/40 rounded-xl p-4">
              {blog.cover_image ? (
                <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={blog.cover_image} alt={blog.slug} fill className="object-cover" sizes="64px" />
                </div>
              ) : (
                <div className="w-16 h-12 rounded-lg flex-shrink-0" style={{ background: blog.placeholder_color }} />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{blog.title?.en || blog.title?.ka || blog.slug}</p>
                <p className="text-xs text-[#DAEFFF]/40">{blog.date} · {blog.slug}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(blog)} className="text-xs bg-[#263947] hover:bg-[#263947]/80 px-3 py-1.5 rounded-lg">
                  Edit
                </button>
                <button onClick={() => deleteBlog(blog.id, blog.slug)} className="text-xs bg-red-900/40 hover:bg-red-900/60 text-red-300 px-3 py-1.5 rounded-lg">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="bg-[#263947]/30 rounded-2xl p-6 border border-[#263947]">
          <h3 className="font-bold mb-6 text-[#E4E969]">{isEditing ? 'Edit Article' : 'New Article'}</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-[#DAEFFF]/50 mb-1 uppercase tracking-wider">Slug</label>
              <div className="flex gap-2">
                <input
                  value={form.slug}
                  onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))}
                  placeholder="e.g. clean-air-tips"
                  className={inputCls}
                />
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, slug: slugify(f.title.en || f.title.ka) }))}
                  className="text-xs bg-[#263947] hover:bg-[#263947]/80 px-3 rounded-lg whitespace-nowrap"
                >
                  Auto
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#DAEFFF]/50 mb-1 uppercase tracking-wider">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm(f => ({ ...f, date: e.target.value }))}
                className={inputCls}
              />
            </div>
          </div>

          <BilInput label="Title" value={form.title} onChange={(v) => setForm(f => ({ ...f, title: v }))} />
          <BilInput label="Category label" value={form.category} onChange={(v) => setForm(f => ({ ...f, category: v }))} />
          <BilInput label="Summary" value={form.summary} onChange={(v) => setForm(f => ({ ...f, summary: v }))} textarea />

          {/* Cover image */}
          <div className="mb-6">
            <label className="block text-xs text-[#DAEFFF]/50 mb-2 uppercase tracking-wider">Cover image</label>
            <div className="flex items-center gap-3">
              {form.cover_image ? (
                <div className="relative">
                  <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-[#263947]">
                    <Image src={form.cover_image} alt="cover" fill className="object-cover" sizes="128px" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, cover_image: '' }))}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center leading-none"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="w-32 h-20 rounded-lg border border-dashed border-[#263947] flex items-center justify-center text-[10px] text-[#DAEFFF]/30 text-center px-2">
                  Falls back to a generated graphic
                </div>
              )}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  disabled={coverUploading}
                  onChange={handleCoverImage}
                  className="text-sm text-[#DAEFFF]/60 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[#263947] file:text-[#DAEFFF] file:text-xs file:cursor-pointer disabled:opacity-50"
                />
                <p className="text-xs text-[#DAEFFF]/30 mt-1">{coverUploading ? 'Uploading…' : 'Max 1 MB'}</p>
              </div>
            </div>
          </div>

          {/* Content blocks */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs text-[#DAEFFF]/50 uppercase tracking-wider">Content</label>
              <div className="flex gap-2">
                <button type="button" onClick={() => addBlock({ type: 'heading', text: emptyBil() })} className="text-xs bg-[#263947] hover:bg-[#263947]/80 px-3 py-1.5 rounded-lg">+ Heading</button>
                <button type="button" onClick={() => addBlock({ type: 'paragraph', text: emptyBil() })} className="text-xs bg-[#263947] hover:bg-[#263947]/80 px-3 py-1.5 rounded-lg">+ Text</button>
                <button type="button" onClick={() => addBlock({ type: 'image', url: '' })} className="text-xs bg-[#263947] hover:bg-[#263947]/80 px-3 py-1.5 rounded-lg">+ Image</button>
                <button type="button" onClick={() => addBlock({ type: 'youtube', url: '' })} className="text-xs bg-[#263947] hover:bg-[#263947]/80 px-3 py-1.5 rounded-lg">+ Video</button>
              </div>
            </div>

            <div className="space-y-4">
              {form.body.length === 0 && (
                <p className="text-[#DAEFFF]/40 text-sm">No content yet. Add headings, text, images or a YouTube video.</p>
              )}
              {form.body.map((block, i) => (
                <div key={i} className="rounded-xl border border-[#263947] bg-[#0C1A23]/40 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#E4E969] uppercase tracking-wider">
                      {block.type}
                    </span>
                    <div className="flex gap-1.5">
                      <button type="button" onClick={() => moveBlock(i, -1)} disabled={i === 0} className="text-xs bg-[#263947] hover:bg-[#263947]/80 px-2 py-1 rounded disabled:opacity-30">↑</button>
                      <button type="button" onClick={() => moveBlock(i, 1)} disabled={i === form.body.length - 1} className="text-xs bg-[#263947] hover:bg-[#263947]/80 px-2 py-1 rounded disabled:opacity-30">↓</button>
                      <button type="button" onClick={() => removeBlock(i)} className="text-xs bg-red-900/40 hover:bg-red-900/60 text-red-300 px-3 py-1 rounded-lg">Remove</button>
                    </div>
                  </div>

                  {block.type === 'heading' && (
                    <BilInput label="Heading" value={block.text} onChange={(v) => updateBlock(i, { type: 'heading', text: v })} />
                  )}

                  {block.type === 'paragraph' && (
                    <BilInput label="Text" value={block.text} onChange={(v) => updateBlock(i, { type: 'paragraph', text: v })} textarea />
                  )}

                  {block.type === 'image' && (
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        {block.url ? (
                          <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-[#263947]">
                            <Image src={block.url} alt="block" fill className="object-cover" sizes="128px" />
                          </div>
                        ) : (
                          <div className="w-32 h-20 rounded-lg border border-dashed border-[#263947] flex items-center justify-center text-[10px] text-[#DAEFFF]/30">No image</div>
                        )}
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            disabled={blockUploading === i}
                            onChange={(e) => handleBlockImage(i, e)}
                            className="text-sm text-[#DAEFFF]/60 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[#263947] file:text-[#DAEFFF] file:text-xs file:cursor-pointer disabled:opacity-50"
                          />
                          <p className="text-xs text-[#DAEFFF]/30 mt-1">{blockUploading === i ? 'Uploading…' : 'Max 1 MB'}</p>
                        </div>
                      </div>
                      <BilInput
                        label="Caption (optional)"
                        value={block.caption ?? emptyBil()}
                        onChange={(v) => updateBlock(i, { type: 'image', url: block.url, caption: v })}
                      />
                    </div>
                  )}

                  {block.type === 'youtube' && (
                    <div>
                      <label className="block text-xs text-[#DAEFFF]/50 mb-1 uppercase tracking-wider">YouTube link</label>
                      <input
                        value={block.url}
                        onChange={(e) => updateBlock(i, { type: 'youtube', url: e.target.value })}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className={inputCls}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

          <div className="flex gap-3">
            <button
              onClick={save}
              disabled={loading}
              className="bg-[#E4E969] text-[#0C1A23] px-6 py-2 rounded-lg text-sm font-bold hover:bg-[#FAFFC5] disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button onClick={cancel} className="bg-[#263947] px-6 py-2 rounded-lg text-sm hover:bg-[#263947]/80">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
