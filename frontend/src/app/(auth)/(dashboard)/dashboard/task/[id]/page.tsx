"use client";

import { useEffect } from "react";
import { useAppStore } from "../../../../../../store/appstore";
import { useParams } from "next/navigation";

export default function TaskDetail() {
  const { id } = useParams();

  const loadTasks = useAppStore((s) => s.loadTasks);
  const tasks = useAppStore((s) => s.tasks);

  useEffect(() => {
    loadTasks();
    console.log("Tasks loaded:", tasks);
  },[
  ]);
  // const task = tasks.find((t) => t.id == id);

  if (!tasks) return <div>Task not found</div>;

  return (
    <div>
      {/* <h1 className="text-2xl font-bold">{task.title}</h1>
      <p>{task.description}</p> */}
    </div>
  );
}
