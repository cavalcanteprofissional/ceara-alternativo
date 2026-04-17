import { Metadata } from 'next'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Admin - Dashboard',
}

export default async function AdminDashboard() {
  const session = await auth()

  if (!session || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
    redirect('/login')
  }

  const [postCount, publishedCount, draftCount, userCount] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { status: 'PUBLISHED' } }),
    prisma.post.count({ where: { status: 'DRAFT' } }),
    prisma.user.count(),
  ])

  const recentPosts = await prisma.post.findMany({
    take: 5,
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      status: true,
      updatedAt: true,
      author: { select: { name: true } },
    },
  })

  return (
    <div>
      <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-8">
        Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-stone-800 rounded-lg p-6 shadow-sm">
          <div className="text-3xl font-bold text-red-700 dark:text-red-500">{postCount}</div>
          <div className="text-stone-500 text-sm">Total de Artigos</div>
        </div>
        <div className="bg-white dark:bg-stone-800 rounded-lg p-6 shadow-sm">
          <div className="text-3xl font-bold text-green-600 dark:text-green-500">{publishedCount}</div>
          <div className="text-stone-500 text-sm">Publicados</div>
        </div>
        <div className="bg-white dark:bg-stone-800 rounded-lg p-6 shadow-sm">
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-500">{draftCount}</div>
          <div className="text-stone-500 text-sm">Rascunhos</div>
        </div>
        <div className="bg-white dark:bg-stone-800 rounded-lg p-6 shadow-sm">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-500">{userCount}</div>
          <div className="text-stone-500 text-sm">Usuários</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-stone-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Ações Rápidas</h2>
          <div className="space-y-2">
            <Link
              href="/admin/posts/new"
              className="block p-3 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors text-center"
            >
              + Novo Artigo
            </Link>
            <Link
              href="/admin/categories"
              className="block p-3 border border-stone-300 dark:border-stone-600 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors text-center"
            >
              Gerenciar Categorias
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-stone-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Artigos Recentes</h2>
          <div className="space-y-3">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="text-sm hover:text-red-700 dark:hover:text-red-500 line-clamp-1"
                  >
                    {post.title}
                  </Link>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      post.status === 'PUBLISHED'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}
                  >
                    {post.status === 'PUBLISHED' ? 'Publicado' : 'Rascunho'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-stone-500">Nenhum artigo ainda.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}