'use client'

import { useEffect } from 'react'

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
          <div className="text-center">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              Algo deu errado
            </h2>
            <p className="text-stone-600 dark:text-stone-400 mb-6">
              Ocorreu um erro crítico. Tente novamente.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-medium rounded-lg transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}