import Link from 'next/link'
import { Metadata } from 'next'
import { FileQuestion, Home, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Página não encontrada',
  description: 'A página que você procura não existe',
}

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <FileQuestion className="w-20 h-20 text-stone-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          404
        </h1>
        <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-4">
          Página não encontrada
        </h2>
        <p className="text-stone-600 dark:text-stone-400 mb-8">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-medium rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Voltar ao início
          </Link>
          <Link
            href="/busca"
            className="px-6 py-3 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 font-medium rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Buscar
          </Link>
        </div>
      </div>
    </div>
  )
}