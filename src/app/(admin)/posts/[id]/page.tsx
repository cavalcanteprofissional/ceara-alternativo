import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { PostForm } from '@/components/admin/post-form'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const post = await prisma.post.findUnique({ where: { id } })

  if (!post) {
    return { title: 'Artigo não encontrado' }
  }

  return {
    title: `Editar: ${post.title}`,
  }
}

export default async function EditPostPage({ params }: Props) {
  const session = await auth()
  const { id } = await params

  if (!session || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
    redirect('/login')
  }

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      category: { select: { id: true, name: true } },
      tags: { include: { tag: { select: { id: true, name: true } } } },
    },
  })

  if (!post) {
    notFound()
  }

  if (post.authorId !== session.user.id && session.user.role !== 'ADMIN') {
    redirect('/admin/posts')
  }

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  })

  const tags = await prisma.tag.findMany({
    orderBy: { name: 'asc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
          Editar Artigo
        </h1>
      </div>

      <PostForm 
        post={{
          id: post.id,
          title: post.title,
          content: post.content,
          excerpt: post.excerpt || '',
          coverImage: post.coverImage || '',
          categoryId: post.categoryId || '',
          status: post.status,
          tags: post.tags.map(t => t.tag.id),
        }}
        categories={categories}
        tags={tags}
      />
    </div>
  )
}