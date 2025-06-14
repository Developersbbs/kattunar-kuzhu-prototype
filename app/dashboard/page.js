"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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
  MapPin,
  Mail,
  Phone,
  Building2,
  Edit,
  Share2,
  Search,
  User,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FaUserTie } from "react-icons/fa";
import { BiLogoKickstarter } from "react-icons/bi";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
// ScrollArea already imported above

export default function Dashboard() {
  const [showMeetingAlert, setShowMeetingAlert] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const router = useRouter();

  const userProfile = {
    name: "John Doe",
    groupNumber: 5,
    businessName: "Tech Solutions Inc.",
    category: "IT & Software",
    role: "CEO & Founder",
    memberSince: "June 2023",
    contactInfo: {
      email: "john.doe@techsolutions.com",
      phone: "+91 98765 43210",
      location: "Chennai, Tamil Nadu",
    },
    businessDetails: {
      type: "Technology Services",
      employees: "10-50",
      established: "2020",
      servicesOffered: [
        "Software Development",
        "IT Consulting",
        "Cloud Solutions",
      ],
    },
    stats: {
      meetings: 24,
      referrals: 15,
      connections: 120,
    },
  };

  const achievements = [
    {
      id: 1,
      title: "Referrals",
      value: "12",
      icon: UserPlus,
      details: "8 Successful • 4 Pending",
      trend: "+3 this month",
    },
    {
      id: 2,
      title: "Meetings",
      value: "8/10",
      icon: CalendarDays,
      details: "80% Attendance",
      trend: "Next: Tomorrow",
    },
    {
      id: 3,
      title: "Goals",
      value: "85%",
      icon: TrendingUp,
      details: "Monthly Target",
      trend: "5% to reach target",
    },
  ];

  const quickActions = [
    { title: "Directory", icon: Users, href: "/directory" },
    { title: "Create Referral", icon: Handshake, href: "/referral/new" },
    {
      title: "Schedule Meeting",
      icon: CalendarDays,
      href: "/meetings/schedule",
    },
    {
      title: "Post Requirement",
      icon: MessageSquarePlus,
      href: "/requirements/new",
    },
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

  const performanceData = {
    overview: {
      totalMembers: 450,
      activeMembers: 380,
      totalGroups: 21,
      monthlyReferrals: 145,
    },
    monthlyStats: [
      { month: "Jan", referrals: 65, meetings: 45, newMembers: 12 },
      { month: "Feb", referrals: 85, meetings: 52, newMembers: 15 },
      { month: "Mar", referrals: 95, meetings: 58, newMembers: 18 },
      { month: "Apr", referrals: 120, meetings: 62, newMembers: 22 },
      { month: "May", referrals: 135, meetings: 68, newMembers: 25 },
      { month: "Jun", referrals: 145, meetings: 72, newMembers: 28 },
    ],
    groupPerformance: [
      { group: "G1", score: 85 },
      { group: "G2", score: 92 },
      { group: "G3", score: 78 },
      { group: "G4", score: 95 },
      { group: "G5", score: 88 },
      { group: "G6", score: 82 },
      { group: "G7", score: 90 },
    ],
  };

  const requirementPosts = [
    {
      id: 1,
      company: "ABC Technologies",
      owner: "John Smith",
      group: "Group 5",
      requirement: "Web Development",
      description:
        "Need a full-stack developer for an e-commerce project. Experience with Next.js and Node.js required.",
      budget: "₹5-7 Lakhs",
      postedTime: "2 hours ago",
      category: "IT Services",
      responses: 3,
    },
    {
      id: 2,
      company: "Healthcare Plus",
      owner: "Sarah Chen",
      group: "Group 7",
      requirement: "Medical Equipment",
      description:
        "Looking for suppliers of high-quality medical diagnostic equipment for our new clinic.",
      budget: "₹15-20 Lakhs",
      postedTime: "5 hours ago",
      category: "Healthcare",
      responses: 5,
    },
    {
      id: 3,
      company: "Global Manufacturing",
      owner: "Raj Kumar",
      group: "Group 12",
      requirement: "Industrial Machinery",
      description:
        "Required CNC machine operators and maintenance service providers.",
      budget: "On Request",
      postedTime: "1 day ago",
      category: "Manufacturing",
      responses: 8,
    },
  ];

  const RequirementPostsSection = ({ posts }) => {
    return (
      <section>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-medium text-gray-900 text-sm">Recent Requirements</h3>
          <Button variant="ghost" size="sm" className="h-7 px-2 rounded-xl hover:bg-black/5">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="space-y-3">
          {posts.slice(0, 3).map((post) => (
            <Card key={post.id} className="p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-white">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-black/5 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="min-w-0">
                      <h3 className="font-medium text-sm truncate">{post.company}</h3>
                      <p className="text-xs text-gray-500">{post.group}</p>
                    </div>
                    <span className="text-xs text-gray-500 flex-shrink-0">{post.postedTime}</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm font-medium">{post.requirement}</p>
                    <p className="text-xs text-gray-600 line-clamp-2">{post.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs px-2 py-1 rounded-lg bg-black/5">{post.budget}</span>
                    <span className="text-xs text-gray-500">{post.responses} responses</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    );
  };

  const ProfileCard = ({ profile }) => {
    return (
      <Card className="rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="p-4">
          <div className="flex items-center gap-3">
            {/* Profile Image */}
            <div className="relative size-12 flex-shrink-0">
              <div className="w-full h-full rounded-xl bg-black text-white flex items-center justify-center">
                <FaUserTie className="size-6" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="truncate">
                  <h2 className="font-semibold truncate">{profile.name}</h2>
                  <p className="text-sm text-gray-500 truncate">{profile.businessName}</p>
                </div>
                <span className="flex-shrink-0 px-2.5 py-1 text-xs rounded-lg bg-black text-white font-medium">
                  G{profile.groupNumber}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t">
            <Card className="p-2 rounded-xl bg-gray-50/50">
              <div className="text-center">
                <p className="text-lg font-semibold">{profile.stats.meetings}</p>
                <p className="text-xs text-gray-500">Meetings</p>
              </div>
            </Card>
            <Card className="p-2 rounded-xl bg-gray-50/50">
              <div className="text-center">
                <p className="text-lg font-semibold">{profile.stats.referrals}</p>
                <p className="text-xs text-gray-500">Referrals</p>
              </div>
            </Card>
            <Card className="p-2 rounded-xl bg-gray-50/50">
              <div className="text-center">
                <p className="text-lg font-semibold">{profile.stats.connections}</p>
                <p className="text-xs text-gray-500">Network</p>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    );
  };

  const PerformanceSection = ({ data }) => {
    return (
      <section>
        <h3 className="font-medium text-gray-900 mb-3 text-sm px-1">Overall Performance</h3>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-black/5 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Members</p>
                <p className="text-lg font-semibold">{data.overview.totalMembers}</p>
              </div>
            </div>
          </Card>

          <Card className="p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-black/5 flex items-center justify-center">
                <Handshake className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Referrals</p>
                <p className="text-lg font-semibold">{data.overview.monthlyReferrals}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Chart */}
        <Card className="mt-3 p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-white">
          <h4 className="text-xs font-medium text-gray-900 mb-3">Monthly Activity</h4>
          <div className="h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.monthlyStats.slice(-4)}>
                <defs>
                  <linearGradient id="colorReferrals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000000" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={10} />
                <YAxis stroke="#9CA3AF" fontSize={10} width={25} />
                <Tooltip 
                  contentStyle={{
                    background: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="referrals"
                  stroke="#000000"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorReferrals)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>
    );
  };

  const AchievementsSection = ({ achievements, expandedCard, setExpandedCard }) => {
    return (
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-medium text-gray-900">Achievements</h3>
          <Button variant="ghost" className="text-sm text-gray-600 p-0">
            View All
          </Button>
        </div>

        <ScrollArea>
          <div className="flex space-x-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <Card
                  key={achievement.id}
                  className={cn(
                    "flex-shrink-0 p-4 w-60 cursor-pointer transition-all duration-200",
                    expandedCard === achievement.id
                      ? "bg-gray-50"
                      : "hover:bg-gray-50/50"
                  )}
                  onClick={() =>
                    setExpandedCard(
                      expandedCard === achievement.id ? null : achievement.id
                    )
                  }
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-600">
                        {achievement.title}
                      </h4>
                      <span className="text-2xl font-semibold">
                        {achievement.value}
                      </span>
                    </div>

                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-200",
                        expandedCard === achievement.id ? "mt-3" : "h-0"
                      )}
                    >
                      <p className="text-sm text-gray-500">{achievement.details}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {achievement.trend}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
    );
  };

  const QuickActionsSection = ({ actions }) => {
    return (
      <section>
        <h3 className="font-medium text-gray-900 mb-3 text-sm px-1">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Card 
                key={action.title} 
                className="p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-white hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-black/5 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">{action.title}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    );
  };

  const ActivityFeedSection = ({ activities }) => {
    return (
      <section>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-medium text-gray-900 text-sm">Recent Activity</h3>
          <Button variant="ghost" size="sm" className="h-7 px-2 rounded-xl hover:bg-black/5">
            View All
          </Button>
        </div>
        <Card className="divide-y rounded-2xl bg-gradient-to-br from-gray-50 to-white overflow-hidden">
          {activities.slice(0, 3).map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div 
                key={index} 
                className="flex items-center gap-3 p-3 hover:bg-black/[0.02] transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-black/5 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            );
          })}
        </Card>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Floating App Header */}
      <div className="sticky top-2 z-40 mx-4">
        <Card className="border shadow-sm bg-white/70 backdrop-blur-md">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-black text-white flex items-center justify-center">
                <BiLogoKickstarter className="w-5 h-5" />
              </div>
              <span className="font-medium text-sm">Kattunar Kuzhu</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-xl hover:bg-black/5"
              >
                <Bell className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-xl hover:bg-black/5"
              >
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="px-4 py-4 space-y-4 mt-4">
        {/* Profile Card */}
        <ProfileCard profile={userProfile} />

        {/* Overall Performance Section */}
        <PerformanceSection data={performanceData} />

        {/* Recent Requirement Posts */}
        <RequirementPostsSection posts={requirementPosts} />

        {/* Quick Actions */}
        <QuickActionsSection actions={quickActions} />

        {/* Recent Activity */}
        <ActivityFeedSection activities={activityFeed} />
      </div>

      {/* Dock-style Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
        <div className="max-w-md mx-auto">
          <Card className="border shadow-lg h-16 bg-gray-300 backdrop-blur-md rounded-full pointer-events-auto">
            <nav className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex-1 flex flex-col items-center gap-1.5 h-14 rounded-xl relative group transition-all duration-200",
                  router.pathname === "/" ? 
                    "bg-black text-white" : 
                    "hover:bg-black/5"
                )}
              >
                <div className="h-10 w-10 rounded-xl flex items-center justify-center relative">
                  <svg
                    className={cn(
                      "w-5 h-5 transition-all duration-200",
                      router.pathname === "/" ? "scale-100" : "group-hover:scale-110"
                    )}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium absolute bottom-1">Home</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex-1 flex flex-col items-center gap-1.5 h-14 rounded-xl relative group transition-all duration-200",
                  router.pathname === "/meetings" ? 
                    "bg-black text-white" : 
                    "hover:bg-black/5"
                )}
                onClick={() => router.push("/meetings")}
              >
                <div className="h-10 w-10 rounded-xl flex items-center justify-center">
                  <CalendarDays className={cn(
                    "w-5 h-5 transition-all duration-200",
                    router.pathname === "/meetings" ? "scale-100" : "group-hover:scale-110"
                  )} />
                </div>
                <span className="text-xs font-medium absolute bottom-1">Meetings</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex-1 flex flex-col items-center gap-1.5 h-14 rounded-xl relative group transition-all duration-200",
                  router.pathname === "/search" ? 
                    "bg-black text-white" : 
                    "hover:bg-black/5"
                )}
                onClick={() => router.push("/search")}
              >
                <div className="h-10 w-10 rounded-xl flex items-center justify-center">
                  <Search className={cn(
                    "w-5 h-5 transition-all duration-200",
                    router.pathname === "/search" ? "scale-100" : "group-hover:scale-110"
                  )} />
                </div>
                <span className="text-xs font-medium absolute bottom-1">Search</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex-1 flex flex-col items-center gap-1.5 h-14 rounded-xl relative group transition-all duration-200",
                  router.pathname === "/referrals" ? 
                    "bg-black text-white" : 
                    "hover:bg-black/5"
                )}
                onClick={() => router.push("/referrals")}
              >
                <div className="h-10 w-10 rounded-xl flex items-center justify-center">
                  <Handshake className={cn(
                    "w-5 h-5 transition-all duration-200",
                    router.pathname === "/referrals" ? "scale-100" : "group-hover:scale-110"
                  )} />
                </div>
                <span className="text-xs font-medium absolute bottom-1">Referral</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex-1 flex flex-col items-center gap-1.5 h-14 rounded-xl relative group transition-all duration-200",
                  router.pathname === "/requirements" ? 
                    "bg-black text-white" : 
                    "hover:bg-black/5"
                )}
                onClick={() => router.push("/requirements")}
              >
                <div className="h-10 w-10 rounded-xl flex items-center justify-center">
                  <MessageSquarePlus className={cn(
                    "w-5 h-5 transition-all duration-200",
                    router.pathname === "/requirements" ? "scale-100" : "group-hover:scale-110"
                  )} />
                </div>
                <span className="text-xs font-medium absolute bottom-1">Posts</span>
              </Button>
            </nav>
          </Card>
        </div>
      </div>

      {/* Profile Sheet */}
      <Sheet open={profileOpen} onOpenChange={setProfileOpen}>
        <SheetContent side="left" className="w-full sm:max-w-lg p-0">
          <div className="h-full overflow-y-auto">
            {/* Profile Header */}
            <div className="relative h-32 bg-gray-900">
              <div className="absolute -bottom-16 left-6 size-32 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center">
                <FaUserTie className="size-16 text-gray-600" />
              </div>
              <button className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20">
                <Edit className="size-4" />
              </button>
            </div>

            {/* Profile Content */}
            <div className="px-6 pt-20 pb-6 space-y-6">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{userProfile.name}</h2>
                    <p className="text-gray-500">{userProfile.role}</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Share2 className="size-4" /> Share Profile
                  </Button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-sm">
                    Group {userProfile.groupNumber}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-sm">
                    Member since {userProfile.memberSince}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Business Details */}
              <div className="space-y-4">
                <h3 className="font-medium">Business Information</h3>
                <Card className="p-4 rounded-xl space-y-3">
                  <div className="flex items-center gap-3">
                    <Building2 className="size-5 text-gray-500" />
                    <div>
                      <p className="font-medium">{userProfile.businessName}</p>
                      <p className="text-sm text-gray-500">
                        {userProfile.businessDetails.type}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500">Category</p>
                      <p className="font-medium">{userProfile.category}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Established</p>
                      <p className="font-medium">
                        {userProfile.businessDetails.established}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Team Size</p>
                      <p className="font-medium">
                        {userProfile.businessDetails.employees}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="font-medium">Contact Information</h3>
                <Card className="divide-y rounded-xl">
                  <div className="flex items-center gap-3 p-4">
                    <Phone className="size-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{userProfile.contactInfo.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4">
                    <Mail className="size-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{userProfile.contactInfo.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4">
                    <MapPin className="size-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">
                        {userProfile.contactInfo.location}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <h3 className="font-medium">Services Offered</h3>
                <div className="flex flex-wrap gap-2">
                  {userProfile.businessDetails.servicesOffered.map((service) => (
                    <span
                      key={service}
                      className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-600"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Statistics */}
              <div className="space-y-4">
                <h3 className="font-medium">Network Statistics</h3>
                <div className="grid grid-cols-3 gap-3">
                  <Card className="p-3 rounded-xl text-center">
                    <p className="text-2xl font-semibold">
                      {userProfile.stats.meetings}
                    </p>
                    <p className="text-sm text-gray-500">Meetings</p>
                  </Card>
                  <Card className="p-3 rounded-xl text-center">
                    <p className="text-2xl font-semibold">
                      {userProfile.stats.referrals}
                    </p>
                    <p className="text-sm text-gray-500">Referrals</p>
                  </Card>
                  <Card className="p-3 rounded-xl text-center">
                    <p className="text-2xl font-semibold">
                      {userProfile.stats.connections}
                    </p>
                    <p className="text-sm text-gray-500">Connections</p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
