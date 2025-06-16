"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Search,
  Users,
  UserPlus,
  Settings,
  MoreVertical,
  Shield,
  UserCheck,
  UserX,
  Activity,
  Star,
  Mail,
  Phone,
  Calendar,
  Briefcase
} from "lucide-react";

// Utility function to generate mock members for a group
function generateMockMembers(groupId) {
  const members = [];
  const totalMembers = Math.floor(Math.random() * 10) + 15; // 15-25 members

  for (let i = 0; i < totalMembers; i++) {
    members.push({
      id: i + 1,
      name: `Member ${i + 1}`,
      email: `member${i + 1}@example.com`,
      phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      business: `Business ${i + 1}`,
      role: i === 0 ? "GROUP_HEAD" : i === 1 ? "ADMIN" : "MEMBER",
      status: Math.random() > 0.1 ? "active" : "inactive",
      joinDate: "2024-01-15",
      activity: {
        meetings: Math.floor(Math.random() * 30),
        referrals: Math.floor(Math.random() * 20),
        requirements: Math.floor(Math.random() * 15)
      }
    });
  }
  return members;
}

export default function GroupDetailsPage({ params }) {
  const router = useRouter();
  const groupId = params.id;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [showMemberDetails, setShowMemberDetails] = useState(false);
  
  // Mock group data - replace with real data fetching
  const groupData = {
    id: groupId,
    name: `Group ${groupId}`,
    memberCount: 25,
    activeMemberCount: 22,
    pendingApprovals: 3,
    head: {
      id: 1,
      name: "Member 1",
      business: "Business 1",
      since: "2024"
    },
    admin: {
      id: 2,
      name: "Member 2",
      since: "2024"
    }
  };

  const members = generateMockMembers(groupId);
  
  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.business.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setShowMemberDetails(true);
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
              <div>
                <h1 className="text-xl font-semibold">{groupData.name}</h1>
                <p className="text-sm text-gray-500">
                  {groupData.activeMemberCount} active members
                </p>
              </div>
            </div>
            
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => router.push('/admin/groups/' + groupId + '/edit')}
            >
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-5 py-4 sticky top-[76px] bg-gray-50 z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search members..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Group Stats */}
      <div className="px-5 py-4">
        <Card className="p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-semibold">{groupData.memberCount}</p>
              <p className="text-sm text-gray-500">Total Members</p>
            </div>
            <div className="text-center border-x">
              <p className="text-2xl font-semibold text-green-600">
                {groupData.activeMemberCount}
              </p>
              <p className="text-sm text-gray-500">Active</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-400">
                {groupData.memberCount - groupData.activeMemberCount}
              </p>
              <p className="text-sm text-gray-500">Inactive</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Members List */}
      <div className="px-5 pb-20">
        <div className="space-y-4">
          {filteredMembers.map((member) => (
            <Card
              key={member.id}
              className="p-4 hover:border-gray-400 cursor-pointer transition-colors"
              onClick={() => handleMemberClick(member)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{member.name}</h3>
                    {member.role === "GROUP_HEAD" && (
                      <Badge className="bg-black text-white">Group Head</Badge>
                    )}
                    {member.role === "ADMIN" && (
                      <Badge variant="outline">Admin</Badge>
                    )}
                    {member.status === "inactive" && (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{member.business}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>

              <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-lg font-medium">{member.activity.meetings}</p>
                  <p className="text-xs text-gray-500">Meetings</p>
                </div>
                <div className="text-center border-x">
                  <p className="text-lg font-medium">{member.activity.referrals}</p>
                  <p className="text-xs text-gray-500">Referrals</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium">
                    {member.activity.requirements}
                  </p>
                  <p className="text-xs text-gray-500">Requirements</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Member Details Dialog */}
      <Dialog open={showMemberDetails} onOpenChange={setShowMemberDetails}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Member Details</DialogTitle>
            <DialogDescription>
              Detailed information about the member
            </DialogDescription>
          </DialogHeader>
          
          {selectedMember && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{selectedMember.name}</h3>
                  <Badge
                    className={
                      selectedMember.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }
                  >
                    {selectedMember.status.charAt(0).toUpperCase() + 
                     selectedMember.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="grid gap-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{selectedMember.business}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{selectedMember.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{selectedMember.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">Joined {selectedMember.joinDate}</span>
                  </div>
                </div>
              </div>

              {/* Activity Stats */}
              <div>
                <h4 className="text-sm font-medium mb-3">Activity Overview</h4>
                <Card className="p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-semibold">
                        {selectedMember.activity.meetings}
                      </p>
                      <p className="text-xs text-gray-500">Meetings</p>
                    </div>
                    <div className="text-center border-x">
                      <p className="text-2xl font-semibold">
                        {selectedMember.activity.referrals}
                      </p>
                      <p className="text-xs text-gray-500">Referrals</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-semibold">
                        {selectedMember.activity.requirements}
                      </p>
                      <p className="text-xs text-gray-500">Requirements</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowMemberDetails(false)}>
                  Close
                </Button>
                <Button
                  variant="default"
                  className="bg-black text-white hover:bg-gray-800"
                  onClick={() => {
                    // Handle view full profile action
                    router.push('/admin/members/' + selectedMember.id);
                  }}
                >
                  View Full Profile
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
