import { prisma } from '@/lib/prisma'

export async function GET() {
  const baseUrl = process.env.AUTH_URL || 'http://localhost:3000'

  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    include: {
      author: { select: { name: true } },
      category: { select: { name: true, slug: true } },
    },
    orderBy: { publishedAt: 'desc' },
    take: 50,
  })

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ceará Alternativo</title>
    <description>Portal de notícias e entretenimento do Ceará</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt || post.content.substring(0, 200)}]]></description>
      <link>${baseUrl}/artigo/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/artigo/${post.slug}</guid>
      <pubDate>${post.publishedAt?.toUTCString()}</pubDate>
      <author>${post.author.name || 'Ceará Alternativo'}</author>
      ${post.category ? `<category>${post.category.name}</category>` : ''}
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}