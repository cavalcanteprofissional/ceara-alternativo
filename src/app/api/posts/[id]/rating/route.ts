import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const ratings = await prisma.rating.groupBy({
    by: ['postId'],
    where: { postId: id },
    _count: true,
    _sum: { value: true },
  })

  const post = await prisma.post.findUnique({
    where: { id },
    select: { id: true },
  })

  if (!post) {
    return NextResponse.json({ error: 'Artigo não encontrado' }, { status: 404 })
  }

  const count = ratings[0]?._count || 0
  const total = Number(ratings[0]?._sum.value || 0)

  return NextResponse.json({
    count,
    total,
    average: count > 0 ? total / count : 0,
  })
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: 'Faça login para avaliar' }, { status: 401 })
  }

  try {
    const body = await req.json().catch(() => ({}))
    const value = body.value || 1

    const post = await prisma.post.findUnique({
      where: { id, status: 'PUBLISHED' },
      select: { id: true },
    })

    if (!post) {
      return NextResponse.json({ error: 'Artigo não encontrado' }, { status: 404 })
    }

    const rating = await prisma.rating.upsert({
      where: {
        postId_userId: {
          postId: id,
          userId: session.user.id,
        },
      },
      update: { value },
      create: {
        postId: id,
        userId: session.user.id,
        value,
      },
    })

    const allRatings = await prisma.rating.aggregate({
      where: { postId: id },
      _count: true,
      _sum: { value: true },
    })

    return NextResponse.json({
      rating,
      count: allRatings._count,
      average: allRatings._sum.value ? allRatings._sum.value / allRatings._count : 0,
    })
  } catch (error) {
    console.error('Rating error:', error)
    return NextResponse.json({ error: 'Erro ao processar avaliação' }, { status: 500 })
  }
}