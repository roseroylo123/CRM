import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
export interface AuthedRequest extends Request { user?: { id:string; role:string; email:string } }
export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction){
  const header = req.headers.authorization
  if(!header) return res.status(401).json({ error:'Missing Authorization' })
  const token = header.replace('Bearer ','')
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET||'changeme') as any
    req.user = { id: payload.id, role: payload.role, email: payload.email }
    next()
  } catch { return res.status(401).json({ error:'Invalid token' }) }
}
export function requireRole(roles: string[]){
  return (req: AuthedRequest, res: Response, next: NextFunction)=>{
    if(!req.user) return res.status(401).json({ error:'Unauthorized' })
    if(!roles.includes(req.user.role)) return res.status(403).json({ error:'Forbidden' })
    next()
  }
}
