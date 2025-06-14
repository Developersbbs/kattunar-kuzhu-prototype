"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Search, Users } from "lucide-react";

// Mock data for members
const members = [
  {
    id: 1,
    name: "John Smith",
    business: "Tech Solutions Inc.",
    role: "CEO",
    avatar: "/path-to-avatar.jpg",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    business: "Digital Marketing Co.",
    role: "Marketing Director",
    avatar: "/path-to-avatar.jpg",
  },
  // Add more mock members
];

export default function MemberSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.business.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectMember = (member) => {
    // Navigate to schedule form with selected member data
    router.push(`/meeting/schedule/form?memberId=${member.id}&memberName=${encodeURIComponent(member.name)}&memberBusiness=${encodeURIComponent(member.business)}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <div className="bg-white px-5 pt-16 pb-4 border-b">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => router.back()}
          >
            <IoMdArrowBack className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold">Select Member</h1>
        </div>
      </div>

      {/* Search Input */}
      <div className="px-5 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
      </div>

      {/* Members List */}
      <div className="px-5 space-y-3">
        {filteredMembers.map((member) => (
          <Card
            key={member.id}
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => selectMember(member)}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <span className="text-lg font-medium text-gray-600">
                  {member.name[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{member.name}</h3>
                <p className="text-sm text-gray-500 truncate">{member.business}</p>
                <p className="text-xs text-gray-400">{member.role}</p>
              </div>
            </div>
          </Card>
        ))}

        {filteredMembers.length === 0 && (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No members found</p>
          </div>
        )}
      </div>
    </main>
  );
}
