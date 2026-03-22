import { login } from '../actions'

<<<<<<< HEAD
export default async function LoginPage({ searchParams }) {
  const params = await searchParams
  const message = params?.message
=======
export default function LoginPage({ searchParams }) {
>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c
  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Welcome Back</h2>
      <form className="space-y-6" action={login}>
<<<<<<< HEAD
        {message && <div className="p-4 rounded-md bg-red-50 text-red-600 border border-red-200 text-sm">{message}</div>}
        <div><label className="block text-sm font-medium text-gray-700">Email address</label><input name="email" type="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" /></div>
        <div><label className="block text-sm font-medium text-gray-700">Password</label><input name="password" type="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" /></div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700">Sign in</button>
      </form>
      <div className="mt-6 text-center text-sm text-gray-600">Don't have an account? <a href="/signup" className="text-rose-600">Sign up</a></div>
=======
        {searchParams?.message && (
          <div className="p-4 rounded-md bg-red-50 text-red-600 border border-red-200 text-sm">
            {searchParams.message}
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors"
          >
            Sign in
          </button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <a href="/signup" className="font-medium text-rose-600 hover:text-rose-500">
          Sign up
        </a>
      </div>
>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c
    </>
  )
}
