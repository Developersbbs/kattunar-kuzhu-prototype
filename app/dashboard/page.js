"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FiArrowUpRight } from "react-icons/fi";
import { FiArrowDownLeft } from "react-icons/fi";


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
  Plus 
} from "lucide-react";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import { MobileNav } from "@/components/mobile-nav";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the line chart
const monthlyPosts = [
  { month: 'Jan', posts: 25 },
  { month: 'Feb', posts: 32 },
  { month: 'Mar', posts: 28 },
  { month: 'Apr', posts: 45 },
  { month: 'May', posts: 38 },
  { month: 'Jun', posts: 52 }
];

export default function Dashboard() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMeetingAlert, setShowMeetingAlert] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
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
        growth: "+3 this month"
      },
      meetings: {
        attended: 8,
        total: 10,
        nextDate: "Tomorrow, 10:00 AM"
      }
    }
  };

  // Mock meeting data - replace with real data later
  const meetings = [
    {
      id: 1,
      title: "Project Sync",
      time: "10:00 AM",
      date: "Tomorrow",
      attendees: 5,
      status: "upcoming"
    },
    {
      id: 2,
      title: "Budget Review",
      time: "1:00 PM",
      date: "Tomorrow",
      attendees: 3,
      status: "upcoming"
    },
    {
      id: 3,
      title: "Team Standup",
      time: "3:00 PM",
      date: "Tomorrow",
      attendees: 8,
      status: "completed"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-28">
      {/* Profile Header */}
      <div className="bg-white px-5 pt-16 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
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
              <p className="text-sm text-gray-500 mt-0.5">
                {user.business}
              </p>
            </div>
          </div>

          {/* Notification Icon */}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full hover:bg-gray-100"
            onClick={() => setShowNotifications(!showNotifications)}
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
                  <span className="text-sm font-medium text-white/80">Today&apos;s Meeting</span>
                </div>

                {/* Meeting Details */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Weekly Business Meet</h3>
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
      <div className="px-5 py-4 overflow-hidden">
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide -mx-1 px-1">
          {/* Referrals Card */}
          <Card className="flex-shrink-0 w-[280px] p-4 bg-white">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-xl">
                    <Handshake className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">Referrals</span>
                </div>
                <h3 className="text-2xl font-semibold mt-2">248</h3>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs font-medium text-green-600">+12%</span>
                  <span className="text-xs text-gray-500">vs last week</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-500">This month</span>
                <span className="text-lg font-medium mt-1">+45</span>
                <span className="text-xs text-gray-500 mt-1">vs 32 last month</span>
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
                  <span className="text-sm font-medium text-gray-600">Requirements</span>
                </div>
                <h3 className="text-2xl font-semibold mt-2">156</h3>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs font-medium text-green-600">+8%</span>
                  <span className="text-xs text-gray-500">vs last week</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-500">This month</span>
                <span className="text-lg font-medium mt-1">+28</span>
                <span className="text-xs text-gray-500 mt-1">vs 24 last month</span>
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
                  <span className="text-sm font-medium text-gray-600">Active Meetings</span>
                </div>
                <h3 className="text-2xl font-semibold mt-2">42</h3>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs font-medium text-green-600">+15%</span>
                  <span className="text-xs text-gray-500">vs last week</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-500">This month</span>
                <span className="text-lg font-medium mt-1">+12</span>
                <span className="text-xs text-gray-500 mt-1">vs 8 last month</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Requirements Posts Chart and Quick Actions Grid */}
      <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                  width={30}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                  labelStyle={{ color: '#111827', fontWeight: 500 }}
                />
                <Line
                  type="monotone"
                  dataKey="posts"
                  stroke="#111827"
                  strokeWidth={2}
                  dot={{
                    r: 4,
                    fill: '#FFF',
                    stroke: '#111827',
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 6,
                    fill: '#111827',
                    stroke: '#FFF',
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

        {/* Quick Actions */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gray-100 rounded-xl">
                <Handshake className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium">Manage Referrals</h3>
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
                <FiArrowUpRight />
                Given
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 rounded-full border-gray-200 hover:bg-gray-50 hover:text-black"
              >
                <FiArrowDownLeft />
                Taken
              </Button>
              <Button
                size="icon"
                className="h-10 w-10 rounded-full bg-black text-white hover:bg-gray-800"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </main>
  );
}
