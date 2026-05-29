export const unstable_instant = false

import type { Metadata } from 'next'
import { avivoFont } from '@/app/fonts'
import { cookies } from 'next/headers'
import { LoginGate } from './LoginGate'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'Admin — Alivo',
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const authed = cookieStore.get('admin_auth')?.value === 'true'

  return (
    <html lang="en" className={`${avivoFont.variable} h-full`}>
      <body className="min-h-full bg-[#0C1A23] antialiased">
        {authed ? children : <LoginGate />}
      </body>
    </html>
  )
}
