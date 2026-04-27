import { NextRequest, NextResponse } from 'next/server'
import { searchPosts } from '@/lib/search'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q') || ''
  const categoryId = searchParams.get('categoryId') || undefined
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const offset = parseInt(searchParams.get('offset') || '0', 10)

  if (!query) {
    return NextResponse.json({ hits: [], estimatedTotalHits: 0 })
  }

  const results = await searchPosts(query, { categoryId, limit, offset })

  return NextResponse.json(results)
}