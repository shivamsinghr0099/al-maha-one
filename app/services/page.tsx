"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Wrench,
  Home,
  Hammer,
  CreditCard,
  Eye,
  HardHat,
  AlertTriangle,
  Calendar,
  Users,
  DollarSign,
  MessageSquare,
  CableCarIcon as Elevator,
  Search,
  Filter,
} from "lucide-react"
import Link from "next/link"

const serviceCategories = [
  {
    id: "move-in-out",
    title: "Move In / Move Out",
    description: "Moving services and documentation",
    icon: Home,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    route: "/move-in-out",
    services: ["Move In Documentation", "Move Out Processing", "NOC Generation", "Scheduling"],
  },
  {
    id: "home-services",
    title: "Home Services & Maintenance",
    description: "AC, Plumbing, Electrical, and more",
    icon: Wrench,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    route: "/maintenance",
    services: ["AC Maintenance", "Plumbing", "Electrical", "Carpentry", "Painting", "Pest Control"],
  },
  {
    id: "home-modification",
    title: "Home Modifications",
    description: "Structural changes and modifications",
    icon: Hammer,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    route: "/tenant/home-modification",
    services: ["Structural Changes", "Electrical Modifications", "Plumbing Changes", "Cosmetic Changes"],
  },
  {
    id: "parking-access",
    title: "Parking & Access Cards",
    description: "Access cards and parking permits",
    icon: CreditCard,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    route: "/parking",
    services: ["New Access Card", "Lost Card Replacement", "Parking Permits", "Additional Spaces"],
  },
  {
    id: "azure-eye",
    title: "Azure Eye",
    description: "Report issues and complaints",
    icon: Eye,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    route: "/azure-eye",
    services: ["Report Issues", "Track Complaints", "Community Feedback", "Resolution Updates"],
  },
  {
    id: "contractor-permit",
    title: "Contractor Access Permit",
    description: "Contractor access and permits",
    icon: HardHat,
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-50",
    route: "/tenant/contractor-permit",
    services: ["Access Permits", "Trade License Verification", "Work Scheduling", "Approval Tracking"],
  },
  {
    id: "violations",
    title: "Violation Notices & Penalties",
    description: "View and manage violations",
    icon: AlertTriangle,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    route: "/tenant/violations",
    services: ["View Notices", "Pay Fines", "Appeal Process", "Violation History"],
  },
  {
    id: "amenities",
    title: "Amenities Booking",
    description: "Book community facilities",
    icon: Calendar,
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50",
    route: "/amenities",
    services: ["Pool Booking", "Gym Reservation", "Function Room", "BBQ Area"],
  },
  {
    id: "visitors",
    title: "Visitor Management",
    description: "Manage and track visitors",
    icon: Users,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    route: "/visitors",
    services: ["Add Visitors", "Gate Pass", "Visitor Log", "Special Guests"],
  },
  {
    id: "lift-booking",
    title: "Lift Booking",
    description: "Reserve service lift usage",
    icon: Elevator,
    color: "from-gray-500 to-gray-600",
    bgColor: "bg-gray-50",
    route: "/tenant/lift-booking",
    services: ["Reserve Lift", "Track Bookings", "Usage Guidelines", "Approval Status"],
  },
  {
    id: "payments",
    title: "Payments & Billing",
    description: "Pay bills and manage finances",
    icon: DollarSign,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    route: "/payments",
    services: ["Pay Bills", "Transaction History", "Auto Pay Setup", "Payment Methods"],
  },
  {
    id: "community",
    title: "Community Forum",
    description: "Community discussions and announcements",
    icon: MessageSquare,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    route: "/community",
    services: ["Discussions", "Announcements", "Polls & Surveys", "Events"],
  },
]

const recentServices = [
  {
    id: 1,
    title: "AC Maintenance Request",
    category: "Home Services",
    status: "completed",
    date: "2024-01-15",
    description: "AC cleaning and filter replacement",
  },
  {
    id: 2,
    title: "Visitor Gate Pass",
    category: "Visitor Management",
    status: "approved",
    date: "2024-01-14",
    description: "Gate pass for family visit",
  },
  {
    id: 3,
    title: "Pool Booking",
    category: "Amenities",
    status: "confirmed",
    date: "2024-01-12",
    description: "Swimming pool reservation",
  },
]

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("all-services")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredServices = serviceCategories.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.services.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || service.id === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "approved":
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <Wrench className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">Services</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all-services">All Services</TabsTrigger>
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="all-services" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search services..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 bg-white"
                >
                  <option value="all">All Categories</option>
                  {serviceCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Card
                  key={service.id}
                  className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${service.bgColor} backdrop-blur-sm overflow-hidden relative group`}
                  onClick={() => (window.location.href = service.route)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 group-hover:from-white/70 group-hover:to-white/40 transition-all duration-300"></div>

                  <CardHeader className="relative pb-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    >
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-center text-lg font-bold text-gray-800">{service.title}</CardTitle>
                    <p className="text-center text-sm text-gray-600">{service.description}</p>
                  </CardHeader>

                  <CardContent className="relative">
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-700 text-sm">Available Services:</h4>
                      <div className="grid grid-cols-1 gap-1">
                        {service.services.slice(0, 4).map((subService, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                            <span className="text-xs text-gray-600">{subService}</span>
                          </div>
                        ))}
                        {service.services.length > 4 && (
                          <div className="text-xs text-gray-500 mt-1">+{service.services.length - 4} more services</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Recent Service Activity</h2>
              <Button onClick={() => setActiveTab("all-services")}>
                <Wrench className="h-4 w-4 mr-2" />
                Browse All Services
              </Button>
            </div>

            <div className="space-y-4">
              {recentServices.map((service) => (
                <Card key={service.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                          <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                        </div>
                        <p className="text-gray-600 mb-1">{service.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Category: {service.category}</span>
                          <span>Date: {service.date}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {recentServices.length === 0 && (
              <div className="text-center py-12">
                <Wrench className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Recent Activity</h3>
                <p className="text-gray-600 mb-4">You haven't used any services recently</p>
                <Button onClick={() => setActiveTab("all-services")}>Browse Services</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
