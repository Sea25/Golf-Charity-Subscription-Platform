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

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('status')
    .eq('user_id', user.id)
    .in('status', ['active', 'trialing'])
    .limit(1)
    .maybeSingle()

  const { data: scores } = await supabase
    .from('scores')
    .select('*')
    .eq('user_id', user.id)
    .order('played_date', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(5)

  const today = new Date().toISOString().split('T')[0]
  const avg = scores?.length
    ? Math.round(scores.reduce((a, s) => a + s.score, 0) / scores.length)
    : null

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: '2rem', fontWeight: 400,
          color: '#0f1a14', letterSpacing: '-0.02em', marginBottom: '6px'
        }}>
          My Scores
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>
          Only your latest 5 Stableford rounds are stored. Adding a 6th removes the oldest automatically.
        </p>
      </div>

      {/* Banners */}
      {!sub && (
        <div style={{
          background: '#fffbeb', border: '1px solid #fde68a',
          borderRadius: '10px', padding: '14px 16px',
          fontSize: '13px', color: '#92400e', marginBottom: '20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <span>⚠️ Active subscription required to enter scores</span>
          <a href="/subscribe" style={{ fontWeight: 600, color: '#92400e', textDecoration: 'underline' }}>Subscribe →</a>
        </div>
      )}
      {success && (
        <div style={{
          background: '#f0fdf4', border: '1px solid #bbf7d0',
          borderRadius: '10px', padding: '14px 16px',
          fontSize: '13px', color: '#15803d', marginBottom: '20px'
        }}>
          ✅ Score added successfully. Latest 5 rounds are shown below.
        </div>
      )}
      {message && (
        <div style={{
          background: '#fef2f2', border: '1px solid #fecaca',
          borderRadius: '10px', padding: '14px 16px',
          fontSize: '13px', color: '#dc2626', marginBottom: '20px'
        }}>
          ⚠️ {message}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>

        {/* Form */}
        <div style={{
          background: '#fff', border: '1px solid #e5e7eb',
          borderRadius: '14px', padding: '28px'
        }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#0f1a14', marginBottom: '24px' }}>
            Add new round
          </h2>
          <form action={addScore} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#9ca3af', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Stableford Score (1–45)
              </label>
              <input
                type="number"
                name="score"
                min="1"
                max="45"
                required
                placeholder="32"
                style={{
                  width: '100%', padding: '12px 14px',
                  border: '1px solid #e5e7eb', borderRadius: '9px',
                  fontSize: '22px', fontFamily: "'DM Serif Display', serif",
                  color: '#0f1a14', outline: 'none',
                  background: '#fafafa'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#9ca3af', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Date played
              </label>
              <input
                type="date"
                name="played_date"
                required
                defaultValue={today}
                style={{
                  width: '100%', padding: '12px 14px',
                  border: '1px solid #e5e7eb', borderRadius: '9px',
                  fontSize: '14px', color: '#0f1a14', outline: 'none',
                  background: '#fafafa'
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: '100%', padding: '12px',
                background: '#0f1a14', color: '#fff',
                border: 'none', borderRadius: '9px',
                fontSize: '14px', fontWeight: 600,
                cursor: 'pointer', marginTop: '4px'
              }}
            >
              Submit score
            </button>
          </form>
        </div>

        {/* Scores list */}
        <div style={{
          background: '#fff', border: '1px solid #e5e7eb',
          borderRadius: '14px', padding: '28px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#0f1a14' }}>Latest 5 rounds</h2>
            {scores?.length > 0 && (
              <span style={{
                background: '#f3f4f6', color: '#6b7280',
                padding: '3px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 500
              }}>
                {scores.length}/5
              </span>
            )}
          </div>

          {scores && scores.length > 0 ? (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '20px' }}>
                {scores.map((s, i) => (
                  <div key={s.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px 14px', borderRadius: '9px',
                    background: i === 0 ? '#f0fdf4' : '#fafafa',
                    border: `1px solid ${i === 0 ? '#bbf7d0' : '#f0f0f0'}`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        fontSize: '11px', fontWeight: 700,
                        color: i === 0 ? '#15803d' : '#9ca3af',
                        width: '24px'
                      }}>#{i + 1}</span>
                      <span style={{ fontSize: '13px', color: '#6b7280' }}>
                        {new Date(s.played_date + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <span style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: '1.5rem', color: i === 0 ? '#15803d' : '#0f1a14'
                    }}>{s.score}</span>
                  </div>
                ))}
              </div>

              {/* Average */}
              <div style={{
                background: '#0f1a14', borderRadius: '10px',
                padding: '16px 18px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <span style={{ fontSize: '13px', color: '#9ca3af' }}>Average score</span>
                <span style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: '1.75rem', color: '#4ade80'
                }}>{avg}</span>
              </div>
            </>
          ) : (
            <div style={{
              textAlign: 'center', padding: '48px 24px',
              background: '#fafafa', borderRadius: '10px',
              border: '2px dashed #e5e7eb'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⛳</div>
              <p style={{ fontSize: '14px', color: '#9ca3af' }}>No scores yet</p>
              <p style={{ fontSize: '12px', color: '#d1d5db', marginTop: '4px' }}>Submit your first round</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}