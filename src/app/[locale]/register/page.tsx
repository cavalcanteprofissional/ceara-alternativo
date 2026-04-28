import { Metadata } from 'next'
import { RegisterForm } from './register-form'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Criar Conta',
  description: 'Crie sua conta no Ceará Alternativo',
}

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
            Criar Conta
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Junte-se ao Ceará Alternativo
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}