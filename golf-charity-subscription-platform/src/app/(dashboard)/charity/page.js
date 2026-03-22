import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import CharityClient from './CharityClient'

export default async function CharityPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('charity_id, charity_percentage')
    .eq('id', user.id)
    .maybeSingle()

  const { data: charities } = await supabase
    .from('charities')
    .select('*')
    .order('name')

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: '2rem', fontWeight: 400,
          color: '#0f1a14', letterSpacing: '-0.02em', marginBottom: '6px'
        }}>
          My Charity
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>
          Choose a charity and set your contribution percentage. Minimum is 10%.
        </p>
      </div>

      <div style={{ maxWidth: '680px' }}>
        <CharityClient charities={charities || []} profile={profile} />
      </div>
    </div>
  )
}