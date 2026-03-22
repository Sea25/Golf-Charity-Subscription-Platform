'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateCharityChoice(formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const charityId = formData.get('charity_id')
  const charityPercentage = parseFloat(formData.get('charity_percentage'))

  if (!charityId || isNaN(charityPercentage) || charityPercentage < 10) return { error: 'Invalid selection' }
  await supabase.from('profiles').update({ charity_id: charityId, charity_percentage: charityPercentage }).eq('id', user.id)
  revalidatePath('/charity')
  return { success: true }
}
