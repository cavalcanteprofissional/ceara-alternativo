import { Metadata } from 'next'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { PostForm } from '@/components/admin/post-form'

export const metadata: Metadata = {
  title: 'Novo Artigo',
}

export default async function NewPostPage() {
  const session = await auth()

  if (!session || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
    redirect('/login')
  }

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  })

  const tags = await prisma.tag.findMany({
    orderBy: { name: 'asc' },
  })

  return (
    <div>
      <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-8">
        Novo Artigo
      </h1>
      <PostForm categories={categories} tags={tags} />
    </div>
  )
}