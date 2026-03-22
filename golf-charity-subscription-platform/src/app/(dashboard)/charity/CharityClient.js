'use client'

import { useState } from 'react'
import { updateCharityChoice } from './actions'

export default function CharityClient({ charities, profile }) {
  const [selectedId, setSelectedId] = useState(profile?.charity_id || '')
  const [percentage, setPercentage] = useState(profile?.charity_percentage || 10)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!selectedId) return

    setSaving(true)
    const formData = new FormData()
    formData.append('charity_id', selectedId)
    formData.append('charity_percentage', percentage)
    await updateCharityChoice(formData)
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Charity Cards */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Select a Charity</h2>
        {charities && charities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {charities.map((c) => {
              const isSelected = selectedId === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedId(c.id)}
                  className={`text-left p-5 rounded-xl border-2 transition-all shadow-sm hover:shadow-md ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-300'
                      : 'border-gray-200 bg-white hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">
                      {c.name.toLowerCase().includes('ocean') ? '🌊' :
                       c.name.toLowerCase().includes('golf') ? '⛳' :
                       c.name.toLowerCase().includes('green') || c.name.toLowerCase().includes('earth') ? '🌳' : '❤️'}
                    </span>
                    {isSelected && (
                      <span className="text-emerald-600 text-lg">✅</span>
                    )}
                  </div>
                  <p className="font-bold text-gray-800">{c.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{c.description}</p>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="p-6 bg-gray-50 rounded-xl border-2 border-dashed text-center text-gray-400">
            No charities available yet. Add one in Supabase under the <code>charities</code> table.
          </div>
        )}
      </div>

      {/* Percentage Slider */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-700">Your Contribution</h2>
          <span className="text-3xl font-black text-emerald-600">{percentage}%</span>
        </div>

        <input
          type="range"
          min="10"
          max="100"
          step="1"
          value={percentage}
          onChange={(e) => setPercentage(Number(e.target.value))}
          className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />

        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>10% (minimum)</span>
          <span>100%</span>
        </div>

        <p className="text-sm text-emerald-700 mt-3">
          <span className="font-semibold">{percentage}%</span> of your subscription will go to{' '}
          {selectedId
            ? <span className="font-semibold">{charities.find(c => c.id === selectedId)?.name || 'your selected charity'}</span>
            : <span className="text-gray-400">your selected charity</span>
          }
        </p>
      </div>

      {/* Save Button */}
      <button
        type="submit"
        disabled={!selectedId || saving}
        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg transition-colors shadow-sm"
      >
        {saving ? 'Saving...' : !selectedId ? 'Select a charity to continue' : 'Save My Impact Choice'}
      </button>

    </form>
  )
}