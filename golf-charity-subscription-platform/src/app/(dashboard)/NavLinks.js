'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/scores',    label: 'Scores' },
  { href: '/charity',   label: 'Charity' },
  { href: '/subscribe', label: 'Subscribe' },
]

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {links.map(link => {
        const isActive = pathname === link.href
        return (
          <Link
            key={link.href}
            href={link.href}
            style={{
              padding: '6px 14px',
              borderRadius: '7px',
              fontSize: '13px',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? '#0f1a14' : '#6b7280',
              textDecoration: 'none',
              background: isActive ? '#f3f4f6' : 'transparent',
              transition: 'background 0.15s, color 0.15s',
            }}
          >
            {link.label}
          </Link>
        )
      })}
    </div>
  )
}