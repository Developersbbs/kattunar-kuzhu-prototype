"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaUser } from "react-icons/fa";

import {
  Home,
  CalendarDays,
  Search,
  Handshake,
  MessageSquarePlus,
} from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      label: "Home",
      icon: Home,
      href: "/dashboard",
    },
    {
      label: "Meetings",
      icon: CalendarDays,
      href: "/meeting",
    },
    {
      label: "Search",
      icon: Search,
      href: "/search",
    },
    {
      label: "Referrals",
      icon: Handshake,
      href: "/referrals",
    },
    {
      label: "Posts",
      icon: MessageSquarePlus,
      href: "/requirements",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 bg-gradient-to-t from-white via-white to-white/80">
      <Card className="border shadow-lg bg-white rounded-full backdrop-blur-md">
        <nav className="flex items-center justify-between p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Button
                key={item.href}
                variant="ghost"
                size="sm"
                className={cn(
                  "flex-1 flex items-center justify-center h-14 relative group transition-all duration-200 hover:bg-gray-50 rounded-xl",
                  isActive ? "text-black" : "text-gray-400 hover:text-gray-600"
                )}
                onClick={() => router.push(item.href)}
              >
                <div className="relative flex flex-col items-center">
                  <Icon 
                    className={cn(
                      "w-6 h-6 transition-transform duration-200",
                      !isActive && "group-hover:scale-110"
                    )} 
                  />
                  <span className={cn(
                    "text-xs font-medium mt-1",
                    isActive ? "text-black" : "text-gray-500"
                  )}>
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-1 h-0.5 w-6 bg-black rounded-full transition-all duration-200" />
                  )}
                </div>
              </Button>
            );
          })}
        </nav>
      </Card>
    </div>
  );
}
