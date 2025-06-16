"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoMdArrowBack } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import dynamic from 'next/dynamic';
import L from 'leaflet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Check,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { MobileNav } from "@/components/mobile-nav";

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Circle = dynamic(
  () => import('react-leaflet').then((mod) => mod.Circle),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

// Custom marker icon setup
const createIcon = (iconUrl) => {
  return new L.Icon({
    iconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

// Default marker icon setup
const defaultIcon = createIcon('https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png');
L.Marker.prototype.options.icon = defaultIcon;

// Mock data for meetings
const meetings = [
  {
    id: 1,
    type: "group",
    title: "Weekly Business Network",
    description:
      "Weekly meeting to discuss business opportunities and network with members",
    date: new Date(2025, 5, 14),
    time: "10:00 AM - 12:00 PM",
    location: "Main Hall, Business Center",
    locationDetails: "2nd Floor, Near Reception",
    organizer: "John Smith",
    attendees: [
      {
        id: 1,
        name: "John Smith",
        role: "Organizer",
        avatar: "/path-to-avatar.jpg",
      },
      {
        id: 2,
        name: "Sarah Wilson",
        role: "Co-host",
        avatar: "/path-to-avatar.jpg",
      },
      {
        id: 3,
        name: "Mike Johnson",
        role: "Member",
        avatar: "/path-to-avatar.jpg",
      },
    ],
    totalAttendees: 15,
    status: "ongoing",
    agenda: [
      "Network Introduction - 15m",
      "Member Presentations - 45m",
      "Open Discussion - 30m",
      "Next Steps - 30m",
    ],
    previousMeetingNotes:
      "Discussed 5 new business opportunities, 3 successful referrals",
  },
  {
    id: 2,
    type: "Special Meeting",
    title: "Product Discussion",
    description: "special meeting to discuss new product features and timeline",
    date: new Date(2025, 5, 15),
    time: "12:00 PM - 4:00 PM",
    location: "Main hall, Business Center, chennai",
    locationDetails: "1st Floor, East Wing",
    organizer: "Sarah Wilson",
    status: "upcoming",
  },
  // Add more mock meetings as needed
];

// Mock meeting location (replace with actual meeting location)
const meetingLocation = {
  latitude: 13.0827,  // Chennai coordinates
  longitude: 80.2707,
  radius: 100  // 100 meters radius
};

export default function MeetingsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAttendanceDialog, setShowAttendanceDialog] = useState(false);
  const [isMarkingAttendance, setIsMarkingAttendance] = useState(false);
  const router = useRouter();

  // Function to check if a date has meetings
  const hasMeeting = (date) => {
    return meetings.some(
      (meeting) =>
        format(meeting.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
  };

  // Attendance marking dialog
  const AttendanceDialog = () => {
    const [location, setLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [isWithinRadius, setIsWithinRadius] = useState(false);

    const getDistanceFromLatLonInMeters = useCallback((lat1, lon1, lat2, lon2) => {
      const R = 6371e3; // Earth's radius in meters
      const φ1 = lat1 * Math.PI/180;
      const φ2 = lat2 * Math.PI/180;
      const Δφ = (lat2-lat1) * Math.PI/180;
      const Δλ = (lon2-lon1) * Math.PI/180;

      const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      return R * c;
    }, []);

    const getCurrentLocation = useCallback(() => {
      setIsLoadingLocation(true);
      setLocationError(null);

      if (!navigator.geolocation) {
        setLocationError("Geolocation is not supported by your browser");
        setIsLoadingLocation(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          setLocation(newLocation);
          
          const distance = getDistanceFromLatLonInMeters(
            newLocation.latitude,
            newLocation.longitude,
            meetingLocation.latitude,
            meetingLocation.longitude
          );
          
          setIsWithinRadius(distance <= meetingLocation.radius);
          setIsLoadingLocation(false);
        },
        (error) => {
          setLocationError("Unable to get your location. Please enable location access.");
          setIsLoadingLocation(false);
        },
        { enableHighAccuracy: true }
      );
    }, [getDistanceFromLatLonInMeters]);

    useEffect(() => {
      getCurrentLocation();
    }, [getCurrentLocation]);

    return (
      <Dialog open={showAttendanceDialog} onOpenChange={setShowAttendanceDialog}>
        <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Mark Attendance</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Time and Date Section */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{format(new Date(), "h:mm a")}</span>
                </div>
                <span className="text-sm text-gray-600">
                  {format(new Date(), "MMMM d, yyyy")}
                </span>
              </div>
            </div>

            {/* Map Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>Location Verification</span>
                </div>
                {locationError && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={getCurrentLocation}
                    disabled={isLoadingLocation}
                  >
                    Retry
                  </Button>
                )}
              </div>

              {location && (
                <div className="h-[200px] rounded-lg overflow-hidden border">
                  <MapContainer
                    center={[meetingLocation.latitude, meetingLocation.longitude]}
                    zoom={15}
                    style={{ height: "100%", width: "100%" }}
                    zoomControl={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[meetingLocation.latitude, meetingLocation.longitude]}>
                      <Popup>Meeting Location</Popup>
                    </Marker>
                    <Circle
                      center={[meetingLocation.latitude, meetingLocation.longitude]}
                      radius={meetingLocation.radius}
                      pathOptions={{ 
                        color: isWithinRadius ? 'green' : 'red',
                        fillColor: isWithinRadius ? 'green' : 'red',
                        fillOpacity: 0.2
                      }}
                    />
                    <Marker position={[location.latitude, location.longitude]}>
                      <Popup>You are here</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              )}
            </div>

            <Button
              className="w-full bg-black hover:bg-gray-800"
              disabled={isMarkingAttendance || !location || locationError || !isWithinRadius}
              onClick={() => {
                setIsMarkingAttendance(true);
                setTimeout(() => {
                  setIsMarkingAttendance(false);
                  setShowAttendanceDialog(false);
                }, 1500);
              }}
            >
              {isMarkingAttendance ? (
                <span className="flex items-center gap-2">
                  Marking... <Clock className="w-4 h-4 animate-spin" />
                </span>
              ) : (
                "Mark Attendance"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  // Meeting Card Components
  const MeetingCard = ({ meeting, onAttendanceClick }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case "ongoing":
          return "bg-green-500";
        case "upcoming":
          return "bg-blue-500";
        default:
          return "bg-gray-500";
      }
    };

    return (
      <Card
        className={cn(
          "p-4",
          meeting.status === "ongoing" && "border-2 border-black"
        )}
      >
        {/* Header */}
        <div className="space-y-4">
          {/* Title Section */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    getStatusColor(meeting.status)
                  )}
                />
                <span className="text-xs font-medium uppercase text-gray-500">
                  {meeting.type}
                </span>
              </div>
              {meeting.status === "ongoing" && (
                <span className="px-2 py-0.5 bg-black text-white text-xs rounded-full">
                  Now
                </span>
              )}
            </div>
            <h3 className="font-medium">{meeting.title}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {meeting.description}
            </p>
          </div>

          {/* Meeting Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{meeting.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <div>
                <span>{meeting.location}</span>
                <span className="block text-xs text-gray-500">
                  {meeting.locationDetails}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {Array.isArray(meeting.attendees) &&
                    meeting.attendees.slice(0, 3).map((attendee) => (
                      <div
                        key={attendee?.id || Math.random()}
                        className="w-6 h-6 rounded-full bg-gray-200 ring-2 ring-white flex items-center justify-center"
                      >
                        <span className="text-[10px]">
                          {attendee?.name?.[0] || "?"}
                        </span>
                      </div>
                    ))}
                </div>
                {meeting.totalAttendees > 3 && (
                  <span className="text-xs text-gray-500">
                    +
                    {meeting.totalAttendees -
                      (Array.isArray(meeting.attendees)
                        ? Math.min(meeting.attendees.length, 3)
                        : 0)}{" "}
                    more
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {meeting.status === "ongoing" && (
            <div className="pt-2 mt-2 border-t">
              <Button
                onClick={onAttendanceClick}
                className="w-full bg-black hover:bg-gray-800 text-white"
              >
                Mark Attendance
              </Button>
            </div>
          )}
        </div>
      </Card>
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <div className="bg-white px-5 pt-16 pb-4 border-b flex items-center justify-between gap-2 fixed top-0 left-0 right-0 z-10">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <IoMdArrowBack className="w-6 h-6" />
        </button>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Meetings</h1>
        </div>
        <BsThreeDotsVertical />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="calendar" className="w-full mt-28">
        <div className="px-5 py-4">
          <TabsList className="w-full">
            <TabsTrigger value="calendar" className="flex-1">
              Calendar
            </TabsTrigger>
            <TabsTrigger value="meetings" className="flex-1">
              Meetings
            </TabsTrigger>
            <TabsTrigger value="one-on-one" className="flex-1">
              One-on-One
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Calendar Tab */}
        <TabsContent value="calendar" className="mt-0">
          <div className="px-5">
            <Card className="p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border w-full"
                modifiers={{
                  hasMeeting: (date) => hasMeeting(date),
                }}
                modifiersStyles={{
                  hasMeeting: {
                    fontWeight: "600",
                  },
                }}
                components={{
                  DayContent: ({ date }) => (
                    <div className="relative">
                      <span>{format(date, "d")}</span>
                      {hasMeeting(date) && (
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full" />
                      )}
                    </div>
                  ),
                }}
              />
            </Card>

            {/* Meetings for selected date */}
            <div className="mt-6 space-y-4">
              <h2 className="text-sm font-medium text-gray-600">
                {format(selectedDate, "MMMM d, yyyy")}
              </h2>
              {meetings
                .filter(
                  (meeting) =>
                    format(meeting.date, "yyyy-MM-dd") ===
                    format(selectedDate, "yyyy-MM-dd")
                )
                .map((meeting) => (
                  <Card key={meeting.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{meeting.title}</h3>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{meeting.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{meeting.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>
                              {meeting.totalAttendees ||
                                (meeting.attendees?.length || 0)}{" "}
                              Attendees
                            </span>
                          </div>
                        </div>
                      </div>
                      {meeting.status === "ongoing" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowAttendanceDialog(true)}
                          className="shrink-0"
                        >
                          Mark Attendance
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </TabsContent>

        {/* Meetings Tab */}
        <TabsContent value="meetings" className="mt-0">
          <div className="px-5 space-y-6">
            {/* Ongoing Meetings */}
            <section>
              <h2 className="text-sm font-medium text-gray-600 mb-3">
                Ongoing
              </h2>
              {meetings
                .filter((meeting) => meeting.status === "ongoing")
                .map((meeting) => (
                  <MeetingCard
                    key={meeting.id}
                    meeting={meeting}
                    onAttendanceClick={() => setShowAttendanceDialog(true)}
                  />
                ))}
            </section>

            {/* Upcoming Meetings */}
            <section>
              <h2 className="text-sm font-medium text-gray-600 mb-3">
                Upcoming
              </h2>
              <div className="space-y-3">
                {meetings
                  .filter((meeting) => meeting.status === "upcoming")
                  .map((meeting) => (
                    <MeetingCard
                      key={meeting.id}
                      meeting={meeting}
                      onAttendanceClick={() => setShowAttendanceDialog(true)}
                    />
                  ))}
              </div>
            </section>

            {/* Past Meetings */}
            <section>
              <h2 className="text-sm font-medium text-gray-600 mb-3">Past</h2>
              <div className="space-y-3">
                <Card className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">Monthly Review</h3>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>June 7, 2:00 PM</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>12 Attended</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="shrink-0 h-8"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </section>
          </div>
        </TabsContent>

        {/* One-on-One Tab */}
        <TabsContent value="one-on-one" className="mt-0">
          <div className="px-5 space-y-6">
            <Button
              className="w-full bg-black hover:bg-gray-800 rounded-xl h-12"
              onClick={() => router.push("/meeting/schedule/member-search")}
            >
              Schedule One-on-One Meeting
            </Button>

            {/* Upcoming One-on-One */}
            <section>
              <h2 className="text-sm font-medium text-gray-600 mb-3">
                Upcoming
              </h2>
              <Card className="p-4">
                <div className="flex flex-col items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Product Discussion</h3>
                      <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs">
                        Pending
                      </span>
                    </div>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>Tomorrow, 2:00 PM</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>with John Doe</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex items-center gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 border-red-200 hover:bg-red-50 hover:text-red-600 flex-1"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Decline
                    </Button>
                    <Button
                      size="sm"
                      className="h-8 bg-black hover:bg-gray-800 flex-1"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Accept
                    </Button>
                  </div>
                </div>
              </Card>
              <div className="space-y-3 mt-4">
                <Card className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">Business Proposal</h3>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>June 10, 3:00 PM</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>with Sarah Wilson</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="shrink-0 h-8">
                      View Details
                    </Button>
                  </div>
                </Card>
              </div>
            </section>

            {/* Past One-on-One */}
            <section>
              <h2 className="text-sm font-medium text-gray-600 mb-3">Past</h2>
              <div className="space-y-3">
                <Card className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">Business Proposal</h3>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>June 10, 3:00 PM</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>with Sarah Wilson</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="shrink-0 h-8">
                      View Details
                    </Button>
                  </div>
                </Card>
              </div>
            </section>
          </div>
        </TabsContent>
      </Tabs>

      {/* Attendance Dialog */}
      <AttendanceDialog />

      {/* Mobile Navigation */}
      <MobileNav />
    </main>
  );
}
