import Link from 'next/link'

export default function AuthLayout({ children }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f9fafb',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <Link href="/" style={{ textDecoration: 'none', marginBottom: '28px' }}>
        <span style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: '1.5rem',
          color: '#0f1a14',
          letterSpacing: '-0.02em',
        }}>
          Impact Golf
        </span>
      </Link>

      <div style={{
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        padding: '40px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
      }}>
        {children}
      </div>

      <Link href="/" style={{
        marginTop: '20px',
        fontSize: '13px',
        color: '#9ca3af',
        textDecoration: 'none',
      }}>
        ← Back to home
      </Link>
    </div>
  )
}