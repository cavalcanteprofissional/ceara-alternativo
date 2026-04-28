'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1000)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
        Fale Conosco
      </h1>
      <p className="text-lg text-stone-600 dark:text-stone-400 mb-8">
        Tem alguma sugestão, crítica ou preciso entrar em contato? Preencha o formulário abaixo.
      </p>

      {status === 'success' && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg">
          Mensagem enviada com sucesso! Retornaremos em breve.
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
          Erro ao enviar mensagem. Tente novamente.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Nome
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-800 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-800 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            Assunto
          </label>
          <select
            id="subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
            className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-800 focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">Selecione um assunto</option>
            <option value="suggestion">Sugestão</option>
            <option value="criticism">Crítica</option>
            <option value="collaboration">Parceria</option>
            <option value="other">Outro</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Mensagem
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            rows={6}
            className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-800 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
            placeholder="Sua mensagem..."
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-3 px-4 bg-red-700 hover:bg-red-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
        </button>
      </form>

      <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800">
        <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-4">
          Outras formas de contato
        </h2>
        <div className="space-y-2 text-stone-600 dark:text-stone-400">
          <p>Email: contato@cearaalternativo.com.br</p>
          <p>WhatsApp: (85) 99999-9999</p>
        </div>
      </div>
    </div>
  )
}