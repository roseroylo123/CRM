import { Router } from 'express'
import { prisma } from '../prisma.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = Router()
router.post('/login', async (req,res)=>{
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if(!user) return res.status(401).json({ error:'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.password)
  if(!ok) return res.status(401).json({ error:'Invalid credentials' })
  const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_SECRET||'changeme', { expiresIn: '7d' })
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
})
export default router
