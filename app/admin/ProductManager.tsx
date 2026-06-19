'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase as getSupabase } from '@/lib/supabase'
import type { BilingualText, ProductBenefit, ProductFeature, FaqItem } from '@/lib/types'

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
  hero_bullets: unknown
  benefits: unknown
  features: unknown
  faqs: unknown
  price: number | null
}

type CategoryOption = { id: string; slug: string; name: BilText }

const EMPTY_HERO_BULLET: BilingualText = { en: '', ka: '' }
const EMPTY_BENEFIT: ProductBenefit = { icon: '', title: { en: '', ka: '' }, body: { en: '', ka: '' } }
const EMPTY_FEATURE: ProductFeature = { label: { en: '', ka: '' }, value: { en: '', ka: '' } }
const EMPTY_FAQ: FaqItem = { question: { en: '', ka: '' }, answer: { en: '', ka: '' } }

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
  hero_bullets: [] as BilingualText[],
  benefits: [{ ...EMPTY_BENEFIT }] as ProductBenefit[],
  features: [{ ...EMPTY_FEATURE }] as ProductFeature[],
  faqs: [] as FaqItem[],
}

type FormState = typeof EMPTY_FORM

const inputCls = 'w-full bg-[#263947] border border-[#263947]/50 rounded-lg px-3 py-2 text-sm text-[#DAEFFF] focus:outline-none focus:border-[#E4E969]'
const textareaCls = `${inputCls} resize-y`
const labelCls = 'block text-xs text-[#DAEFFF]/50 mb-1 uppercase tracking-wider'
const subLabelCls = 'text-xs text-[#DAEFFF]/40 mb-1 block'
const cardCls = 'mb-3 p-4 bg-[#0C1A23]/40 rounded-xl border border-[#263947]/60'

function BilInput({ label, value, onChange }: { label: string; value: BilText; onChange: (v: BilText) => void }) {
  return (
    <div className="mb-4">
      <label className={labelCls}>{label}</label>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <span className={subLabelCls}>English</span>
          <input value={value.en} onChange={(e) => onChange({ ...value, en: e.target.value })} className={inputCls} />
        </div>
        <div>
          <span className={subLabelCls}>Georgian</span>
          <input value={value.ka} onChange={(e) => onChange({ ...value, ka: e.target.value })} className={inputCls} />
        </div>
      </div>
    </div>
  )
}

function BilTextarea({ label, value, onChange, rows = 3 }: { label: string; value: BilText; onChange: (v: BilText) => void; rows?: number }) {
  return (
    <div>
      <label className={subLabelCls}>{label}</label>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <span className={subLabelCls}>EN</span>
          <textarea rows={rows} value={value.en} onChange={(e) => onChange({ ...value, en: e.target.value })} className={textareaCls} />
        </div>
        <div>
          <span className={subLabelCls}>KA</span>
          <textarea rows={rows} value={value.ka} onChange={(e) => onChange({ ...value, ka: e.target.value })} className={textareaCls} />
        </div>
      </div>
    </div>
  )
}

function HeroBulletsEditor({ items, onChange }: { items: BilingualText[]; onChange: (v: BilingualText[]) => void }) {
  function add() { onChange([...items, { ...EMPTY_HERO_BULLET }]) }
  function remove(i: number) { onChange(items.filter((_, idx) => idx !== i)) }
  function update(i: number, updated: BilingualText) { onChange(items.map((item, idx) => idx === i ? updated : item)) }

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className={cardCls}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#DAEFFF]/50">Bullet {i + 1}</span>
            <button type="button" onClick={() => remove(i)} className="text-xs text-red-400 hover:text-red-300">Remove</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className={subLabelCls}>EN</span>
              <input value={item.en} onChange={(e) => update(i, { ...item, en: e.target.value })} className={inputCls} />
            </div>
            <div>
              <span className={subLabelCls}>KA</span>
              <input value={item.ka} onChange={(e) => update(i, { ...item, ka: e.target.value })} className={inputCls} />
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={add} className="text-xs text-[#E4E969] hover:text-[#FAFFC5] font-semibold">
        + Add Bullet
      </button>
    </div>
  )
}

