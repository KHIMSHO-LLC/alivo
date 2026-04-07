'use client'

import { useEffect, useRef, useState } from 'react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
}

export function ContactModal({ isOpen, onClose, dict }: ContactModalProps) {
  const m = dict.modal
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const firstInputRef = useRef<HTMLInputElement>(null)

  // Focus first input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 50)
    } else {
      // Reset form state when closed
      setTimeout(() => {
        setName('')
        setPhone('')
        setEmail('')
        setSubmitted(false)
        setSubmitting(false)
      }, 300)
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitting(false)
    setSubmitted(true)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={m.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0C1A23]/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-[#0C1A23] border border-[#263947] rounded-2xl overflow-hidden shadow-2xl">
        {/* Top accent bar */}
        <div className="h-1 w-full bg-[#E4E969]" />

        <div className="p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-[#DAEFFF]/40 hover:text-[#E4E969] transition-colors"
            aria-label={m.close}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#E4E969]/20 flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M6 16l7 7 13-13" stroke="#E4E969" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-[#DAEFFF] text-lg font-medium">{m.success}</p>
            </div>
          ) : (
            <>
              <h2 className="text-[#DAEFFF] text-2xl font-bold mb-1">{m.title}</h2>
              <p className="text-[#DAEFFF]/60 text-sm mb-6">{m.subtitle}</p>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label className="block text-[#DAEFFF]/70 text-xs font-medium mb-1.5 uppercase tracking-wider">
                    {m.name}
                  </label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={m.namePlaceholder}
                    className="w-full bg-[#263947] border border-[#263947] focus:border-[#E4E969] rounded-lg px-4 py-3 text-[#DAEFFF] placeholder-[#DAEFFF]/30 outline-none transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#DAEFFF]/70 text-xs font-medium mb-1.5 uppercase tracking-wider">
                    {m.phone}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={m.phonePlaceholder}
                    className="w-full bg-[#263947] border border-[#263947] focus:border-[#E4E969] rounded-lg px-4 py-3 text-[#DAEFFF] placeholder-[#DAEFFF]/30 outline-none transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#DAEFFF]/70 text-xs font-medium mb-1.5 uppercase tracking-wider">
                    {m.email}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={m.emailPlaceholder}
                    className="w-full bg-[#263947] border border-[#263947] focus:border-[#E4E969] rounded-lg px-4 py-3 text-[#DAEFFF] placeholder-[#DAEFFF]/30 outline-none transition-colors text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting || !name || !phone || !email}
                  className="w-full bg-[#E4E969] hover:bg-[#FAFFC5] disabled:opacity-40 disabled:cursor-not-allowed text-[#0C1A23] font-bold py-3.5 rounded-lg transition-colors text-sm tracking-wide mt-2"
                >
                  {submitting ? m.submitting : m.submit}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
