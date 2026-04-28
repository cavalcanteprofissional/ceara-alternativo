import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { ArticleGrid } from '@/components/blog/article-grid'
import { Sidebar } from '@/components/blog/sidebar'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 30

interface Props {
  params: Promise<{ q: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { q } = await params
  return {
    title: `Buscar: ${q}`,
    description: `Resultados da busca por "${q}" no Ceará Alternativo`,
  }
}

export default async function SearchPage({ params, searchParams }: Props) {
  const { q } = await params
  const { page } = await searchParams
  const pageNum = parseInt(page || '1', 10)
  const perPage = 12
  const skip = (pageNum - 1) * perPage

  if (!q || q.trim().length < 2) {
    notFound()
  }

  const searchTerm = q.trim().toLowerCase()

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: {
        status: 'PUBLISHED',
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { content: { contains: searchTerm, mode: 'insensitive' } },
          { excerpt: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
      include: {
        author: { select: { name: true, image: true } },
        category: { select: { name: true, slug: true } },
      },
      orderBy: { publishedAt: 'desc' },
      skip,
      take: perPage,
    }),
    prisma.post.count({
      where: {
        status: 'PUBLISHED',
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { content: { contains: searchTerm, mode: 'insensitive' } },
          { excerpt: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
    }),
  ])

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

  const totalPages = Math.ceil(total / perPage)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Resultados da busca
        </h1>
        <p className="text-lg text-stone-600 dark:text-stone-400">
          {total} resultado{total !== 1 ? 's' : ''} para &quot;{q}&quot;
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {formattedPosts.length > 0 ? (
            <>
              <ArticleGrid posts={formattedPosts} />
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {pageNum > 1 && (
                    <a
                      href={`/busca?q=${q}&page=${pageNum - 1}`}
                      className="px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800"
                    >
                      Anterior
                    </a>
                  )}
                  <span className="px-4 py-2 text-stone-500">
                    {pageNum} / {totalPages}
                  </span>
                  {pageNum < totalPages && (
                    <a
                      href={`/busca?q=${q}&page=${pageNum + 1}`}
                      className="px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800"
                    >
                      Próximo
                    </a>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-stone-500">
              Nenhum resultado encontrado para &quot;{q}&quot;.
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