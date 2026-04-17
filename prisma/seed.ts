import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const { Pool } = pg

async function main() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL not set')
  }

  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })

  const categories = [
    { name: 'Política', slug: 'politica', description: 'Notícias políticas do Ceará e do Brasil' },
    { name: 'Cultura', slug: 'cultura', description: 'Arte, música, teatro e eventos culturais' },
    { name: 'Esportes', slug: 'esportes', description: 'Futebol, esportes Olímpico e Paraolímpico' },
    { name: 'Entretenimento', slug: 'entretenimento', description: 'Shows, cinema, televisão e internet' },
    { name: 'Economia', slug: 'economia', description: 'Economia, negócios e mercado de trabalho' },
    { name: 'Saúde', slug: 'saude', description: 'Saúde, bem-estar e medicina' },
  ]

  for (const cat of categories) {
    const existing = await prisma.category.findUnique({
      where: { slug: cat.slug },
    })

    if (!existing) {
      await prisma.category.create({ data: cat })
      console.log(`Created category: ${cat.name}`)
    } else {
      console.log(`Category already exists: ${cat.name}`)
    }
  }

  console.log('Categories seeded successfully!')
  await prisma.$disconnect()
}

main().catch((error) => {
  console.error('Seed error:', error)
  process.exit(1)
})