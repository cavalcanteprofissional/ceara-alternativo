'use client'

import Link from 'next/link'
import {useSession, signOut} from 'next-auth/react'
import {ThemeToggle} from './theme-toggle'
import {LanguageSwitcher} from './language-switcher'
import {useState} from 'react'
import {useRouter} from 'next/navigation'

interface HeaderProps {
  locale: string
}

export function Header({locale}: HeaderProps) {
  const {data: session} = useSession()
  const router = useRouter()
  const [searchOpen, setSearchOpen]=useState(false)
  const [searchQuery, setSearchQuery]=useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim().length >= 2) {
      router.push(`/${locale}/busca?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <header className="border-b border-stone-200 dark:border-stone-800 sticky top-0 bg-white/80 dark:bg-stone-950/80 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href={`/${locale}`} className="text-2xl font-bold text-red-700 dark:text-red-500">
              Ceará Alternativo
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href={`/${locale}`} className="text-sm font-medium hover:text-red-700 dark:hover:text-red-500">
                Início
              </Link>
              <Link href={`/${locale}/categoria/politica`} className="text-sm font-medium hover:text-red-700 dark:hover:text-red-500">
                Política
              </Link>
              <Link href={`/${locale}/categoria/cultura`} className="text-sm font-medium hover:text-red-700 dark:hover:text-red-500">
                Cultura
              </Link>
              <Link href={`/${locale}/categoria/esportes`} className="text-sm font-medium hover:text-red-700 dark:hover:text-red-500">
                Esportes
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-stone-500 hover:text-red-700 dark:hover:text-red-500 transition-colors"
              aria-label="Buscar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            <ThemeToggle />
            <LanguageSwitcher locale={locale} />
            {session ? (
              <div className="flex items-center gap-4">
                <Link href={`/${locale}/admin`} className="text-sm font-medium hover:text-red-700 dark:hover:text-red-500">
                  Admin
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-red-700 dark:hover:text-red-500"
                >
                  Sair
                </button>
              </div>
            ) : (
              <Link
                href={`/${locale}/login`}
                className="text-sm font-medium px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {searchOpen && (
          <div className="pb-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar artigos..."
                className="flex-1 px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-800 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors"
              >
                Buscar
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                Cancelar
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  )
}