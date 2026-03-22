'use server'
<<<<<<< HEAD
=======

>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addScore(formData) {
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

  const scoreValue = parseInt(formData.get('score'))
  const playedDate = formData.get('played_date')

<<<<<<< HEAD
  if(isNaN(scoreValue) || scoreValue < 1 || scoreValue > 45) return { error: 'Invalid score' }

  await supabase.from('scores').insert([{ user_id: user.id, score: scoreValue, played_date: playedDate }])
  revalidatePath('/scores')
=======
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
>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c
}
