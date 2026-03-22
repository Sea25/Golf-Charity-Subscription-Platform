import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, charity_percentage, charities(name)')
    .eq('id', user.id)
    .maybeSingle()

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  const isActive = sub?.status === 'active' || sub?.status === 'trialing'

  const { data: scores } = await supabase
    .from('scores')
    .select('score')
    .eq('user_id', user.id)
    .order('played_date', { ascending: false })
    .limit(5)

  const avgScore = scores && scores.length > 0
    ? Math.round(scores.reduce((acc, s) => acc + s.score, 0) / scores.length)
    : null

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rose-500">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''}!
        </h1>
        <p className="text-gray-500 mt-1">
          Signed in as: <span className="font-mono bg-gray-100 px-2 rounded text-sm">{user.email}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Subscription Status */}
        <div className={`border rounded-lg p-6 shadow-sm ${isActive ? 'bg-rose-50 border-rose-200' : 'bg-gray-50 border-gray-200'}`}>
          <h3 className="font-bold text-lg mb-2 text-rose-600">Subscription</h3>
          <p className="text-gray-500 text-sm mb-1">
            Status: <span className={`font-bold ${isActive ? 'text-emerald-600' : 'text-gray-700'}`}>
              {sub?.status ? sub.status.charAt(0).toUpperCase() + sub.status.slice(1) : 'Inactive'}
            </span>
          </p>
          {isActive && sub?.plan_type && (
            <p className="text-xs text-gray-500 mb-3 capitalize">{sub.plan_type} plan</p>
          )}
          {!isActive ? (
            <a
              href="/subscribe"
              className="inline-block px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded text-sm font-medium mt-2"
            >
              Start Subscription →
            </a>
          ) : (
            <p className="text-xs text-rose-500 mt-2">
              Renews {new Date(sub.current_period_end).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Charity Impact */}
        <div className="border border-emerald-200 rounded-lg p-6 bg-emerald-50 shadow-sm">
          <h3 className="font-bold text-lg mb-2 text-emerald-600">Your Impact</h3>
          {profile?.charities ? (
            <>
              <p className="text-gray-700 font-medium">{profile.charities.name}</p>
              <p className="text-gray-500 text-sm">
                Contributing {profile.charity_percentage}%
              </p>
            </>
          ) : (
            <p className="text-gray-500 text-sm">No charity selected yet.</p>
          )}
          <a
            href="/charity"
            className="inline-block mt-4 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded text-sm font-medium"
          >
            {profile?.charities ? 'Change Charity' : 'Choose Charity'} →
          </a>
        </div>

        {/* Scores */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
          <h3 className="font-bold text-lg mb-2 text-gray-700">My Scores</h3>
          {avgScore !== null ? (
            <>
              <p className="text-3xl font-black text-rose-500">{avgScore}</p>
              <p className="text-xs text-gray-400">avg Stableford (last {scores.length})</p>
            </>
          ) : (
            <p className="text-gray-500 text-sm">No scores submitted yet.</p>
          )}
          <a
            href="/scores"
            className="inline-block mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded text-sm font-medium"
          >
            {avgScore !== null ? 'Add Score' : 'Submit First Score'} →
          </a>
        </div>
      </div>
    </div>
  )
}