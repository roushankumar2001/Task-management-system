import Sidebar from "../../../../components/sidebar";

export default function DashboardLayout({ children }) {
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
