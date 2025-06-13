"use client";
import { BiMenu, BiBell, BiHome, BiCalendar, BiSearch, BiTransfer, BiUser, BiLogoKickstarter } from "react-icons/bi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import Link from "next/link";

// Mock data - replace with real data
const overallStats = {
  members: 245,
  referrals: 789,
  businesses: 156,
  meetings: 45
};

const referralStats = [
  { name: "Completed", value: 45, color: "#22c55e" },
  { name: "Pending", value: 30, color: "#eab308" },
  { name: "Dropped", value: 15, color: "#ef4444" },
  { name: "Failed", value: 10, color: "#64748b" }
];

const dailyReferrals = [
  { date: "Mon", count: 4 },
  { date: "Tue", count: 6 },
  { date: "Wed", count: 8 },
  { date: "Thu", count: 5 },
  { date: "Fri", count: 7 },
  { date: "Sat", count: 9 },
  { date: "Sun", count: 3 }
];

const meetings = [
  {
    id: 1,
    title: "Weekly Group Meeting",
    date: "Tomorrow, 10:00 AM",
    location: "Virtual Meet",
    attendees: 18
  },
  {
    id: 2,
    title: "Business Networking",
    date: "Friday, 2:00 PM",
    location: "Hotel Taj",
    attendees: 45
  }
];

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="flex h-16 items-center px-4">
          <Sheet>
            <SheetTrigger asChild>
              <button className="mr-3">
                <BiMenu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%]">
              <div className="py-6">
                <div className="flex items-center gap-3 mb-6">
                  <BiLogoKickstarter className="h-8 w-8 text-primary" />
                  <h2 className="text-xl font-semibold">Kattunar Kuzhu</h2>
                </div>
                <Separator className="mb-6" />
                <nav className="space-y-4">
                  <Link href="/dashboard" className="flex items-center gap-3 text-primary">
                    <BiHome className="h-5 w-5" />
                    <span>Home</span>
                  </Link>
                  <Link href="/meetings" className="flex items-center gap-3">
                    <BiCalendar className="h-5 w-5" />
                    <span>Meetings</span>
                  </Link>
                  <Link href="/search" className="flex items-center gap-3">
                    <BiSearch className="h-5 w-5" />
                    <span>Search Businesses</span>
                  </Link>
                  <Link href="/referrals" className="flex items-center gap-3">
                    <BiTransfer className="h-5 w-5" />
                    <span>Referrals</span>
                  </Link>
                  <Link href="/profile" className="flex items-center gap-3">
                    <BiUser className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2">
            <BiLogoKickstarter className="h-7 w-7 text-primary" />
            <span className="font-semibold text-lg">KK</span>
          </div>

          <div className="flex-1"></div>

          <button className="relative">
            <BiBell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <ScrollArea className="flex-1">
        <div className="px-4 pb-20">
          {/* Overall Statistics */}
          <section className="grid grid-cols-2 gap-3 mt-4">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground font-medium">Members</div>
                <div className="text-2xl font-bold mt-1">{overallStats.members}</div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm">
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground font-medium">Referrals</div>
                <div className="text-2xl font-bold mt-1">{overallStats.referrals}</div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm">
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground font-medium">Businesses</div>
                <div className="text-2xl font-bold mt-1">{overallStats.businesses}</div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm">
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground font-medium">Meetings</div>
                <div className="text-2xl font-bold mt-1">{overallStats.meetings}</div>
              </CardContent>
            </Card>
          </section>

          {/* Referral Statistics */}
          <Card className="mt-6 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Referral Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <PieChart width={200} height={200}>
                  <Pie
                    data={referralStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {referralStats.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {referralStats.map((stat) => (
                  <div key={stat.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stat.color }} />
                    <span className="text-sm">{stat.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Daily Referrals */}
          <Card className="mt-6 bg-white shadow-sm overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Daily Referrals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <LineChart width={320} height={200} data={dailyReferrals} margin={{ left: -20 }}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#2563eb" 
                    strokeWidth={2}
                    dot={{ fill: '#2563eb' }}
                  />
                </LineChart>
              </div>
            </CardContent>
          </Card>

          {/* Own Statistics */}
          <Card className="mt-6 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Your Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground mt-1">Referrals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-sm text-muted-foreground mt-1">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">8</div>
                  <div className="text-sm text-muted-foreground mt-1">Meetings</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Meetings */}
          <section className="mt-6 mb-4">
            <h2 className="text-lg font-semibold mb-3">Upcoming Meetings</h2>
            <div className="space-y-3">
              {meetings.map((meeting) => (
                <Card key={meeting.id} className="bg-white shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-base">{meeting.title}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <BiCalendar className="text-muted-foreground w-4 h-4" />
                          <p className="text-sm text-muted-foreground">{meeting.date}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <BiHome className="text-muted-foreground w-4 h-4" />
                          <p className="text-sm text-muted-foreground">{meeting.location}</p>
                        </div>
                      </div>
                      <div className="text-sm text-primary font-medium">
                        {meeting.attendees} attendees
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </ScrollArea>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 border-t bg-white shadow-lg max-w-md mx-auto">
        <div className="grid h-full grid-cols-5 items-center">
          <Link href="/dashboard" className="flex flex-col items-center text-primary">
            <BiHome className="h-6 w-6" />
            <span className="text-xs mt-0.5">Home</span>
          </Link>
          <Link href="/meetings" className="flex flex-col items-center text-muted-foreground">
            <BiCalendar className="h-6 w-6" />
            <span className="text-xs mt-0.5">Meetings</span>
          </Link>
          <Link href="/search" className="flex flex-col items-center text-muted-foreground">
            <BiSearch className="h-6 w-6" />
            <span className="text-xs mt-0.5">Search</span>
          </Link>
          <Link href="/referrals" className="flex flex-col items-center text-muted-foreground">
            <BiTransfer className="h-6 w-6" />
            <span className="text-xs mt-0.5">Referrals</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center text-muted-foreground">
            <BiUser className="h-6 w-6" />
            <span className="text-xs mt-0.5">Profile</span>
          </Link>
        </div>
      </nav>
    </main>
  );
}
