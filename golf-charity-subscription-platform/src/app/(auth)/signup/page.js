import { signup } from '../actions'

export default async function SignupPage({ searchParams }) {
  const params = await searchParams
  const message = params?.message

  return (
    <>
      <h2 style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: '1.75rem', fontWeight: 400,
        color: '#0f1a14', marginBottom: '6px', letterSpacing: '-0.01em'
      }}>
        Create account
      </h2>
      <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '28px' }}>
        Join and start giving back through golf
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

      <form action={signup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
            Full name
          </label>
          <input
            name="full_name"
            type="text"
            required
            placeholder="Your name"
            style={{
              width: '100%', padding: '10px 14px',
              border: '1px solid #e5e7eb', borderRadius: '8px',
              fontSize: '14px', color: '#0f1a14', outline: 'none'
            }}
          />
        </div>

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
              fontSize: '14px', color: '#0f1a14', outline: 'none'
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
            placeholder="Min. 8 characters"
            style={{
              width: '100%', padding: '10px 14px',
              border: '1px solid #e5e7eb', borderRadius: '8px',
              fontSize: '14px', color: '#0f1a14', outline: 'none'
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
          Create account
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: '#9ca3af' }}>
        Already have an account?{' '}
        <a href="/login" style={{ color: '#15803d', fontWeight: 500, textDecoration: 'none' }}>
          Sign in
        </a>
      </p>
    </>
  )
}