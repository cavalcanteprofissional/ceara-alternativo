import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const tagSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  slug: z.string().min(2),
})

export async function GET() {
  const tags = await prisma.tag.findMany({
    orderBy: { name: 'asc' },
  })
  return NextResponse.json(tags)
}

export async function POST(req: NextRequest) {
  const session = await auth()

  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const parsed = tagSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      )
    }

    const { name, slug } = parsed.data

    const existing = await prisma.tag.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json({ error: 'Slug já está em uso' }, { status: 400 })
    }

    const tag = await prisma.tag.create({
      data: { name, slug },
    })

    return NextResponse.json(tag, { status: 201 })
  } catch (error) {
    console.error('Create tag error:', error)
    return NextResponse.json({ error: 'Erro ao criar tag' }, { status: 500 })
  }
}