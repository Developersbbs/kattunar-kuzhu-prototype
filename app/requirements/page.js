"use client";

import { useState } from "react";
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

export default function RequirementsPage() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the state here
      }}
    >
      <RequirementsPageContent />
    </ErrorBoundary>
  );
}

function RequirementsPageContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("my-requirements");
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [showResponseDialog, setShowResponseDialog] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-gray-800 text-white";
      case "closed":
        return "bg-gray-200 text-gray-700";
      case "pending":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const RequirementCard = ({ requirement }) => (
    <Card className="p-4 hover:border-gray-400 transition-colors" role="article">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{requirement.title}</h3>
              {requirement.responses > 0 && (
                <span className="px-1.5 py-0.5 bg-gray-800 text-white text-xs rounded-full" role="status">
                  {requirement.responses} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
              <span aria-label="Budget">{requirement.budget}</span>
              <span aria-hidden="true">•</span>
              <span aria-label="Timeline">{requirement.timeline}</span>
            </div>
          </div>
          <div 
            className={`px-2 py-1 rounded-full text-xs ${getStatusColor(requirement.status)}`}
            role="status"
            aria-label={`Status: ${requirement.status}`}
          >
            {requirement.status.charAt(0).toUpperCase() + requirement.status.slice(1)}
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{requirement.description}</p>

        <div className="flex flex-wrap gap-2" role="list" aria-label="Tags">
          {requirement.tags.map((tag, index) => (
            <div
              key={index}
              className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600 flex items-center gap-1"
              role="listitem"
            >
              <Tag className="w-3 h-3" aria-hidden="true" />
              <span>{tag}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1" role="status" aria-label={`${requirement.views} views`}>
              <Eye className="w-4 h-4" aria-hidden="true" />
              <span>{requirement.views}</span>
            </div>
            <div className="flex items-center gap-1" role="status" aria-label={`${requirement.responses} responses`}>
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>{requirement.responses}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8"
              aria-label="Share requirement"
            >
              <Share className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8"
              onClick={() => {
                setSelectedRequirement(requirement);
                setShowResponseDialog(true);
              }}
              aria-label="View responses"
            >
              View Responses
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  RequirementCard.propTypes = {
    requirement: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      budget: PropTypes.string.isRequired,
      timeline: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['active', 'closed', 'pending']).isRequired,
      visibility: PropTypes.oneOf(['public', 'members']).isRequired,
      responses: PropTypes.number.isRequired,
      views: PropTypes.number.isRequired,
      postedDate: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      preferredMembers: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
  };

  const PostRequirementDialog = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      category: '',
      budget: '',
      timeline: '',
      tags: '',
      notify: false
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
      const newErrors = {};
      if (!formData.title.trim()) newErrors.title = 'Title is required';
      if (!formData.description.trim()) newErrors.description = 'Description is required';
      if (!formData.category) newErrors.category = 'Category is required';
      if (!formData.budget.trim()) newErrors.budget = 'Budget is required';
      if (!formData.timeline) newErrors.timeline = 'Timeline is required';
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
      if (validateForm()) {
        // Handle form submission
        console.log('Form submitted:', formData);
        setShowPostDialog(false);
      }
    };

    return (
      <Dialog open={showPostDialog} onOpenChange={setShowPostDialog}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Post a New Requirement</DialogTitle>
            <DialogDescription>
              Share your business requirements with the community
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Brief title for your requirement"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                aria-invalid={errors.title ? 'true' : 'false'}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Detailed description of what you're looking for..."
                className="h-24"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                aria-invalid={errors.description ? 'true' : 'false'}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger aria-invalid={errors.category ? 'true' : 'false'}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="products">Products</SelectItem>
                    <SelectItem value="hiring">Hiring</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range</Label>
                <Input
                  id="budget"
                  placeholder="e.g., ₹50,000-80,000"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                  aria-invalid={errors.budget ? 'true' : 'false'}
                />
                {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline</Label>
              <Select
                value={formData.timeline}
                onValueChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))}
              >
                <SelectTrigger aria-invalid={errors.timeline ? 'true' : 'false'}>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="within-1-month">Within 1 month</SelectItem>
                  <SelectItem value="within-3-months">Within 3 months</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
              {errors.timeline && <p className="text-red-500 text-sm mt-1">{errors.timeline}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                placeholder="Add relevant tags separated by commas"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch
                  id="notify"
                  checked={formData.notify}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, notify: checked }))}
                />
                <Label htmlFor="notify">Notify me of responses</Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              className="bg-gray-900 hover:bg-gray-800"
              onClick={handleSubmit}
            >
              Post Requirement
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const ResponseDetailDialog = () => (
    <Dialog open={showResponseDialog} onOpenChange={setShowResponseDialog}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Responses</DialogTitle>
          <DialogDescription>
            {selectedRequirement?.title}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          {mockResponses.map((response) => (
            <div key={response.id} className="py-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{response.member.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {response.member.company}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {response.proposal}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">{response.date}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Message</Button>
                  <Button
                    className="bg-gray-900 hover:bg-gray-800"
                    size="sm"
                  >
                    Accept Proposal
                  </Button>
                </div>
              </div>

              <Separator className="mt-4" />
            </div>
          ))}
        </ScrollArea>
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
              <h1 className="text-xl font-semibold">Requirements</h1>
            </div>
            <Button
              onClick={() => setShowPostDialog(true)}
              className="bg-gray-900"
            >
              <Plus className="w-4 h-4 mr-1" />
              Post
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="my-requirements" className="w-full mt-28">
        <div className="px-5 py-4 bg-white border-b">
          <TabsList className="w-full">
            <TabsTrigger value="my-requirements" className="flex-1">
              My Requirements
            </TabsTrigger>
            <TabsTrigger value="responses" className="flex-1">
              Responses
            </TabsTrigger>
          </TabsList>
        </div>

        {/* My Requirements Tab */}
        <TabsContent value="my-requirements" className="mt-0 px-5 space-y-6">
          {/* Search & Filter */}
          <div className="flex items-center gap-2 sticky top-0 py-4 bg-gray-50">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search requirements..."
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Requirements List */}
          <div className="space-y-4">
            {mockRequirements.map((requirement) => (
              <RequirementCard key={requirement.id} requirement={requirement} />
            ))}
          </div>
        </TabsContent>

        {/* Responses Tab */}
        <TabsContent value="responses" className="mt-0 px-5 py-6">
          <div className="space-y-6">
            {mockRequirements.map((requirement) => (
              requirement.responses > 0 && (
                <Card key={requirement.id} className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">{requirement.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                        <span>₹{requirement.budget}</span>
                        <span>•</span>
                        <span>{requirement.responses} responses</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex -space-x-2">
                        {mockResponses.slice(0, 3).map((response, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 rounded-full bg-gray-100 ring-2 ring-white flex items-center justify-center"
                          >
                            <span className="text-xs font-medium">
                              {response.member.name[0]}
                            </span>
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8"
                        onClick={() => {
                          setSelectedRequirement(requirement);
                          setShowResponseDialog(true);
                        }}
                      >
                        View Responses
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <PostRequirementDialog />
      <ResponseDetailDialog />

      {/* Mobile Navigation */}
      <MobileNav />
    </main>
  );
}