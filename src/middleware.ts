import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['pt-BR', 'en'],
  defaultLocale: 'pt-BR',
  localePrefix: 'always'
})

export const config = {
  matcher: ['/', '/(pt-BR|en)/:path*']
}