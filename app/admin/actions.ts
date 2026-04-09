'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function adminLogin(_prev: string, formData: FormData): Promise<string> {
  const passcode = formData.get('passcode') as string
  if (passcode === process.env.ADMIN_PASSCODE) {
    const cookieStore = await cookies()
    cookieStore.set('admin_auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/admin',
    })
    redirect('/admin')
  }
  return 'Wrong passcode'
}
