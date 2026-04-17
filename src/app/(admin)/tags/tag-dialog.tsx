'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function TagDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const res = await fetch('/api/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), slug }),
    })

    if (res.ok) {
      setOpen(false)
      setName('')
      window.location.reload()
    }
    setLoading(false)
  }

  return (
    <>
      <Button variant="default" onClick={() => setOpen(true)}>+ Nova Tag</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Tag</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="tag-name">Nome</Label>
              <Input
                id="tag-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome da tag"
                required
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Criando...' : 'Criar Tag'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}