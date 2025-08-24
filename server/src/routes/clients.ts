import { Router } from 'express'
import { prisma } from '../prisma.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.get('/', requireAuth, async (_req,res)=>{
  const clients = await prisma.client.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(clients)
})
router.post('/', requireAuth, async (req,res)=>{
  const { name, domain, niche } = req.body
  const c = await prisma.client.create({ data: { name, domain, niche } })
  res.json(c)
})
export default router
