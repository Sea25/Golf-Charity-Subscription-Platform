import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Dashboard Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            
            <div className="flex items-center">
              <Link href="/dashboard" className="text-xl font-bold text-rose-500">
                IMPACT GOLF
              </Link>

              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 font-medium">
                  Overview
                </Link>
                <Link href="/scores" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 font-medium">
                  My Scores
                </Link>
                <Link href="/charity" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 font-medium">
                  My Charity
                </Link>
              </div>
            </div>

            <div className="flex items-center">
              <form action="/auth/signout" method="POST">
                <button type="submit" className="text-sm text-gray-500 hover:text-gray-700">
                  Sign Out
                </button>
              </form>
            </div>

          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}