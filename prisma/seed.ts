import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const { Pool } = pg

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Starting seed...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@cearaalternativo.com.br' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@cearaalternativo.com.br',
      password: adminPassword,
      role: 'ADMIN',
    },
  })
  console.log('Admin user created:', admin.email)

  // Create categories
  const categories = [
    { name: 'Política', slug: 'politica', description: 'Notícias políticas do Ceará e do Brasil' },
    { name: 'Cultura', slug: 'cultura', description: 'Arte, música, cinema e eventos culturais' },
    { name: 'Esportes', slug: 'esportes', description: 'Futebol, beach tennis e demais esportes' },
    { name: 'Entretenimento', slug: 'entretenimento', description: 'Festas, eventos e diversão' },
    { name: 'Economia', slug: 'economia', description: 'Negócios, turismo e economia cearense' },
    { name: 'Saúde', slug: 'saude', description: 'Saúde pública e bem-estar' },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }
  console.log('Categories created:', categories.length)

  // Create tags
  const tags = [
    { name: 'Fortaleza', slug: 'fortaleza' },
    { name: 'Sertão', slug: 'sertao' },
    { name: 'Litoral', slug: 'litoral' },
    { name: 'Praias', slug: 'praias' },
    { name: 'Gastronomia', slug: 'gastronomia' },
    { name: 'Turismo', slug: 'turismo' },
    { name: 'Beach Tennis', slug: 'beach-tennis' },
    { name: 'Ceará SC', slug: 'ceara-sc' },
    { name: 'Fortaleza-CE', slug: 'fortaleza-ce' },
    { name: 'Cultura Popular', slug: 'cultura-popular' },
  ]

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    })
  }
  console.log('Tags created:', tags.length)

  // Create sample post
  const category = await prisma.category.findUnique({ where: { slug: 'cultura' } })
  
  if (category && admin) {
    const post = await prisma.post.findFirst({
      where: { slug: 'primeiro-artigo-do-blog' }
    })

    if (!post) {
      await prisma.post.create({
        data: {
          title: 'Primeiro Artigo do Ceará Alternativo',
          slug: 'primeiro-artigo-do-blog',
          content: `Bem-vindo ao Ceará Alternativo!\n\nEste é o primeiro artigo do nosso portal de notícias e entretenimento do Ceará.\n\nAqui você encontrará as melhores novidades sobre:\n\n- Política local e nacional\n- Cultura e tradição nordestina\n- Esportes cearenses\n- Economia e turismo\n- Entretenimento e eventos\n\nFique ligado nas atualizações!`,
          excerpt: 'Bem-vindo ao Ceará Alternativo, seu portal de notícias do Ceará.',
          coverImage: 'https://images.unsplash.com/photo-1570126613385-6f2c0c94c620?w=1200&h=600&fit=crop',
          status: 'PUBLISHED',
          publishedAt: new Date(),
          readingTime: 3,
          viewCount: 100,
          authorId: admin.id,
          categoryId: category.id,
        },
      })
      console.log('Sample post created')
    }
  }

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })