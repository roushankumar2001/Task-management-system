"use client";
import Sidebar from "../../../../components/sidebar";
import { useAppStore } from "../../../../store/appstore";
import Link from "next/link";
export default function DashboardLayout({ children }) {
  const isLoggedin = useAppStore((s) => s.isLoggedIn);
  if (!isLoggedin) {
    return <h1 className="text-5xl font-bold text-red-800 animate-bounce">Please <Link href="/login" className="underline">login</Link> to use dashboard</h1>
  }

  return (
    <div className="flex h-screen w-full">

      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Workspace */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        {children}
      </div>

    </div>
  );
}
