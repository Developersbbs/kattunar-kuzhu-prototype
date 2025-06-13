"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Bell,
  Settings,
  Users,
  Handshake,
  CalendarDays,
  MessageSquarePlus,
  X,
  ChevronRight,
  Award,
  UserPlus,
  TrendingUp,
  MoreVertical,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const [showMeetingAlert, setShowMeetingAlert] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

  const achievements = [
    {
      id: 1,
      title: "Referrals",
      value: "12",
      icon: UserPlus,
      details: "8 Successful • 4 Pending",
      trend: "+3 this month"
    },
    {
      id: 2,
      title: "Meetings",
      value: "8/10",
      icon: CalendarDays,
      details: "80% Attendance",
      trend: "Next: Tomorrow"
    },
    {
      id: 3,
      title: "Goals",
      value: "85%",
      icon: TrendingUp,
      details: "Monthly Target",
      trend: "5% to reach target"
    },
  ];

  const quickActions = [
    { title: "Directory", icon: Users, href: "/directory" },
    { title: "Create Referral", icon: Handshake, href: "/referral/new" },
    { title: "Schedule Meeting", icon: CalendarDays, href: "/meetings/schedule" },
    { title: "Post Requirement", icon: MessageSquarePlus, href: "/requirements/new" },
  ];

  const activityFeed = [
    {
      type: "meeting",
      title: "Group Meeting",
      description: "Monthly progress discussion",
      time: "2 hours ago",
      icon: CalendarDays,
    },
    {
      type: "referral",
      title: "New Referral",
      description: "John connected with ABC Corp",
      time: "5 hours ago",
      icon: Handshake,
    },
    {
      type: "achievement",
      title: "Goal Achieved",
      description: "Completed monthly referral target",
      time: "1 day ago",
      icon: Award,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b z-40 px-4 py-3">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <button
            onClick={() => setProfileOpen(true)}
            className="flex items-center gap-3 active:opacity-70"
          >
            <div className="relative w-10 h-10">
              <Image
                src="/placeholder-avatar.jpg"
                alt="Profile"
                fill
                className="rounded-full object-cover border-2 border-gray-100"
              />
            </div>
            <div>
              <h2 className="font-medium text-gray-900">John Doe</h2>
              <p className="text-xs text-gray-500">Group 5</p>
            </div>
          </button>
          <div className="flex items-center gap-4">
            <button className="relative active:opacity-70">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gray-900 rounded-full" />
            </button>
            <button className="active:opacity-70">
              <Settings className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-16 pb-20 px-4">
        <div className="max-w-lg mx-auto space-y-6">
          {/* Meeting Alert */}
          {showMeetingAlert && (
            <div
              className="relative touch-pan-x"
              onTouchMove={(e) => {
                if (e.touches[0].clientX < 50) {
                  setShowMeetingAlert(false);
                }
              }}
            >
              <Card className="bg-gray-900 text-white p-4 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Today&apos;s Meeting</h3>
                    <p className="text-sm text-gray-300 mt-1">
                      10:00 AM - Group Discussion
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      className="rounded-xl bg-white text-gray-900 hover:bg-gray-100"
                    >
                      Mark Attendance
                    </Button>
                    <button
                      onClick={() => setShowMeetingAlert(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Card>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Swipe left to dismiss
              </p>
            </div>
          )}

          {/* Achievement Cards */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-medium text-gray-900">Your Progress</h3>
              <Button variant="ghost" className="text-sm text-gray-600 p-0">
                View Details
              </Button>
            </div>
            <ScrollArea>
              <div className="flex gap-4 pb-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <Card
                      key={achievement.id}
                      className={cn(
                        "flex-shrink-0 w-40 p-4 rounded-2xl transition-all duration-200",
                        expandedCard === achievement.id
                          ? "bg-gray-900 text-white"
                          : "bg-white hover:bg-gray-50"
                      )}
                      onClick={() => setExpandedCard(
                        expandedCard === achievement.id ? null : achievement.id
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-xl flex items-center justify-center mb-2",
                        expandedCard === achievement.id
                          ? "bg-white text-gray-900"
                          : "bg-gray-100 text-gray-600"
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className={cn(
                        "text-sm",
                        expandedCard === achievement.id
                          ? "text-gray-300"
                          : "text-gray-600"
                      )}>
                        {achievement.title}
                      </p>
                      <p className="text-2xl font-semibold mt-1">
                        {achievement.value}
                      </p>
                      {expandedCard === achievement.id && (
                        <div className="mt-3 space-y-2 animate-in fade-in slide-in-from-bottom-2">
                          <p className="text-sm text-gray-300">{achievement.details}</p>
                          <p className="text-xs text-gray-400">{achievement.trend}</p>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>

          {/* Quick Actions */}
          <section className="space-y-4">
            <h3 className="font-medium text-gray-900 px-1">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Card
                    key={action.title}
                    className="p-4 rounded-2xl bg-white hover:bg-gray-50 transition-all active:scale-95"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <span className="font-medium text-gray-900">{action.title}</span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Activity Feed */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-medium text-gray-900">Recent Activity</h3>
              <Button variant="ghost" className="text-sm text-gray-600 p-0 gap-2">
                Filter
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {activityFeed.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <Card
                    key={index}
                    className="p-4 rounded-2xl bg-white hover:bg-gray-50 transition-all active:scale-98"
                  >
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex-shrink-0 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">
                            {activity.title}
                          </h4>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {/* Profile Sheet */}
      <Sheet open={profileOpen} onOpenChange={setProfileOpen}>
        <SheetContent side="left" className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Profile</SheetTitle>
          </SheetHeader>
          {/* Add profile content here */}
        </SheetContent>
      </Sheet>
    </main>
  );
}
