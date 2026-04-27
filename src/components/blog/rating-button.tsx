'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Heart } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface RatingButtonProps {
  postId: string
  initialCount?: number
  initialUserRating?: boolean
}

export function RatingButton({ postId, initialCount = 0, initialUserRating = false }: RatingButtonProps) {
  const { data: session } = useSession()
  const [count, setCount] = useState(initialCount)
  const [hasRated, setHasRated] = useState(initialUserRating)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`/api/posts/${postId}/rating`)
      .then(res => res.json())
      .then(data => {
        if (data.count !== undefined) {
          setCount(data.count)
        }
      })
      .catch(() => {})
  }, [postId])

  const handleClick = async () => {
    if (!session) {
      toast.error('Faça login para avaliar o artigo')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/posts/${postId}/rating`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: hasRated ? 0 : 1 }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Erro ao avaliar')
        return
      }

      setHasRated(!hasRated)
      setCount(data.count)
      toast.success(hasRated ? 'Avaliação removida' : 'Artigo avaliado!')
    } catch {
      toast.error('Erro ao avaliar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-full transition-all',
        hasRated
          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-red-50 dark:hover:bg-red-900/20',
        loading && 'opacity-50'
      )}
    >
      <Heart className={cn('w-5 h-5', hasRated && 'fill-current')} />
      <span className="font-medium">{count}</span>
    </button>
  )
}