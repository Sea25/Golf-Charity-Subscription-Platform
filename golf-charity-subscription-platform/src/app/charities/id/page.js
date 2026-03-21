'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function CharityDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [charity, setCharity] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCharity()
  }, [params.id])

  async function fetchCharity() {
    try {
      const { data, error } = await supabase
        .from('charities')
        .select('*')
        .eq('id', params.id)
        .single()
      
      if (error) throw error
      
      if (data) {
        setCharity(data)
      } else {
        // Use sample data if not in DB
        const sample = sampleCharities.find(c => c.id === params.id)
        setCharity(sample)
      }
    } catch (error) {
      console.error('Error fetching charity:', error)
      const sample = sampleCharities.find(c => c.id === params.id)
      setCharity(sample)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
      </div>
    )
  }

  if (!charity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-500">Charity not found</p>
          <Link href="/charities" className="text-rose-500 mt-4 inline-block">Back to Charities</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-rose-500">IMPACT GOLF</Link>
            <div className="flex gap-4">
              <Link href="/login" className="text-gray-600 hover:text-rose-500">Sign In</Link>
              <Link href="/signup" className="bg-rose-500 text-white px-5 py-2 rounded-full hover:bg-rose-600">Subscribe</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Charity Header */}
      <div className="bg-gradient-to-r from-rose-500 to-amber-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-7xl mb-4">{charity.image}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{charity.name}</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">{charity.description}</p>
        </div>
      </div>

      {/* Charity Details */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            {charity.description} We are committed to making a lasting impact through the support of our golf community.
          </p>

          <h2 className="text-2xl font-bold mb-4">Impact So Far</h2>
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Total raised by our community</span>
              <span className="text-2xl font-bold text-rose-500">{charity.raised || '$0'}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-rose-500 h-3 rounded-full" style={{ width: '65%' }} />
            </div>
            <p className="text-sm text-gray-500 mt-2">65% of annual goal</p>
          </div>

          <h2 className="text-2xl font-bold mb-4">How You Can Help</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">📝</span>
              <div>
                <h3 className="font-bold">Subscribe to Impact Golf</h3>
                <p className="text-gray-600 text-sm">10% of your subscription goes directly to this charity</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">🏌️</span>
              <div>
                <h3 className="font-bold">Play and Contribute</h3>
                <p className="text-gray-600 text-sm">Every round you play helps us raise more funds</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link 
              href="/signup" 
              className="inline-block bg-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-rose-600"
            >
              Support This Charity
            </Link>
            <Link 
              href="/charities" 
              className="inline-block ml-4 text-gray-600 hover:text-rose-500"
            >
              ← Back to All Charities
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Sample data (same as above - you can import from a shared file later)
const sampleCharities = [
  {
    id: '1',
    name: 'Ocean Cleanup Initiative',
    description: 'Protecting our oceans for future generations. Removing plastic waste from our seas.',
    image: '🌊',
    category: 'environment',
    raised: '$23,450',
    is_featured: true
  },
  {
    id: '2',
    name: 'Youth Golf Foundation',
    description: 'Making golf accessible to underprivileged youth. Providing equipment and coaching.',
    image: '⛳',
    category: 'youth',
    raised: '$18,230',
    is_featured: false
  },
  {
    id: '3',
    name: 'Green Earth Initiative',
    description: 'Fighting climate change through reforestation and sustainable practices.',
    image: '🌳',
    category: 'environment',
    raised: '$31,120',
    is_featured: true
  },
  {
    id: '4',
    name: "Children's Health Fund",
    description: 'Providing healthcare access to children in underserved communities.',
    image: '🏥',
    category: 'health',
    raised: '$42,500',
    is_featured: false
  },
  {
    id: '5',
    name: 'Education for All',
    description: 'Building schools and providing educational resources to communities in need.',
    image: '📚',
    category: 'education',
    raised: '$27,890',
    is_featured: false
  },
  {
    id: '6',
    name: 'Mental Health Awareness',
    description: 'Supporting mental health resources and reducing stigma in sports communities.',
    image: '🧠',
    category: 'health',
    raised: '$15,670',
    is_featured: false
  }
]