import { Hero } from '@/components/blog/hero'
import { ArticleGrid } from '@/components/blog/article-grid'
import { Sidebar } from '@/components/blog/sidebar'
import { prisma } from '@/lib/prisma'
import { defaultLocale } from '@/lib/i18n'

export const revalidate = 60

async function getRecentPosts() {
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    take: 6,
    include: {
      author: { select: { name: true } },
      category: { select: { name: true } },
    },
  })

  return posts.map((post) => ({
    id: post.slug,
    title: post.title,
    excerpt: post.excerpt || undefined,
    coverImage: post.coverImage || undefined,
    category: post.category?.name || 'Geral',
    publishedAt: post.publishedAt?.toISOString() || new Date().toISOString(),
    readingTime: post.readingTime || 5,
    author: { name: post.author.name || 'Equipe Ceará Alternativo' },
  }))
}

export default async function HomePage() {
  const recentPosts = await getRecentPosts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Hero />
          <section>
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-stone-200 dark:border-stone-700">
              Ultimas Noticias
            </h2>
            <ArticleGrid posts={recentPosts.length > 0 ? recentPosts : []} />
          </section>
        </div>
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}