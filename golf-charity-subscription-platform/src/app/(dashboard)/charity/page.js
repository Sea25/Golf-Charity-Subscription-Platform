import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { updateCharityChoice } from './actions'

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
    .single()

  const { data: charities } = await supabase
    .from('charities')
    .select('*')
    .order('name')

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">My Charity Impact</h1>
      <p className="text-gray-600 mb-4">
        At least 10% of your subscription goes to a charity you choose.
      </p>

      {success && (
        <div className="mb-6 p-4 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm">
          ✅ Your charity preferences have been saved!
        </div>
      )}

      {message && (
        <div className="mb-6 p-4 rounded-md bg-red-50 text-red-600 border border-red-200 text-sm">
          {message}
        </div>
      )}

      <form action={updateCharityChoice} className="bg-emerald-50 border border-emerald-100 p-8 rounded-lg">
        <h2 className="text-xl font-bold text-emerald-900 mb-6">Your Selection</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Charity
            </label>

            {charities && charities.length > 0 ? (
              charities.map((c) => (
                <label
                  key={c.id}
                  className={`flex items-start p-4 border rounded cursor-pointer bg-white ${
                    profile?.charity_id === c.id
                      ? 'border-emerald-500 ring-1 ring-emerald-500'
                      : 'border-gray-200 hover:border-emerald-300'
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
              ))
            ) : (
              <p className="text-gray-500 text-sm italic p-4 bg-white rounded border border-dashed">
                No charities available yet. Ask your admin to add some.
              </p>
            )}
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
                className="w-full border p-2 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                required
              />
              <p className="text-xs text-gray-400 mt-2">Minimum 10%, maximum 100%</p>
            </div>

            <button
              type="submit"
              className="mt-6 w-full py-3 bg-emerald-600 text-white rounded font-medium hover:bg-emerald-700 transition-colors"
            >
              Save Impact
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}