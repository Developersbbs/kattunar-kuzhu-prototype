"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Plus, 
  Calendar,
  Users,
  MapPin,
  Clock
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  LineChart,
  Line,
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
const monthlyAttendance = [
  { month: "Jan", attendance: 85, meetings: 4 },
  { month: "Feb", attendance: 88, meetings: 4 },
  { month: "Mar", attendance: 92, meetings: 5 },
  { month: "Apr", attendance: 87, meetings: 4 },
  { month: "May", attendance: 90, meetings: 4 },
  { month: "Jun", attendance: 94, meetings: 5 },
];

const meetingTypeData = [
  { name: "Business Network", value: 45 },
  { name: "Training", value: 25 },
  { name: "Special Event", value: 20 },
  { name: "Other", value: 10 },
];

const COLORS = ['#000000', '#404040', '#808080', '#c0c0c0'];

const upcomingMeetings = [
  {
    id: 1,
    title: "Weekly Business Network",
    type: "Business Network",
    date: "2025-06-20",
    time: "10:00 AM",
    location: "Chennai Central Hub",
    expectedAttendees: 45,
    confirmedAttendees: 38,
    group: "Group 1",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Product Showcase",
    type: "Special Event",
    date: "2025-06-22",
    time: "2:00 PM",
    location: "Virtual",
    expectedAttendees: 35,
    confirmedAttendees: 30,
    group: "Group 3",
    status: "upcoming",
  },
  // Add more meetings as needed
];

export default function MeetingStatisticsPage() {
  const router = useRouter();
  const [timeframe, setTimeframe] = useState("monthly");
  const [showNewMeetingDialog, setShowNewMeetingDialog] = useState(false);
  const [newMeetingData, setNewMeetingData] = useState({
    title: "",
    type: "",
    date: "",
    time: "",
    location: "",
    description: "",
    groupId: "",
  });

  // Mock groups for selection
  const groups = Array.from({ length: 21 }, (_, i) => ({
    id: i + 1,
    name: `Group ${i + 1}`
  }));

  const handleCreateMeeting = (e) => {
    e.preventDefault();
    // Here you would:
    // 1. Validate the form
    // 2. Create the meeting
    // 3. Send notifications to members
    console.log('Creating meeting:', newMeetingData);
    setShowNewMeetingDialog(false);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="px-5 pt-14 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <h1 className="text-xl font-semibold">Meeting Statistics</h1>
            </div>
            
            <Dialog open={showNewMeetingDialog} onOpenChange={setShowNewMeetingDialog}>
              <DialogTrigger asChild>
                <Button className="bg-black text-white hover:bg-gray-800">
                  <Plus className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Schedule New Meeting</DialogTitle>
                  <DialogDescription>
                    Create a new meeting and notify group members
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleCreateMeeting} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Meeting Title
                      </label>
                      <Input
                        placeholder="Enter meeting title"
                        value={newMeetingData.title}
                        onChange={(e) =>
                          setNewMeetingData({ ...newMeetingData, title: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Meeting Type
                      </label>
                      <Select
                        value={newMeetingData.type}
                        onValueChange={(value) =>
                          setNewMeetingData({ ...newMeetingData, type: value })
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="business">Business Network</SelectItem>
                          <SelectItem value="training">Training</SelectItem>
                          <SelectItem value="special">Special Event</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Date</label>
                        <Input
                          type="date"
                          value={newMeetingData.date}
                          onChange={(e) =>
                            setNewMeetingData({ ...newMeetingData, date: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Time</label>
                        <Input
                          type="time"
                          value={newMeetingData.time}
                          onChange={(e) =>
                            setNewMeetingData({ ...newMeetingData, time: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Location</label>
                      <Input
                        placeholder="Enter meeting location"
                        value={newMeetingData.location}
                        onChange={(e) =>
                          setNewMeetingData({ ...newMeetingData, location: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Description
                      </label>
                      <Textarea
                        placeholder="Enter meeting description"
                        value={newMeetingData.description}
                        onChange={(e) =>
                          setNewMeetingData({
                            ...newMeetingData,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Group</label>
                      <Select
                        value={newMeetingData.groupId}
                        onValueChange={(value) =>
                          setNewMeetingData({ ...newMeetingData, groupId: value })
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select group" />
                        </SelectTrigger>
                        <SelectContent>
                          {groups.map((group) => (
                            <SelectItem key={group.id} value={group.id.toString()}>
                              {group.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowNewMeetingDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                      Schedule Meeting
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="px-5 py-4">
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
      </div>

      {/* Overview Stats */}
      <div className="px-5 py-4">
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4">
            <h3 className="text-sm text-gray-500">Total Meetings</h3>
            <p className="text-2xl font-semibold mt-1">26</p>
            <p className="text-xs text-green-600 mt-1">+2 vs last month</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm text-gray-500">Avg. Attendance</h3>
            <p className="text-2xl font-semibold mt-1">89%</p>
            <p className="text-xs text-green-600 mt-1">+4% vs last month</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm text-gray-500">Active Groups</h3>
            <p className="text-2xl font-semibold mt-1">21</p>
            <p className="text-xs text-green-600 mt-1">All groups active</p>
          </Card>
        </div>
      </div>

      {/* Charts */}
      <div className="px-5 py-4 grid grid-cols-1 gap-4">
        {/* Attendance Trend */}
        <Card className="p-6">
          <h3 className="text-base font-medium mb-6">Attendance Trend</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyAttendance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#000000"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="meetings"
                  stroke="#666666"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Meeting Types */}
        <Card className="p-6">
          <h3 className="text-base font-medium mb-6">Meeting Types</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={meetingTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => 
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {meetingTypeData.map((entry, index) => (
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

      {/* Upcoming Meetings */}
      <div className="px-5 py-4">
        <Card className="p-6">
          <h3 className="text-base font-medium mb-6">Upcoming Meetings</h3>
          <div className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="p-4 border rounded-lg hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{meeting.title}</h4>
                      <Badge>{meeting.type}</Badge>
                    </div>
                    <div className="grid gap-2 mt-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{meeting.date} at {meeting.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{meeting.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{meeting.confirmedAttendees}/{meeting.expectedAttendees} confirmed</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{meeting.group}</p>
                    <Badge
                      variant="outline"
                      className="mt-2"
                    >
                      {meeting.status}
                    </Badge>
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
