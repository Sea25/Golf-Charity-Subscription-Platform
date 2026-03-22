import { createClient } from '@supabase/supabase-js'

<<<<<<< HEAD
=======
// We use the Service Role key to bypass Row Level Security 
// ONLY use this in server-to-server endpoints (like Webhooks)
>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)
