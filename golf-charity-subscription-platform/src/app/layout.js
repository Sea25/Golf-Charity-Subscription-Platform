import './globals.css'

export const metadata = {
  title: 'Impact Golf',
  description: 'Subscribe to Golf. Give to Charity.',
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
