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

### Documentação
- [x] docs/database/SCHEMA.md - Schema completo do banco
- [x] docs/database/RLS.md - Políticas Row Level Security

---

## 📋 Pendentes (Próximas Etapas)

### Prioridade Alta
- [ ] Adicionar sistema de tags completo (CRUD)
- [ ] shadcn/ui - instalar e configurar
- [ ] Preview de artigos antes de publicar
- [ ] Editar posts existentes no admin

### Prioridade Média
- [ ] Newsletter (Resend/Mailgun)
- [ ] Sistema de comentários
- [ ] Contagem de visualizações por artigo
- [ ] Rate limiting em API Routes

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

- **Arquivos criados**: ~50+
- **Categorias criadas**: 6
- **Provedores Auth**: 3 (Google, Meta, Credentials)
- **Pages criadas**: Homepage, Login, Register, Artigo, Categoria, Busca, Sobre, Contato, Admin, etc

---

## 🔗 Links Úteis

- **Frontend**: http://localhost:3000
- **Sitemap**: http://localhost:3000/sitemap.xml
- **RSS Feed**: http://localhost:3000/feed.xml
- **Admin**: http://localhost:3000/admin
- **Banco**: Neon (neondb)

---

*Atualizado em: 2026-04-17*