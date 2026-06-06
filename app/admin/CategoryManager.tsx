'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase as getSupabase } from '@/lib/supabase'

type BilText = { en: string; ka: string }

type StepForm = {
  step: number
  title: BilText
  description: BilText
  image?: string
}

type CategoryRow = {
  id: string
  slug: string
  name: BilText
  description: BilText
  hero_tagline: BilText
  placeholder_color: string
  images: string[]
  explainer_title: BilText
  explainer_body: BilText
  how_it_works: StepForm[] | null
}

const emptyStep = (step: number): StepForm => ({
  step,
  title: { en: '', ka: '' },
  description: { en: '', ka: '' },
})

const EMPTY_FORM = {
  id: '',
  slug: '',
  name: { en: '', ka: '' },
  description: { en: '', ka: '' },
  hero_tagline: { en: '', ka: '' },
  placeholder_color: '#263947',
  images: [] as string[],
  explainer_title: { en: '', ka: '' },
  explainer_body: { en: '', ka: '' },
  how_it_works: [emptyStep(1)] as StepForm[],
}

type FormState = typeof EMPTY_FORM

function BilInput({ label, value, onChange }: { label: string; value: BilText; onChange: (v: BilText) => void }) {
  return (
    <div className="mb-4">
      <label className="block text-xs text-[#DAEFFF]/50 mb-1 uppercase tracking-wider">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <span className="text-xs text-[#DAEFFF]/40 mb-1 block">English</span>
          <input
            value={value.en}
            onChange={(e) => onChange({ ...value, en: e.target.value })}
            className="w-full bg-[#263947] border border-[#263947]/50 rounded-lg px-3 py-2 text-sm text-[#DAEFFF] focus:outline-none focus:border-[#E4E969]"
          />
        </div>
        <div>
          <span className="text-xs text-[#DAEFFF]/40 mb-1 block">Georgian</span>
          <input
            value={value.ka}
            onChange={(e) => onChange({ ...value, ka: e.target.value })}
            className="w-full bg-[#263947] border border-[#263947]/50 rounded-lg px-3 py-2 text-sm text-[#DAEFFF] focus:outline-none focus:border-[#E4E969]"
          />
        </div>
      </div>
    </div>
  )
}

