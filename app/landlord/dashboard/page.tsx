"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Building,
  Home,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Wrench,
  FileText,
  Bell,
  Plus,
  BarChart3,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"
import Link from "next/link"

const portfolioStats = [
  {
    title: "Total Properties",
    value: "12",
    change: "+2 this month",
    trend: "up",
    icon: Building,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Total Units",
    value: "48",
    change: "95% occupied",
    trend: "up",
    icon: Home,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Monthly Revenue",
    value: "AED 125,000",
    change: "+8.2% from last month",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Active Tenants",
    value: "46",
    change: "2 pending applications",
    trend: "neutral",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
]

const recentActivities = [
  {
    id: 1,
    type: "payment",
    title: "Rent payment received",
    description: "Villa A-101 - John Doe paid AED 4,500",
    time: "2 hours ago",
    status: "completed",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "maintenance",
    title: "Maintenance request",
    description: "Apt B-205 - AC repair needed",
    time: "4 hours ago",
    status: "pending",
    icon: Wrench,
    color: "text-orange-600",
  },
  {
    id: 3,
    type: "lease",
    title: "Lease renewal",
    description: "Villa C-301 - Lease expires in 30 days",
    time: "1 day ago",
    status: "attention",
    icon: FileText,
    color: "text-red-600",
  },
  {
    id: 4,
    type: "application",
    title: "New application",
    description: "Apt A-105 - Sarah Johnson applied",
    time: "2 days ago",
    status: "review",
    icon: Users,
    color: "text-blue-600",
  },
]

const properties = [
  {
    id: 1,
    name: "Azure Gardens Villa Complex",
    location: "Dubai Marina",
    units: 12,
    occupied: 11,
    revenue: "AED 54,000",
    image: "/placeholder.svg?height=200&width=300&text=Azure+Gardens",
    status: "excellent",
  },
  {
    id: 2,
    name: "Sunset Apartments",
    location: "JBR",
    units: 24,
    occupied: 22,
    revenue: "AED 48,000",
    image: "/placeholder.svg?height=200&width=300&text=Sunset+Apartments",
    status: "good",
  },
  {
    id: 3,
    name: "Marina Heights",
    location: "Dubai Marina",
    units: 8,
    occupied: 7,
    revenue: "AED 28,000",
    image: "/placeholder.svg?height=200&width=300&text=Marina+Heights",
    status: "attention",
  },
]

const alerts = [
  {
    id: 1,
    type: "overdue",
    title: "Overdue Rent Payment",
    message: "Villa A-103 - Payment overdue by 5 days",
    priority: "high",
    time: "Today",
  },
  {
    id: 2,
    type: "lease",
    title: "Lease Expiring Soon",
    message: "3 leases expiring in the next 30 days",
    priority: "medium",
    time: "This week",
  },
  {
    id: 3,
    type: "maintenance",
    title: "Urgent Maintenance",
    message: "Elevator repair needed at Sunset Apartments",
    priority: "high",
    time: "Yesterday",
  },
]

export default function LandlordDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Maha One
                  </span>
                  <p className="text-xs text-gray-500 -mt-1">Landlord Portal</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>

              <div className="flex items-center space-x-3">
                <Avatar className="ring-2 ring-blue-100">
                  <AvatarImage src="/placeholder.svg?height=32&width=32&text=LL" alt="Landlord" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">LL</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">Ahmed Al Mansouri</p>
                  <p className="text-xs text-gray-500">Property Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Ahmed! 👋</h1>
          <p className="text-gray-600">Here's an overview of your property portfolio</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {portfolioStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-xs ${stat.trend === "up" ? "text-emerald-600" : "text-gray-600"}`}>
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Plus className="h-4 w-4 text-white" />
                  </div>
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    asChild
                    className="h-auto p-4 flex-col space-y-2 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 hover:from-blue-100 hover:to-blue-200 border-0"
                  >
                    <Link href="/landlord/properties/add">
                      <Building className="h-6 w-6" />
                      <span className="text-sm">Add Property</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="h-auto p-4 flex-col space-y-2 bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700 hover:from-emerald-100 hover:to-emerald-200 border-0"
                  >
                    <Link href="/landlord/tenants">
                      <Users className="h-6 w-6" />
                      <span className="text-sm">Manage Tenants</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="h-auto p-4 flex-col space-y-2 bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700 hover:from-purple-100 hover:to-purple-200 border-0"
                  >
                    <Link href="/landlord/rent">
                      <DollarSign className="h-6 w-6" />
                      <span className="text-sm">Rent Collection</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="h-auto p-4 flex-col space-y-2 bg-gradient-to-br from-orange-50 to-orange-100 text-orange-700 hover:from-orange-100 hover:to-orange-200 border-0"
                  >
                    <Link href="/landlord/maintenance">
                      <Wrench className="h-6 w-6" />
                      <span className="text-sm">Maintenance</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Properties Overview */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    <span>Property Portfolio</span>
                  </CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/landlord/properties">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {properties.map((property) => (
                    <div
                      key={property.id}
                      className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={property.image || "/placeholder.svg"}
                          alt={property.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{property.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{property.location}</span>
                          </div>
                          <span>
                            {property.occupied}/{property.units} occupied
                          </span>
                        </div>
                        <div className="mt-2">
                          <Progress value={(property.occupied / property.units) * 100} className="h-2" />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{property.revenue}</p>
                        <Badge
                          variant={
                            property.status === "excellent"
                              ? "default"
                              : property.status === "good"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {property.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span>Recent Activities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50">
                      <div className="p-2 rounded-lg bg-gray-100">
                        <activity.icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          activity.status === "completed"
                            ? "bg-green-50 text-green-700"
                            : activity.status === "pending"
                              ? "bg-yellow-50 text-yellow-700"
                              : activity.status === "attention"
                                ? "bg-red-50 text-red-700"
                                : "bg-blue-50 text-blue-700"
                        }
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Alerts */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span>Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-3 rounded-lg border-l-4 ${
                        alert.priority === "high" ? "border-red-500 bg-red-50" : "border-yellow-500 bg-yellow-50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">{alert.title}</h4>
                          <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                        </div>
                        <span className="text-xs text-gray-500">{alert.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  View All Alerts
                </Button>
              </CardContent>
            </Card>

            {/* Revenue Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  <span>Revenue Trend</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">This Month</span>
                    <span className="font-bold text-green-600">AED 125,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Month</span>
                    <span className="font-medium text-gray-900">AED 115,500</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Growth</span>
                    <span className="font-medium text-emerald-600">+8.2%</span>
                  </div>
                  <div className="pt-4">
                    <Button variant="outline" className="w-full" size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Detailed Reports
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span>Quick Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-600">On-time Payments</span>
                    </div>
                    <span className="font-medium text-gray-900">92%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-gray-600">Vacancy Rate</span>
                    </div>
                    <span className="font-medium text-gray-900">5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Wrench className="h-4 w-4 text-orange-600" />
                      <span className="text-sm text-gray-600">Open Tickets</span>
                    </div>
                    <span className="font-medium text-gray-900">7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
