import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function POST(request) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return redirect('/dashboard?message=Could not sign out')
  }

  return redirect('/')
}
