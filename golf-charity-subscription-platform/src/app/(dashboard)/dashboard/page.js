import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('charity_percentage, charities(name)')
    .eq('id', user.id)
    .single()

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  const isActive = sub?.status === 'active' || sub?.status === 'trialing'

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rose-500">
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome to your Dashboard
      </h1>

      <p className="text-gray-600 mt-2">
        Signed in as:{' '}
        <span className="font-mono bg-gray-100 px-2 rounded">
          {user.email}
        </span>
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className={`border rounded-lg p-6 shadow-sm ${
            isActive ? 'bg-rose-50' : 'bg-gray-50'
          }`}
        >
          <h3 className="font-bold text-lg mb-2 text-rose-600">
            Subscription Status
          </h3>

          <p className="text-gray-500 text-sm mb-4">
            Status:{' '}
            <span className="font-bold text-gray-700">
              {sub?.status || 'Inactive'}
            </span>
          </p>

          {!isActive ? (
            <a
              href="/subscribe"
              className="inline-block px-4 py-2 bg-rose-500 text-white rounded"
            >
              Start Subscription
            </a>
          ) : (
            <p className="text-xs text-rose-500">
              Your {sub.plan_type} plan renews on{' '}
              {new Date(sub.current_period_end).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="border border-gray-200 rounded-lg p-6 bg-emerald-50">
          <h3 className="font-bold text-lg mb-2 text-emerald-600">
            Your Impact
          </h3>

          {profile?.charities ? (
            <>
              <p className="text-gray-700 font-medium">
                {profile.charities.name}
              </p>
              <p className="text-gray-500 text-sm">
                Contributing {profile.charity_percentage}%
              </p>
            </>
          ) : (
            <p className="text-gray-500 text-sm">
              You haven't selected a charity yet.
            </p>
          )}

          <a
            href="/charity"
            className="inline-block mt-4 px-4 py-2 bg-emerald-500 text-white rounded"
          >
            Choose Charity
          </a>
        </div>
      </div>
    </div>
  )
}