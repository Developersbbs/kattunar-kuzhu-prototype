"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  RiTaskLine,
  RiGroupLine,
  RiCalendarEventLine,
  RiFilter2Line,
  RiAddLine,
  RiSearchLine,
  RiBuilding4Line,
  RiCheckboxCircleLine,
  RiTimer2Line,
  RiPriceTag3Line,
} from "react-icons/ri";

// Mock data for requirements
const requirements = [
  {
    id: 1,
    title: "Software Development Partner",
    description:
      "Looking for a software development partner specialized in web applications and mobile development.",
    group: "Tech Innovators",
    category: "Technology",
    status: "open",
    priority: "high",
    postedDate: "2025-06-15",
    dueDate: "2025-07-15",
    budget: "$10,000 - $20,000",
    responses: 3,
    views: 45,
    skills: ["Web Development", "Mobile Development", "API Integration"],
    responses: [
      {
        member: "John Smith",
        group: "Digital Solutions",
        status: "interested",
        date: "2025-06-16",
      },
      {
        member: "Sarah Johnson",
        group: "Tech Masters",
        status: "matched",
        date: "2025-06-15",
      },
      {
        member: "Mike Wilson",
        group: "Code Brigade",
        status: "interested",
        date: "2025-06-15",
      },
    ],
  },
  {
    id: 2,
    title: "Marketing Consultant Required",
    description:
      "Seeking a marketing consultant to help with digital marketing strategy and social media management.",
    group: "Growth Leaders",
    category: "Marketing",
    status: "inProgress",
    priority: "medium",
    postedDate: "2025-06-14",
    dueDate: "2025-07-30",
    budget: "$5,000 - $8,000",
    responses: 5,
    views: 38,
    skills: ["Digital Marketing", "Social Media", "Content Strategy"],
    responses: [
      {
        member: "Emma Davis",
        group: "Marketing Pros",
        status: "matched",
        date: "2025-06-14",
      },
      {
        member: "Tom Brown",
        group: "Digital Growth",
        status: "interested",
        date: "2025-06-14",
      },
    ],
  },
  {
    id: 3,
    title: "Financial Advisory Services",
    description:
      "Need a financial advisor for business expansion planning and investment strategies.",
    group: "Business Elite",
    category: "Finance",
    status: "closed",
    priority: "high",
    postedDate: "2025-06-13",
    dueDate: "2025-06-30",
    budget: "$15,000 - $25,000",
    responses: 4,
    views: 52,
    skills: ["Financial Planning", "Investment Strategy", "Risk Management"],
    responses: [
      {
        member: "David Chen",
        group: "Finance Experts",
        status: "matched",
        date: "2025-06-13",
      },
      {
        member: "Lisa Wong",
        group: "Wealth Advisors",
        status: "completed",
        date: "2025-06-20",
      },
    ],
  },
];

// Group analytics
const groupStats = [
  {
    id: 1,
    name: "Tech Innovators",
    totalRequirements: 12,
    activeRequirements: 5,
    successRate: "85%",
    avgResponses: 4.2,
    topCategories: ["Technology", "Innovation", "Digital"],
    recentActivity: "High",
  },
  {
    id: 2,
    name: "Growth Leaders",
    totalRequirements: 8,
    activeRequirements: 3,
    successRate: "75%",
    avgResponses: 3.8,
    topCategories: ["Marketing", "Sales", "Business Development"],
    recentActivity: "Medium",
  },
];

// Category analytics
const categoryStats = [
  {
    id: 1,
    name: "Technology",
    totalRequirements: 25,
    activeRequirements: 10,
    avgBudget: "$15,000",
    topSkills: ["Web Development", "Cloud", "Mobile"],
    demandTrend: "High",
  },
  {
    id: 2,
    name: "Marketing",
    totalRequirements: 18,
    activeRequirements: 7,
    avgBudget: "$8,000",
    topSkills: ["Digital Marketing", "Social Media", "Content"],
    demandTrend: "Medium",
  },
];

const statusColors = {
  open: "bg-gray-100 text-gray-800",
  inProgress: "bg-gray-200 text-gray-900",
  closed: "bg-gray-300 text-gray-700",
};

const priorityColors = {
  high: "bg-gray-300 text-gray-900",
  medium: "bg-gray-200 text-gray-800",
  low: "bg-gray-100 text-gray-700",
};

