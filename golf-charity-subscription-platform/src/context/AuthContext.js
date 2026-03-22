'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

// Create a context (like a shared storage)
const AuthContext = createContext({})

// This function will be used by other components to access auth
export function useAuth() {
  return useContext(AuthContext)
}

// This component wraps our entire app and provides auth info
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)  // Stores logged-in user
  const [loading, setLoading] = useState(true)  // Tracks if we're checking auth

  useEffect(() => {
    // Check if user is already logged in
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
      setLoading(false)
    }
    
    getInitialSession()

    // Listen for auth changes (login, logout, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null)
        setLoading(false)
      }
    )

    // Cleanup subscription when component unmounts
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Value that will be available to all child components
  const value = {
    user,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}