'use client'

import { useEffect, useState } from 'react'

export function CurrentYear() {
  // Use a default year that matches the current copyright fallback safely
  const [year, setYear] = useState<number>(2026)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return <>{year}</>
}
