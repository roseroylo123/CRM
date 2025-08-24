import React, { useEffect, useState } from 'react'
import api from '../api'
export default function Dashboard(){
  const [data,setData] = useState<any>(null)
  const [loading,setLoading] = useState(true)
  useEffect(()=>{ (async()=>{ const r = await api.get('/dashboard/summary'); setData(r.data); setLoading(false) })() },[])
  if(loading) return <div>Loading...</div>
  return <div className="grid" style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:16}}>
    <div className="card"><h2 style={{fontSize:18,fontWeight:600,marginBottom:6}}>Summary</h2>
      <div>Projects: <b>{data.projectCount}</b></div>
      <div>Tasks: <b>{data.taskCount}</b></div>
      <div>Completion: <b>{Math.round(data.completion*100)}%</b></div>
    </div>
    <div className="card"><h2 style={{fontSize:18,fontWeight:600,marginBottom:6}}>Tasks by Status</h2>
      <ul>{data.tasksByStatus.map((s:any)=>(<li key={s.status} style={{display:'flex',justifyContent:'space-between'}}><span>{s.status}</span><b>{s._count.status}</b></li>))}</ul>
    </div>
    <div className="card"><h2 style={{fontSize:18,fontWeight:600,marginBottom:6}}>Tasks by Type</h2>
      <ul>{data.tasksByType.map((t:any)=>(<li key={t.type} style={{display:'flex',justifyContent:'space-between'}}><span>{t.type}</span><b>{t._count.type}</b></li>))}</ul>
    </div>
    <div className="card"><h2 style={{fontSize:18,fontWeight:600,marginBottom:6}}>Upcoming (7 days)</h2>
      {!data.upcoming.length && <div>No deadlines next 7 days.</div>}
      <ul>{data.upcoming.map((t:any)=>(<li key={t.id} style={{borderBottom:'1px solid #1f2937', padding:'6px 0'}}>
        <div style={{opacity:.8,fontSize:12}}>{t.type} · {t.status} · {(t.deadline||'').slice(0,10)}</div>
        <div style={{fontWeight:600}}>{t.title}</div>
        <div style={{opacity:.7,fontSize:12}}>{t.project?.client?.name} · {t.project?.name}</div>
      </li>))}</ul>
    </div>
  </div>
}
