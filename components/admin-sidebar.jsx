import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSidebar } from "@/lib/contexts/sidebar-context";
import {
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiDashboardLine,
  RiTeamLine,
  RiGroupLine,
  RiMessage2Line,
  RiMegaphoneLine,
  RiLineChartLine,
  RiShakeHandsLine,
  RiTaskLine,
  RiSettings4Line,
} from "react-icons/ri";
import { IoIosCloseCircleOutline } from "react-icons/io";

const sidebarLinks = [
  {
    title: "Analytics",
    items: [
      {
        label: "Dashboard",
        icon: RiDashboardLine,
        href: "/admin/analytics/dashboard",
      },
      {
        label: "Meetings",
        icon: RiTeamLine,
        href: "/admin/analytics/meetings",
      },
      {
        label: "Referrals",
        icon: RiShakeHandsLine,
        href: "/admin/analytics/referrals",
      },
      {
        label: "Requirements",
        icon: RiTaskLine,
        href: "/admin/analytics/requirements",
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        label: "Groups",
        icon: RiGroupLine,
        href: "/admin/groups",
      },
      {
        label: "Members",
        icon: RiTeamLine,
        href: "/admin/members",
      },
    ],
  },
  {
    title: "Communications",
    items: [
      {
        label: "Messages",
        icon: RiMessage2Line,
        href: "/admin/communications/messages",
      },
      {
        label: "Announcements",
        icon: RiMegaphoneLine,
        href: "/admin/communications/announce",
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        label: "General",
        icon: RiSettings4Line,
        href: "/admin/settings",
      },
    ],
  },
];

export function AdminSidebar({ className }) {
  const { isOpen, toggle } = useSidebar();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-50 flex h-full w-[280px] flex-col border-r bg-background shadow-lg transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full",
        className
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">Menu</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          className="h-9 w-9 lg:hidden"
        >
          <IoIosCloseCircleOutline className="h-5 w-5" />
        </Button>
      </div>
      <ScrollArea className="flex-1 overflow-hidden hover:overflow-auto">
        <div className="space-y-4 py-4">
          {sidebarLinks.map((section) => (
            <div key={section.title} className="px-3 py-2">
              {isOpen && (
                <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">
                  {section.title}
                </h2>
              )}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <span
                      className={cn(
                        "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : "transparent",
                        !isOpen && "justify-center px-2"
                      )}
                    >
                      <item.icon className={cn("h-4 w-4", isOpen && "mr-2")} />
                      {isOpen && <span>{item.label}</span>}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
