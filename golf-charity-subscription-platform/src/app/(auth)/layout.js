'use client'

import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #f0f0f0',
        padding: '0 2rem',
        height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.25rem', color: '#0f1a14', letterSpacing: '-0.02em' }}>
          Impact Golf
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/login" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none', fontWeight: 500 }}>
            Sign in
          </Link>
          <Link href="/signup" style={{
            background: '#15803d', color: '#fff',
            padding: '8px 20px', borderRadius: '8px',
            fontSize: '14px', fontWeight: 600, textDecoration: 'none',
            transition: 'background 0.2s'
          }}>
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        paddingTop: '120px', paddingBottom: '80px',
        paddingLeft: '2rem', paddingRight: '2rem',
        maxWidth: '720px', margin: '0 auto', textAlign: 'center'
      }}>
        <div className="animate-fade-up" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: '#dcfce7', color: '#15803d',
          padding: '5px 14px', borderRadius: '99px',
          fontSize: '13px', fontWeight: 500, marginBottom: '28px'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
          10% of every subscription goes to charity
        </div>

        <h1 className="animate-fade-up animate-delay-1" style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
          lineHeight: 1.1, letterSpacing: '-0.02em',
          color: '#0f1a14', marginBottom: '24px', fontWeight: 400
        }}>
          Golf that gives<br />
          <em style={{ color: '#15803d', fontStyle: 'italic' }}>back.</em>
        </h1>

        <p className="animate-fade-up animate-delay-2" style={{
          fontSize: '1.125rem', color: '#6b7280', lineHeight: 1.7,
          marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px'
        }}>
          Track your Stableford scores, enter monthly prize draws, and support
          a charity you believe in — all from one platform.
        </p>

        <div className="animate-fade-up animate-delay-3" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/signup" style={{
            background: '#0f1a14', color: '#fff',
            padding: '14px 32px', borderRadius: '10px',
            fontSize: '15px', fontWeight: 600, textDecoration: 'none',
            display: 'inline-block'
          }}>
            Subscribe from $15/mo
          </Link>
          <Link href="/login" style={{
            background: 'transparent', color: '#374151',
            padding: '14px 24px', borderRadius: '10px',
            fontSize: '15px', fontWeight: 500, textDecoration: 'none',
            border: '1px solid #e5e7eb', display: 'inline-block'
          }}>
            Sign in →
          </Link>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{
        borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0',
        padding: '32px 2rem'
      }}>
        <div style={{
          maxWidth: '800px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem', textAlign: 'center'
        }}>
          {[
            { num: '$15/mo', label: 'Monthly plan' },
            { num: '10%+', label: 'To charity' },
            { num: 'Monthly', label: 'Prize draws' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: '2rem', color: '#0f1a14', letterSpacing: '-0.02em'
              }}>{s.num}</div>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '80px 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '12px' }}>HOW IT WORKS</p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2.25rem', color: '#0f1a14', fontWeight: 400 }}>
            Three simple steps
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {[
            { n: '01', title: 'Subscribe', body: 'Choose a monthly or yearly plan. A minimum of 10% goes directly to your chosen charity.' },
            { n: '02', title: 'Enter scores', body: 'Submit your latest 5 Stableford scores (1–45 pts). The system keeps them rolling automatically.' },
            { n: '03', title: 'Win prizes', body: 'Match 3, 4, or 5 draw numbers each month. Jackpot rolls over if no 5-match winner.' },
          ].map((step, i) => (
            <div key={i} className="card" style={{ padding: '28px 24px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '8px',
                background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', letterSpacing: '0.05em' }}>{step.n}</span>
              </div>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.35rem', color: '#0f1a14', marginBottom: '10px', fontWeight: 400 }}>{step.title}</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.65 }}>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Prize Pool */}
      <section style={{ background: '#f9fafb', padding: '80px 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '12px' }}>PRIZE POOL</p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2.25rem', color: '#0f1a14', fontWeight: 400, marginBottom: '48px' }}>
            Monthly prize distribution
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { match: '5-Number Match', pct: '40%', note: 'Jackpot — rolls over', highlight: true },
              { match: '4-Number Match', pct: '35%', note: 'Major prize' },
              { match: '3-Number Match', pct: '25%', note: 'Minor prize' },
            ].map((p, i) => (
              <div key={i} style={{
                background: p.highlight ? '#0f1a14' : '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '14px', padding: '28px 20px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: '2.5rem', letterSpacing: '-0.02em',
                  color: p.highlight ? '#4ade80' : '#0f1a14'
                }}>{p.pct}</div>
                <div style={{ fontWeight: 600, fontSize: '15px', color: p.highlight ? '#fff' : '#0f1a14', margin: '8px 0 4px' }}>{p.match}</div>
                <div style={{ fontSize: '13px', color: p.highlight ? '#9ca3af' : '#9ca3af' }}>{p.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charities */}
      <section style={{ padding: '80px 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '12px' }}>CHARITIES</p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2.25rem', color: '#0f1a14', fontWeight: 400 }}>
            Choose your cause
          </h2>
          <p style={{ color: '#6b7280', fontSize: '15px', marginTop: '12px' }}>
            At least 10% of every subscription goes to a charity you select.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {[
            { emoji: '🌊', name: 'Ocean Cleanup', desc: 'Protecting our oceans' },
            { emoji: '⛳', name: 'Youth Golf', desc: 'Making golf accessible' },
            { emoji: '🌳', name: 'Green Earth', desc: 'Fighting climate change' },
          ].map((c, i) => (
            <div key={i} className="card" style={{ padding: '28px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{c.emoji}</div>
              <div style={{ fontWeight: 600, color: '#0f1a14', marginBottom: '6px' }}>{c.name}</div>
              <div style={{ fontSize: '13px', color: '#9ca3af' }}>{c.desc}</div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', fontSize: '13px', color: '#9ca3af', marginTop: '20px' }}>
          Choose your charity after subscribing
        </p>
      </section>

      {/* CTA */}
      <section style={{
        background: '#0f1a14', padding: '80px 2rem', textAlign: 'center'
      }}>
        <h2 style={{
          fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: '#fff', fontWeight: 400, marginBottom: '16px'
        }}>
          Ready to make your<br />game count?
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '16px', marginBottom: '36px' }}>
          Join and start supporting a cause you care about.
        </p>
        <Link href="/signup" style={{
          background: '#22c55e', color: '#0f1a14',
          padding: '14px 36px', borderRadius: '10px',
          fontSize: '15px', fontWeight: 700, textDecoration: 'none',
          display: 'inline-block'
        }}>
          Get Started — $15/mo
        </Link>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid #f0f0f0', padding: '28px 2rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '12px'
      }}>
        <span style={{ fontFamily: "'DM Serif Display', serif", color: '#0f1a14', fontSize: '1rem' }}>Impact Golf</span>
        <span style={{ fontSize: '13px', color: '#9ca3af' }}>© 2026 · Every subscription gives back.</span>
      </footer>
    </div>
  )
}