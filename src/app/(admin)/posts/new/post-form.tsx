'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Category {
  id: string
  name: string
  slug: string
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
  }
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState<Category[]>([])

  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    coverImage: post?.coverImage || '',
    categoryId: post?.categoryId || '',
    status: post?.status || 'DRAFT',
  })

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => setCategories([]))
  }, [])

  const generatedSlug = formData.title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const url = post ? `/api/posts/${post.id}` : '/api/posts'
      const method = post ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          slug: generatedSlug,
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Título</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-800 focus:ring-2 focus:ring-red-500"
          placeholder="Título do artigo"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Slug</label>
        <input
          type="text"
          value={generatedSlug}
          disabled
          className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg bg-stone-100 dark:bg-stone-900 text-stone-500"
        />
        <p className="text-xs text-stone-500 mt-1">Gerado automaticamente a partir do título</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Resumo</label>
        <textarea
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-800 focus:ring-2 focus:ring-red-500"
          placeholder="Breve resumo do artigo (para SEO e preview)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Imagem de Capa (URL)</label>
        <input
          type="url"
          value={formData.coverImage}
          onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
          className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-800 focus:ring-2 focus:ring-red-500"
          placeholder="https://exemplo.com/imagem.jpg"
        />
        {formData.coverImage && (
          <div className="mt-2 relative h-40 w-full max-w-md rounded-lg overflow-hidden">
            <img src={formData.coverImage} alt="Preview" className="object-cover w-full h-full" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Categoria</label>
          <select
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-800 focus:ring-2 focus:ring-red-500"
          >
            <option value="">Selecionar categoria</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-800 focus:ring-2 focus:ring-red-500"
          >
            <option value="DRAFT">Rascunho</option>
            <option value="PUBLISHED">Publicar</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Conteúdo</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
          rows={20}
          className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-800 focus:ring-2 focus:ring-red-500 font-mono text-sm"
          placeholder="Conteúdo do artigo em Markdown..."
        />
        <p className="text-xs text-stone-500 mt-1">Use Markdown para formatar o texto</p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? 'Salvando...' : post ? 'Atualizar' : 'Criar Artigo'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/posts')}
          className="px-6 py-3 border border-stone-300 dark:border-stone-600 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}