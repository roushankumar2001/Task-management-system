'use client';
import { useEffect } from 'react';
import { useAppStore } from '@/store/appstore';

export default function TasksPage(){
  const tasks = useAppStore(s=>s.tasks);
  const loadTasks = useAppStore(s=>s.loadTasks);
  useEffect(()=>{ loadTasks(); }, []);
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Your Tasks</h1>
      <ul className="space-y-2">
        {tasks.map((t:any)=> <li key={t.id} className="p-3 bg-white dark:bg-gray-800 rounded">{t.title}</li>)}
      </ul>
    </div>
  );
}
