import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { addScore } from './actions'

export default async function ScoresPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: scores } = await supabase
    .from('scores')
    .select('*')
    .eq('user_id', user.id)
    .order('played_date', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">My Scores</h1>
      <p className="text-gray-600 mb-8">
        Enter your Stableford scores below. We only keep track of your latest 5 rounds.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <form action={addScore} className="space-y-4 bg-gray-50 border border-gray-100 p-6 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stableford Score (1 - 45)
            </label>
            <input
              type="number"
              name="score"
              min="1"
              max="45"
              required
              className="mt-1 block w-full border-gray-300 rounded-md p-2 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date Played
            </label>
            <input
              type="date"
              name="played_date"
              required
              className="mt-1 block w-full border-gray-300 rounded-md p-2 border"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-rose-600 hover:bg-rose-700 rounded-md"
          >
            Submit Score
          </button>
        </form>

        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Latest 5 Rounds
          </h2>

          {scores?.length > 0 ? (
            <div className="space-y-3">
              {scores.map((s, i) => (
                <div
                  key={s.id}
                  className="flex justify-between items-center p-4 rounded-lg bg-rose-50 border-l-4 border-rose-500"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 bg-rose-200 text-rose-700 rounded-full flex items-center justify-center font-bold">
                      #{i + 1}
                    </div>
                    <div>
                      <p className="font-medium">
                        {new Date(s.played_date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500">Stableford</p>
                    </div>
                  </div>

                  <div className="text-2xl font-black text-rose-600">
                    {s.score}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 bg-gray-50 rounded border-2 border-dashed">
              You haven't submitted scores yet.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}