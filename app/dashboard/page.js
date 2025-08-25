"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { RiMenuFold4Line } from "react-icons/ri";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useSidebar } from "@/lib/contexts/sidebar-context";
import { SpeedDial } from "@/components/speed-dial";

import {
  Bell,
  Users,
  Handshake,
  CalendarDays,
  MessageSquarePlus,
  TrendingUp,
  ChevronRight,
  Clock,
  ChevronUp,
  X,
  Activity,
  Plus,
  UserPlus,
  Megaphone,
  Settings,
  ShieldCheck,
  Building2,
  UserCog,
  FileText,
  ArrowRightLeft,
  CheckSquare,
  BarChart3,
} from "lucide-react";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import { MobileNav } from "@/components/mobile-nav";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useRouter } from "next/navigation";

// Mock data for the line chart
const monthlyPosts = [
  { month: "Jan", posts: 25 },
  { month: "Feb", posts: 32 },
  { month: "Mar", posts: 28 },
  { month: "Apr", posts: 45 },
  { month: "May", posts: 38 },
  { month: "Jun", posts: 52 },
];

// Sample notifications data
const sampleNotifications = [
  {
    id: 1,
    type: "meeting",
    title: "New Meeting Request",
    message: "John invited you to a meeting tomorrow at 2 PM",
    time: "5 minutes ago",
    isRead: false,
  },
  {
    id: 2,
    type: "referral",
    title: "Referral Accepted",
    message: "Sarah accepted your referral for web development project",
    time: "1 hour ago",
    isRead: false,
  },
  {
    id: 3,
    type: "requirement",
    title: "New Requirement Match",
    message: "New office space requirement matches your profile",
    time: "2 hours ago",
    isRead: true,
  },
  {
    id: 4,
    type: "meeting",
    title: "Meeting Reminder",
    message: "Weekly business network meeting in 30 minutes",
    time: "30 minutes ago",
    isRead: false,
  },
  {
    id: 5,
    type: "referral",
    title: "New Referral",
    message: "Mike sent you a new business referral",
    time: "1 day ago",
    isRead: true,
  },
];

// Notification Icon Component
const NotificationIcon = ({ type }) => {
  const icons = {
    meeting: <CalendarDays className="w-4 h-4" />,
    referral: <Handshake className="w-4 h-4" />,
    requirement: <MessageSquarePlus className="w-4 h-4" />,
  };

  return (
    <div className="p-2 bg-gray-100 rounded-full">
      {icons[type] || <Bell className="w-4 h-4" />}
    </div>
  );
};

// Notification Panel Component
const NotificationPanel = ({ isOpen, onClose }) => {
  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 w-full sm:w-[380px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="px-4 py-6 border-b">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs hover:bg-gray-100"
            >
              Mark all as read
            </Button>
            <Separator orientation="vertical" className="h-4" />
            <Button
              variant="ghost"
              size="sm"
              className="text-xs hover:bg-gray-100"
            >
              Clear all
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-1 py-4">
            {sampleNotifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-4 rounded-lg transition-colors",
                  notification.isRead ? "bg-white" : "bg-gray-50"
                )}
              >
                <div className="flex gap-3">
                  <NotificationIcon type={notification.type} />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-medium">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <div className="h-2 w-2 rounded-full bg-black flex-shrink-0 mt-2" />
                      )}
                    </div>
                    <span className="text-xs text-gray-500 mt-2 block">
                      {notification.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

// Action groups configuration for different user roles
const actionGroups = {
  SUPER_ADMIN: [
    {
      label: "Group Management",
      icon: <Users className="w-5 h-5" />,
      items: [
        {
          label: "Manage Groups",
          icon: <Settings className="w-4 h-4" />,
          path: "/admin/groups", // Links to our new groups management page
        },
        {
          label: "Invite Member",
          icon: <UserPlus className="w-4 h-4" />,
          path: "/admin/members/new",
        },
      ],
    },
    {
      label: "Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      items: [
        {
          label: "Referral Analytics",
          icon: <ArrowRightLeft className="w-4 h-4" />,
          path: "/admin/analytics/referrals",
        },
        {
          label: "Requirements Overview",
          icon: <FileText className="w-4 h-4" />,
          path: "/admin/analytics/requirements",
        },
        {
          label: "Meeting Statistics",
          icon: <CalendarDays className="w-4 h-4" />,
          path: "/admin/analytics/meetings",
        },
      ],
    },
    {
      label: "Communications",
      icon: <Megaphone className="w-5 h-5" />,
      items: [
        {
          label: "Send Announcement",
          icon: <Bell className="w-4 h-4" />,
          path: "/admin/communications/announce",
        },
        {
          label: "Send Message",
          icon: <MessageSquarePlus className="w-4 h-4" />,
          path: "/admin/communications/messages",
        },
      ],
    },
  ],
  ADMIN: [
    // Admin specific actions can be added here
  ],
  GROUP_HEAD: [
    // Group head specific actions can be added here
  ],
  MEMBER: [
    // Member specific actions can be added here
  ],
};

