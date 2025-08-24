import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()

async function main(){
  const hash = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@agency.local' },
    update: {},
    create: { name: 'Admin', email: 'admin@agency.local', password: hash, role: 'ADMIN' as Role }
  })
  const member = await prisma.user.upsert({
    where: { email: 'member@agency.local' },
    update: {},
    create: { name: 'Member', email: 'member@agency.local', password: hash, role: 'MEMBER' as Role }
  })
  const client = await prisma.client.create({ data: { name: 'Ninja Fence Staining', domain: 'ninjafencestaining.com', niche: 'Home Services' } })
  const project = await prisma.project.create({ data: { name: 'Ninja Local SEO', clientId: client.id, managerId: admin.id } })
  await prisma.task.createMany({
    data: [
      { projectId: project.id, assigneeId: member.id, type: 'CONTENT', title: 'Blog: Fence stain colors', status: 'IN_PROGRESS' },
      { projectId: project.id, assigneeId: admin.id, type: 'AUDIT', title: 'Fix LCP on homepage', status: 'OPEN' }
    ]
  })
  console.log('Seed complete')
}
main().finally(()=>prisma.$disconnect())
