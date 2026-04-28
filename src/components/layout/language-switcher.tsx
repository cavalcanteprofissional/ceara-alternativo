'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales } from '@/lib/i18n'

export function LanguageSwitcher() {
  const pathname = usePathname()
  
  const getAlternativeLocale = () => {
    if (pathname.startsWith('/en')) {
      return pathname.replace('/en', '/pt-BR')
    }
    if (pathname.startsWith('/pt-BR')) {
      return pathname.replace('/pt-BR', '/en')
    }
    // Default pages - add locale prefix
    return `/en${pathname}`
  }

  const isEnglish = pathname.startsWith('/en')

  return (
    <Link
      href={getAlternativeLocale()}
      className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 px-2 py-1"
    >
      {isEnglish ? 'PT' : 'EN'}
    </Link>
  )
}