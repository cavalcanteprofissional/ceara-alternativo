import { ArticleCard } from './article-card'

interface Article {
  id: string
  title: string
  excerpt?: string
  coverImage?: string
  category: string
  publishedAt: string
  readingTime: number
  author: { name: string; image?: string | null }
}

interface ArticleGridProps {
  posts: Article[]
}

export function ArticleGrid({ posts }: ArticleGridProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <ArticleCard key={post.id} post={post} />
      ))}
    </section>
  )
}