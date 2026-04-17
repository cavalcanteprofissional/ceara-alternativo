import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ArticleGrid } from '@/components/blog/article-grid'
import { Sidebar } from '@/components/blog/sidebar'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await prisma.category.findUnique({
    where: { slug },
  })

  if (!category) {
    return { title: 'Categoria não encontrada' }
  }

  return {
    title: category.name,
    description: category.description || `Artigos sobre ${category.name}`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params

  const category = await prisma.category.findUnique({
    where: { slug },
  })

  if (!category) {
    notFound()
  }

  const posts = await prisma.post.findMany({
    where: {
      status: 'PUBLISHED',
      categoryId: category.id,
    },
    include: {
      author: { select: { name: true, image: true } },
      category: { select: { name: true, slug: true } },
    },
    orderBy: { publishedAt: 'desc' },
  })

  const formattedPosts = posts.map((post) => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt || undefined,
    coverImage: post.coverImage || undefined,
    category: post.category?.name || 'Sem categoria',
    publishedAt: post.publishedAt?.toISOString() || new Date().toISOString(),
    readingTime: post.readingTime || 5,
    author: { name: post.author.name || 'Anonymous', image: post.author.image },
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          {category.name}
        </h1>
        {category.description && (
          <p className="text-lg text-stone-600 dark:text-stone-400">
            {category.description}
          </p>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {formattedPosts.length > 0 ? (
            <ArticleGrid posts={formattedPosts} />
          ) : (
            <div className="text-center py-12 text-stone-500">
              Nenhum artigo encontrado nesta categoria.
            </div>
          )}
        </div>
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}