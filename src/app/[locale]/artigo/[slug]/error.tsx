'use client'

import { useEffect } from 'react'

export default function Error({
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Algo deu errado
        </h2>
        <p className="text-stone-600 dark:text-stone-400 mb-6">
          Ocorreu um erro ao carregar este artigo. Tente novamente.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-medium rounded-lg transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  )
}