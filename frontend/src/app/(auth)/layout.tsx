import React from 'react';
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center p-4">
      <div className="  bg-yellow-100 dark:bg-gray-800 p-6 rounded-lg shadow">{children}</div>
    </div>
  );
}
