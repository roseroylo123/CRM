import React, { useEffect, useState } from 'react'
import api from '../api'
export default function Projects(){
  const [projects,setProjects] = useState<any[]>([])
  const [clients,setClients] = useState<any[]>([])
  const [users,setUsers] = useState<any[]>([])
  const [form,setForm] = useState<any>({ name:'', clientId:'', managerId:'', status:'IN_PROGRESS', priority:'MEDIUM' })
  const [loading,setLoading] = useState(true)
  useEffect(()=>{ (async()=>{
    const [p,c] = await Promise.all([api.get('/projects'), api.get('/clients')])
    setProjects(p.data); setClients(c.data); try{ const u = await api.get('/users'); setUsers(u.data) }catch{}
    setLoading(false)
  })() },[])
  async function addProject(){
    if(!form.name || !form.clientId || !form.managerId) return
    const { data } = await api.post('/projects', form)
    setProjects([data, ...projects])
  }
  if(loading) return <div>Loading...</div>
  return <div className="grid" style={{display:'grid', gridTemplateColumns:'300px 1fr', gap:16}}>
    <div className="card">
      <h2 style={{fontSize:18,fontWeight:600,marginBottom:8}}>New Project</h2>
      <input className="card" style={{padding:8, marginBottom:6}} placeholder="Project name" onChange={e=>setForm({...form, name:e.target.value})} />
      <select className="card" style={{padding:8, marginBottom:6}} onChange={e=>setForm({...form, clientId:e.target.value})}>
        <option value="">Client</option>
        {clients.map((c:any)=><option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <select className="card" style={{padding:8, marginBottom:6}} onChange={e=>setForm({...form, managerId:e.target.value})}>
        <option value="">Manager</option>
        {users.map((u:any)=><option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
      </select>
      <select className="card" style={{padding:8, marginBottom:6}} onChange={e=>setForm({...form, status:e.target.value})}>
        {['IN_PROGRESS','DUE','DONE'].map(s=><option key={s} value={s}>{s}</option>)}
      </select>
      <select className="card" style={{padding:8, marginBottom:10}} onChange={e=>setForm({...form, priority:e.target.value})}>
        {['HIGH','MEDIUM','LOW'].map(s=><option key={s} value={s}>{s}</option>)}
      </select>
      <button className="btn" onClick={addProject}>Add</button>
    </div>
    <div>
      {projects.map((p:any)=>(
        <div key={p.id} className="card" style={{marginBottom:10}}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <div>
              <div style={{fontWeight:600}}>{p.name}</div>
              <div style={{opacity:.7, fontSize:12}}>{p.client?.name} · Manager: {p.manager?.name}</div>
            </div>
            <div style={{textAlign:'right', fontSize:14}}>
              <div>Status: <b>{p.status}</b></div>
              <div>Priority: <b>{p.priority}</b></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
}
