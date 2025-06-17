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
  ScrollArea,
  ScrollBar,
} from "@/components/ui/scroll-area";
import {
  RiMessage2Line,
  RiSearchLine,
  RiMailLine,
  RiFilter2Line,
  RiSendPlaneLine,
  RiTimeLine,
  RiPushpinLine,
  RiAttachment2,
} from "react-icons/ri";

// Mock data
const messages = [
  {
    id: 1,
    subject: "Weekly Meeting Follow-up",
    content: "Here are the action items from our last meeting...",
    sender: "John Smith",
    group: "Group 1",
    date: "2025-06-17T10:30:00",
    status: "read",
    isPinned: true,
    hasAttachments: true,
  },
  {
    id: 2,
    subject: "New Business Opportunity",
    content: "I wanted to discuss a potential collaboration...",
    sender: "Sarah Johnson",
    group: "Group 2",
    date: "2025-06-17T09:15:00",
    status: "unread",
    isPinned: false,
    hasAttachments: false,
  },
  {
    id: 3,
    subject: "Group Event Planning",
    content: "Let's coordinate the upcoming networking event...",
    sender: "Michael Brown",
    group: "Group 1",
    date: "2025-06-16T15:45:00",
    status: "read",
    isPinned: false,
    hasAttachments: true,
  },
];

export default function MessagesPage() {
  const [filter, setFilter] = useState({
    status: "all",
    group: "all",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  return (
    <div className="container max-w-7xl mx-auto">
      <div className="flex h-[calc(100vh-6rem)]">
        {/* Messages List */}
        <div className="w-full lg:w-[400px] border-r flex flex-col">
          {/* Header */}
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold">Messages</h1>
              <Button className="bg-gray-900 text-white hover:bg-gray-800">
                <RiMessage2Line className="mr-2 h-4 w-4" />
                New Message
              </Button>
            </div>
            
            {/* Search */}
            <div className="relative">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="p-4 border-b">
            <div className="flex gap-2">
              <Select
                value={filter.status}
                onValueChange={(value) =>
                  setFilter((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Messages</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setFilter({ status: "all", group: "all" })}
              >
                <RiFilter2Line className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages List */}
          <ScrollArea className="flex-1">
            <div className="divide-y">
              {messages.map((message) => (
                <button
                  key={message.id}
                  className={
                    "w-full text-left p-4 hover:bg-gray-50 transition-colors " +
                    (selectedMessage?.id === message.id ? "bg-gray-50" : "")
                  }
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={
                          "font-medium " +
                          (message.status === "unread" ? "" : "text-gray-600")
                        }>
                          {message.sender}
                        </span>
                        {message.isPinned && (
                          <RiPushpinLine className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                      <h3 className={
                        "text-sm truncate " +
                        (message.status === "unread" ? "font-medium" : "text-gray-600")
                      }>
                        {message.subject}
                      </h3>
                      <p className="text-sm text-gray-500 truncate mt-1">
                        {message.content}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(message.date)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <ScrollBar />
          </ScrollArea>
        </div>

        {/* Message View */}
        <div className="hidden lg:flex flex-col flex-1">
          {selectedMessage ? (
            <>
              <div className="p-6 border-b">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">
                      {selectedMessage.subject}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <RiMailLine className="h-4 w-4" />
                        {selectedMessage.sender}
                      </span>
                      <span className="flex items-center gap-1">
                        <RiTimeLine className="h-4 w-4" />
                        {formatDate(selectedMessage.date)}
                      </span>
                      {selectedMessage.hasAttachments && (
                        <span className="flex items-center gap-1">
                          <RiAttachment2 className="h-4 w-4" />
                          Attachments
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      Reply
                    </Button>
                    <Button variant="outline">
                      Forward
                    </Button>
                  </div>
                </div>
                <Badge variant="outline">{selectedMessage.group}</Badge>
              </div>
              <ScrollArea className="flex-1 p-6">
                <div className="max-w-3xl">
                  <p className="text-gray-600 whitespace-pre-line">
                    {selectedMessage.content}
                  </p>
                </div>
                <ScrollBar />
              </ScrollArea>
              <div className="p-4 border-t bg-gray-50">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your reply..."
                    className="flex-1"
                  />
                  <Button>
                    <RiSendPlaneLine className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a message to view
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
