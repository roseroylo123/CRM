import { Router } from 'express'
import { prisma } from '../prisma.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.get('/', requireAuth, async (req,res)=>{
  const { projectId, type, status, assigneeId } = req.query
  const tasks = await prisma.task.findMany({
    where: {
      projectId: projectId ? String(projectId) : undefined,
      type: type ? String(type) as any : undefined,
      status: status ? String(status) as any : undefined,
      assigneeId: assigneeId ? String(assigneeId) : undefined
    },
    include: { project: { include: { client: true } }, assignee: true },
    orderBy: { createdAt: 'desc' }
  })
  res.json(tasks)
})
router.post('/', requireAuth, async (req,res)=>{
  const { projectId, assigneeId, type, title, url, status, priority, details, deadline } = req.body
  const t = await prisma.task.create({ data: { projectId, assigneeId, type, title, url, status, priority, details, deadline } })
  res.json(t)
})
router.patch('/:id', requireAuth, async (req,res)=>{
  const { id } = req.params
  const { status, assigneeId, priority, title, url, details, deadline } = req.body
  const t = await prisma.task.update({ where: { id }, data: { status, assigneeId, priority, title, url, details, deadline, lastUpdated: new Date() } })
  res.json(t)
})
export default router
