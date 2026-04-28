import type { Metadata } from 'next'
import { Inter, Geist } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { GoogleAnalytics } from '@next/third-parties/google'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Ceará Alternativo',
    template: '%s | Ceará Alternativo',
  },
  description: 'Portal de notícias e entretenimento do Ceará',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="pt-BR" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}