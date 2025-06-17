"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea"; // Change to Textarea
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  RiUser3Line,
  RiArrowLeftLine,
  RiSendPlaneFill,
  RiAttachment2,
  RiImage2Line,
  RiMoreLine,
  RiCheckDoubleLine,
  RiCheckLine,
  RiEmotionLine,
  RiMicFill,
  RiCameraFill,
} from "react-icons/ri";

// Mock data for messages
const mockMessages = [
  {
    id: 1,
    sender: "them",
    text: "Hi, I wanted to discuss the recent referral opportunity.",
    timestamp: "10:30",
    status: "read",
  },
  {
    id: 2,
    sender: "me",
    text: "Sure, I'd be happy to discuss that. What details can you share?",
    timestamp: "10:31",
    status: "read",
  },
  {
    id: 3,
    sender: "them",
    text: "We have a client looking for web development services. They need a complete website redesign with modern features.",
    timestamp: "10:32",
    status: "read",
  },
  {
    id: 4,
    sender: "me",
    text: "That sounds interesting. What's their budget range and timeline?",
    timestamp: "10:33",
    status: "sent",
  },
];

// Mock user data
const mockUser = {
  id: 1,
  name: "John Smith",
  business: "Digital Solutions Inc.",
  status: "online",
  avatar: null,
  lastSeen: "today at 12:45",
};

export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [showAttachments, setShowAttachments] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef(null);
  const user = mockUser;

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 100) + "px";
    }
  }, [newMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      sender: "me",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      status: "sent",
    };

    setMessages([...messages, message]);
    setNewMessage("");
    setIsTyping(false);
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const MessageStatus = ({ status }) => {
    if (status === "sent")
      return <RiCheckLine className="w-3.5 h-3.5 text-gray-400" />;
    if (status === "delivered")
      return <RiCheckDoubleLine className="w-3.5 h-3.5 text-gray-400" />;
    if (status === "read")
      return <RiCheckDoubleLine className="w-3.5 h-3.5 text-gray-700" />;
    return null;
  };

  return (
    <div className="h-[100vh] flex flex-col bg-gray-100">
      {/* Chat header */}
      <div className="bg-gray-900 text-white z-10 pt-12">
        <div className="px-2 py-2 flex items-center gap-2">
          <button
            className="p-2 hover:bg-gray-800 rounded-full"
            onClick={() => router.back()}
          >
            <RiArrowLeftLine className="h-6 w-6" />
          </button>
          <div className="flex-1 flex items-center gap-3" onClick={() => {/* Show contact info */}}>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <RiUser3Line className="w-6 h-6 text-gray-300" />
                )}
              </div>
            </div>
            <div className="min-w-0">
              <h2 className="font-medium leading-none truncate">{user.name}</h2>
              <p className="text-sm text-gray-300 mt-1">
                {user.status === "online" ? "online" : user.lastSeen}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-800 rounded-full">
              <RiCameraFill className="h-6 w-6" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-full">
              <RiMoreLine className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div
        className="flex-1 overflow-y-auto bg-gray-50"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50l-25 25l25-25l25 25l-25-25zm0 0l25-25l-25 25l-25-25l25 25z' fill='%23f3f3f3' fill-opacity='0.4'/%3E%3C/svg%3E\")",
          backgroundSize: "100px 100px",
        }}
        ref={chatContainerRef}
      >
        <div className="p-3 space-y-1">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] p-2 rounded-lg ${
                  message.sender === "me"
                    ? "bg-gray-800 text-white rounded-tr-none"
                    : "bg-white text-gray-900 rounded-tl-none"
                }`}
              >
                <p className="text-[15px] break-words">{message.text}</p>
                <div
                  className={`flex items-center gap-1 -mb-0.5 mt-0.5 text-[11px] ${
                    message.sender === "me" ? "text-gray-300 justify-end" : "text-gray-500"
                  }`}
                >
                  <span>{message.timestamp}</span>
                  {message.sender === "me" && (
                    <MessageStatus status={message.status} />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message input */}
      <div className="bg-gray-50 p-2 z-10 border-t border-gray-200">
        <div className="flex items-end gap-1">
          <div className="flex-1 bg-white rounded-full flex items-end">
            <button className="p-3 hover:text-gray-600">
              <RiEmotionLine className="h-6 w-6 text-gray-500" />
            </button>
            <div className="flex-1 min-h-[40px] flex items-end">
              <Textarea
                ref={textareaRef}
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  setIsTyping(e.target.value.length > 0);
                }}
                onKeyDown={handleKeyDown}
                className="border-0 focus:ring-0 resize-none text-[15px] py-2 leading-5 max-h-[100px] min-h-[40px] bg-transparent scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                style={{
                  overflow: 'hidden',
                }}
              />
            </div>
            <button
              className="p-3 hover:text-gray-600 self-end"
              onClick={() => setShowAttachments(!showAttachments)}
            >
              <RiAttachment2 className="h-6 w-6 text-gray-500 rotate-45" />
            </button>
          </div>

          <button
            className="p-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 self-end"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            {isTyping ? (
              <RiSendPlaneFill className="h-6 w-6" />
            ) : (
              <RiMicFill className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Attachment menu */}
      {showAttachments && (
        <div className="absolute bottom-16 left-16 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
          <div className="grid grid-cols-3 gap-2">
            <button className="p-3 hover:bg-gray-50 rounded-lg flex flex-col items-center">
              <div className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center">
                <RiImage2Line className="h-5 w-5" />
              </div>
              <span className="text-xs mt-1">Gallery</span>
            </button>
            <button className="p-3 hover:bg-gray-50 rounded-lg flex flex-col items-center">
              <div className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center">
                <RiCameraFill className="h-5 w-5" />
              </div>
              <span className="text-xs mt-1">Camera</span>
            </button>
            <button className="p-3 hover:bg-gray-50 rounded-lg flex flex-col items-center">
              <div className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center">
                <RiAttachment2 className="h-5 w-5" />
              </div>
              <span className="text-xs mt-1">Document</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
