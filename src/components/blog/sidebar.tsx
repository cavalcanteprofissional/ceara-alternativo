import Link from 'next/link'

const categories = [
  { name: 'Política', slug: 'politica', count: 42 },
  { name: 'Cultura', slug: 'cultura', count: 38 },
  { name: 'Esportes', slug: 'esportes', count: 56 },
  { name: 'Entretenimento', slug: 'entretenimento', count: 24 },
  { name: 'Economia', slug: 'economia', count: 18 },
  { name: 'Saúde', slug: 'saude', count: 15 },
]

const popularPosts = [
  { id: '1', title: 'Festival de Jazz de Fortaleza atrai turistas de todo o Brasil', views: 2340 },
  { id: '2', title: 'Nova linha do metrô será inaugurated em 2025', views: 1892 },
  { id: '3', title: 'Ceará garante classificação para série A do Brasileirão', views: 1654 },
  { id: '4', title: 'Governo do Estado anuncia investimentos no setor de turismo', views: 1423 },
]

export function Sidebar() {
  return (
    <aside className="space-y-8">
      <div className="bg-white dark:bg-stone-900 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-4 pb-2 border-b border-stone-200 dark:border-stone-700">
          Categorias
        </h3>
        <ul className="space-y-3">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link 
                href={`/categoria/${cat.slug}`}
                className="flex items-center justify-between group hover:text-red-700 dark:hover:text-red-500"
              >
                <span className="text-sm font-medium">{cat.name}</span>
                <span className="text-xs text-stone-500 bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded">
                  {cat.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white dark:bg-stone-900 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-4 pb-2 border-b border-stone-200 dark:border-stone-700">
          Mais Lidos
        </h3>
        <ul className="space-y-4">
          {popularPosts.map((post, index) => (
            <li key={post.id}>
              <Link 
                href={`/artigo/${post.id}`}
                className="group flex items-start gap-3"
              >
                <span className="text-2xl font-bold text-red-700 dark:text-red-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h4 className="text-sm font-medium line-clamp-2 group-hover:text-red-700 dark:group-hover:text-red-500">
                    {post.title}
                  </h4>
                  <span className="text-xs text-stone-500">
                    {post.views.toLocaleString()} visualizações
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gradient-to-br from-red-700 to-red-900 rounded-lg p-6 text-white">
        <h3 className="text-lg font-bold mb-2">Newsletter</h3>
        <p className="text-sm text-red-100 mb-4">
          Receba as notícias mais importantes do Ceará no seu email.
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Seu email"
            className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white/60 text-white text-sm border border-white/30 focus:outline-none focus:border-white"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-white text-red-700 font-medium text-sm rounded-md hover:bg-red-50 transition-colors"
          >
            Inscrever-se
          </button>
        </form>
      </div>
    </aside>
  )
}