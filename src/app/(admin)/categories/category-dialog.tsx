'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function CategoryDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
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

    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), slug, description: description.trim() || null }),
    })

    if (res.ok) {
      setOpen(false)
      setName('')
      setDescription('')
      window.location.reload()
    }
    setLoading(false)
  }

  return (
    <>
      <Button variant="default" onClick={() => setOpen(true)}>+ Nova Categoria</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Categoria</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="cat-name">Nome</Label>
              <Input
                id="cat-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome da categoria"
                required
              />
            </div>
            <div>
              <Label htmlFor="cat-desc">Descrição</Label>
              <Textarea
                id="cat-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição opcional"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Criando...' : 'Criar Categoria'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}