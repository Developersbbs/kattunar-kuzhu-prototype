import { Card, CardHeader, CardContent, CardFooter } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { 
  Clock,
  Tag,
  Users,
  Eye,
  MessageCircle,
  ChevronRight
} from "lucide-react";

const categoryIcons = {
  Hiring: "👥",
  "Real Estate": "🏢",
  Partnership: "🤝",
  Investment: "💰",
  Services: "🛠",
  Other: "📌"
};

export function RequirementCard({ requirement, onClick }) {
  const { 
    title, 
    description, 
    postedDate,
    category, 
    budget,
    timeline,
    status,
    visibility,
    responses,
    views,
    tags = [],
    preferredMembers = []
  } = requirement;

  const formattedDate = new Date(postedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  const timeAgo = () => {
    const now = new Date();
    const posted = new Date(postedDate);
    const diffInDays = Math.floor((now - posted) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return formattedDate;
  };

  const isRecent = new Date(postedDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  
  const statusColors = {
    active: "bg-gray-900 text-white border-gray-800",
    pending: "bg-gray-100 text-gray-800 border-gray-200",
    closed: "bg-gray-50 text-gray-600 border-gray-200"
  };

  return (
    <Card 
      className="group cursor-pointer hover:shadow-lg transition-all overflow-hidden bg-white border-gray-200"
      onClick={onClick}
    >
      <div className="relative">
        <CardHeader className="pt-4">
          {/* Top section with category icon and visibility */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span 
                  className="text-2xl bg-gray-50 p-3 rounded-lg inline-block border border-gray-100" 
                  role="img" 
                  aria-label={category}
                >
                  {categoryIcons[category] || categoryIcons.Other}
                </span>
                {isRecent && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full border-2 border-white" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-none">
                    {category}
                  </Badge>
                  <Badge 
                    variant={visibility === "public" ? "outline" : "default"}
                    className={visibility === "public" 
                      ? "border-gray-300 text-gray-600 bg-white" 
                      : "bg-gray-900 text-gray-50"}
                  >
                    {visibility === "public" ? "Public" : "Members Only"}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold leading-tight text-gray-900">
                  {title}
                </h3>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <Badge variant="outline" className={statusColors[status]}>
                {status === 'active' ? 'Active' : status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
              <span className="text-xs text-gray-500">{timeAgo()}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {description}
          </p>

          {/* Key details grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="h-3.5 w-3.5" />
                Timeline
              </div>
              <p className="text-sm font-medium text-gray-900">{timeline}</p>
            </div>
            <div className="space-y-1 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Tag className="h-3.5 w-3.5" />
                Budget
              </div>
              <p className="text-sm font-medium text-gray-900">{budget}</p>
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map(tag => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="text-xs border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Preferred members */}
          {preferredMembers.length > 0 && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {preferredMembers.length} preferred {preferredMembers.length === 1 ? 'member' : 'members'}
              </span>
            </div>
          )}
        </CardContent>

        <CardFooter className="border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-6 w-full">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-gray-400" />
              <span className="text-sm">
                <strong className="text-gray-900">{responses}</strong>
                <span className="text-gray-500 ml-1">responses</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-gray-400" />
              <span className="text-sm">
                <strong className="text-gray-900">{views}</strong>
                <span className="text-gray-500 ml-1">views</span>
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-auto font-medium text-gray-900 hover:bg-gray-100"
            >
              View Details
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
