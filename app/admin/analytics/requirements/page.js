"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Badge } from "@/components/ui/badge";

// Mock data
const monthlyRequirements = [
  { month: "Jan", posted: 35, fulfilled: 28 },
  { month: "Feb", posted: 42, fulfilled: 32 },
  { month: "Mar", posted: 38, fulfilled: 30 },
  { month: "Apr", posted: 45, fulfilled: 38 },
  { month: "May", posted: 48, fulfilled: 40 },
  { month: "Jun", posted: 52, fulfilled: 45 },
];

const categoryData = [
  { name: "Products", value: 35 },
  { name: "Services", value: 25 },
  { name: "Real Estate", value: 20 },
  { name: "Others", value: 20 },
];

const COLORS = ["#000000", "#404040", "#808080", "#c0c0c0"];

const recentRequirements = [
  {
    id: 1,
    title: "Office Space Required",
    category: "Real Estate",
    location: "Chennai Central",
    postedBy: "John Doe",
    group: "Group 1",
    status: "active",
    responses: 5,
  },
  {
    id: 2,
    title: "Web Developer Needed",
    category: "Services",
    location: "Remote",
    postedBy: "Jane Smith",
    group: "Group 3",
    status: "fulfilled",
    responses: 8,
  },
  // Add more requirements as needed
];

export default function RequirementsOverviewPage() {
  const router = useRouter();
  const [timeframe, setTimeframe] = useState("monthly");
  const [category, setCategory] = useState("all");

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
            <h1 className="text-xl font-semibold">Requirements Overview</h1>
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

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="products">Products</SelectItem>
              <SelectItem value="services">Services</SelectItem>
              <SelectItem value="real-estate">Real Estate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="px-5 py-4">
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="text-sm text-gray-500">Total Requirements</h3>
            <p className="text-2xl font-semibold mt-1">248</p>
            <p className="text-xs text-green-600 mt-1">+15% vs last month</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm text-gray-500">Fulfilled</h3>
            <p className="text-2xl font-semibold mt-1">186</p>
            <p className="text-xs text-green-600 mt-1">+12% vs last month</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm text-gray-500">Fulfillment Rate</h3>
            <p className="text-2xl font-semibold mt-1">75%</p>
            <p className="text-xs text-green-600 mt-1">+3% vs last month</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm text-gray-500">Pending</h3>
            <p className="text-2xl font-semibold mt-1">17</p>
            <p className="text-xs text-red-600 mt-1">-7% vs last month</p>
          </Card>
        </div>
      </div>

      {/* Charts */}
      <div className="px-5 py-4 grid grid-cols-1 gap-4">
        {/* Trends Chart */}
        <Card className="p-6">
          <h3 className="text-base font-medium mb-6">Requirements Trend</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRequirements}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="posted"
                  stackId="1"
                  stroke="#000000"
                  fill="#000000"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="fulfilled"
                  stackId="2"
                  stroke="#666666"
                  fill="#666666"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6">
          <h3 className="text-base font-medium mb-6">Category Distribution</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Requirements */}
      <div className="px-5 py-4">
        <Card className="p-6">
          <h3 className="text-base font-medium mb-6">Recent Requirements</h3>
          <div className="space-y-4">
            {recentRequirements.map((req) => (
              <div
                key={req.id}
                className="p-4 border rounded-lg hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{req.title}</h4>
                      <Badge
                        variant={
                          req.status === "active" ? "default" : "secondary"
                        }
                      >
                        {req.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {req.category} • {req.location}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Posted by {req.postedBy} in {req.group}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {req.responses} responses
                    </p>
                    {req.status === "active" && (
                      <TrendingUp className="h-4 w-4 text-green-600 ml-auto mt-1" />
                    )}
                    {req.status === "fulfilled" && (
                      <TrendingDown className="h-4 w-4 text-gray-400 ml-auto mt-1" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
