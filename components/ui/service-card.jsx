import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ServiceCard({ 
  name, 
  description, 
  image, 
  category,
  features = [],
  className = "" 
}) {
  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}>
      <div className="relative h-52 overflow-hidden bg-gray-100">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transform hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400 text-4xl">No Image</span>
          </div>
        )}
        {category && (
          <Badge 
            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-900 backdrop-blur-sm"
          >
            {category}
          </Badge>
        )}
      </div>
      <div className="p-5 space-y-3">
        <h3 className="font-medium text-lg text-gray-900 line-clamp-1">{name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{description}</p>
        {features.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {features.map((feature, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="text-xs px-2 py-0.5 font-normal text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100"
              >
                {feature}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
