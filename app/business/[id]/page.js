"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MobileNav } from "@/components/mobile-nav";
import { ServiceCard } from "@/components/ui/service-card";
import { Badge } from "@/components/ui/badge";
import { RequirementCard } from "@/components/ui/requirement-card";
import {
  ArrowLeft,
  Share2,
  Bookmark,
  Globe,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  Eye,
  Share,
  Tag,
  Building2,
  Users,
  Star,
  Trophy,
  CheckCircle,
  Award,
  RefreshCw,
  Cloud,
  Code,
  Youtube,
  Clock,
  ExternalLink,
} from "lucide-react";

// Base mock data template for the business profile
const baseBusinessData = {
  id: 1,
  name: "Tech Solutions Inc",
  logo: "/images/sample-logo.png",
  coverImage: "/images/office-space.jpg",
  verified: true,
  establishedYear: 2018,
  description:
    "Leading provider of innovative software solutions for businesses across India. Specializing in digital transformation and enterprise solutions.",
  ownerDetails: {
    name: "John Doe",
    role: "Managing Director",
    groupNumber: "KK-2025-001",
    memberSince: "March 2023",
    profilePic: "/images/sample-profile.png",
    connections: 128,
    activeStatus: "Active 2 hours ago",
  },
  expertise: [
    "Digital Transformation",
    "Enterprise Solutions",
    "Cloud Computing",
  ],
  categories: ["Software Development", "IT Consulting", "Cloud Services"],
  stats: {
    referrals: 45,
    requirements: 12,
    connections: 156,
    engagement: 89,
    rating: 4.8,
    reviews: 32,
  },
  highlights: [
    {
      icon: "trophy",
      title: "Top Contributor 2024",
      description: "Awarded for exceptional business networking",
    },
    {
      icon: "star",
      title: "4.8/5 Rating",
      description: "Based on 32 member reviews",
    },
    {
      icon: "users",
      title: "Active Community Member",
      description: "156+ business connections",
    },
  ],
  contactInfo: {
    website: "www.techsolutions.com",
    phone: "+91 98765 43210",
    email: "contact@techsolutions.com",
    workingHours: "Mon-Fri: 9:00 AM - 6:00 PM",
    location: {
      address: "123 Tech Park, Anna Nagar",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600102",
      landmark: "Near Metro Station",
      coordinates: {
        lat: 13.0827,
        lng: 80.2707,
      },
    },
    social: {
      whatsapp: "+91 98765 43210",
      facebook: "techsolutions",
      instagram: "techsolutions_in",
      linkedin: "tech-solutions-inc",
      youtube: "TechSolutionsOfficial",
    },
  },
  businessPhotos: [
    {
      url: "/images/office-1.jpg",
      caption: "Main Office",
    },
    {
      url: "/images/team-1.jpg",
      caption: "Our Team",
    },
    {
      url: "/images/work-1.jpg",
      caption: "Work Culture",
    },
  ],
  requirements: [
    {
      id: 1,
      title: "Senior Software Developer",
      description:
        "Looking for experienced React/Node.js developer with 5+ years of experience in building scalable applications.",
      postedDate: "2 days ago",
      category: "Hiring",
      priority: "High",
      status: "Active",
      responses: 12,
    },
    {
      id: 2,
      title: "Office Space Required",
      description:
        "Need 2000 sq ft office space in Anna Nagar. Preferably furnished with 24/7 power backup and parking facility.",
      postedDate: "1 week ago",
      category: "Real Estate",
      priority: "Medium",
      status: "Active",
      responses: 8,
    },
    {
      id: 3,
      title: "Partnership Opportunity",
      description:
        "Looking for partnership in AI/ML projects. Have existing client base and infrastructure.",
      postedDate: "3 days ago",
      category: "Partnership",
      priority: "High",
      status: "Active",
      responses: 5,
    },
  ],
  services: [
    {
      id: 1,
      name: "Custom Software Development",
      description:
        "End-to-end custom software development services tailored to your business needs. We specialize in web applications, mobile apps, and enterprise solutions.",
      image: "/images/services/software-dev.jpg",
      category: "Development",
      features: ["Web Apps", "Mobile Apps", "API Integration", "UI/UX Design"],
    },
    {
      id: 2,
      name: "Cloud Solutions",
      description:
        "Comprehensive cloud services including migration, optimization, and management. We help businesses leverage the power of cloud computing.",
      image: "/images/services/cloud.jpg",
      category: "Cloud",
      features: ["AWS", "Azure", "Migration", "DevOps"],
    },
    {
      id: 3,
      name: "IT Consulting",
      description:
        "Strategic IT consulting to help businesses optimize their technology infrastructure and digital transformation journey.",
      image: "/images/services/consulting.jpg",
      category: "Consulting",
      features: [
        "Digital Strategy",
        "Tech Architecture",
        "Process Optimization",
      ],
    },
    {
      id: 4,
      name: "Managed IT Services",
      description:
        "24/7 IT support and management services to keep your business running smoothly. Includes monitoring, maintenance, and security.",
      image: "/images/services/managed-it.jpg",
      category: "Support",
      features: ["24/7 Support", "Security", "Maintenance", "Monitoring"],
    },
  ],
  certifications: [
    {
      name: "ISO 9001:2015",
      year: "2023",
      icon: "check-circle",
    },
    {
      name: "Microsoft Gold Partner",
      year: "2024",
      icon: "award",
    },
  ],
  testimonials: [
    {
      id: 1,
      name: "Raj Kumar",
      company: "Global Traders",
      content:
        "Exceptional service and professional team. Helped us transform our business digitally.",
      rating: 5,
      date: "May 2025",
    },
    {
      id: 2,
      name: "Priya Sharma",
      company: "Healthcare Plus",
      content:
        "Great experience working with Tech Solutions. Their expertise in healthcare solutions is commendable.",
      rating: 4.5,
      date: "April 2025",
    },
  ],
};

// Simple deep merge utility to apply overrides onto the base template
function mergeDeep(target, source) {
  const output = Array.isArray(target) ? [...target] : { ...target };
  if (typeof target !== "object" || target === null) return source;
  if (typeof source !== "object" || source === null) return output;
  for (const key of Object.keys(source)) {
    const srcVal = source[key];
    const tgtVal = output[key];
    if (Array.isArray(srcVal)) {
      output[key] = srcVal; // replace arrays
    } else if (typeof srcVal === "object" && srcVal !== null) {
      output[key] = mergeDeep(tgtVal || {}, srcVal);
    } else {
      output[key] = srcVal;
    }
  }
  return output;
}

// Mock overrides by ID to simulate different businesses
const mockDataById = {
  1: {
    name: "Sri Venkateswara Builders",
    categories: ["Civil Contractors"],
    description:
      "Quality civil construction and contracting services across Chennai with a focus on residential and commercial projects.",
    ownerDetails: { name: "Arun Prakash", role: "Proprietor" },
    contactInfo: {
      website: "www.svbuilders.in",
      phone: "+91 98400 11111",
      email: "info@svbuilders.in",
      location: {
        address: "Plot 12, North Usman Road, T. Nagar",
        city: "Chennai",
        state: "Tamil Nadu",
        pincode: "600017",
        landmark: "Near Panagal Park",
      },
    },
  },
  2: {
    name: "Kaveri PEB Solutions",
    categories: ["PEB Builders"],
    description:
      "Turnkey pre-engineered building solutions for industrial and warehousing needs in Coimbatore and beyond.",
    ownerDetails: { name: "Lakshmi Narayanan", role: "Managing Partner" },
    contactInfo: {
      website: "www.kaveripeb.com",
      phone: "+91 98949 22222",
      email: "sales@kaveripeb.com",
      location: {
        address: "SIDCO Industrial Estate, Kurichi",
        city: "Coimbatore",
        state: "Tamil Nadu",
        pincode: "641021",
        landmark: "Near SIDCO Park Gate",
      },
    },
  },
  3: {
    name: "Madurai Modular Kitchens",
    categories: ["Modular Kitchen Specialists"],
    description:
      "Custom modular kitchen designs with premium finishes and hardware, serving homes across Madurai.",
    ownerDetails: { name: "Priya Subramanian", role: "Founder" },
    contactInfo: {
      website: "www.maduraikitchens.com",
      phone: "+91 99445 33333",
      email: "hello@maduraikitchens.com",
      location: {
        address: "Alagar Kovil Main Road",
        city: "Madurai",
        state: "Tamil Nadu",
        pincode: "625002",
        landmark: "Near Tallakulam",
      },
    },
  },
  4: {
    name: "Chola Waterproofing Co.",
    categories: ["Waterproofing Contractors"],
    description:
      "Specialists in terrace, basement and bathroom waterproofing with long-term warranty across Trichy.",
    ownerDetails: { name: "Vignesh Kumar", role: "Owner" },
    contactInfo: {
      website: "www.cholawaterproofing.com",
      phone: "+91 90030 44444",
      email: "support@cholawaterproofing.com",
      location: {
        address: "Cantonment",
        city: "Tiruchirappalli",
        state: "Tamil Nadu",
        pincode: "620001",
        landmark: "Near Central Bus Stand",
      },
    },
  },
};

