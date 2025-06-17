"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import {
  RiNotification4Line,
  RiSearchLine,
  RiMore2Fill,
  RiArrowLeftLine,
  RiAddLine,
  RiFilter3Line,
  RiCloseLine,
} from "react-icons/ri";

// Mock announcements data
const announcements = [
  {
    id: 1,
    title: "Monthly Meeting Schedule Change",
    content:
      "The monthly meeting will now be held on the last Friday of each month.",
    group: "All Members",
    priority: "high",
    date: "Today, 10:30",
    author: "Admin",
  },
  {
    id: 2,
    title: "New Referral System Launch",
    content:
      "We are launching a new referral tracking system next week. All members are required to update their profiles with the latest business information to ensure smooth integration.",
    group: "Group 1",
    priority: "medium",
    date: "Yesterday",
    author: "System",
  },
  {
    id: 3,
    title: "Business Networking Event",
    content:
      "Join us for our quarterly business networking event. This is a great opportunity to meet fellow members and explore collaboration possibilities.",
    group: "All Members",
    priority: "low",
    date: "2 days ago",
    author: "Events Team",
  },
];

const groups = ["All Members", "Group 1", "Group 2", "Group 3"];
const priorities = ["high", "medium", "low"];

export default function AnnouncePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter announcements based on search and group
  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(search.toLowerCase()) ||
      announcement.content.toLowerCase().includes(search.toLowerCase());
    const matchesGroup =
      selectedGroup === "all" || announcement.group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const NewAnnouncementDialog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [group, setGroup] = useState("");
    const [priority, setPriority] = useState("");

    const handleSubmit = () => {
      if (!title.trim() || !content.trim() || !group || !priority) return;
      // Here you would typically send the data to your backend
      setIsNewDialogOpen(false);
    };

    return (
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            New Announcement
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <Input
              placeholder="Enter announcement title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Content</label>
            <Textarea
              placeholder="Enter announcement content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Target Group
              </label>
              <Select value={group} onValueChange={setGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Select group" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Priority</label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={() => setIsNewDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!title.trim() || !content.trim() || !group || !priority}
          >
            Post Announcement
          </Button>
        </DialogFooter>
      </DialogContent>
    );
  };

  return (
    <div className="h-[100vh] flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 text-white pt-12">
        <div className="px-2 py-3">
          <div className="flex items-center gap-2">
            <button
              className="p-2 hover:bg-gray-800 rounded-full"
              onClick={() => router.back()}
            >
              <RiArrowLeftLine className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold flex-1">Announcements</h1>
            <button
              className="p-2 hover:bg-gray-800 rounded-full"
              onClick={() => setShowFilters(!showFilters)}
            >
              <RiFilter3Line className="w-6 h-6" />
            </button>
            <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
              <DialogTrigger asChild>
                <button className="p-2 hover:bg-gray-800 rounded-full">
                  <RiAddLine className="w-6 h-6" />
                </button>
              </DialogTrigger>
              <NewAnnouncementDialog />
            </Dialog>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="space-y-3">
            <div className="relative">
              <RiSearchLine className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search announcements..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-gray-50 border-none"
              />
            </div>
            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
              <SelectTrigger className="bg-gray-50 border-none">
                <SelectValue placeholder="Filter by group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Groups</SelectItem>
                {groups.map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Announcements list */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {filteredAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <RiNotification4Line
                        className={`w-5 h-5 ${
                          announcement.priority === "high"
                            ? "text-gray-900"
                            : announcement.priority === "medium"
                            ? "text-gray-700"
                            : "text-gray-500"
                        }`}
                      />
                      <h3 className="font-medium text-gray-900">
                        {announcement.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {announcement.content}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap mt-2">
                      <Badge variant="secondary" className="rounded-full">
                        {announcement.group}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`rounded-full ${
                          announcement.priority === "high"
                            ? "border-gray-900 text-gray-900"
                            : announcement.priority === "medium"
                            ? "border-gray-700 text-gray-700"
                            : "border-gray-500 text-gray-500"
                        }`}
                      >
                        {announcement.priority}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {announcement.date} • {announcement.author}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="shrink-0">
                    <RiMore2Fill className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
