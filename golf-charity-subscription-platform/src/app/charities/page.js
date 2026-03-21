'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function CharitiesPage() {
  const [charities, setCharities] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Fetch charities from database
  useEffect(() => {
    fetchCharities()
  }, [])

  async function fetchCharities() {
    try {
      const { data, error } = await supabase
        .from('charities')
        .select('*')
        .order('name')
      
      if (error) throw error
      
      // If no charities in DB, use sample data
      if (data.length === 0) {
        setCharities(sampleCharities)
      } else {
        setCharities(data)
      }
    } catch (error) {
      console.error('Error fetching charities:', error)
      // Use sample data if DB fetch fails
      setCharities(sampleCharities)
    } finally {
      setLoading(false)
    }
  }

  // Filter charities based on search and category
  const filteredCharities = charities.filter(charity => {
    const matchesSearch = charity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          charity.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || charity.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-rose-500">IMPACT GOLF</Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/how-it-works" className="text-gray-600 hover:text-rose-500">How It Works</Link>
              <Link href="/charities" className="text-rose-500 font-semibold">Charities</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-rose-500">Pricing</Link>
            </div>
            <div className="flex gap-4">
              <Link href="/login" className="text-gray-600 hover:text-rose-500">Sign In</Link>
              <Link href="/signup" className="bg-rose-500 text-white px-5 py-2 rounded-full hover:bg-rose-600">Subscribe</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-gradient-to-r from-rose-500 to-amber-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Charities We Support</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Your subscription helps make a difference. Choose a charity you care about.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search charities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <span className="absolute left-3 top-3 text-gray-400">🔍</span>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              {['all', 'environment', 'youth', 'health', 'education'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full capitalize transition ${
                    selectedCategory === cat 
                      ? 'bg-rose-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Charities Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
              <p className="mt-2 text-gray-500">Loading charities...</p>
            </div>
          ) : filteredCharities.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No charities found</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCharities.map((charity) => (
                <div key={charity.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
                  <div className="h-48 bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center">
                    <span className="text-6xl">{charity.image || '🤝'}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{charity.name}</h3>
                      {charity.is_featured && (
                        <span className="px-2 py-1 bg-rose-100 text-rose-600 text-xs rounded-full">Featured</span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{charity.description}</p>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Community raised</span>
                        <span className="font-semibold text-rose-500">{charity.raised || '$0'}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-rose-500 h-2 rounded-full" style={{ width: '65%' }} />
                      </div>
                    </div>
                    <Link 
                      href={`/charities/${charity.id}`}
                      className="block text-center bg-gray-100 hover:bg-rose-500 hover:text-white text-gray-700 font-semibold py-2 rounded-lg transition"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-rose-500 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg mb-6">Subscribe today and choose the charity you want to support.</p>
          <Link href="/signup" className="inline-block bg-white text-rose-500 px-8 py-3 rounded-full font-semibold hover:shadow-lg">
            Subscribe Now
          </Link>
        </div>
      </section>
    </div>
  )
}

// Sample charity data (will be used until you add real data to database)
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
    name: 'Children\'s Health Fund',
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