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

  // Sample search suggestions (South India + Builders focus)
  const suggestions = {
    "Business Name": [
      { id: 1, name: "Sri Venkateswara Builders", type: "business" },
      { id: 2, name: "Kaveri PEB Solutions", type: "business" },
      { id: 3, name: "Madurai Modular Kitchens", type: "business" },
      { id: 4, name: "Chola Waterproofing Co.", type: "business" },
      { id: 5, name: "Namma Roofings & Fabricators", type: "business" },
      { id: 6, name: "GreenLeaf Landscape Architects", type: "business" },
      { id: 7, name: "Sai Sanitary & Bath Fittings", type: "business" },
      { id: 8, name: "SmartNest Home Automation", type: "business" },
      { id: 9, name: "Erode Glass & Aluminium Works", type: "business" },
      { id: 10, name: "Trichy Painting Contractors", type: "business" },
      { id: 11, name: "Solar Surya Installers", type: "business" },
      { id: 12, name: "FireGuard Safety Systems", type: "business" },
      { id: 13, name: "Coastal Civil Contractors", type: "business" },
      { id: 14, name: "Interior Aura Designs", type: "business" },
      { id: 15, name: "Tile & Marble Mart", type: "business" },
    ],
    "Owner Name": [
      { id: 101, name: "Arun Prakash", type: "owner" },
      { id: 102, name: "Lakshmi Narayanan", type: "owner" },
      { id: 103, name: "Priya Subramanian", type: "owner" },
      { id: 104, name: "Vignesh Kumar", type: "owner" },
      { id: 105, name: "Anitha Ramesh", type: "owner" },
      { id: 106, name: "Suresh Balaji", type: "owner" },
      { id: 107, name: "Meena Iyer", type: "owner" },
      { id: 108, name: "Karthik Rajendran", type: "owner" },
      { id: 109, name: "Deepa Natarajan", type: "owner" },
      { id: 110, name: "Harish Chandran", type: "owner" },
    ],
    Category: [
      // Referencing builder-related categories from auth/register page
      { id: 201, name: "PEB Builders", type: "category" },
      { id: 202, name: "Modular Kitchen Specialists", type: "category" },
      { id: 203, name: "Waterproofing Contractors", type: "category" },
      { id: 204, name: "Landscape Architects", type: "category" },
      { id: 205, name: "Sanitaryware & Bathroom Fittings Suppliers", type: "category" },
      { id: 206, name: "Smart Home Automation Services", type: "category" },
      { id: 207, name: "Glass & Aluminium Fabricators", type: "category" },
      { id: 208, name: "Painting Contractors", type: "category" },
      { id: 209, name: "Solar Panel Installers", type: "category" },
      { id: 210, name: "Fire Safety & Fire Fighting Contractors", type: "category" },
      // Additional builder ecosystem categories
      { id: 211, name: "Civil Contractors", type: "category" },
      { id: 212, name: "Interior Designers", type: "category" },
      { id: 213, name: "Roofing Contractors", type: "category" },
      { id: 214, name: "Tile & Marble Suppliers", type: "category" },
    ],
    Location: [
      { id: 301, name: "T. Nagar", type: "location" },
      { id: 302, name: "Adyar", type: "location" },
      { id: 303, name: "Velachery", type: "location" },
      { id: 304, name: "Anna Nagar", type: "location" },
      { id: 305, name: "Tambaram", type: "location" },
      { id: 306, name: "Porur", type: "location" },
      { id: 307, name: "Sholinganallur (OMR)", type: "location" },
      { id: 308, name: "Guindy", type: "location" },
      { id: 309, name: "Nungambakkam", type: "location" },
      { id: 310, name: "Mylapore", type: "location" },
      { id: 311, name: "Ambattur", type: "location" },
      { id: 312, name: "Royapuram", type: "location" },
      { id: 313, name: "Perungudi", type: "location" },
      { id: 314, name: "Avadi", type: "location" },
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
      name: "Sri Venkateswara Builders",
      category: "Civil Contractors",
      owner: "Arun Prakash",
      location: "Chennai",
      keywords: ["builders", "civil", "construction"],
    },
    {
      id: 2,
      type: "business",
      name: "Kaveri PEB Solutions",
      category: "PEB Builders",
      owner: "Lakshmi Narayanan",
      location: "Coimbatore",
      keywords: ["peb", "steel", "industrial"],
    },
    {
      id: 3,
      type: "business",
      name: "Madurai Modular Kitchens",
      category: "Modular Kitchen Specialists",
      owner: "Priya Subramanian",
      location: "Madurai",
      keywords: ["kitchen", "interiors", "modular"],
    },
    {
      id: 4,
      type: "business",
      name: "Chola Waterproofing Co.",
      category: "Waterproofing Contractors",
      owner: "Vignesh Kumar",
      location: "Tiruchirappalli",
      keywords: ["waterproofing", "terrace", "leak"],
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
