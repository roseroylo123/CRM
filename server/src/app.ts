import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import clientRoutes from './routes/clients.js'
import projectRoutes from './routes/projects.js'
import taskRoutes from './routes/tasks.js'
import dashboardRoutes from './routes/dashboard.js'

dotenv.config()
export const app = express()
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(morgan('dev'))

app.get('/health', (_req,res)=>res.json({ ok:true }))
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/clients', clientRoutes)
app.use('/projects', projectRoutes)
app.use('/tasks', taskRoutes)
app.use('/dashboard', dashboardRoutes)