function BenefitsEditor({ items, onChange }: { items: ProductBenefit[]; onChange: (v: ProductBenefit[]) => void }) {
  function add() { onChange([...items, { ...EMPTY_BENEFIT }]) }
  function remove(i: number) { onChange(items.filter((_, idx) => idx !== i)) }
  function update(i: number, updated: ProductBenefit) { onChange(items.map((item, idx) => idx === i ? updated : item)) }

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className={cardCls}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#DAEFFF]/50">Benefit {i + 1}</span>
            <button type="button" onClick={() => remove(i)} className="text-xs text-red-400 hover:text-red-300">Remove</button>
          </div>
          <div className="mb-2">
            <span className={subLabelCls}>Icon (emoji)</span>
            <input
              value={item.icon}
              onChange={(e) => update(i, { ...item, icon: e.target.value })}
              placeholder="e.g. 🌬️"
              className={inputCls}
            />
          </div>
          <div className="mb-2">
            <BilInput label="Title" value={item.title} onChange={(v) => update(i, { ...item, title: v })} />
          </div>
          <BilTextarea label="Body" value={item.body} onChange={(v) => update(i, { ...item, body: v })} />
        </div>
      ))}
      <button type="button" onClick={add} className="text-xs text-[#E4E969] hover:text-[#FAFFC5] font-semibold">
        + Add Benefit
      </button>
    </div>
  )
}

function FeaturesEditor({ items, onChange }: { items: ProductFeature[]; onChange: (v: ProductFeature[]) => void }) {
  function add() { onChange([...items, { ...EMPTY_FEATURE }]) }
  function remove(i: number) { onChange(items.filter((_, idx) => idx !== i)) }
  function update(i: number, updated: ProductFeature) { onChange(items.map((item, idx) => idx === i ? updated : item)) }

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className={cardCls}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#DAEFFF]/50">Spec {i + 1}</span>
            <button type="button" onClick={() => remove(i)} className="text-xs text-red-400 hover:text-red-300">Remove</button>
          </div>
          <div className="mb-2">
            <BilInput label="Label" value={item.label} onChange={(v) => update(i, { ...item, label: v })} />
          </div>
          <div>
            <span className={subLabelCls}>Value — use new lines for multiple sub-values</span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className={subLabelCls}>EN</span>
                <textarea
                  rows={3}
                  value={item.value.en}
                  onChange={(e) => update(i, { ...item, value: { ...item.value, en: e.target.value } })}
                  className={textareaCls}
                />
              </div>
              <div>
                <span className={subLabelCls}>KA</span>
                <textarea
                  rows={3}
                  value={item.value.ka}
                  onChange={(e) => update(i, { ...item, value: { ...item.value, ka: e.target.value } })}
                  className={textareaCls}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={add} className="text-xs text-[#E4E969] hover:text-[#FAFFC5] font-semibold">
        + Add Spec
      </button>
    </div>
  )
}

function FaqEditor({ items, onChange }: { items: FaqItem[]; onChange: (v: FaqItem[]) => void }) {
  function add() { onChange([...items, { ...EMPTY_FAQ }]) }
  function remove(i: number) { onChange(items.filter((_, idx) => idx !== i)) }
  function update(i: number, updated: FaqItem) { onChange(items.map((item, idx) => idx === i ? updated : item)) }

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className={cardCls}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#DAEFFF]/50">FAQ {i + 1}</span>
            <button type="button" onClick={() => remove(i)} className="text-xs text-red-400 hover:text-red-300">Remove</button>
          </div>
          <div className="mb-2">
            <BilInput label="Question" value={item.question} onChange={(v) => update(i, { ...item, question: v })} />
          </div>
          <BilTextarea label="Answer" value={item.answer} onChange={(v) => update(i, { ...item, answer: v })} rows={4} />
        </div>
      ))}
      <button type="button" onClick={add} className="text-xs text-[#E4E969] hover:text-[#FAFFC5] font-semibold">
        + Add FAQ
      </button>
    </div>
  )
}

function parseHeroBullets(raw: unknown): BilingualText[] {
  if (!Array.isArray(raw)) return []
  return raw.map((b) => ({
    en: b?.en ?? '',
    ka: b?.ka ?? '',
  }))
}

