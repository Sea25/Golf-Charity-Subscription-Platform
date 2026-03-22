import { createCheckoutSession } from './actions'

export default async function SubscribePage(props) {
  const searchParams = props.searchParams ? await props.searchParams : {}
  const isCanceled = searchParams?.canceled
  const isSuccess = searchParams?.success

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-5xl mx-auto">
      <div className="text-center mb-12 mt-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Choose Your Impact Plan
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Unlock the platform and support your favorite charity.
        </p>

        {isCanceled && (
          <div className="mt-4 p-4 rounded-md bg-amber-50 text-amber-600 border border-amber-200 text-sm max-w-md mx-auto">
            Checkout was canceled. We hope you&apos;ll subscribe when you&apos;re ready!
          </div>
        )}

        {isSuccess && (
          <div className="mt-4 p-4 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200 text-sm max-w-md mx-auto">
            🎉 Welcome to Impact Golf! Your subscription is now active.
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Monthly */}
        <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-2xl font-bold">Monthly Plan</h3>
          <p className="mt-4 text-5xl font-extrabold">
            $15<span className="text-xl text-gray-500 font-normal">/mo</span>
          </p>

          <ul className="mt-6 space-y-3 mb-8 text-gray-600">
            <li>✔️ Minimum 10% to charity</li>
            <li>✔️ Entry into monthly draws</li>
            <li>✔️ Track your scores</li>
          </ul>

          <form action={createCheckoutSession}>
            <input type="hidden" name="plan_type" value="monthly" />
            <button
              type="submit"
              className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 py-3 rounded-xl font-bold transition-colors"
            >
              Subscribe Monthly
            </button>
          </form>
        </div>

        {/* Yearly */}
        <div className="p-8 bg-rose-50 border-2 border-rose-500 rounded-2xl shadow-md hover:shadow-lg transition-shadow relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
            BEST VALUE
          </div>
          <h3 className="text-2xl font-bold">Yearly Plan</h3>
          <p className="mt-4 text-5xl font-extrabold">
            $150<span className="text-xl text-gray-500 font-normal">/yr</span>
          </p>
          <p className="text-sm text-rose-600 font-medium mt-1">Save $30 — 2 months free!</p>

          <ul className="mt-4 space-y-3 mb-8 text-gray-600">
            <li>✔️ Minimum 10% to charity</li>
            <li>✔️ Entry into monthly draws</li>
            <li>✔️ 2 Months Free</li>
          </ul>

          <form action={createCheckoutSession}>
            <input type="hidden" name="plan_type" value="yearly" />
            <button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-bold transition-colors"
            >
              Subscribe Yearly
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}