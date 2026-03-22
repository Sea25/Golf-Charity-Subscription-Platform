<<<<<<< HEAD
import './globals.css'

export const metadata = {
  title: 'Impact Golf',
  description: 'Subscribe to Golf. Give to Charity.',
=======
import { AuthProvider } from '@/context/AuthContext'
import './globals.css'

export const metadata = {
  title: 'Golf Charity Platform',
  description: 'Support charity while playing golf and winning prizes',
>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
<<<<<<< HEAD
      <body className="antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}
=======
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
>>>>>>> 439dc91c3d863ceacfe4d48f68c76629aefb2f4c
