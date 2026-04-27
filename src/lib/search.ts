import { Meilisearch, Index } from 'meilisearch'

const client = new Meilisearch({
  host: process.env.MEILISEARCH_HOST || 'https://search-demo.meilisearch.com',
  apiKey: process.env.MEILISEARCH_API_KEY || '',
})

let postsIndex: Index | null = null

export function getPostsIndex(): Index {
  if (!postsIndex) {
    postsIndex = client.index('posts')
  }
  return postsIndex
}

export async function initSearchIndex() {
  const index = getPostsIndex()
  
  try {
    await index.updateSettings({
      searchableAttributes: ['title', 'content', 'excerpt', 'category', 'tags'],
      filterableAttributes: ['categoryId', 'status', 'tags'],
      sortableAttributes: ['publishedAt', 'viewCount'],
      typoTolerance: {
        enabled: true,
        minWordSizeForTypos: {
          oneTypo: 4,
          twoTypos: 8,
        },
      },
    })
  } catch (error) {
    console.error('Failed to init MeiliSearch index:', error)
  }
}

export interface SearchPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  coverImage: string | null
  status: string
  publishedAt: string | null
  viewCount: number
  categoryId: string | null
  category: string | null
  tags: string[]
  author: string
}

export async function indexPost(post: SearchPost) {
  const index = getPostsIndex()
  try {
    await index.addDocuments([post])
  } catch (error) {
    console.error('Failed to index post:', error)
  }
}

export async function indexAllPosts(posts: SearchPost[]) {
  const index = getPostsIndex()
  try {
    await index.addDocuments(posts)
  } catch (error) {
    console.error('Failed to index posts:', error)
  }
}

export async function removePostFromIndex(postId: string) {
  const index = getPostsIndex()
  try {
    await index.deleteDocument(postId)
  } catch (error) {
    console.error('Failed to remove post from index:', error)
  }
}

export async function searchPosts(query: string, options?: {
  categoryId?: string
  limit?: number
  offset?: number
}) {
  const index = getPostsIndex()
  
  try {
    const filters: string[] = ['status = "PUBLISHED"']
    if (options?.categoryId) {
      filters.push(`categoryId = "${options.categoryId}"`)
    }

    const results = await index.search(query, {
      filter: filters.join(' AND '),
      limit: options?.limit || 10,
      offset: options?.offset || 0,
      attributesToHighlight: ['title', 'content'],
      highlightPreTag: '<mark>',
      highlightPostTag: '</mark>',
    })

    return results
  } catch (error) {
    console.error('Search error:', error)
    return { hits: [], estimatedTotalHits: 0 }
  }
}

export { client as meiliClient }