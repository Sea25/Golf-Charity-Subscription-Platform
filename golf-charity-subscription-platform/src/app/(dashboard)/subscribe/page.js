import { createCheckoutSession } from './actions'

<<<<<<< HEAD
export default function SubscribePage() {
=======
export default function SubscribePage({ searchParams }) {
  const isCanceled = searchParams?.canceled

>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-5xl mx-auto">
      <div className="text-center mb-12 mt-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Choose Your Impact Plan</h1>
<<<<<<< HEAD
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Unlock the platform and support your favorite charity.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:border-rose-500">
          <h3 className="text-2xl font-bold">Monthly Plan</h3>
          <p className="mt-4 text-5xl font-extrabold">$15<span className="text-xl text-gray-500">/mo</span></p>
          <ul className="mt-6 space-y-4 mb-8">
            <li>✔️ Minimum 10% to charity</li><li>✔️ Entry into monthly draws</li><li>✔️ Track scores</li>
          </ul>
          <form action={createCheckoutSession}><input type="hidden" name="plan_type" value="monthly" /><button className="w-full bg-rose-50 text-rose-600 hover:bg-rose-100 py-3 rounded-xl font-bold">Subscribe Monthly</button></form>
        </div>

        <div className="p-8 bg-rose-50 border-2 border-rose-500 rounded-2xl shadow-md relative">
          <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-3 bg-rose-500 text-white text-xs font-bold py-1 px-3 rounded-full">Save $30</span>
          <h3 className="text-2xl font-bold">Yearly Plan</h3>
          <p className="mt-4 text-5xl font-extrabold">$150<span className="text-xl text-gray-500">/yr</span></p>
          <ul className="mt-6 space-y-4 mb-8">
            <li>✔️ Minimum 10% to charity</li><li>✔️ Entry into monthly draws</li><li><span className="text-emerald-500">✔️</span> 2 Months Free</li>
          </ul>
          <form action={createCheckoutSession}><input type="hidden" name="plan_type" value="yearly" /><button className="w-full bg-rose-600 text-white hover:bg-rose-700 py-3 rounded-xl font-bold">Subscribe Yearly</button></form>
=======
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Unlock the platform, track your scores, enter the monthly draws, and support your favorite charity.
        </p>
        
        {isCanceled && (
          <div className="mt-4 p-4 rounded-md bg-amber-50 text-amber-600 border border-amber-200 text-sm max-w-md mx-auto">
            Checkout was canceled. We hope you'll subscribe when you're ready!
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12 mb-12">
        {/* Monthly Plan Component */}
        <div className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col hover:border-rose-500 transition-colors">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Monthly Plan</h3>
            <p className="mt-4 flex items-baseline text-5xl font-extrabold text-gray-900">
              $15
              <span className="ml-1 text-xl font-medium text-gray-500">/mo</span>
            </p>
            <p className="mt-4 text-gray-500">Billed monthly. Cancel anytime.</p>
          </div>
          
          <ul role="list" className="mt-6 space-y-4 mb-8 flex-1">
            <li className="flex text-gray-600"><span className="mr-3 text-rose-500">✔️</span> Minimum 10% to charity</li>
            <li className="flex text-gray-600"><span className="mr-3 text-rose-500">✔️</span> Entry into monthly prize draws</li>
            <li className="flex text-gray-600"><span className="mr-3 text-rose-500">✔️</span> Track unlimited scores</li>
          </ul>

          <form action={createCheckoutSession}>
            <input type="hidden" name="plan_type" value="monthly" />
            <button className="w-full bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 font-semibold py-3 px-4 rounded-xl transition-colors">
              Subscribe Monthly
            </button>
          </form>
        </div>

        {/* Yearly Plan Component */}
        <div className="relative p-8 bg-rose-50 border-2 border-rose-500 rounded-2xl shadow-md flex flex-col">
          <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-3">
            <span className="bg-rose-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-sm">
              Most Popular (Save $30)
            </span>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Yearly Plan</h3>
            <p className="mt-4 flex items-baseline text-5xl font-extrabold text-gray-900">
              $150
              <span className="ml-1 text-xl font-medium text-gray-500">/yr</span>
            </p>
            <p className="mt-4 text-gray-500">Billed annually. Best value for golfers.</p>
          </div>
          
          <ul role="list" className="mt-6 space-y-4 mb-8 flex-1">
            <li className="flex text-gray-900 font-medium"><span className="mr-3 text-rose-500">✔️</span> Minimum 10% to charity</li>
            <li className="flex text-gray-900 font-medium"><span className="mr-3 text-rose-500">✔️</span> Entry into monthly prize draws</li>
            <li className="flex text-gray-900 font-medium"><span className="mr-3 text-rose-500">✔️</span> Track unlimited scores</li>
            <li className="flex text-emerald-600 font-bold"><span className="mr-3 text-emerald-500">✔️</span> 2 Months Free</li>
          </ul>

          <form action={createCheckoutSession}>
            <input type="hidden" name="plan_type" value="yearly" />
            <button className="w-full bg-rose-600 text-white hover:bg-rose-700 font-semibold py-3 px-4 rounded-xl transition-colors shadow-sm">
              Subscribe Yearly
            </button>
          </form>
>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c
        </div>
      </div>
    </div>
  )
}
