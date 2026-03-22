import { createClient } from '@/utils/supabase/server'
import { supabaseAdmin } from '@/utils/supabase/admin'
import { redirect } from 'next/navigation'
import { runMonthlyDraw } from './actions'

export const dynamic = 'force-dynamic'

export default async function AdminDrawPage(props) {
  const searchParams = props.searchParams ? await props.searchParams : {}
  const status = searchParams.status
  const message = searchParams.message

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const isAdmin =
    user.email === process.env.ADMIN_EMAIL ||
    user.email === 'admin@impactgolf.com'

  if (!isAdmin) {
    return (
      <div style={{
        minHeight: '100vh', background: '#f9fafb',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'DM Sans', sans-serif"
      }}>
        <div style={{
          background: '#fff', border: '1px solid #e5e7eb',
          borderRadius: '16px', padding: '40px', textAlign: 'center', maxWidth: '400px'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🔒</div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.5rem', color: '#0f1a14', marginBottom: '8px', fontWeight: 400 }}>
            Access denied
          </h1>
          <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '16px' }}>
            You don&apos;t have admin access.
          </p>
          <code style={{ fontSize: '12px', background: '#f3f4f6', padding: '4px 8px', borderRadius: '5px', color: '#6b7280' }}>
            {user.email}
          </code>
        </div>
      </div>
    )
  }

  let draws = []
  let tableMissingError = false

  const { data: fetchedDraws, error } = await supabaseAdmin
    .from('draws')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    if (error.code === '42P01') tableMissingError = true
  } else {
    draws = fetchedDraws || []
  }

  const { count: activeSubsCount } = await supabaseAdmin
    .from('subscriptions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active')

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: '100vh', background: '#f9fafb' }}>
      {/* Nav */}
      <nav style={{
        background: '#fff', borderBottom: '1px solid #f0f0f0',
        padding: '0 2rem', height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.1rem', color: '#0f1a14' }}>
          Impact Golf <span style={{ color: '#9ca3af', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 400 }}>· Admin</span>
        </span>
        <a href="/dashboard" style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'none' }}>
          ← Back to dashboard
        </a>
      </nav>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '36px 2rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: '2rem', fontWeight: 400, color: '#0f1a14',
            letterSpacing: '-0.02em', marginBottom: '6px'
          }}>
            Admin panel
          </h1>
          <p style={{ fontSize: '14px', color: '#9ca3af' }}>
            Logged in as <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>{user.email}</code>
          </p>
        </div>

        {/* Status banner */}
        {message && (
          <div style={{
            padding: '14px 16px', borderRadius: '10px', marginBottom: '24px',
            background: status === 'success' ? '#f0fdf4' : '#fef2f2',
            border: `1px solid ${status === 'success' ? '#bbf7d0' : '#fecaca'}`,
            color: status === 'success' ? '#15803d' : '#dc2626',
            fontSize: '13px'
          }}>
            {status === 'success' ? '✅' : '⚠️'} {message}
          </div>
        )}

        {tableMissingError && (
          <div style={{
            padding: '14px 16px', borderRadius: '10px', marginBottom: '24px',
            background: '#fffbeb', border: '1px solid #fde68a',
            color: '#92400e', fontSize: '13px'
          }}>
            ⚠️ The <code>draws</code> table is missing. Run <code>supabase_schema.sql</code> in your Supabase SQL Editor.
          </div>
        )}

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          {[
            { label: 'Active subscribers', value: activeSubsCount ?? 0 },
            { label: 'Draws run', value: draws.length },
          ].map((s, i) => (
            <div key={i} style={{
              background: '#fff', border: '1px solid #e5e7eb',
              borderRadius: '12px', padding: '20px 24px'
            }}>
              <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 500, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2.25rem', color: '#0f1a14', letterSpacing: '-0.02em' }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Draw control */}
        <div style={{
          background: '#fff', border: '1px solid #e5e7eb',
          borderRadius: '14px', padding: '28px', marginBottom: '28px'
        }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#0f1a14', marginBottom: '8px' }}>
            Monthly draw
          </h2>
          <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '24px', lineHeight: 1.6 }}>
            Randomly selects a winner from all active subscribers. One draw per month — already-run months are blocked automatically.
          </p>
          <form action={runMonthlyDraw}>
            <button
              type="submit"
              disabled={tableMissingError}
              style={{
                padding: '11px 28px',
                background: tableMissingError ? '#e5e7eb' : '#0f1a14',
                color: tableMissingError ? '#9ca3af' : '#fff',
                border: 'none', borderRadius: '9px',
                fontSize: '14px', fontWeight: 600,
                cursor: tableMissingError ? 'not-allowed' : 'pointer',
                fontFamily: "'DM Sans', sans-serif"
              }}
            >
              Run monthly draw
            </button>
          </form>
        </div>

        {/* Past draws */}
        <div style={{
          background: '#fff', border: '1px solid #e5e7eb',
          borderRadius: '14px', padding: '28px'
        }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#0f1a14', marginBottom: '20px' }}>
            Past winners
          </h2>

          {draws.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                    {['Month', 'Winner ID', 'Date'].map(h => (
                      <th key={h} style={{
                        textAlign: 'left', padding: '0 0 12px',
                        fontSize: '11px', fontWeight: 600, color: '#9ca3af',
                        letterSpacing: '0.06em', textTransform: 'uppercase'
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {draws.map((d, i) => (
                    <tr key={d.id} style={{ borderBottom: i < draws.length - 1 ? '1px solid #f9fafb' : 'none' }}>
                      <td style={{ padding: '14px 0', fontSize: '14px', fontWeight: 600, color: '#0f1a14' }}>
                        {d.draw_month}
                      </td>
                      <td style={{ padding: '14px 0' }}>
                        <code style={{ fontSize: '12px', background: '#f3f4f6', padding: '3px 8px', borderRadius: '5px', color: '#6b7280' }}>
                          {d.winner_id || 'N/A'}
                        </code>
                      </td>
                      <td style={{ padding: '14px 0', fontSize: '13px', color: '#9ca3af' }}>
                        {new Date(d.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{
              textAlign: 'center', padding: '40px',
              background: '#fafafa', borderRadius: '10px',
              border: '2px dashed #e5e7eb'
            }}>
              <p style={{ fontSize: '14px', color: '#9ca3af' }}>No draws run yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}