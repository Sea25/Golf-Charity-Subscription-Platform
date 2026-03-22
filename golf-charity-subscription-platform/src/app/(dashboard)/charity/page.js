import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { updateCharityChoice } from './actions'

export default async function CharityPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('charity_id, charity_percentage')
    .eq('id', user.id)
    .single()

  const { data: charities } = await supabase
    .from('charities')
    .select('*')
    .order('name')

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">My Charity Impact</h1>
      <p className="text-gray-600 mb-8">
        At least 10% of your subscription goes to a charity you choose.
      </p>

      <form action={updateCharityChoice} className="bg-emerald-50 border border-emerald-100 p-8 rounded-lg">
        <h2 className="text-xl font-bold text-emerald-900 mb-6">Your Selection</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Select Charity
            </label>

            {charities?.map((c) => (
              <label
                key={c.id}
                className={`flex items-start p-4 border rounded cursor-pointer bg-white ${
                  profile?.charity_id === c.id
                    ? 'border-emerald-500 ring-1 ring-emerald-500'
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name="charity_id"
                  value={c.id}
                  defaultChecked={profile?.charity_id === c.id}
                  className="mt-1 border-gray-300 text-emerald-600"
                  required
                />
                <div className="ml-3">
                  <span className="font-semibold block">{c.name}</span>
                  <span className="text-gray-500 text-sm">{c.description}</span>
                </div>
              </label>
            ))}
          </div>

          <div>
            <div className="bg-white p-6 rounded border border-emerald-100 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contribution (%)
              </label>
              <input
                type="number"
                name="charity_percentage"
                min="10"
                max="100"
                defaultValue={profile?.charity_percentage || 10}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full py-3 bg-emerald-600 text-white rounded font-medium hover:bg-emerald-700"
            >
              Save Impact
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}