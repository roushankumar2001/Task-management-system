"use client";

import { useAlertstore } from "../store/alertstore";

export default function GlobalAlert() {
  const {showAlert,closeAlert,isOpen,message,type} = useAlertstore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6 w-[90%] max-w-sm animate-scaleIn">
        
        {/* Title */}
        <h2 className="text-xl font-semibold mb-1">
          {type}
        </h2>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-300 mb-5">
          {message}
        </p>

        {/* OK Button */}
        <button
          onClick={closeAlert}
          className="w-full py-2.5 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}
