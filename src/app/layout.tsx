import './globals.css'
import { Providers } from '@/components/providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head />
      <body className="min-h-screen flex flex-col bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}