'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface Comment {
  id: string
  content: string
  approved: boolean
  createdAt: string
  author: {
    id: string
    name: string | null
    email: string
    image: string | null
  }
  post: {
    id: string
    title: string
    slug: string
  }
}

export default function AdminCommentsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'pending' | 'approved' | 'all'>('pending')

  const fetchComments = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filter === 'pending') params.set('approved', 'false')
      if (filter === 'approved') params.set('approved', 'true')

      const res = await fetch(`/api/admin/comments?${params}`)
      const data = await res.json()
      setComments(Array.isArray(data) ? data : [])
    } catch {
      toast.error('Erro ao carregar comentários')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (status === 'loading') return
    if (!session || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      router.push('/login')
    }
  }, [session, status, router])

  useEffect(() => {
    fetchComments()
  }, [filter])

  const handleApprove = async (id: string, approved: boolean) => {
    try {
      const res = await fetch('/api/admin/comments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, approved }),
      })

      if (!res.ok) {
        toast.error('Erro ao atualizar comentário')
        return
      }

      toast.success(approved ? 'Comentário aprovado' : 'Comentário rejeitado')
      fetchComments()
    } catch {
      toast.error('Erro ao atualizar comentário')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este comentário?')) return

    try {
      const res = await fetch(`/api/admin/comments?id=${id}`, { method: 'DELETE' })

      if (!res.ok) {
        toast.error('Erro ao deletar comentário')
        return
      }

      toast.success('Comentário deletado')
      fetchComments()
    } catch {
      toast.error('Erro ao deletar comentário')
    }
  }

  if (status === 'loading' || !session) {
    return <div className="p-8">Carregando...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-8">
        Moderação de Comentários
      </h1>

      <div className="flex gap-2 mb-6">
        <Button
          variant={filter === 'pending' ? 'default' : 'outline'}
          onClick={() => setFilter('pending')}
        >
          Pendentes
        </Button>
        <Button
          variant={filter === 'approved' ? 'default' : 'outline'}
          onClick={() => setFilter('approved')}
        >
          Aprovados
        </Button>
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          Todos
        </Button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-stone-200 dark:bg-stone-800 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-12 text-stone-500">
          Nenhum comentário encontrado
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map(comment => (
            <div
              key={comment.id}
              className="bg-white dark:bg-stone-900 rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {comment.author.image ? (
                    <Image
                      src={comment.author.image}
                      alt={comment.author.name || ''}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center">
                      <span className="text-lg font-medium text-stone-500">
                        {comment.author.name?.charAt(0) || '?'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-stone-900 dark:text-stone-100">
                      {comment.author.name || 'Anônimo'}
                    </span>
                    <span className="text-sm text-stone-500">
                      {comment.author.email}
                    </span>
                    <span className={`px-2 py-0.5 text-xs rounded ${
                      comment.approved
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {comment.approved ? 'Aprovado' : 'Pendente'}
                    </span>
                  </div>
                  <a
                    href={`/artigo/${comment.post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-red-700 hover:underline mb-2 block"
                  >
                    {comment.post.title}
                  </a>
                  <p className="text-stone-700 dark:text-stone-300">
                    {comment.content}
                  </p>
                  <p className="text-xs text-stone-500 mt-2">
                    {new Date(comment.createdAt).toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {comment.approved ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleApprove(comment.id, false)}
                    >
                      Rejeitar
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleApprove(comment.id, true)}
                    >
                      Aprovar
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(comment.id)}
                  >
                    Deletar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}