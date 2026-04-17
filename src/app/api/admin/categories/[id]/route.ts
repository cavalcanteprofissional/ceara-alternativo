import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  const { id } = await params

  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    await prisma.category.delete({ where: { id } })
    return NextResponse.json({ message: 'Categoria deletada com sucesso' })
  } catch (error) {
    console.error('Delete category error:', error)
    return NextResponse.json({ error: 'Erro ao deletar categoria' }, { status: 500 })
  }
}