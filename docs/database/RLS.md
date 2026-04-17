# Políticas RLS - Row Level Security

## Visão Geral

Este documento detalha as políticas de segurança a nível de linha (Row Level Security) para o banco de dados PostgreSQL do Ceará Alternativo.

> **Nota**: Neon (PostgreSQL gerenciado) suporta nativamente RLS. As políticas abaixo são SQL puros que podem ser executados diretamente no banco.

---

## Políticas por Tabela

### 1. User - Usuários

```sql
-- Usuário autenticado pode ler seu próprio perfil
CREATE POLICY "users_select_own" ON "User"
FOR SELECT
USING (id = current_setting('app.current_user_id', true)::uuid);

-- Usuário pode atualizar seu próprio perfil
CREATE POLICY "users_update_own" ON "User"
FOR UPDATE
USING (id = current_setting('app.current_user_id', true)::uuid);

-- Apenas ADMIN pode criar usuários
CREATE POLICY "users_insert_admin" ON "User"
FOR INSERT
WITH CHECK (
  current_setting('app.current_user_role', true) = 'ADMIN'
);

-- Apenas ADMIN pode deletar
CREATE POLICY "users_delete_admin" ON "User"
FOR DELETE
USING (current_setting('app.current_user_role', true) = 'ADMIN');

-- ADMIN pode selecionar qualquer usuário
CREATE POLICY "users_select_admin" ON "User"
FOR SELECT
USING (current_setting('app.current_user_role', true) = 'ADMIN');
```

### 2. Post - Artigos

```sql
-- Todos podem ler posts publicados
CREATE POLICY "posts_select_published" ON "Post"
FOR SELECT
USING (status = 'PUBLISHED');

-- Autores podem ler seus rascunhos
CREATE POLICY "posts_select_own_draft" ON "Post"
FOR SELECT
USING (
  author_id = current_setting('app.current_user_id', true)::uuid
);

-- EDITOR e ADMIN podem criar posts
CREATE POLICY "posts_insert_editor" ON "Post"
FOR INSERT
WITH CHECK (
  current_setting('app.current_user_role', true) IN ('EDITOR', 'ADMIN')
);

-- Autor pode atualizar seus próprios posts
CREATE POLICY "posts_update_own" ON "Post"
FOR UPDATE
USING (author_id = current_setting('app.current_user_id', true)::uuid);

-- ADMIN pode atualizar qualquer post
CREATE POLICY "posts_update_admin" ON "Post"
FOR UPDATE
USING (current_setting('app.current_user_role', true) = 'ADMIN');

-- ADMIN pode deletar posts
CREATE POLICY "posts_delete_admin" ON "Post"
FOR DELETE
USING (current_setting('app.current_user_role', true) = 'ADMIN');
```

### 3. Category - Categorias

```sql
-- Todos podem ler categorias
CREATE POLICY "categories_select_all" ON "Category"
FOR SELECT
USING (true);

-- Apenas ADMIN pode modificar
CREATE POLICY "categories_manage_admin" ON "Category"
FOR ALL
USING (current_setting('app.current_user_role', true) = 'ADMIN');
```

### 4. Tag - Tags

```sql
-- Todos podem ler tags
CREATE POLICY "tags_select_all" ON "Tag"
FOR SELECT
USING (true);

-- Apenas ADMIN pode modificar
CREATE POLICY "tags_manage_admin" ON "Tag"
FOR ALL
USING (current_setting('app.current_user_role', true) = 'ADMIN');
```

### 5. PostTag - Relação Post-Tag

```sql
-- Leitura pública para posts publicados
CREATE POLICY "posttags_select_published" ON "PostTag"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "Post" p
    WHERE p.id = post_id AND p.status = 'PUBLISHED'
  )
);

-- Apenas ADMIN pode modificar
CREATE POLICY "posttags_manage_admin" ON "PostTag"
FOR ALL
USING (current_setting('app.current_user_role', true) = 'ADMIN');
```

### 6. Account - Contas OAuth

