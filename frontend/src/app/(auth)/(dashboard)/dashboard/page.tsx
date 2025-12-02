'use client';
import { useEffect } from 'react';
import { useAppStore } from '../../../../store/appstore';
import Link from 'next/link';
export default function Dashboard() {
 
  if (useAppStore(s => s.user) === null) {
    return <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        <Link href="/login">Login</Link> or <Link href="/register">register</Link>  to proceed.</h1>
    </div>;
  }
  
  return <>
  welcome to dashboard
  </>;
}