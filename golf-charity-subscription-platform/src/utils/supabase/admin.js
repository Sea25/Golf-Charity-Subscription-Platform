import { createClient } from '@supabase/supabase-js'

// We use the Service Role key to bypass Row Level Security 
// ONLY use this in server-to-server endpoints (like Webhooks)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)
