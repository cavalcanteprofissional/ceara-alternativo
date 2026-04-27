import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { ViewCounter } from '@/components/blog/view-counter'
import { Comments } from '@/components/blog/comments'

interface Props {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug, status: 'PUBLISHED' },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      excerpt: true,
      coverImage: true,
      publishedAt: true,
      readingTime: true,
      viewCount: true,
      author: { select: { id: true, name: true, image: true } },
      category: { select: { name: true, slug: true } },
      tags: { include: { tag: true } },
    },
  })
  return post
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return { title: 'Artigo não encontrado' }
  }

  return {
    title: post.title,
    description: post.excerpt || post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      images: post.coverImage ? [post.coverImage] : [],
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: post.author.name ? [post.author.name] : undefined,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const readingTime = post.readingTime || Math.ceil(post.content.split(' ').length / 200)

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-stone-500">
          <li><Link href="/" className="hover:text-red-700">Início</Link></li>
          <li>/</li>
          {post.category && (
            <>
              <li>
                <Link href={`/categoria/${post.category.slug}`} className="hover:text-red-700">
                  {post.category.name}
                </Link>
              </li>
              <li>/</li>
            </>
          )}
          <li className="text-stone-900 dark:text-stone-100">{post.title}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-6">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-xl text-stone-600 dark:text-stone-400 leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </header>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-stone-500">
        {post.author.image && (
          <Image
            src={post.author.image}
            alt={post.author.name || ''}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <span className="font-medium text-stone-900 dark:text-stone-100">
          {post.author.name}
        </span>
        <span>•</span>
        <time dateTime={post.publishedAt?.toISOString()}>
          {post.publishedAt?.toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </time>
        <span>•</span>
        <span>{readingTime} min de leitura</span>
        {post.viewCount > 0 && (
          <>
            <span>•</span>
            <span>{post.viewCount} visualizações</span>
          </>
        )}
      </div>

      <ViewCounter postId={post.id} />

      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-12">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {post.content.split('\n').map((paragraph, i) => (
          paragraph.trim() ? (
            <p key={i} className="mb-6 text-stone-800 dark:text-stone-300 leading-relaxed">
              {paragraph}
            </p>
          ) : (
            <br key={i} />
          )
        ))}
      </div>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800">
          <h3 className="text-sm font-semibold text-stone-500 mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map(({ tag }) => (
              <Link
                key={tag.id}
                href={`/tag/${tag.slug}`}
                className="px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-sm rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-400 transition-colors"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Share */}
      <div className="mt-8 flex items-center gap-4">
        <span className="text-sm font-medium text-stone-500">Compartilhar:</span>
        <div className="flex gap-2">
          <button className="p-2 text-stone-500 hover:text-red-700 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
            </svg>
          </button>
          <button className="p-2 text-stone-500 hover:text-red-700 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>
          <button className="p-2 text-stone-500 hover:text-red-700 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </button>
        </div>
      </div>

      <Comments postId={post.id} />
    </article>
  )
}