"use client";

import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminMobileNav } from "@/components/admin-mobile-nav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const showMobileNav = !pathname.includes("/communications/");

  return (
    <div className="flex min-h-screen">
      <AdminSidebar className="hidden md:flex" />
      <div className="flex flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}
