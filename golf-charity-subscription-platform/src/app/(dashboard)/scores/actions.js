'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function addScore(formData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const scoreValue = parseInt(formData.get('score'))
  const playedDate = formData.get('played_date')

  if (isNaN(scoreValue) || scoreValue < 1 || scoreValue > 45) {
    redirect('/scores?message=Score+must+be+between+1+and+45')
  }

  if (!playedDate) {
    redirect('/scores?message=Please+select+a+date')
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
    redirect('/scores?message=Could+not+save+your+score')
  }

  revalidatePath('/scores')
  redirect('/scores?success=true')
}