'use server'
<<<<<<< HEAD
=======

>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
  const supabase = await createClient()
<<<<<<< HEAD
  const data = { email: formData.get('email'), password: formData.get('password') }
  const { error } = await supabase.auth.signInWithPassword(data)
  if (error) { redirect(`/login?message=${encodeURIComponent(error.message)}`) }
=======

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error('Login error:', error.message)
    redirect(`/login?message=${encodeURIComponent(error.message)}`)
  }

>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData) {
  const supabase = await createClient()
<<<<<<< HEAD
  const data = {
    email: formData.get('email'), password: formData.get('password'),
    options: { data: { full_name: formData.get('full_name') } }
  }
  const { error } = await supabase.auth.signUp(data)
  if (error) { redirect(`/signup?message=${encodeURIComponent(error.message)}`) }
  revalidatePath('/', 'layout')
=======

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
    options: {
      data: {
        full_name: formData.get('full_name'),
      }
    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.error('Signup error:', error.message)
    redirect(`/signup?message=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  // We can redirect to the login or dashboard directly. Supabase handles auto-login on signup if email confirmation is off.
>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c
  redirect('/dashboard')
}
