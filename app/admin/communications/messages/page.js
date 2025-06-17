"use client";

import React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { 
  RiSearch2Line, 
  RiMore2Fill, 
  RiCheckDoubleLine, 
  RiUser3Line, 
  RiChatNewLine,
  RiArrowLeftLine 
} from 'react-icons/ri';
import Image from 'next/image';

// Mock data for users
const users = [
  {
    id: 1,
    name: "John Smith",
    business: "Tech Solutions",
    lastMessage: "Thanks for the update",
    time: "2m",
    unread: 2,
    online: true,
    avatar: null,
  },
  {
    id: 2,
    name: "Sarah Wilson",
    business: "Creative Design",
    lastMessage: "When is the next meeting?",
    time: "1h",
    unread: 0,
    online: false,
    avatar: null,
  },
  {
    id: 3,
    name: "Mike Johnson",
    business: "Local Restaurant",
    lastMessage: "Got it, thanks!",
    time: "2h",
    unread: 1,
    online: true,
    avatar: null,
  },
];

const MessagesPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.business.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-[100vh] flex flex-col bg-white">
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
            <h1 className="text-xl font-semibold flex-1">Messages</h1>
            <button className="p-2 hover:bg-gray-800 rounded-full">
              <RiSearch2Line className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-full">
              <RiMore2Fill className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-4 py-2 bg-white border-b border-gray-100">
        <div className="relative">
          <RiSearch2Line className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search chats"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-gray-50 border-none rounded-full"
          />
        </div>
      </div>

      {/* Chat list */}
      <ScrollArea className="flex-1">
        <div className="divide-y divide-gray-100">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => router.push(`/admin/communications/messages/${user.id}`)}
            >
              <div className="p-4 flex items-center gap-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                    {user.avatar ? (
                      <Image 
                        src={user.avatar} 
                        alt={user.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    ) : (
                      <RiUser3Line className="w-7 h-7 text-gray-500" />
                    )}
                  </div>
                  {user.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-700 rounded-full border-2 border-white"></div>
                  )}
                </div>

                {/* Chat info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {user.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1 text-sm text-gray-500 truncate">
                      <RiCheckDoubleLine className={`w-4 h-4 ${user.unread ? 'text-gray-400' : 'text-gray-700'}`} />
                      <span className="truncate">{user.lastMessage}</span>
                    </div>
                    {user.unread > 0 && (
                      <span className="bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {user.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* New chat FAB */}
      <button 
        className="fixed right-4 bottom-4 w-14 h-14 bg-gray-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
        onClick={() => {/* Handle new chat */}}
      >
        <RiChatNewLine className="w-6 h-6" />
      </button>
    </div>
  );
};

export default MessagesPage;
