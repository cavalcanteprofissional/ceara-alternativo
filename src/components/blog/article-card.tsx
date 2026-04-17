import Link from 'next/link'
import Image from 'next/image'

interface ArticleCardProps {
  post: {
    id: string
    title: string
    excerpt?: string
    coverImage?: string
    category: string
    publishedAt: string
    readingTime: number
    author: { name: string; image?: string | null }
  }
}

export function ArticleCard({ post }: ArticleCardProps) {
  return (
    <Link href={`/artigo/${post.id}`} className="group block">
      <article className="bg-white dark:bg-stone-900 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {post.coverImage && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-4">
          <span className="inline-block px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-semibold rounded mb-2">
            {post.category}
          </span>
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-700 dark:group-hover:text-red-500 transition-colors">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-stone-600 dark:text-stone-400 text-sm line-clamp-2 mb-3">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center gap-3 text-xs text-stone-500">
            <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
            <span>•</span>
            <span>{post.readingTime} min</span>
          </div>
        </div>
      </article>
    </Link>
  )
}