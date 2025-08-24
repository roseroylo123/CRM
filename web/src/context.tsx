import React, { createContext, useContext, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import api from './api'
type User = { id:string; name:string; email:string; role:string }
type Ctx = { user:User|null; login:(e:string,p:string)=>Promise<void>; logout:()=>void }
const C = createContext<Ctx>({ user:null, login: async()=>{}, logout: ()=>{} })
export function Provider({children}:{children:React.ReactNode}){
  const [user,setUser] = useState<User|null>(null)
  useEffect(()=>{ const t = localStorage.getItem('token'); if(t){ try{ const d:any = jwtDecode(t); setUser({ id:d.id, email:d.email, role:d.role, name:d.email.split('@')[0] }) }catch{}} },[])
  async function login(email:string,password:string){ const {data}=await api.post('/auth/login',{ email,password }); localStorage.setItem('token',data.token); setUser(data.user) }
  function logout(){ localStorage.removeItem('token'); setUser(null) }
  return <C.Provider value={{ user, login, logout }}>{children}</C.Provider>
}
export function useAuth(){ return useContext(C) }
