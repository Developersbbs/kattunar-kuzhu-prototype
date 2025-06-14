"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Search,
  MapPin,
  Building2,
  ArrowLeft,
  Tags,
  User,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  // Sample search suggestions
  const suggestions = {
    "Business Name": [
      { id: 1, name: "Tech Solutions Inc", type: "business" },
      { id: 2, name: "Healthcare Plus", type: "business" },
      { id: 3, name: "Global Manufacturing", type: "business" },
    ],
    "Owner Name": [
      { id: 4, name: "John Doe", type: "owner" },
      { id: 5, name: "Sarah Smith", type: "owner" },
      { id: 6, name: "Raj Kumar", type: "owner" },
    ],
    Category: [
      { id: 7, name: "IT & Software", type: "category" },
      { id: 8, name: "Healthcare", type: "category" },
      { id: 9, name: "Manufacturing", type: "category" },
    ],
    Location: [
      { id: 10, name: "Chennai", type: "location" },
      { id: 11, name: "Coimbatore", type: "location" },
      { id: 12, name: "Madurai", type: "location" },
    ],
  };

  // Handle tag selection
  const handleSelect = (item) => {
    if (!selectedTags.find((tag) => tag.id === item.id)) {
      setSelectedTags([...selectedTags, item]);
    }
    setSearchQuery("");
  };

  // Remove tag
  const removeTag = (tagId) => {
    setSelectedTags(selectedTags.filter((tag) => tag.id !== tagId));
  };

  // Get tag color based on type
  const getTagStyle = (type) => {
    switch (type) {
      case "business":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "owner":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "category":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "location":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Get icon based on type
  const getIcon = (type) => {
    switch (type) {
      case "business":
        return Building2;
      case "owner":
        return User;
      case "category":
        return Tags;
      case "location":
        return MapPin;
      default:
        return Building2;
    }
  };

  const searchResults = [
    {
      id: 1,
      type: "business",
      name: "Tech Solutions Inc",
      category: "IT & Software",
      owner: "John Doe",
      location: "Chennai",
      keywords: ["software", "consulting", "development"],  
    },
    {
      id: 2,
      type: "business",
      name: "Healthcare Plus",
      category: "Healthcare",
      owner: "Sarah Smith",
      location: "Coimbatore",
      keywords: ["healthcare", "medical", "consulting"],
    },
  ];

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
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold">Search</h1>
        </div>
      </div>

      {/* Search Content */}
      <div className="px-5 py-4">
        <Command className="rounded-xl border shadow-md">
          <CommandInput
            placeholder="Search business, owner, category, or location..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          {searchQuery && (
            <CommandList className="max-h-[300px]">
              {Object.entries(suggestions).map(([category, items]) => (
                <CommandGroup key={category} heading={category}>
                  {items
                    .filter((item) =>
                      item.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((item) => {
                      const Icon = getIcon(item.type);
                      return (
                        <CommandItem
                          key={item.id}
                          onSelect={() => handleSelect(item)}
                          className="py-2 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-gray-500" />
                            <span>{item.name}</span>
                          </div>
                        </CommandItem>
                      );
                    })}
                </CommandGroup>
              ))}
              <CommandEmpty className="py-4 text-center text-sm text-gray-500">
                No results found
              </CommandEmpty>
            </CommandList>
          )}
        </Command>

        {/* Selected Tags */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedTags.map((tag) => {
              const Icon = getIcon(tag.type);
              return (
                <div
                  key={tag.id}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${getTagStyle(
                    tag.type
                  )}`}
                >
                  <Icon className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-sm">{tag.name}</span>
                  <button
                    onClick={() => removeTag(tag.id)}
                    className="ml-1 hover:text-gray-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Search Results */}
        <div className="mt-4 space-y-4">
          {searchResults.map((result) => (
            <Card
              key={result.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push(`/business/${result.id}`)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{result.name}</h3>
                  <p className="text-sm text-gray-500">{result.category}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <User className="w-4 h-4" />
                    <span>{result.owner}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{result.location}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
