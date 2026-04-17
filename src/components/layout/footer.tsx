import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-red-700 dark:text-red-500 mb-4">Ceará Alternativo</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              Portal de notícias e entretenimento do Ceará com as últimas notícias da política, cultura e esportes.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
              <li><Link href="/categoria/politica" className="hover:text-red-700 dark:hover:text-red-500">Política</Link></li>
              <li><Link href="/categoria/cultura" className="hover:text-red-700 dark:hover:text-red-500">Cultura</Link></li>
              <li><Link href="/categoria/esportes" className="hover:text-red-700 dark:hover:text-red-500">Esportes</Link></li>
              <li><Link href="/categoria/entretenimento" className="hover:text-red-700 dark:hover:text-red-500">Entretenimento</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Sobre</h4>
            <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
              <li><Link href="/sobre" className="hover:text-red-700 dark:hover:text-red-500">Sobre Nós</Link></li>
              <li><Link href="/contato" className="hover:text-red-700 dark:hover:text-red-500">Contato</Link></li>
              <li><Link href="/privacidade" className="hover:text-red-700 dark:hover:text-red-500">Privacidade</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-stone-600 dark:text-stone-400 hover:text-red-700 dark:hover:text-red-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-stone-600 dark:text-stone-400 hover:text-red-700 dark:hover:text-red-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.35.2-6.78,2.62-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.36,2.62,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.35-.2,6.78-2.62,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.35-2.62-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-stone-600 dark:text-stone-400 hover:text-red-700 dark:hover:text-red-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-stone-200 dark:border-stone-800 text-center text-sm text-stone-500">
          © {new Date().getFullYear()} Ceará Alternativo. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}