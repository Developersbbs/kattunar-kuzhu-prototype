"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  RiMapPin2Line,
  RiBriefcaseLine,
  RiUser3Line,
} from "react-icons/ri";

// Mock data
const members = [
  {
    id: 1,
    name: "John Smith",
    business: {
      name: "Digital Solutions Inc.",
      category: "Technology",
      location: "San Francisco, CA",
      tagline: "Innovative Digital Solutions for Modern Businesses",
    },
    group: "Group 1",
    role: "Member",
    status: "active",
    joinDate: "2025-01-15",
    stats: {
      referrals: 15,
      requirements: 3,
      connections: 28,
    },
  },
  {
    id: 2,
    name: "Sarah Johnson",
    business: {
      name: "Growth Marketing Co.",
      category: "Marketing",
      location: "New York, NY",
      tagline: "Data-Driven Marketing Strategies",
    },
    group: "Group 2",
    role: "Leader",
    status: "active",
    joinDate: "2024-11-20",
    stats: {
      referrals: 22,
      requirements: 5,
      connections: 45,
    },
  },
  {
    id: 3,
    name: "Michael Brown",
    business: {
      name: "Financial Advisors Group",
      category: "Finance",
      location: "Chicago, IL",
      tagline: "Expert Financial Planning & Wealth Management",
    },
    group: "Group 3",
    role: "Member",
    status: "inactive",
    joinDate: "2024-12-10",
    stats: {
      referrals: 8,
      requirements: 1,
      connections: 15,
    },
  },
  {
    id: 4,
    name: "Emily Davis",
    business: {
      name: "Tech Consulting Solutions",
      category: "Technology",
      location: "Austin, TX",
      tagline: "Enterprise Technology Consulting",
    },
    group: "Group 1",
    role: "Member",
    status: "active",
    joinDate: "2025-02-01",
    stats: {
      referrals: 12,
      requirements: 2,
      connections: 20,
    },
  },
  {
    id: 5,
    name: "David Wilson",
    business: {
      name: "Legal Advisory Partners",
      category: "Legal",
      location: "Boston, MA",
      tagline: "Expert Legal Solutions for Businesses",
    },
    group: "Group 2",
    role: "Member",
    status: "active",
    joinDate: "2025-01-05",
    stats: {
      referrals: 18,
      requirements: 4,
      connections: 32,
    },
  },
];

const categories = [
  "Technology",
  "Marketing",
  "Finance",
  "Legal",
  "Healthcare",
  "Real Estate",
  "Manufacturing",
  "Consulting",
];

const locations = [
  "San Francisco, CA",
  "New York, NY",
  "Chicago, IL",
  "Los Angeles, CA",
  "Boston, MA",
  "Austin, TX",
];

const statusColors = {
  active: "bg-gray-100 text-gray-800",
  inactive: "bg-gray-300 text-gray-700",
};

export default function MembersPage() {
  const router = useRouter();
  const [filter, setFilter] = useState({
    status: "all",
    group: "all",
    category: "all",
    location: "all",
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and search functions
  const filterMembers = (member) => {
    // Handle filter conditions
    const matchesStatus = filter.status === "all" || member.status === filter.status;
    const matchesGroup = filter.group === "all" || member.group === filter.group;
    const matchesCategory = filter.category === "all" || member.business.category === filter.category;
    const matchesLocation = filter.location === "all" || member.business.location === filter.location;
    
    // Advanced search with combinations
    if (searchQuery.trim() === "") {
      return matchesStatus && matchesGroup && matchesCategory && matchesLocation;
    }

    // Split search terms and process each
    const searchTerms = searchQuery.toLowerCase().split(' ');
    
    // Check if all search terms match at least one field
    const matchesSearch = searchTerms.every(term => {
      // Skip empty terms
      if (!term) return true;

      // Handle special search operators
      if (term.includes(':')) {
        const [field, value] = term.split(':');
        switch(field) {
          case 'group':
            return member.group.toLowerCase().includes(value);
          case 'category':
            return member.business.category.toLowerCase().includes(value);
          case 'location':
            return member.business.location.toLowerCase().includes(value);
          case 'business':
            return member.business.name.toLowerCase().includes(value);
          case 'role':
            return member.role.toLowerCase().includes(value);
          default:
            return false;
        }
      }

      // Regular search across all fields
      return (
        member.name.toLowerCase().includes(term) ||
        member.business.name.toLowerCase().includes(term) ||
        member.business.tagline.toLowerCase().includes(term) ||
        member.business.category.toLowerCase().includes(term) ||
        member.business.location.toLowerCase().includes(term) ||
        member.group.toLowerCase().includes(term) ||
        member.role.toLowerCase().includes(term)
      );
    });

    return matchesStatus && matchesGroup && matchesCategory && matchesLocation && matchesSearch;
  };

  const filteredMembers = members.filter(filterMembers);

  return (
    <div className="container max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Members</h1>
          <p className="text-sm text-gray-500">
            View and manage all members across groups
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
          <div className="space-y-2">
            <div className="relative">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search members (e.g., 'tech group:1' or 'category:marketing location:new york')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="text-xs text-gray-500">
              Search tips: Use space for multiple terms. Use field:value for specific searches (fields: group, category, location, business, role)
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Select
              value={filter.status}
              onValueChange={(value) =>
                setFilter((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filter.category}
              onValueChange={(value) =>
                setFilter((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filter.group}
              onValueChange={(value) =>
                setFilter((prev) => ({ ...prev, group: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Groups</SelectItem>
                {Array.from(new Set(members.map(m => m.group))).map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setFilter({
                  status: "all",
                  group: "all",
                  category: "all",
                  location: "all",
                });
                setSearchQuery("");
              }}
            >
              <RiFilter2Line className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Total Members</div>
            <div className="text-2xl font-semibold">{filteredMembers.length}</div>
            <div className="text-sm text-gray-500">
              {Math.round((filteredMembers.filter(m => m.status === "active").length / filteredMembers.length) * 100)}% active
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Total Referrals</div>
            <div className="text-2xl font-semibold">
              {filteredMembers.reduce((sum, m) => sum + m.stats.referrals, 0)}
            </div>
            <div className="text-sm text-gray-500">
              Avg. {Math.round(filteredMembers.reduce((sum, m) => sum + m.stats.referrals, 0) / filteredMembers.length)} per member
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Active Requirements</div>
            <div className="text-2xl font-semibold">
              {filteredMembers.reduce((sum, m) => sum + m.stats.requirements, 0)}
            </div>
            <div className="text-sm text-gray-500">
              Across all members
            </div>
          </div>
        </Card>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.length === 0 ? (
          <Card className="p-8 text-center md:col-span-2 lg:col-span-3">
            <div className="text-gray-500">No members found matching your criteria</div>
          </Card>
        ) : (
          filteredMembers.map((member) => (
            <Card
              key={member.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push(`/admin/members/${member.id}`)}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.business.name}</p>
                  </div>
                  <Badge className={statusColors[member.status]}>
                    {member.status}
                  </Badge>
                </div>

                {/* Business Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <RiBriefcaseLine className="h-4 w-4" />
                    <span>{member.business.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <RiMapPin2Line className="h-4 w-4" />
                    <span>{member.business.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <RiGroupLine className="h-4 w-4" />
                    <span>{member.group}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                  <div className="text-center">
                    <div className="text-sm font-medium">{member.stats.referrals}</div>
                    <div className="text-xs text-gray-500">Referrals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{member.stats.requirements}</div>
                    <div className="text-xs text-gray-500">Requirements</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{member.stats.connections}</div>
                    <div className="text-xs text-gray-500">Connections</div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
