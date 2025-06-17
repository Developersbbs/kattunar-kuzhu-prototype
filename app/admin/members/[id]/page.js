"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  RiTeamLine,
  RiGroupLine,
  RiMailLine,
  RiPhoneLine,
  RiBuilding4Line,
  RiMapPin2Line,
  RiUser3Line,
  RiShakeHandsLine,
  RiCalendarEventLine,
  RiTaskLine,
  RiBriefcaseLine,
  RiGlobalLine,
  RiArrowLeftLine,
} from "react-icons/ri";

// Mock data for a member
const memberData = {
  id: 1,
  name: "John Smith",
  email: "john.smith@example.com",
  phone: "+1 234-567-8901",
  group: "Tech Innovators",
  role: "Member",
  status: "active",
  joinDate: "2025-01-15",
  business: {
    name: "Digital Solutions Inc.",
    category: "Technology",
    subcategories: ["Web Development", "Mobile Apps", "Cloud Services"],
    location: "San Francisco, CA",
    tagline: "Innovative Digital Solutions for Modern Businesses",
    website: "www.digitalsolutions.com",
  },
  stats: {
    referrals: 15,
    attendance: "85%",
    activeRequirements: 3,
    connections: 28,
  },
  referralHistory: [
    {
      id: 1,
      type: "Given",
      to: "Sarah Johnson",
      business: "Marketing Campaign Project",
      value: "$12,000",
      status: "completed",
      date: "2025-05-15",
    },
    {
      id: 2,
      type: "Received",
      from: "Mike Wilson",
      business: "Mobile App Development",
      value: "$25,000",
      status: "inProgress",
      date: "2025-06-01",
    },
  ],
  requirements: [
    {
      id: 1,
      title: "Senior Web Developer",
      status: "open",
      responses: 4,
      postedDate: "2025-06-10",
      budget: "$15,000 - $20,000",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      status: "closed",
      responses: 6,
      postedDate: "2025-05-20",
      budget: "$8,000 - $12,000",
    },
  ],
  meetings: [
    {
      id: 1,
      title: "Monthly Group Meeting",
      date: "2025-06-15",
      status: "attended",
      type: "Group",
    },
    {
      id: 2,
      title: "One-on-One Networking",
      date: "2025-06-10",
      status: "missed",
      type: "Individual",
    },
  ],
};

const statusColors = {
  active: "bg-gray-100 text-gray-800",
  inactive: "bg-gray-300 text-gray-700",
  completed: "bg-gray-200 text-gray-900",
  inProgress: "bg-gray-100 text-gray-800",
  pending: "bg-gray-50 text-gray-600",
  attended: "bg-gray-100 text-gray-800",
  missed: "bg-gray-300 text-gray-700",
  open: "bg-gray-100 text-gray-800",
  closed: "bg-gray-300 text-gray-700",
};

export default function MemberProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  
  // In a real app, fetch member data using the ID
  const member = memberData; // params.id would be used to fetch actual data

  return (
    <div className="container max-w-7xl mx-auto space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="mb-6 -ml-2 text-gray-600 hover:text-gray-900"
        onClick={() => router.back()}
      >
        <RiArrowLeftLine className="mr-2 h-5 w-5" />
        Back to Members
      </Button>

      {/* Header Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            {/* Basic Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold">{member.name}</h1>
                <Badge className={statusColors[member.status]}>
                  {member.status}
                </Badge>
              </div>
              <p className="text-gray-500">{member.business.tagline}</p>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <RiBriefcaseLine className="h-4 w-4" />
                  <span>{member.business.name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <RiMapPin2Line className="h-4 w-4" />
                  <span>{member.business.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <RiGlobalLine className="h-4 w-4" />
                  <span>{member.business.website}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <RiMailLine className="h-4 w-4" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <RiPhoneLine className="h-4 w-4" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <RiGroupLine className="h-4 w-4" />
                  <span>
                    {member.group} • {member.role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-4 min-w-[200px]">
            <Card className="p-3">
              <div className="text-sm text-gray-500">Referrals</div>
              <div className="text-2xl font-semibold">{member.stats.referrals}</div>
            </Card>
            <Card className="p-3">
              <div className="text-sm text-gray-500">Attendance</div>
              <div className="text-2xl font-semibold">{member.stats.attendance}</div>
            </Card>
            <Card className="p-3">
              <div className="text-sm text-gray-500">Requirements</div>
              <div className="text-2xl font-semibold">{member.stats.activeRequirements}</div>
            </Card>
            <Card className="p-3">
              <div className="text-sm text-gray-500">Connections</div>
              <div className="text-2xl font-semibold">{member.stats.connections}</div>
            </Card>
          </div>
        </div>
      </Card>

      {/* Tabs and Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-gray-100/50 p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="referrals" className="data-[state=active]:bg-white">
            Referrals
          </TabsTrigger>
          <TabsTrigger value="requirements" className="data-[state=active]:bg-white">
            Requirements
          </TabsTrigger>
          <TabsTrigger value="meetings" className="data-[state=active]:bg-white">
            Meetings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Business Details</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Category</div>
                  <div className="font-medium">{member.business.category}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Specializations</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {member.business.subcategories.map((subcat) => (
                      <Badge key={subcat} variant="outline">
                        {subcat}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Member Since</div>
                  <div className="font-medium">{member.joinDate}</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Latest Referral</div>
                  <div className="font-medium">{member.referralHistory[0].business}</div>
                  <div className="text-sm text-gray-500">{member.referralHistory[0].date}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Latest Requirement</div>
                  <div className="font-medium">{member.requirements[0].title}</div>
                  <div className="text-sm text-gray-500">{member.requirements[0].postedDate}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Latest Meeting</div>
                  <div className="font-medium">{member.meetings[0].title}</div>
                  <div className="text-sm text-gray-500">{member.meetings[0].date}</div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="referrals">
          <div className="space-y-4">
            {member.referralHistory.map((referral) => (
              <Card key={referral.id} className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{referral.type}</Badge>
                      <h4 className="font-medium">{referral.business}</h4>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <RiUser3Line className="h-4 w-4" />
                        {referral.type === "Given" ? `To: ${referral.to}` : `From: ${referral.from}`}
                      </span>
                      <span className="flex items-center gap-1">
                        <RiShakeHandsLine className="h-4 w-4" />
                        {referral.value}
                      </span>
                      <span className="flex items-center gap-1">
                        <RiCalendarEventLine className="h-4 w-4" />
                        {referral.date}
                      </span>
                    </div>
                  </div>
                  <Badge className={statusColors[referral.status]}>
                    {referral.status}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="requirements">
          <div className="space-y-4">
            {member.requirements.map((req) => (
              <Card key={req.id} className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{req.title}</h4>
                      <Badge className={statusColors[req.status]}>
                        {req.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <RiTaskLine className="h-4 w-4" />
                        {req.responses} responses
                      </span>
                      <span className="flex items-center gap-1">
                        <RiCalendarEventLine className="h-4 w-4" />
                        {req.postedDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <RiBriefcaseLine className="h-4 w-4" />
                        {req.budget}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline">View Details</Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="meetings">
          <div className="space-y-4">
            {member.meetings.map((meeting) => (
              <Card key={meeting.id} className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{meeting.title}</h4>
                      <Badge variant="outline">{meeting.type}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <RiCalendarEventLine className="h-4 w-4" />
                        {meeting.date}
                      </span>
                    </div>
                  </div>
                  <Badge className={statusColors[meeting.status]}>
                    {meeting.status}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
