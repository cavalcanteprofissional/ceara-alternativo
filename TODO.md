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
- [x] Componentes: Button, Input, Textarea, Label, Dialog, Badge, Table, Skeleton, Sonner
- [x] CRUD de Tags (/admin/tags)
- [x] CRUD de Categorias (/admin/categories)
- [x] Menu admin atualizado com Tags

### Etapa 5: Editor de Artigos Completo
- [x] Preview de artigos (toggle Editar/Preview)
- [x] Editar posts existentes no admin (/admin/posts/[id])
- [x] Sistema de tags nos formulários
- [x] API Routes atualizadas para suportar tags

### Documentação
- [x] docs/database/SCHEMA.md - Schema completo do banco
- [x] docs/database/RLS.md - Políticas Row Level Security
- [x] TODO.md - Registro de progresso

---

## 📋 Pendentes (Próximas Etapas)

### Prioridade Alta
- [ ] Sistema de visualizações por artigo
- [ ] Rate limiting em API Routes

### Prioridade Média
- [ ] Newsletter (Resend/Mailgun)
- [ ] Sistema de comentários
- [ ] Editor de texto rico (Tiptap/Quill)

### Prioridade Baixa (Fase 2)
- [ ] Integração com MeiliSearch/Algolia para busca avançada
- [ ] Sistema de avaliações de artigos
- [ ] Analytics (Plausible/Sentry)

---

## 🐛 Bugs e Issues

| Prioridade | Descrição | Status |
|------------|-----------|--------|
| Alta | API Route de categorias retorna erro 500 em build (precisa de adapter) | Aberto |
| Média | Imagens não estão sendo otimizadas | Aberto |
| Baixa | Editor de texto simples (textarea) - sem Rich Text | Aberto |

---

## 📊 Estatísticas

- **Arquivos criados**: ~70+
- **Categorias criadas**: 6
- **Tags**: CRUD completo no admin
- **Provedores Auth**: 3 (Google, Meta, Credentials)
- **shadcn/ui**: 9 componentes instalados
- **Admin**: Dashboard, Posts (criar/editar/listar), Categories, Tags

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

*Atualizado em: 2026-04-17*