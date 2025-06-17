"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  RiShakeHandsLine,
  RiGroupLine,
  RiCalendarEventLine,
  RiFilter2Line,
  RiSearchLine,
  RiUser3Line,
  RiTeamLine,
  RiExchangeDollarLine,
} from "react-icons/ri";

// Mock data for members
const members = [
  {
    id: 1,
    name: "John Smith",
    group: "Group 1",
    role: "Member",
    totalReferrals: 12,
    totalValue: "$25,000",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    group: "Group 2",
    role: "Leader",
    totalReferrals: 8,
    totalValue: "$18,000",
  },
];

// Mock data for groups
const groups = [
  {
    id: 1,
    name: "Group 1",
    totalReferrals: 45,
    totalValue: "$120,000",
    members: 25,
  },
  {
    id: 2,
    name: "Group 2",
    totalReferrals: 38,
    totalValue: "$95,000",
    members: 20,
  },
];

// Mock data for referrals
const referrals = [
  {
    id: 1,
    fromGroup: "Group 1",
    toGroup: "Group 2",
    fromMember: "John Smith",
    toMember: "Sarah Johnson",
    business: "Technology Services",
    type: "Direct",
    status: "completed",
    value: "$5,000",
    date: "2025-06-15",
    description: "Web development project referral",
  },
  {
    id: 2,
    fromGroup: "Group 2",
    toGroup: "Group 1",
    fromMember: "Sarah Johnson",
    toMember: "Mike Wilson",
    business: "Marketing Consultation",
    type: "Indirect",
    status: "pending",
    value: "$3,000",
    date: "2025-06-14",
    description: "Social media marketing campaign",
  },
];

const statusColors = {
  completed: "bg-gray-100 text-gray-800",
  pending: "bg-gray-50 text-gray-600",
  inProgress: "bg-gray-200 text-gray-900",
};

