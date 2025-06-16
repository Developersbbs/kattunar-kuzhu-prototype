"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MobileNav } from "@/components/mobile-nav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronRight,
  Users,
  FileText,
  Calendar,
  ArrowRight,
  Plus,
  Send,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpRight,
  BarChart3,
  MessageSquare,
  Paperclip,
  Search,
  Filter,
  Building2,
  ThumbsUp,
  Award,
  ArrowLeft,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for referrals
const mockGivenReferrals = [
  {
    id: 1,
    requirement: "Software Development Partner",
    budget: "₹5,00,000 - ₹10,00,000",
    timeline: "3 months",
    status: "pending",
    date: "2025-06-14",
    givenTo: [
      {
        id: 1,
        name: "John Doe",
        company: "Tech Solutions",
        avatar: "/path-to-avatar.jpg",
        role: "CEO",
        rating: 4.8,
        referralCount: 24,
      },
    ],
    updates: 2,
    messages: 3,
    notes: "Looking for experienced team with proven track record",
  },
  {
    id: 2,
    requirement: "Marketing Agency",
    budget: "₹2,00,000/month",
    timeline: "6 months",
    status: "converted",
    date: "2025-06-10",
    givenTo: [
      {
        id: 3,
        name: "Mike Johnson",
        company: "Creative Marketing",
        avatar: "/path-to-avatar.jpg",
        role: "Marketing Director",
        rating: 4.9,
        referralCount: 32,
      },
    ],
    updates: 0,
    messages: 5,
    notes: "Digital marketing focus with SEO expertise",
    outcome: {
      dealValue: "₹12,00,000",
      closedDate: "2025-06-12",
      feedback: "Excellent match, exactly what we needed",
    },
  },
];

const mockTakenReferrals = [
  {
    id: 1,
    requirement: "Mobile App Development",
    budget: "₹15,00,000",
    timeline: "4 months",
    status: "converted",
    date: "2025-06-08",
    givenBy: {
      id: 4,
      name: "Emily Brown",
      company: "Tech Ventures",
      avatar: "/path-to-avatar.jpg",
      role: "Product Manager",
      rating: 4.7,
      referralCount: 15,
    },
    client: {
      name: "HealthTech Solutions",
      requirement: "Healthcare App Development",
      industry: "Healthcare",
    },
    updates: 1,
    messages: 4,
    outcome: {
      dealValue: "₹18,00,000",
      closedDate: "2025-06-13",
      testimonial: "Great collaboration and timely delivery",
    },
  },
  {
    id: 2,
    requirement: "Cloud Migration Project",
    budget: "₹8,00,000",
    timeline: "2 months",
    status: "pending",
    date: "2025-06-14",
    givenBy: {
      id: 5,
      name: "Alex Turner",
      company: "Cloud Solutions Inc",
      avatar: "/path-to-avatar.jpg",
      role: "Solutions Architect",
      rating: 4.6,
      referralCount: 28,
    },
    client: {
      name: "RetailPro Systems",
      requirement: "AWS Migration",
      industry: "Retail",
    },
    updates: 3,
    messages: 2,
  },
];

// Analytics data
const analytics = {
  totalReferrals: 24,
  converted: 12,
  pending: 8,
  failed: 4,
  conversionRate: 50,
  avgResponseTime: "2.5 days",
  monthlyTrend: [65, 72, 84, 78, 82, 95],
};

// Mock member data for search
const mockMembers = [
  {
    id: 1,
    name: "John Doe",
    company: "Tech Solutions",
    role: "CEO",
    group: "Group 1",
    avatar: "",
  },
  {
    id: 2,
    name: "Jane Smith",
    company: "Digital Marketing Pro",
    role: "Marketing Director",
    group: "Group 2",
    avatar: "",
  },
  {
    id: 3,
    name: "Mike Johnson",
    company: "Creative Marketing",
    role: "Marketing Director",
    group: "Group 1",
    avatar: "",
  },
  // Add more mock members as needed
];

