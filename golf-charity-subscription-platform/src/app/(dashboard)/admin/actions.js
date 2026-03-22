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
    console.error('❌ Action failed: Not authenticated')
    redirect('/admin?status=error&message=Not+authenticated')
  }

  // 1. Retrieve active subscriptions
  console.log('1️⃣ Fetching active subscriptions...')
  const { data: activeSubs, error } = await supabaseAdmin
    .from('subscriptions')
    .select('user_id')
    .eq('status', 'active')

  if (error || !activeSubs || activeSubs.length === 0) {
    console.error('❌ No active subscribers found:', error?.message)
    redirect('/admin?status=error&message=No+active+subscribers+found+for+the+draw')
  }
  console.log(`✅ Found ${activeSubs.length} active subscribers.`)

  // 2. Check current month
  const drawMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
  console.log(`2️⃣ Current draw month evaluated as: ${drawMonth}`)

  const { data: existingDraw } = await supabaseAdmin
    .from('draws')
    .select('id')
    .eq('draw_month', drawMonth)
    .single()

  if (existingDraw) {
    console.warn('⚠️ A draw for this month already exists in the database.')
    redirect(`/admin?status=error&message=A+draw+has+already+been+run+for+${encodeURIComponent(drawMonth)}`)
  }

  // 3. Pick random winner
  console.log('3️⃣ Selecting random winner securely...')
  const randomIndex = Math.floor(Math.random() * activeSubs.length)
  const winnerId = activeSubs[randomIndex].user_id
  console.log(`🎉 Winner selected! Profile ID: ${winnerId}`)

  // 4. Insert into table
  console.log('4️⃣ Inserting winner into draws table...')
  const { error: insertError } = await supabaseAdmin
    .from('draws')
    .insert({
      draw_month: drawMonth,
      winner_id: winnerId
    })

  if (insertError) {
    console.error('❌ Database insert failed:', insertError.message)
    redirect(`/admin?status=error&message=Database+insert+failed:+${encodeURIComponent(insertError.message)}`)
  }

  console.log('✅ Insert successful. Revalidating paths and redirecting with success message.')
  revalidatePath('/admin')
  revalidatePath('/dashboard')
  
  redirect(`/admin?status=success&message=Monthly+draw+completed+successfully!+Winner+selected+for+${encodeURIComponent(drawMonth)}`)
}
