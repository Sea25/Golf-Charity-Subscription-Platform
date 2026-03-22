<<<<<<< HEAD
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({ request })

=======
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // To secure Server Components we must use server-side cookies
>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
<<<<<<< HEAD
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
=======
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c
        },
      },
    }
  )

<<<<<<< HEAD
  const { data: { user } } = await supabase.auth.getUser()
  const url = request.nextUrl.clone()

  if (url.pathname.startsWith('/admin') && !user) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
=======
  // This will refresh the session if needed
  const { data: { user } } = await supabase.auth.getUser()

  const url = request.nextUrl.clone()

  // Protect Admin routes
  if (url.pathname.startsWith('/admin')) {
    if (!user) {
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
    // We would ideally fetch the profile to check for role = 'admin', 
    // but for simple routing protection, we just ensure they are logged in at minimum.
  }

  // Protect Dashboard routes
>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c
  if (url.pathname.startsWith('/dashboard') && !user) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
<<<<<<< HEAD
=======

  // Prevent logged in users from visiting auth pages
>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c
  if (user && (url.pathname.startsWith('/login') || url.pathname.startsWith('/signup'))) {
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
