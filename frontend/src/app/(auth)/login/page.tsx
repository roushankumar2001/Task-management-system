'use client';
import { useState } from 'react';
import { useAppStore } from '../../../store/appstore';
import Link from 'next/link';
import { useAlertstore } from '../../../store/alertstore';
import TMS from '../../../components/TMS';
export default function LoginPage() {
  const login = useAppStore((s) => s.login);
  const showAlert = useAlertstore((s) => s.showAlert);
  const authLoading = useAppStore((s) => s.authLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handle = async (e: any) => {
    e.preventDefault();

    try {
      await login(email, password);
      window.location.href = '/dashboard';
    } catch (e: any) { showAlert("login failed", "error"); }
  };
  return (
    < div className='max-w-sm'>


      <form onSubmit={handle} className="space-y-3 text-center">
        <h2 className="text-xl font-semibold">Sign in to <TMS/></h2>
        <hr className="my-4 border-gray-300" />
        <br />
        <input className="w-80 p-2 dark:bg-gray-800 border rounded" placeholder="enter your email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-80 p-2 dark:bg-gray-800 border rounded" placeholder="enter your password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <div className=' text-center '>
          <button className="w-[50%] p-2 bg-blue-600 text-white rounded" type="submit">{authLoading ? 'Logging...' : 'Login'}</button>
        </div>
      </form>
      <br />
      <div className='flex space-x-5'>

        <span className="text-sm mt-2 p-1 ">Forgot your password?<Link href="/forget" className="text-blue-600">Reset&nbsp;Password</Link></span>
        <span className="text-sm mt-2 p-1 ">Don't have an account?<Link href="/register" className="text-blue-600">Register</Link></span>
      </div>

      <div className="flex items-center">

        <hr className="flex-grow border-gray-300" />
        <span className="mx-4 text-gray-500 text-sm font-medium">
          OR
        </span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <div className=" mt-2 p-1 text-center w-full ">
        <Link href="/gogauth" >Login&nbsp;with&nbsp;


          <span className="bg-gradient-to-r from-blue-500 to-green-600 via-red-800 bg-clip-text text-transparent font-bold">GOOGLE</span>
      
        </Link>
      </div>
    </div>
  );
}
