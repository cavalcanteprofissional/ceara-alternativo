import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateSchema = z.object({
  title: z.string().min(3).optional(),
  content: z.string().min(10).optional(),
  excerpt: z.string().optional(),
  coverImage: z.string().url().optional().or(z.literal('')),
  categoryId: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  publishedAt: z.string().optional().nullable(),
})

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, name: true, image: true } },
      category: { select: { id: true, name: true, slug: true } },
      tags: { include: { tag: true } },
    },
  })

  if (!post) {
    return NextResponse.json({ error: 'Artigo não encontrado' }, { status: 404 })
  }

  return NextResponse.json(post)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  const { id } = await params

  if (!session || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const post = await prisma.post.findUnique({ where: { id } })

  if (!post) {
    return NextResponse.json({ error: 'Artigo não encontrado' }, { status: 404 })
  }

  if (post.authorId !== session.user.id && session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
  }

  try {
    const body = await req.json()
    const parsed = updateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      )
    }

    const data = parsed.data
    let readingTime = post.readingTime

    if (data.content) {
      const wordCount = data.content.split(/\s+/).length
      readingTime = Math.ceil(wordCount / 200)
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        ...data,
        readingTime,
        publishedAt: data.status === 'PUBLISHED' && !post.publishedAt 
          ? new Date() 
          : data.publishedAt 
            ? new Date(data.publishedAt) 
            : post.publishedAt,
      },
    })

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error('Update post error:', error)
    return NextResponse.json({ error: 'Erro ao atualizar artigo' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  const { id } = await params

  if (!session || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const post = await prisma.post.findUnique({ where: { id } })

  if (!post) {
    return NextResponse.json({ error: 'Artigo não encontrado' }, { status: 404 })
  }

  await prisma.post.delete({ where: { id } })

  return NextResponse.json({ message: 'Artigo deletado com sucesso' })
}