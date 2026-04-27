import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const session = await auth()

  if (!session || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const approved = searchParams.get('approved')
  const postId = searchParams.get('postId')

  const comments = await prisma.comment.findMany({
    where: {
      ...(approved !== null && { approved: approved === 'true' }),
      ...(postId && { postId }),
    },
    include: {
      author: { select: { id: true, name: true, email: true, image: true } },
      post: { select: { id: true, title: true, slug: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(comments)
}

export async function PATCH(req: NextRequest) {
  const session = await auth()

  if (!session || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const { id, approved } = await req.json()

    const comment = await prisma.comment.update({
      where: { id },
      data: { approved },
    })

    return NextResponse.json(comment)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar comentário' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth()

  if (!session || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 })
    }

    await prisma.comment.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar comentário' }, { status: 500 })
  }
}