import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { addScore } from './actions'

export default async function ScoresPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch only the scores for this user, ordered by most recent first
  const { data: scores, error } = await supabase
    .from('scores')
    .select('*')
    .eq('user_id', user.id)
    .order('played_date', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Scores</h1>
        <p className="text-gray-600">Enter your Stableford scores below. We only keep track of your latest 5 rounds for the monthly draws.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Score Entry Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Submit New Score</h2>
          <form action={addScore} className="space-y-4 bg-gray-50 border border-gray-100 p-6 rounded-lg">
            
            <div>
              <label htmlFor="score" className="block text-sm font-medium text-gray-700">Stableford Score (1 - 45)</label>
              <input 
                type="number" 
                id="score" 
                name="score" 
                min="1" 
                max="45" 
                required 
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 sm:text-sm py-2 px-3 border" 
                placeholder="Ex. 36"
              />
            </div>

            <div>
              <label htmlFor="played_date" className="block text-sm font-medium text-gray-700">Date Played</label>
              <input 
                type="date" 
                id="played_date" 
                name="played_date" 
                required 
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 sm:text-sm py-2 px-3 border" 
              />
            </div>

            <button 
              type="submit" 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 transition-colors"
            >
              Submit Score
            </button>
          </form>
        </div>

        {/* Existing Scores Display Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Latest 5 Rounds</h2>
          
          {scores && scores.length > 0 ? (
            <div className="space-y-3">
              {scores.map((score, index) => (
                <div key={score.id} className="flex justify-between items-center p-4 rounded-lg bg-rose-50 border-l-4 border-rose-500">
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-rose-200 text-rose-700 font-bold flex items-center justify-center text-sm">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{new Date(score.played_date).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-500">Stableford Points</p>
                    </div>
                  </div>
                  <div className="text-2xl font-black text-rose-600">
                    {score.score}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <span className="text-4xl block mb-2">⛳</span>
              <p className="text-gray-500 text-sm">You haven't submitted any scores yet.<br/>Your scores will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
