import { createClient } from '@/utils/supabase/server'
import { supabaseAdmin } from '@/utils/supabase/admin'
import { redirect } from 'next/navigation'
import { runMonthlyDraw } from './actions'

export const dynamic = 'force-dynamic'

export default async function AdminDrawPage(props) {
  // Gracefully handle Next.js 15 params promise or Next.js 14 objects
  const searchParams = props.searchParams ? await props.searchParams : {}
  const status = searchParams.status
  const message = searchParams.message

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/login')

  // Internship-friendly super-simple admin check
  // You can set NEXT_PUBLIC_ADMIN_EMAIL in your .env.local to match your email!
  const isAdmin = user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL || user.email === 'admin@impactgolf.com'
  
  if (!isAdmin) {
    return (
      <div className="p-8 text-center bg-white rounded-xl shadow-sm border border-rose-100 max-w-xl mx-auto mt-12">
        <h1 className="text-2xl font-bold text-gray-800">Access Denied</h1>
        <p className="text-gray-500 mt-2">You must be an admin to view the draw page.</p>
        <p className="text-emerald-600 mt-4 text-sm font-mono">Current User: {user.email}</p>
      </div>
    )
  }

  // Fetch past draws safely (gracefully handle if 'draws' table missing temporarily)
  let draws = []
  let tableMissingError = false
  
  const { data: fetchedDraws, error } = await supabaseAdmin
    .from('draws')
    .select('*')
    .order('created_at', { ascending: false })
    
  if (error && error.code === '42P01') {
      tableMissingError = true
  } else {
      draws = fetchedDraws || []
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border-t-4 border-emerald-500 p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Controls</h1>
        <p className="text-gray-500 mt-1">Manage the platform and run the monthly subscriber draws.</p>
      </div>

      {/* Dynamic Status Notifications */}
      {message && (
        <div className={`p-4 rounded-lg mb-8 border ${
          status === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          <h3 className="font-bold flex items-center gap-2">
            {status === 'success' ? '✅ Success' : '⚠️ Attention Required'}
          </h3>
          <p className="mt-1 text-sm">{message}</p>
        </div>
      )}

      {tableMissingError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-lg mb-8">
            <h3 className="font-bold">Database Setup Required</h3>
            <p className="text-sm mt-1">You must create the `draws` table in Supabase first. Run the SQL script from the assistant response!</p>
        </div>
      )}

      <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100 mb-8 max-w-lg shadow-sm">
        <h2 className="text-xl font-bold text-emerald-800 mb-2">Monthly Draw Utility</h2>
        <p className="text-emerald-700 text-sm mb-6 leading-relaxed">
          Randomly select a winner from all currently <strong>active</strong> subscribers. 
          This will securely pick a user ID and record it permanently.
        </p>

        <form action={runMonthlyDraw}>
          <button 
             type="submit" 
             disabled={tableMissingError}
             className="bg-emerald-500 disabled:bg-gray-400 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-colors w-full sm:w-auto"
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-emerald-600">{draw.draw_month}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500 bg-gray-50 my-2 inline-block rounded border mx-6 mt-3">
                      {draw.winner_id}
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
            No draws recorded yet. Click the button above to test the drawing logic!
          </p>
        )}
      </div>
    </div>
  )
}