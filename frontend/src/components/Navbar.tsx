'use client';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useAppStore } from '../store/appstore';

export default function Navbar(){
  const user = useAppStore(s=>s.user);
  const logout = useAppStore(s=>s.logout);
  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold">TaskManager</Link>
        <div className="flex items-center gap-4">
          {user ? <span className="text-sm">Hello, {user.name}</span> : <Link href="/login">Login</Link>}
          <ThemeToggle />
          {user && <button onClick={()=>logout()} className="text-red-500">Logout</button>}
        </div>
      </div>
    </nav>
  );
}
