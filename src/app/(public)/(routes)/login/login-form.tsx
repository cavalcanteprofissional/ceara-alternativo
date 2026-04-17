'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Email ou senha inválidos')
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  const handleOAuthSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: '/admin' })
  }

  return (
    <div className="bg-white dark:bg-stone-900 rounded-lg shadow-lg p-8">
      {/* OAuth Buttons */}
      <div className="space-y-3 mb-6">
        <button
          type="button"
          onClick={() => handleOAuthSignIn('google')}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="font-medium">Continuar com Google</span>
        </button>

        <button
          type="button"
          onClick={() => handleOAuthSignIn('facebook')}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
            <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
          </svg>
          <span className="font-medium">Continuar com Facebook</span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-stone-300 dark:border-stone-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-stone-900 text-stone-500">ou</span>
        </div>
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm rounded-lg">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-800 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-800 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-red-700 hover:bg-red-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-stone-600 dark:text-stone-400">
        Não tem conta?{' '}
        <Link href="/register" className="text-red-700 hover:text-red-800 font-medium">
          Criar conta
        </Link>
      </div>
    </div>
  )
}