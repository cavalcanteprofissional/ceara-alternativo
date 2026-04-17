# Schema do Banco de Dados - Ceará Alternativo

## Visão Geral

Este documento descreve a estrutura do banco de dados PostgreSQL do portal Ceará Alternativo, incluindo schema, tabelas e políticas de Row Level Security (RLS).

## Tecnologias

- **Banco**: PostgreSQL (Neon)
- **ORM**: Prisma v7
- **Hospedagem**: Neon (dev) / Railway (produção futura)

---

## Diagram ER

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    User     │       │    Post     │       │  Category   │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id          │       │ id          │       │ id          │
│ name        │       │ title       │       │ name        │
│ email       │◄──────│ slug        │       │ slug        │
│ password    │       │ content     │       │ description │
│ role        │       │ excerpt     │       └─────────────┘
│ image       │       │ coverImage  │              ▲
│ createdAt   │       │ status      │              │
│ updatedAt   │       │ publishedAt │       ┌─────┴─────────┐
└──────┬──────┘       │ readingTime │       │   PostTag    │
       │              │ viewCount   │       ├─────────────┤
       │              │ authorId ───┼───────┤ postId       │
       └──────────────│ categoryId  │       │ tagId        │
                      │ createdAt   │       └──────────────┘
                      │ updatedAt   │              ▲
                      └─────────────┘              │
                                                 │
                                         ┌───────┴────────┐
                                         │      Tag       │
                                         ├────────────────┤
                                         │ id             │
                                         │ name           │
                                         │ slug           │
                                         │ createdAt      │
                                         └────────────────┘
```

---

## Tabelas

### User

Tabela de usuários do sistema (autenticação e autores de artigos).

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | String (cuid) | Identificador único |
| name | String? | Nome do usuário |
| email | String? (unique) | Email do usuário |
| emailVerified | DateTime? | Data de verificação do email |
| image | String? | URL do avatar |
| password | String? | Hash da senha (para credentials) |
| role | Enum (USER, ADMIN, EDITOR) | Papel do usuário |
| createdAt | DateTime | Data de criação |
| updatedAt | DateTime | Data de atualização |

**Roles:**
- `USER`: Usuário comum (leitor)
- `EDITOR`: Pode criar e editar artigos
- `ADMIN`: Acesso total ao sistema

---

### Post

Artigos/publicações do blog.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | String (cuid) | Identificador único |
| title | String | Título do artigo |
| slug | String (unique) | Slug para URL amigável |
| content | Text | Conteúdo markdown/HTML |
| excerpt | Text? | Resumo/descrição curta |
| coverImage | String? | URL da imagem de capa |
| status | Enum (DRAFT, PUBLISHED, ARCHIVED) | Status do artigo |
| publishedAt | DateTime? | Data de publicação |
| readingTime | Int? | Tempo estimado de leitura (min) |
| viewCount | Int | Contador de visualizações |
| authorId | String | FK para User |
| categoryId | String? | FK para Category |
| createdAt | DateTime | Data de criação |
| updatedAt | DateTime | Data de atualização |

**Statuses:**
- `DRAFT`: Rascunho (não visível publicamente)
- `PUBLISHED`: Publicado (visível)
- `ARCHIVED**: Arquivado (não visível, mantido para referência)

---

### Category

Categorias dos artigos (ex: Política, Cultura, Esportes).

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | String (cuid) | Identificador único |
| name | String (unique) | Nome da categoria |
| slug | String (unique) | Slug para URL |
| description | Text? | Descrição da categoria |
| createdAt | DateTime | Data de criação |
| updatedAt | DateTime | Data de atualização |

---

### Tag

Tags para artigos (sistema N:N com Post).

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | String (cuid) | Identificador único |
| name | String (unique) | Nome da tag |
| slug | String (unique) | Slug para URL |
| createdAt | DateTime | Data de criação |

---

### PostTag

Relação N:N entre Post e Tag.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| postId | String | FK para Post |
| tagId | String | FK para Tag |

**PK Composta**: (postId, tagId)

---

### Account

Contas de autenticação OAuth (NextAuth).

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | String (cuid) | Identificador único |
| userId | String | FK para User |
| type | String | Tipo de provider (oauth, credentials) |
| provider | String | Provider (google, facebook, etc) |
| providerAccountId | String | ID no provider externo |
| refresh_token | Text? | Token de refresh |
| access_token | Text? | Token de acesso |
| expires_at | Int? | Data de expiração |
| token_type | String? | Tipo do token |
| scope | String? | Escopos concedidos |
| id_token | Text? | ID token |
| session_state | String? | Estado da sessão |

**Índice Único**: (provider, providerAccountId)

---

### Session

