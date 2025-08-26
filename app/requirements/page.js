"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import PropTypes from 'prop-types';
import { ErrorBoundary } from "react-error-boundary";

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
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Plus,
  MessageCircle,
  Users,
  Building2,
  Clock,
  Tag,
  Search,
  Filter,
  ThumbsUp,
  ThumbsDown,
  Star,
  CheckCircle2,
  XCircle,
  Eye,
  Share,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { RequirementCard } from "@/components/ui/requirement-card";


// Mock data moved outside component
const mockRequirements = [
  {
    id: 1,
    title: "React Native Developer Required",
    description: "Looking for an experienced React Native developer for a 6-month project. Must have experience with large-scale apps.",
    category: "Hiring",
    budget: "₹8,00,000 - ₹12,00,000",
    timeline: "6 months",
    status: "active",
    visibility: "public",
    responses: 12,
    views: 45,
    postedDate: "2025-06-14",
    tags: ["Mobile Development", "React Native", "JavaScript"],
    preferredMembers: ["John Doe", "Sarah Wilson"],
  },
  {
    id: 2,
    title: "Office Space in Anna Nagar",
    description: "Need 2000 sq ft office space in Anna Nagar. Furnished preferred with parking.",
    category: "Real Estate",
    budget: "₹75,000/month",
    timeline: "Immediate",
    status: "active",
    visibility: "members",
    responses: 5,
    views: 28,
    postedDate: "2025-06-13",
    tags: ["Office Space", "Anna Nagar", "Chennai"],
  }
];

const mockResponses = [
  {
    id: 1,
    requirementId: 1,
    member: {
      name: "John Doe",
      company: "Tech Solutions",
      rating: 4.8,
      completedDeals: 15,
      avatar: "/path-to-avatar.jpg"
    },
    proposal: "I have 6+ years of experience in React Native development with published apps having 1M+ downloads.",
    budget: "₹10,00,000",
    availability: "Can start immediately",
    status: "pending",
    date: "2025-06-14"
  },
  {
    id: 2,
    requirementId: 1,
    member: {
      name: "Sarah Wilson",
      company: "Mobile Apps Inc",
      rating: 4.9,
      completedDeals: 23,
      avatar: "/path-to-avatar.jpg"
    },
    proposal: "Experienced team lead with 8 years in mobile development. Specialized in React Native performance optimization.",
    budget: "₹11,50,000",
    availability: "Available from July 1st",
    status: "pending",
    date: "2025-06-14"
  }
];

// Mock members data for tagging
const mockMembers = [
  {
    id: 1,
    name: "John Doe",
    company: "Tech Solutions",
    category: "Technology",
    location: "Chennai",
    avatar: "/default-avatar.png"
  },
  {
    id: 2,
    name: "Sarah Wilson",
    company: "Marketing Masters",
    category: "Marketing",
    location: "Chennai",
    avatar: "/default-avatar.png"
  },
  {
    id: 3,
    name: "Mike Thompson",
    company: "Real Estate Ventures",
    category: "Real Estate",
    location: "Chennai",
    avatar: "/default-avatar.png"
  }
];

// Error Fallback component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="p-4 text-center">
      <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <Button
        onClick={resetErrorBoundary}
        className="bg-gray-900 hover:bg-gray-800"
      >
        Try again
      </Button>
    </div>
  );
}

ErrorFallback.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};

