export const locales = ['pt-BR', 'en'] as const
export const defaultLocale = 'pt-BR'

export type Locale = typeof locales[number]

export function getMessages(locale: string) {
  const messages = require(`../messages/${locale}.json`)
  return messages.default || messages
}