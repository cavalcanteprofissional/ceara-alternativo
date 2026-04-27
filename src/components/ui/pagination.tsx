import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null

  const getHref = (page: number) => `${baseUrl}?page=${page}`

  const pages = []
  const maxVisible = 5

  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages, start + maxVisible - 1)

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {currentPage > 1 ? (
        <Link
          href={getHref(currentPage - 1)}
          className="p-2 border rounded hover:bg-stone-100 dark:hover:bg-stone-800"
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>
      ) : (
        <span className="p-2 border rounded opacity-50 cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" />
        </span>
      )}

      {start > 1 && (
        <>
          <Link
            href={getHref(1)}
            className={`px-3 py-1 border rounded ${currentPage === 1 ? 'bg-red-700 text-white' : 'hover:bg-stone-100 dark:hover:bg-stone-800'}`}
          >
            1
          </Link>
          {start > 2 && <span className="px-2 text-stone-500">...</span>}
        </>
      )}

      {pages.map(page => (
        <Link
          key={page}
          href={getHref(page)}
          className={`px-3 py-1 border rounded ${page === currentPage ? 'bg-red-700 text-white' : 'hover:bg-stone-100 dark:hover:bg-stone-800'}`}
        >
          {page}
        </Link>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-2 text-stone-500">...</span>}
          <Link
            href={getHref(totalPages)}
            className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'bg-red-700 text-white' : 'hover:bg-stone-100 dark:hover:bg-stone-800'}`}
          >
            {totalPages}
          </Link>
        </>
      )}

      {currentPage < totalPages ? (
        <Link
          href={getHref(currentPage + 1)}
          className="p-2 border rounded hover:bg-stone-100 dark:hover:bg-stone-800"
        >
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span className="p-2 border rounded opacity-50 cursor-not-allowed">
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </div>
  )
}