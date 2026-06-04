'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase as getSupabase } from '@/lib/supabase'

type BilText = { en: string; ka: string }

type ProductRow = {
  id: string
  slug: string
  name: BilText
  category_slug: string
  tagline: BilText
  description: BilText
  is_bestseller: boolean
  placeholder_color: string
  images: string[]
  benefits: unknown
  features: unknown
  price: number | null
}

type CategoryOption = { id: string; slug: string; name: BilText }

const EMPTY_FORM = {
  id: '',
  slug: '',
  name: { en: '', ka: '' },
  category_slug: '',
  tagline: { en: '', ka: '' },
  description: { en: '', ka: '' },
  is_bestseller: false,
  placeholder_color: '#263947',
  price: '' as string,
  images: [] as string[],
  benefits_json: '[{"icon": "🌬️", "title": {"en": "", "ka": ""}, "body": {"en": "", "ka": ""}}]',
  features_json: '[{"label": {"en": "", "ka": ""}, "value": {"en": "", "ka": ""}}]',
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

export function ProductManager() {
  const [products, setProducts] = useState<ProductRow[]>([])
  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([])
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [showForm, setShowForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [inputKey, setInputKey] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  async function fetchProducts() {
    const sb = getSupabase()
    if (!sb) return
    const { data } = await sb.from('products').select('*').order('created_at', { ascending: true })
    if (data) setProducts(data as ProductRow[])
  }

  async function fetchCategories() {
    const sb = getSupabase()
    if (!sb) return
    const { data } = await sb.from('categories').select('id, slug, name')
    if (data) setCategoryOptions(data as CategoryOption[])
  }

  function startNew() {
    setForm(EMPTY_FORM)
    setIsEditing(false)
    setShowForm(true)
    clearImageFile()
    setError('')
  }

  function startEdit(product: ProductRow) {
    setForm({
      id: product.id,
      slug: product.slug,
      name: product.name,
      category_slug: product.category_slug,
      tagline: product.tagline,
      description: product.description,
      is_bestseller: product.is_bestseller,
      placeholder_color: product.placeholder_color,
      price: product.price != null ? String(product.price) : '',
      images: product.images || [],
      benefits_json: JSON.stringify(product.benefits ?? [], null, 2),
      features_json: JSON.stringify(product.features ?? [], null, 2),
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

  async function save() {
    const sb = getSupabase()
    if (!sb) { setError('Supabase not configured'); return }
    if (!form.slug.trim()) { setError('Slug is required'); return }
    if (!form.category_slug) { setError('Category is required'); return }

    setLoading(true)
    setError('')

    let images = [...form.images]

    if (imageFile) {
      const path = `${form.category_slug}/${Date.now()}_${imageFile.name}`
      const { data: uploadData, error: uploadError } = await sb.storage
        .from('product images')
        .upload(path, imageFile, { upsert: false })

      if (uploadError) {
        setError(`Image upload failed: ${uploadError.message}`)
        setLoading(false)
        return
      }

      const { data: urlData } = sb.storage.from('product images').getPublicUrl(uploadData.path)
      images = [...images, urlData.publicUrl]
    }

    let benefits: unknown
    let features: unknown
    try {
      benefits = JSON.parse(form.benefits_json)
      features = JSON.parse(form.features_json)
    } catch {
      setError('Benefits or Features JSON is invalid')
      setLoading(false)
      return
    }

    // Price is optional; empty clears it, otherwise must be a non-negative number.
    const trimmedPrice = form.price.trim()
    let price: number | null = null
    if (trimmedPrice !== '') {
      const parsed = Number(trimmedPrice)
      if (!Number.isFinite(parsed) || parsed < 0) {
        setError('Price must be a non-negative number')
        setLoading(false)
        return
      }
      price = parsed
    }

    const record = {
      slug: form.slug,
      name: form.name,
      category_slug: form.category_slug,
      tagline: form.tagline,
      description: form.description,
      is_bestseller: form.is_bestseller,
      placeholder_color: form.placeholder_color,
      price,
      images,
      benefits,
      features,
    }

    const { error: dbError } = isEditing && form.id
      ? await sb.from('products').update(record).eq('id', form.id)
      : await sb.from('products').insert(record)

    if (dbError) {
      setError(dbError.message)
      setLoading(false)
      return
    }

    await fetchProducts()
    cancel()
    setLoading(false)
  }

  async function deleteProduct(id: string, slug: string) {
    if (!confirm(`Delete product "${slug}"? This cannot be undone.`)) return
    const sb = getSupabase()
    if (!sb) return
    await sb.from('products').delete().eq('id', id)
    await fetchProducts()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Products ({products.length})</h2>
        {!showForm && (
          <button onClick={startNew} className="bg-[#E4E969] text-[#0C1A23] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#FAFFC5]">
            + New Product
          </button>
        )}
      </div>

      {!showForm && (
        <div className="space-y-3">
          {products.length === 0 && <p className="text-[#DAEFFF]/40 text-sm">No products yet.</p>}
          {products.map((product) => (
            <div key={product.id} className="flex items-center gap-4 bg-[#263947]/40 rounded-xl p-4">
              {product.images?.[0] ? (
                <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={product.images[0]} alt={product.slug} fill className="object-cover" sizes="64px" />
                </div>
              ) : (
                <div className="w-16 h-12 rounded-lg flex-shrink-0" style={{ background: product.placeholder_color }} />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{product.name?.en || product.slug}</p>
                <p className="text-xs text-[#DAEFFF]/40">{product.category_slug} / {product.slug}</p>
              </div>
              {product.price != null && (
                <span className="text-xs text-[#DAEFFF]/70 tabular-nums">₾{product.price.toLocaleString()}</span>
              )}
              {product.is_bestseller && (
                <span className="text-xs bg-[#E4E969]/20 text-[#E4E969] px-2 py-0.5 rounded-full">Bestseller</span>
              )}
              <div className="flex gap-2">
                <button onClick={() => startEdit(product)} className="text-xs bg-[#263947] hover:bg-[#263947]/80 px-3 py-1.5 rounded-lg">
                  Edit
                </button>
                <button onClick={() => deleteProduct(product.id, product.slug)} className="text-xs bg-red-900/40 hover:bg-red-900/60 text-red-300 px-3 py-1.5 rounded-lg">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="bg-[#263947]/30 rounded-2xl p-6 border border-[#263947]">
          <h3 className="font-bold mb-6 text-[#E4E969]">{isEditing ? 'Edit Product' : 'New Product'}</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-[#DAEFFF]/50 mb-1 uppercase tracking-wider">Slug</label>
              <input
                value={form.slug}
                onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))}
                placeholder="e.g. reco-101"
                className="w-full bg-[#263947] border border-[#263947]/50 rounded-lg px-3 py-2 text-sm text-[#DAEFFF] focus:outline-none focus:border-[#E4E969]"
              />
            </div>
            <div>
              <label className="block text-xs text-[#DAEFFF]/50 mb-1 uppercase tracking-wider">Category</label>
              <select
                value={form.category_slug}
                onChange={(e) => setForm(f => ({ ...f, category_slug: e.target.value }))}
                className="w-full bg-[#263947] border border-[#263947]/50 rounded-lg px-3 py-2 text-sm text-[#DAEFFF] focus:outline-none focus:border-[#E4E969]"
              >
                <option value="">Select category...</option>
                {categoryOptions.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name?.en || c.slug}</option>
                ))}
              </select>
            </div>
          </div>

          <BilInput label="Name" value={form.name} onChange={(v) => setForm(f => ({ ...f, name: v }))} />
          <BilInput label="Tagline" value={form.tagline} onChange={(v) => setForm(f => ({ ...f, tagline: v }))} />
          <BilInput label="Description" value={form.description} onChange={(v) => setForm(f => ({ ...f, description: v }))} />

          <div className="mb-4">
            <label className="block text-xs text-[#DAEFFF]/50 mb-1 uppercase tracking-wider">
              Price <span className="text-[#DAEFFF]/30 normal-case font-normal">(₾ — leave blank to hide)</span>
            </label>
            <input
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              value={form.price}
              onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))}
              placeholder="e.g. 1200"
              className="w-full bg-[#263947] border border-[#263947]/50 rounded-lg px-3 py-2 text-sm text-[#DAEFFF] focus:outline-none focus:border-[#E4E969]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
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
            <div className="flex items-center gap-3 mt-5">
              <input
                type="checkbox"
                id="bestseller"
                checked={form.is_bestseller}
                onChange={(e) => setForm(f => ({ ...f, is_bestseller: e.target.checked }))}
                className="w-4 h-4 accent-[#E4E969] cursor-pointer"
              />
              <label htmlFor="bestseller" className="text-sm text-[#DAEFFF] cursor-pointer">Mark as Bestseller</label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs text-[#DAEFFF]/50 mb-2 uppercase tracking-wider">Images</label>
            {form.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {form.images.map((url) => (
                  <div key={url} className="relative">
                    <div className="relative w-20 h-16 rounded-lg overflow-hidden">
                      <Image src={url} alt="product" fill className="object-cover" sizes="80px" />
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

          <div className="mb-4">
            <label className="block text-xs text-[#DAEFFF]/50 mb-1 uppercase tracking-wider">
              Benefits <span className="text-[#DAEFFF]/30 normal-case font-normal">(JSON array)</span>
            </label>
            <textarea
              value={form.benefits_json}
              onChange={(e) => setForm(f => ({ ...f, benefits_json: e.target.value }))}
              rows={5}
              spellCheck={false}
              className="w-full bg-[#263947] border border-[#263947]/50 rounded-lg px-3 py-2 text-xs font-mono text-[#DAEFFF] focus:outline-none focus:border-[#E4E969]"
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs text-[#DAEFFF]/50 mb-1 uppercase tracking-wider">
              Features / Specs <span className="text-[#DAEFFF]/30 normal-case font-normal">(JSON array)</span>
            </label>
            <textarea
              value={form.features_json}
              onChange={(e) => setForm(f => ({ ...f, features_json: e.target.value }))}
              rows={5}
              spellCheck={false}
              className="w-full bg-[#263947] border border-[#263947]/50 rounded-lg px-3 py-2 text-xs font-mono text-[#DAEFFF] focus:outline-none focus:border-[#E4E969]"
            />
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