export default function RequirementsPage() {
  const [filter, setFilter] = useState({
    status: "all",
    category: "all",
    priority: "all",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list"); // 'list', 'groups', 'categories'
  const [selectedRequirement, setSelectedRequirement] = useState(null);
  const [showRequirementDetails, setShowRequirementDetails] = useState(false);

  // Filter and search functions
  const filterRequirements = (req) => {
    const matchesStatus = filter.status === "all" || req.status === filter.status;
    const matchesCategory = filter.category === "all" || req.category.toLowerCase() === filter.category.toLowerCase();
    const matchesPriority = filter.priority === "all" || req.priority === filter.priority;
    const matchesSearch = searchQuery.trim() === "" || 
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesStatus && matchesCategory && matchesPriority && matchesSearch;
  };

  const filterGroups = (group) => {
    return searchQuery.trim() === "" || 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.topCategories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const filterCategories = (category) => {
    return searchQuery.trim() === "" || 
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.topSkills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const filteredRequirements = requirements.filter(filterRequirements);
  const filteredGroups = groupStats.filter(filterGroups);
  const filteredCategories = categoryStats.filter(filterCategories);

  // Calculate statistics
  const totalActive = requirements.filter(r => r.status === "open").length;
  const totalResponses = requirements.reduce((sum, r) => sum + r.responses.length, 0);
  const avgResponseTime = "48 hours"; // This would be calculated from actual data
  const successRate = Math.round((requirements.filter(r => r.status === "closed").length / requirements.length) * 100);

  return (
    <div className="container max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Requirements</h1>
          <p className="text-sm text-gray-500">
            Track and manage business requirements across groups
          </p>
        </div>
        <Button className="bg-gray-900 text-white hover:bg-gray-800">
          <RiAddLine className="mr-2 h-4 w-4" />
          Post Requirement
        </Button>
      </div>

      {/* View Selector and Search */}
      <Card className="p-4 sm:p-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Tabs
              defaultValue="list"
              className="flex-1"
              onValueChange={setViewMode}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="groups" className="flex items-center gap-2">
                  <RiTaskLine className="h-4 w-4" />
                  All Groups
                </TabsTrigger>
                <TabsTrigger value="categories" className="flex items-center gap-2">
                  <RiGroupLine className="h-4 w-4" />
                  By Categories
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search requirements, skills, or groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={filter.status}
                onValueChange={(value) =>
                  setFilter((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="inProgress">In Progress</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filter.priority}
                onValueChange={(value) =>
                  setFilter((prev) => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="w-10 px-0"
                onClick={() => setFilter({ status: "all", category: "all", priority: "all" })}
              >
                <RiFilter2Line className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Active Requirements</div>
            <div className="text-2xl font-semibold">{totalActive}</div>
            <div className="text-sm text-gray-500">
              {Math.round((totalActive / requirements.length) * 100)}% of total
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Total Responses</div>
            <div className="text-2xl font-semibold">{totalResponses}</div>
            <div className="text-sm text-gray-500">
              Avg. {Math.round(totalResponses / requirements.length)} per requirement
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Avg. Response Time</div>
            <div className="text-2xl font-semibold">{avgResponseTime}</div>
            <div className="text-sm text-gray-500">
              First response time
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Success Rate</div>
            <div className="text-2xl font-semibold">{successRate}%</div>
            <div className="text-sm text-gray-500">
              Requirements fulfilled
            </div>
          </div>
        </Card>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {viewMode === "list" && (
          <div className="space-y-4">
            {filteredRequirements.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="text-gray-500">No requirements found matching your criteria</div>
              </Card>
            ) : (
              filteredRequirements.map((requirement) => (
                <Card key={requirement.id} className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-medium">{requirement.title}</h3>
                        <Badge
                          className={statusColors[requirement.status]}
                          variant="secondary"
                        >
                          {requirement.status}
                        </Badge>
                        <Badge
                          className={priorityColors[requirement.priority]}
                          variant="secondary"
                        >
                          {requirement.priority} priority
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{requirement.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <RiGroupLine className="h-4 w-4" />
                          {requirement.group}
                        </span>
                        <span className="flex items-center gap-1">
                          <RiCalendarEventLine className="h-4 w-4" />
                          Due {requirement.dueDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <RiPriceTag3Line className="h-4 w-4" />
                          {requirement.budget}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {requirement.skills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right space-y-1">
                        <div className="text-sm text-gray-500">Responses</div>
                        <div className="font-semibold">{requirement.responses.length}</div>
                        <div className="text-sm text-gray-500">{requirement.views} views</div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedRequirement(requirement);
                          setShowRequirementDetails(true);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {viewMode === "groups" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGroups.length === 0 ? (
              <Card className="p-8 text-center md:col-span-2">
                <div className="text-gray-500">No groups found matching your criteria</div>
              </Card>
            ) : (
              filteredGroups.map((group) => (
                <Card key={group.id} className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{group.name}</h3>
                        <p className="text-sm text-gray-500">Activity: {group.recentActivity}</p>
                      </div>
                      <Badge variant="outline">{group.activeRequirements} active</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">Success Rate</div>
                        <div className="text-2xl font-semibold">{group.successRate}</div>
                        <div className="text-sm text-gray-500">
                          {group.totalRequirements} total requirements
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">Avg. Responses</div>
                        <div className="text-2xl font-semibold">{group.avgResponses}</div>
                        <div className="text-sm text-gray-500">
                          per requirement
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-2">Top Categories</div>
                      <div className="flex flex-wrap gap-2">
                        {group.topCategories.map((category) => (
                          <Badge key={category} variant="outline">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      View Group Details
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {viewMode === "categories" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCategories.length === 0 ? (
              <Card className="p-8 text-center md:col-span-2">
                <div className="text-gray-500">No categories found matching your criteria</div>
              </Card>
            ) : (
              filteredCategories.map((category) => (
                <Card key={category.id} className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{category.name}</h3>
                        <p className="text-sm text-gray-500">Demand: {category.demandTrend}</p>
                      </div>
                      <Badge variant="outline">{category.activeRequirements} active</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">Total Requirements</div>
                        <div className="text-2xl font-semibold">{category.totalRequirements}</div>
                        <div className="text-sm text-gray-500">
                          {category.activeRequirements} currently active
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">Average Budget</div>
                        <div className="text-2xl font-semibold">{category.avgBudget}</div>
                        <div className="text-sm text-gray-500">
                          per requirement
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-2">Top Skills</div>
                      <div className="flex flex-wrap gap-2">
                        {category.topSkills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      View Category Details
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}
      </div>

      {/* Requirement Details Dialog */}
      <Dialog open={showRequirementDetails} onOpenChange={setShowRequirementDetails}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RiTaskLine className="h-5 w-5" />
              Requirement Details
            </DialogTitle>
          </DialogHeader>
          {selectedRequirement && (
            <div className="mt-4">
              {/* Requirement Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Card className="p-4">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Status</div>
                    <div className="flex items-center gap-2">
                      <Badge className={statusColors[selectedRequirement.status]}>
                        {selectedRequirement.status}
                      </Badge>
                      <Badge className={priorityColors[selectedRequirement.priority]}>
                        {selectedRequirement.priority} priority
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{selectedRequirement.group}</p>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Budget Range</div>
                    <div className="text-xl font-semibold">{selectedRequirement.budget}</div>
                    <p className="text-sm text-gray-500">
                      Category: {selectedRequirement.category}
                    </p>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Timeline</div>
                    <div className="text-xl font-semibold">
                      {new Date(selectedRequirement.dueDate).toLocaleDateString()}
                    </div>
                    <p className="text-sm text-gray-500">
                      Posted: {new Date(selectedRequirement.postedDate).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              </div>

              {/* Requirement Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">{selectedRequirement.title}</h3>
                  <p className="text-gray-600">{selectedRequirement.description}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRequirement.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Responses ({selectedRequirement.responses.length})</h4>
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-3">
                      {selectedRequirement.responses.map((response, index) => (
                        <Card key={index} className="p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{response.member}</div>
                              <div className="text-sm text-gray-500">{response.group}</div>
                            </div>
                            <div className="text-right">
                              <Badge variant="outline">{response.status}</Badge>
                              <div className="text-sm text-gray-500 mt-1">
                                {new Date(response.date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Export Details</Button>
                  {selectedRequirement.status === "open" && (
                    <Button className="bg-gray-900 text-white hover:bg-gray-800">
                      Submit Response
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}