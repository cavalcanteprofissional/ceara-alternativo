'use client'

import { useTheme } from '@/components/theme-provider'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="w-9 h-9" />

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
      aria-label="Alternar tema"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  )
}