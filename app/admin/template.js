"use client";

import { SidebarProvider } from "@/lib/contexts/sidebar-context";

export default function AdminTemplate({ children }) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
