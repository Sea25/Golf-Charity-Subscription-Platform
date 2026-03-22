import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
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
