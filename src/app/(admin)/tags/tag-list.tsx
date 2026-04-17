'use client'

import { Badge } from '@/components/ui/badge'
import { Tag } from '@prisma/client'

interface TagListProps {
  tags: (Tag & { _count: { posts: number } })[]
}

export function TagList({ tags }: TagListProps) {
  const deleteTag = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta tag?')) return
    
    const res = await fetch(`/api/tags/${id}`, { method: 'DELETE' })
    if (res.ok) {
      window.location.reload()
    }
  }

  if (tags.length === 0) {
    return (
      <div className="text-center py-12 text-stone-500">
        Nenhuma tag encontrada.
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
          {tags.map((tag) => (
            <tr key={tag.id} className="hover:bg-stone-50 dark:hover:bg-stone-900">
              <td className="px-6 py-4">
                <Badge variant="secondary">{tag.name}</Badge>
              </td>
              <td className="px-6 py-4 text-sm text-stone-500">
                {tag.slug}
              </td>
              <td className="px-6 py-4 text-sm text-stone-500">
                {tag._count.posts}
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => deleteTag(tag.id)}
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