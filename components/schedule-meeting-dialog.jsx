"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { 
  RiCalendarEventLine, 
  RiTimeLine, 
  RiGroupLine,
  RiArrowLeftLine,
  RiArrowRightLine
} from "react-icons/ri";

// Meeting type options
const meetingTypes = [
  {
    id: "general",
    label: "General Meeting",
    description: "Regular group meeting for updates and discussions",
  },
  {
    id: "business",
    label: "Business Meeting",
    description: "Focused on business opportunities and collaborations",
  },
  {
    id: "training",
    label: "Training Session",
    description: "Knowledge sharing and skill development",
  },
];

// Recurring patterns
const recurringPatterns = [
  { id: "none", label: "One-time Meeting" },
  { id: "weekly", label: "Weekly" },
  { id: "biweekly", label: "Bi-weekly" },
  { id: "monthly", label: "Monthly" },
];

export default function ScheduleMeetingDialog({ open, onOpenChange, onSubmit }) {
  const [currentStep, setCurrentStep] = useState(1);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...meetingData, date: selectedDate });
    setCurrentStep(1);
    setMeetingData({
      title: "",
      type: "general",
      date: "",
      time: "",
      group: "",
      description: "",
      isRecurring: false,
      pattern: "none",
    });
  };

  const isStepComplete = (step) => {
    switch (step) {
      case 1:
        return meetingData.title && meetingData.type;
      case 2:
        return selectedDate && meetingData.time && meetingData.group;
      case 3:
        return true; // Description is optional
      default:
        return false;
    }
  };

  const steps = [
    {
      title: "Meeting Details",
      description: "Enter basic meeting information",
    },
    {
      title: "Schedule",
      description: "Set date, time and group",
    },
    {
      title: "Additional Info",
      description: "Add description and review",
    },
  ];

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) setCurrentStep(1);
        onOpenChange(isOpen);
      }}
    >
      <DialogContent className="p-0 gap-0 w-full max-w-[400px] md:max-w-[600px] rounded-lg">
        <DialogHeader className="p-4 md:p-6 bg-gray-50 border-b sticky top-0 z-10">
          <div className="flex items-center gap-4 mb-4">
            <DialogTitle className="text-lg md:text-xl font-semibold">
              {steps[currentStep - 1].title}
            </DialogTitle>
            <span className="text-sm text-gray-500 ml-auto">
              Step {currentStep} of {steps.length}
            </span>
          </div>
          <div className="flex gap-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors",
                  currentStep > index ? "bg-gray-900" : "bg-gray-200"
                )}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {steps[currentStep - 1].description}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-6 space-y-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Meeting Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter meeting title"
                      value={meetingData.title}
                      onChange={(e) =>
                        setMeetingData({ ...meetingData, title: e.target.value })
                      }
                      className="h-12 md:h-10"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Meeting Type</Label>
                    <div className="grid grid-cols-1 gap-3">
                      {meetingTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() =>
                            setMeetingData({ ...meetingData, type: type.id })
                          }
                          className={cn(
                            "flex items-start text-left p-4 rounded-lg border-2 transition-colors",
                            meetingData.type === type.id
                              ? "border-gray-900 bg-gray-50"
                              : "border-gray-200 hover:border-gray-300"
                          )}
                        >
                          <div>
                            <div className="font-medium">{type.label}</div>
                            <div className="text-sm text-gray-500 mt-1">
                              {type.description}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label>Meeting Date</Label>
                    <div className="border rounded-lg p-3 bg-white">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="mx-auto"
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Meeting Time</Label>
                    <div className="relative">
                      <RiTimeLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <Input
                        id="time"
                        type="time"
                        value={meetingData.time}
                        onChange={(e) =>
                          setMeetingData({ ...meetingData, time: e.target.value })
                        }
                        className="h-12 md:h-10 pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Select Group</Label>
                    <Select
                      value={meetingData.group}
                      onValueChange={(value) =>
                        setMeetingData({ ...meetingData, group: value })
                      }
                    >
                      <SelectTrigger className="h-12 md:h-10">
                        <SelectValue placeholder="Choose a group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="group1">Group 1</SelectItem>
                        <SelectItem value="group2">Group 2</SelectItem>
                        <SelectItem value="group3">Group 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="rounded-lg border bg-gray-50 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <Label className="mb-1">Recurring Meeting</Label>
                        <p className="text-sm text-gray-500">
                          Set up a repeating schedule
                        </p>
                      </div>
                      <Switch
                        checked={meetingData.isRecurring}
                        onCheckedChange={(checked) =>
                          setMeetingData({
                            ...meetingData,
                            isRecurring: checked,
                            pattern: checked ? "weekly" : "none",
                          })
                        }
                      />
                    </div>

                    {meetingData.isRecurring && (
                      <div className="space-y-2 pt-2 border-t">
                        <Label>Recurring Pattern</Label>
                        <Select
                          value={meetingData.pattern}
                          onValueChange={(value) =>
                            setMeetingData({ ...meetingData, pattern: value })
                          }
                        >
                          <SelectTrigger className="h-12 md:h-10">
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

                  <div className="space-y-2">
                    <Label htmlFor="description">Meeting Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter meeting details (optional)"
                      value={meetingData.description}
                      onChange={(e) =>
                        setMeetingData({
                          ...meetingData,
                          description: e.target.value,
                        })
                      }
                      className="min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="rounded-lg border p-4 space-y-3">
                    <h3 className="font-medium">Meeting Summary</h3>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Title:</dt>
                        <dd className="font-medium">{meetingData.title}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Type:</dt>
                        <dd className="font-medium">
                          {meetingTypes.find((t) => t.id === meetingData.type)?.label}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Group:</dt>
                        <dd className="font-medium">
                          {meetingData.group.replace("group", "Group ")}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">
                          <RiCalendarEventLine className="inline mr-1" />
                          Date & Time:
                        </dt>
                        <dd className="font-medium">
                          {selectedDate.toLocaleDateString()} at {meetingData.time}
                        </dd>
                      </div>
                      {meetingData.isRecurring && (
                        <div className="flex justify-between">
                          <dt className="text-gray-500">Recurring:</dt>
                          <dd className="font-medium">
                            {recurringPatterns.find((p) => p.id === meetingData.pattern)
                              ?.label}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t bg-gray-50 p-4 md:p-6">
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                className="h-12 md:h-10"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 md:h-10"
                  onClick={() => setCurrentStep((step) => step - 1)}
                >
                  <RiArrowLeftLine className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}

              {currentStep < steps.length ? (
                <Button
                  type="button"
                  className="h-12 md:h-10 bg-gray-900 text-white hover:bg-gray-800"
                  disabled={!isStepComplete(currentStep)}
                  onClick={() => setCurrentStep((step) => step + 1)}
                >
                  Continue
                  <RiArrowRightLine className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="h-12 md:h-10 bg-gray-900 text-white hover:bg-gray-800"
                >
                  Schedule Meeting
                </Button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
