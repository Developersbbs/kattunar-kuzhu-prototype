"use client";

import { AdminSidebar } from "@/components/admin-sidebar";
import { useSidebar } from "@/lib/contexts/sidebar-context";

export function DashboardLayout({ children }) {
  const { isOpen, toggle } = useSidebar();

  return (
    <div className="relative min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Backdrop - shows on mobile when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggle}
        />
      )}
      
      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300",
          isOpen ? "lg:pl-[240px]" : "pl-0"
        )}
      >
        {children}
      </div>
    </div>
  );
}
