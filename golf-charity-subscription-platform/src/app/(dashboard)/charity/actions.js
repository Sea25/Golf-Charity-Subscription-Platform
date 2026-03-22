'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateCharityChoice(formData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Not authenticated')
  }

  const charityId = formData.get('charity_id')
  const charityPercentage = parseFloat(formData.get('charity_percentage'))

  if (!charityId) {
    return { error: 'Please select a charity.' }
  }

  if (isNaN(charityPercentage) || charityPercentage < 10 || charityPercentage > 100) {
    return { error: 'Contribution must be between 10% and 100%' }
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      charity_id: charityId,
      charity_percentage: charityPercentage,
    })
    .eq('id', user.id)

  if (error) {
    console.error('Error updating charity:', error)
    return { error: 'Could not update your charity preferences.' }
  }

  revalidatePath('/charity')
  
  return { success: true }
}
