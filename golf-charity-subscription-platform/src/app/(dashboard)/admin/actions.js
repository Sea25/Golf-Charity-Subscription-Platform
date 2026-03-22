'use server'

import { supabaseAdmin } from '@/utils/supabase/admin'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function runMonthlyDraw() {
  console.log('\n--- 🚀 ADMIN DRAW ACTION TRIGGERED ---')
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/admin?status=error&message=Not+authenticated')
  }

  // 1. Retrieve active subscriptions
  const { data: activeSubs, error } = await supabaseAdmin
    .from('subscriptions')
    .select('user_id')
    .eq('status', 'active')

  if (error || !activeSubs || activeSubs.length === 0) {
    redirect('/admin?status=error&message=No+active+subscribers+found+for+the+draw')
  }
  console.log(`✅ Found ${activeSubs.length} active subscribers.`)

  // 2. Check current month
  const drawMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' })

  const { data: existingDraw } = await supabaseAdmin
    .from('draws')
    .select('id')
    .eq('draw_month', drawMonth)
    .maybeSingle()

  if (existingDraw) {
    redirect(`/admin?status=error&message=A+draw+has+already+been+run+for+${encodeURIComponent(drawMonth)}`)
  }

  // 3. Pick random winner
  const randomIndex = Math.floor(Math.random() * activeSubs.length)
  const winnerId = activeSubs[randomIndex].user_id
  console.log(`🎉 Winner selected! Profile ID: ${winnerId}`)

  // 4. Insert into draws table
  const { error: insertError } = await supabaseAdmin
    .from('draws')
    .insert({
      draw_month: drawMonth,
      winner_id: winnerId,
    })

  if (insertError) {
    redirect(`/admin?status=error&message=Database+insert+failed:+${encodeURIComponent(insertError.message)}`)
  }

  revalidatePath('/admin')
  revalidatePath('/dashboard')
  redirect(`/admin?status=success&message=Monthly+draw+completed!+Winner+selected+for+${encodeURIComponent(drawMonth)}`)
}