export default function ReferralsPage() {
  const router = useRouter();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("given");
  const [referralType, setReferralType] = useState("member");
  const [memberSearch, setMemberSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // Add status filter state
  const [newReferral, setNewReferral] = useState({
    type: "member",
    memberDetails: null,
    contactName: "",
    companyName: "",
    phoneNumber: "",
    email: "",
    requirement: "",
    budget: "",
    timeline: "",
    priority: "normal",
    notes: "",
    attachments: [],
  });

  // Filter referrals based on status
  const filteredGivenReferrals = mockGivenReferrals.filter((referral) => {
    if (statusFilter === "all") return true;
    return referral.status === statusFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-600";
      case "converted":
        return "bg-gray-800 text-white";
      case "failed":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const ReferralCard = ({ referral }) => (
    <Card
      className="p-4 hover:border-gray-400 transition-colors cursor-pointer"
      onClick={() => {
        setSelectedReferral(referral);
        setShowDetail(true);
      }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{referral.requirement}</h3>
            {referral.updates > 0 && (
              <span className="px-1.5 py-0.5 bg-gray-800 text-white text-xs rounded-full">
                {referral.updates} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>₹{referral.budget}</span>
            <span>•</span>
            <span>{referral.timeline}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {referral.members.map((member) => (
                <div
                  key={member.id}
                  className="w-6 h-6 rounded-full bg-gray-100 ring-2 ring-white flex items-center justify-center"
                >
                  <span className="text-[10px] font-medium">
                    {member.name[0]}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-xs text-gray-500">
              {referral.members.length} members
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div
            className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
              referral.status
            )}`}
          >
            {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{referral.messages}</span>
          </div>
        </div>
      </div>
    </Card>
  );

  const handleCreateReferral = (e) => {
    e.preventDefault();
    if (referralType === "member" && !selectedMember) {
      return;
    }

    // Create referral based on form data
    console.log("Creating referral:", newReferral);

    // Reset form and close dialog
    setNewReferral({
      type: "member",
      memberDetails: null,
      contactName: "",
      companyName: "",
      phoneNumber: "",
      email: "",
      requirement: "",
      budget: "",
      timeline: "",
      priority: "normal",
      notes: "",
      attachments: [],
    });
    setSelectedMember(null);
    setMemberSearch("");
    setReferralType("member");
    setShowCreateDialog(false);
  };

  const filteredMembers = mockMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      member.company.toLowerCase().includes(memberSearch.toLowerCase()) ||
      member.group.toLowerCase().includes(memberSearch.toLowerCase())
  );

  const CreateReferralDialog = () => (
    <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Create New Referral</DialogTitle>
          <DialogDescription>
            Create a referral to connect a member with a business opportunity
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Referral Type Selection */}
          <div className="space-y-3">
            <Label>Referral Type</Label>
            <RadioGroup
              defaultValue="member"
              value={referralType}
              onValueChange={(value) => {
                setReferralType(value);
                // Reset the form when switching types
                setSelectedMember(null);
                setMemberSearch("");
                setNewReferral({
                  type: value,
                  memberDetails: null,
                  contactName: "",
                  companyName: "",
                  phoneNumber: "",
                  email: "",
                  requirement: "",
                  budget: "",
                  timeline: "",
                  priority: "normal",
                  notes: "",
                  attachments: [],
                });
              }}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="member" id="member" />
                <Label htmlFor="member">Member Referral</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manual" id="manual" />
                <Label htmlFor="manual">Manual Entry</Label>
              </div>
            </RadioGroup>
          </div>

          {referralType === "member" ? (
            /* Member Search Section */
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="member-search">Select Member *</Label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="member-search"
                      value={memberSearch}
                      onChange={(e) => setMemberSearch(e.target.value)}
                      placeholder="Search by name, company, or group..."
                      className="pl-9"
                    />
                  </div>
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Selected Member Card */}
              <Card className="p-3">
                {selectedMember ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium">
                          {selectedMember.name[0]}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{selectedMember.name}</div>
                        <div className="text-sm text-gray-500">
                          {selectedMember.company} • {selectedMember.group}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500"
                      onClick={() => setSelectedMember(null)}
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <div className="font-medium">Select a Member</div>
                        <div className="text-sm text-gray-500">
                          Search and select one member
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>

              {/* Member Search Results */}
              {memberSearch && (
                <Card className="max-h-60 overflow-auto">
                  <div className="p-2">
                    {filteredMembers.length > 0 ? (
                      filteredMembers.map((member) => (
                        <button
                          key={member.id}
                          type="button"
                          onClick={() => {
                            setSelectedMember(member);
                            setNewReferral((prev) => ({
                              ...prev,
                              memberDetails: member,
                              contactName: member.name,
                              companyName: member.company,
                            }));
                            setMemberSearch("");
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded-md"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-sm font-medium">
                                {member.name[0]}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-gray-500">
                                {member.company} • {member.group}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="p-3 text-center text-sm text-gray-500">
                        No members found
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>
          ) : (
            /* Manual Entry Fields */
            <div className="grid gap-4">
              <div>
                <Label>Contact Name *</Label>
                <Input
                  className="mt-1.5"
                  placeholder="Enter contact name"
                  value={newReferral.contactName}
                  onChange={(e) =>
                    setNewReferral((prev) => ({
                      ...prev,
                      contactName: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label>Company Name *</Label>
                <Input
                  className="mt-1.5"
                  placeholder="Enter company name"
                  value={newReferral.companyName}
                  onChange={(e) =>
                    setNewReferral((prev) => ({
                      ...prev,
                      companyName: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label>Phone Number *</Label>
                <Input
                  className="mt-1.5"
                  placeholder="Enter phone number"
                  type="tel"
                  value={newReferral.phoneNumber}
                  onChange={(e) =>
                    setNewReferral((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label>Email (Optional)</Label>
                <Input
                  className="mt-1.5"
                  placeholder="Enter email address"
                  type="email"
                  value={newReferral.email}
                  onChange={(e) =>
                    setNewReferral((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          )}

          <Separator />

          {/* Common Fields */}
          <div className="space-y-4">
            <div>
              <Label>Requirement *</Label>
              <Textarea
                className="mt-1.5 resize-none h-24"
                placeholder="Describe the business requirement or opportunity"
                value={newReferral.requirement}
                onChange={(e) =>
                  setNewReferral((prev) => ({
                    ...prev,
                    requirement: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <Label>Notes (Optional)</Label>
              <Textarea
                className="mt-1.5"
                placeholder="Add any additional details or requirements..."
                value={newReferral.notes}
                onChange={(e) =>
                  setNewReferral((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <Label>Attachments (Optional)</Label>
              <div className="mt-1.5 flex items-center gap-2">
                <Button type="button" variant="outline" size="sm">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Add Files
                </Button>
                <p className="text-sm text-gray-500">No files attached</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowCreateDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateReferral}
              disabled={
                !newReferral.requirement ||
                !newReferral.budget ||
                !newReferral.timeline ||
                (referralType === "member" && !selectedMember) ||
                (referralType === "manual" &&
                  (!newReferral.contactName ||
                    !newReferral.companyName ||
                    !newReferral.phoneNumber))
              }
            >
              Create Referral
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const ConfirmationDialog = () => (
    <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Preview Referral</DialogTitle>
          <DialogDescription>
            Review the referral details before sending
          </DialogDescription>
        </DialogHeader>
        {selectedMember && (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {selectedMember.name[0]}
                  </span>
                </div>
                <div>
                  <div className="font-medium">{selectedMember.name}</div>
                  <div className="text-sm text-gray-500">
                    {selectedMember.company}
                  </div>
                </div>
              </div>
              <Separator />
              <div className="text-sm space-y-2">
                <p className="font-medium">
                  Are you sure you want to send this referral?
                </p>
                <p className="text-gray-500">
                  The member will be notified and can choose to accept or
                  decline the referral.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowConfirmDialog(false)}
              >
                Back to Edit
              </Button>
              <Button
                className="w-full bg-gray-900"
                onClick={() => {
                  setShowConfirmDialog(false);
                  // Handle referral creation
                }}
              >
                Send Referral
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  const ReferralDetailDialog = () => (
    <Dialog open={showDetail} onOpenChange={setShowDetail}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{selectedReferral?.requirement}</DialogTitle>
        </DialogHeader>
        {selectedReferral && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Budget</div>
                <div className="font-medium">₹{selectedReferral.budget}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Timeline</div>
                <div className="font-medium">{selectedReferral.timeline}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Status</div>
                <div
                  className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                    selectedReferral.status
                  )}`}
                >
                  {selectedReferral.status.charAt(0).toUpperCase() +
                    selectedReferral.status.slice(1)}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-3 pt-4">
              <h4 className="font-medium">Timeline</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                    <Send className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Referral Sent</div>
                    <div className="text-xs text-gray-500">
                      {selectedReferral.date}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-3.5 h-3.5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">
                      {selectedReferral.messages} Messages
                    </div>
                    <div className="text-xs text-gray-500">
                      Last message 2 hours ago
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4">
              <Button variant="outline" className="w-full">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              <Button className="w-full bg-gray-900">
                View Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <main className="min-h-screen bg-gray-50 pb-28">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="px-5 pt-14 pb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full -ml-2"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <h1 className="text-xl font-semibold">Referrals</h1>
            </div>
            <Button
              onClick={() => setShowCreateDialog(true)}
              className="bg-gray-900"
            >
              <Plus className="w-4 h-4 mr-1" />
              Create
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="given" className="w-full mt-28">
        <div className="px-5 py-4 bg-white border-b">
          <TabsList className="w-full">
            <TabsTrigger value="given" className="flex-1">
              Given
            </TabsTrigger>
            <TabsTrigger value="taken" className="flex-1">
              Taken
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Given Referrals Tab */}
        <TabsContent value="given" className="mt-0 px-5 space-y-6">
          {/* Search & Filter */}
          <div className="flex items-center gap-2 sticky top-0 py-4 bg-gray-50">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search given referrals..." className="pl-9" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Status Overview */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="text-2xl font-semibold">
                {mockGivenReferrals.length}
              </div>
              <div className="text-sm text-gray-500">Total Given</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-semibold">
                {
                  mockGivenReferrals.filter((r) => r.status === "converted")
                    .length
                }
              </div>
              <div className="text-sm text-gray-500">Converted</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-semibold">
                {
                  mockGivenReferrals.filter((r) => r.status === "pending")
                    .length
                }
              </div>
              <div className="text-sm text-gray-500">Pending</div>
            </Card>
          </div>

          {/* Status Filter */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Status Filter</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStatusFilter("all")}
                className="text-gray-500"
              >
                Reset
              </Button>
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                variant={
                  statusFilter === "all" ? "solid" : "outline"
                }
                onClick={() => setStatusFilter("all")}
                className="flex-1"
              >
                Converted
              </Button>
              <Button
                variant={
                  statusFilter === "pending" ? "solid" : "outline"
                }
                onClick={() => setStatusFilter("pending")}
                className="flex-1"
              >
                Pending
              </Button>
              <Button
                variant={
                  statusFilter === "converted" ? "solid" : "outline"
                }
                onClick={() => setStatusFilter("converted")}
                className="flex-1"
              >
                Failed
              </Button>
            </div>
          </div>

          {/* Given Referrals List */}
          <div className="space-y-4">
            {filteredGivenReferrals.map((referral) => (
              <Card
                key={referral.id}
                className="p-4 hover:border-gray-400 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{referral.requirement}</h3>
                        {referral.updates > 0 && (
                          <span className="px-1.5 py-0.5 bg-gray-800 text-white text-xs rounded-full">
                            {referral.updates} new
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                        <span>₹{referral.budget}</span>
                        <span>•</span>
                        <span>{referral.timeline}</span>
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${
                        referral.status === "converted"
                          ? "bg-gray-800 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {referral.status.charAt(0).toUpperCase() +
                        referral.status.slice(1)}
                    </div>
                  </div>

                  {/* Given To Section */}
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-2">
                      Given To
                    </div>
                    <div className="space-y-2">
                      {referral.givenTo.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium">
                                {member.name[0]}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium">
                                {member.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {member.company}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Award className="w-3.5 h-3.5 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {member.rating}
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                            >
                              <MessageSquare className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outcome for Converted Referrals */}
                  {referral.status === "converted" && referral.outcome && (
                    <div className="pt-3 mt-3 border-t">
                      <div className="flex items-center gap-2 text-sm">
                        <ThumbsUp className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">
                          Deal Closed: {referral.outcome.dealValue}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {referral.outcome.feedback}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Taken Referrals Tab */}
        <TabsContent value="taken" className="mt-0 px-5 space-y-6">
          {/* Search & Filter */}
          <div className="flex items-center gap-2 sticky top-0 py-4 bg-gray-50">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search received referrals..."
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Status Overview */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="text-2xl font-semibold">
                {mockTakenReferrals.length}
              </div>
              <div className="text-sm text-gray-500">Total Received</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-semibold">
                {
                  mockTakenReferrals.filter((r) => r.status === "converted")
                    .length
                }
              </div>
              <div className="text-sm text-gray-500">Converted</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-semibold">
                {
                  mockTakenReferrals.filter((r) => r.status === "pending")
                    .length
                }
              </div>
              <div className="text-sm text-gray-500">Pending</div>
            </Card>
          </div>

          {/* Taken Referrals List */}
          <div className="space-y-4">
            {mockTakenReferrals.map((referral) => (
              <Card
                key={referral.id}
                className="p-4 hover:border-gray-400 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{referral.requirement}</h3>
                        {referral.updates > 0 && (
                          <span className="px-1.5 py-0.5 bg-gray-800 text-white text-xs rounded-full">
                            {referral.updates} new
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                        <span>₹{referral.budget}</span>
                        <span>•</span>
                        <span>{referral.timeline}</span>
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${
                        referral.status === "converted"
                          ? "bg-gray-800 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {referral.status.charAt(0).toUpperCase() +
                        referral.status.slice(1)}
                    </div>
                  </div>

                  {/* Referral Source */}
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-2">
                      Received From
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium">
                            {referral.givenBy.name[0]}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {referral.givenBy.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {referral.givenBy.company}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="h-8">
                        <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                        Add Thank note
                      </Button>
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="pt-3 border-t">
                    <div className="text-xs font-medium text-gray-500 mb-2">
                      Client Details
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          {referral.client.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {referral.client.requirement}
                        </div>
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600 mt-1.5">
                          {referral.client.industry}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Outcome for Converted Referrals */}
                  {referral.status === "converted" && referral.outcome && (
                    <div className="pt-3 mt-3 border-t">
                      <div className="flex items-center gap-2 text-sm">
                        <ThumbsUp className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">
                          Deal Closed: {referral.outcome.dealValue}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {referral.outcome.testimonial}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <CreateReferralDialog />
      <ConfirmationDialog />
      <ReferralDetailDialog />

      {/* Mobile Navigation */}
      <MobileNav />
    </main>
  );
}
