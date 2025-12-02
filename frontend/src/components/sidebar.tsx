"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg p-5 flex flex-col gap-4">

      <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">
        Dashboard
      </h2>

      <Link href="/dashboard" className="sidebar-link">
        Home
      </Link>

      <Link href="/dashboard/profile" className="sidebar-link">
        Edit Profile
      </Link>

      <Link href="/dashboard/task" className="sidebar-link">
        Search Task
      </Link>

      <Link href="/dashboard/task/create" className="sidebar-link">
        Create Task
      </Link>
    </div>
  );
}
