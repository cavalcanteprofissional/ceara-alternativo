'use client'

import {useRouter} from 'next/navigation'

interface LanguageSwitcherProps {
  locale: string
}

export function LanguageSwitcher({locale}: LanguageSwitcherProps) {
  const router = useRouter()

  const switchLocale = () => {
    const newLocale = locale === 'pt-BR' ? 'en' : 'pt-BR'
    router.push(`/${newLocale}`)
  }

  return (
    <button
      onClick={switchLocale}
      className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 px-2 py-1"
      aria-label={locale === 'pt-BR' ? 'Switch to English' : 'Mudar para Português'}
    >
      {locale === 'pt-BR' ? 'EN' : 'PT'}
    </button>
  )
}