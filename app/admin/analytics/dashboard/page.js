"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  RiTeamLine,
  RiShakeHandsLine,
  RiBarChartBoxLine,
  RiGroupLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiCalendarEventLine,
  RiUserAddLine
} from "react-icons/ri";

// Key metrics for quick overview
const metrics = [
  {
    label: "Members",
    value: "1,234",
    change: "+12.5%",
    trend: "up",
    icon: RiTeamLine,
  },
  {
    label: "Groups",
    value: "56",
    change: "+3.2%",
    trend: "up",
    icon: RiGroupLine,
  },
  {
    label: "Meetings",
    value: "89",
    change: "-2.4%",
    trend: "down",
    icon: RiCalendarEventLine,
  },
  {
    label: "Referrals",
    value: "432",
    highlight: "+28.1%",
    trend: "up",
    icon: RiShakeHandsLine,
  },
];

// Recent updates for activity feed
const updates = [
  {
    id: 1,
    type: "member",
    title: "5 New Members Joined",
    time: "2h ago",
    icon: RiUserAddLine,
  },
  {
    id: 2,
    type: "meeting",
    title: "Group 1 Meeting",
    subtitle: "12 participants",
    time: "3h ago",
    icon: RiCalendarEventLine,
    status: "Completed",
  },
  {
    id: 3,
    type: "referral",
    title: "New Referral",
    subtitle: "Group 2 → Group 3",
    time: "5h ago",
    icon: RiShakeHandsLine,
  },
];

// Top performing groups
const topGroups = [
  {
    name: "Group 1",
    stats: {
      members: 45,
      activity: "High",
      trend: "up",
    },
  },
  {
    name: "Group 2",
    stats: {
      members: 38,
      activity: "Medium",
      trend: "up",
    },
  },
  {
    name: "Group 3",
    stats: {
      members: 32,
      activity: "Medium",
      trend: "stable",
    },
  },
];

function TrendIcon({ trend, className }) {
  if (trend === "up") return <RiArrowUpLine className={cn("text-gray-900", className)} />;
  if (trend === "down") return <RiArrowDownLine className={cn("text-gray-900", className)} />;
  return null;
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="overflow-hidden">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-100">
                  <metric.icon className="h-5 w-5 text-gray-700" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-gray-500">
                    {metric.label}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold tracking-tight text-gray-900">
                      {metric.value}
                    </span>
                    {metric.change && (
                      <div className="flex items-center text-sm">
                        <TrendIcon trend={metric.trend} className="h-4 w-4" />
                        <span className="text-gray-700">
                          {metric.change}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-5 gap-4">
        {/* Activity Feed */}
        <Card className="md:col-span-3">
          <div className="p-4 sm:p-5 space-y-4">
            <h2 className="font-semibold text-gray-900">Recent Updates</h2>
            <div className="space-y-4">
              {updates.map((update) => (
                <div key={update.id} className="flex gap-3">
                  <div className="p-2 rounded-lg bg-gray-100 self-start">
                    <update.icon className="h-4 w-4 text-gray-700" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">{update.title}</p>
                      <span className="text-sm text-gray-500">{update.time}</span>
                    </div>
                    {update.subtitle && (
                      <p className="text-sm text-gray-500">{update.subtitle}</p>
                    )}
                    {update.status && (
                      <Badge variant="secondary" className="text-xs">
                        {update.status}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Top Groups */}
        <Card className="md:col-span-2">
          <div className="p-4 sm:p-5 space-y-4">
            <h2 className="font-semibold text-gray-900">Top Groups</h2>
            <div className="space-y-3">
              {topGroups.map((group, index) => (
                <div
                  key={group.name}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-lg",
                    index === 0 ? "bg-gray-100" : "bg-gray-50"
                  )}
                >
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900">{group.name}</p>
                    <p className="text-sm text-gray-500">
                      {group.stats.members} members
                    </p>
                  </div>
                  <Badge variant={
                    group.stats.activity === "High" ? "secondary" :
                    "outline"
                  }>
                    {group.stats.activity}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
