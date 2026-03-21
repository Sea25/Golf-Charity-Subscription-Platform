'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Trophy,
  Heart,
  LineChart,
  Target,
  Users,
  Medal,
  ChevronRight,
  ArrowRight,
  Sparkles
} from 'lucide-react'

// Fade-in variants for animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-200">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl z-50 border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-black tracking-tight text-emerald-800 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                <Target size={18} strokeWidth={3} />
              </span>
              IMPACT GOLF
            </Link>
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <Link href="/how-it-works" className="text-gray-500 hover:text-emerald-700 transition-colors">How It Works</Link>
              <Link href="/charities" className="text-gray-500 hover:text-emerald-700 transition-colors">Charities</Link>
              <Link href="/pricing" className="text-gray-500 hover:text-emerald-700 transition-colors">Pricing</Link>
            </div>
            <div className="flex gap-4 items-center">
              <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-emerald-700 transition-colors hidden sm:block">Sign In</Link>
              <Link href="/signup" className="bg-emerald-600 text-white px-5 py-2.5 rounded-full hover:bg-emerald-700 shadow-sm shadow-emerald-600/20 font-semibold text-sm transition-all hover:-translate-y-0.5">
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        {/* Soft geometric background elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-teal-100/40 via-emerald-50 to-transparent rounded-bl-[100px] -z-10" />
        <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-green-100/40 to-transparent rounded-tr-[100px] blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto text-center relative z-0">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center">
            <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100/50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
              <Sparkles size={14} /> Every Subscription Gives Back
            </motion.span>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight max-w-4xl mx-auto">
              Play Golf. <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Change Lives.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Subscribe monthly or yearly. Track your scores. Enter monthly draws. 
              <br className="hidden md:block" />
              <strong className="font-semibold text-emerald-700">10% of your subscription supports charities you choose.</strong>
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-emerald-700 shadow-[0_8px_30px_rgb(5,150,105,0.25)] transition-all hover:-translate-y-1">
                Subscribe Now <ChevronRight size={18} />
              </Link>
              <Link href="/charities" className="flex items-center justify-center gap-2 border border-gray-200 bg-white text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 transition-all">
                See Our Charities
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works - Elegant Grid */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">How It Works</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">Simple steps to start making an impact while enjoying your game.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting subtle line behind cards hidden on mobile */}
            <div className="hidden md:block absolute top-[4rem] left-10 right-10 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent -z-10" />
            
            {[
              { idx: '01', icon: <Heart className="w-8 h-8 text-emerald-600" />, title: 'Subscribe', desc: 'Choose a monthly or yearly plan. A minimum of 10% goes to the charity of your choice.' },
              { idx: '02', icon: <Target className="w-8 h-8 text-teal-600" />, title: 'Enter Your Scores', desc: 'Submit your latest 5 Stableford scores and easily track your overall improvement.' },
              { idx: '03', icon: <Trophy className="w-8 h-8 text-emerald-600" />, title: 'Monthly Draws', desc: 'Participate in monthly prize draws. Win cash prizes while supporting worthy causes.' }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.2 } } }}
                className="bg-white/60 backdrop-blur-sm border border-gray-100 rounded-[2rem] p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 relative group"
              >
                <div className="text-5xl font-black text-slate-50 absolute top-4 right-6 -z-10 group-hover:text-emerald-50 transition-colors pointer-events-none">{step.idx}</div>
                <div className="w-16 h-16 bg-white border border-gray-100 shadow-sm rounded-2xl flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prize Pool Distribution */}
      <section className="py-24 px-6 bg-slate-900 text-white rounded-[3rem] mx-4 md:mx-10 my-10 relative overflow-hidden">
        {/* Soft emerald glow in dark section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Monthly Prize Pool</h2>
          <p className="text-emerald-100/70 mb-16 max-w-2xl mx-auto text-lg font-light">Here's how your subscription directly contributes to the community prize pool.</p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { match: '5-Number Match', pct: '40%', desc: 'Jackpot • Rolls over if unclaimed', delay: 0 },
              { match: '4-Number Match', pct: '35%', desc: 'Major Prize • Split among winners', delay: 0.1 },
              { match: '3-Number Match', pct: '25%', desc: 'Minor Prize • Split among winners', delay: 0.2 },
            ].map((prize, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: prize.delay }}
                className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/10 transition-colors"
               >
                <p className="text-emerald-400 font-semibold mb-2">{prize.match}</p>
                <p className="text-5xl font-bold mb-3 tracking-tighter text-white">{prize.pct}</p>
                <div className="h-px w-12 bg-emerald-500/30 mx-auto my-4" />
                <p className="text-sm text-gray-400">{prize.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Charity Spotlight Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest">Your Impact</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 tracking-tight text-gray-900">Charities You Support</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">Every subscription creates waves of change. Here's one of our featured partners.</p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto bg-white rounded-[2.5rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
          >
            <div className="md:flex">
              <div className="md:w-5/12 bg-gradient-to-br from-emerald-500 to-teal-600 relative overflow-hidden flex flex-col justify-end p-10 min-h-[300px]">
                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-white/5 opacity-20" />
                <div className="absolute -bottom-10 -right-10 text-white/20">
                  <Heart size={200} strokeWidth={1} />
                </div>
                <div className="relative z-10">
                  <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                    Featured Partner
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-2 leading-tight">Ocean Cleanup<br/>Initiative</h3>
                </div>
              </div>
              
              <div className="md:w-7/12 p-8 md:p-14 flex flex-col justify-center bg-white relative">
                <p className="text-gray-600 text-lg mb-8 leading-relaxed font-light">
                  Protecting our oceans for future generations. Every subscription helps remove plastic from our seas and marine habitats, effectively combating climate change at its source.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-gray-100 mb-6">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Impact to Date</p>
                    <p className="text-2xl font-bold text-emerald-600">$23,450 raised</p>
                  </div>
                </div>
                <Link href="/charities" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 group transition-colors">
                  Learn more about this cause 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>

          <div className="text-center mt-12">
            <Link href="/charities" className="inline-flex items-center justify-center gap-2 text-gray-500 font-semibold hover:text-emerald-600 transition-colors">
              View All Partner Charities <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Subscribe Grid */}
      <section className="py-24 px-6 bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight text-gray-900">Why Join the Community?</h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 max-w-5xl mx-auto">
            {[
              { icon: <Medal className="w-6 h-6 text-emerald-600" />, title: 'Win Monthly Prizes', desc: 'Monthly draws with real cash prizes. Jackpot rolls over!' },
              { icon: <Heart className="w-6 h-6 text-emerald-600" />, title: 'Support Charities', desc: 'A minimum of 10% goes entirely to causes you believe in.' },
              { icon: <LineChart className="w-6 h-6 text-emerald-600" />, title: 'Track Your Progress', desc: 'Securely keep your last 5 Stableford scores on file.' },
              { icon: <Users className="w-6 h-6 text-emerald-600" />, title: 'Join a Movement', desc: '2,500+ golfers actively making a global impact.' },
            ].map((feature, i) => (
              <div key={i} className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100/50 flex items-center justify-center shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-gray-500 font-light leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[3rem] p-12 md:p-20 shadow-[0_20px_60px_rgb(5,150,105,0.2)]">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Start Making an Impact Today</h2>
          <p className="text-emerald-100 text-xl md:text-2xl mb-12 font-light max-w-2xl mx-auto">Subscribe now and turn your passion for golf into a genuine purpose.</p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link href="/signup" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-emerald-700 px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:bg-emerald-50 transition-all hover:-translate-y-1">
              Subscribe Now
            </Link>
          </div>
          <p className="text-sm mt-8 text-emerald-200/80 font-medium">Monthly or yearly plans • Cancel anytime • 30-day guarantee</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-gray-200/60 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-emerald-800 font-black tracking-tight">
            <Target size={16} strokeWidth={3} className="text-emerald-600" /> IMPACT GOLF
          </div>
          <p className="text-gray-400 text-sm font-light">© {new Date().getFullYear()} IMPACT GOLF. Every subscription gives back.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-emerald-600 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-emerald-600 transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}