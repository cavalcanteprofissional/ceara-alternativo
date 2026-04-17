import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const categorySchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  slug: z.string().min(2),
  description: z.string().optional(),
})

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: { select: { posts: true } },
    },
  })
  return NextResponse.json(categories)
}

export async function POST(req: NextRequest) {
  const session = await auth()

  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const parsed = categorySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      )
    }

    const { name, slug, description } = parsed.data

    const existing = await prisma.category.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json({ error: 'Slug já está em uso' }, { status: 400 })
    }

    const category = await prisma.category.create({
      data: { name, slug, description },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Create category error:', error)
    return NextResponse.json({ error: 'Erro ao criar categoria' }, { status: 500 })
  }
}