Sessões ativas de usuários.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | String (cuid) | Identificador único |
| sessionToken | String (unique) | Token da sessão |
| userId | String | FK para User |
| expires | DateTime | Data de expiração |

---

### VerificationToken

Tokens para verificação de email.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| identifier | String | Identificador (email) |
| token | String (unique) | Token de verificação |
| expires | DateTime | Data de expiração |

**Índice Único**: (identifier, token)

---

## Row Level Security (RLS)

Policies para controle de acesso aos dados.

### Post

```sql
-- Usuários autenticados podem ver posts publicados
CREATE POLICY "Publicados são visíveis" ON "Post"
FOR SELECT USING (status = 'PUBLISHED');

-- Apenas autores podem ver seus próprios rascunhos
CREATE POLICY "Autores podem ver rascunhos" ON "Post"
FOR SELECT USING (
  auth.uid() = authorId OR status = 'PUBLISHED'
);

-- Apenas EDITOR e ADMIN podem criar posts
CREATE POLICY "Editores podem criar" ON "Post"
FOR INSERT WITH CHECK (auth.role() IN ('EDITOR', 'ADMIN'));

-- Apenas o autor pode atualizar seus posts
CREATE POLICY "Autor pode atualizar" ON "Post"
FOR UPDATE USING (auth.uid() = authorId OR auth.role() = 'ADMIN');

-- Apenas ADMIN pode deletar
CREATE POLICY "Admin pode deletar" ON "Post"
FOR DELETE USING (auth.role() = 'ADMIN');
```

### Category

```sql
-- Todos podem visualizar categorias
CREATE POLICY "Categorias públicas" ON "Category"
FOR SELECT USING (true);

-- Apenas ADMIN pode modificar
CREATE POLICY "Admin gerencia categorias" ON "Category"
FOR ALL USING (auth.role() = 'ADMIN');
```

### Tag

```sql
-- Todos podem visualizar tags
CREATE POLICY "Tags públicas" ON "Tag"
FOR SELECT USING (true);

-- Apenas ADMIN pode modificar
CREATE POLICY "Admin gerencia tags" ON "Tag"
FOR ALL USING (auth.role() = 'ADMIN');
```

### User

```sql
-- Usuários podem ver seus próprios dados
CREATE POLICY "Próprio usuário" ON "User"
FOR SELECT USING (auth.uid() = id);

-- Apenas ADMIN pode listar todos usuários
CREATE POLICY "Admin vê usuários" ON "User"
FOR SELECT USING (auth.role() = 'ADMIN');
```

---

## Índices

```sql
-- Post
CREATE INDEX "Post_slug_idx" ON "Post" (slug);
CREATE INDEX "Post_status_idx" ON "Post" (status);
CREATE INDEX "Post_publishedAt_idx" ON "Post" (publishedAt DESC);
CREATE INDEX "Post_authorId_idx" ON "Post" (authorId);
CREATE INDEX "Post_categoryId_idx" ON "Post" (categoryId);

-- Account
CREATE INDEX "Account_userId_idx" ON "Account" (userId);

-- Session
CREATE INDEX "Session_userId_idx" ON "Session" (userId);
```

---

##seed Dados Iniciais

### Categorias Predefinidas

```typescript
const categories = [
  { name: 'Política', slug: 'politica', description: 'Notícias políticas do Ceará' },
  { name: 'Cultura', slug: 'cultura', description: 'Cultura, arte e eventos' },
  { name: 'Esportes', slug: 'esportes', description: 'Esportes cearenses' },
  { name: 'Entretenimento', slug: 'entretenimento', description: 'Shows, cinema e entretenimento' },
  { name: 'Economia', slug: 'economia', description: 'Economia e negócios' },
  { name: 'Saúde', slug: 'saude', description: 'Saúde e bem-estar' },
]
```

### Usuário Admin Padrão

Para criar o admin inicial via seed:

```bash
npx prisma db seed
```

---

## Migrações

```bash
# Criar nova migração
npx prisma migrate dev --name nome_da_migracao

# Aplicar migrações em produção
npx prisma migrate deploy

# Resetar banco (desenvolvimento)
npx prisma migrate reset

# Visualizar schema
npx prisma migrate status
```

---

## Variáveis de Ambiente

```env
DATABASE_URL=postgresql://user:pass@host:5432/dbname?sslmode=require
```

---

##manutenção

### Backup

Neon faz backups automáticos com point-in-time recovery.

### Conexões

- Máximo recomendado: 10 conexões simultâneas
- Usar connection pooling em produção
- Prisma já gerencia via adapter

### Monitoramento

- Neon Dashboard: métricas de uso
- Prisma Studio: `npx prisma studio` (desenvolvimento)