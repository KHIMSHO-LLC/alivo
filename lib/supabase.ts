import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabaseInstance: any = null

function getSupabase() {
  if (supabaseInstance) return supabaseInstance

  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  return supabaseInstance
}

export { getSupabase as supabase }
