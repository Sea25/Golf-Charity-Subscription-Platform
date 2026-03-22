import './globals.css'

export const metadata = {
  title: 'Golf Charity Platform',
  description: 'Support charity while playing golf and winning prizes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}