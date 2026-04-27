import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import { initSearchIndex, indexAllPosts, type SearchPost } from '../src/lib/search'
import 'dotenv/config'

const { Pool } = pg
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function syncPostsToSearch() {
  console.log('Starting MeiliSearch sync...')

  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    include: {
      author: { select: { name: true } },
      category: { select: { name: true } },
      tags: { include: { tag: { select: { name: true } } } },
    },
  })

  const searchPosts: SearchPost[] = posts.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.content,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    status: post.status,
    publishedAt: post.publishedAt?.toISOString() || null,
    viewCount: post.viewCount,
    categoryId: post.categoryId,
    category: post.category?.name || null,
    tags: post.tags.map((t) => t.tag.name),
    author: post.author.name || 'Anônimo',
  }))

  await initSearchIndex()
  await indexAllPosts(searchPosts)

  console.log(`Indexed ${searchPosts.length} posts to MeiliSearch`)
  
  await prisma.$disconnect()
  await pool.end()
}

syncPostsToSearch().catch(console.error)