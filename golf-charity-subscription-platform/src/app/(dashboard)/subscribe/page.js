import { createCheckoutSession } from './actions'

export default async function SubscribePage(props) {
  const searchParams = props.searchParams ? await props.searchParams : {}
  const isCanceled = searchParams?.canceled
  const isSuccess = searchParams?.success

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: '2rem', fontWeight: 400,
          color: '#0f1a14', letterSpacing: '-0.02em', marginBottom: '6px'
        }}>
          Choose a plan
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>
          Subscribe to unlock scores, draws, and charity giving.
        </p>

        {isCanceled && (
          <div style={{
            marginTop: '16px', background: '#fffbeb', border: '1px solid #fde68a',
            borderRadius: '10px', padding: '12px 16px',
            fontSize: '13px', color: '#92400e', maxWidth: '420px'
          }}>
            Checkout was canceled — no charge was made.
          </div>
        )}
        {isSuccess && (
          <div style={{
            marginTop: '16px', background: '#f0fdf4', border: '1px solid #bbf7d0',
            borderRadius: '10px', padding: '12px 16px',
            fontSize: '13px', color: '#15803d', maxWidth: '420px'
          }}>
            🎉 You&apos;re subscribed! Welcome to Impact Golf.
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '680px' }}>

        {/* Monthly */}
        <div style={{
          background: '#fff', border: '1px solid #e5e7eb',
          borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#9ca3af', marginBottom: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Monthly</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '3rem', color: '#0f1a14', letterSpacing: '-0.03em' }}>$15</span>
              <span style={{ fontSize: '14px', color: '#9ca3af' }}>/month</span>
            </div>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {['10%+ to your chosen charity', 'Monthly prize draw entry', 'Score tracking (5 rounds)', 'Cancel anytime'].map(f => (
              <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#6b7280' }}>
                <span style={{ color: '#22c55e', fontSize: '14px', fontWeight: 700, flexShrink: 0 }}>✓</span>
                {f}
              </li>
            ))}
          </ul>

          <form action={createCheckoutSession} style={{ marginTop: 'auto' }}>
            <input type="hidden" name="plan_type" value="monthly" />
            <button type="submit" style={{
              width: '100%', padding: '12px',
              background: '#f3f4f6', color: '#0f1a14',
              border: '1px solid #e5e7eb', borderRadius: '9px',
              fontSize: '14px', fontWeight: 600, cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif"
            }}>
              Subscribe monthly
            </button>
          </form>
        </div>

        {/* Yearly */}
        <div style={{
          background: '#0f1a14', border: '1px solid #0f1a14',
          borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute', top: '-12px', left: '24px',
            background: '#22c55e', color: '#0f1a14',
            padding: '4px 12px', borderRadius: '99px',
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em'
          }}>
            BEST VALUE
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', marginBottom: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Yearly</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '3rem', color: '#fff', letterSpacing: '-0.03em' }}>$150</span>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>/year</span>
            </div>
            <div style={{ fontSize: '12px', color: '#4ade80', marginTop: '4px' }}>2 months free — save $30</div>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {['10%+ to your chosen charity', 'Monthly prize draw entry', 'Score tracking (5 rounds)', '2 months free vs monthly'].map(f => (
              <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#9ca3af' }}>
                <span style={{ color: '#4ade80', fontSize: '14px', fontWeight: 700, flexShrink: 0 }}>✓</span>
                {f}
              </li>
            ))}
          </ul>

          <form action={createCheckoutSession} style={{ marginTop: 'auto' }}>
            <input type="hidden" name="plan_type" value="yearly" />
            <button type="submit" style={{
              width: '100%', padding: '12px',
              background: '#22c55e', color: '#0f1a14',
              border: 'none', borderRadius: '9px',
              fontSize: '14px', fontWeight: 700, cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif"
            }}>
              Subscribe yearly
            </button>
          </form>
        </div>
      </div>

      <p style={{ marginTop: '20px', fontSize: '12px', color: '#9ca3af', maxWidth: '560px' }}>
        Secure payment via Stripe. Cancel anytime. A minimum of 10% of your subscription goes directly to your chosen charity.
      </p>
    </div>
  )
}