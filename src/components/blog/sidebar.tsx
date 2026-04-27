import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Newsletter } from './newsletter'

async function getCategories() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { posts: true } } },
    orderBy: { name: 'asc' },
  })
  return categories
}

async function getPopularPosts() {
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { viewCount: 'desc' },
    take: 4,
    select: { id: true, title: true, slug: true, viewCount: true },
  })
  return posts
}

export async function Sidebar() {
  const [categories, popularPosts] = await Promise.all([
    getCategories(),
    getPopularPosts(),
  ])

  return (
    <aside className="space-y-8">
      <div className="bg-white dark:bg-stone-900 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-4 pb-2 border-b border-stone-200 dark:border-stone-700">
          Categorias
        </h3>
        <ul className="space-y-3">
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link 
                href={`/categoria/${cat.slug}`}
                className="flex items-center justify-between group hover:text-red-700 dark:hover:text-red-500"
              >
                <span className="text-sm font-medium">{cat.name}</span>
                <span className="text-xs text-stone-500 bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded">
                  {cat._count.posts}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white dark:bg-stone-900 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-4 pb-2 border-b border-stone-200 dark:border-stone-700">
          Mais Lidos
        </h3>
        <ul className="space-y-4">
          {popularPosts.map((post, index) => (
            <li key={post.id}>
              <Link 
                href={`/artigo/${post.slug}`}
                className="group flex items-start gap-3"
              >
                <span className="text-2xl font-bold text-red-700 dark:text-red-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h4 className="text-sm font-medium line-clamp-2 group-hover:text-red-700 dark:group-hover:text-red-500">
                    {post.title}
                  </h4>
                  <span className="text-xs text-stone-500">
                    {post.viewCount.toLocaleString()} visualizações
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Newsletter />
    </aside>
  )
}