function parseBenefits(raw: unknown): ProductBenefit[] {
  if (!Array.isArray(raw)) return [{ ...EMPTY_BENEFIT }]
  return raw.map((b) => ({
    icon: typeof b?.icon === 'string' ? b.icon : '',
    title: { en: b?.title?.en ?? '', ka: b?.title?.ka ?? '' },
    body: { en: b?.body?.en ?? '', ka: b?.body?.ka ?? '' },
  }))
}

function parseFeatures(raw: unknown): ProductFeature[] {
  if (!Array.isArray(raw)) return [{ ...EMPTY_FEATURE }]
  return raw.map((f) => ({
    label: { en: f?.label?.en ?? '', ka: f?.label?.ka ?? '' },
    value: { en: f?.value?.en ?? '', ka: f?.value?.ka ?? '' },
  }))
}

function parseFaqs(raw: unknown): FaqItem[] {
  if (!Array.isArray(raw)) return []
  return raw.map((f) => ({
    question: { en: f?.question?.en ?? '', ka: f?.question?.ka ?? '' },
    answer: { en: f?.answer?.en ?? '', ka: f?.answer?.ka ?? '' },
  }))
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

  const fetchProducts = useCallback(async () => {
    const sb = getSupabase()
    if (!sb) return
    const { data } = await sb.from('products').select('*').order('created_at', { ascending: true })
    if (data) setProducts(data as ProductRow[])
  }, [])

  const fetchCategories = useCallback(async () => {
    const sb = getSupabase()
    if (!sb) return
    const { data } = await sb.from('categories').select('id, slug, name')
    if (data) setCategoryOptions(data as CategoryOption[])
  }, [])

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [fetchProducts, fetchCategories])

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
      hero_bullets: parseHeroBullets(product.hero_bullets),
      benefits: parseBenefits(product.benefits),
      features: parseFeatures(product.features),
      faqs: parseFaqs(product.faqs),
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
      // eslint-disable-next-line react-hooks/purity
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
      hero_bullets: form.hero_bullets,
      benefits: form.benefits,
      features: form.features,
      faqs: form.faqs,
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
              <label className={labelCls}>Slug</label>
              <input
                value={form.slug}
                onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))}
                placeholder="e.g. reco-101"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Category</label>
              <select
                value={form.category_slug}
                onChange={(e) => setForm(f => ({ ...f, category_slug: e.target.value }))}
                className={inputCls}
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
            <label className={labelCls}>
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
              className={inputCls}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelCls}>Placeholder Color</label>
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
            <label className={`${labelCls} mb-2`}>Images</label>
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

          {/* Hero Bullets */}
          <div className="mb-6">
            <label className={`${labelCls} mb-1`}>Hero Bullets</label>
            <p className="text-xs text-[#DAEFFF]/35 mb-3">Short checkmark items shown in the product hero. Leave empty to use Key Benefits titles instead.</p>
            <HeroBulletsEditor
              items={form.hero_bullets}
              onChange={(v) => setForm(f => ({ ...f, hero_bullets: v }))}
            />
          </div>

          {/* Key Benefits */}
          <div className="mb-6">
            <label className={`${labelCls} mb-1`}>Key Benefits</label>
            <p className="text-xs text-[#DAEFFF]/35 mb-3">Cards shown in the &quot;Key Benefits&quot; section below the hero. Each card has an icon, title, and description.</p>
            <BenefitsEditor
              items={form.benefits}
              onChange={(v) => setForm(f => ({ ...f, benefits: v }))}
            />
          </div>

          {/* Features / Specs */}
          <div className="mb-6">
            <label className={`${labelCls} mb-3`}>Features / Specs</label>
            <FeaturesEditor
              items={form.features}
              onChange={(v) => setForm(f => ({ ...f, features: v }))}
            />
          </div>

          {/* FAQ */}
          <div className="mb-6">
            <label className={`${labelCls} mb-3`}>
              FAQ <span className="text-[#DAEFFF]/30 normal-case font-normal">(leave empty to hide section)</span>
            </label>
            <FaqEditor
              items={form.faqs}
              onChange={(v) => setForm(f => ({ ...f, faqs: v }))}
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
