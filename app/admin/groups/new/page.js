"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NewGroupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    meetingDay: "",
    meetingTime: "",
    headId: "", // Group head ID
    adminId: "", // Admin ID
  });

  // Mock users data for selection
  const availableUsers = [
    { id: 1, name: "John Doe", business: "JD Enterprise" },
    { id: 2, name: "Jane Smith", business: "Smith & Co" },
    { id: 3, name: "Mike Johnson", business: "MJ Solutions" },
    // Add more mock users as needed
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically:
    // 1. Validate the form data
    // 2. Create the group
    // 3. Assign head and admin
    console.log('Creating group:', formData);
    
    // Mock success - replace with real API call
    setTimeout(() => {
      router.push('/admin/groups');
    }, 1000);
  };

  const days = [
    "Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday", "Sunday"
  ];

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
            <h1 className="text-xl font-semibold">Create New Group</h1>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-5 py-6">
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Group Name</label>
                <Input
                  placeholder="Enter group name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  placeholder="Enter group description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Input
                  placeholder="Enter meeting location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Meeting Day</label>
                  <Select
                    value={formData.meetingDay}
                    onValueChange={(value) => setFormData({ ...formData, meetingDay: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map((day) => (
                        <SelectItem key={day} value={day.toLowerCase()}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Meeting Time</label>
                  <Input
                    type="time"
                    value={formData.meetingTime}
                    onChange={(e) => setFormData({ ...formData, meetingTime: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Assign Group Head</label>
                <Select
                  value={formData.headId}
                  onValueChange={(value) => setFormData({ ...formData, headId: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select group head" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name} - {user.business}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Assign Admin</label>
                <Select
                  value={formData.adminId}
                  onValueChange={(value) => setFormData({ ...formData, adminId: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select admin" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name} - {user.business}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              Create Group
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
}
