import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import Link from 'next/link'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth()

  if (!session || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      <header className="bg-white dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="text-xl font-bold text-red-700 dark:text-red-500">
                Admin
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/admin" className="text-sm font-medium hover:text-red-700 dark:hover:text-red-500">
                  Dashboard
                </Link>
                <Link href="/admin/posts" className="text-sm font-medium hover:text-red-700 dark:hover:text-red-500">
                  Artigos
                </Link>
                <Link href="/admin/categories" className="text-sm font-medium hover:text-red-700 dark:hover:text-red-500">
                  Categorias
                </Link>
                <Link href="/admin/users" className="text-sm font-medium hover:text-red-700 dark:hover:text-red-500">
                  Usuários
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm font-medium hover:text-red-700 dark:hover:text-red-500">
                Ver site
              </Link>
              <span className="text-sm text-stone-500">
                {session.user.name || session.user.email}
              </span>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}