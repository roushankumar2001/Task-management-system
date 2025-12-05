'use client';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useAppStore } from '../store/appstore';
import TMS from './TMS';
export default function Navbar() {
  const user = useAppStore(s => s.user);
  const logout = useAppStore(s => s.logout);
  return (
    <nav className="w-full min-h-[10vh] bg-white dark:bg-gray-900 shadow p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold w-[5%] "><TMS /></Link>
        <span className='flex justify-start space-x-3'>
          <Link href='/'>Home</Link>
          <Link href='/feature'>Features</Link>
          <Link href='/d&d'>Design_&_Docs</Link>
          <Link href='/challenge'>Challenges</Link>
          <Link href='/userguide'>User_Guide</Link>
          <Link href='/about'>About</Link>
        </span>
        <div className="flex items-center gap-4 space-x-4">

          {user ? <span className=" text-green-700">Hello, {user.name}</span> : <Link href="/login">Login</Link>}
          {user && <button onClick={() => logout()} className="text-red-500">Logout</button>}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
