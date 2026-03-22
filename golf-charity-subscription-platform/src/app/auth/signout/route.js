<<<<<<< HEAD
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function POST(request) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  if (error) return redirect('/dashboard?message=Could not sign out')
=======
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function POST(request) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return redirect('/dashboard?message=Could not sign out')
  }

>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c
  return redirect('/')
}
