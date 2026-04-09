'use client'

import { useActionState } from 'react'
import { adminLogin } from './actions'

export function LoginGate() {
  const [error, action, pending] = useActionState(adminLogin, '')

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-[#263947]/40 rounded-2xl p-8 w-full max-w-sm border border-[#263947]">
        <h1 className="text-xl font-black text-[#E4E969] mb-1">Alivo Admin</h1>
        <p className="text-xs text-[#DAEFFF]/40 mb-6">Enter passcode to continue</p>
        <form action={action}>
          <label className="block text-xs text-[#DAEFFF]/50 mb-1 uppercase tracking-wider">
            Passcode
          </label>
          <input
            name="passcode"
            type="password"
            autoFocus
            className="w-full bg-[#263947] border border-[#263947]/50 rounded-lg px-3 py-2 text-sm text-[#DAEFFF] focus:outline-none focus:border-[#E4E969] mb-4"
          />
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="w-full bg-[#E4E969] text-[#0C1A23] py-2 rounded-lg text-sm font-bold hover:bg-[#FAFFC5] disabled:opacity-50"
          >
            {pending ? 'Checking...' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  )
}
