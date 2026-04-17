'use client'

import { Badge } from '@/components/ui/badge'
import { Category } from '@prisma/client'

interface CategoryListProps {
  categories: (Category & { _count: { posts: number } })[]
}

export function CategoryList({ categories }: CategoryListProps) {
  const deleteCategory = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta categoria? Os artigos ficarão sem categoria.')) return
    
    const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
    if (res.ok) {
      window.location.reload()
    }
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12 text-stone-500">
        Nenhuma categoria encontrada.
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-stone-800 rounded-lg shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-stone-50 dark:bg-stone-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Slug</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Artigos</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-stone-500 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-200 dark:divide-stone-700">
          {categories.map((cat) => (
            <tr key={cat.id} className="hover:bg-stone-50 dark:hover:bg-stone-900">
              <td className="px-6 py-4">
                <Badge variant="secondary">{cat.name}</Badge>
              </td>
              <td className="px-6 py-4 text-sm text-stone-500">
                {cat.slug}
              </td>
              <td className="px-6 py-4 text-sm text-stone-500">
                {cat._count.posts}
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="text-sm text-red-700 hover:text-red-800"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}