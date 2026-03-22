import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function POST(request) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  if (error) return redirect('/dashboard?message=Could not sign out')
  return redirect('/')
}
