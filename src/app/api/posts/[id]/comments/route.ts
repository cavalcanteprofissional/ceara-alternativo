import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'
import { Resend } from 'resend'
import { commentNotificationEmail } from '@/lib/email-templates'

const commentSchema = z.object({
  content: z.string().min(3, 'Comentário deve ter pelo menos 3 caracteres'),
})

async function sendCommentNotification(
  authorName: string,
  authorEmail: string,
  content: string,
  postTitle: string,
  postSlug: string
) {
  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) return

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@cearaalternativo.com.br'
  const siteUrl = process.env.AUTH_URL || 'http://localhost:3000'

  const resend = new Resend(resendApiKey)
  await resend.emails.send({
    from: 'Ceará Alternativo <newsletter@cearaalternativo.com.br>',
    to: adminEmail,
    subject: `Novo comentário em "${postTitle}"`,
    html: commentNotificationEmail({
      authorName,
      authorEmail,
      content,
      postTitle,
      postSlug,
      siteUrl,
    }),
  })
}

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
      select: { id: true, title: true, slug: true },
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
          select: { id: true, name: true, email: true, image: true },
        },
      },
    })

    sendCommentNotification(
      comment.author.name || 'Anônimo',
      comment.author.email || '',
      comment.content,
      post.title,
      post.slug
    ).catch(console.error)

    return NextResponse.json(
      { message: 'Comentário enviado para análise', comment },
      { status: 201 }
    )
  } catch (error) {
    console.error('Comment error:', error)
    return NextResponse.json({ error: 'Erro ao criar comentário' }, { status: 500 })
  }
}