export function CategoryManager() {
  const [categories, setCategories] = useState<CategoryRow[]>([])
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [showForm, setShowForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [inputKey, setInputKey] = useState(0)
  const [stepUploading, setStepUploading] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { fetchCategories() }, [])

  async function fetchCategories() {
    const sb = getSupabase()
    if (!sb) return
    const { data } = await sb.from('categories').select('*').order('created_at', { ascending: true })
    if (data) setCategories(data as CategoryRow[])
  }

  function startNew() {
    setForm(EMPTY_FORM)
    setIsEditing(false)
    setShowForm(true)
    clearImageFile()
    setError('')
  }

  function startEdit(cat: CategoryRow) {
    setForm({
      id: cat.id,
      slug: cat.slug,
      name: cat.name,
      description: cat.description,
      hero_tagline: cat.hero_tagline,
      placeholder_color: cat.placeholder_color,
      images: cat.images || [],
      explainer_title: cat.explainer_title,
      explainer_body: cat.explainer_body,
      how_it_works: (cat.how_it_works ?? []).map((s, i) => ({
        step: s.step ?? i + 1,
        title: s.title ?? { en: '', ka: '' },
        description: s.description ?? { en: '', ka: '' },
        image: s.image,
      })),
    })
    setIsEditing(true)
    setShowForm(true)
    clearImageFile()
    setError('')
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    if (!file) return
    if (file.size > 1024 * 1024) {
      setError('Image must be under 1 MB')
      clearImageFile()
      return
    }
    setError('')
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  function clearImageFile() {
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImageFile(null)
    setImagePreview(null)
    setInputKey(k => k + 1)
  }

  function cancel() {
    setShowForm(false)
    setForm(EMPTY_FORM)
    clearImageFile()
    setError('')
  }

  async function uploadImage(file: File): Promise<string | null> {
    const sb = getSupabase()
    if (!sb) { setError('Supabase not configured'); return null }
    if (file.size > 1024 * 1024) { setError('Image must be under 1 MB'); return null }
    const path = `${Date.now()}_${file.name}`
    const { data, error: uploadError } = await sb.storage
      .from('category images')
      .upload(path, file, { upsert: false })
    if (uploadError) {
      setError(`Image upload failed: ${uploadError.message}`)
      return null
    }
    const { data: urlData } = sb.storage.from('category images').getPublicUrl(data.path)
    return urlData.publicUrl
  }

  // --- Reason / "How It Works" step editing ---
  function updateStep(index: number, patch: Partial<StepForm>) {
    setForm(f => ({
      ...f,
      how_it_works: f.how_it_works.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    }))
  }

  function addStep() {
    setForm(f => ({
      ...f,
      how_it_works: [...f.how_it_works, emptyStep(f.how_it_works.length + 1)],
    }))
  }

  function removeStep(index: number) {
    setForm(f => ({
      ...f,
      how_it_works: f.how_it_works
        .filter((_, i) => i !== index)
        .map((s, i) => ({ ...s, step: i + 1 })),
    }))
  }

  async function handleStepImage(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setError('')
    setStepUploading(index)
    const url = await uploadImage(file)
    setStepUploading(null)
    if (url) updateStep(index, { image: url })
  }

  async function save() {
    const sb = getSupabase()
    if (!sb) { setError('Supabase not configured'); return }
    if (!form.slug.trim()) { setError('Slug is required'); return }

    setLoading(true)
    setError('')

    let images = [...form.images]

    if (imageFile) {
      const url = await uploadImage(imageFile)
      if (!url) { setLoading(false); return }
      images = [...images, url]
    }

    const how_it_works = form.how_it_works.map((s, i) => ({
      step: i + 1,
      title: s.title,
      description: s.description,
      ...(s.image ? { image: s.image } : {}),
    }))

    const record = {
      slug: form.slug,
      name: form.name,
      description: form.description,
      hero_tagline: form.hero_tagline,
      placeholder_color: form.placeholder_color,
      images,
      explainer_title: form.explainer_title,
      explainer_body: form.explainer_body,
      how_it_works,
    }

    const { error: dbError } = isEditing && form.id
      ? await sb.from('categories').update(record).eq('id', form.id)
      : await sb.from('categories').insert(record)

    if (dbError) {
      setError(dbError.message)
      setLoading(false)
      return
    }

    await fetchCategories()
    cancel()
    setLoading(false)
  }

  async function deleteCategory(id: string, slug: string) {
    if (!confirm(`Delete category "${slug}"? This cannot be undone.`)) return
    const sb = getSupabase()
    if (!sb) return
    await sb.from('categories').delete().eq('id', id)
    await fetchCategories()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Categories ({categories.length})</h2>
        {!showForm && (
          <button onClick={startNew} className="bg-[#E4E969] text-[#0C1A23] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#FAFFC5]">
            + New Category
          </button>
        )}
      </div>

      {!showForm && (
        <div className="space-y-3">
          {categories.length === 0 && <p className="text-[#DAEFFF]/40 text-sm">No categories yet.</p>}
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-4 bg-[#263947]/40 rounded-xl p-4">
              {cat.images?.[0] ? (
                <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={cat.images[0]} alt={cat.slug} fill className="object-cover" sizes="64px" />
                </div>
              ) : (
                <div className="w-16 h-12 rounded-lg flex-shrink-0" style={{ background: cat.placeholder_color }} />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{cat.name?.en || cat.slug}</p>
                <p className="text-xs text-[#DAEFFF]/40">{cat.slug}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(cat)} className="text-xs bg-[#263947] hover:bg-[#263947]/80 px-3 py-1.5 rounded-lg">
                  Edit
                </button>
                <button onClick={() => deleteCategory(cat.id, cat.slug)} className="text-xs bg-red-900/40 hover:bg-red-900/60 text-red-300 px-3 py-1.5 rounded-lg">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="bg-[#263947]/30 rounded-2xl p-6 border border-[#263947]">
          <h3 className="font-bold mb-6 text-[#E4E969]">{isEditing ? 'Edit Category' : 'New Category'}</h3>

          <div className="mb-4">
            <label className="block text-xs text-[#DAEFFF]/50 mb-1 uppercase tracking-wider">Slug</label>
            <input
              value={form.slug}
              onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))}
              placeholder="e.g. recuperators"
              className="w-full bg-[#263947] border border-[#263947]/50 rounded-lg px-3 py-2 text-sm text-[#DAEFFF] focus:outline-none focus:border-[#E4E969]"
            />
          </div>

          <BilInput label="Name" value={form.name} onChange={(v) => setForm(f => ({ ...f, name: v }))} />
          <BilInput label="Description" value={form.description} onChange={(v) => setForm(f => ({ ...f, description: v }))} />
          <BilInput label="Hero Tagline" value={form.hero_tagline} onChange={(v) => setForm(f => ({ ...f, hero_tagline: v }))} />
          <BilInput label="Explainer Title" value={form.explainer_title} onChange={(v) => setForm(f => ({ ...f, explainer_title: v }))} />
          <BilInput label="Explainer Body" value={form.explainer_body} onChange={(v) => setForm(f => ({ ...f, explainer_body: v }))} />

          <div className="mb-4">
            <label className="block text-xs text-[#DAEFFF]/50 mb-1 uppercase tracking-wider">Placeholder Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={form.placeholder_color}
                onChange={(e) => setForm(f => ({ ...f, placeholder_color: e.target.value }))}
                className="h-9 w-14 rounded cursor-pointer border-0 bg-transparent"
              />
              <span className="text-sm text-[#DAEFFF]/60">{form.placeholder_color}</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs text-[#DAEFFF]/50 mb-2 uppercase tracking-wider">Images</label>
            {form.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {form.images.map((url) => (
                  <div key={url} className="relative">
                    <div className="relative w-20 h-16 rounded-lg overflow-hidden">
                      <Image src={url} alt="category" fill className="object-cover" sizes="80px" />
                    </div>
                    <button
                      onClick={() => setForm(f => ({ ...f, images: f.images.filter(i => i !== url) }))}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center leading-none"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center gap-3">
              <input
                key={inputKey}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-sm text-[#DAEFFF]/60 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[#263947] file:text-[#DAEFFF] file:text-xs file:cursor-pointer"
              />
              {imageFile && (
                <button type="button" onClick={clearImageFile} className="text-xs text-red-400 hover:text-red-300">
                  × Clear
                </button>
              )}
            </div>
            {imagePreview && (
              <div className="mt-2 relative w-28 h-20 rounded-lg overflow-hidden border border-[#263947]">
                <Image src={imagePreview} alt="preview" fill className="object-cover" sizes="112px" />
              </div>
            )}
            <p className="text-xs text-[#DAEFFF]/30 mt-1">Max 1 MB</p>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs text-[#DAEFFF]/50 uppercase tracking-wider">
                Reasons <span className="text-[#DAEFFF]/30 normal-case font-normal">(How It Works steps — each can have its own image)</span>
              </label>
              <button
                type="button"
                onClick={addStep}
                className="text-xs bg-[#263947] hover:bg-[#263947]/80 px-3 py-1.5 rounded-lg"
              >
                + Add reason
              </button>
            </div>

            <div className="space-y-4">
              {form.how_it_works.length === 0 && (
                <p className="text-[#DAEFFF]/40 text-sm">No reasons yet. Add one.</p>
              )}
              {form.how_it_works.map((step, i) => (
                <div key={i} className="rounded-xl border border-[#263947] bg-[#0C1A23]/40 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#E4E969] tabular-nums">
                      Reason {String(i + 1).padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeStep(i)}
                      className="text-xs bg-red-900/40 hover:bg-red-900/60 text-red-300 px-3 py-1 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>

                  <BilInput label="Title" value={step.title} onChange={(v) => updateStep(i, { title: v })} />
                  <BilInput label="Description" value={step.description} onChange={(v) => updateStep(i, { description: v })} />

                  <div>
                    <label className="block text-xs text-[#DAEFFF]/50 mb-2 uppercase tracking-wider">Image</label>
                    <div className="flex items-center gap-3">
                      {step.image ? (
                        <div className="relative">
                          <div className="relative w-28 h-20 rounded-lg overflow-hidden border border-[#263947]">
                            <Image src={step.image} alt={`reason ${i + 1}`} fill className="object-cover" sizes="112px" />
                          </div>
                          <button
                            type="button"
                            onClick={() => updateStep(i, { image: undefined })}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center leading-none"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div className="w-28 h-20 rounded-lg border border-dashed border-[#263947] flex items-center justify-center text-[10px] text-[#DAEFFF]/30 text-center px-2">
                          Falls back to category image
                        </div>
                      )}
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={stepUploading === i}
                          onChange={(e) => handleStepImage(i, e)}
                          className="text-sm text-[#DAEFFF]/60 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[#263947] file:text-[#DAEFFF] file:text-xs file:cursor-pointer disabled:opacity-50"
                        />
                        <p className="text-xs text-[#DAEFFF]/30 mt-1">
                          {stepUploading === i ? 'Uploading…' : 'Max 1 MB'}
                        </p>
                      </div>
                    </div>
                  </div>
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
