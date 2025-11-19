'use client'

import { useState } from 'react'

interface LanguageSelectorProps {
  mobile?: boolean
}

export default function LanguageSelector({ mobile = false }: LanguageSelectorProps) {
  const [currentLang, setCurrentLang] = useState<'es' | 'en'>('es')

  const handleLanguageChange = (lang: 'es' | 'en') => {
    setCurrentLang(lang)
    console.log('Language changed to:', lang)
  }

  if (mobile) {
    return (
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => handleLanguageChange('es')}
          className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            currentLang === 'es'
              ? 'text-white shadow-sm'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
          style={currentLang === 'es' ? { backgroundColor: 'var(--brand-blue)' } : {}}
        >
          Español
        </button>
        <button
          onClick={() => handleLanguageChange('en')}
          className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            currentLang === 'en'
              ? 'text-white shadow-sm'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
          style={currentLang === 'en' ? { backgroundColor: 'var(--brand-blue)' } : {}}
        >
          English
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleLanguageChange('es')}
        className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
          currentLang === 'es'
            ? 'text-white shadow-sm'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
        style={currentLang === 'es' ? { backgroundColor: 'var(--brand-blue)' } : {}}
      >
        ES
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
          currentLang === 'en'
            ? 'text-white shadow-sm'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
        style={currentLang === 'en' ? { backgroundColor: 'var(--brand-blue)' } : {}}
      >
        EN
      </button>
    </div>
  )
}
