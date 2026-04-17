import Link from 'next/link'
import Image from 'next/image'

const mockHeroPost = {
  id: '1',
  title: 'Prefeitura de Fortaleza anuncia novo plano de mobilidade urbana para 2026',
  excerpt: 'O plano inclui расширение de ciclovias, novos corredores de ônibus e implantação de integrar integração com metrô. Investimento total ultrapassa R$ 2 bilhões.',
  coverImage: 'https://images.unsplash.com/photo-1570126613385-6f2c0c94c620?w=1200&h=600&fit=crop',
  category: 'Política',
  publishedAt: '2024-12-15T10:00:00Z',
  author: { name: 'Maria Silva', image: null },
  readingTime: 5,
}

export function Hero() {
  return (
    <section className="mb-12">
      <Link href={`/artigo/${mockHeroPost.id}`} className="group block relative">
        <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
          <Image
            src={mockHeroPost.coverImage}
            alt={mockHeroPost.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <span className="inline-block px-3 py-1 bg-red-700 text-white text-xs font-semibold rounded mb-4">
              {mockHeroPost.category}
            </span>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
              {mockHeroPost.title}
            </h1>
            <p className="text-stone-200 text-sm md:text-base line-clamp-2 mb-4">
              {mockHeroPost.excerpt}
            </p>
            <div className="flex items-center gap-4 text-stone-300 text-sm">
              <span>{mockHeroPost.author.name}</span>
              <span>•</span>
              <span>{new Date(mockHeroPost.publishedAt).toLocaleDateString('pt-BR')}</span>
              <span>•</span>
              <span>{mockHeroPost.readingTime} min de leitura</span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  )
}