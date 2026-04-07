'use client'

import { useModal } from '@/components/providers/ModalProvider'

interface ModalTriggerProps {
  label: string
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
}

export function ModalTrigger({ label, variant = 'primary', className = '' }: ModalTriggerProps) {
  const { openModal } = useModal()

  const base = 'inline-flex items-center gap-2 font-semibold transition-all duration-200 rounded-full cursor-pointer'

  const variants = {
    primary: 'bg-[#E4E969] hover:bg-[#FAFFC5] text-[#0C1A23] px-7 py-3.5 text-sm tracking-wide',
    secondary: 'bg-[#0C1A23] hover:bg-[#263947] text-[#E4E969] border border-[#E4E969] px-7 py-3.5 text-sm tracking-wide',
    outline: 'bg-transparent hover:bg-[#DAEFFF]/10 text-[#DAEFFF] border border-[#DAEFFF]/30 hover:border-[#DAEFFF] px-7 py-3.5 text-sm tracking-wide',
  }

  return (
    <button onClick={openModal} className={`${base} ${variants[variant]} ${className}`}>
      {label}
    </button>
  )
}
