import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { addScore } from './actions'

export default async function ScoresPage(props) {
  const searchParams = props.searchParams ? await props.searchParams : {}
  const success = searchParams.success
  const message = searchParams.message

  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Check active subscription
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('status')
    .eq('user_id', user.id)
    .in('status', ['active', 'trialing'])
    .limit(1)
    .maybeSingle()

  // Fetch latest 5 scores - sorted newest first
  const { data: scores } = await supabase
    .from('scores')
    .select('*')
    .eq('user_id', user.id)
    .order('played_date', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(5)

  // Today's date for the default date input value
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">My Scores</h1>
      <p className="text-gray-500 mb-6">
        Submit your Stableford scores. Only your <span className="font-semibold text-rose-500">latest 5 rounds</span> are kept — adding a 6th automatically removes the oldest.
      </p>

      {!sub && (
        <div className="mb-6 p-4 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 text-sm">
          ⚠️ You need an active subscription to enter scores.{' '}
          <a href="/subscribe" className="font-semibold underline">Subscribe now →</a>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-medium">
          ✅ Score submitted! Your latest 5 rounds are shown below.
        </div>
      )}

      {message && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm">
          ⚠️ {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Add Score Form */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Add New Score</h2>
          <form action={addScore} className="space-y-4 bg-gray-50 border border-gray-100 p-6 rounded-xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stableford Score <span className="text-gray-400">(1–45)</span>
              </label>
              <input
                type="number"
                name="score"
                min="1"
                max="45"
                required
                placeholder="e.g. 32"
                className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-rose-400 text-lg font-bold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Played
              </label>
              <input
                type="date"
                name="played_date"
                required
                defaultValue={today}
                className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white bg-rose-600 hover:bg-rose-700 rounded-lg font-bold transition-colors"
            >
              Submit Score
            </button>
          </form>
        </div>

        {/* Latest 5 Scores */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Latest 5 Rounds</h2>
            {scores && scores.length > 0 && (
              <span className="text-xs bg-rose-100 text-rose-600 px-2 py-1 rounded-full font-medium">
                {scores.length}/5 stored
              </span>
            )}
          </div>

          {scores && scores.length > 0 ? (
            <div className="space-y-3">
              {scores.map((s, i) => (
                <div
                  key={s.id}
                  className={`flex justify-between items-center p-4 rounded-xl border-l-4 ${
                    i === 0
                      ? 'bg-rose-50 border-rose-500'
                      : 'bg-gray-50 border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      i === 0
                        ? 'bg-rose-200 text-rose-700'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      #{i + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {new Date(s.played_date + 'T00:00:00').toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                      <p className="text-xs text-gray-400">Stableford</p>
                    </div>
                  </div>

                  <div className={`text-2xl font-black ${i === 0 ? 'text-rose-600' : 'text-gray-600'}`}>
                    {s.score}
                  </div>
                </div>
              ))}

              {/* Average */}
              <div className="mt-4 p-4 bg-gray-900 rounded-xl flex justify-between items-center">
                <span className="text-gray-400 text-sm font-medium">Average Score</span>
                <span className="text-white text-2xl font-black">
                  {Math.round(scores.reduce((acc, s) => acc + s.score, 0) / scores.length)}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center p-12 bg-gray-50 rounded-xl border-2 border-dashed text-gray-400">
              <p className="text-4xl mb-3">⛳</p>
              <p className="font-medium">No scores yet</p>
              <p className="text-sm mt-1">Submit your first round to get started</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}