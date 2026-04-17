import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      select: { id: true },
    })

    if (!post) {
      return NextResponse.json({ error: 'Artigo não encontrado' }, { status: 404 })
    }

    await prisma.post.update({
      where: { id },
      data: {
        viewCount: { increment: 1 },
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Increment view error:', error)
    return NextResponse.json({ error: 'Erro ao incrementar visualização' }, { status: 500 })
  }
}