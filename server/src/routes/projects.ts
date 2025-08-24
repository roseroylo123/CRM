import { Router } from 'express'
import { prisma } from '../prisma.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.get('/', requireAuth, async (_req,res)=>{
  const projects = await prisma.project.findMany({ include: { client:true, manager:true } })
  res.json(projects)
})
router.post('/', requireAuth, async (req,res)=>{
  const { name, clientId, managerId, startDate, dueDate, status, priority, notes } = req.body
  const p = await prisma.project.create({ data: { name, clientId, managerId, startDate, dueDate, status, priority, notes } })
  res.json(p)
})
export default router
