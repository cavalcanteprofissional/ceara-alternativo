import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { ipRateLimit } from '@/lib/ip-rate-limit'

const postSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  slug: z.string().min(3),
  content: z.string().min(10, 'Conteúdo deve ter pelo menos 10 caracteres'),
  excerpt: z.string().optional(),
  coverImage: z.string().url().optional().or(z.literal('')),
  categoryId: z.string().optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  publishedAt: z.string().optional().nullable(),
  tags: z.array(z.string()).optional(),
})

export async function GET(req: NextRequest) {
  const rateLimitCheck = await ipRateLimit(req)
  if (rateLimitCheck) return rateLimitCheck

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const categoryId = searchParams.get('categoryId')

  const posts = await prisma.post.findMany({
    where: {
      ...(status && { status: status as any }),
      ...(categoryId && { categoryId }),
    },
    include: {
      author: { select: { id: true, name: true, image: true } },
      category: { select: { id: true, name: true, slug: true } },
      tags: { include: { tag: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(posts)
}

export async function POST(req: NextRequest) {
  const rateLimitCheck = await ipRateLimit(req)
  if (rateLimitCheck) return rateLimitCheck

  const session = await auth()

  if (!session || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const parsed = postSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      )
    }

    const { tags, ...data } = parsed.data

    const existingSlug = await prisma.post.findUnique({ where: { slug: data.slug } })
    if (existingSlug) {
      return NextResponse.json({ error: 'Slug já está em uso' }, { status: 400 })
    }

    const wordCount = data.content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / 200)

    const post = await prisma.post.create({
      data: {
        ...data,
        coverImage: data.coverImage || null,
        categoryId: data.categoryId || null,
        status: data.status || 'DRAFT',
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
        readingTime,
        authorId: session.user.id,
      },
    })

    if (tags && tags.length > 0) {
      await prisma.postTag.createMany({
        data: tags.map(tagId => ({
          postId: post.id,
          tagId,
        })),
      })
    }

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Create post error:', error)
    return NextResponse.json({ error: 'Erro ao criar artigo' }, { status: 500 })
  }
}