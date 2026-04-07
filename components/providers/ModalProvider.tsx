'use client'

import { createContext, useContext, useState } from 'react'
import { ContactModal } from '@/components/ui/ContactModal'

interface ModalContextValue {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used within ModalProvider')
  return ctx
}

export function ModalProvider({
  children,
  dict,
}: {
  children: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: Record<string, any>
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ModalContext.Provider value={{ isOpen, openModal: () => setIsOpen(true), closeModal: () => setIsOpen(false) }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} dict={dict} />
    </ModalContext.Provider>
  )
}
