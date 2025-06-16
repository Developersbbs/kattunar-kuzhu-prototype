import { Card, CardHeader, CardContent } from "./card";
import { Badge } from "./badge";
import { 
  BiCode, 
  BiCloud, 
  BiRefresh, 
  BiBuildings,
  BiCodeBlock,
  BiMobile,
  BiData,
  BiServer
} from "react-icons/bi";

const iconMap = {
  code: BiCode,
  cloud: BiCloud,
  "refresh-cw": BiRefresh,
  building: BiBuildings,
  "code-block": BiCodeBlock,
  mobile: BiMobile,
  data: BiData,
  server: BiServer
};

export function ServiceCard({ service }) {
  const { name, description, icon, features } = service;
  const IconComponent = iconMap[icon] || BiCode;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border bg-card">
      <CardHeader className="p-6 flex flex-row items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-xl">
          <IconComponent className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">{name}</h3>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <p className="text-muted-foreground mb-4 text-sm">{description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {features?.map((feature, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="px-3 py-1 bg-secondary/30 hover:bg-secondary/40"
            >
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
