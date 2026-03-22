<<<<<<< HEAD
import { updateSession } from './utils/supabase/middleware'

export async function middleware(request) {
  return await updateSession(request)
}
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
=======
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request) {
  // Update user's auth session
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c
}
