'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationProps {
  mobile?: boolean
  onNavigate?: () => void
}

const navItems = [
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/productos', label: 'Productos' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/sostenibilidad', label: 'Sostenibilidad' },
  { href: '/trabaja-con-nosotros', label: 'Trabaja con Nosotros' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Navigation({ mobile = false, onNavigate }: NavigationProps) {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  if (mobile) {
    return (
      <nav className="flex flex-col space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`px-4 py-3 rounded-lg text-base font-medium transition-all ${
              isActive(item.href)
                ? 'text-white shadow-sm'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            style={isActive(item.href) ? { backgroundColor: 'var(--brand-blue)' } : {}}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    )
  }

  return (
    <nav className="flex items-center justify-center gap-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`relative px-5 py-2.5 text-[15px] font-medium transition-all duration-200 rounded-lg ${
            isActive(item.href)
              ? 'text-white'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
          style={isActive(item.href) ? { backgroundColor: 'var(--brand-blue)' } : {}}
          onMouseEnter={(e) => {
            if (!isActive(item.href)) {
              e.currentTarget.style.color = 'var(--brand-blue)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive(item.href)) {
              e.currentTarget.style.color = '';
            }
          }}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
