import { Metadata } from 'next'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { CategoryList } from './category-list'
import { CategoryDialog } from './category-dialog'

export const metadata: Metadata = {
  title: 'Admin - Categorias',
}

export default async function AdminCategoriesPage() {
  const session = await auth()

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/login')
  }

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: { posts: true },
      },
    },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
          Categorias
        </h1>
        <CategoryDialog />
      </div>

      <CategoryList categories={categories} />
    </div>
  )
}