export default function BusinessProfilePage({ params }) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Build business data based on the dynamic route param
  const businessId = Number(params?.id);
  const overrides = mockDataById[businessId] || {};
  const businessData = mergeDeep(baseBusinessData, overrides);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "services", label: "Services" },
    { id: "requirements", label: "Requirements" },
    { id: "reviews", label: "Reviews" },
  ];

  const ServicesSection = ({ services }) => {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <Badge variant="outline" className="ml-2">
            {services.length} Services
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    );
  };

  const RequirementsSection = ({ requirements }) => {
    const activeRequirements = requirements.filter(
      (req) => req.status === "Active"
    );

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">Active Requirements</h2>
            <Badge variant="outline" className="ml-2">
              {activeRequirements.length} Active
            </Badge>
          </div>
          <Button variant="outline" className="text-sm">
            View All Requirements
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeRequirements.map((requirement) => (
            <RequirementCard key={requirement.id} requirement={requirement} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b z-50 pt-14">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold">Business Profile</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-28">
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          {/* Business Header Card */}
          <Card className="overflow-hidden">
            {/* Cover Image */}
            <div className="h-48 bg-gray-100 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Building2 className="w-10 h-10 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-semibold">
                        {businessData.name}
                      </h2>
                      {businessData.verified && (
                        <div className="bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full">
                          Verified
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-100 mt-1">
                      Est. {businessData.establishedYear}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-gray-600 fill-current" />
                    <span className="font-medium">
                      {businessData.stats.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({businessData.stats.reviews})
                    </span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">
                      {businessData.stats.connections}
                    </span>{" "}
                    connections
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setSaved(!saved)}
                  >
                    <Bookmark
                      className={`h-4 w-4 ${saved ? "fill-current" : ""}`}
                    />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Business Description */}
            <div className="px-6 py-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                {businessData.description}
              </p>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {businessData.expertise.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </Card>{" "}
          {/* Owner Details & Highlights */}
          <div className="grid grid-cols-1 gap-6">
            {/* Owner Details */}
            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-4">
                Owner Details
              </h3>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-7 h-7 text-gray-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">
                      {businessData.ownerDetails.name}
                    </h3>{" "}
                    <div className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                      {businessData.ownerDetails.activeStatus}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {businessData.ownerDetails.role}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                    <span>Group #{businessData.ownerDetails.groupNumber}</span>
                    <Separator orientation="vertical" className="h-4" />
                    <span>
                      Member since {businessData.ownerDetails.memberSince}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Button variant="outline" size="sm" className="text-sm">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      whatsapp
                    </Button>
                    <Button variant="outline" size="sm" className="text-sm">
                      <Phone className="w-4 h-4 mr-1" />
                      Call Now
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Business Highlights */}
            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-4">
                Highlights
              </h3>
              <div className="space-y-4">
                {businessData.highlights.map((highlight, index) => {
                  const Icon =
                    {
                      trophy: Trophy,
                      star: Star,
                      users: Users,
                    }[highlight.icon] || Trophy;

                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">
                          {highlight.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {businessData.categories.map((category, index) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 flex items-center gap-1.5"
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>{category}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Stats */}
          <Card className="p-6 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-2xl font-semibold">
                  {businessData.stats.referrals}
                </p>
                <p className="text-sm text-gray-500 mt-1">Referrals</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-2xl font-semibold">
                  {businessData.stats.requirements}
                </p>
                <p className="text-sm text-gray-500 mt-1">Requirements</p>
              </div>
            </div>
          </Card>
          {/* Services Section */}
          {activeTab === "services" && (
            <div className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {businessData.services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    name={service.name}
                    description={service.description}
                    image={service.image}
                    category={service.category}
                    features={service.features}
                  />
                ))}
              </div>
            </div>
          )}
          {/* Requirements Section */}
          {activeTab === "requirements" && (
            <RequirementsSection requirements={businessData.requirements} />
          )}
          {/* Stats and Testimonials */}
          <div className="grid grid-cols-1 gap-6">
            {/* Contact Info */}
            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-gray-400" />
                      <a
                        href={`https://${businessData.contactInfo.website}`}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        {businessData.contactInfo.website}
                      </a>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <a
                        href={`tel:${businessData.contactInfo.phone}`}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        {businessData.contactInfo.phone}
                      </a>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8">
                      Call
                    </Button>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <a
                        href={`mailto:${businessData.contactInfo.email}`}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        {businessData.contactInfo.email}
                      </a>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8">
                      Email
                    </Button>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {businessData.contactInfo.workingHours}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Social Media */}
            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-4">
                Connect
              </h3>
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${businessData.contactInfo.social.whatsapp}`}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    {" "}
                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">
                      WhatsApp Business
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>

                <a
                  href={`https://facebook.com/${businessData.contactInfo.social.facebook}`}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    {" "}
                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                      <Facebook className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">
                      Facebook Page
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>

                <a
                  href={`https://instagram.com/${businessData.contactInfo.social.instagram}`}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    {" "}
                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                      <Instagram className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">
                      Instagram Profile
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>

                <a
                  href={`https://linkedin.com/company/${businessData.contactInfo.social.linkedin}`}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    {" "}
                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                      <Linkedin className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">
                      LinkedIn Page
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>

                <a
                  href={`https://youtube.com/@${businessData.contactInfo.social.youtube}`}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    {" "}
                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                      <Youtube className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">
                      YouTube Channel
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
              </div>
            </Card>
          </div>
          {/* Location */}
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Location</h3>
              <Button variant="outline" size="sm" className="text-sm">
                Get Directions
              </Button>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-600">
                <p>{businessData.contactInfo.location.address}</p>
                <p>
                  {businessData.contactInfo.location.city},{" "}
                  {businessData.contactInfo.location.state}{" "}
                  {businessData.contactInfo.location.pincode}
                </p>
                <p className="text-gray-500 mt-1">
                  Landmark: {businessData.contactInfo.location.landmark}
                </p>
              </div>
            </div>
            {/* Map placeholder - you can integrate a real map here */}
            <div className="mt-4 h-48 bg-gray-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-gray-400" />
            </div>
          </Card>
          {/* Recent Requirements */}
          <Card className="mb-6">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Active Requirements
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {
                      businessData.requirements.filter(
                        (r) => r.status === "Active"
                      ).length
                    }{" "}
                    active requirements
                  </p>
                </div>
              </div>
            </div>
            <div className="divide-y">
              {businessData.requirements.map((req) => (
                <div key={req.id} className="group p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      {req.category === "Hiring" ? (
                        <Users className="w-6 h-6 text-gray-400" />
                      ) : req.category === "Partnership" ? (
                        <Users className="w-6 h-6 text-gray-400" />
                      ) : (
                        <Building2 className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-2 flex-wrap">
                            <h4 className="font-medium group-hover:text-gray-900">
                              {req.title}
                            </h4>
                            <div
                              className={`px-2 py-0.5 rounded-full text-xs ${
                                req.priority === "High"
                                  ? "bg-gray-200 text-gray-800"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {req.priority} Priority
                            </div>
                            <div className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
                              {req.category}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            {req.description}
                          </p>
                          <div className="mt-4 flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{req.postedDate}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>{req.responses} Responses</span>
                            </div>
                            {req.status === "Active" && (
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Eye className="w-3.5 h-3.5" />
                                <span>12 Views today</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-8 whitespace-nowrap"
                          >
                            <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                            Respond
                          </Button>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                            >
                              <Share className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                            >
                              <Bookmark className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                            >
                              <span className="text-xs font-medium text-gray-600">
                                {i}
                              </span>
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          3 members responded
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t bg-gray-50">
              <Button variant="outline" className="w-full">
                View All Requirements
                <ArrowLeft className="w-4 h-4 ml-1.5 rotate-180" />
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </main>
  );
}
