import { Geist } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ThemeSwitch } from '@/components/theme-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { defaultLocale } from '@/lib/i18n'

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: {
    default: 'Ceará Alternativo',
    template: '%s | Ceará Alternativo',
  },
  description: 'Portal de notícias e entretenimento do Ceará',
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
    <div className={`${geist.variable} font-sans`}>
      <ThemeSwitch>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </ThemeSwitch>
    </div>
  )
}