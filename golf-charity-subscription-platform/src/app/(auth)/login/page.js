import { login } from '../actions'

export default async function LoginPage({ searchParams }) {
  const params = await searchParams
  const message = params?.message

  return (
    <>
      <h2 style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: '1.75rem', fontWeight: 400,
        color: '#0f1a14', marginBottom: '6px', letterSpacing: '-0.01em'
      }}>
        Welcome back
      </h2>
      <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '28px' }}>
        Sign in to your account
      </p>

      {message && (
        <div style={{
          background: '#fef2f2', border: '1px solid #fecaca',
          borderRadius: '8px', padding: '12px 14px',
          color: '#dc2626', fontSize: '13px', marginBottom: '20px'
        }}>
          {message}
        </div>
      )}

      <form action={login} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
            Email address
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            style={{
              width: '100%', padding: '10px 14px',
              border: '1px solid #e5e7eb', borderRadius: '8px',
              fontSize: '14px', color: '#0f1a14',
              outline: 'none', background: '#fff',
              transition: 'border-color 0.15s'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            placeholder="••••••••"
            style={{
              width: '100%', padding: '10px 14px',
              border: '1px solid #e5e7eb', borderRadius: '8px',
              fontSize: '14px', color: '#0f1a14',
              outline: 'none', background: '#fff'
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%', padding: '11px',
            background: '#0f1a14', color: '#fff',
            border: 'none', borderRadius: '8px',
            fontSize: '14px', fontWeight: 600,
            cursor: 'pointer', marginTop: '4px'
          }}
        >
          Sign in
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: '#9ca3af' }}>
        No account?{' '}
        <a href="/signup" style={{ color: '#15803d', fontWeight: 500, textDecoration: 'none' }}>
          Create one
        </a>
      </p>
    </>
  )
}