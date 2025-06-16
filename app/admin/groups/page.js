"use client";

import { Suspense } from "react";
import { useState } from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  ChevronRight,
  Activity,
  Star,
} from "lucide-react";

// Utility function to generate mock groups
function generateMockGroups() {
  const groups = [];
  for (let i = 0; i < 21; i++) {
    groups.push({
      id: i + 1,
      name: `Group ${i + 1}`,
      memberCount: Math.floor(Math.random() * 30) + 20,
      activeMemberCount: Math.floor(Math.random() * 20) + 15,
      pendingApprovals: Math.floor(Math.random() * 5),
      head: {
        id: 100 + i,
        name: `Group Head ${i + 1}`,
        business: `Business ${i + 1}`,
        since: "2024"
      },
      admin: {
        id: 200 + i,
        name: `Admin ${i + 1}`,
        since: "2024"
      }
    });
  }
  return groups;
}

// Generate mock data
const mockGroups = generateMockGroups();

// Mock members data structure
const mockMembers = {
  1: [
    {
      id: 101,
      name: "Member 1",
      business: "Business 1",
      role: "GROUP_HEAD",
      status: "active",
      joinDate: "2024-01-15",
      activity: {
        meetings: 24,
        referrals: 15,
        requirements: 8
      }
    }
  ]
};

const mockPendingMembers = {
  1: [ // Group ID
    {
      id: 201,
      name: "Vikram Singh",
      business: "VS Technologies",
      appliedDate: "2025-06-14",
      status: "pending"
    },
    // Add more pending members...
  ]
};

function GroupManagementPage() {
  const router = useRouter();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showMemberDetails, setShowMemberDetails] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const groupsPerPage = 10;

  if (!router) return null;

  const filteredGroups = mockGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGroups.length / groupsPerPage);
  const paginatedGroups = filteredGroups.slice(
    (currentPage - 1) * groupsPerPage,
    currentPage * groupsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
  };

  const handleMemberSelect = (member) => {
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
                onClick={() => {
                  if (selectedGroup) {
                    setSelectedGroup(null);
                  } else {
                    router.back();
                  }
                }}
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <h1 className="text-xl font-semibold">
                {selectedGroup ? selectedGroup.name : "Groups Management"}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-5 py-4 sticky top-[76px] bg-gray-50 z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder={selectedGroup ? "Search members..." : "Search groups..."}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pb-20">
        {!selectedGroup ? (
          <>
            {/* Groups List */}
            <div className="space-y-4">
              {paginatedGroups.map((group) => (
                <Card
                  key={group.id}
                  className="p-4 hover:border-gray-400 cursor-pointer transition-colors"
                  onClick={() => handleGroupSelect(group)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{group.name}</h3>
                        {group.pendingApprovals > 0 && (
                          <Badge className="bg-gray-900 text-white">
                            {group.pendingApprovals} pending
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {group.activeMemberCount} active members
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>

                  <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-gray-100 rounded-full">
                        <Star className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Group Head</p>
                        <p className="text-sm font-medium">{group.head.name}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pb-6">
                <Button
                  variant="outline"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          // Members List
          <div className="space-y-6">
            {/* Pending Approvals Section */}
            {mockPendingMembers[selectedGroup.id]?.length > 0 && (
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-3">
                  Pending Approvals
                </h2>
                <div className="space-y-3">
                  {mockPendingMembers[selectedGroup.id].map((member) => (
                    <Card key={member.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-sm text-gray-500">
                            {member.business}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Applied: {member.appliedDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8"
                            onClick={() => console.log("Reject", member.id)}
                          >
                            <UserX className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                          <Button
                            className="h-8 bg-gray-900"
                            size="sm"
                            onClick={() => console.log("Approve", member.id)}
                          >
                            <UserCheck className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Active Members Section */}
            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-3">
                Active Members
              </h2>
              <div className="space-y-3">
                {mockMembers[selectedGroup.id].map((member) => (
                  <Card
                    key={member.id}
                    className="p-4 hover:border-gray-400 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{member.name}</h3>
                          {member.role === "GROUP_HEAD" && (
                            <Badge variant="outline">Group Head</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {member.business}
                        </p>

                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-500">
                              {member.activity.meetings} meetings
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Activity className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-500">
                              {member.activity.referrals} referrals
                            </span>
                          </div>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            onClick={() => handleMemberSelect(member)}
                          >
                            View Details
                          </DropdownMenuItem>
                          {member.role !== "GROUP_HEAD" && (
                            <DropdownMenuItem>
                              Make Group Head
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600">
                            Remove from Group
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Member Details Dialog */}
      <Dialog open={showMemberDetails} onOpenChange={setShowMemberDetails}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Member Details</DialogTitle>
            <DialogDescription>
              Detailed information and activity history
            </DialogDescription>
          </DialogHeader>

          {selectedMember && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">{selectedMember.name}</h3>
                <p className="text-sm text-gray-500">{selectedMember.business}</p>
                <p className="text-sm text-gray-500">
                  Joined: {selectedMember.joinDate}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4">
                  <p className="text-sm text-gray-500">Meetings</p>
                  <p className="text-2xl font-semibold mt-1">
                    {selectedMember.activity.meetings}
                  </p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-gray-500">Referrals</p>
                  <p className="text-2xl font-semibold mt-1">
                    {selectedMember.activity.referrals}
                  </p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-gray-500">Requirements</p>
                  <p className="text-2xl font-semibold mt-1">
                    {selectedMember.activity.requirements}
                  </p>
                </Card>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                {selectedMember.role !== "GROUP_HEAD" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      console.log("Make group head:", selectedMember.id);
                      setShowMemberDetails(false);
                    }}
                  >
                    Make Group Head
                  </Button>
                )}
                <Button
                  className="bg-gray-900"
                  onClick={() => setShowMemberDetails(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}

// Default export wrapper with error handling
export default function Page() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <GroupManagementPage />
    </Suspense>
  );
}
