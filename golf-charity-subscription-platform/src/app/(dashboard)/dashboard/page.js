import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, charity_percentage, charities(name)')
    .eq('id', user.id)
    .maybeSingle()

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  const { data: scores } = await supabase
    .from('scores')
    .select('score, played_date')
    .eq('user_id', user.id)
    .order('played_date', { ascending: false })
    .limit(5)

  const isActive = sub?.status === 'active' || sub?.status === 'trialing'
  const avgScore = scores?.length
    ? Math.round(scores.reduce((a, s) => a + s.score, 0) / scores.length)
    : null

  const firstName = profile?.full_name?.split(' ')[0] || 'there'

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: '2rem', fontWeight: 400,
          color: '#0f1a14', letterSpacing: '-0.02em', marginBottom: '6px'
        }}>
          Hey, {firstName} 👋
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>
          Here&apos;s your platform overview
        </p>
      </div>

      {/* Cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '28px' }}>

        {/* Subscription */}
        <div style={{
          background: '#fff', border: '1px solid #e5e7eb',
          borderRadius: '14px', padding: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 500 }}>Subscription</span>
            <span style={{
              padding: '3px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 600,
              background: isActive ? '#dcfce7' : '#f3f4f6',
              color: isActive ? '#15803d' : '#6b7280'
            }}>
              {isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          {isActive ? (
            <>
              <div style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: '1.5rem', color: '#0f1a14', marginBottom: '6px', textTransform: 'capitalize'
              }}>
                {sub.plan_type} plan
              </div>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                Renews {new Date(sub.current_period_end).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
                No active plan
              </div>
              <a href="/subscribe" style={{
                display: 'inline-block', padding: '8px 16px',
                background: '#0f1a14', color: '#fff',
                borderRadius: '8px', fontSize: '13px',
                fontWeight: 600, textDecoration: 'none'
              }}>
                Subscribe →
              </a>
            </>
          )}
        </div>

        {/* Charity */}
        <div style={{
          background: '#fff', border: '1px solid #e5e7eb',
          borderRadius: '14px', padding: '24px'
        }}>
          <div style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 500, marginBottom: '16px' }}>Charity Impact</div>
          {profile?.charities ? (
            <>
              <div style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: '1.35rem', color: '#0f1a14', marginBottom: '6px'
              }}>
                {profile.charities.name}
              </div>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '16px' }}>
                Contributing {profile.charity_percentage}% of subscription
              </div>
              <a href="/charity" style={{ fontSize: '13px', color: '#15803d', fontWeight: 500, textDecoration: 'none' }}>
                Change charity →
              </a>
            </>
          ) : (
            <>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
                No charity selected
              </div>
              <a href="/charity" style={{
                display: 'inline-block', padding: '8px 16px',
                background: '#f0fdf4', color: '#15803d',
                border: '1px solid #bbf7d0',
                borderRadius: '8px', fontSize: '13px',
                fontWeight: 600, textDecoration: 'none'
              }}>
                Choose charity →
              </a>
            </>
          )}
        </div>

        {/* Scores */}
        <div style={{
          background: '#fff', border: '1px solid #e5e7eb',
          borderRadius: '14px', padding: '24px'
        }}>
          <div style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 500, marginBottom: '16px' }}>My Scores</div>
          {avgScore !== null ? (
            <>
              <div style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: '2.5rem', color: '#0f1a14', letterSpacing: '-0.02em', marginBottom: '4px'
              }}>
                {avgScore}
              </div>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '16px' }}>
                Avg Stableford · {scores.length}/5 rounds stored
              </div>
              <a href="/scores" style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500, textDecoration: 'none' }}>
                Add score →
              </a>
            </>
          ) : (
            <>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
                No scores yet
              </div>
              <a href="/scores" style={{
                display: 'inline-block', padding: '8px 16px',
                background: '#f9fafb', color: '#374151',
                border: '1px solid #e5e7eb',
                borderRadius: '8px', fontSize: '13px',
                fontWeight: 600, textDecoration: 'none'
              }}>
                Submit first score →
              </a>
            </>
          )}
        </div>
      </div>

      {/* Recent scores mini table */}
      {scores && scores.length > 0 && (
        <div style={{
          background: '#fff', border: '1px solid #e5e7eb',
          borderRadius: '14px', padding: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontWeight: 600, color: '#0f1a14', fontSize: '14px' }}>Recent rounds</span>
            <a href="/scores" style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'none' }}>View all →</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {scores.map((s, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 0',
                borderBottom: i < scores.length - 1 ? '1px solid #f3f4f6' : 'none'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    width: '28px', height: '28px', borderRadius: '7px',
                    background: i === 0 ? '#f0fdf4' : '#f9fafb',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: 700,
                    color: i === 0 ? '#15803d' : '#9ca3af'
                  }}>#{i + 1}</span>
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>
                    {new Date(s.played_date + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <span style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: '1.25rem', color: '#0f1a14'
                }}>{s.score}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}