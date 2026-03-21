import { AuthProvider } from '@/context/AuthContext'
import './globals.css'

export const metadata = {
  title: 'Golf Charity Platform',
  description: 'Support charity while playing golf and winning prizes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}