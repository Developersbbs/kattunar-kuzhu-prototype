"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ScheduleMeetingDialog from "@/components/schedule-meeting-dialog";
import {
  RiCalendarEventLine,
  RiTimeLine,
  RiGroupLine,
  RiAddLine,
  RiRepeatLine,
} from "react-icons/ri";

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

  const handleCreateMeeting = (meetingData) => {
    console.log("Creating meeting:", meetingData);
    setShowNewDialog(false);
    // TODO: Implement meeting creation logic
  };

  return (
    <div className="container max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 sm:pt-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
            Meetings
          </h1>
          <p className="text-sm text-gray-500">
            Manage and schedule group meetings
          </p>
        </div>
        <Button
          onClick={() => setShowNewDialog(true)}
          className="bg-gray-900 text-white hover:bg-gray-800 w-full sm:w-auto h-11 sm:h-10"
        >
          <RiAddLine className="mr-2 h-4 w-4" />
          Schedule Meeting
        </Button>
      </div>

      {/* Schedule Meeting Dialog */}
      <ScheduleMeetingDialog
        open={showNewDialog}
        onOpenChange={setShowNewDialog}
        onSubmit={handleCreateMeeting}
      />

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
