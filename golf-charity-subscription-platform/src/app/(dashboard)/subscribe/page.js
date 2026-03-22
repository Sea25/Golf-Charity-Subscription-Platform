import { createCheckoutSession } from './actions'

export default function SubscribePage({ searchParams }) {
  const isCanceled = searchParams?.canceled

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
            Checkout was canceled. We hope you'll subscribe when you're ready!
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Monthly */}
        <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <h3 className="text-2xl font-bold">Monthly Plan</h3>
          <p className="mt-4 text-5xl font-extrabold">
            $15<span className="text-xl text-gray-500">/mo</span>
          </p>

          <ul className="mt-6 space-y-4 mb-8">
            <li>✔️ Minimum 10% to charity</li>
            <li>✔️ Entry into monthly draws</li>
            <li>✔️ Track scores</li>
          </ul>

          <form action={createCheckoutSession}>
            <input type="hidden" name="plan_type" value="monthly" />
            <button className="w-full bg-rose-50 text-rose-600 py-3 rounded-xl font-bold">
              Subscribe Monthly
            </button>
          </form>
        </div>

        {/* Yearly */}
        <div className="p-8 bg-rose-50 border-2 border-rose-500 rounded-2xl shadow-md">
          <h3 className="text-2xl font-bold">Yearly Plan</h3>
          <p className="mt-4 text-5xl font-extrabold">
            $150<span className="text-xl text-gray-500">/yr</span>
          </p>

          <ul className="mt-6 space-y-4 mb-8">
            <li>✔️ Minimum 10% to charity</li>
            <li>✔️ Entry into monthly draws</li>
            <li>✔️ 2 Months Free</li>
          </ul>

          <form action={createCheckoutSession}>
            <input type="hidden" name="plan_type" value="yearly" />
            <button className="w-full bg-rose-600 text-white py-3 rounded-xl font-bold">
              Subscribe Yearly
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}