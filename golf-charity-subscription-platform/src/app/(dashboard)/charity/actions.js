'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateCharityChoice(formData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const charityId = formData.get('charity_id')
  const charityPercentage = parseFloat(formData.get('charity_percentage'))

  if (!charityId) {
    redirect('/charity?message=Please+select+a+charity')
  }

  if (isNaN(charityPercentage) || charityPercentage < 10 || charityPercentage > 100) {
    redirect('/charity?message=Contribution+must+be+between+10%25+and+100%25')
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
    redirect('/charity?message=Could+not+update+your+charity+preferences')
  }

  revalidatePath('/charity')
  revalidatePath('/dashboard')
  redirect('/charity?success=true')
}