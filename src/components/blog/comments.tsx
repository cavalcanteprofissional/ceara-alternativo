'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface Comment {
  id: string
  content: string
  createdAt: string
  author: {
    id: string
    name: string | null
    image: string | null
  }
}

interface CommentsProps {
  postId: string
}

export function Comments({ postId }: CommentsProps) {
  const { data: session } = useSession()
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch(`/api/posts/${postId}/comments`)
      .then(res => res.json())
      .then(data => {
        setComments(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [postId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setSubmitting(true)
    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Erro ao enviar comentário')
        return
      }

      toast.success(data.message)
      setContent('')
    } catch {
      toast.error('Erro ao enviar comentário')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-px bg-stone-200 dark:bg-stone-700" />
        <div className="animate-pulse space-y-4">
          <div className="h-20 bg-stone-200 dark:bg-stone-800 rounded" />
          <div className="h-20 bg-stone-200 dark:bg-stone-800 rounded" />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="h-px bg-stone-200 dark:bg-stone-700 mb-8" />
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">
        Comentários ({comments.length})
      </h2>

      {session ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Deixe seu comentário..."
            rows={4}
            className="mb-3"
          />
          <Button type="submit" disabled={submitting || !content.trim()}>
            {submitting ? 'Enviando...' : 'Enviar Comentário'}
          </Button>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-stone-100 dark:bg-stone-800 rounded-lg text-center">
          <p className="text-stone-600 dark:text-stone-300">
            <a href="/login" className="text-red-700 hover:underline">Faça login</a> para deixar um comentário
          </p>
        </div>
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
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
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-stone-900 dark:text-stone-100">
                  {comment.author.name || 'Anônimo'}
                </span>
                <span className="text-sm text-stone-500">
                  {new Date(comment.createdAt).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <p className="text-stone-700 dark:text-stone-300 whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <p className="text-center text-stone-500 py-8">
            Nenhum comentário ainda. Seja o primeiro!
          </p>
        )}
      </div>
    </div>
  )
}