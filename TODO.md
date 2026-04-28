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
- [ ] Busca avançada com MeiliSearch (problemas - considerar替代方案)

### Fase 7: Performance e Cache
- [x] Adicionar cache com stale-while-revalidate nas páginas públicas
- [x] Usar Next.js Image para todas as imagens (lazy loading, webp)
- [ ] Implementar revalidate por tags (posts, categorias)

### Fase 8: SEO Avançado
- [x] Adicionar JSON-LD Schema para artigos
- [x] Melhorar meta tags dinâmicas
- [x] Canonical URLs corretas
- [x] Breadcrumbs estruturados

### Fase 9: UI/UX Melhorias
- [x] Melhores páginas de erro (404, 500)
- [x] Loading skeletons mais completos
- [x] Animações de transição entre páginas

### Fase 10: Developer Experience
- [x] Adicionar ESLint/Prettier com regras rigorosas
- [x] Script precommit para lint manual
- [x] Component library reutilizável (shadcn/ui)

### Fase 11: Funcionalidades Extras
- [x] GitHub OAuth provider adicionado (.env)
- [x] PWA manifest.json
- [x] Twitter/X OAuth provider

### Fase 12: i18n (Multi-idioma)
- [x] next-intl library install
- [x] Criar message files (pt-BR.json, en.json)
- [x] Criar middleware para locale detection
- [x] Criar i18n config
- [x] Atualizar rotas com [locale]
- [x] Adicionar language switcher
- [x] Resolver erro do script Plausible (@next/third-parties)
- [x] Corrigir estrutura (remover rotas conflitantes)
- [x] Corrigir theme-provider (remover enableSystem)
- [x] Corrigir HTML nesting (2 layouts com html/body)
- [x] Implementar theme manual sem next-themes (resolve Turbopack warning)
- [x] Corrigir sonner.tsx (remover next-themes)
- [x] Remover rotas antigas duplicadas (public)/(routes)
- [x] Corrigir localePrefix para 'never' (resolve 404 em todas rotas)
- [x] Corrigir i18n/navigation.ts para usar createNavigation do next-intl v4
- [x] Corrigir LanguageSwitcher para usar useLocale do next-intl
- [x] Corrigir Header com links usando locale atual
- [x] Adicionar dynamic='force-dynamic' nas páginas (solve build prerender errors)
- [x] Configurar NextIntlClientProvider no locale layout
- [x] Criar next-intl.config.ts e src/i18n/request.ts
- [x] Todas rotas i18n funcionando corretamente

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
- **Features**: Tiptap, Comentários, Newsletter, Visualizações, Ratings, Rate Limiting, Uploadthing, Busca PostgreSQL

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

*Atualizado em: 2026-04-27 19:15*

---

## 🔮 Próximas Fases (Planejado)

### Fase 13: Limpeza e Otimização

| # | Tarefa | Descrição |
|---|--------|-----------|
| 1 | Remover MeiliSearch | Substituir por PostgreSQL Full-Text Search (já implementado via Prisma contains) |
| 2 | Configurar indexes PostgreSQL | Adicionar índices para busca full-text em title e content |
| 3 | Limpar código morto | Remover arquivos/constants não usados |

### Fase 14: Melhorias de Busca

| # | Tarefa | Descrição |
|---|--------|-----------|
| 1 | PostgreSQL Full-Text | Usar `to_tsvector` e `plainto_tsquery` do PostgreSQL |
| 2 | Busca com highlight | Destacar termos encontrados nos resultados |
| 3 | Filtros avançados | Busca por categoria, data, autor |

### Fase 15: Performance

| # | Tarefa | Descrição |
|---|--------|-----------|
| 1 | Analytics simples | Implementar contagem de visualizações sem serviços externos |
| 2 | Otimização de imagens | Verificar uso do Next.js Image em todos os lugares |
| 3 | Cache API responses | Adicionar cache às rotas de API |

### Fase 16: Funcionalidades Extras

| # | Tarefa | Descrição |
|---|--------|-----------|
| 1 | Newsletter | Completar sistema de newsletter com Resend |
| 2 | Social sharing | Adicionar botões de compartilhar em artigos |
| 3 | Breadcrumbs | Implementar breadcrumbs em todas as páginas |
| 4 | Related posts | Mostrar artigos relacionados no final de cada post |

### Fase 17: UI/UX

| # | Tarefa | Descrição |
|---|--------|-----------|
| 1 | Skeleton loading | Melhorar estados de carregamento |
| 2 | Animações Framer Motion | Adicionar transições suaves |
| 3 | Dark mode colors | Revisar cores para modo escuro |
| 4 | Mobile menu | Melhorar navegação mobile |

---

### 📋 Notas Técnicas

#### Sobre MeiliSearch:
- **Problema**: Serviço externo com custos adicionais
- **Solução atual**: Busca via Prisma `contains` (funciona bem paramedium sites)
- **Alternativa futura**: PostgreSQL Full-Text Search com `to_tsvector`

#### Alternativas consideradas:
1. **PostgreSQL Full-Text** → Já implementado, nenhum custo adicional
2. **Algolia** → SaaS pago, excelente mas custo
3. **Typesense** → Open source similar ao MeiliSearch
4. **Elasticsearch** → Muito pesado para este projeto