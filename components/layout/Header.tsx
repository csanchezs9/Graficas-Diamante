'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Productos', href: '/productos' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Sostenibilidad', href: '/sostenibilidad' },
    { label: 'Contacto', href: '/contacto' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gradient-to-b from-blue-50/80 to-white/98 backdrop-blur-sm shadow-md'
          : 'bg-gradient-to-b from-blue-50/50 to-white border-b border-blue-100'
      }`}
    >
      <div className="w-full px-4 md:px-16">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logos/logo-principal.webp"
              alt="Gráficas Diamante"
              width={200}
              height={70}
              className="h-12 md:h-16 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center justify-center flex-1 gap-8 px-8" style={{ fontFamily: 'var(--font-outfit)' }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-base font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-[#0046FF]'
                    : 'text-gray-700 hover:text-[#0046FF]'
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span
                    className="absolute -bottom-[21px] left-0 right-0 h-0.5"
                    style={{ backgroundColor: 'var(--brand-blue)' }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Language Selector */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              className="flex items-center gap-2 text-base font-medium text-gray-700 hover:text-[#0046FF] transition-colors"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              {language === 'es' ? 'ES' : 'EN'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2 bg-[#0046FF]' : 'bg-gray-800'
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-gray-800 rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full rounded-full transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2 bg-[#0046FF]' : 'bg-gray-800'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <nav className="px-4 py-6 space-y-2" style={{ fontFamily: 'var(--font-outfit)' }}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                    isActive(item.href)
                      ? 'text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  style={isActive(item.href) ? { backgroundColor: 'var(--brand-blue)', fontFamily: 'var(--font-outfit)' } : { fontFamily: 'var(--font-outfit)' }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
