"use client";
import { useState, useEffect } from "react";
import { useAppStore } from "../../../store/appstore";
import { useAlertstore } from "../../../store/alertstore";
import Link from "next/link";
export default function RegisterForm() {
  const register = useAppStore((s) => s.register);
  const showAlert = useAlertstore((s) => s.showAlert);
  const [step, setStep] = useState(1);
  const authLoading = useAppStore((s) => s.authLoading);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [otp, setOtp] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // STEP 1: registration attempt → send OTP
  const handleRegister = async (e:any) => {
    e.preventDefault();
    try {
      const res = await register(form);

      if (res.success) { setStep(2); }

    } catch (err: any) {
      showAlert("Error sending otp", "error");


    }
  };

  // STEP 2: OTP verification
  const handleVerifyOtp = async (e:any) => {
    e.preventDefault();
    try {

      const res = await register({ otp });
      if (res.success) {
        showAlert(`Registration completed for\n\n${res.res.email} \n\n--> go to login`, "success");
      }


    } catch (err: any) {
      showAlert("OTP invalid/verification failed", "error");

    }
  };

  return (
    <>
      <div className="max-w-sm mx-auto p-2">
        <h2 className="text-xl font-semibold">Sign up to
          Task Management system</h2>
        <hr className="my-4 border-gray-300" />
        {step === 1 && (

          <div className="space-y-2">
            <form onSubmit={handleRegister} className="space-y-3 text-center">

              <input name="name" className="w-80 p-2 dark:bg-gray-800 border rounded" placeholder="enter your name" type="name" value={form.name} onChange={handleChange} />
              <input name="email"className="w-80 p-2 dark:bg-gray-800 border rounded" placeholder="enter your email" value={form.email} onChange={handleChange} />
              <input name="password"className="w-80 p-2 dark:bg-gray-800 border rounded" placeholder="enter your password" type="password" value={form.password} onChange={handleChange} />
              <div className=' text-center '>
                <button className="w-[50%] p-2 bg-blue-600 text-white rounded" type="submit">{authLoading ? 'registering...' : 'register'}</button>
              </div>
            </form>
           
      
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2">
            <p>OTP sent to your email</p>
            <form onSubmit={handleVerifyOtp} className="space-y-3 text-center">

              <input  className="w-80 p-2 dark:bg-gray-800 border rounded" placeholder="enter your otp" type="otp" value={otp}  onChange={(e) => setOtp(e.target.value)} />
              <div className=' text-center '>
                <button className="w-[50%] p-2 bg-blue-600 text-white rounded" type="submit">{authLoading ? 'verifying...' : 'verify'}</button>
              </div>
            </form>
           
          </div>
        )}
      </div>


      <div className=' space-x-5 text-center p-2'>

      <span className="text-sm mt-2 p-1 ">Already have an account?&nbsp;<Link href="/login" className="text-blue-600">Login</Link></span>
      </div>

      <div className="flex items-center">

        <hr className="flex-grow border-gray-300" />
        <span className="mx-4 text-gray-500 text-sm font-medium">
          OR
        </span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <div className=" mt-2 p-1 text-center w-full ">
        <Link href="/gogauth" >Sign&nbsp;up&nbsp;with&nbsp;


          <span className="bg-gradient-to-r from-blue-500 to-green-600 via-red-800 bg-clip-text text-transparent font-bold">GOOGLE</span>
       
        </Link>
      </div>

    </>
  );
}
