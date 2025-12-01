"use client";
import { useAlertstore } from "../store/alertstore";

// import { useAlertstore } from "../store/alertstore";

// export default function GlobalAlert() {
//   const {showAlert,closeAlert,isOpen,message,type} = useAlertstore();

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6 w-[90%] max-w-sm animate-scaleIn">

//         {/* Title */}
//         <h2 className="text-xl font-semibold mb-1">
//           {type}
//         </h2>

//         {/* Message */}
//         <p className="text-gray-600 dark:text-gray-300 mb-5">
//           {message}
//         </p>

//         {/* OK Button */}
//         <button
//           onClick={closeAlert}
//           className="w-full py-2.5 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
//         >
//           OK
//         </button>
//       </div>
//     </div>
//   );
// }



export default function AlertBox() {
  const { showAlert, closeAlert, isOpen, message, type } = useAlertstore();

  if (!isOpen) return null;

  const colorMap: Record<string, string> = {
    success: "bg-green-100 border-green-500 text-green-700",
    error: "bg-red-100 border-red-500 text-red-700",
    info: "bg-blue-100 border-blue-500 text-blue-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
  };

  return (
    <div
      className={`
      fixed top-5 left-1/2 transform -translate-x-1/2 z-50
        border-l-4 p-4 rounded shadow-lg
        animate-slide-in
        ${colorMap[type]}
        max-w-[90%] w-auto min-w-[200px] break-words
      `}
    >
      {/* Close Button at top-left */}
      <div className="flex justify-end">
        <button
          onClick={closeAlert}
          className="text-xl font-bold mb-2"
        >
          ×
        </button>
      </div>

      {/* Message */}
      <div>
        <span className="font-medium whitespace-pre-wrap">{message}</span>
      </div>
    </div>
  );
}
