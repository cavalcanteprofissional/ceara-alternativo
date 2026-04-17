# Ceará Alternativo 🌴

Um portal de notícias e entretenimento do Ceará construído com tecnologias modernas e padrões de produção.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38BDF8?style=flat&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-7.0-2D3748?style=flat&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=flat&logo=postgresql)

---

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- PostgreSQL (Neon ou local)
- Conta Google Developer (para OAuth)
- Conta Meta Developer (para Facebook Login)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/cavalcanteprofissional/ceara-alternativo.git
cd ceara-alternativo

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Execute as migrações do banco
DATABASE_URL="sua-url-postgres" npx prisma db push

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse http://localhost:3000

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env.local` com:

```env
# Banco de dados (Neon PostgreSQL)
DATABASE_URL="postgresql://user:pass@host.neon.tech/dbname?sslmode=require"

# Auth.js
AUTH_SECRET="gerar-com-npx-auth-secret"
AUTH_URL="http://localhost:3000"

# Google OAuth
AUTH_GOOGLE_ID="seu-google-client-id"
AUTH_GOOGLE_SECRET="seu-google-client-secret"

# Meta (Facebook) OAuth
AUTH_META_ID="seu-meta-app-id"
AUTH_META_SECRET="seu-meta-app-secret"
```

### Gerar AUTH_SECRET

```bash
npx auth secret
```

---

## 📁 Estrutura do Projeto

```
ceara-alternativo/
├── src/
│   ├── app/                 # App Router (Next.js 14)
│   │   ├── (admin)/        # Painel administrativo
│   │   ├── (public)/       # Páginas públicas
│   │   ├── api/            # API Routes
│   │   └── layout.tsx      # Layout raiz
│   ├── components/
│   │   ├── admin/          # Componentes do admin
│   │   ├── blog/           # Componentes do blog
│   │   ├── layout/         # Header, Footer, etc
│   │   └── ui/             # shadcn/ui components
│   └── lib/                # Utilitários (Prisma, Auth, etc)
├── prisma/
│   ├── schema.prisma      # Schema do banco
│   └── seed.ts             # Dados iniciais
└── docs/
    └── database/           # Documentação do DB
```

---

## 🎨 Funcionalidades

### ✅ Implementado

- **Autenticação**: Google, Meta (Facebook), Email/Senha
- **Painel Admin**: Dashboard, Posts, Categorias, Tags
- **Público**: Homepage, Artigos, Categorias, Busca
- **SEO**: sitemap.xml, robots.txt, RSS, metadata OpenGraph
- **UI**: Modo escuro, responsivo, shadcn/ui
- **Extras**: Visualizações, preview artigos, rate limiting

### 🔜 Próximas Versões

- Newsletter
- Sistema de comentários
- Editor de texto rico (Tiptap)
- Analytics (Plausible/Sentry)

---

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm run dev          # Iniciar servidor
npm run build       # Build production
npm run start       # Iniciar produção

# Banco de dados
npx prisma studio   # Visualizar banco
npx prisma generate # Gerar cliente

# Linting
npm run lint         # Verificar erros
```

---

## 🔐 Configuração OAuth

### Google

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um projeto → APIs e Serviços → Credenciais
3. Crie OAuth Client ID
4. Adicione URIs de redirect:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://seudominio.com/api/auth/callback/google`

### Meta (Facebook)

1. Acesse [Meta for Developers](https://developers.facebook.com)
2. Crie um app → Facebook Login
3. Adicione URIs de redirect:
   - `http://localhost:3000/api/auth/callback/facebook`
   - `https://seudominio.com/api/auth/callback/facebook`

---

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório no [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente
3. Deploy automático ao fazer push

### Railway (Futuro)

```bash
# Instale o CLI
railway login
railway init

# Adicione PostgreSQL
railway add postgresql

# Deploy
railway up
```

---

## 📄 Licença

MIT © 2026 Ceará Alternativo

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📞 Suporte

- Email: contato@cearaalternativo.com.br
- Issues: https://github.com/cavalcanteprofissional/ceara-alternativo/issues

---

Feito com ❤️ no Ceará 🇧🇷