import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Sobre o Ceará Alternativo - Portal de notícias e entretenimento do Ceará',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-8">
          Sobre o Ceará Alternativo
        </h1>
        
        <p className="text-lg text-stone-600 dark:text-stone-400 mb-6">
          O Ceará Alternativo é um portal de notícias e entretenimento que nasceu com o objetivo de 
          trazer informações relevantes sobre política, cultura, esportes e economia do estado do Ceará.
        </p>

        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-8 mb-4">
          Nossa Missão
        </h2>
        <p className="text-stone-600 dark:text-stone-400 mb-6">
          Democratizar o acesso à informação e promover o debate sobre os temas que impactam 
          a vida dos cearenses. Acreditamos em um jornalismo ético, transparente e comprometido 
          com a verdade.
        </p>

        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-8 mb-4">
          Nossa Equipe
        </h2>
        <p className="text-stone-600 dark:text-stone-400 mb-6">
          Somos um grupo de profissionais dedicados a produzir conteúdo de qualidade. 
          Desde jornalistas experientes a novos talentos, todos compartilhamos o mesmo objetivo: 
          levar informação relevante para você.
        </p>

        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-8 mb-4">
          Contato
        </h2>
        <p className="text-stone-600 dark:text-stone-400 mb-6">
          Quer entrar em contato conosco? Utilize a página de <a href="/contato" className="text-red-700 hover:text-red-800">contato</a> 
          ou mande um email para contato@cearaalternativo.com.br
        </p>
      </article>
    </div>
  )
}