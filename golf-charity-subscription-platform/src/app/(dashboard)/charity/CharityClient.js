'use client'

import { useState } from 'react'
import { updateCharityChoice } from './actions'

export default function CharityClient({ charities, profile }) {
  const [selectedId, setSelectedId] = useState(profile?.charity_id || '')
  const [percentage, setPercentage] = useState(profile?.charity_percentage || 10)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const selectedCharity = charities.find(c => c.id === selectedId)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!selectedId) return
    setSaving(true)
    const formData = new FormData()
    formData.append('charity_id', selectedId)
    formData.append('charity_percentage', percentage)
    await updateCharityChoice(formData)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const getEmoji = (name) => {
    const n = name?.toLowerCase() || ''
    if (n.includes('ocean') || n.includes('sea') || n.includes('water')) return '🌊'
    if (n.includes('golf') || n.includes('youth') || n.includes('sport')) return '⛳'
    if (n.includes('green') || n.includes('earth') || n.includes('climate') || n.includes('tree')) return '🌳'
    return '❤️'
  }

  return (
    <form onSubmit={handleSubmit}>

      {saved && (
        <div style={{
          background: '#f0fdf4', border: '1px solid #bbf7d0',
          borderRadius: '10px', padding: '14px 16px',
          fontSize: '13px', color: '#15803d', marginBottom: '24px'
        }}>
          ✅ Saved! Your charity preferences have been updated.
        </div>
      )}

      {/* Charity cards */}
      <div style={{ marginBottom: '28px' }}>
        <label style={{
          display: 'block', fontSize: '12px', fontWeight: 600,
          color: '#9ca3af', letterSpacing: '0.06em',
          textTransform: 'uppercase', marginBottom: '14px'
        }}>
          Select charity
        </label>

        {charities && charities.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {charities.map(c => {
              const isSelected = selectedId === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedId(c.id)}
                  style={{
                    textAlign: 'left', padding: '20px',
                    borderRadius: '12px', cursor: 'pointer',
                    border: isSelected ? '2px solid #15803d' : '1px solid #e5e7eb',
                    background: isSelected ? '#f0fdf4' : '#fff',
                    transition: 'all 0.15s',
                    outline: 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <span style={{ fontSize: '1.75rem' }}>{getEmoji(c.name)}</span>
                    {isSelected && (
                      <span style={{
                        width: '20px', height: '20px', borderRadius: '50%',
                        background: '#15803d', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        fontSize: '11px', color: '#fff', flexShrink: 0
                      }}>✓</span>
                    )}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: '#0f1a14', marginBottom: '4px' }}>{c.name}</div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', lineHeight: 1.5 }}>{c.description}</div>
                </button>
              )
            })}
          </div>
        ) : (
          <div style={{
            textAlign: 'center', padding: '40px',
            background: '#fafafa', borderRadius: '12px',
            border: '2px dashed #e5e7eb'
          }}>
            <p style={{ fontSize: '14px', color: '#9ca3af' }}>
              No charities listed yet. Add one in Supabase under the <code>charities</code> table.
            </p>
          </div>
        )}
      </div>

      {/* Slider */}
      <div style={{
        background: '#fff', border: '1px solid #e5e7eb',
        borderRadius: '14px', padding: '24px', marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <label style={{
            fontSize: '12px', fontWeight: 600, color: '#9ca3af',
            letterSpacing: '0.06em', textTransform: 'uppercase'
          }}>
            Contribution
          </label>
          <span style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: '2rem', color: '#0f1a14', letterSpacing: '-0.02em'
          }}>
            {percentage}%
          </span>
        </div>

        <input
          type="range"
          min="10"
          max="100"
          step="1"
          value={percentage}
          onChange={e => setPercentage(Number(e.target.value))}
          style={{ width: '100%', marginBottom: '10px' }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#d1d5db', marginBottom: '12px' }}>
          <span>10% min</span>
          <span>100%</span>
        </div>

        <p style={{ fontSize: '13px', color: '#6b7280' }}>
          <strong style={{ color: '#0f1a14' }}>{percentage}%</strong> of your subscription will go to{' '}
          <strong style={{ color: '#15803d' }}>
            {selectedCharity?.name || 'your selected charity'}
          </strong>
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!selectedId || saving}
        style={{
          width: '100%', padding: '13px',
          background: !selectedId || saving ? '#e5e7eb' : '#0f1a14',
          color: !selectedId || saving ? '#9ca3af' : '#fff',
          border: 'none', borderRadius: '10px',
          fontSize: '14px', fontWeight: 600,
          cursor: !selectedId || saving ? 'not-allowed' : 'pointer',
          transition: 'background 0.15s'
        }}
      >
        {saving ? 'Saving...' : !selectedId ? 'Select a charity to continue' : 'Save preferences'}
      </button>
    </form>
  )
}