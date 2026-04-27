# TODO.md - Ceará Alternativo

## Progresso do Desenvolvimento

---

## ✅ Concluídos

### Etapa 1: Configuração Inicial
- [x] Criar projeto Next.js 14+ com TypeScript e Tailwind
- [x] Configurar PostgreSQL (Neon) com Prisma
- [x] Criar schema completo (User, Post, Category, Tag, PostTag, Account, Session, VerificationToken)
- [x] Configurar NextAuth v5 (Google, Meta, Credentials)
- [x] Criar estrutura de pastas (app, components, lib, docs)
- [x] Layout raiz com providers (theme, session)
- [x] Homepage com mock data (Hero, ArticleGrid, Sidebar)
- [x] Build verificar funcionando

### Etapa 2: Autenticação e Páginas Públicas
- [x] Página de Login (/login) com Google, Facebook, Credentials
- [x] Página de Registro (/register)
- [x] API Route para registro (/api/auth/register)
- [x] Página de Artigo (/artigo/[slug]) com SEO metadata
- [x] Página de Categoria (/categoria/[slug])
- [x] Admin Layout protegido (/admin)
- [x] Dashboard admin
- [x] Lista de Posts admin
- [x] Formulário para criar/editar posts
- [x] API Routes para posts (GET, POST, PUT, DELETE)
- [x] API Route para categorias (GET)
- [x] Seed de categorias

### Etapa 3: Busca, SEO e Páginas Estáticas
- [x] Página de Busca (/busca) com paginação
- [x] Busca full-text com Prisma (simples)
- [x] Barra de busca no Header
- [x] Sitemap.xml dinâmico
- [x] robots.txt
- [x] RSS Feed (/feed.xml)
- [x] Página Sobre (/sobre)
- [x] Página Contato (/contato)
- [x] Loading states em rotas importantes
- [x] Error states em rotas importantes

### Etapa 4: shadcn/ui e Sistema de Tags/Categorias Admin
- [x] Instalar shadcn/ui
- [x] Componentes: Button, Input, Textarea, Label, Dialog, Badge, Table, Skeleton, Sonner, Toggle
- [x] CRUD de Tags (/admin/tags)
- [x] CRUD de Categorias (/admin/categories)
- [x] Menu admin atualizado com Tags

### Etapa 5: Editor de Artigos Completo
- [x] Preview de artigos (toggle Editar/Preview)
- [x] Editar posts existentes no admin (/admin/posts/[id])
- [x] Sistema de tags nos formulários
- [x] API Routes atualizadas para suportar tags

### Fase 1: Correção de Bugs Críticos
- [x] Corrigir dotenv import no prisma.config.ts (v17+)
- [x] Adicionar dynamic export para páginas que acessam banco
- [x] API de categorias com Prisma adapter PostgreSQL

### Fase 2: Alta Prioridade
- [x] Sistema de visualizações por artigo (contagem por sessão)
- [x] Rate limiting com Upstash Redis (fallback in-memory automático)

### Fase 3: Média Prioridade
- [x] Editor de texto rico (Tiptap)
- [x] Sistema de comentários (com modelo, API, componente)
- [x] Newsletter com Resend (opcional, só ativa se configurado)

### Documentação
- [x] docs/database/SCHEMA.md - Schema completo do banco
- [x] docs/database/RLS.md - Políticas Row Level Security
- [x] TODO.md - Registro de progresso

---

## 📋 Pendentes (Próximas Etapas)

### Fase 4: Baixa Prioridade
- [ ] Integração com MeiliSearch/Algolia para busca avançada
- [ ] Sistema de avaliações de artigos
- [ ] Analytics (Plausible/Sentry)

---

## 🐛 Bugs e Issues

| Prioridade | Descrição | Status |
|------------|-----------|--------|
| ~~Alta~~ | ~~API Route de categorias retorna erro 500 em build~~ | ✅ Corrigido |
| ~~Baixa~~ | ~~Imagens não estão sendo otimizadas~~ | ✅ Verificado (funcionando) |
| ~~Baixa~~ | ~~Editor de texto simples (textarea) - sem Rich Text~~ | ✅ Corrigido com Tiptap |

---

## 📊 Estatísticas

- **Arquivos criados**: ~80+
- **Categorias**: CRUD completo no admin
- **Tags**: CRUD completo no admin
- **Provedores Auth**: 3 (Google, Meta, Credentials)
- **shadcn/ui**: 10 componentes instalados
- **Admin**: Dashboard, Posts (criar/editar/listar), Categories, Tags
- **Features**: Tiptap, Comentários, Newsletter, Visualizações, Rate Limiting

---

## 🔗 Links Úteis

- **Frontend**: http://localhost:3000
- **Sitemap**: http://localhost:3000/sitemap.xml
- **RSS Feed**: http://localhost:3000/feed.xml
- **Admin**: http://localhost:3000/admin
- **Admin Tags**: http://localhost:3000/admin/tags
- **Admin Categories**: http://localhost:3000/admin/categories
- **Banco**: Neon (neondb)

---

*Atualizado em: 2026-04-27*