import { Hero } from '@/components/blog/hero'
import { ArticleGrid } from '@/components/blog/article-grid'
import { Sidebar } from '@/components/blog/sidebar'

const mockRecentPosts = [
  {
    id: '2',
    title: 'Ceará enfrenta sequência de jogos decisivos no Campeonato Brasileiro',
    excerpt: 'Time cearense busca garantir permanência na série A com performances recentes animando a torcida.',
    coverImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop',
    category: 'Esportes',
    publishedAt: '2024-12-14T15:30:00Z',
    readingTime: 4,
    author: { name: 'João Santos' },
  },
  {
    id: '3',
    title: 'Nova exposição no Museu de Arte Contemporânea celebra cultura cearense',
    excerpt: 'Mostra reúne obras de artistas locais e internacionales que inspiram na identidade nordestina.',
    coverImage: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&h=500&fit=crop',
    category: 'Cultura',
    publishedAt: '2024-12-14T10:00:00Z',
    readingTime: 3,
    author: { name: 'Ana Clara' },
  },
  {
    id: '4',
    title: 'Economia cearense registra crescimento acima da média nacional',
    excerpt: 'Setores de turismo e tecnologia lideram expansão econômica do estado no terceiro trimestre.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    category: 'Economia',
    publishedAt: '2024-12-13T18:00:00Z',
    readingTime: 5,
    author: { name: 'Pedro Oliveira' },
  },
  {
    id: '5',
    title: 'Polícia Civil cumpre mandatos de prisão em operação contra tráfico no Interior',
    excerpt: 'Ação integrada resulta na prisão de suspeitos envolvidos com distribuição de drogas na região.',
    coverImage: 'https://images.unsplash.com/photo-1589953361223-643dc5b2c340?w=800&h=500&fit=crop',
    category: 'Polícia',
    publishedAt: '2024-12-13T14:00:00Z',
    readingTime: 4,
    author: { name: 'Carlos Mendes' },
  },
  {
    id: '6',
    title: 'Festival de Música de Jericoacoara confirma edição especial para 2025',
    excerpt: 'Organizadores prometem experiência unprecedented com artistas nacionales e internacionais.',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop',
    category: 'Entretenimento',
    publishedAt: '2024-12-12T20:00:00Z',
    readingTime: 3,
    author: { name: 'Lucas Ferreira' },
  },
  {
    id: '7',
    title: 'Universidade Federal do Ceará desenvolve pesquisa sobre mudanças climáticas',
    excerpt: 'Estudo vai analisar impactos do aquecimento global no semiárido cearense nos próximos 30 anos.',
    coverImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=500&fit=crop',
    category: 'Ciência',
    publishedAt: '2024-12-12T12:00:00Z',
    readingTime: 6,
    author: { name: 'Dra. Mariana Costa' },
  },
]

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Hero />
          <section>
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-stone-200 dark:border-stone-700">
              Últimas Notícias
            </h2>
            <ArticleGrid posts={mockRecentPosts} />
          </section>
        </div>
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}