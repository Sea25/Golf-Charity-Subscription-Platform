'use server'
<<<<<<< HEAD
=======

>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateCharityChoice(formData) {
  const supabase = await createClient()
<<<<<<< HEAD
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
=======

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Not authenticated')
  }
>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c

  const charityId = formData.get('charity_id')
  const charityPercentage = parseFloat(formData.get('charity_percentage'))

<<<<<<< HEAD
  if (!charityId || isNaN(charityPercentage) || charityPercentage < 10) return { error: 'Invalid selection' }
  await supabase.from('profiles').update({ charity_id: charityId, charity_percentage: charityPercentage }).eq('id', user.id)
  revalidatePath('/charity')
=======
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
  
>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c
  return { success: true }
}
