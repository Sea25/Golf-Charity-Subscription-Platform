import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import NavLinks from './NavLinks'

export default async function DashboardLayout({ children }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Top Nav */}
      <nav style={{
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
        padding: '0 2rem',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}>
        {/* Logo + Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <span style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: '1.1rem',
              color: '#0f1a14',
              letterSpacing: '-0.02em',
            }}>
              Impact Golf
            </span>
          </Link>

          <NavLinks />
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{
            fontSize: '12px',
            color: '#9ca3af',
            background: '#f3f4f6',
            padding: '4px 10px',
            borderRadius: '6px',
            maxWidth: '200px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {user.email}
          </span>
          <form action="/auth/signout" method="POST">
            <button type="submit" style={{
              background: 'none',
              border: '1px solid #e5e7eb',
              borderRadius: '7px',
              padding: '6px 14px',
              fontSize: '13px',
              color: '#6b7280',
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
            }}>
              Sign out
            </button>
          </form>
        </div>
      </nav>

      {/* Page content */}
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '36px 2rem' }}>
        {children}
      </main>
    </div>
  )
}