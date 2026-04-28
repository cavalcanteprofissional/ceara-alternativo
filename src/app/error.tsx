'use client'

import { useEffect } from 'react'
import { AlertTriangle, Home } from 'lucide-react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              Algo deu errado
            </h2>
            <p className="text-stone-600 dark:text-stone-400 mb-6">
              Ocorreu um erro inesperado. Por favor, tente novamente ou volte para a página inicial.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={reset}
                className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-medium rounded-lg transition-colors"
              >
                Tentar novamente
              </button>
              <Link
                href="/"
                className="px-6 py-3 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 font-medium rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Início
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}