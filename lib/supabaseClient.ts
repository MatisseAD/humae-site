import 'server-only'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export class SupabaseConfigurationError extends Error {
  constructor() {
    super('Supabase server environment variables are not configured')
    this.name = 'SupabaseConfigurationError'
  }
}

let serverClient: SupabaseClient | undefined

export function getSupabase() {
  if (serverClient) return serverClient

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new SupabaseConfigurationError()
  }

  serverClient = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  return serverClient
}
