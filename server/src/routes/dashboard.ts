import { Router } from 'express'
import { prisma } from '../prisma.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.get('/summary', requireAuth, async (_req,res)=>{
  const [projectCount, taskCount, tasksByStatus, tasksByType, upcoming] = await Promise.all([
    prisma.project.count(),
    prisma.task.count(),
    prisma.task.groupBy({ by: ['status'], _count: { status: true } }),
    prisma.task.groupBy({ by: ['type'], _count: { type: true } }),
    prisma.task.findMany({
      where: { deadline: { gte: new Date(), lte: new Date(Date.now()+1000*60*60*24*7) } },
      include: { project: { include: { client: true } }, assignee: true },
      orderBy: { deadline: 'asc' }
    })
  ])
  const done = await prisma.task.count({ where: { status: { in: ['DONE','VERIFIED','FIXED'] } } })
  const completion = taskCount ? done / taskCount : 0
  res.json({ projectCount, taskCount, completion, tasksByStatus, tasksByType, upcoming })
})
export default router
