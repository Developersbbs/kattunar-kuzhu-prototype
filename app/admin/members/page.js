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
  RiTeamLine,
  RiGroupLine,
  RiFilter2Line,
  RiSearchLine,
  RiMailLine,
  RiPhoneLine,
} from "react-icons/ri";

// Mock data
const members = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 234-567-8901",
    group: "Group 1",
    role: "Member",
    status: "active",
    joinDate: "2025-01-15",
    referrals: 5,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 234-567-8902",
    group: "Group 2",
    role: "Leader",
    status: "active",
    joinDate: "2024-11-20",
    referrals: 8,
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "m.brown@example.com",
    phone: "+1 234-567-8903",
    group: "Group 1",
    role: "Member",
    status: "inactive",
    joinDate: "2024-12-10",
    referrals: 3,
  },
];

export default function MembersPage() {
  const [filter, setFilter] = useState({
    status: "all",
    group: "all",
    role: "all",
  });
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Members</h1>
          <p className="text-sm text-gray-500">
            Manage and monitor group members
          </p>
        </div>
        <Button className="bg-gray-900 text-white hover:bg-gray-800">
          <RiTeamLine className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 sm:p-6">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-1.5 block">
                Status
              </label>
              <Select
                value={filter.status}
                onValueChange={(value) =>
                  setFilter((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-1.5 block">
                Group
              </label>
              <Select
                value={filter.group}
                onValueChange={(value) =>
                  setFilter((prev) => ({ ...prev, group: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Groups</SelectItem>
                  <SelectItem value="group1">Group 1</SelectItem>
                  <SelectItem value="group2">Group 2</SelectItem>
                  <SelectItem value="group3">Group 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-1.5 block">
                Role
              </label>
              <Select
                value={filter.role}
                onValueChange={(value) =>
                  setFilter((prev) => ({ ...prev, role: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="leader">Leader</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                className="w-full sm:w-auto h-10"
                onClick={() => {
                  setFilter({ status: "all", group: "all", role: "all" });
                  setSearchQuery("");
                }}
              >
                <RiFilter2Line className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Members List */}
      <div className="space-y-4">
        {members.map((member) => (
          <Card key={member.id} className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              {/* Member Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-lg truncate">{member.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {member.status}
                      </Badge>
                      <Badge variant="outline">{member.role}</Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <RiMailLine className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-900">{member.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <RiPhoneLine className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-900">{member.phone}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <RiGroupLine className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-600">Group:</span>
                      <span className="ml-2 text-gray-900">{member.group}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <RiTeamLine className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-600">Referrals:</span>
                      <span className="ml-2 text-gray-900">{member.referrals}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 sm:min-w-[120px]">
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
                <Button variant="outline" className="w-full">
                  Edit Member
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination placeholder */}
      <div className="flex justify-center pt-4">
        <div className="flex gap-2">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <Button variant="outline" className="bg-gray-100">
            1
          </Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  );
}
