<<<<<<< HEAD
=======
'use client'

>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
<<<<<<< HEAD
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 p-4 px-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-rose-500">IMPACT GOLF</div>
        <div className="flex gap-4">
          <Link href="/login" className="text-gray-600 hover:text-rose-500 p-2">Sign In</Link>
          <Link href="/signup" className="bg-rose-500 text-white px-5 py-2 rounded-full hover:bg-rose-600">Subscribe</Link>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-rose-50 via-white to-amber-50 text-center">
        <span className="inline-block px-4 py-2 bg-rose-100 text-rose-600 rounded-full text-sm mb-6">Every Subscription Gives Back</span>
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">Play Golf. <span className="text-rose-500 block">Change Lives.</span></h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">Subscribe to enter monthly draws. <span className="font-semibold text-rose-500">At least 10% supports charities you choose.</span></p>
        <Link href="/signup" className="bg-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-rose-600 shadow-lg">Subscribe Now</Link>
      </section>
    </div>
  )
}
=======
      {/* Navigation - Only Sign In and Subscribe buttons */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-rose-500">IMPACT GOLF</div>
            <div className="flex gap-4">
              <Link href="/login" className="text-gray-600 hover:text-rose-500">Sign In</Link>
              <Link href="/signup" className="bg-rose-500 text-white px-5 py-2 rounded-full hover:bg-rose-600">Subscribe Now</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-rose-50 via-white to-amber-50">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-rose-100 text-rose-600 rounded-full text-sm mb-6">Every Subscription Gives Back</span>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Play Golf.
            <span className="text-rose-500 block">Change Lives.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Subscribe monthly or yearly. Track your scores. Enter monthly draws.
            <span className="font-semibold text-rose-500 block mt-2">10% of your subscription supports charities you choose.</span>
          </p>
          <Link href="/signup" className="bg-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-rose-600 inline-block shadow-lg">
            Subscribe Now
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">📝</div>
              <h3 className="text-xl font-bold mb-2">1. Subscribe</h3>
              <p className="text-gray-600">Choose monthly or yearly plan. 10% goes to charity of your choice.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">⛳</div>
              <h3 className="text-xl font-bold mb-2">2. Enter Your Scores</h3>
              <p className="text-gray-600">Submit your latest 5 Stableford scores (1-45 points).</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🏆</div>
              <h3 className="text-xl font-bold mb-2">3. Monthly Draws</h3>
              <p className="text-gray-600">Win cash prizes. Jackpot rolls over if no 5-number match winner.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Prize Pool */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Monthly Prize Pool</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <p className="text-lg font-bold text-rose-500">5-Number Match</p>
              <p className="text-3xl font-bold my-2">40%</p>
              <p className="text-sm text-gray-500">Jackpot • Rolls over</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <p className="text-lg font-bold text-rose-500">4-Number Match</p>
              <p className="text-3xl font-bold my-2">35%</p>
              <p className="text-sm text-gray-500">Major Prize</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <p className="text-lg font-bold text-rose-500">3-Number Match</p>
              <p className="text-3xl font-bold my-2">25%</p>
              <p className="text-sm text-gray-500">Minor Prize</p>
            </div>
          </div>
        </div>
      </section>

      {/* Charity Preview - Showcases charities but doesn't allow selection */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Charities You Support</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">When you subscribe, 10% of your fee goes to a charity you choose.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-5xl mb-3">🌊</div>
              <h3 className="font-bold">Ocean Cleanup</h3>
              <p className="text-sm text-gray-500">Protecting our oceans</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-5xl mb-3">⛳</div>
              <h3 className="font-bold">Youth Golf</h3>
              <p className="text-sm text-gray-500">Making golf accessible</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-5xl mb-3">🌳</div>
              <h3 className="font-bold">Green Earth</h3>
              <p className="text-sm text-gray-500">Fighting climate change</p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">Choose your charity after subscribing</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm">© 2026 IMPACT GOLF. Every subscription gives back.</p>
        </div>
      </footer>
    </div>
  )
}
>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c
