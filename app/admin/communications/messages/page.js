"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Users,
  Search,
  MoreVertical,
  Circle,
  MessageSquare
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

// Mock conversations data
const conversations = [
  {
    id: 1,
    type: "direct",
    name: "John Doe",
    avatar: "",
    group: "Group 1",
    lastMessage: "Thanks for the update!",
    timestamp: "10:30 AM",
    unread: 2,
    online: true
  },
  {
    id: 2,
    type: "group",
    name: "Group 1",
    avatar: "",
    memberCount: 30,
    lastMessage: "Meeting scheduled for tomorrow at 10 AM",
    timestamp: "Yesterday",
    unread: 5
  },
  {
    id: 3,
    type: "group",
    name: "Group 2",
    avatar: "",
    memberCount: 25,
    lastMessage: "Please submit your referrals by EOD",
    timestamp: "Yesterday",
    unread: 0
  }
];

export default function MessagesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-white">
      {/* Header */}
      <header className="flex-none px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
        <div className="flex items-center justify-between pt-6 sm:pt-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Messages</h1>
          </div>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
        <div className="mt-3 sm:mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <Input
            className="w-full pl-9 bg-gray-50 border-gray-200 focus:ring-gray-200"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-100 scrollbar-thin scrollbar-thumb-gray-200">
        {filteredConversations.map((conv) => (
          <button
            key={conv.id}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left transition-colors hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
            onClick={() => router.push(`/admin/communications/messages/${conv.id}`)}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative flex-none">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                </div>
                {conv.type === "direct" && conv.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gray-600 border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{conv.name}</p>
                    {conv.type === "group" && (
                      <span className="hidden sm:inline text-xs text-gray-500 truncate">({conv.memberCount} members)</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 flex-none whitespace-nowrap">{conv.timestamp}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-gray-500 truncate pr-2">{conv.lastMessage}</p>
                  {conv.unread > 0 && (
                    <span className="flex-none inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-gray-900 rounded-full">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
              <MessageSquare className="hidden sm:block h-5 w-5 text-gray-400 flex-none" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
