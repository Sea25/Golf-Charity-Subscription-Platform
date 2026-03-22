import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { updateCharityChoice } from './actions'

export default async function CharityPage() {
  const supabase = await createClient()
<<<<<<< HEAD
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('charity_id, charity_percentage').eq('id', user.id).single()
  const { data: charities } = await supabase.from('charities').select('*').order('name')

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">My Charity Impact</h1>
      <p className="text-gray-600 mb-8">At least 10% of your subscription goes to a charity you choose.</p>

      <form action={updateCharityChoice} className="bg-emerald-50 border border-emerald-100 p-8 rounded-lg">
        <h2 className="text-xl font-bold text-emerald-900 mb-6">Your Selection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Select Charity</label>
            {charities?.map(c => (
              <label key={c.id} className={`flex items-start p-4 border rounded cursor-pointer bg-white ${profile?.charity_id===c.id?'border-emerald-500 ring-1 ring-emerald-500':''}`}>
                <input type="radio" name="charity_id" value={c.id} defaultChecked={profile?.charity_id===c.id} className="mt-1 border-gray-300 text-emerald-600" required />
                <div className="ml-3"><span className="font-semibold block">{c.name}</span><span className="text-gray-500 text-sm">{c.description}</span></div>
              </label>
            ))}
          </div>

          <div>
            <div className="bg-white p-6 rounded border border-emerald-100 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">Contribution (%)</label>
              <input type="number" name="charity_percentage" min="10" max="100" defaultValue={profile?.charity_percentage || 10} className="w-full border p-2 rounded" required />
            </div>
            <button type="submit" className="mt-6 w-full py-3 bg-emerald-600 text-white rounded font-medium hover:bg-emerald-700">Save Impact</button>
=======

  // Get current user session
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch the user's profile to get their current selection
  const { data: profile } = await supabase
    .from('profiles')
    .select('charity_id, charity_percentage')
    .eq('id', user.id)
    .single()

  // Fetch available charities
  const { data: charities } = await supabase
    .from('charities')
    .select('*')
    .order('name')

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Charity Impact</h1>
        <p className="text-gray-600">Choose the charity that matters most to you. When you subscribe, at least 10% goes directly to them.</p>
      </div>

      <form action={updateCharityChoice} className="bg-emerald-50 border border-emerald-100 p-8 rounded-lg">
        <h2 className="text-xl font-bold text-emerald-900 mb-6 block">Your Current Selection</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <label htmlFor="charity_id" className="block text-sm font-medium text-gray-700 mb-2">Select a Charity</label>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {charities && charities.length > 0 ? charities.map((charity) => (
                <label key={charity.id} className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors hover:bg-white ${profile?.charity_id === charity.id ? 'border-emerald-500 bg-white ring-1 ring-emerald-500' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center h-5">
                    <input
                      id={`charity-${charity.id}`}
                      name="charity_id"
                      type="radio"
                      value={charity.id}
                      defaultChecked={profile?.charity_id === charity.id}
                      className="focus:ring-emerald-500 h-4 w-4 text-emerald-600 border-gray-300"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="font-semibold text-gray-900 block">{charity.name}</span>
                    <span className="text-gray-500">{charity.description}</span>
                  </div>
                </label>
              )) : (
                <div className="p-4 bg-white rounded-lg border border-gray-200 text-sm text-gray-500 text-center">
                  No charities available right now.
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg border border-emerald-100 shadow-sm">
              <label htmlFor="charity_percentage" className="block text-sm font-medium text-gray-700 mb-2">
                Contribution Percentage
              </label>
              <p className="text-xs text-gray-500 mb-4">You must contribute at least 10% of your subscription, but you can choose to give more!</p>
              
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  id="charity_percentage"
                  name="charity_percentage"
                  min="10"
                  max="100"
                  step="5"
                  defaultValue={profile?.charity_percentage || 10}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  onInput="document.getElementById('percentage-display').innerText = this.value + '%'"
                />
                <span id="percentage-display" className="font-bold text-xl text-emerald-600 w-16 text-right">
                  {profile?.charity_percentage || 10}%
                </span>
              </div>
            </div>

            <button 
              type="submit" 
              className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
            >
              Save Impact Preferences
            </button>
>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c
          </div>
        </div>
      </form>
    </div>
  )
}
