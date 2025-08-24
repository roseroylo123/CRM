import { Router } from 'express'
import { prisma } from '../prisma.js'
import { requireAuth, requireRole } from '../middleware/auth.js'
import bcrypt from 'bcryptjs'

const router = Router()
router.get('/', requireAuth, requireRole(['ADMIN']), async (_req,res)=>{
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(users.map(u=>({ id:u.id, name:u.name, email:u.email, role:u.role })))
})
router.post('/', requireAuth, requireRole(['ADMIN']), async (req,res)=>{
  const { name, email, role, password } = req.body
  const hash = await bcrypt.hash(password||'password123', 10)
  const u = await prisma.user.create({ data: { name, email, role, password: hash } })
  res.json({ id:u.id, name:u.name, email:u.email, role:u.role })
})
export default router
