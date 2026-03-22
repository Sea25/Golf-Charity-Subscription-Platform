import { createClient } from '@/utils/supabase/server'
import { supabaseAdmin } from '@/utils/supabase/admin'
import { redirect } from 'next/navigation'
import { runMonthlyDraw } from './actions'

export const dynamic = 'force-dynamic'

export default async function AdminDrawPage(props) {
  const searchParams = props.searchParams ? await props.searchParams : {}
  const status = searchParams.status
  const message = searchParams.message

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/login')

  const isAdmin =
    user.email === process.env.ADMIN_EMAIL ||
    user.email === 'admin@impactgolf.com'
  
  if (!isAdmin) {
    return (
      <div className="p-8 text-center bg-white rounded-xl shadow-sm border border-rose-100 max-w-xl mx-auto mt-12">
        <h1 className="text-2xl font-bold text-gray-800">Access Denied</h1>
        <p className="text-gray-500 mt-2">You must be an admin to view this page.</p>
        <p className="text-emerald-600 mt-4 text-sm font-mono">Current User: {user.email}</p>
        <p className="text-gray-400 mt-2 text-xs">
          Set ADMIN_EMAIL in your .env.local to match your email.
        </p>
      </div>
    )
  }

  let draws = []
  let tableMissingError = false
  
  const { data: fetchedDraws, error } = await supabaseAdmin
    .from('draws')
    .select('*')
    .order('created_at', { ascending: false })
    
  if (error) {
    if (error.code === '42P01') {
      tableMissingError = true
    } else {
      console.error('Error fetching draws:', error.message)
    }
  } else {
    draws = fetchedDraws || []
  }

  const { count: activeSubsCount } = await supabaseAdmin
    .from('subscriptions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active')

  return (
    <div className="bg-white rounded-xl shadow-sm border-t-4 border-emerald-500 p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Controls</h1>
        <p className="text-gray-500 mt-1">Manage the platform and run the monthly subscriber draws.</p>
        <p className="text-sm text-gray-400 mt-1">Logged in as: <span className="font-mono">{user.email}</span></p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-8 border ${
          status === 'success'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          <h3 className="font-bold flex items-center gap-2">
            {status === 'success' ? '✅ Success' : '⚠️ Attention Required'}
          </h3>
          <p className="mt-1 text-sm">{message}</p>
        </div>
      )}

      {tableMissingError && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg mb-8">
          <h3 className="font-bold">⚠️ Database Setup Required</h3>
          <p className="text-sm mt-1">
            The <code className="bg-amber-100 px-1 rounded">draws</code> table is missing.
            Run the SQL from <code>supabase_schema.sql</code> in your Supabase SQL Editor.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-rose-50 rounded-lg p-4 border border-rose-100">
          <p className="text-sm text-rose-600 font-medium">Active Subscribers</p>
          <p className="text-3xl font-bold text-rose-700">{activeSubsCount ?? 0}</p>
        </div>
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          <p className="text-sm text-emerald-600 font-medium">Draws Run</p>
          <p className="text-3xl font-bold text-emerald-700">{draws.length}</p>
        </div>
      </div>

      <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100 mb-8 max-w-lg shadow-sm">
        <h2 className="text-xl font-bold text-emerald-800 mb-2">Monthly Draw Utility</h2>
        <p className="text-emerald-700 text-sm mb-4 leading-relaxed">
          Randomly select a winner from all currently <strong>active</strong> subscribers.
          One draw per month — already-run months are blocked.
        </p>

        <form action={runMonthlyDraw}>
          <button 
            type="submit" 
            disabled={tableMissingError}
            className="bg-emerald-500 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-colors w-full sm:w-auto"
          >
            Run Monthly Draw
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Past Winners Log</h2>
        {draws && draws.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Draw Month</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Winner Profile ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Logged</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {draws.map((draw) => (
                  <tr key={draw.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-emerald-600">
                      {draw.draw_month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                      {draw.winner_id || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(draw.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 italic bg-gray-50 p-5 rounded-lg border text-center text-sm shadow-inner">
            No draws recorded yet. Click the button above to run the first draw!
          </p>
        )}
      </div>
    </div>
  )
}