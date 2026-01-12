import DashNav from "@/components/dashboard/DashNav";
import SideNav from "@/components/dashboard/SideNav";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-paper">
      {/* Sidebar - Fixed width */}
      <SideNav />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Navbar */}
        <DashNav />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
