"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Mail } from "lucide-react";

export default function InviteMemberPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    groupId: "",
    role: "MEMBER" // Default role
  });

  // Mock groups data - replace with real data fetching
  const groups = Array.from({ length: 21 }, (_, i) => ({
    id: i + 1,
    name: `Group ${i + 1}`
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically:
    // 1. Validate the form data
    // 2. Send invitation email
    // 3. Create pending member record
    console.log('Inviting member:', formData);
    
    // Mock success - replace with real API call
    setTimeout(() => {
      router.push('/admin/groups/' + formData.groupId);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="px-5 pt-14 pb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold">Invite New Member</h1>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-5 py-6">
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Member Name</label>
                <Input
                  placeholder="Enter member's full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Email Address</label>
                <Input
                  type="email"
                  placeholder="Enter member's email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="Enter member's phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Business Name</label>
                <Input
                  placeholder="Enter business name"
                  value={formData.business}
                  onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Assign to Group</label>
                <Select
                  value={formData.groupId}
                  onValueChange={(value) => setFormData({ ...formData, groupId: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a group" />
                  </SelectTrigger>
                  <SelectContent>
                    {groups.map((group) => (
                      <SelectItem key={group.id} value={group.id.toString()}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Role</label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MEMBER">Member</SelectItem>
                    <SelectItem value="GROUP_HEAD">Group Head</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              Send Invitation
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
}
