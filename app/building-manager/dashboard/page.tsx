"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Building2,
  Users,
  AlertCircle,
  TrendingUp,
  Calendar,
  UserCheck,
  FileText,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Upload,
  Bell,
  Mail,
} from "lucide-react"

export default function BuildingManagerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Mock data - Replace with actual API calls
  const stats = [
    {
      title: "Total Properties",
      value: "24",
      change: "+2 this month",
      icon: Building2,
      color: "text-teal",
    },
    {
      title: "Active Tenants",
      value: "156",
      change: "+12 this month",
      icon: Users,
      color: "text-gold",
    },
    {
      title: "Pending Requests",
      value: "8",
      change: "2 urgent",
      icon: AlertCircle,
      color: "text-coral",
    },
    {
      title: "Revenue",
      value: "AED 245K",
      change: "+15% vs last month",
      icon: TrendingUp,
      color: "text-forest",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone via-white to-teal/10">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-forest">Building Manager Portal</h1>
              <p className="text-sm text-gray-600">Manage properties, tenants, and services</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-teal flex items-center justify-center text-white font-semibold">
                  BM
                </div>
                <div className="text-sm">
                  <p className="font-semibold">Building Manager</p>
                  <p className="text-gray-600">manager@mahaone.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-forest">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="tenants">Tenants</TabsTrigger>
            <TabsTrigger value="landlords">Landlords</TabsTrigger>
            <TabsTrigger value="visits">Visits</TabsTrigger>
            <TabsTrigger value="visit-purposes">Visit Purposes</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="amenity-bookings">Amenity Bookings</TabsTrigger>
            <TabsTrigger value="home-services">Home Services</TabsTrigger>
            <TabsTrigger value="service-products">Service Products</TabsTrigger>
            <TabsTrigger value="service-bookings">Service Bookings</TabsTrigger>
            <TabsTrigger value="service-providers">Service Providers</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="report-priorities">Report Priorities</TabsTrigger>
            <TabsTrigger value="report-categories">Report Categories</TabsTrigger>
            <TabsTrigger value="community">Community Wall</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest updates across all properties</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "New tenant registered", property: "Tower A, Unit 1205", time: "2 hours ago" },
                      { action: "Maintenance request completed", property: "Tower B, Unit 804", time: "5 hours ago" },
                      { action: "Amenity booking confirmed", property: "Pool Area", time: "1 day ago" },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                        <div className="h-2 w-2 rounded-full bg-teal mt-2" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{activity.action}</p>
                          <p className="text-xs text-gray-600">{activity.property}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common management tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
                      <Plus className="h-5 w-5" />
                      <span className="text-xs">Add Property</span>
                    </Button>
                    <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
                      <UserCheck className="h-5 w-5" />
                      <span className="text-xs">Add Tenant</span>
                    </Button>
                    <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
                      <Calendar className="h-5 w-5" />
                      <span className="text-xs">View Bookings</span>
                    </Button>
                    <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
                      <FileText className="h-5 w-5" />
                      <span className="text-xs">Generate Report</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Property Management</CardTitle>
                    <CardDescription>Add, edit, and manage all properties</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-teal hover:bg-teal/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Property
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Add New Property</DialogTitle>
                        <DialogDescription>Enter property details</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="property-name-en">Name (English)</Label>
                            <Input id="property-name-en" placeholder="Luxury Villa" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="property-name-ar">Name (Arabic)</Label>
                            <Input id="property-name-ar" placeholder="فيلا فاخرة" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input id="location" placeholder="Dubai, UAE" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="area">Area (sqft)</Label>
                            <Input id="area" type="number" placeholder="1450" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bedrooms">Bedrooms</Label>
                            <Input id="bedrooms" type="number" placeholder="3" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="floor">Floor</Label>
                            <Input id="floor" type="number" placeholder="12" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="property-type">Property Type</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="villa">Villa</SelectItem>
                                <SelectItem value="townhouse">Townhouse</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="adults">Number of Adults</Label>
                            <Input id="adults" type="number" placeholder="4" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="owner">Owner</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select owner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="owner1">John Doe</SelectItem>
                              <SelectItem value="owner2">Jane Smith</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tenant">Tenant (Optional)</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select tenant" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tenant1">Ahmed Ali</SelectItem>
                              <SelectItem value="tenant2">Sara Mohammed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="handed-over" className="rounded" />
                          <Label htmlFor="handed-over">Property Handed Over</Label>
                        </div>
                        <div className="space-y-2">
                          <Label>Property Documents</Label>
                          <Button variant="outline" className="w-full bg-transparent">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Documents
                          </Button>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-teal hover:bg-teal/90">
                          Add Property
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search properties..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Properties</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Bedrooms</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Palm Tower Apt 1201</TableCell>
                      <TableCell>Dubai Marina</TableCell>
                      <TableCell>Apartment</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>1450 sqft</TableCell>
                      <TableCell>John Doe</TableCell>
                      <TableCell>Ahmed Ali</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tenants Tab */}
          <TabsContent value="tenants" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Tenant Management</CardTitle>
                    <CardDescription>Add, edit, and manage tenants</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-teal hover:bg-teal/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Tenant
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Tenant</DialogTitle>
                        <DialogDescription>Enter tenant details</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="first-name">First Name</Label>
                            <Input id="first-name" placeholder="John" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input id="last-name" placeholder="Doe" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="john.doe@example.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" placeholder="+971 50 123 4567" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="home-address">Home Address</Label>
                          <Textarea id="home-address" placeholder="Enter home address" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="delivery-address">Delivery Address</Label>
                          <Textarea id="delivery-address" placeholder="Enter delivery address" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="property-connect">Connect to Property</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select property" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="prop1">Palm Tower Apt 1201</SelectItem>
                              <SelectItem value="prop2">Marina View Villa</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-teal hover:bg-teal/90">
                          Add Tenant
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Ahmed Ali</TableCell>
                      <TableCell>ahmed.ali@example.com</TableCell>
                      <TableCell>+971 50 123 4567</TableCell>
                      <TableCell>Palm Tower Apt 1201</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Landlords Tab */}
          <TabsContent value="landlords" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Landlord Management</CardTitle>
                    <CardDescription>Add, edit, and manage landlords</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-teal hover:bg-teal/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Landlord
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Landlord</DialogTitle>
                        <DialogDescription>Enter landlord details</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="landlord-first-name">First Name</Label>
                            <Input id="landlord-first-name" placeholder="John" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="landlord-last-name">Last Name</Label>
                            <Input id="landlord-last-name" placeholder="Doe" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="landlord-email">Email</Label>
                          <Input id="landlord-email" type="email" placeholder="john.doe@example.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="landlord-phone">Phone Number</Label>
                          <Input id="landlord-phone" placeholder="+971 50 123 4567" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="landlord-home-address">Home Address</Label>
                          <Textarea id="landlord-home-address" placeholder="Enter home address" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="landlord-delivery-address">Delivery Address</Label>
                          <Textarea id="landlord-delivery-address" placeholder="Enter delivery address" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="landlord-property-connect">Connect to Property</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select property" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="prop1">Palm Tower Apt 1201</SelectItem>
                              <SelectItem value="prop2">Marina View Villa</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-teal hover:bg-teal/90">
                          Add Landlord
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Properties</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">John Doe</TableCell>
                      <TableCell>john.doe@example.com</TableCell>
                      <TableCell>+971 50 987 6543</TableCell>
                      <TableCell>3 Properties</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visits Tab */}
          <TabsContent value="visits" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Visit Management</CardTitle>
                <CardDescription>Manage visitor approvals and access</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Visitor Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Guests</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">John Smith</TableCell>
                      <TableCell>+971 50 111 2222</TableCell>
                      <TableCell>Palm Tower Apt 1201</TableCell>
                      <TableCell>Delivery</TableCell>
                      <TableCell>2025-01-28</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-500">Pending</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4 mr-1" />
                                Update
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Update Visit Status</DialogTitle>
                                <DialogDescription>Change approval status</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label>Approval Status</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="PENDING">Pending</SelectItem>
                                      <SelectItem value="APPROVED">Approved</SelectItem>
                                      <SelectItem value="REJECTED">Rejected</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button className="bg-teal hover:bg-teal/90">Update Status</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visit Purposes Tab */}
          <TabsContent value="visit-purposes" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Visit Purpose Management</CardTitle>
                    <CardDescription>Manage visit purpose types</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-teal hover:bg-teal/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Purpose
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Visit Purpose</DialogTitle>
                        <DialogDescription>Create a new visit purpose type</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="purpose-name-en">Name (English)</Label>
                            <Input id="purpose-name-en" placeholder="Delivery" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="purpose-name-ar">Name (Arabic)</Label>
                            <Input id="purpose-name-ar" placeholder="توصيل" />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="auto-approval" className="rounded" />
                          <Label htmlFor="auto-approval">Enable Auto Approval</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-teal hover:bg-teal/90">
                          Add Purpose
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Purpose Name</TableHead>
                      <TableHead>Auto Approval</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Delivery</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Enabled</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Maintenance</TableCell>
                      <TableCell>
                        <Badge className="bg-red-500">Disabled</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Amenities Tab */}
          <TabsContent value="amenities" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Amenity Management</CardTitle>
                    <CardDescription>Manage property amenities</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-teal hover:bg-teal/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Amenity
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Amenity</DialogTitle>
                        <DialogDescription>Create a new amenity</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="amenity-property">Property</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select property" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="prop1">Palm Tower</SelectItem>
                              <SelectItem value="prop2">Marina View</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="amenity-name">Amenity Name</Label>
                          <Input id="amenity-name" placeholder="Swimming Pool" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="amenity-description">Description</Label>
                          <Textarea id="amenity-description" placeholder="Enter description" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="amenity-capacity">Capacity</Label>
                            <Input id="amenity-capacity" type="number" placeholder="20" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="amenity-price">Price (AED)</Label>
                            <Input id="amenity-price" type="number" placeholder="100" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Amenity Image</Label>
                          <Button variant="outline" className="w-full bg-transparent">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Image
                          </Button>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-teal hover:bg-teal/90">
                          Add Amenity
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Amenity Name</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Swimming Pool</TableCell>
                      <TableCell>Palm Tower</TableCell>
                      <TableCell>20 people</TableCell>
                      <TableCell>AED 100</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Amenity Bookings Tab */}
          <TabsContent value="amenity-bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Amenity Booking Management</CardTitle>
                <CardDescription>Manage amenity bookings and approvals</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Amenity</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Guests</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Swimming Pool</TableCell>
                      <TableCell>Palm Tower</TableCell>
                      <TableCell>Ahmed Ali</TableCell>
                      <TableCell>2025-01-30</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-500">Pending</Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" />
                              Update
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Update Booking Status</DialogTitle>
                              <DialogDescription>Change booking status</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>Booking Status</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="PENDING">Pending</SelectItem>
                                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                                    <SelectItem value="COMPLETED">Completed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button className="bg-teal hover:bg-teal/90">Update Status</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Home Services Tab */}
          <TabsContent value="home-services" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Home Service Management</CardTitle>
                    <CardDescription>Manage available home services</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-teal hover:bg-teal/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Service
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Home Service</DialogTitle>
                        <DialogDescription>Create a new home service</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="service-property">Property</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select property" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="prop1">Palm Tower</SelectItem>
                              <SelectItem value="prop2">Marina View</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="service-title">Service Title</Label>
                          <Input id="service-title" placeholder="AC Maintenance" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="service-name">Service Name</Label>
                          <Input id="service-name" placeholder="Air Conditioning Service" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="service-price">Base Price (AED)</Label>
                          <Input id="service-price" type="number" placeholder="150" />
                        </div>
                        <div className="space-y-2">
                          <Label>Service Image</Label>
                          <Button variant="outline" className="w-full bg-transparent">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Image
                          </Button>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-teal hover:bg-teal/90">
                          Add Service
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service Title</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Base Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">AC Maintenance</TableCell>
                      <TableCell>Palm Tower</TableCell>
                      <TableCell>AED 150</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Service Products Tab */}
          <TabsContent value="service-products" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Home Service Product Management</CardTitle>
                    <CardDescription>Manage service product options</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-teal hover:bg-teal/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Service Product</DialogTitle>
                        <DialogDescription>Create a new service product option</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="product-service">Home Service</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="service1">AC Maintenance</SelectItem>
                              <SelectItem value="service2">Plumbing</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="product-name-en">Product Name (English)</Label>
                            <Input id="product-name-en" placeholder="Filter Replacement" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="product-name-ar">Product Name (Arabic)</Label>
                            <Input id="product-name-ar" placeholder="استبدال الفلتر" />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-teal hover:bg-teal/90">
                          Add Product
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Home Service</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Filter Replacement</TableCell>
                      <TableCell>AC Maintenance</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Service Bookings Tab */}
          <TabsContent value="service-bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Home Service Booking Management</CardTitle>
                <CardDescription>Manage service bookings and status</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">AC Maintenance</TableCell>
                      <TableCell>Palm Tower Apt 1201</TableCell>
                      <TableCell>Ahmed Ali</TableCell>
                      <TableCell>2025-01-29</TableCell>
                      <TableCell>Cool Tech Services</TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-500">Pending</Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" />
                              Update
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Update Booking Status</DialogTitle>
                              <DialogDescription>Change service booking status</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>Service Status</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="PENDING">Pending</SelectItem>
                                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                                    <SelectItem value="COMPLETED">Completed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button className="bg-teal hover:bg-teal/90">Update Status</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Service Providers Tab */}
          <TabsContent value="service-providers" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Service Provider Management</CardTitle>
                    <CardDescription>Manage service providers and vendors</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-teal hover:bg-teal/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Provider
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Service Provider</DialogTitle>
                        <DialogDescription>Register a new service provider</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="provider-service">Service Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="service1">AC Maintenance</SelectItem>
                              <SelectItem value="service2">Plumbing</SelectItem>
                              <SelectItem value="service3">Electrical</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="provider-name-en">Name (English)</Label>
                            <Input id="provider-name-en" placeholder="Cool Tech Services" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="provider-name-ar">Name (Arabic)</Label>
                            <Input id="provider-name-ar" placeholder="خدمات التبريد" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="provider-email">Email</Label>
                          <Input id="provider-email" type="email" placeholder="info@cooltech.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="provider-phone">Phone</Label>
                          <Input id="provider-phone" placeholder="+971 4 123 4567" />
                        </div>
                        <div className="space-y-2">
                          <Label>Provider Logo</Label>
                          <Button variant="outline" className="w-full bg-transparent">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Logo
                          </Button>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-teal hover:bg-teal/90">
                          Add Provider
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Provider Name</TableHead>
                      <TableHead>Service Type</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Cool Tech Services</TableCell>
                      <TableCell>AC Maintenance</TableCell>
                      <TableCell>info@cooltech.com</TableCell>
                      <TableCell>+971 4 123 4567</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Management</CardTitle>
                <CardDescription>Manage tenant reports and issues</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Reported By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Broken AC Unit</TableCell>
                      <TableCell>Maintenance</TableCell>
                      <TableCell>
                        <Badge className="bg-red-500">High</Badge>
                      </TableCell>
                      <TableCell>Ahmed Ali</TableCell>
                      <TableCell>2025-01-28</TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-500">Pending</Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" />
                              Update
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Update Report Status</DialogTitle>
                              <DialogDescription>Change report status</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>Report Status</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="PENDING">Pending</SelectItem>
                                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                                    <SelectItem value="COMPLETED">Completed</SelectItem>
                                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button className="bg-teal hover:bg-teal/90">Update Status</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Report Priorities Tab */}
          <TabsContent value="report-priorities" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Report Priority Management</CardTitle>
                    <CardDescription>Manage report priority levels</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-teal hover:bg-teal/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Priority
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Report Priority</DialogTitle>
                        <DialogDescription>Create a new priority level</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="priority-name">Priority Name</Label>
                          <Input id="priority-name" placeholder="High Priority" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="priority-status">Status</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ACTIVE">Active</SelectItem>
                              <SelectItem value="INACTIVE">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-teal hover:bg-teal/90">
                          Add Priority
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Priority Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">High Priority</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Medium Priority</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Report Categories Tab */}
          <TabsContent value="report-categories" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Report Category Management</CardTitle>
                    <CardDescription>Manage report categories</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-teal hover:bg-teal/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Category
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Report Category</DialogTitle>
                        <DialogDescription>Create a new report category</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="category-name">Category Name</Label>
                          <Input id="category-name" placeholder="Maintenance" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category-status">Status</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ACTIVE">Active</SelectItem>
                              <SelectItem value="INACTIVE">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-teal hover:bg-teal/90">
                          Add Category
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Maintenance</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Security</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Wall Tab */}
          <TabsContent value="community" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Community Wall Management</CardTitle>
                    <CardDescription>Manage community posts and announcements</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-teal hover:bg-teal/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Post
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Community Post</DialogTitle>
                        <DialogDescription>Create a new community post</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="post-name">Post Title</Label>
                          <Input id="post-name" placeholder="Community Event" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="post-type">Post Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ANNOUNCEMENT">Announcement</SelectItem>
                              <SelectItem value="EVENT">Event</SelectItem>
                              <SelectItem value="NEWS_LETTER">Newsletter</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="post-description">Description</Label>
                          <Textarea id="post-description" placeholder="Enter post description" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-teal hover:bg-teal/90">
                          Add Post
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Posted By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Community BBQ Event</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-500">Event</Badge>
                      </TableCell>
                      <TableCell>Building Manager</TableCell>
                      <TableCell>2025-01-28</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="profile-name">Full Name</Label>
                    <Input id="profile-name" defaultValue="Building Manager" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-email">Email</Label>
                    <Input id="profile-email" type="email" defaultValue="manager@mahaone.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-phone">Phone</Label>
                    <Input id="profile-phone" defaultValue="+971 50 123 4567" />
                  </div>
                  <Button className="bg-teal hover:bg-teal/90">Update Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button className="bg-teal hover:bg-teal/90">Change Password</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reset Password</CardTitle>
                  <CardDescription>Request a password reset link</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Click the button below to receive a password reset link via email.
                  </p>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Reset Link
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage your notification settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <input type="checkbox" id="email-notifications" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <input type="checkbox" id="sms-notifications" className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <input type="checkbox" id="push-notifications" className="rounded" defaultChecked />
                  </div>
                  <Button className="bg-teal hover:bg-teal/90">Save Preferences</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
