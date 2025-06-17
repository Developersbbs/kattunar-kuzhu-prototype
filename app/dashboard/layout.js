"use client";

import { SidebarProvider } from "@/lib/contexts/sidebar-context";
import { AdminSidebar } from "@/components/admin-sidebar";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="relative min-h-screen">
        <AdminSidebar />
        {children}
      </div>
    </SidebarProvider>
  );
}