export default function ReferralsPage() {
  const [filter, setFilter] = useState({
    status: "all",
    group: "all",
    type: "all",
    view: "all",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [showMemberHistory, setShowMemberHistory] = useState(false);
  const [viewMode, setViewMode] = useState("list");

  // Filter and search functions
  const filterReferrals = (referral) => {
    const matchesStatus = filter.status === "all" || referral.status === filter.status;
    const matchesGroup = filter.group === "all" || referral.fromGroup === filter.group || referral.toGroup === filter.group;
    const matchesType = filter.type === "all" || referral.type === filter.type;
    const matchesSearch = searchQuery.trim() === "" || 
      referral.business.toLowerCase().includes(searchQuery.toLowerCase()) ||
      referral.fromMember.toLowerCase().includes(searchQuery.toLowerCase()) ||
      referral.toMember.toLowerCase().includes(searchQuery.toLowerCase()) ||
      referral.fromGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      referral.toGroup.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesGroup && matchesType && matchesSearch;
  };

  const filterGroups = (group) => {
    return searchQuery.trim() === "" || 
      group.name.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const filterMembers = (member) => {
    return searchQuery.trim() === "" ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.group.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const filteredReferrals = referrals.filter(filterReferrals);
  const filteredGroups = groups.filter(filterGroups);
  const filteredMembers = members.filter(filterMembers);
  const memberReferrals = referrals.filter(
    (ref) => ref.fromMember === selectedMember?.name || ref.toMember === selectedMember?.name
  );

  return (
    <div className="container max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Referrals</h1>
          <p className="text-sm text-gray-500">
            Track and manage business referrals between groups and members
          </p>
        </div>
      </div>

      {/* View Selector and Search */}
      <Card className="p-4 sm:p-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Tabs
              defaultValue="list"
              className="flex-1"
              onValueChange={setViewMode}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list" className="flex items-center gap-2">
                  <RiShakeHandsLine className="h-4 w-4" />
                  All Groups
                </TabsTrigger>
                <TabsTrigger value="members" className="flex items-center gap-2">
                  <RiGroupLine className="h-4 w-4" />
                  By members
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search referrals, members, or groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Content Sections */}
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="space-y-2">
              <div className="text-sm text-gray-500">Total Referrals</div>
              <div className="text-2xl font-semibold">{filteredReferrals.length}</div>
              <div className="text-sm text-gray-500">
                {viewMode === "list" ? "Showing all referrals" :
                 viewMode === "groups" ? `Across ${filteredGroups.length} groups` :
                 `From ${filteredMembers.length} members`}
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="space-y-2">
              <div className="text-sm text-gray-500">Total Value</div>
              <div className="text-2xl font-semibold">
                ${filteredReferrals.reduce((sum, ref) => sum + parseInt(ref.value.replace(/\$|,/g, '')), 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Combined referral value</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="space-y-2">
              <div className="text-sm text-gray-500">Status Breakdown</div>
              <div className="flex gap-2">
                {Object.keys(statusColors).map(status => (
                  <Badge key={status} className={statusColors[status]}>
                    {filteredReferrals.filter(r => r.status === status).length}
                  </Badge>
                ))}
              </div>
              <div className="text-sm text-gray-500">Completed / Pending / In Progress</div>
            </div>
          </Card>
        </div>

        {viewMode === "list" && (
          <div className="space-y-4">
            {filteredReferrals.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="text-gray-500">No referrals found matching your criteria</div>
              </Card>
            ) : (
              filteredReferrals.map((referral) => (
                <Card key={referral.id} className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{referral.business}</h3>
                        <Badge
                          className={statusColors[referral.status]}
                          variant="secondary"
                        >
                          {referral.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <RiGroupLine className="h-4 w-4" />
                          {referral.fromGroup} → {referral.toGroup}
                        </span>
                        <span className="flex items-center gap-1">
                          <RiUser3Line className="h-4 w-4" />
                          <button
                            className="hover:text-gray-900"
                            onClick={() => {
                              setSelectedMember(members.find(m => m.name === referral.fromMember));
                              setShowMemberHistory(true);
                            }}
                          >
                            {referral.fromMember}
                          </button>
                          {" → "}
                          <button
                            className="hover:text-gray-900"
                            onClick={() => {
                              setSelectedMember(members.find(m => m.name === referral.toMember));
                              setShowMemberHistory(true);
                            }}
                          >
                            {referral.toMember}
                          </button>
                        </span>
                        <span className="flex items-center gap-1">
                          <RiCalendarEventLine className="h-4 w-4" />
                          {referral.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <RiShakeHandsLine className="h-4 w-4" />
                          {referral.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Value</div>
                        <div className="font-semibold">{referral.value}</div>
                      </div>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {viewMode === "groups" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGroups.length === 0 ? (
              <Card className="p-8 text-center md:col-span-2">
                <div className="text-gray-500">No groups found matching your criteria</div>
              </Card>
            ) : (
              filteredGroups.map((group) => (
                <Card key={group.id} className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{group.name}</h3>
                      <Badge variant="outline">{group.members} members</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">Total Referrals</div>
                        <div className="text-2xl font-semibold">{group.totalReferrals}</div>
                        <div className="text-sm text-gray-500">
                          Avg. ${Math.round(parseInt(group.totalValue.replace(/\$|,/g, '')) / group.totalReferrals).toLocaleString()} per referral
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">Total Value</div>
                        <div className="text-2xl font-semibold">{group.totalValue}</div>
                        <div className="text-sm text-gray-500">
                          ${Math.round(parseInt(group.totalValue.replace(/\$|,/g, '')) / group.members).toLocaleString()} per member
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        View Group Details
                      </Button>
                      <Button variant="outline" className="flex-1">
                        View Referrals
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {viewMode === "members" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMembers.length === 0 ? (
              <Card className="p-8 text-center md:col-span-2">
                <div className="text-gray-500">No members found matching your criteria</div>
              </Card>
            ) : (
              filteredMembers.map((member) => (
                <Card key={member.id} className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-gray-500">{member.group}</p>
                      </div>
                      <Badge variant="secondary">{member.role}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">Total Referrals</div>
                        <div className="text-2xl font-semibold">{member.totalReferrals}</div>
                        <div className="text-sm text-gray-500">
                          Avg. ${Math.round(parseInt(member.totalValue.replace(/\$|,/g, '')) / member.totalReferrals).toLocaleString()} per referral
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">Total Value</div>
                        <div className="text-2xl font-semibold">{member.totalValue}</div>
                        <div className="text-sm text-gray-500">
                          {member.totalReferrals > 0 ? `${member.totalReferrals} successful referrals` : 'No referrals yet'}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setSelectedMember(member);
                          setShowMemberHistory(true);
                        }}
                      >
                        View Referral History
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Member Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}
      </div>

      {/* Member History Dialog */}
      <Dialog open={showMemberHistory} onOpenChange={setShowMemberHistory}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RiUser3Line className="h-5 w-5" />
              {selectedMember?.name}&apos;s Referral History
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {/* Member Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <Card className="p-4">
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Total Referrals</div>
                  <div className="text-2xl font-semibold">{selectedMember?.totalReferrals}</div>
                  <p className="text-sm text-gray-500">{selectedMember?.group}</p>
                  <Badge variant="secondary">{selectedMember?.role}</Badge>
                </div>
              </Card>
              <Card className="p-4">
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Total Value</div>
                  <div className="text-2xl font-semibold">{selectedMember?.totalValue}</div>
                  <p className="text-sm text-gray-500">
                    Avg. ${Math.round(parseInt(selectedMember?.totalValue?.replace(/\$|,/g, '') || 0) / (selectedMember?.totalReferrals || 1)).toLocaleString()} per referral
                  </p>
                </div>
              </Card>
              <Card className="p-4">
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Status Breakdown</div>
                  <div className="flex gap-2">
                    {Object.keys(statusColors).map(status => (
                      <Badge key={status} className={statusColors[status]}>
                        {memberReferrals.filter(r => r.status === status).length}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">Active this month: {memberReferrals.filter(r => new Date(r.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}</p>
                </div>
              </Card>
            </div>

            {/* Analysis Tabs */}
            <Tabs defaultValue="timeline" className="mb-6">
              <TabsList>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>
              <TabsContent value="timeline">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {memberReferrals.sort((a, b) => new Date(b.date) - new Date(a.date)).map((referral) => (
                      <Card key={referral.id} className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{referral.business}</h3>
                            <Badge className={statusColors[referral.status]}>
                              {referral.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{referral.description}</p>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <RiCalendarEventLine className="h-4 w-4" />
                              {referral.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <RiExchangeDollarLine className="h-4 w-4" />
                              {referral.value}
                            </span>
                            <span className="flex items-center gap-1">
                              <RiGroupLine className="h-4 w-4" />
                              {referral.fromMember === selectedMember?.name ? 
                                `To ${referral.toGroup}` : 
                                `From ${referral.fromGroup}`}
                            </span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="insights">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-6">
                    {/* Top Collaborations */}
                    <div className="space-y-3">
                      <h4 className="font-medium">Top Collaborations</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(
                          memberReferrals.reduce((acc, ref) => {
                            const group = ref.fromMember === selectedMember?.name ? ref.toGroup : ref.fromGroup;
                            acc[group] = (acc[group] || 0) + 1;
                            return acc;
                          }, {})
                        )
                          .sort(([,a], [,b]) => b - a)
                          .slice(0, 4)
                          .map(([group, count]) => (
                            <Card key={group} className="p-3">
                              <div className="text-sm font-medium">{group}</div>
                              <div className="text-gray-500">{count} referrals</div>
                            </Card>
                          ))}
                      </div>
                    </div>

                    {/* Value Distribution */}
                    <div className="space-y-3">
                      <h4 className="font-medium">Value Distribution</h4>
                      <Card className="p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Highest Value</span>
                            <span className="font-medium">
                              ${Math.max(...memberReferrals.map(r => parseInt(r.value.replace(/\$|,/g, ''))))
                                .toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Average Value</span>
                            <span className="font-medium">
                              ${Math.round(memberReferrals.reduce((sum, r) => sum + parseInt(r.value.replace(/\$|,/g, '')), 0) / memberReferrals.length)
                                .toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Total Active Value</span>
                            <span className="font-medium">
                              ${memberReferrals
                                .filter(r => r.status !== 'completed')
                                .reduce((sum, r) => sum + parseInt(r.value.replace(/\$|,/g, '')), 0)
                                .toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Recent Activity */}
                    <div className="space-y-3">
                      <h4 className="font-medium">Recent Activity</h4>
                      <div className="space-y-2">
                        {memberReferrals
                          .filter(r => new Date(r.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
                          .sort((a, b) => new Date(b.date) - new Date(a.date))
                          .slice(0, 3)
                          .map(referral => (
                            <Card key={referral.id} className="p-3">
                              <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                  <div className="font-medium">{referral.business}</div>
                                  <div className="text-sm text-gray-500">{referral.date}</div>
                                </div>
                                <Badge className={statusColors[referral.status]}>
                                  {referral.status}
                                </Badge>
                              </div>
                            </Card>
                          ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
