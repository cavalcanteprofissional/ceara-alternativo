'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Erro ao inscreve-se')
        return
      }

      toast.success(data.message)
      setEmail('')
    } catch {
      toast.error('Erro ao inscreve-se')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-red-700 dark:bg-red-900 rounded-xl p-8 text-white">
      <h3 className="text-2xl font-bold mb-2">Newsletter</h3>
      <p className="text-red-100 mb-4">
        Receba as principais notícias do Ceará direto no seu email.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-red-200"
        />
        <Button type="submit" disabled={loading} variant="secondary">
          {loading ? '...' : 'Inscrever'}
        </Button>
      </form>
    </div>
  )
}