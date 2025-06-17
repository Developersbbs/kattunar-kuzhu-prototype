"use client";

import { useRouter } from "next/navigation";
import { Plus, CalendarDays, Megaphone, MessageSquarePlus } from "lucide-react";
import { cn } from "@/lib/utils";

export function SpeedDial({ isOpen, onClose }) {
  const router = useRouter();
  
  const quickActions = [
    {
      label: "Schedule Meeting",
      icon: <CalendarDays className="w-5 h-5" />,
      path: "/admin/analytics/meetings",
      color: "bg-gray-900 hover:bg-gray-800"
    },
    {
      label: "New Announcement",
      icon: <Megaphone className="w-5 h-5" />,
      path: "/admin/communications/announce",
      color: "bg-gray-800 hover:bg-gray-700"
    },
    {
      label: "Start Conversation",
      icon: <MessageSquarePlus className="w-5 h-5" />,
      path: "/admin/communications/messages",
      color: "bg-gray-700 hover:bg-gray-600"
    }
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* FAB and Menu */}
      <div className="fixed right-6 bottom-24 z-[100] print:hidden flex flex-col items-end gap-4">
        {/* Quick Actions */}
        <div className={cn(
          "flex flex-col-reverse gap-2 mb-3 transition-all duration-200",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}>
          {quickActions.map((action, index) => (
            <button
              key={action.label}
              onClick={() => {
                router.push(action.path);
                onClose();
              }}
              className={cn(
                "group flex items-center justify-end gap-3 transition-all duration-200",
                "translate-y-0 scale-100 opacity-100",
                !isOpen && "translate-y-10 scale-90 opacity-0"
              )}
              style={{
                transitionDelay: `${(quickActions.length - index) * 50}ms`
              }}
            >
              <span className="text-sm font-medium text-gray-800 bg-white/95 backdrop-blur-sm py-2 px-3 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {action.label}
              </span>
              <div className={cn(
                "h-12 w-12 rounded-full shadow-lg flex items-center justify-center text-white transition-transform duration-200 transform group-hover:scale-105",
                action.color
              )}>
                {action.icon}
              </div>
            </button>
          ))}
        </div>

        {/* Main FAB Button */}
        <button
          onClick={() => onClose()}
          className={cn(
            "h-14 w-14 rounded-full bg-gray-900 hover:bg-gray-800 text-white shadow-xl flex items-center justify-center transition-all duration-200 transform hover:scale-105",
            isOpen && "rotate-45 bg-gray-800"
          )}
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
    </>
  );
}
