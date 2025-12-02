"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TaskSearchPage() {
  const router = useRouter();
  const [id, setId] = useState("");

  const go = () => {
    if (!id) return;
    router.push(`/dashboard/task/${id}`);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Search Task By ID</h1>
      <input
        className="border p-2 rounded w-full"
        placeholder="Enter Task ID"
        value={id}
        onChange={e => setId(e.target.value)}
      />
      <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={go}>
        Search
      </button>
    </div>
  );
}
