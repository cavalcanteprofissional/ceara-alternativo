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
      select: { id: true, viewCount: true },
    })

    if (!post) {
      return NextResponse.json({ error: 'Artigo não encontrado' }, { status: 404 })
    }

    const updated = await prisma.post.update({
      where: { id },
      data: {
        viewCount: { increment: 1 },
      },
      select: { viewCount: true },
    })

    return NextResponse.json({ success: true, viewCount: updated.viewCount })
  } catch (error) {
    console.error('Increment view error:', error)
    return NextResponse.json({ error: 'Erro ao incrementar visualização' }, { status: 500 })
  }
}