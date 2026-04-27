'use client'

import { useEffect, useState } from 'react'

export function ViewCounter({ 
  postId, 
  initialCount = 0 
}: { 
  postId: string
  initialCount?: number
}) {
  const [hasTracked, setHasTracked] = useState(false)
  const [count, setCount] = useState(initialCount)

  useEffect(() => {
    if (hasTracked) return

    const storageKey = `viewed_${postId}`
    const alreadyViewed = sessionStorage.getItem(storageKey)

    if (alreadyViewed) return

    setHasTracked(true)
    sessionStorage.setItem(storageKey, 'true')

    fetch(`/api/posts/${postId}/views`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.viewCount !== undefined) {
          setCount(data.viewCount)
        }
      })
      .catch(() => {})
  }, [postId, hasTracked])

  return null
}