// Enhanced SpeedDial Component with nested menus
const NestedSpeedDial = ({ isOpen, onClose, role }) => {
  const router = useRouter();
  const [activeGroup, setActiveGroup] = useState(null);

  const handleGroupClick = (group) => {
    setActiveGroup(activeGroup === group.label ? null : group.label);
  };

  const handleActionClick = (path) => {
    router.push(path);
    onClose();
  };

  const actions = actionGroups[role] || [];
  console.log("SpeedDial Props:", {
    isOpen,
    role,
    actionsCount: actions.length,
  });

  // Early return if no actions for role
  if (!actions.length) {
    console.log("No actions found for role:", role);
    return null;
  }

  return (
    <>
      <div
        className={cn(
          "fixed bottom-24 right-4 z-50 flex flex-col-reverse items-end gap-4",
          !isOpen && "pointer-events-none"
        )}
      >
        {/* Action Groups */}
        {isOpen && (
          <div className="flex flex-col gap-4 items-end">
            {actions.map((group) => (
              <div key={group.label} className="flex flex-col items-end gap-2">
                {/* Group items */}
                {activeGroup === group.label && (
                  <div className="flex flex-col gap-2 items-end">
                    {group.items.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleActionClick(item.path)}
                        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transform transition-all duration-200 hover:scale-105"
                      >
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                        {item.icon}
                      </button>
                    ))}
                  </div>
                )}
                {/* Group button */}
                <button
                  onClick={() => handleGroupClick(group)}
                  className={cn(
                    "flex items-center gap-2 p-3 rounded-full shadow-lg transition-all duration-200",
                    activeGroup === group.label
                      ? "bg-black text-white"
                      : "bg-white hover:bg-gray-50"
                  )}
                >
                  {group.icon}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Main FAB Button */}
        <button
          onClick={() => onClose()}
          className={cn(
            "p-4 rounded-full shadow-lg transition-all duration-200 transform pointer-events-auto",
            isOpen
              ? "bg-gray-900 text-white rotate-45"
              : "bg-black text-white hover:bg-gray-800"
          )}
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
    </>
  );
};

// Simplified SpeedDial Component with quick actions
const QuickActionsSpeedDial = ({ isOpen, onClose }) => {
  const router = useRouter();

  const quickActions = [
    {
      label: "Schedule Meeting",
      icon: <CalendarDays className="w-5 h-5" />,
      path: "/meeting/schedule",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      label: "New Announcement",
      icon: <Megaphone className="w-5 h-5" />,
      path: "/admin/communications/announce",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      label: "Start Conversation",
      icon: <MessageSquarePlus className="w-5 h-5" />,
      path: "/admin/communications/messages",
      color: "bg-green-500 hover:bg-green-600",
    },
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
      <div className="fixed right-4 bottom-20 z-50">
        {/* Quick Actions */}
        <div
          className={cn(
            "flex flex-col-reverse gap-2 mb-2 transition-all duration-200",
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          )}
        >
          {quickActions.map((action, index) => (
            <button
              key={action.label}
              onClick={() => {
                router.push(action.path);
                onClose();
              }}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-full text-white shadow-lg transition-all duration-200",
                action.color,
                "translate-y-0 scale-100 opacity-100",
                !isOpen && "translate-y-10 scale-90 opacity-0"
              )}
              style={{
                transitionDelay: `${(quickActions.length - index) * 50}ms`,
              }}
            >
              {action.icon}
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Main FAB Button */}
        <button
          onClick={() => !isOpen && onClose()}
          className={cn(
            "h-14 w-14 rounded-full bg-black text-white shadow-lg flex items-center justify-center transition-transform duration-200",
            isOpen && "rotate-45"
          )}
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
    </>
  );
};

export default function Dashboard() {
  const { toggle, isOpen } = useSidebar();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMeetingAlert, setShowMeetingAlert] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const alertRef = useRef(null);
  const touchStartY = useRef(0);

  // Handle touch events for swipe to dismiss
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const offset = currentY - touchStartY.current;
    if (offset > 0) {
      setDragOffset(Math.min(offset, 200));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (dragOffset > 100) {
      setShowMeetingAlert(false);
    }
    setDragOffset(0);
  };

  // Mock user data - replace with real data later
  const user = {
    name: "Jhones",
    business: "ABC Tech Solutions",
    image: "/path-to-avatar.jpg", // Add actual image path
    notifications: 2,
    stats: {
      referrals: {
        total: 15,
        target: 20,
        growth: "+3 this month",
      },
      meetings: {
        attended: 8,
        total: 10,
        nextDate: "Tomorrow, 10:00 AM",
      },
    },
  };

  // Mock meeting data - replace with real data later
  const meetings = [
    {
      id: 1,
      title: "Project Sync",
      time: "10:00 AM",
      date: "Tomorrow",
      attendees: 5,
      status: "upcoming",
    },
    {
      id: 2,
      title: "Budget Review",
      time: "1:00 PM",
      date: "Tomorrow",
      attendees: 3,
      status: "upcoming",
    },
    {
      id: 3,
      title: "Team Standup",
      time: "3:00 PM",
      date: "Tomorrow",
      attendees: 8,
      status: "completed",
    },
  ];

  // Handle notification panel
  const handleNotificationToggle = () => {
    setShowNotifications(!showNotifications);
    setShowOverlay(!showOverlay);
  };

  const handleClose = () => {
    setShowNotifications(false);
    setShowOverlay(false);
  };

  // Close FAB when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isFabOpen) {
        setIsFabOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFabOpen]);

  return (
    <main className="min-h-screen bg-gray-50 pb-28 relative">
      {/* Profile Header */}
      <div className="bg-white px-5 pt-16 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-gray-100"
              onClick={toggle}
            >
              <RiMenuFold4Line className="size-5" />
            </Button>
            <Link href="/profile/business" className="flex items-center gap-3">
              {/* Profile Image and Greeting */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  {user.image ? (
                    <FaUser className="size-4" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-lg font-medium text-gray-600">
                        {user.name[0]}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Greeting and Phone */}
              <div>
                <h1 className="text-base font-medium text-gray-900">
                  Good Morning, {user.name}
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">{user.business}</p>
              </div>
            </Link>
          </div>

          {/* Notification Icon */}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full hover:bg-gray-100"
            onClick={handleNotificationToggle}
          >
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              {user.notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-black rounded-full" />
              )}
            </div>
          </Button>
        </div>
      </div>

      {/* Meeting Alert - Swipe to Dismiss Demo */}

      {/* Meeting Alert */}
      {showMeetingAlert && (
        <div className="px-5 py-2">
          <div
            ref={alertRef}
            className={cn(
              "transition-all duration-200 ease-out transform",
              isDragging ? "scale-[0.98]" : "scale-100"
            )}
            style={{
              transform: `translateY(${dragOffset}px)`,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 relative overflow-hidden">
              {/* Swipe indicator */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/20 rounded-full" />

              {/* Close button */}
              <button
                onClick={() => setShowMeetingAlert(false)}
                className="absolute top-3 right-3 text-white/60 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="mt-2">
                {/* Meeting Time */}
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-white/80" />
                  <span className="text-sm font-medium text-white/80">
                    Today&apos;s Meeting
                  </span>
                </div>

                {/* Meeting Details */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">
                    Weekly Business Meet
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full bg-gray-600 border-2 border-gray-800 flex items-center justify-center"
                          >
                            <span className="text-xs">{i}</span>
                          </div>
                        ))}
                      </div>
                      <span className="text-sm text-white/60">+12 members</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">10:00 AM</div>
                      <div className="text-sm text-white/60">2 hours</div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  className="w-full mt-4 bg-white text-gray-900 hover:bg-gray-100"
                  onClick={() => {
                    // Handle attendance marking
                    console.log("Marking attendance");
                  }}
                >
                  Mark Attendance
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Statistics Scroll Section */}
      <div className="px-5 pt-2 overflow-hidden">
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide -mx-1 px-1">
          {/* Referrals Card */}
          <Card className="flex-shrink-0 w-[280px] p-4 bg-white">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-xl">
                    <Handshake className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    Referrals
                  </span>
                </div>
                <h3 className="text-2xl font-semibold mt-2">248</h3>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs font-medium text-green-600">
                    +12%
                  </span>
                  <span className="text-xs text-gray-500">vs last week</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-500">This month</span>
                <span className="text-lg font-medium mt-1">+45</span>
                <span className="text-xs text-gray-500 mt-1">
                  vs 32 last month
                </span>
              </div>
            </div>
          </Card>

          {/* Requirements Posts Card */}
          <Card className="flex-shrink-0 w-[280px] p-4 bg-white">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-xl">
                    <MessageSquarePlus className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    Requirements
                  </span>
                </div>
                <h3 className="text-2xl font-semibold mt-2">156</h3>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs font-medium text-green-600">
                    +8%
                  </span>
                  <span className="text-xs text-gray-500">vs last week</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-500">This month</span>
                <span className="text-lg font-medium mt-1">+28</span>
                <span className="text-xs text-gray-500 mt-1">
                  vs 24 last month
                </span>
              </div>
            </div>
          </Card>

          {/* Active Meetings Card */}
          <Card className="flex-shrink-0 w-[280px] p-4 bg-white">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-xl">
                    <CalendarDays className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    Active Meetings
                  </span>
                </div>
                <h3 className="text-2xl font-semibold mt-2">42</h3>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs font-medium text-green-600">
                    +15%
                  </span>
                  <span className="text-xs text-gray-500">vs last week</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-500">This month</span>
                <span className="text-lg font-medium mt-1">+12</span>
                <span className="text-xs text-gray-500 mt-1">
                  vs 8 last month
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Requirements Posts Chart and Quick Actions Grid */}
      <div className="px-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Requirements Posts Chart */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gray-100 rounded-xl">
                <Activity className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium">Requirement Posts</h3>
                <p className="text-sm text-gray-500">Monthly overview</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-xs">
              View All
            </Button>
          </div>

          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyPosts}
                margin={{
                  top: 5,
                  right: 10,
                  left: -20,
                  bottom: 5,
                }}
              >
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  axisLine={{ stroke: "#E5E7EB" }}
                  tickLine={{ stroke: "#E5E7EB" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  axisLine={{ stroke: "#E5E7EB" }}
                  tickLine={{ stroke: "#E5E7EB" }}
                  width={30}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  labelStyle={{ color: "#111827", fontWeight: 500 }}
                />
                <Line
                  type="monotone"
                  dataKey="posts"
                  stroke="#111827"
                  strokeWidth={2}
                  dot={{
                    r: 4,
                    fill: "#FFF",
                    stroke: "#111827",
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 6,
                    fill: "#111827",
                    stroke: "#FFF",
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div>
              <p className="text-sm text-gray-500">Total Posts</p>
              <p className="text-2xl font-semibold">220</p>
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+12.5%</span>
            </div>
          </div>
        </Card>

        {/* Quick Actions Card */}
        <Card className="p-4">
          {/* Quick Actions Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gray-100 rounded-xl">
                <Handshake className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium">Quick Actions</h3>
                <p className="text-sm text-gray-500">Manage referrals</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Referral Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-full border-gray-200 hover:bg-gray-50 hover:text-black"
              >
                Given
              </Button>
              <Button
                variant="outline"
                className="flex-1 rounded-full border-gray-200 hover:bg-gray-50 hover:text-black"
              >
                Taken
              </Button>
              <Button
                size="icon"
                className="h-10 w-10 rounded-full bg-black text-white hover:bg-gray-800"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>

            {/* Upcoming Meetings Section */}
            <div className="mt-8 pt-6 border-t">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-xl">
                    <CalendarDays className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    Upcoming Meetings
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-7 px-2 hover:bg-gray-100"
                >
                  View All
                </Button>
              </div>

              <div className="space-y-3">
                {/* Today's Meeting */}
                <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <div className="bg-gray-50 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-black rounded-full"></div>
                        <span className="text-xs font-medium text-gray-500">
                          Today
                        </span>
                      </div>
                      <div className="px-2 py-1 rounded-full bg-black text-white text-xs">
                        Now
                      </div>
                    </div>
                    <h4 className="text-sm font-medium mb-1">
                      Weekly Business Network
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>10:00 AM - 12:00 PM</span>
                    </div>
                    <div className="flex items-center justify-end mt-3 pt-2 border-t border-gray-200/50">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-4 text-xs font-medium bg-black text-white hover:bg-gray-900"
                      >
                        Mark Attedance
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Tomorrow's Meeting */}
                <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
                        <span className="text-xs font-medium text-gray-500">
                          Tomorrow
                        </span>
                      </div>
                      <div className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                        10:00 AM
                      </div>
                    </div>
                    <h4 className="text-sm font-medium mb-1">
                      Product Showcase
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>10:00 AM - 11:30 AM</span>
                    </div>
                    <div className="flex items-center justify-end mt-3 pt-2 border-t border-gray-200">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-4 text-xs font-medium hover:bg-gray-50"
                      >
                        Remind Me
                      </Button>o
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Speed Dial FAB */}
      <SpeedDial
        isOpen={isFabOpen}
        onClose={() => setIsFabOpen(!isFabOpen)}
      />

      {/* Notification Panel (conditionally rendered) */}
      {showNotifications && (
        <NotificationPanel isOpen={showNotifications} onClose={handleClose} />
      )}

      {/* Overlay */}
      {showOverlay && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={handleClose}
        />
      )}

      {/* Mobile Navigation */}
      <MobileNav />
    </main>
  );
}
