"use client";
import { BiLogoKickstarter } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";

const groups = Array.from({ length: 21 }, (_, i) => `Group ${i + 1}`);

const businessCategories = [
  "Retail",
  "Manufacturing",
  "Services",
  "Technology",
  "Food & Beverage",
  "Healthcare",
  "Construction",
  "Education",
  "Transportation",
  "Others",
];

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    group: "",
    businessName: "",
    memberName: "",
    mobileNumber: "",
    categories: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSuccess(true);
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push('/auth/login');
    }, 2000);
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Registration Submitted!</h2>
          <p className="text-muted-foreground">
            Our admins will contact you soon
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center p-6 bg-background">
      {/* Logo Section */}
      <div className="w-full max-w-md pt-10">
        <div className="text-center space-y-2 mb-10">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <BiLogoKickstarter className="size-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Kattunar Kuzhu</h1>
          <p className="text-muted-foreground">Register your business</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Group</label>
              <Select
                value={formData.group}
                onValueChange={(value) =>
                  setFormData({ ...formData, group: value })
                }
                required
              >
                <SelectTrigger className="w-full h-12 rounded-lg">
                  <SelectValue placeholder="Select a group" />
                </SelectTrigger>
                <SelectContent className="w-full min-w-[300px]">
                  {groups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Business Name</label>
              <Input
                placeholder="Enter business name"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({ ...formData, businessName: e.target.value })
                }
                className="h-12 rounded-lg"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Member Name</label>
              <Input
                placeholder="Enter member name"
                value={formData.memberName}
                onChange={(e) =>
                  setFormData({ ...formData, memberName: e.target.value })
                }
                className="h-12 rounded-lg"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mobile Number</label>
              <Input
                type="tel"
                placeholder="Enter mobile number"
                value={formData.mobileNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    mobileNumber: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="h-12 rounded-lg"
                maxLength={10}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Business Categories</label>
              <Select
                value={formData.categories}
                onValueChange={(value) =>
                  setFormData({ ...formData, categories: value })
                }
                required
              >
                <SelectTrigger className="w-full h-12 rounded-lg">
                  <SelectValue placeholder="Select categories" />
                </SelectTrigger>
                <SelectContent className="w-full min-w-[300px]">
                  {businessCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-lg rounded-lg mt-6"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Registration"}
          </Button>

          <div className="text-center pt-4">
            <p className="text-muted-foreground">
              Already a member?{" "}
              <a
                href="/auth/login"
                className="text-primary hover:underline font-medium"
              >
                Login here
              </a>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
