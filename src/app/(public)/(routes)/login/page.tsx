import { Metadata } from 'next'
import { LoginForm } from './login-form'

export const metadata: Metadata = {
  title: 'Entrar',
  description: 'Entre na sua conta no Ceará Alternativo',
}

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
            Entrar
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Entre com sua conta para continuar
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}