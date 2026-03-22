import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import CharityClient from './CharityClient'

export default async function CharityPage(props) {
  const searchParams = props.searchParams ? await props.searchParams : {}
  const success = searchParams.success
  const message = searchParams.message

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
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">My Charity Impact</h1>
      <p className="text-gray-500 mb-6">
        Choose a charity and set how much of your subscription goes to them. Minimum is 10%.
      </p>

      {success && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-medium">
          ✅ Your charity preferences have been saved successfully!
        </div>
      )}

      {message && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm">
          ⚠️ {message}
        </div>
      )}

      <CharityClient
        charities={charities || []}
        profile={profile}
      />
    </div>
  )
}