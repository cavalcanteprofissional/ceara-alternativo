import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const postSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  slug: z.string().min(3),
  content: z.string().min(10, 'Conteúdo deve ter pelo menos 10 caracteres'),
  excerpt: z.string().optional(),
  coverImage: z.string().url().optional().or(z.literal('')),
  categoryId: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  publishedAt: z.string().optional().nullable(),
})

export async function GET(req: NextRequest) {
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

    const { title, slug, content, excerpt, coverImage, categoryId, status, publishedAt } = parsed.data

    const existingSlug = await prisma.post.findUnique({ where: { slug } })
    if (existingSlug) {
      return NextResponse.json({ error: 'Slug já está em uso' }, { status: 400 })
    }

    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / 200)

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        coverImage: coverImage || null,
        categoryId: categoryId || null,
        status: status || 'DRAFT',
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        readingTime,
        authorId: session.user.id,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Create post error:', error)
    return NextResponse.json({ error: 'Erro ao criar artigo' }, { status: 500 })
  }
}