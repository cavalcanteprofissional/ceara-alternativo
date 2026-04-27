import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const commentSchema = z.object({
  content: z.string().min(3, 'Comentário deve ter pelo menos 3 caracteres'),
})

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const comments = await prisma.comment.findMany({
    where: {
      postId: id,
      approved: true,
    },
    include: {
      author: {
        select: { id: true, name: true, image: true },
      },
    },
    orderBy: { createdAt: 'asc' },
  })

  return NextResponse.json(comments)
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: 'Faça login para comentar' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const parsed = commentSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      )
    }

    const post = await prisma.post.findUnique({
      where: { id, status: 'PUBLISHED' },
      select: { id: true },
    })

    if (!post) {
      return NextResponse.json({ error: 'Artigo não encontrado' }, { status: 404 })
    }

    const comment = await prisma.comment.create({
      data: {
        content: parsed.data.content,
        postId: id,
        authorId: session.user.id,
      },
      include: {
        author: {
          select: { id: true, name: true, image: true },
        },
      },
    })

    return NextResponse.json(
      { message: 'Comentário enviado para análise', comment },
      { status: 201 }
    )
  } catch (error) {
    console.error('Comment error:', error)
    return NextResponse.json({ error: 'Erro ao criar comentário' }, { status: 500 })
  }
}