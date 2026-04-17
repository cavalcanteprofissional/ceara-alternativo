import { Metadata } from 'next'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { TagList } from './tag-list'
import { TagDialog } from './tag-dialog'

export const metadata: Metadata = {
  title: 'Admin - Tags',
}

export default async function AdminTagsPage() {
  const session = await auth()

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/login')
  }

  const tags = await prisma.tag.findMany({
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
          Tags
        </h1>
        <TagDialog />
      </div>

      <TagList tags={tags} />
    </div>
  )
}