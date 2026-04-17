import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Admin - Artigos',
}

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: 'desc' },
    include: {
      author: { select: { name: true } },
      category: { select: { name: true } },
    },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
          Artigos
        </h1>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors"
        >
          + Novo Artigo
        </Link>
      </div>

      <div className="bg-white dark:bg-stone-800 rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-stone-50 dark:bg-stone-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Autor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Atualizado</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-stone-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 dark:divide-stone-700">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-stone-50 dark:hover:bg-stone-900">
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="font-medium text-stone-900 dark:text-stone-100 hover:text-red-700 dark:hover:text-red-500"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-stone-500">
                  {post.author.name || '—'}
                </td>
                <td className="px-6 py-4 text-sm text-stone-500">
                  {post.category?.name || '—'}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      post.status === 'PUBLISHED'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : post.status === 'DRAFT'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-stone-100 text-stone-700 dark:bg-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {post.status === 'PUBLISHED' ? 'Publicado' : post.status === 'DRAFT' ? 'Rascunho' : 'Arquivado'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-stone-500">
                  {post.updatedAt.toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="text-sm text-red-700 hover:text-red-800"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <div className="text-center py-12 text-stone-500">
            Nenhum artigo encontrado.
          </div>
        )}
      </div>
    </div>
  )
}