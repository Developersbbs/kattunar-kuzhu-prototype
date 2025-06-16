"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Send,
  Search,
  Users,
  Paperclip,
  Image as ImageIcon,
  Smile,
  MoreVertical,
  Phone,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Mock messages data - in real app, fetch based on conversation ID
const mockMessages = [
  {
    id: 1,
    sender: "John Doe",
    message: "Hi, I had a question about the latest requirements",
    timestamp: "10:15 AM",
    type: "received"
  },
  {
    id: 2,
    sender: "Admin",
    message: "Sure, I'll be happy to help. What would you like to know?",
    timestamp: "10:20 AM",
    type: "sent"
  },
  {
    id: 3,
    sender: "John Doe",
    message: "Thanks for the update!",
    timestamp: "10:30 AM",
    type: "received"
  }
];

export default function ChatPage({ params }) {
  const router = useRouter();
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [conversationDetails, setConversationDetails] = useState({
    id: params.id,
    name: "John Doe",
    type: "direct",
    group: "Group 1",
    memberCount: null,
    online: true
  });

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Prevent message container from overflowing
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (messagesContainerRef.current) {
        scrollToBottom();
      }
    });

    if (messagesContainerRef.current) {
      resizeObserver.observe(messagesContainerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "Admin",
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "sent"
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage("");
    setTimeout(scrollToBottom, 100);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-white">
      {/* Chat Header */}
      <header className="flex-none px-6 py-4 border-b border-gray-200 ">
        <div className="flex items-center justify-between pt-10">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/admin/communications/messages")}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <Users className="h-5 w-5 text-gray-600" />
                </div>
                {conversationDetails.type === "direct" && conversationDetails.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-gray-600 border-2 border-white" />
                )}
              </div>
              <div>
                <h1 className="font-medium text-gray-900">{conversationDetails.name}</h1>
                <p className="text-sm text-gray-500">
                  {conversationDetails.type === "group"
                    ? `${conversationDetails.memberCount} members`
                    : conversationDetails.group}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-6 py-4"
      >
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex items-end gap-2",
                msg.type === "sent" ? "justify-end" : "justify-start"
              )}
            >
              {msg.type !== "sent" && (
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-none">
                  <Users className="h-4 w-4 text-gray-600" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2",
                  msg.type === "sent" 
                    ? "bg-gray-900 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-900 rounded-bl-none"
                )}
              >
                {msg.type !== "sent" && (
                  <p className="text-xs font-medium mb-1">{msg.sender}</p>
                )}
                <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                  {msg.message}
                </p>
                <p className={cn(
                  "text-xs mt-1",
                  msg.type === "sent" ? "text-gray-300" : "text-gray-500"
                )}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <footer className="flex-none px-6 py-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3 max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="icon" className="hover:bg-gray-100">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="hover:bg-gray-100">
              <ImageIcon className="h-5 w-5" />
            </Button>
          </div>
          <Input
            className="flex-1 bg-gray-50 border-gray-200 focus:ring-gray-200"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button 
            type="submit" 
            size="icon"
            className={cn(
              "transition-colors",
              newMessage.trim() 
                ? "bg-gray-900 text-white hover:bg-gray-800" 
                : "bg-gray-100 text-gray-400"
            )}
            disabled={!newMessage.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </footer>
    </div>
  );
}
