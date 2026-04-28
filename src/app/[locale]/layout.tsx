import type { Metadata } from 'next'
import { Inter, Geist } from 'next/font/google'
import { notFound } from 'next/navigation'
import '@/app/globals.css'
import { Providers } from '@/components/providers'
import { ThemeSwitch } from '@/components/theme-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { cn } from "@/lib/utils";
import { defaultLocale } from '@/lib/i18n'

const geist = Geist({subsets:['latin'],variable:'--font-sans'});
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Ceará Alternativo',
    template: '%s | Ceará Alternativo',
  },
  description: 'Portal de notícias e entretenimento do Ceará',
  manifest: '/manifest.json',
  openGraph: {
    title: 'Ceará Alternativo',
    description: 'Portal de notícias e entretenimento do Ceará',
    url: 'https://cearaalternativo.com',
    siteName: 'Ceará Alternativo',
    locale: 'pt_BR',
    type: 'website',
  },
}

const validLocales = ['pt-BR', 'en']

export function generateStaticParams() {
  return validLocales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: localeParam } = await params
  const locale = localeParam || defaultLocale
  
  if (!validLocales.includes(locale)) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        <script
          defer
          data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'cearaalternativo.com'}
          src="https://plausible.io/js/script.tagged-events.js"
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100`}>
        <Providers>
          <ThemeSwitch>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ThemeSwitch>
        </Providers>
      </body>
    </html>
  )
}