'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addScore(formData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Not authenticated')
  }

  const scoreValue = parseInt(formData.get('score'))
  const playedDate = formData.get('played_date')

  if (isNaN(scoreValue) || scoreValue < 1 || scoreValue > 45) {
    return { error: 'Score must be between 1 and 45' }
  }

  const { error } = await supabase
    .from('scores')
    .insert([
      {
        user_id: user.id,
        score: scoreValue,
        played_date: playedDate,
      }
    ])

  if (error) {
    console.error('Error inserting score:', error)
    return { error: 'Could not save your score.' }
  }

  // Refresh the path to show the new list of scores
  revalidatePath('/scores')
  
  return { success: true }
}
