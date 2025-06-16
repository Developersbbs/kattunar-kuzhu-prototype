"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// Mock data - replace with real data
const monthlyReferrals = [
  { month: "Jan", given: 65, received: 45, converted: 38 },
  { month: "Feb", given: 75, received: 55, converted: 42 },
  { month: "Mar", given: 85, received: 65, converted: 48 },
  { month: "Apr", given: 95, received: 75, converted: 52 },
  { month: "May", given: 105, received: 85, converted: 58 },
  { month: "Jun", given: 115, received: 95, converted: 62 },
];

const groupReferrals = [
  { name: "Group 1", given: 45, received: 35, conversion: 78 },
  { name: "Group 2", given: 38, received: 28, conversion: 74 },
  { name: "Group 3", given: 52, received: 42, conversion: 81 },
  { name: "Group 4", given: 35, received: 25, conversion: 71 },
  { name: "Group 5", given: 48, received: 38, conversion: 79 },
];

export default function ReferralAnalyticsPage() {
  const router = useRouter();
  const [timeframe, setTimeframe] = useState("monthly");
  const [selectedMetric, setSelectedMetric] = useState("all");

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="px-5 pt-14 pb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold">Referral Analytics</h1>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-5 py-4">
        <div className="flex gap-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Metrics</SelectItem>
              <SelectItem value="given">Converted</SelectItem>
              <SelectItem value="received">Pending</SelectItem>
              <SelectItem value="converted">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="px-5 py-4">
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="text-sm text-gray-500">Total Given</h3>
            <p className="text-2xl font-semibold mt-1">486</p>
            <p className="text-xs text-green-600 mt-1">+12% vs last month</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm text-gray-500">Conversion Rate</h3>
            <p className="text-2xl font-semibold mt-1">76%</p>
            <p className="text-xs text-green-600 mt-1">+5% vs last month</p>
          </Card>
        </div>
      </div>

      {/* Trends Chart */}
      <div className="px-5 py-4">
        <Card className="p-6">
          <h3 className="text-base font-medium mb-6">Referral Trends</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyReferrals}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="given"
                  stroke="#000000"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="received"
                  stroke="#666666"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="converted"
                  stroke="#999999"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Group Performance */}
      <div className="px-5 py-4">
        <Card className="p-6">
          <h3 className="text-base font-medium mb-6">Group Performance</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={groupReferrals}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="given" fill="#000000" />
                <Bar dataKey="received" fill="#666666" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </main>
  );
}
