'use client'

import { useState } from 'react'
import { CategoryManager } from './CategoryManager'
import { ProductManager } from './ProductManager'
import { BlogManager } from './BlogManager'
import { WordingsManager } from './WordingsManager'

type Tab = 'categories' | 'products' | 'blog' | 'wordings'

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('categories')

  return (
    <div className="min-h-screen bg-[#0C1A23] text-[#DAEFFF]">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-black text-[#E4E969]">Alivo Admin</h1>
          <a href="/" className="text-xs text-[#DAEFFF]/40 hover:text-[#DAEFFF]">← Back to site</a>
        </div>

        <div className="flex gap-2 mb-8 border-b border-[#263947] pb-4">
          {(['categories', 'products', 'blog', 'wordings'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-colors ${
                tab === t
                  ? 'bg-[#E4E969] text-[#0C1A23]'
                  : 'bg-[#263947] text-[#DAEFFF] hover:bg-[#263947]/80'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'categories' && <CategoryManager />}
        {tab === 'products' && <ProductManager />}
        {tab === 'blog' && <BlogManager />}
        {tab === 'wordings' && <WordingsManager />}
      </div>
    </div>
  )
}