```sql
-- Usuário pode ver suas próprias contas
CREATE POLICY "accounts_select_own" ON "Account"
FOR SELECT
USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- AUTH insert (NextAuth cria automaticamente)
CREATE POLICY "accounts_insert_auth" ON "Account"
FOR INSERT
WITH CHECK (true);

-- Usuário pode atualizar suas próprias contas
CREATE POLICY "accounts_update_own" ON "Account"
FOR UPDATE
USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- Usuário pode deletar suas próprias contas
CREATE POLICY "accounts_delete_own" ON "Account"
FOR DELETE
USING (user_id = current_setting('app.current_user_id', true)::uuid);
```

### 7. Session - Sessões

```sql
-- Usuário pode ver suas próprias sessões
CREATE POLICY "sessions_select_own" ON "Session"
FOR SELECT
USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- AUTH insert (NextAuth cria automaticamente)
CREATE POLICY "sessions_insert_auth" ON "Session"
FOR INSERT
WITH CHECK (true);

-- Usuário pode deletar suas próprias sessões
CREATE POLICY "sessions_delete_own" ON "Session"
FOR DELETE
USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- ADMIN pode ver todas as sessões
CREATE POLICY "sessions_select_admin" ON "Session"
FOR SELECT
USING (current_setting('app.current_user_role', true) = 'ADMIN');

-- ADMIN pode deletar qualquer sessão
CREATE POLICY "sessions_delete_admin" ON "Session"
FOR DELETE
USING (current_setting('app.current_user_role', true) = 'ADMIN');
```

### 8. VerificationToken - Tokens de Verificação

```sql
-- AUTH insere tokens
CREATE POLICY "verificationtoken_insert_auth" ON "VerificationToken"
FOR INSERT
WITH CHECK (true);

-- AUTH verifica tokens (select individual)
CREATE POLICY "verificationtoken_select_auth" ON "VerificationToken"
FOR SELECT
USING (true);

-- AUTH deleta após uso
CREATE POLICY "verificationtoken_delete_auth" ON "VerificationToken"
FOR DELETE
USING (true);
```

---

## Ativando RLS

```sql
-- Habilitar RLS em cada tabela
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Post" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Category" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Tag" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PostTag" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Account" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Session" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "VerificationToken" ENABLE ROW LEVEL SECURITY;
```

---

## Funções Auxiliares

Para facilitar o uso com Prisma/NextAuth, criar funções que definem o contexto do usuário:

```sql
-- Função para definir o usuário atual (chamada na conexão)
CREATE OR REPLACE FUNCTION set_user_context()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM set_config('app.current_user_id', NEW.user_id::text, false);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para Session
CREATE TRIGGER set_user_context_on_session
AFTER INSERT ON "Session"
FOR EACH ROW
EXECUTE FUNCTION set_user_context();

-- Função para buscar role do usuário atual
CREATE OR REPLACE FUNCTION get_current_user_role()
RETURNS TEXT AS $$
BEGIN
  RETURN current_setting('app.current_user_role', true);
END;
$$ LANGUAGE plpgsql STABLE;
```

---

## Alternativa: Validação na Aplicação

Como o Neon/Prisma não expõe diretamente configurações de sessão para RLS, a abordagem recomendada é:

1. **Validar na aplicação** (Next.js API Routes)
2. **Verificar permissões antes de mutations**
3. **Usar middleware de autenticação**

Exemplo de verificação em API Route:

```typescript
// app/api/posts/route.ts
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await auth()
  
  if (!session || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  // ... criar post
}
```

---

## Scripts SQL Completos

Ver arquivo: `scripts/rls-policies.sql`

---

## Testando as Políticas

```bash
# Acessar banco via psql
psql $DATABASE_URL

-- Verificar se RLS está habilitado
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND rowsecurity = true;
```

---

## Boas Práticas

1. **Principle of Least Privilege**: Comece com políticas restritivas
2. **Teste local**: Valide políticas em desenvolvimento antes de produção
3. **Auditoria**: Log de tentativas de acesso negado
4. **Manutenção**: Documente políticas atualizadas
5. **Monitoramento**: Use Neon analytics para verificar performance