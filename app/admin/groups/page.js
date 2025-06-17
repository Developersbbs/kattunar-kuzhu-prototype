"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RiTeamLine,
  RiShakeHandsLine,
  RiAddLine,
  RiFilter2Line,
  RiGroupLine,
} from "react-icons/ri";

// Mock data
const groups = [
  {
    id: 1,
    name: "Group 1",
    members: 25,
    leader: "John Smith",
    category: "Technology",
    status: "active",
    referrals: 12,
    meetings: 8,
  },
  {
    id: 2,
    name: "Group 2",
    members: 18,
    leader: "Sarah Johnson",
    category: "Professional Services",
    status: "active",
    referrals: 8,
    meetings: 6,
  },
  {
    id: 3,
    name: "Group 3",
    members: 20,
    leader: "Michael Brown",
    category: "Finance",
    status: "active",
    referrals: 15,
    meetings: 10,
  },
];

export default function GroupsPage() {
  const [filter, setFilter] = useState({
    status: "all",
    category: "all",
  });

  return (
    <div className="container max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Groups</h1>
          <p className="text-sm text-gray-500">
            Manage and monitor business networking groups
          </p>
        </div>
        <Button className="bg-gray-900 text-white hover:bg-gray-800">
          <RiAddLine className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4 sm:p-6">
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
              Category
            </label>
            <Select
              value={filter.category}
              onValueChange={(value) =>
                setFilter((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="services">Professional Services</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button
              variant="outline"
              className="w-full sm:w-auto h-10"
              onClick={() => setFilter({ status: "all", category: "all" })}
            >
              <RiFilter2Line className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <Card key={group.id} className="flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-medium text-lg">{group.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{group.category}</p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {group.status}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <RiTeamLine className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-gray-600">Members:</span>
                  <span className="ml-auto font-medium">{group.members}</span>
                </div>
                <div className="flex items-center text-sm">
                  <RiGroupLine className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-gray-600">Leader:</span>
                  <span className="ml-auto font-medium">{group.leader}</span>
                </div>
                <div className="flex items-center text-sm">
                  <RiShakeHandsLine className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-gray-600">Referrals:</span>
                  <span className="ml-auto font-medium">{group.referrals}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t bg-gray-50 flex gap-2">
              <Button className="flex-1" variant="outline">View Members</Button>
              <Button className="flex-1" variant="outline">Edit Group</Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <Card>
          <div className="p-6">
            <h3 className="font-medium mb-4">Group Performance</h3>
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              Chart placeholder
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <h3 className="font-medium mb-4">Member Distribution</h3>
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              Chart placeholder
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