function NewRequirementDialog({ isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [memberSearchOpen, setMemberSearchOpen] = useState(false);
  const [memberSearchQuery, setMemberSearchQuery] = useState("");

  const filteredMembers = memberSearchQuery 
    ? mockMembers.filter(member => 
        member.name.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
        member.company.toLowerCase().includes(memberSearchQuery.toLowerCase())
      )
    : mockMembers;

  const handleSelectMember = (member) => {
    if (!selectedMembers.find(m => m.id === member.id)) {
      setSelectedMembers([...selectedMembers, member]);
    }
    setMemberSearchOpen(false);
  };

  const handleRemoveMember = (memberId) => {
    setSelectedMembers(selectedMembers.filter(m => m.id !== memberId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would submit the data to an API
    const newRequirement = {
      id: mockRequirements.length + 1,
      title,
      description,
      category,
      budget,
      timeline,
      status: "active",
      visibility: isPublic ? "public" : "members",
      responses: 0,
      views: 0,
      postedDate: new Date().toISOString().split('T')[0],
      preferredMembers: isPublic ? [] : selectedMembers.map(m => m.name)
    };
    
    // In a real app, this would be handled by state management
    mockRequirements.push(newRequirement);
    
    // Reset form and close dialog
    setTitle("");
    setDescription("");
    setCategory("");
    setBudget("");
    setTimeline("");
    setIsPublic(true);
    setSelectedMembers([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>New Requirement</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter requirement title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your requirement"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hiring">Hiring</SelectItem>
                  <SelectItem value="Real Estate">Real Estate</SelectItem>
                  <SelectItem value="Partnership">Partnership</SelectItem>
                  <SelectItem value="Investment">Investment</SelectItem>
                  <SelectItem value="Services">Services</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Enter budget"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeline">Timeline</Label>
            <Input
              id="timeline"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              placeholder="Enter timeline"
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Switch
              id="public"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
            <Label htmlFor="public">Public Requirement</Label>
          </div>

          {!isPublic && (
            <div className="space-y-2">
              <Label>Tagged Members</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedMembers.map(member => (
                  <Badge
                    key={member.id}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {member.name}
                    <XCircle
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleRemoveMember(member.id)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setMemberSearchOpen(true)}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search members to tag
                </Button>
                <CommandDialog open={memberSearchOpen} onOpenChange={setMemberSearchOpen}>
                  <CommandInput
                    placeholder="Search members..."
                    value={memberSearchQuery}
                    onValueChange={setMemberSearchQuery}
                  />
                  <CommandList>
                    <CommandEmpty>No members found.</CommandEmpty>
                    <CommandGroup>
                      {filteredMembers.map(member => (
                        <CommandItem
                          key={member.id}
                          onSelect={() => handleSelectMember(member)}
                        >
                          <div className="flex items-center">
                            <div className="flex-1">
                              <h4 className="font-medium">{member.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {member.company}
                              </p>
                            </div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </CommandDialog>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Requirement</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function RequirementsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showNewRequirementDialog, setShowNewRequirementDialog] = useState(false);
  const [showResponseDetail, setShowResponseDetail] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSearching(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredRequirements = mockRequirements.filter(req => {
    const matchesSearch = searchQuery
      ? req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;

    const matchesCategory = selectedCategory && selectedCategory !== 'all'
      ? req.category === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  const publicRequirements = filteredRequirements.filter(req => req.visibility === "public");
  const taggedRequirements = filteredRequirements.filter(req => req.visibility === "members");

  return (
    <main className="container mx-auto p-4 space-y-6 pt-12">
      {/* Header Section */}
      <div className="flex flex-col gap-6">      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-gray-600 hover:text-gray-900"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Requirements</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Browse and manage requirements from members
            </p>
          </div>
          <Button
            onClick={() => setShowNewRequirementDialog(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Post Requirement
          </Button>
        </div>
      </div>

        {/* Search and Filter Section */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by title, description, or tags..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearching(true);
                  }}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedCategory !== "all") && (
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-muted-foreground">Filters:</span>
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Search: {searchQuery}
                    <XCircle
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setSearchQuery("")}
                    />
                  </Badge>
                )}
                {selectedCategory !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Category: {selectedCategory}
                    <XCircle
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setSelectedCategory("all")}
                    />
                  </Badge>
                )}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Requirements List Section */}
      <Tabs 
        defaultValue="all" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="all" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">
            Public Requirements
          </TabsTrigger>
          <TabsTrigger value="tagged" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">
            My Requirements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {isSearching ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="text-sm text-muted-foreground mt-2">Searching requirements...</p>
            </div>
          ) : publicRequirements.length > 0 ? (
            <>
              <div className="text-sm text-muted-foreground mb-4">
                Found {publicRequirements.length} public requirement{publicRequirements.length !== 1 ? 's' : ''}
              </div>
              <div className="grid gap-4">
                {publicRequirements.map(requirement => (
                  <RequirementCard
                    key={requirement.id}
                    requirement={requirement}
                    onClick={() => {
                      setSelectedRequirement(requirement);
                      setShowResponseDetail(true);
                    }}
                  />
                ))}
              </div>
            </>
          ) : (
            <Card className="py-16">
              <div className="text-center">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No requirements found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery || selectedCategory !== "all"
                    ? "Try adjusting your filters or search terms"
                    : "No public requirements have been posted yet"}
                </p>
                <Button
                  variant="outline"
                  onClick={() => setShowNewRequirementDialog(true)}
                >
                  Post a Requirement
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="tagged" className="space-y-4">
          {isSearching ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="text-sm text-muted-foreground mt-2">Searching requirements...</p>
            </div>
          ) : taggedRequirements.length > 0 ? (
            <>
              <div className="text-sm text-muted-foreground mb-4">
                Found {taggedRequirements.length} tagged requirement{taggedRequirements.length !== 1 ? 's' : ''}
              </div>
              <div className="grid gap-4">
                {taggedRequirements.map(requirement => (
                  <RequirementCard
                    key={requirement.id}
                    requirement={requirement}
                    onClick={() => {
                      setSelectedRequirement(requirement);
                      setShowResponseDetail(true);
                    }}
                  />
                ))}
              </div>
            </>
          ) : (
            <Card className="py-16">
              <div className="text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No My Requirements</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery || selectedCategory !== "all"
                    ? "Try adjusting your filters or search terms"
                    : "No requirements have been tagged with members yet"}
                </p>
                <Button
                  variant="outline"
                  onClick={() => setShowNewRequirementDialog(true)}
                >
                  Create Tagged Requirement
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Dialogs */}
      <NewRequirementDialog 
        isOpen={showNewRequirementDialog} 
        onClose={() => setShowNewRequirementDialog(false)} 
      />

      {selectedRequirement && (
        <Dialog open={showResponseDetail} onOpenChange={setShowResponseDetail}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>{selectedRequirement.title}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh]">
              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-gray-600">{selectedRequirement.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedRequirement.tags?.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Budget</Label>
                      <p>{selectedRequirement.budget}</p>
                    </div>
                    <div>
                      <Label>Timeline</Label>
                      <p>{selectedRequirement.timeline}</p>
                    </div>
                  </div>
                  {selectedRequirement.preferredMembers && (
                    <div>
                      <Label>Preferred Members</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedRequirement.preferredMembers.map(member => (
                          <Badge key={member} variant="outline">{member}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Responses ({mockResponses.filter(r => r.requirementId === selectedRequirement.id).length})</h3>
                  <div className="space-y-4">
                    {mockResponses
                      .filter(response => response.requirementId === selectedRequirement.id)
                      .map(response => (
                        <Card key={response.id} className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium">{response.member.name}</h4>
                                  <p className="text-sm text-muted-foreground">{response.member.company}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                  <span className="text-sm font-medium">{response.member.rating}</span>
                                  <Badge variant="outline" className="ml-2">
                                    {response.member.completedDeals} deals
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-sm">{response.proposal}</p>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <Label className="text-xs">Budget</Label>
                                  <p className="font-medium">{response.budget}</p>
                                </div>
                                <div>
                                  <Label className="text-xs">Availability</Label>
                                  <p className="font-medium">{response.availability}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowResponseDetail(false)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
}