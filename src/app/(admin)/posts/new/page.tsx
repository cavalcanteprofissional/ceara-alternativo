import { Metadata } from 'next'
import { PostForm } from './post-form'

export const metadata: Metadata = {
  title: 'Novo Artigo',
}

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-8">
        Novo Artigo
      </h1>
      <PostForm />
    </div>
  )
}