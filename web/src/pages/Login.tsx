import React, { useState } from 'react'
import { useAuth } from '../context'
import { useNavigate } from 'react-router-dom'
export default function Login(){
  const { login } = useAuth()
  const nav = useNavigate()
  const [email,setEmail] = useState('admin@agency.local')
  const [password,setPassword] = useState('admin123')
  const [err,setErr] = useState<string|null>(null)
  const [loading,setLoading] = useState(false)
  async function submit(e:React.FormEvent){ e.preventDefault(); setErr(null); setLoading(true); try{ await login(email,password); nav('/dashboard') } catch(e:any){ setErr(e?.response?.data?.error||'Login failed') } finally{ setLoading(false) } }
  return <div className="card" style={{maxWidth:420, margin:'40px auto'}}>
    <h1 style={{fontSize:22, marginBottom:8}}>Login</h1>
    <form onSubmit={submit} style={{display:'flex', flexDirection:'column', gap:8}}>
      <input className="card" style={{padding:8}} value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input className="card" style={{padding:8}} type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
      {err && <div style={{color:'#f87171'}}>{err}</div>}
      <button className="btn" disabled={loading}>{loading? '...' : 'Login'}</button>
    </form>
  </div>
}
