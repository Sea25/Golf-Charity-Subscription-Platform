'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addScore(formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const scoreValue = parseInt(formData.get('score'))
  const playedDate = formData.get('played_date')

  if(isNaN(scoreValue) || scoreValue < 1 || scoreValue > 45) return { error: 'Invalid score' }

  await supabase.from('scores').insert([{ user_id: user.id, score: scoreValue, played_date: playedDate }])
  revalidatePath('/scores')
}
