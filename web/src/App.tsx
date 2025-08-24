import React from 'react'
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
import { Provider, useAuth } from './context'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Tasks from './pages/Tasks'

function Layout({children}:{children:React.ReactNode}){
  const { user, logout } = useAuth()
  const nav = useNavigate()
  return <div>
    <header style={{padding:12, display:'flex', gap:16, alignItems:'center', justifyContent:'space-between', background:'#0F172A'}}>
      <div style={{fontWeight:700}}>SEO Agency CRM</div>
      <nav style={{display:'flex', gap:12}}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/tasks">Tasks</Link>
      </nav>
      <div>{user ? <button className="btn" onClick={()=>{ logout(); nav('/login') }}>Logout</button> : <Link className="btn" to="/login">Login</Link>}</div>
    </header>
    <main style={{padding:16}}>{children}</main>
  </div>
}

function Private({children}:{children:JSX.Element}){
  const { user } = useAuth()
  if(!user) return <Navigate to="/login" replace />
  return children
}

export default function App(){
  return <Provider>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Layout><Private><Dashboard/></Private></Layout>} />
      <Route path="/projects" element={<Layout><Private><Projects/></Private></Layout>} />
      <Route path="/tasks" element={<Layout><Private><Tasks/></Private></Layout>} />
    </Routes>
  </Provider>
}
