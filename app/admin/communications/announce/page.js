"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Bell,
  Users,
  MessageSquare,
  Send,
  Filter,
  Plus
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

// Mock announcements data
const announcements = [
  {
    id: 1,
    title: "New Meeting Guidelines",
    message: "Updated guidelines for conducting business meetings...",
    sender: "Admin",
    timestamp: "2025-06-15 10:30 AM",
    priority: "high",
    scope: "all_groups",
    readCount: 156,
    totalRecipients: 180,
  },
  {
    id: 2,
    title: "System Maintenance Notice",
    message: "The platform will be undergoing maintenance...",
    sender: "System",
    timestamp: "2025-06-14 02:00 PM",
    priority: "medium",
    scope: "all_groups",
    readCount: 142,
    totalRecipients: 180,
  },
  // Add more announcements as needed
];

export default function AnnouncementsPage() {
  const router = useRouter();
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [announcementData, setAnnouncementData] = useState({
    title: "",
    message: "",
    priority: "normal",
    scope: "all_groups",
    selectedGroups: [],
    sendEmail: true,
    sendPush: true,
  });

  // Mock groups for selection
  const groups = Array.from({ length: 21 }, (_, i) => ({
    id: i + 1,
    name: `Group ${i + 1}`
  }));

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    // Here you would:
    // 1. Validate the form
    // 2. Create the announcement
    // 3. Send notifications based on preferences
    console.log('Creating announcement:', announcementData);
    setShowNewDialog(false);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="px-4 sm:px-5 pt-6 sm:pt-14 pb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
              <h1 className="text-lg sm:text-xl font-semibold">Announcements</h1>
            </div>
            
            <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
              <DialogTrigger asChild>
                <Button className="bg-black text-white hover:bg-gray-800">
                  <Plus className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">New Announcement</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] w-[calc(100%-2rem)] p-4 sm:p-6">
                <DialogHeader>
                  <DialogTitle>Create Announcement</DialogTitle>
                  <DialogDescription>
                    Create and send a new announcement to groups
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleCreateAnnouncement} className="space-y-4 sm:space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Title
                      </label>
                      <Input
                        placeholder="Enter announcement title"
                        value={announcementData.title}
                        onChange={(e) =>
                          setAnnouncementData({ ...announcementData, title: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Message
                      </label>
                      <Textarea
                        placeholder="Enter announcement message"
                        value={announcementData.message}
                        onChange={(e) =>
                          setAnnouncementData({ ...announcementData, message: e.target.value })
                        }
                        required
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Priority</label>
                      <Select
                        value={announcementData.priority}
                        onValueChange={(value) =>
                          setAnnouncementData({ ...announcementData, priority: value })
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Scope</label>
                      <Select
                        value={announcementData.scope}
                        onValueChange={(value) =>
                          setAnnouncementData({ ...announcementData, scope: value })
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select scope" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all_groups">All Groups</SelectItem>
                          <SelectItem value="specific_groups">Specific Groups</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {announcementData.scope === "specific_groups" && (
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Select Groups
                        </label>
                        <Select
                          value={announcementData.selectedGroups}
                          onValueChange={(value) =>
                            setAnnouncementData({ ...announcementData, selectedGroups: value })
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select groups" />
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
                    )}

                    <div className="space-y-3">
                      <label className="text-sm font-medium block">
                        Notification Preferences
                      </label>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Send Email</span>
                        <Switch
                          checked={announcementData.sendEmail}
                          onCheckedChange={(checked) =>
                            setAnnouncementData({ ...announcementData, sendEmail: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Send Push Notification</span>
                        <Switch
                          checked={announcementData.sendPush}
                          onCheckedChange={(checked) =>
                            setAnnouncementData({ ...announcementData, sendPush: checked })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowNewDialog(false)}
                      className="w-full sm:w-auto"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="w-full sm:w-auto bg-black text-white hover:bg-gray-800"
                    >
                      Send Announcement
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 sm:px-5 py-3 sm:py-4">
        <div className="flex gap-2 sm:gap-4">
          <Select defaultValue="all" className="w-full sm:w-[180px]">
            <SelectTrigger>
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="normal">Normal Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all" className="w-full sm:w-[180px]">
            <SelectTrigger>
              <SelectValue placeholder="Filter by scope" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Scopes</SelectItem>
              <SelectItem value="all_groups">All Groups</SelectItem>
              <SelectItem value="specific">Specific Groups</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Announcements List */}
      <div className="px-4 sm:px-5 py-3 sm:py-4">
        <div className="space-y-3 sm:space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="p-3 sm:p-4">
              <div className="space-y-3 sm:space-y-4">
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-between">
                    <div className="flex items-start sm:items-center gap-2 flex-wrap">
                      <h3 className="font-medium">{announcement.title}</h3>
                      <Badge
                        variant={
                          announcement.priority === "high"
                            ? "destructive"
                            : announcement.priority === "medium"
                            ? "default"
                            : "secondary"
                        }
                        className="inline-flex"
                      >
                        {announcement.priority}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 sm:line-clamp-none">
                    {announcement.message}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-500 flex-wrap">
                    <span>By {announcement.sender}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{announcement.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                    <span className="text-xs sm:text-sm text-gray-500">
                      {announcement.readCount}/{announcement.totalRecipients} read
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
