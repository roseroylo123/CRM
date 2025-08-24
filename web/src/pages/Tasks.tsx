import React, { useEffect, useState } from 'react'
import api from '../api'
export default function Tasks(){
  const [tasks,setTasks] = useState<any[]>([])
  const [loading,setLoading] = useState(true)
  const [filter,setFilter] = useState<any>({ type:'', status:'' })
  async function load(){
    const params:any = {}
    if(filter.type) params.type = filter.type
    if(filter.status) params.status = filter.status
    const { data } = await api.get('/tasks', { params })
    setTasks(data); setLoading(false)
  }
  useEffect(()=>{ load() },[])
  async function updateStatus(id:string, status:string){ await api.patch(`/tasks/${id}`, { status }); load() }
  if(loading) return <div>Loading...</div>
  return <div>
    <div className="card" style={{marginBottom:12, display:'flex', gap:8, alignItems:'end'}}>
      <div><div style={{fontSize:12,opacity:.7}}>Type</div>
        <select className="card" onChange={e=>setFilter({...filter, type:e.target.value})}>
          <option value="">All</option>
          {['CONTENT','ONPAGE','OFFPAGE','AUDIT','BACKLINK','CALENDAR','SEMANTIC'].map(t=><option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div><div style={{fontSize:12,opacity:.7}}>Status</div>
        <select className="card" onChange={e=>setFilter({...filter, status:e.target.value})}>
          <option value="">All</option>
          {['NOT_STARTED','IN_PROGRESS','UPDATED','DUE','DONE','FIXED','VERIFIED','OPEN'].map(s=><option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <button className="btn" onClick={load}>Apply</button>
    </div>
    <div style={{display:'grid', gap:8}}>
      {tasks.map(t=>(
        <div key={t.id} className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div style={{fontSize:16, fontWeight:600}}>{t.title}</div>
              <div style={{opacity:.8, fontSize:12}}>{t.type} · {t.status} · {t.priority}</div>
              <div style={{opacity:.7, fontSize:12}}>{t.project?.client?.name} · {t.project?.name}</div>
              {t.url && <a href={t.url} target="_blank" style={{color:'#93c5fd', fontSize:12, textDecoration:'underline'}}>Open URL</a>}
            </div>
            <select className="card" defaultValue={t.status} onChange={e=>updateStatus(t.id, e.target.value)}>
              {['NOT_STARTED','IN_PROGRESS','UPDATED','DUE','DONE','FIXED','VERIFIED','OPEN'].map(s=><option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      ))}
    </div>
  </div>
}
