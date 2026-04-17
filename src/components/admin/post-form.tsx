'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface Category {
  id: string
  name: string
}

interface Tag {
  id: string
  name: string
}

interface PostFormProps {
  post?: {
    id: string
    title: string
    content: string
    excerpt: string
    coverImage: string
    categoryId: string
    status: string
    tags: string[]
  }
  categories: Category[]
  tags: Tag[]
}

export function PostForm({ post, categories, tags: allTags }: PostFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    coverImage: post?.coverImage || '',
    categoryId: post?.categoryId || '',
    status: post?.status || 'DRAFT',
    tags: post?.tags || [],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const slug = formData.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    try {
      const url = post ? `/api/posts/${post.id}` : '/api/posts'
      const method = post ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          slug,
          publishedAt: formData.status === 'PUBLISHED' ? new Date().toISOString() : null,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Erro ao salvar artigo')
        return
      }

      router.push('/admin/posts')
    } catch {
      setError('Erro ao salvar artigo')
    } finally {
      setLoading(false)
    }
  }

  const toggleTag = (tagId: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter(t => t !== tagId)
        : [...prev.tags, tagId]
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="excerpt">Resumo</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          rows={3}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="coverImage">Imagem de Capa (URL)</Label>
        <Input
          id="coverImage"
          type="url"
          value={formData.coverImage}
          onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
          className="mt-1"
        />
        {formData.coverImage && (
          <div className="mt-2 relative h-40 w-full max-w-md rounded-lg overflow-hidden">
            <img src={formData.coverImage} alt="Preview" className="object-cover w-full h-full" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="categoryId">Categoria</Label>
          <select
            id="categoryId"
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            className="w-full mt-1 px-3 py-2 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-800"
          >
            <option value="">Selecionar categoria</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full mt-1 px-3 py-2 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-800"
          >
            <option value="DRAFT">Rascunho</option>
            <option value="PUBLISHED">Publicar</option>
            {post && <option value="ARCHIVED">Arquivar</option>}
          </select>
        </div>
      </div>

      <div>
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {allTags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => toggleTag(tag.id)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                formData.tags.includes(tag.id)
                  ? 'bg-red-700 text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="content">Conteúdo</Label>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? 'Editar' : 'Preview'}
          </Button>
        </div>
        {showPreview ? (
          <div className="prose dark:prose-invert max-w-none p-4 border rounded-lg bg-stone-50 dark:bg-stone-900 min-h-[400px]">
            {formData.content.split('\n').map((p, i) => p ? <p key={i}>{p}</p> : <br key={i} />)}
          </div>
        ) : (
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={20}
            className="mt-1 font-mono text-sm"
          />
        )}
        <p className="text-xs text-stone-500 mt-1">Use Markdown para formatar o texto</p>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : post ? 'Salvar Alterações' : 'Criar Artigo'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/posts')}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}