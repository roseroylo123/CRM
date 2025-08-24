# SEO Agency CRM/CMS (MVP)

Self-hostable mini CRM/CMS for an SEO agency.

## Quick Dev Start
- Backend: Node.js + Express + Prisma (SQLite by default)
- Frontend: React (Vite + TS + Tailwind)
- Auth: JWT

### Backend
```
cd server
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run seed
npm run dev
```
API: http://localhost:4000

### Frontend
```
cd web
cp .env.example .env
npm install
npm run dev
```
Web: http://localhost:5173

### Default Admin (after seed)
- email: admin@agency.local
- password: admin123
