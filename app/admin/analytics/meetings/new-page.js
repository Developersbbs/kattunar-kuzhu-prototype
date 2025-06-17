"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  RiCalendarEventLine,
  RiTimeLine,
  RiGroupLine,
  RiAddLine,
  RiRepeatLine,
} from "react-icons/ri";

// Mock data for meeting types
const meetingTypes = [
  { id: "general", label: "General Meeting", description: "Regular group meeting for updates and discussions" },
  { id: "business", label: "Business Meeting", description: "Focused on business opportunities and collaborations" },
  { id: "training", label: "Training Session", description: "Knowledge sharing and skill development" },
];

// Mock data for recurring patterns
const recurringPatterns = [
  { id: "none", label: "One-time Meeting" },
  { id: "weekly", label: "Weekly" },
  { id: "biweekly", label: "Bi-weekly" },
  { id: "monthly", label: "Monthly" },
];

// Mock data for upcoming meetings
const upcomingMeetings = [
  {
    id: 1,
    title: "Weekly Group 1 Meeting",
    type: "general",
    date: "2025-06-20",
    time: "10:00 AM",
    group: "Group 1",
    isRecurring: true,
    pattern: "weekly",
    attendees: 15,
  },
  {
    id: 2,
    title: "Monthly Business Review",
    type: "business",
    date: "2025-06-25",
    time: "02:00 PM",
    group: "Group 2",
    isRecurring: true,
    pattern: "monthly",
    attendees: 12,
  },
];

export default function MeetingsPage() {
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meetingData, setMeetingData] = useState({
    title: "",
    type: "general",
    date: "",
    time: "",
    group: "",
    description: "",
    isRecurring: false,
    pattern: "none",
  });

  const handleCreateMeeting = (e) => {
    e.preventDefault();
    console.log('Creating meeting:', meetingData);
    setShowNewDialog(false);
  };

  return (
    <div className="container max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 sm:pt-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Meetings</h1>
          <p className="text-sm text-gray-500">
            Manage and schedule group meetings
          </p>
        </div>
        <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gray-900 text-white hover:bg-gray-800 w-full sm:w-auto">
              <RiAddLine className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] w-[calc(100%-2rem)] h-[calc(100vh-2rem)] sm:h-auto max-h-[calc(100vh-2rem)] overflow-hidden p-0">
            <DialogHeader className="p-4 sm:p-6 space-y-2 bg-gray-50 border-b sticky top-0 z-10">
              <DialogTitle className="text-xl">Schedule New Meeting</DialogTitle>
              <DialogDescription>
                Create a new meeting and set up recurring schedule if needed
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateMeeting} className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto px-4 py-2 sm:px-6 sm:py-4">
                <div className="space-y-6">
                  {/* Meeting Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium">Meeting Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter meeting title"
                      value={meetingData.title}
                      onChange={(e) =>
                        setMeetingData({ ...meetingData, title: e.target.value })
                      }
                      required
                      className="h-11 sm:h-10"
                    />
                  </div>

                  {/* Meeting Type */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Meeting Type</Label>
                    <RadioGroup
                      defaultValue="general"
                      onValueChange={(value) =>
                        setMeetingData({ ...meetingData, type: value })
                      }
                      className="grid grid-cols-1 gap-3"
                    >
                      {meetingTypes.map((type) => (
                        <Label
                          key={type.id}
                          className={cn(
                            "flex items-start gap-3 rounded-md border-2 border-muted bg-transparent p-3 sm:p-4 hover:bg-gray-50 [&:has([data-state=checked])]:border-gray-900 touch-manipulation",
                            meetingData.type === type.id && "border-gray-900"
                          )}
                        >
                          <RadioGroupItem value={type.id} className="mt-1" />
                          <div className="flex-1">
                            <span className="font-medium block">{type.label}</span>
                            <span className="text-xs text-gray-500 block mt-0.5">
                              {type.description}
                            </span>
                          </div>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Group Selection */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Select Group</Label>
                    <Select
                      value={meetingData.group}
                      onValueChange={(value) =>
                        setMeetingData({ ...meetingData, group: value })
                      }
                    >
                      <SelectTrigger className="h-11 sm:h-10">
                        <SelectValue placeholder="Select group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="group1">Group 1</SelectItem>
                        <SelectItem value="group2">Group 2</SelectItem>
                        <SelectItem value="group3">Group 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date and Time */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Date</Label>
                      <div className="border rounded-lg p-2 bg-white overflow-x-auto">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          className="w-full min-w-[280px]"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-sm font-medium">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={meetingData.time}
                        onChange={(e) =>
                          setMeetingData({ ...meetingData, time: e.target.value })
                        }
                        required
                        className="h-11 sm:h-10"
                      />
                    </div>
                  </div>

                  {/* Recurring Meeting Options */}
                  <div className="space-y-4 bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Recurring Meeting</Label>
                        <p className="text-xs text-gray-500">Set up a repeating schedule</p>
                      </div>
                      <Switch
                        checked={meetingData.isRecurring}
                        onCheckedChange={(checked) =>
                          setMeetingData({ ...meetingData, isRecurring: checked })
                        }
                        className="scale-110"
                      />
                    </div>

                    {meetingData.isRecurring && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Recurring Pattern</Label>
                        <Select
                          value={meetingData.pattern}
                          onValueChange={(value) =>
                            setMeetingData({ ...meetingData, pattern: value })
                          }
                        >
                          <SelectTrigger className="h-11 sm:h-10">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            {recurringPatterns.map((pattern) => (
                              <SelectItem key={pattern.id} value={pattern.id}>
                                {pattern.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter meeting description"
                      value={meetingData.description}
                      onChange={(e) =>
                        setMeetingData({ ...meetingData, description: e.target.value })
                      }
                      rows={3}
                      className="resize-none min-h-[80px]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button - Fixed at bottom */}
              <div className="border-t p-4 sm:p-6 bg-gray-50 mt-auto">
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowNewDialog(false)}
                    className="w-full sm:w-auto h-11 sm:h-10"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-gray-900 text-white hover:bg-gray-800 w-full sm:w-auto h-11 sm:h-10"
                  >
                    Schedule Meeting
                  </Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Upcoming Meetings */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Upcoming Meetings</h2>
        <div className="grid gap-3">
          {upcomingMeetings.map((meeting) => (
            <Card key={meeting.id} className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-medium">{meeting.title}</h3>
                    {meeting.isRecurring && (
                      <Badge variant="outline" className="text-xs">
                        <RiRepeatLine className="mr-1 h-3 w-3" />
                        {meeting.pattern}
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <RiCalendarEventLine className="h-4 w-4 flex-shrink-0" />
                      {meeting.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <RiTimeLine className="h-4 w-4 flex-shrink-0" />
                      {meeting.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <RiGroupLine className="h-4 w-4 flex-shrink-0" />
                      {meeting.attendees} attendees
                    </span>
                  </div>
                </div>
                <Badge
                  variant={
                    meeting.type === "general"
                      ? "secondary"
                      : meeting.type === "business"
                      ? "outline"
                      : "default"
                  }
                  className="self-start flex-shrink-0"
                >
                  {meeting.type}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
