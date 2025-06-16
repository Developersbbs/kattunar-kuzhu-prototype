import { Card, CardHeader, CardContent, CardFooter } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { 
  BiTime, 
  BiCategory, 
  BiMessageDetail, 
  BiFlag,
  BiChevronRight
} from "react-icons/bi";

const priorityColors = {
  High: "text-red-500 bg-red-50",
  Medium: "text-yellow-500 bg-yellow-50",
  Low: "text-green-500 bg-green-50"
};

const categoryIcons = {
  Hiring: "👥",
  "Real Estate": "🏢",
  Partnership: "🤝",
  Investment: "💰",
  Services: "🛠",
  Other: "📌"
};

export function RequirementCard({ requirement }) {
  const { 
    title, 
    description, 
    postedDate, 
    category, 
    priority, 
    status, 
    responses 
  } = requirement;

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label={category}>
              {categoryIcons[category] || categoryIcons.Other}
            </span>
            <div>
              <h3 className="text-lg font-semibold leading-none">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{category}</p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={priorityColors[priority]}
          >
            {priority} Priority
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
        
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <BiTime className="w-4 h-4" />
            <span>{postedDate}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <BiMessageDetail className="w-4 h-4" />
            <span>{responses} responses</span>
          </div>
          <Badge variant="secondary" className="ml-auto">
            {status}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <Button 
          variant="outline" 
          className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
        >
          <span>View Details</span>
          <BiChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
