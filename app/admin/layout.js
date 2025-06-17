"use client";

import { AdminSidebar } from "@/components/admin-sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RiMenuLine } from "react-icons/ri";
import { useSidebar } from "@/lib/contexts/sidebar-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebar();
  const showHeader = !pathname.includes("/communications/");
  
  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Sidebar - Hidden by default */}
        <AdminSidebar />
        
        {/* Main Content */}
        <div className="flex flex-1 flex-col min-h-screen">
          {/* Admin Header */}
          {showHeader && (
            <header className="sticky top-0 z-40 flex h-fit items-center gap-4 border-b bg-background px-4 sm:px-6 pt-10 pb-3">
              {/* Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={toggle}
              >
                <RiMenuLine className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>

              {/* Page Title */}
              <div className="flex-1">
                <h1 className="text-lg font-semibold">Admin Panel</h1>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-3">
                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative h-9 w-9">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>
          )}

          {/* Page Content */}
          <main className={cn(
            "flex-1 transition-all duration-300",
            showHeader && "p-4 sm:p-6 lg:p-8",
            !showHeader && "p-0"
          )}>
            {children}
          </main>
        </div>
      </div>

      {/* Backdrop for sidebar on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={toggle}
        />
      )}
    </div>
  );
}
