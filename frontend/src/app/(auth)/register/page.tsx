"use client";
import { useState, useEffect } from "react";
import { useAppStore } from "../../../store/appstore";
import { useAlertstore } from "../../../store/alertstore";
export default function RegisterForm() {
  const register = useAppStore((s) => s.register);
const showAlert = useAlertstore((s) => s.showAlert);
  const [step, setStep] = useState(1);

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
  const handleRegister = async () => {
    try {
      const res = await register(form);
  
      if (res.success) { setStep(2);  }

    } catch (err: any) {
      showAlert("Error sending otp","error");
    }
  };

  // STEP 2: OTP verification
  const handleVerifyOtp = async () => {
    try {

      const res = await register({ otp });
      if (res.success) {
         showAlert(`Registration completed for\n\n${res.res.email} \n\n--> go to login`,"success");
        }


    } catch (err: any) {
      showAlert("OTP invalid/verification failed","error");  }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      {step === 1 && (
        <div className="space-y-2">
          <input
            name="name"
            className="border p-2 w-full"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="email"
            className="border p-2 w-full"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            className="border p-2 w-full"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button
            onClick={handleRegister}
            className="bg-blue-600 text-white p-2 w-full"
          >
            Register
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-2">
          <p>OTP sent to your email</p>

          <input
            className="border p-2 w-full dark:bg-gray-800"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            onClick={handleVerifyOtp}
            className="bg-green-600 text-white p-2 w-full"
          >
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
}
