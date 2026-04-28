import {defineRouting} from 'next-intl/routing'
import {createNavigation} from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['pt-BR', 'en'],
  defaultLocale: 'pt-BR'
})

export const {Link, usePathname, useRouter, getPathname} = createNavigation(routing)