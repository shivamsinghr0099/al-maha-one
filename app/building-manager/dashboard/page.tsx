"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Wrench,
  AlertTriangle,
  Phone,
  Mail,
  CheckCircle,
  Plus,
  Edit,
  Search,
  Filter,
  Bell,
  Settings,
  UserPlus,
  Truck,
  ClipboardList,
  Star,
} from "lucide-react"
import { MahaLogo } from "@/components/maha-logo"
import Link from "next/link"

const dashboardStats = [
  {
    title: "Total Tenants",
    value: "156",
    change: "+12 this month",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Active Services",
    value: "23",
    change: "8 pending completion",
    trend: "neutral",
    icon: Wrench,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Open Complaints",
    value: "7",
    change: "3 urgent",
    trend: "attention",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    title: "Emergency Requests",
    value: "2",
    change: "Immediate attention",
    trend: "urgent",
    icon: Phone,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
]

const recentServices = [
  {
    id: 1,
    service: "AC Maintenance",
    tenant: "Ahmed Al Mansouri",
    unit: "A-101",
    vendor: "Cool Tech Services",
    status: "in-progress",
    priority: "medium",
    requestDate: "2024-01-20",
    cost: "AED 350",
  },
  {
    id: 2,
    service: "Plumbing Repair",
    tenant: "Sarah Johnson",
    unit: "B-205",
    vendor: "Fix It Pro",
    status: "pending",
    priority: "high",
    requestDate: "2024-01-19",
    cost: "AED 200",
  },
  {
    id: 3,
    service: "Electrical Work",
    tenant: "Mohammed Hassan",
    unit: "C-301",
    vendor: "Power Solutions",
    status: "completed",
    priority: "low",
    requestDate: "2024-01-18",
    cost: "AED 150",
  },
]

const complaints = [
  {
    id: 1,
    type: "Noise Complaint",
    complainant: "Fatima Al Zahra",
    unit: "A-205",
    description: "Loud music from neighboring unit after 10 PM",
    status: "pending",
    priority: "medium",
    date: "2024-01-20",
    assignedTo: null,
  },
  {
    id: 2,
    type: "Parking Issue",
    complainant: "John Smith",
    unit: "B-101",
    description: "Unauthorized vehicle in assigned parking spot",
    status: "in-progress",
    priority: "high",
    date: "2024-01-19",
    assignedTo: "Security Team",
  },
  {
    id: 3,
    type: "Common Area",
    complainant: "Lisa Chen",
    unit: "C-402",
    description: "Broken lighting in lobby area",
    status: "solved",
    priority: "medium",
    date: "2024-01-17",
    assignedTo: "Maintenance Team",
  },
]

const tenants = [
  {
    id: 1,
    name: "Ahmed Al Mansouri",
    email: "ahmed@email.com",
    phone: "+971 50 123 4567",
    unit: "A-101",
    leaseStart: "2024-01-01",
    leaseEnd: "2024-12-31",
    status: "active",
    rent: "AED 4,500",
    paymentStatus: "current",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@email.com",
    phone: "+971 55 987 6543",
    unit: "B-205",
    leaseStart: "2023-06-01",
    leaseEnd: "2024-05-31",
    status: "active",
    rent: "AED 3,200",
    paymentStatus: "overdue",
  },
  {
    id: 3,
    name: "Mohammed Hassan",
    email: "mohammed@email.com",
    phone: "+971 52 456 7890",
    unit: "C-301",
    leaseStart: "2024-02-01",
    leaseEnd: "2025-01-31",
    status: "active",
    rent: "AED 5,000",
    paymentStatus: "current",
  },
]

const vendors = [
  {
    id: 1,
    name: "Cool Tech Services",
    category: "AC Maintenance",
    contact: "+971 4 123 4567",
    email: "info@cooltech.ae",
    rating: 4.8,
    completedJobs: 45,
    status: "active",
  },
  {
    id: 2,
    name: "Fix It Pro",
    category: "Plumbing",
    contact: "+971 4 987 6543",
    email: "service@fixitpro.ae",
    rating: 4.6,
    completedJobs: 32,
    status: "active",
  },
  {
    id: 3,
    name: "Power Solutions",
    category: "Electrical",
    contact: "+971 4 456 7890",
    email: "help@powersolutions.ae",
    rating: 4.9,
    completedJobs: 67,
    status: "active",
  },
]

export default function BuildingManagerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddTenantModal, setShowAddTenantModal] = useState(false)
  const [showAddVendorModal, setShowAddVendorModal] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "solved":
      case "active":
      case "current":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "urgent":
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
      case "urgent":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pearl via-pearl-light to-stone-light">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-stone/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <MahaLogo size="md" variant="primary" showText={true} />
              <div className="h-6 w-px bg-stone/30"></div>
              <div>
                <h1 className="text-xl font-bold text-teal font-serif">Building Manager</h1>
                <p className="text-xs text-teal/60">Property Management Portal</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5 text-teal" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-coral rounded-full text-xs text-white flex items-center justify-center">
                  5
                </span>
              </Button>

              <div className="flex items-center space-x-3">
                <Avatar className="ring-2 ring-gold/20">
                  <AvatarImage src="/placeholder.svg?height=32&width=32&text=BM" alt="Building Manager" />
                  <AvatarFallback className="bg-gradient-to-br from-stone to-stone-dark text-white">BM</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-teal">Khalid Al Ahmed</p>
                  <p className="text-xs text-teal/60">Building Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-teal mb-2 font-serif">Welcome back, Khalid! 👋</h1>
          <p className="text-teal/70">Here's your building management overview for today</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-teal/70">{stat.title}</p>
                    <p className="text-2xl font-bold text-teal">{stat.value}</p>
                    <p
                      className={`text-xs ${stat.trend === "up" ? "text-emerald-600" : stat.trend === "urgent" ? "text-coral" : "text-teal/60"}`}
                    >
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gold data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-gold data-[state=active]:text-white">
              Services
            </TabsTrigger>
            <TabsTrigger value="complaints" className="data-[state=active]:bg-gold data-[state=active]:text-white">
              Complaints
            </TabsTrigger>
            <TabsTrigger value="tenants" className="data-[state=active]:bg-gold data-[state=active]:text-white">
              Tenants
            </TabsTrigger>
            <TabsTrigger value="vendors" className="data-[state=active]:bg-gold data-[state=active]:text-white">
              Vendors
            </TabsTrigger>
            <TabsTrigger value="emergency" className="data-[state=active]:bg-gold data-[state=active]:text-white">
              Emergency
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Services */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2 text-teal font-serif">
                      <Wrench className="h-5 w-5 text-gold" />
                      <span>Recent Services</span>
                    </CardTitle>
                    <Link href="/building-manager/services">
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentServices.slice(0, 3).map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center space-x-4 p-3 rounded-lg hover:bg-stone/10 transition-colors"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center">
                          <Wrench className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-teal">{service.service}</h4>
                          <p className="text-sm text-teal/70">
                            {service.tenant} - {service.unit}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                            <Badge className={getPriorityColor(service.priority)}>{service.priority}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-teal">{service.cost}</p>
                          <p className="text-xs text-teal/60">{service.requestDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Complaints */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2 text-teal font-serif">
                      <AlertTriangle className="h-5 w-5 text-coral" />
                      <span>Recent Complaints</span>
                    </CardTitle>
                    <Link href="/building-manager/complaints">
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {complaints.slice(0, 3).map((complaint) => (
                      <div key={complaint.id} className="space-y-2 p-3 rounded-lg hover:bg-stone/10 transition-colors">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-teal">{complaint.type}</h4>
                          <Badge className={getStatusColor(complaint.status)}>{complaint.status}</Badge>
                        </div>
                        <p className="text-sm text-teal/70">
                          {complaint.complainant} - {complaint.unit}
                        </p>
                        <p className="text-sm text-teal">{complaint.description}</p>
                        <div className="flex items-center justify-between text-xs text-teal/60">
                          <span>{complaint.date}</span>
                          <Badge className={getPriorityColor(complaint.priority)}>{complaint.priority}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-teal font-serif">
                  <Settings className="h-5 w-5 text-gold" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    onClick={() => setShowAddTenantModal(true)}
                    className="h-auto p-4 flex-col space-y-2 bg-gradient-to-br from-teal/10 to-teal/20 text-teal hover:from-teal/20 hover:to-teal/30 border-0"
                  >
                    <UserPlus className="h-6 w-6" />
                    <span className="text-sm">Add Tenant</span>
                  </Button>
                  <Button
                    onClick={() => setShowAddVendorModal(true)}
                    className="h-auto p-4 flex-col space-y-2 bg-gradient-to-br from-gold/10 to-gold/20 text-gold hover:from-gold/20 hover:to-gold/30 border-0"
                  >
                    <Truck className="h-6 w-6" />
                    <span className="text-sm">Add Vendor</span>
                  </Button>
                  <Link href="/building-manager/emergency">
                    <Button className="w-full h-auto p-4 flex-col space-y-2 bg-gradient-to-br from-coral/10 to-coral/20 text-coral hover:from-coral/20 hover:to-coral/30 border-0">
                      <Phone className="h-6 w-6" />
                      <span className="text-sm">Emergency</span>
                    </Button>
                  </Link>
                  <Link href="/building-manager/reports">
                    <Button className="w-full h-auto p-4 flex-col space-y-2 bg-gradient-to-br from-stone/10 to-stone/20 text-stone hover:from-stone/20 hover:to-stone/30 border-0">
                      <ClipboardList className="h-6 w-6" />
                      <span className="text-sm">Reports</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-teal font-serif">Service Management</h2>
              <Button className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-teal/40" />
                      <Input
                        placeholder="Search services..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-stone/30 focus:border-gold focus:ring-gold/20"
                      />
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger className="w-40 border-stone/30 focus:border-gold focus:ring-gold/20">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {recentServices.map((service) => (
                    <div
                      key={service.id}
                      className="p-4 border border-stone/20 rounded-lg hover:bg-stone/5 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center">
                            <Wrench className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-teal">{service.service}</h4>
                            <p className="text-sm text-teal/70">
                              {service.tenant} - {service.unit}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                          <Badge className={getPriorityColor(service.priority)}>{service.priority}</Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-teal/60">Vendor</p>
                          <p className="font-medium text-teal">{service.vendor}</p>
                        </div>
                        <div>
                          <p className="text-teal/60">Cost</p>
                          <p className="font-medium text-teal">{service.cost}</p>
                        </div>
                        <div>
                          <p className="text-teal/60">Request Date</p>
                          <p className="font-medium text-teal">{service.requestDate}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gold text-gold hover:bg-gold hover:text-white bg-transparent"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-teal text-teal hover:bg-teal hover:text-white bg-transparent"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Complaints Tab */}
          <TabsContent value="complaints" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-teal font-serif">Complaint Management</h2>
              <div className="flex space-x-2">
                <Badge className="bg-yellow-100 text-yellow-800">Pending: 4</Badge>
                <Badge className="bg-blue-100 text-blue-800">In Progress: 2</Badge>
                <Badge className="bg-green-100 text-green-800">Solved: 15</Badge>
              </div>
            </div>

            <div className="space-y-4">
              {complaints.map((complaint) => (
                <Card key={complaint.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-coral to-coral-dark rounded-lg flex items-center justify-center">
                          <AlertTriangle className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-teal text-lg">{complaint.type}</h3>
                          <p className="text-teal/70">
                            {complaint.complainant} - {complaint.unit}
                          </p>
                          <p className="text-sm text-teal/60 mt-1">{complaint.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(complaint.status)}>{complaint.status}</Badge>
                        <Badge className={getPriorityColor(complaint.priority)}>{complaint.priority}</Badge>
                      </div>
                    </div>

                    <p className="text-teal mb-4">{complaint.description}</p>

                    {complaint.assignedTo && (
                      <div className="mb-4 p-3 bg-stone/10 rounded-lg">
                        <p className="text-sm text-teal/70">
                          Assigned to: <span className="font-medium text-teal">{complaint.assignedTo}</span>
                        </p>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      {complaint.status === "pending" && (
                        <>
                          <Button size="sm" className="bg-gradient-to-r from-teal to-teal-dark text-white">
                            Assign Vendor
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gold text-gold hover:bg-gold hover:text-white bg-transparent"
                          >
                            Escalate to Management
                          </Button>
                        </>
                      )}
                      {complaint.status === "in-progress" && (
                        <Button size="sm" className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark as Solved
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-stone text-stone hover:bg-stone hover:text-white bg-transparent"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tenants Tab */}
          <TabsContent value="tenants" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-teal font-serif">Tenant Management</h2>
              <Button
                onClick={() => setShowAddTenantModal(true)}
                className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-white"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add New Tenant
              </Button>
            </div>

            <div className="grid gap-6">
              {tenants.map((tenant) => (
                <Card key={tenant.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12 ring-2 ring-gold/20">
                          <AvatarImage
                            src={`/placeholder-icon.png?height=48&width=48&text=${tenant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}`}
                          />
                          <AvatarFallback className="bg-gradient-to-br from-teal to-teal-dark text-white">
                            {tenant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-teal text-lg">{tenant.name}</h3>
                          <p className="text-teal/70">Unit {tenant.unit}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(tenant.status)}>{tenant.status}</Badge>
                        <Badge className={getStatusColor(tenant.paymentStatus)}>{tenant.paymentStatus}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-teal/60">Email</p>
                        <p className="font-medium text-teal">{tenant.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-teal/60">Phone</p>
                        <p className="font-medium text-teal">{tenant.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-teal/60">Rent</p>
                        <p className="font-medium text-teal">{tenant.rent}</p>
                      </div>
                      <div>
                        <p className="text-sm text-teal/60">Lease End</p>
                        <p className="font-medium text-teal">{tenant.leaseEnd}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gold text-gold hover:bg-gold hover:text-white bg-transparent"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Details
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-teal text-teal hover:bg-teal hover:text-white bg-transparent"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-stone text-stone hover:bg-stone hover:text-white bg-transparent"
                      >
                        View History
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Vendors Tab */}
          <TabsContent value="vendors" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-teal font-serif">Vendor Management</h2>
              <Button
                onClick={() => setShowAddVendorModal(true)}
                className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Vendor
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendors.map((vendor) => (
                <Card
                  key={vendor.id}
                  className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center">
                          <Truck className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-teal">{vendor.name}</h3>
                          <p className="text-sm text-teal/70">{vendor.category}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(vendor.status)}>{vendor.status}</Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-teal/60" />
                        <span className="text-sm text-teal">{vendor.contact}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-teal/60" />
                        <span className="text-sm text-teal">{vendor.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-gold fill-current" />
                        <span className="text-sm text-teal">
                          {vendor.rating} ({vendor.completedJobs} jobs)
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-gold text-gold hover:bg-gold hover:text-white bg-transparent"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-teal text-teal hover:bg-teal hover:text-white bg-transparent"
                      >
                        Assign Job
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Emergency Tab */}
          <TabsContent value="emergency" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-teal font-serif">Emergency Requests</h2>
              <Badge className="bg-red-100 text-red-800">2 Active Emergencies</Badge>
            </div>

            <div className="grid gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-l-red-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-red-800 text-lg">Water Leak Emergency</h3>
                        <p className="text-red-700">Fatima Al Zahra - Unit A-205</p>
                        <p className="text-sm text-red-600 mt-1">Reported: 2 hours ago</p>
                      </div>
                    </div>
                    <Badge className="bg-red-500 text-white">URGENT</Badge>
                  </div>

                  <p className="text-red-800 mb-4">
                    Major water leak in bathroom causing flooding. Immediate attention required.
                  </p>

                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Tenant
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500 text-red-600 hover:bg-red-500 hover:text-white bg-transparent"
                    >
                      Assign Emergency Team
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500 text-red-600 hover:bg-red-500 hover:text-white bg-transparent"
                    >
                      Mark Resolved
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-orange-800 text-lg">Elevator Malfunction</h3>
                        <p className="text-orange-700">Building Common Area</p>
                        <p className="text-sm text-orange-600 mt-1">Reported: 4 hours ago</p>
                      </div>
                    </div>
                    <Badge className="bg-orange-500 text-white">HIGH</Badge>
                  </div>

                  <p className="text-orange-800 mb-4">
                    Main elevator stuck between floors 3 and 4. Residents trapped inside.
                  </p>

                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Emergency Services
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white bg-transparent"
                    >
                      Contact Elevator Company
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white bg-transparent"
                    >
                      Update Status
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-teal font-serif">Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Fire Department</h4>
                    <p className="text-red-600">997</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Police</h4>
                    <p className="text-blue-600">999</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Ambulance</h4>
                    <p className="text-green-600">998</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Tenant Modal */}
      {showAddTenantModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white">
            <CardHeader>
              <CardTitle className="text-teal font-serif">Add New Tenant</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tenant-name">Full Name</Label>
                <Input id="tenant-name" placeholder="Enter tenant name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenant-email">Email</Label>
                <Input id="tenant-email" type="email" placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenant-phone">Phone</Label>
                <Input id="tenant-phone" placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenant-unit">Unit</Label>
                <Input id="tenant-unit" placeholder="Enter unit number" />
              </div>
              <div className="flex space-x-2">
                <Button onClick={() => setShowAddTenantModal(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={() => setShowAddTenantModal(false)}
                  className="flex-1 bg-gradient-to-r from-gold to-gold-dark text-white"
                >
                  Add Tenant
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Vendor Modal */}
      {showAddVendorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white">
            <CardHeader>
              <CardTitle className="text-teal font-serif">Add New Vendor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vendor-name">Company Name</Label>
                <Input id="vendor-name" placeholder="Enter company name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendor-category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ac">AC Maintenance</SelectItem>
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="cleaning">Cleaning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendor-contact">Contact</Label>
                <Input id="vendor-contact" placeholder="Enter contact number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendor-email">Email</Label>
                <Input id="vendor-email" type="email" placeholder="Enter email address" />
              </div>
              <div className="flex space-x-2">
                <Button onClick={() => setShowAddVendorModal(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={() => setShowAddVendorModal(false)}
                  className="flex-1 bg-gradient-to-r from-gold to-gold-dark text-white"
                >
                  Add Vendor
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
