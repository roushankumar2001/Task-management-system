'use client';
import { useState } from 'react';
import { useAppStore } from '../../../store/appstore';
import Link from 'next/link';

export default function LoginPage() {
  const login = useAppStore((s) => s.login);
  const authLoading = useAppStore((s) => s.authLoading);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [err,setErr]=useState('');
  const handle=async(e:any)=>{
    e.preventDefault();
    setErr('');
    try{
      await login(email,password);
      window.location.href='/';
    }catch(e:any){ setErr(e.message || 'Login failed'); }
  };
  return (
    <form onSubmit={handle} className="space-y-4">
      <h2 className="text-xl font-semibold">Login</h2>
      {err && <div className="text-red-500">{err}</div>}
      <input className="w-full p-2 border rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="w-full p-2 border rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="w-full p-2 bg-blue-600 text-white rounded" type="submit">{authLoading ? 'Logging...' : 'Login'}</button>
      <div className="text-sm mt-2">No account? <Link href="/register" className="text-blue-600">Register</Link></div>
    </form>
  );
}
