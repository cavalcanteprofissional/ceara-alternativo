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

### Fase 4: Analytics, Avaliações e Busca
- [x] Analytics com Plausible (script adicionado)
- [x] Sistema de avaliações (likes) nos artigos
- [x] Melhorias na busca (Prisma full-text)

### Fase 5: Melhorias de UI/UX e Infraestrutura
- [x] Página admin de moderação de comentários
- [x] Paginação em listas (posts admin)
- [x] Script de deploy (deploy.sh)
- [x] Configuração vercel.json para migrations automáticas
- [x] Seed do banco de dados (prisma/seed.ts)

### Fase 6: Funcionalidades Opcionais
- [x] Upload de imagens (Uploadthing)
- [x] Notificações por email para comentários (Resend)
- [x] Busca avançada com MeiliSearch

### Fase 7: Performance e Cache
- [ ] Adicionar cache com stale-while-revalidate nas páginas públicas
- [ ] Usar Next.js Image para todas as imagens (lazy loading, webp)
- [ ] Implementar revalidate por tags (posts, categorias)

### Fase 8: SEO Avançado
- [ ] Adicionar JSON-LD Schema para artigos
- [ ] Melhorar meta tags dinâmicas
- [ ] Canonical URLs corretas
- [ ] Breadcrumbs estruturados

### Fase 9: UI/UX Melhorias
- [ ] Melhores páginas de erro (404, 500)
- [ ] Loading skeletons mais completos
- [ ] Animações de transição entre páginas

### Fase 10: Developer Experience
- [ ] Adicionar ESLint/Prettier com regras rigorosas
- [ ] Configurar Husky pre-commit
- [ ] Component library reutilizável

### Fase 11: Funcionalidades Extras
- [ ] PWA com Service Worker
- [ ] Mais provedores OAuth (GitHub, Twitter/X)
- [ ] Multi-idioma (pt-BR/en-US)

---

## 📋 Pendentes

### Performance e Cache
- [ ] Adicionar stale-while-revalidate nas rotas públicas
- [ ] Otimizar todas as imagens com Next.js Image

### SEO Avançado
- [ ] JSON-LD para artigos
- [ ] Canonical URLs

### UI/UX
- [ ] Páginas de erro personalizadas
- [ ] Skeletons de carregamento

### Developer Experience
- [ ] ESLint + Prettier rigorosos
- [ ] Husky pre-commit hook

### Extras (Opcional)
- [ ] PWA
- [ ] Multi-idioma
- [ ] Mais OAuth providers

---

## 🐛 Bugs e Issues

| Prioridade | Descrição | Status |
|------------|-----------|--------|
| ~~Alta~~ | ~~API Route de categorias retorna erro 500 em build~~ | ✅ Corrigido |
| ~~Baixa~~ | ~~Imagens não estão sendo otimizadas~~ | ✅ Verificado (funcionando) |
| ~~Baixa~~ | ~~Editor de texto simples (textarea) - sem Rich Text~~ | ✅ Corrigido com Tiptap |

---

## 📊 Estatísticas

- **Arquivos criados**: ~100+
- **Categorias**: CRUD completo no admin
- **Tags**: CRUD completo no admin
- **Provedores Auth**: 3 (Google, Meta, Credentials)
- **shadcn/ui**: 11 componentes instalados
- **Admin**: Dashboard, Posts (criar/editar/listar), Categories, Tags, Comentários
- **Features**: Tiptap, Comentários, Newsletter, Visualizações, Ratings, Analytics, Rate Limiting, Uploadthing, MeiliSearch

### Recentes (fixes)
- [x] Configurar Upstash Redis (rate limiting)
- [x] Corrigir warning SSL do PostgreSQL (uselibpqcompat=true)

---

## 🔗 Links Úteis

- **Frontend**: http://localhost:3000
- **Sitemap**: http://localhost:3000/sitemap.xml
- **RSS Feed**: http://localhost:3000/feed.xml
- **Admin**: http://localhost:3000/admin
- **Admin Tags**: http://localhost:3000/admin/tags
- **Admin Categories**: http://localhost:3000/admin/categories
- **Admin Comments**: http://localhost:3000/admin/comments
- **Banco**: Neon (neondb)

---

## 🔑 Credenciais Padrão (Desenvolvimento)

Após executar `npx prisma db seed`:

- **Email**: `admin@cearaalternativo.com.br`
- **Senha**: `admin123`

---

*Atualizado em: 2026-04-27 18:45*