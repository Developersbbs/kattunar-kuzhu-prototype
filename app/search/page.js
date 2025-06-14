"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
    // Check if tag already exists
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
      type: "business",
      name: "Tech Solutions Inc",
      category: "IT & Software",
      owner: "John Doe",
      location: "Chennai",
      keywords: ["software", "consulting", "development"],
    },
    // Add more sample results as needed
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b z-40 pt-8">
        <div className="max-w-lg mx-auto px-4 py-3">
          {/* Back Button and Search Input */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1">
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
            </div>
          </div>

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
        </div>
      </div>

      {/* Search Results */}
      <ScrollArea className="flex-1 pt-36 pb-6 px-4">
        <div className="max-w-lg mx-auto space-y-4">
          {searchResults.map((result, index) => (
            <Card
              key={index}
              className="p-4 rounded-2xl hover:bg-gray-50 transition-colors"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{result.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="w-4 h-4 mr-1" />
                      {result.owner}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Tags className="w-4 h-4 mr-1" />
                      {result.category}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {result.location}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </main>
  );
}
