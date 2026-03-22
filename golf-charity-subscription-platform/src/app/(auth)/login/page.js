import { login } from '../actions'

export default async function LoginPage({ searchParams }) {
  const params = await searchParams
  const message = params?.message
  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Welcome Back</h2>
      <form className="space-y-6" action={login}>
        {message && <div className="p-4 rounded-md bg-red-50 text-red-600 border border-red-200 text-sm">{message}</div>}
        <div><label className="block text-sm font-medium text-gray-700">Email address</label><input name="email" type="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" /></div>
        <div><label className="block text-sm font-medium text-gray-700">Password</label><input name="password" type="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" /></div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700">Sign in</button>
      </form>
      <div className="mt-6 text-center text-sm text-gray-600">Don't have an account? <a href="/signup" className="text-rose-600">Sign up</a></div>
    </>
  )
}
