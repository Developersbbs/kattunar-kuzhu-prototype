"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Calendar,
  Clock,
  Edit,
  Share2,
  ChevronRight,
  FileText,
  MessageSquare,
  Star,
  Handshake,
  BookMarked,
  Settings,
} from "lucide-react";

// Mock business profile data
const businessProfile = {
  name: "ABC Tech Solutions",
  logo: null, // Add actual logo path
  type: "Technology Services",
  established: "2020",
  location: "Chennai, Tamil Nadu",
  description: "Leading provider of innovative technology solutions for businesses across India. Specializing in software development, cloud services, and digital transformation.",
  contact: {
    phone: "+91 98765 43210",
    email: "contact@abctech.com",
    website: "www.abctech.com",
    address: "123 Anna Salai, Chennai - 600002"
  },
  stats: {
    meetings: 145,
    referrals: 89,
    requirements: 34,
    connections: 256
  },
  businessHours: [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 1:00 PM" },
    { day: "Sunday", hours: "Closed" }
  ],
  services: [
    "Software Development",
    "Cloud Solutions",
    "IT Consulting",
    "Digital Marketing",
    "Mobile App Development"
  ],
  certifications: [
    "ISO 9001:2015",
    "CMMI Level 3",
    "Microsoft Gold Partner"
  ],
  recentActivity: [
    {
      type: "meeting",
      title: "Business Network Meet",
      date: "Yesterday",
      description: "Attended the weekly business networking session"
    },
    {
      type: "referral",
      title: "Web Development Project",
      date: "2 days ago",
      description: "Received referral for an e-commerce project"
    },
    {
      type: "requirement",
      title: "Mobile App Development",
      date: "1 week ago",
      description: "Posted requirement for React Native developer"
    }
  ]
};

export default function BusinessProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="px-5 pt-14 pb-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full -ml-2"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Business Profile Header */}
      <div className="px-5 py-6">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center flex-shrink-0">
            <Building2 className="w-8 h-8 text-gray-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl font-semibold">{businessProfile.name}</h1>
                <p className="text-gray-500 mt-1">{businessProfile.type}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{businessProfile.location}</span>
                </div>
              </div>
              <Button className="bg-gray-900 hover:bg-gray-800">
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-5">
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-xl">
                <Calendar className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Meetings</p>
                <p className="text-xl font-semibold mt-1">
                  {businessProfile.stats.meetings}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-xl">
                <Handshake className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Referrals</p>
                <p className="text-xl font-semibold mt-1">
                  {businessProfile.stats.referrals}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-5">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="mt-6">
            <div className="px-5 space-y-6">
              {/* Description */}
              <Card className="p-4">
                <h3 className="font-medium mb-2">About Business</h3>
                <p className="text-sm text-gray-600">{businessProfile.description}</p>
              </Card>

              {/* Contact Information */}
              <Card className="p-4">
                <h3 className="font-medium mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{businessProfile.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{businessProfile.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{businessProfile.contact.website}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{businessProfile.contact.address}</span>
                  </div>
                </div>
              </Card>

              {/* Business Hours */}
              <Card className="p-4">
                <h3 className="font-medium mb-4">Business Hours</h3>
                <div className="space-y-3">
                  {businessProfile.businessHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{schedule.day}</span>
                      <span className="font-medium">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Services */}
              <Card className="p-4">
                <h3 className="font-medium mb-4">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {businessProfile.services.map((service, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="rounded-full text-xs"
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Certifications */}
              <Card className="p-4">
                <h3 className="font-medium mb-4">Certifications</h3>
                <div className="space-y-3">
                  {businessProfile.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <BookMarked className="w-4 h-4" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <div className="px-5 space-y-4">
              {businessProfile.recentActivity.map((activity, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-xl">
                      {activity.type === "meeting" && <Calendar className="w-4 h-4 text-gray-600" />}
                      {activity.type === "referral" && <Handshake className="w-4 h-4 text-gray-600" />}
                      {activity.type === "requirement" && <FileText className="w-4 h-4 text-gray-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{activity.title}</h3>
                        <span className="text-xs text-gray-500">{activity.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="business" className="mt-6">
            <div className="px-5 space-y-6">
              {/* Business Documents */}
              <Card className="p-4">
                <h3 className="font-medium mb-4">Business Documents</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">GST Registration</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8">
                      View
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Business Registration</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8">
                      View
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Business Settings */}
              <Card className="divide-y">
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-between p-4 h-auto"
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4" />
                    <span>Team Members</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-between p-4 h-auto"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4" />
                    <span>Business Communications</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-between p-4 h-auto"
                >
                  <div className="flex items-center gap-3">
                    <Settings className="w-4 h-4" />
                    <span>Profile Settings</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
