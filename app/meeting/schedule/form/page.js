"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import { Clock, MapPin } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

export default function ScheduleForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const memberId = searchParams.get("memberId");
  const memberName = searchParams.get("memberName");
  const memberBusiness = searchParams.get("memberBusiness");

  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date(),
    time: "10:00",
    venue: "my_location",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", {
      ...formData,
      memberId,
      memberName,
      memberBusiness,
    });
    // Show success message and redirect
    router.push("/meeting");
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <div className="bg-white px-5 pt-16 pb-4 border-b">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => router.back()}
          >
            <IoMdArrowBack className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold">Schedule Meeting</h1>
        </div>
      </div>

      {/* Meeting Between Card */}
      <div className="px-5 py-4">
        <Card className="p-4">
          <h2 className="text-sm font-medium text-gray-500 mb-4">
            Meeting Between
          </h2>
          <div className="flex items-center justify-between gap-4">
            {/* Current User */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center">
                <span className="text-lg font-medium">Y</span>
              </div>
              <div className="text-center">
                <p className="font-medium">You</p>
                <p className="text-sm text-gray-500">Your Business Name</p>
              </div>
            </div>

            <div className="text-gray-400 text-2xl">&</div>

            {/* Selected Member */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-lg font-medium text-gray-600">
                  {memberName?.[0]}
                </span>
              </div>
              <div className="text-center">
                <p className="font-medium">{memberName}</p>
                <p className="text-sm text-gray-500">{memberBusiness}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Meeting Form */}
      <form onSubmit={handleSubmit} className="px-5 space-y-4">
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">
                Meeting Title
              </label>
              <Input
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter meeting title"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1.5">
                Description
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Brief description of the meeting"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium block mb-1.5">Date</label>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  onClick={() => setShowCalendar(true)}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {format(formData.date, "MMM d, yyyy")}
                </Button>
              </div>

              <div>
                <label className="text-sm font-medium block mb-1.5">Time</label>
                <Input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="w-full">
              <label className="text-sm font-medium block mb-1.5">Venue</label>
              <Select
              className="w-full"
                value={formData.venue}
                onValueChange={(value) =>
                  setFormData({ ...formData, venue: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="my_location">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Your Location</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="their_location">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{memberName}&apos;s Location</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="online">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Other (add Manually)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Button type="submit" className="w-full bg-black hover:bg-gray-800">
          Request Meeting
        </Button>
      </form>

      {/* Calendar Dialog */}
      <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Date</DialogTitle>
          </DialogHeader>
          <Calendar
            mode="single"
            selected={formData.date}
            onSelect={(date) => {
              setFormData({ ...formData, date: date || new Date() });
              setShowCalendar(false);
            }}
            initialFocus
          />
        </DialogContent>
      </Dialog>
    </main>
  );
}
