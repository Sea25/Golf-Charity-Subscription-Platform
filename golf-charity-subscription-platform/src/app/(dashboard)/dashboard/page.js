import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()

  // Get current user session
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch their profile and subscription status
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
    <div className="min-h-screen bg-gray-50 border-t-4 border-rose-500 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to your Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Signed in as: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{user.email}</span>
        </p>

         <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Subscription Status Widget */}
           <div className={`border rounded-lg p-6 shadow-sm ${isActive ? 'bg-gradient-to-br from-white to-rose-50 border-rose-200' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'}`}>
             <h3 className={`font-bold text-lg mb-2 ${isActive ? 'text-rose-600' : 'text-gray-600'}`}>Subscription Status</h3>
             <p className="text-gray-500 text-sm mb-4">
               Status: <span className={`font-bold ${isActive ? 'text-rose-500' : 'text-gray-700 uppercase tracking-widest'}`}>{sub?.status || 'Inactive'}</span>
             </p>
             
             {!isActive ? (
               <a href="/subscribe" className="inline-block px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition-colors shadow-sm text-sm font-semibold">
                 Start Subscription
               </a>
             ) : (
                <p className="text-xs text-rose-400">Your {sub.plan_type} plan renews next on {new Date(sub.current_period_end).toLocaleDateString()}</p>
             )}
           </div>
           
           <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-white to-emerald-50 shadow-sm">
             <h3 className="font-bold text-lg mb-2 text-emerald-600">Your Impact</h3>
             {profile?.charities ? (
               <>
                 <p className="text-gray-700 font-medium">{profile.charities.name}</p>
                 <p className="text-gray-500 text-sm mt-1">You are contributing <span className="font-bold">{profile.charity_percentage}%</span></p>
               </>
             ) : (
               <p className="text-gray-500 text-sm mb-4">You haven't selected a charity yet.</p>
             )}
             <a href="/charity" className="inline-block mt-4 px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors shadow-sm text-sm font-semibold">
               {profile?.charities ? 'Change Charity' : 'Choose Charity'}
             </a>
           </div>
        </div>
      </div>
    </div>
  )
}
