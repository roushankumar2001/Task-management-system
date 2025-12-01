'use client';
import { useEffect, useState } from 'react';
export default function ThemeToggle(){
  const [theme,setTheme]=useState<'light'|'dark'>('light');
  useEffect(()=>{ const s=localStorage.getItem('theme')||'light'; setTheme(s as any); document.documentElement.classList.toggle('dark', s==='dark'); },[]);
  function toggle(){ const n= theme==='light' ? 'dark' : 'light'; setTheme(n); document.documentElement.classList.toggle('dark', n==='dark'); localStorage.setItem('theme', n); }
  return <button onClick={toggle} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded">{theme==='light'?'🌙':'☀️'}</button>;
}
