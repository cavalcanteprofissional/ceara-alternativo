# Ceará Alternativo 🌴

Um portal de notícias e entretenimento do Ceará construído com tecnologias modernas e padrões de produção.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38BDF8?style=flat&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-7.0-2D3748?style=flat&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=flat&logo=postgresql)

---

## 🛠️ Tecnologias

| Categoria | Tecnologia |
|------------|-------------|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS + shadcn/ui |
| Banco de dados | PostgreSQL (Neon) |
| ORM | Prisma 7 |
| Autenticação | NextAuth v5 (Google, Meta, Credentials) |
| Upload | Uploadthing |
| Email | Resend |
| Busca | MeiliSearch (opcional) |
| Cache/Rate Limit | Upstash Redis |
| Analytics | Plausible |

---

## 🚀 Começando

### Pré-requisitos

- Node.js 20+
- PostgreSQL (Neon ou local)
- Conta Google Developer (para OAuth - opcional)
- Conta Meta Developer (para Facebook Login - opcional)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/cavalcanteprofissional/ceara-alternativo.git
cd ceara-alternativo

# Instale as dependências
npm install

# Copie o arquivo de exemplo e configure
cp .env.example .env

# Edite o .env com suas credenciais (veja seção Variáveis de Ambiente)
# O arquivo .env.example está commitado no repositório

# Execute as migrações e seed
npx prisma db push
npx prisma db seed

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse http://localhost:3000

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` com:

```env
# Banco de dados (Neon PostgreSQL)
DATABASE_URL="postgresql://user:pass@host.neon.tech/dbname?sslmode=require&uselibpqcompat=true"

# NextAuth
AUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="gerar-com-openssl-rand-base64-32"

# Google OAuth (opcional)
AUTH_GOOGLE_ID="seu-google-client-id"
AUTH_GOOGLE_SECRET="seu-google-client-secret"

# Meta (Facebook) OAuth (opcional)
AUTH_META_ID="seu-meta-app-id"
AUTH_META_SECRET="seu-meta-app-secret"

# Upstash Redis (opcional - rate limiting)
UPSTASH_REDIS_REST_URL="seu-url"
UPSTASH_REDIS_REST_TOKEN="seu-token"

# Resend (para Newsletter e notificações - opcional)
RESEND_API_KEY="seu-api-key"
ADMIN_EMAIL="admin@seudominio.com"

# Uploadthing (para upload de imagens - opcional)
UPLOADTHING_SECRET="seu-secret"
UPLOADTHING_APP_ID="seu-app-id"

# MeiliSearch (para busca avançada - opcional)
MEILISEARCH_HOST="https://search.meilisearch.com"
MEILISEARCH_API_KEY="seu-api-key"

# Plausible Analytics (opcional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN="seudominio.com"
```

### Gerar NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

---

## 📁 Estrutura do Projeto

```
ceara-alternativo/
├── src/
│   ├── app/                 # App Router (Next.js 16)
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
│   ├── seed.ts            # Dados iniciais
│   └── migrations/        # Migrações
├── deploy.sh              # Script de deploy
└── vercel.json           # Configuração Vercel
```

---

## 🎨 Funcionalidades

### ✅ Implementado

- **Autenticação**: Google, Meta (Facebook), Email/Senha
- **Painel Admin**: Dashboard, Posts, Categorias, Tags, Comentários
- **Público**: Homepage, Artigos, Categorias, Busca, Tags
- **Editor**: Tiptap (Rich Text Editor)
- **Interação**: Comentários, Ratings (likes), Visualizações
- **Newsletter**: Integração com Resend
- **Notificações**: Email automático para novos comentários
- **Upload**: Upload de imagens com Uploadthing
- **Busca**: Busca avançada com MeiliSearch
- **SEO**: sitemap.xml, robots.txt, RSS Feed, OpenGraph
- **Analytics**: Plausible (privacy-friendly)
- **Rate Limiting**: Upstash Redis (com fallback in-memory)
- **UI**: Modo escuro, responsivo, shadcn/ui

---

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm run dev          # Iniciar servidor
npm run build        # Build production
npm run start        # Iniciar produção

# Banco de dados
npx prisma db push           # Sincronizar schema
npx prisma db seed           # Popular dados iniciais
npx prisma migrate deploy    # Aplicar migrações
npx prisma studio            # Visualizar banco

# Deploy
./deploy.sh                 # Deploy local
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
2. Configure as variáveis de ambiente:
   - `DATABASE_URL` (obrigatório)
   - `NEXTAUTH_SECRET` (obrigatório)
   - `AUTH_URL` (ex: https://seudominio.com)
3. Deploy automático ao fazer push

O `vercel.json` já está configurado para aplicar migrações automaticamente.

---

## 🔑 Credenciais Padrão (Desenvolvimento)

Após executar `npx prisma db seed`:

- **Email**: `admin@cearaalternativo.com.br`
- **Senha**: `admin123`

---

## 📄 Licença

MIT © 2026 Ceará Alternativo

---

Feito com ❤️ no Ceará 🇧🇷