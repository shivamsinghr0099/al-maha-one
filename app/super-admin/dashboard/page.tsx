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
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  Building,
  Users,
  Settings,
  AlertTriangle,
  Bell,
  FileText,
  Database,
  Lock,
  Activity,
  Eye,
  DollarSign,
  Wrench,
  Calendar,
  UserCheck,
  Clock,
  CheckCircle,
  Phone,
  CreditCard,
  MessageSquare,
  Home,
  Hammer,
  HardHat,
  Shield,
  BarChart3,
  Truck,
  HelpCircle,
  Calculator as Elevator,
  UserPlus,
  Edit,
  Trash2,
  Plus,
} from "lucide-react"
import { MahaLogo } from "@/components/maha-logo"

// All the data from previous implementation plus new comprehensive data
const systemStats = [
  {
    title: "Total Properties",
    value: "45",
    change: "+5 this month",
    trend: "up",
    icon: Building,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Building Managers",
    value: "12",
    change: "2 pending approval",
    trend: "neutral",
    icon: Settings,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Total Users",
    value: "1,247",
    change: "+89 this month",
    trend: "up",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "System Health",
    value: "99.8%",
    change: "All systems operational",
    trend: "excellent",
    icon: Activity,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
]

// Comprehensive tenant services that Super Admin can access
const tenantServices = [
  {
    id: "move-in-out",
    title: "Move In/Out Services",
    description: "Schedule moving services for any tenant",
    icon: Home,
    color: "from-primary to-primary-600",
    bgColor: "bg-primary/10",
    route: "/super-admin/tenant-services/move-in-out",
    category: "logistics",
  },
  {
    id: "home-services",
    title: "Home Services Management",
    description: "Manage AC, Plumbing, Electrical services",
    icon: Wrench,
    color: "from-secondary to-secondary-600",
    bgColor: "bg-secondary/10",
    route: "/super-admin/tenant-services/home-services",
    category: "maintenance",
  },
  {
    id: "home-modification",
    title: "Home Modification Oversight",
    description: "Review and approve structural changes",
    icon: Hammer,
    color: "from-neutral to-neutral-600",
    bgColor: "bg-neutral/10",
    route: "/super-admin/tenant-services/home-modification",
    category: "modifications",
  },
  {
    id: "parking-access",
    title: "Parking & Access Control",
    description: "Manage cards, permits, and access rights",
    icon: CreditCard,
    color: "from-accent to-accent-600",
    bgColor: "bg-accent/10",
    route: "/super-admin/tenant-services/parking-access",
    category: "access",
  },
  {
    id: "azure-eye",
    title: "Azure Eye System",
    description: "Monitor and manage issue reporting",
    icon: Eye,
    color: "from-primary to-primary-600",
    bgColor: "bg-primary/10",
    route: "/super-admin/tenant-services/azure-eye",
    category: "monitoring",
  },
  {
    id: "contractor-permit",
    title: "Contractor Permit System",
    description: "Manage contractor access permissions",
    icon: HardHat,
    color: "from-secondary to-secondary-600",
    bgColor: "bg-secondary/10",
    route: "/super-admin/tenant-services/contractor-permit",
    category: "permits",
  },
  {
    id: "violations",
    title: "Violations & Penalties",
    description: "Manage violations and penalty system",
    icon: AlertTriangle,
    color: "from-accent to-accent-600",
    bgColor: "bg-accent/10",
    route: "/super-admin/tenant-services/violations",
    category: "compliance",
  },
  {
    id: "amenities",
    title: "Amenities Management",
    description: "Oversee Pool, Gym, BBQ bookings",
    icon: Calendar,
    color: "from-success to-success-600",
    bgColor: "bg-success/10",
    route: "/super-admin/tenant-services/amenities",
    category: "amenities",
  },
  {
    id: "visitors",
    title: "Visitor Management System",
    description: "Complete visitor tracking and approval",
    icon: Users,
    color: "from-primary to-primary-600",
    bgColor: "bg-primary/10",
    route: "/super-admin/tenant-services/visitors",
    category: "security",
  },
  {
    id: "lift-booking",
    title: "Lift Booking System",
    description: "Manage elevator reservations",
    icon: Elevator,
    color: "from-secondary to-secondary-600",
    bgColor: "bg-secondary/10",
    route: "/super-admin/tenant-services/lift-booking",
    category: "logistics",
  },
  {
    id: "community",
    title: "Community Forum",
    description: "Moderate discussions and announcements",
    icon: MessageSquare,
    color: "from-accent to-accent-600",
    bgColor: "bg-accent/10",
    route: "/super-admin/tenant-services/community",
    category: "community",
  },
  {
    id: "support",
    title: "Support & Help Center",
    description: "Manage FAQs and emergency requests",
    icon: HelpCircle,
    color: "from-info to-info-600",
    bgColor: "bg-info/10",
    route: "/super-admin/tenant-services/support",
    category: "support",
  },
]

// Building Manager capabilities for Super Admin
const buildingManagerTools = [
  {
    id: "tenant-management",
    title: "Tenant Management",
    description: "Add, edit, and manage all tenants",
    icon: Users,
    color: "from-teal to-teal-600",
    count: "1,247 tenants",
  },
  {
    id: "service-management",
    title: "Service Management",
    description: "Oversee all maintenance services",
    icon: Wrench,
    color: "from-orange to-orange-600",
    count: "23 active",
  },
  {
    id: "vendor-management",
    title: "Vendor Management",
    description: "Manage service providers",
    icon: Truck,
    color: "from-gold to-gold-600",
    count: "45 vendors",
  },
  {
    id: "emergency-management",
    title: "Emergency Management",
    description: "Handle emergency situations",
    icon: Phone,
    color: "from-red-500 to-red-600",
    count: "2 active",
  },
]

// Landlord capabilities for Super Admin
const landlordTools = [
  {
    id: "portfolio-management",
    title: "Portfolio Management",
    description: "Manage all property portfolios",
    icon: Building,
    color: "from-blue-500 to-blue-600",
    count: "45 properties",
  },
  {
    id: "rent-collection",
    title: "Rent Collection",
    description: "Monitor and manage rent payments",
    icon: DollarSign,
    color: "from-green-500 to-green-600",
    count: "AED 2.1M/month",
  },
  {
    id: "tenant-screening",
    title: "Tenant Screening",
    description: "Review tenant applications",
    icon: UserCheck,
    color: "from-purple-500 to-purple-600",
    count: "18 pending",
  },
  {
    id: "property-analytics",
    title: "Property Analytics",
    description: "Comprehensive property insights",
    icon: BarChart3,
    color: "from-indigo-500 to-indigo-600",
    count: "Real-time data",
  },
]

// Financial overview data
const financialOverview = [
  {
    title: "Total Monthly Revenue",
    value: "AED 2,150,000",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Outstanding Payments",
    value: "AED 145,230",
    change: "6.7% of total",
    trend: "attention",
    icon: AlertTriangle,
    color: "text-red-600",
  },
  {
    title: "Service Charges Collected",
    value: "AED 890,450",
    change: "+8.2%",
    trend: "up",
    icon: Wrench,
    color: "text-blue-600",
  },
  {
    title: "Amenity Revenue",
    value: "AED 45,680",
    change: "+15.3%",
    trend: "up",
    icon: Calendar,
    color: "text-purple-600",
  },
]

// Emergency contacts and tools
const emergencyTools = [
  {
    title: "Fire Department",
    contact: "997",
    type: "emergency",
    icon: AlertTriangle,
    color: "bg-red-500",
  },
  {
    title: "Police",
    contact: "999",
    type: "emergency",
    icon: Shield,
    color: "bg-blue-500",
  },
  {
    title: "Ambulance",
    contact: "998",
    type: "emergency",
    icon: Phone,
    color: "bg-green-500",
  },
  {
    title: "Building Security",
    contact: "+971 4 XXX XXXX",
    type: "security",
    icon: Shield,
    color: "bg-gray-500",
  },
]

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddManagerModal, setShowAddManagerModal] = useState(false)
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false)
  const [selectedServiceCategory, setSelectedServiceCategory] = useState("all")

  const [languages, setLanguages] = useState([
    { id: "1", name: "English", code: "en", status: "ACTIVE" },
    { id: "2", name: "Arabic", code: "ar", status: "ACTIVE" },
  ])
  const [currencies, setCurrencies] = useState([
    { id: "1", name: "US Dollar", code: "USD", symbol: "$", status: "ACTIVE" },
    { id: "2", name: "UAE Dirham", code: "AED", symbol: "د.إ", status: "ACTIVE" },
  ])
  const [timezones, setTimezones] = useState([
    {
      id: "1",
      name: "Asia/Dubai",
      code: "AE",
      regionName: "Dubai",
      offsetHours: 4,
      offsetMinutes: 0,
      offsetString: "GMT+04:00",
      description: "UAE Standard Time",
      status: "ACTIVE",
    },
    {
      id: "2",
      name: "Asia/Kolkata",
      code: "IN",
      regionName: "India",
      offsetHours: 5,
      offsetMinutes: 30,
      offsetString: "GMT+05:30",
      description: "Indian Standard Time",
      status: "ACTIVE",
    },
  ])
  const [roles, setRoles] = useState([
    { id: "1", name: "Super Admin", code: "SUPER_ADMIN", status: "ACTIVE" },
    { id: "2", name: "Building Manager", code: "BUILDING_MANAGER", status: "ACTIVE" },
    { id: "3", name: "Landlord", code: "LANDLORD", status: "ACTIVE" },
    { id: "4", name: "Tenant", code: "TENANT", status: "ACTIVE" },
  ])
  const [modules, setModules] = useState([
    { id: "1", name: "User Management", code: "USER", status: "ACTIVE" },
    { id: "2", name: "Property Management", code: "PROPERTY", status: "ACTIVE" },
    { id: "3", name: "Financial Management", code: "FINANCIAL", status: "ACTIVE" },
  ])
  const [permissions, setPermissions] = useState([
    { id: "1", name: "Add", code: "ADD", status: "ACTIVE" },
    { id: "2", name: "Edit", code: "EDIT", status: "ACTIVE" },
    { id: "3", name: "Delete", code: "DELETE", status: "ACTIVE" },
    { id: "4", name: "View", code: "VIEW", status: "ACTIVE" },
  ])
  const [domains, setDomains] = useState([
    { id: "1", name: "Maha One", email: "admin@mahaone.com", phone: "0501234567", phoneCode: "+971", status: "ACTIVE" },
    {
      id: "2",
      name: "Azure Gardens",
      email: "admin@azuregardens.com",
      phone: "0507654321",
      phoneCode: "+971",
      status: "ACTIVE",
    },
  ])

  const [editingLanguage, setEditingLanguage] = useState<any>(null)
  const [editingCurrency, setEditingCurrency] = useState<any>(null)
  const [editingTimezone, setEditingTimezone] = useState<any>(null)
  const [editingRole, setEditingRole] = useState<any>(null)
  const [editingModule, setEditingModule] = useState<any>(null)
  const [editingPermission, setEditingPermission] = useState<any>(null)
  const [editingDomain, setEditingDomain] = useState<any>(null)

  const [showAddLanguage, setShowAddLanguage] = useState(false)
  const [showAddCurrency, setShowAddCurrency] = useState(false)
  const [showAddTimezone, setShowAddTimezone] = useState(false)
  const [showAddRole, setShowAddRole] = useState(false)
  const [showAddModule, setShowAddModule] = useState(false)
  const [showAddPermission, setShowAddPermission] = useState(false)
  const [showAddDomain, setShowAddDomain] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "ACTIVE":
      case "success":
      case "resolved":
      case "completed":
      case "paid":
      case "approved":
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
      case "monitoring":
      case "pending_approval":
      case "pending_payment":
      case "investigating":
        return "bg-yellow-100 text-yellow-800"
      case "maintenance":
      case "failed":
      case "overdue":
      case "escalated":
      case "urgent":
      case "INACTIVE":
        return "bg-red-100 text-red-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredServices =
    selectedServiceCategory === "all"
      ? tenantServices
      : tenantServices.filter((service) => service.category === selectedServiceCategory)

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
                <h1 className="text-xl font-bold text-teal font-serif">Super Admin</h1>
                <p className="text-xs text-teal/60">Complete System Control</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5 text-teal" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-coral rounded-full text-xs text-white flex items-center justify-center">
                  25
                </span>
              </Button>

              <div className="flex items-center space-x-3">
                <Avatar className="ring-2 ring-coral/20">
                  <AvatarImage src="/placeholder.svg?height=32&width=32&text=SA" alt="Super Admin" />
                  <AvatarFallback className="bg-gradient-to-br from-coral to-coral-dark text-white">SA</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-teal">Omar Al Rashid</p>
                  <p className="text-xs text-teal/60">Super Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-teal mb-2 font-serif">Complete MPOP Control Center 🎯</h1>
          <p className="text-teal/70">
            Access all tenant, building manager, and landlord features plus system oversight
          </p>
        </div>

        {/* System Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {systemStats.map((stat, index) => (
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
                      className={`text-xs ${
                        stat.trend === "up"
                          ? "text-emerald-600"
                          : stat.trend === "excellent"
                            ? "text-emerald-600"
                            : "text-teal/60"
                      }`}
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
          <TabsList className="inline-flex w-full overflow-x-auto bg-white/80 backdrop-blur-sm border border-stone/20 rounded-lg p-1 scrollbar-thin scrollbar-thumb-stone/30 scrollbar-track-transparent">
            <TabsTrigger
              value="overview"
              className="whitespace-nowrap data-[state=active]:bg-coral data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="tenant-services"
              className="whitespace-nowrap data-[state=active]:bg-coral data-[state=active]:text-white"
            >
              Tenant Services
            </TabsTrigger>
            <TabsTrigger
              value="building-ops"
              className="whitespace-nowrap data-[state=active]:bg-coral data-[state=active]:text-white"
            >
              Building Ops
            </TabsTrigger>
            <TabsTrigger
              value="landlord-tools"
              className="whitespace-nowrap data-[state=active]:bg-coral data-[state=active]:text-white"
            >
              Landlord Tools
            </TabsTrigger>
            <TabsTrigger
              value="financial"
              className="whitespace-nowrap data-[state=active]:bg-coral data-[state=active]:text-white"
            >
              Financial
            </TabsTrigger>
            <TabsTrigger
              value="approvals"
              className="whitespace-nowrap data-[state=active]:bg-coral data-[state=active]:text-white"
            >
              Approvals
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="whitespace-nowrap data-[state=active]:bg-coral data-[state=active]:text-white"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="emergency"
              className="whitespace-nowrap data-[state=active]:bg-coral data-[state=active]:text-white"
            >
              Emergency
            </TabsTrigger>
            <TabsTrigger
              value="system"
              className="whitespace-nowrap data-[state=active]:bg-coral data-[state=active]:text-white"
            >
              System
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="whitespace-nowrap data-[state=active]:bg-coral data-[state=active]:text-white"
            >
              Reports
            </TabsTrigger>
            <TabsTrigger
              value="languages"
              className="whitespace-nowrap data-[state=active]:bg-coral data-[state=active]:text-white"
            >
              Languages
            </TabsTrigger>
            <TabsTrigger
              value="currencies"
              className="whitespace-nowrap data-[state=active]:bg-coral data-[state=active]:text-white"
            >
              Currencies
            </TabsTrigger>
            <TabsTrigger
              value="timezones"
              className="whitespace-nowrap data-[state=active]:bg-coral data-[state=active]:text-white"
            >
              Timezones
            </TabsTrigger>
            <TabsTrigger
              value="roles"
              className="whitespace-nowrap data-[state=active]:bg-coral data-[state=active]:text-white"
            >
              Roles
            </TabsTrigger>
            <TabsTrigger
              value="modules"
              className="whitespace-nowrap data-[state=active]:bg-coral data-[state=active]:text-white"
            >
              Modules
            </TabsTrigger>
            <TabsTrigger
              value="permissions"
              className="whitespace-nowrap data-[state=active]:bg-coral data-[state=active]:text-white"
            >
              Permissions
            </TabsTrigger>
            <TabsTrigger
              value="domains"
              className="whitespace-nowrap data-[state=active]:bg-coral data-[state=active]:text-white"
            >
              Domains
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* System Health */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-teal font-serif">
                    <Activity className="h-5 w-5 text-emerald-600" />
                    <span>System Health</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-teal/70">Server Uptime</span>
                      <span className="font-bold text-emerald-600">99.8%</span>
                    </div>
                    <Progress value={99.8} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-teal/70">Active Users</span>
                      <span className="font-bold text-emerald-600">1,247</span>
                    </div>
                    <Progress value={85} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-teal/70">System Load</span>
                      <span className="font-bold text-emerald-600">Normal</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-teal font-serif">
                    <Settings className="h-5 w-5 text-gold" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => setShowAddPropertyModal(true)}
                      className="h-auto p-3 flex-col space-y-1 bg-gradient-to-br from-teal/10 to-teal/20 text-teal hover:from-teal/20 hover:to-teal/30 border-0 text-xs"
                    >
                      <Building className="h-5 w-5" />
                      <span>Add Property</span>
                    </Button>
                    <Button
                      onClick={() => setShowAddManagerModal(true)}
                      className="h-auto p-3 flex-col space-y-1 bg-gradient-to-br from-gold/10 to-gold/20 text-gold hover:from-gold/20 hover:to-gold/30 border-0 text-xs"
                    >
                      <UserPlus className="h-5 w-5" />
                      <span>Add Manager</span>
                    </Button>
                    <Button className="h-auto p-3 flex-col space-y-1 bg-gradient-to-br from-coral/10 to-coral/20 text-coral hover:from-coral/20 hover:to-coral/30 border-0 text-xs">
                      <Database className="h-5 w-5" />
                      <span>Backup</span>
                    </Button>
                    <Button className="h-auto p-3 flex-col space-y-1 bg-gradient-to-br from-stone/10 to-stone/20 text-stone hover:from-stone/20 hover:to-stone/30 border-0 text-xs">
                      <FileText className="h-5 w-5" />
                      <span>Reports</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-teal font-serif">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span>Recent Activities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-xs font-medium text-teal">Maintenance Approved</p>
                        <p className="text-xs text-teal/60">Azure Gardens - AC Repair</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-yellow-50 rounded-lg">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <div>
                        <p className="text-xs font-medium text-teal">Payment Overdue</p>
                        <p className="text-xs text-teal/60">Pearl Towers - Unit B-304</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                      <UserCheck className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-xs font-medium text-teal">New Tenant Added</p>
                        <p className="text-xs text-teal/60">Marina Heights - Unit C-205</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Financial Overview */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-teal font-serif">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span>Financial Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {financialOverview.map((item, index) => (
                    <div key={index} className="text-center p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl">
                      <div
                        className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.color === "text-green-600" ? "from-green-100 to-green-200" : item.color === "text-red-600" ? "from-red-100 to-red-200" : item.color === "text-blue-600" ? "from-blue-100 to-blue-200" : "from-purple-100 to-purple-200"}`}
                      >
                        <item.icon className={`h-6 w-6 ${item.color}`} />
                      </div>
                      <p className="text-lg font-bold text-teal">{item.value}</p>
                      <p className="text-sm text-teal/70">{item.title}</p>
                      <p className={`text-xs ${item.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {item.change}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tenant Services Tab - All tenant features */}
          <TabsContent value="tenant-services" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-teal font-serif">Complete Tenant Services</h2>
              <div className="flex space-x-2">
                <Select value={selectedServiceCategory} onValueChange={setSelectedServiceCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Services</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="logistics">Logistics</SelectItem>
                    <SelectItem value="access">Access Control</SelectItem>
                    <SelectItem value="amenities">Amenities</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service) => (
                <Card
                  key={service.id}
                  className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${service.bgColor} backdrop-blur-sm overflow-hidden relative group`}
                  onClick={() => (window.location.href = service.route)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 group-hover:from-white/70 group-hover:to-white/40 transition-all duration-300"></div>

                  <CardContent className="relative p-6 text-center h-full flex flex-col justify-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    >
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-teal text-lg mb-2">{service.title}</h3>
                    <p className="text-sm text-teal/70 leading-relaxed">{service.description}</p>
                    <Badge className="mt-3 mx-auto bg-white/80 text-teal">{service.category}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Building Operations Tab - All building manager features */}
          <TabsContent value="building-ops" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-teal font-serif">Building Operations Management</h2>
              <Badge className="bg-teal/10 text-teal">All Building Manager Features</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {buildingManagerTools.map((tool) => (
                <Card
                  key={tool.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm cursor-pointer"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg`}
                    >
                      <tool.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-teal text-lg mb-2">{tool.title}</h3>
                    <p className="text-sm text-teal/70 mb-3">{tool.description}</p>
                    <Badge className="bg-teal/10 text-teal">{tool.count}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Building Manager Quick Actions */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-teal font-serif">Building Management Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="h-auto p-4 flex-col space-y-2 bg-gradient-to-br from-teal/10 to-teal/20 text-teal hover:from-teal/20 hover:to-teal/30 border-0">
                    <UserPlus className="h-6 w-6" />
                    <span className="text-sm">Add Tenant</span>
                  </Button>
                  <Button className="h-auto p-4 flex-col space-y-2 bg-gradient-to-br from-orange/10 to-orange/20 text-orange hover:from-orange/20 hover:to-orange/30 border-0">
                    <Wrench className="h-6 w-6" />
                    <span className="text-sm">Schedule Service</span>
                  </Button>
                  <Button className="h-auto p-4 flex-col space-y-2 bg-gradient-to-br from-gold/10 to-gold/20 text-gold hover:from-gold/20 hover:to-gold/30 border-0">
                    <Truck className="h-6 w-6" />
                    <span className="text-sm">Add Vendor</span>
                  </Button>
                  <Button className="h-auto p-4 flex-col space-y-2 bg-gradient-to-br from-red/10 to-red/20 text-red hover:from-red/20 hover:to-red/30 border-0">
                    <Phone className="h-6 w-6" />
                    <span className="text-sm">Emergency</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Landlord Tools Tab - All landlord features */}
          <TabsContent value="landlord-tools" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-teal font-serif">Landlord Management Tools</h2>
              <Badge className="bg-blue-100 text-blue-800">All Landlord Features</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {landlordTools.map((tool) => (
                <Card
                  key={tool.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm cursor-pointer"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg`}
                    >
                      <tool.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-teal text-lg mb-2">{tool.title}</h3>
                    <p className="text-sm text-teal/70 mb-3">{tool.description}</p>
                    <Badge className="bg-blue-100 text-blue-800">{tool.count}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Landlord Quick Actions */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-teal font-serif">Landlord Management Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="h-auto p-4 flex-col space-y-2 bg-gradient-to-br from-blue/10 to-blue/20 text-blue hover:from-blue/20 hover:to-blue/30 border-0">
                    <Building className="h-6 w-6" />
                    <span className="text-sm">Add Property</span>
                  </Button>
                  <Button className="h-auto p-4 flex-col space-y-2 bg-gradient-to-br from-green/10 to-green/20 text-green hover:from-green/20 hover:to-green/30 border-0">
                    <DollarSign className="h-6 w-6" />
                    <span className="text-sm">Collect Rent</span>
                  </Button>
                  <Button className="h-auto p-4 flex-col space-y-2 bg-gradient-to-br from-purple/10 to-purple/20 text-purple hover:from-purple/20 hover:to-purple/30 border-0">
                    <UserCheck className="h-6 w-6" />
                    <span className="text-sm">Screen Tenant</span>
                  </Button>
                  <Button className="h-auto p-4 flex-col space-y-2 bg-gradient-to-br from-indigo/10 to-indigo/20 text-indigo hover:from-indigo/20 hover:to-indigo/30 border-0">
                    <BarChart3 className="h-6 w-6" />
                    <span className="text-sm">View Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Management Tab */}
          <TabsContent value="financial" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-teal font-serif">Complete Financial Management</h2>
              <div className="flex space-x-2">
                <Badge className="bg-green-100 text-green-800">Revenue: AED 2.1M</Badge>
                <Badge className="bg-red-100 text-red-800">Outstanding: AED 145K</Badge>
              </div>
            </div>

            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {financialOverview.map((item, index) => (
                <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-teal/70">{item.title}</p>
                        <p className="text-xl font-bold text-teal">{item.value}</p>
                        <p className={`text-xs ${item.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                          {item.change}
                        </p>
                      </div>
                      <div
                        className={`p-3 rounded-xl ${item.color === "text-green-600" ? "bg-green-50" : item.color === "text-red-600" ? "bg-red-50" : item.color === "text-blue-600" ? "bg-blue-50" : "bg-purple-50"}`}
                      >
                        <item.icon className={`h-6 w-6 ${item.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Financial Actions */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-teal font-serif">Financial Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="h-auto p-4 flex-col space-y-2 bg-gradient-to-br from-green/10 to-green/20 text-green hover:from-green/20 hover:to-green/30 border-0">
                    <DollarSign className="h-6 w-6" />
                    <span className="text-sm">Process Payments</span>
                  </Button>
                  <Button className="h-auto p-4 flex-col space-y-2 bg-gradient-to-br from-red/10 to-red/20 text-red hover:from-red/20 hover:to-red/30 border-0">
                    <AlertTriangle className="h-6 w-6" />
                    <span className="text-sm">Overdue Notices</span>
                  </Button>
                  <Button className="h-auto p-4 flex-col space-y-2 bg-gradient-to-br from-blue/10 to-blue/20 text-blue hover:from-blue/20 hover:to-blue/30 border-0">
                    <BarChart3 className="h-6 w-6" />
                    <span className="text-sm">Financial Reports</span>
                  </Button>
                  <Button className="h-auto p-4 flex-col space-y-2 bg-gradient-to-br from-purple/10 to-purple/20 text-purple hover:from-purple/20 hover:to-purple/30 border-0">
                    <FileText className="h-6 w-6" />
                    <span className="text-sm">Generate Invoice</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emergency Management Tab */}
          <TabsContent value="emergency" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-teal font-serif">Emergency Management Center</h2>
              <Badge className="bg-red-100 text-red-800">2 Active Emergencies</Badge>
            </div>

            {/* Emergency Contacts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {emergencyTools.map((contact, index) => (
                <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <div
                      className={`w-12 h-12 ${contact.color} rounded-xl mx-auto mb-3 flex items-center justify-center`}
                    >
                      <contact.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-teal text-sm">{contact.title}</h4>
                    <p className="text-lg font-bold text-teal">{contact.contact}</p>
                    <Button size="sm" className="mt-2 w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Emergency Actions */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-teal font-serif">Emergency Response Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="h-auto p-4 flex-col space-y-2 bg-gradient-to-br from-red/10 to-red/20 text-red hover:from-red/20 hover:to-red/30 border-0">
                    <AlertTriangle className="h-6 w-6" />
                    <span className="text-sm">Declare Emergency</span>
                  </Button>
                  <Button className="h-auto p-4 flex-col space-y-2 bg-gradient-to-br from-orange/10 to-orange/20 text-orange hover:from-orange/20 hover:to-orange/30 border-0">
                    <Bell className="h-6 w-6" />
                    <span className="text-sm">Send Alert</span>
                  </Button>
                  <Button className="h-auto p-4 flex-col space-y-2 bg-gradient-to-br from-blue/10 to-blue/20 text-blue hover:from-blue/20 hover:to-blue/30 border-0">
                    <Phone className="h-6 w-6" />
                    <span className="text-sm">Contact Security</span>
                  </Button>
                  <Button className="h-auto p-4 flex-col space-y-2 bg-gradient-to-br from-green/10 to-green/20 text-green hover:from-green/20 hover:to-green/30 border-0">
                    <CheckCircle className="h-6 w-6" />
                    <span className="text-sm">All Clear</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Keep existing approvals, system, analytics, and reports tabs */}
          <TabsContent value="approvals" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-teal font-serif">Approval Management</h2>
              <Badge className="bg-coral/10 text-coral">18 Pending Approvals</Badge>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <p className="text-teal/70 text-center py-8">
                  Comprehensive approval system for all tenant requests, building modifications, and system changes.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-teal font-serif">Analytics & Insights</h2>
              <Badge className="bg-blue-100 text-blue-800">Real-time Data</Badge>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <p className="text-teal/70 text-center py-8">
                  Comprehensive analytics dashboard with property performance, tenant satisfaction, and financial
                  insights.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-teal font-serif">System Administration</h2>
              <Badge className="bg-emerald-100 text-emerald-800">All Systems Operational</Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-teal font-serif">
                    <Database className="h-5 w-5 text-blue-600" />
                    <span>Database Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-teal/70">Database Size</span>
                    <span className="font-bold text-teal">2.4 GB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-teal/70">Last Backup</span>
                    <span className="font-bold text-teal">2024-01-20 02:00</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <Database className="h-4 w-4 mr-2" />
                    Create Backup
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-teal font-serif">
                    <Lock className="h-5 w-5 text-red-600" />
                    <span>Security Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-teal/70">SSL Certificate</span>
                    <Badge className="bg-green-100 text-green-800">Valid</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-teal/70">Firewall Status</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white">
                    <Lock className="h-4 w-4 mr-2" />
                    Security Scan
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-teal font-serif">Reports & Documentation</h2>
              <Button className="bg-gradient-to-r from-coral to-coral-dark text-white">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <p className="text-teal/70 text-center py-8">
                  Comprehensive reporting system for all aspects of property management, financial performance, and
                  system usage.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="languages" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-teal font-serif">Language Management</h2>
                <p className="text-sm text-teal/70">Manage system languages and translations</p>
              </div>
              <Button
                onClick={() => setShowAddLanguage(true)}
                className="bg-gradient-to-r from-coral to-coral-dark text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Language
              </Button>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {languages.map((language) => (
                      <TableRow key={language.id}>
                        <TableCell className="font-medium">{language.name}</TableCell>
                        <TableCell>{language.code}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(language.status)}>{language.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => setEditingLanguage(language)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setLanguages(languages.filter((l) => l.id !== language.id))}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="currencies" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-teal font-serif">Currency Management</h2>
                <p className="text-sm text-teal/70">Manage system currencies and exchange rates</p>
              </div>
              <Button
                onClick={() => setShowAddCurrency(true)}
                className="bg-gradient-to-r from-coral to-coral-dark text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Currency
              </Button>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currencies.map((currency) => (
                      <TableRow key={currency.id}>
                        <TableCell className="font-medium">{currency.name}</TableCell>
                        <TableCell>{currency.code}</TableCell>
                        <TableCell>{currency.symbol}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(currency.status)}>{currency.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => setEditingCurrency(currency)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setCurrencies(currencies.filter((c) => c.id !== currency.id))}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timezones" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-teal font-serif">Timezone Management</h2>
                <p className="text-sm text-teal/70">Manage system timezones and regional settings</p>
              </div>
              <Button
                onClick={() => setShowAddTimezone(true)}
                className="bg-gradient-to-r from-coral to-coral-dark text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Timezone
              </Button>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Offset</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timezones.map((timezone) => (
                      <TableRow key={timezone.id}>
                        <TableCell className="font-medium">{timezone.name}</TableCell>
                        <TableCell>{timezone.code}</TableCell>
                        <TableCell>{timezone.regionName}</TableCell>
                        <TableCell>{timezone.offsetString}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(timezone.status)}>{timezone.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => setEditingTimezone(timezone)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setTimezones(timezones.filter((t) => t.id !== timezone.id))}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-teal font-serif">Role Management</h2>
                <p className="text-sm text-teal/70">Manage user roles and access levels</p>
              </div>
              <Button
                onClick={() => setShowAddRole(true)}
                className="bg-gradient-to-r from-coral to-coral-dark text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Role
              </Button>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell className="font-medium">{role.name}</TableCell>
                        <TableCell>{role.code}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(role.status)}>{role.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => setEditingRole(role)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setRoles(roles.filter((r) => r.id !== role.id))}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="modules" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-teal font-serif">Module Management</h2>
                <p className="text-sm text-teal/70">Manage system modules and features</p>
              </div>
              <Button
                onClick={() => setShowAddModule(true)}
                className="bg-gradient-to-r from-coral to-coral-dark text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Module
              </Button>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {modules.map((module) => (
                      <TableRow key={module.id}>
                        <TableCell className="font-medium">{module.name}</TableCell>
                        <TableCell>{module.code}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(module.status)}>{module.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => setEditingModule(module)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setModules(modules.filter((m) => m.id !== module.id))}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-teal font-serif">Permission Management</h2>
                <p className="text-sm text-teal/70">Manage system permissions and access rights</p>
              </div>
              <Button
                onClick={() => setShowAddPermission(true)}
                className="bg-gradient-to-r from-coral to-coral-dark text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Permission
              </Button>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {permissions.map((permission) => (
                      <TableRow key={permission.id}>
                        <TableCell className="font-medium">{permission.name}</TableCell>
                        <TableCell>{permission.code}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(permission.status)}>{permission.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => setEditingPermission(permission)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setPermissions(permissions.filter((p) => p.id !== permission.id))}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="domains" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-teal font-serif">Domain Management</h2>
                <p className="text-sm text-teal/70">Manage system domains and organizations</p>
              </div>
              <Button
                onClick={() => setShowAddDomain(true)}
                className="bg-gradient-to-r from-coral to-coral-dark text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Domain
              </Button>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {domains.map((domain) => (
                      <TableRow key={domain.id}>
                        <TableCell className="font-medium">{domain.name}</TableCell>
                        <TableCell>{domain.email}</TableCell>
                        <TableCell>
                          {domain.phoneCode} {domain.phone}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(domain.status)}>{domain.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => setEditingDomain(domain)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDomains(domains.filter((d) => d.id !== domain.id))}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Keep existing modals */}
      {showAddManagerModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white">
            <CardHeader>
              <CardTitle className="text-teal font-serif">Add New Building Manager</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="manager-name">Full Name</Label>
                <Input id="manager-name" placeholder="Enter manager name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manager-email">Email</Label>
                <Input id="manager-email" type="email" placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manager-phone">Phone</Label>
                <Input id="manager-phone" placeholder="Enter phone number" />
              </div>
              <div className="flex space-x-2">
                <Button onClick={() => setShowAddManagerModal(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={() => setShowAddManagerModal(false)}
                  className="flex-1 bg-gradient-to-r from-coral to-coral-dark text-white"
                >
                  Add Manager
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showAddPropertyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white">
            <CardHeader>
              <CardTitle className="text-teal font-serif">Add New Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="property-name">Property Name</Label>
                <Input id="property-name" placeholder="Enter property name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="property-location">Location</Label>
                <Input id="property-location" placeholder="Enter location" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="property-units">Total Units</Label>
                <Input id="property-units" type="number" placeholder="Enter number of units" />
              </div>
              <div className="flex space-x-2">
                <Button onClick={() => setShowAddPropertyModal(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={() => setShowAddPropertyModal(false)}
                  className="flex-1 bg-gradient-to-r from-coral to-coral-dark text-white"
                >
                  Add Property
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {editingLanguage && (
        <Dialog open={!!editingLanguage} onOpenChange={() => setEditingLanguage(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Language</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input defaultValue={editingLanguage.name} />
              </div>
              <div className="space-y-2">
                <Label>Code</Label>
                <Input defaultValue={editingLanguage.code} />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue={editingLanguage.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingLanguage(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => setEditingLanguage(null)}
                className="bg-gradient-to-r from-coral to-coral-dark text-white"
              >
                Update
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {editingCurrency && (
        <Dialog open={!!editingCurrency} onOpenChange={() => setEditingCurrency(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Currency</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input defaultValue={editingCurrency.name} />
              </div>
              <div className="space-y-2">
                <Label>Code</Label>
                <Input defaultValue={editingCurrency.code} />
              </div>
              <div className="space-y-2">
                <Label>Symbol</Label>
                <Input defaultValue={editingCurrency.symbol} />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue={editingCurrency.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingCurrency(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => setEditingCurrency(null)}
                className="bg-gradient-to-r from-coral to-coral-dark text-white"
              >
                Update
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {editingTimezone && (
        <Dialog open={!!editingTimezone} onOpenChange={() => setEditingTimezone(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Timezone</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input defaultValue={editingTimezone.name} />
              </div>
              <div className="space-y-2">
                <Label>Code</Label>
                <Input defaultValue={editingTimezone.code} />
              </div>
              <div className="space-y-2">
                <Label>Region Name</Label>
                <Input defaultValue={editingTimezone.regionName} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Offset Hours</Label>
                  <Input type="number" defaultValue={editingTimezone.offsetHours} />
                </div>
                <div className="space-y-2">
                  <Label>Offset Minutes</Label>
                  <Input type="number" defaultValue={editingTimezone.offsetMinutes} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Offset String</Label>
                <Input defaultValue={editingTimezone.offsetString} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea defaultValue={editingTimezone.description} />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue={editingTimezone.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingTimezone(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => setEditingTimezone(null)}
                className="bg-gradient-to-r from-coral to-coral-dark text-white"
              >
                Update
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {editingRole && (
        <Dialog open={!!editingRole} onOpenChange={() => setEditingRole(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Role</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input defaultValue={editingRole.name} />
              </div>
              <div className="space-y-2">
                <Label>Code</Label>
                <Input defaultValue={editingRole.code} />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue={editingRole.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingRole(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => setEditingRole(null)}
                className="bg-gradient-to-r from-coral to-coral-dark text-white"
              >
                Update
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {editingModule && (
        <Dialog open={!!editingModule} onOpenChange={() => setEditingModule(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Module</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input defaultValue={editingModule.name} />
              </div>
              <div className="space-y-2">
                <Label>Code</Label>
                <Input defaultValue={editingModule.code} />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue={editingModule.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingModule(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => setEditingModule(null)}
                className="bg-gradient-to-r from-coral to-coral-dark text-white"
              >
                Update
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {editingPermission && (
        <Dialog open={!!editingPermission} onOpenChange={() => setEditingPermission(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Permission</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input defaultValue={editingPermission.name} />
              </div>
              <div className="space-y-2">
                <Label>Code</Label>
                <Input defaultValue={editingPermission.code} />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue={editingPermission.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingPermission(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => setEditingPermission(null)}
                className="bg-gradient-to-r from-coral to-coral-dark text-white"
              >
                Update
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {editingDomain && (
        <Dialog open={!!editingDomain} onOpenChange={() => setEditingDomain(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Domain</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input defaultValue={editingDomain.name} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" defaultValue={editingDomain.email} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Phone Code</Label>
                  <Input defaultValue={editingDomain.phoneCode} />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Phone</Label>
                  <Input defaultValue={editingDomain.phone} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue={editingDomain.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingDomain(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => setEditingDomain(null)}
                className="bg-gradient-to-r from-coral to-coral-dark text-white"
              >
                Update
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {showAddLanguage && (
        <Dialog open={showAddLanguage} onOpenChange={setShowAddLanguage}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Language</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input placeholder="Enter language name" />
              </div>
              <div className="space-y-2">
                <Label>Code</Label>
                <Input placeholder="Enter language code (e.g., en, ar)" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddLanguage(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => setShowAddLanguage(false)}
                className="bg-gradient-to-r from-coral to-coral-dark text-white"
              >
                Add Language
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {showAddCurrency && (
        <Dialog open={showAddCurrency} onOpenChange={setShowAddCurrency}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Currency</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input placeholder="Enter currency name" />
              </div>
              <div className="space-y-2">
                <Label>Code</Label>
                <Input placeholder="Enter currency code (e.g., USD, AED)" />
              </div>
              <div className="space-y-2">
                <Label>Symbol</Label>
                <Input placeholder="Enter currency symbol (e.g., $, د.إ)" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddCurrency(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => setShowAddCurrency(false)}
                className="bg-gradient-to-r from-coral to-coral-dark text-white"
              >
                Add Currency
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {showAddTimezone && (
        <Dialog open={showAddTimezone} onOpenChange={setShowAddTimezone}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Timezone</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input placeholder="Enter timezone name (e.g., Asia/Dubai)" />
              </div>
              <div className="space-y-2">
                <Label>Code</Label>
                <Input placeholder="Enter timezone code" />
              </div>
              <div className="space-y-2">
                <Label>Region Name</Label>
                <Input placeholder="Enter region name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Offset Hours</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>Offset Minutes</Label>
                  <Input type="number" placeholder="0" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Offset String</Label>
                <Input placeholder="GMT+04:00" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Enter timezone description" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddTimezone(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => setShowAddTimezone(false)}
                className="bg-gradient-to-r from-coral to-coral-dark text-white"
              >
                Add Timezone
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {showAddRole && (
        <Dialog open={showAddRole} onOpenChange={setShowAddRole}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Role</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input placeholder="Enter role name" />
              </div>
              <div className="space-y-2">
                <Label>Code</Label>
                <Input placeholder="Enter role code (e.g., ADMIN, USER)" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddRole(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => setShowAddRole(false)}
                className="bg-gradient-to-r from-coral to-coral-dark text-white"
              >
                Add Role
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {showAddModule && (
        <Dialog open={showAddModule} onOpenChange={setShowAddModule}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Module</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input placeholder="Enter module name" />
              </div>
              <div className="space-y-2">
                <Label>Code</Label>
                <Input placeholder="Enter module code" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddModule(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => setShowAddModule(false)}
                className="bg-gradient-to-r from-coral to-coral-dark text-white"
              >
                Add Module
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {showAddPermission && (
        <Dialog open={showAddPermission} onOpenChange={setShowAddPermission}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Permission</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input placeholder="Enter permission name" />
              </div>
              <div className="space-y-2">
                <Label>Code</Label>
                <Input placeholder="Enter permission code (e.g., ADD, EDIT, DELETE)" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddPermission(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => setShowAddPermission(false)}
                className="bg-gradient-to-r from-coral to-coral-dark text-white"
              >
                Add Permission
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {showAddDomain && (
        <Dialog open={showAddDomain} onOpenChange={setShowAddDomain}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Domain</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input placeholder="Enter domain name" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="Enter email address" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Phone Code</Label>
                  <Input placeholder="+971" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Phone</Label>
                  <Input placeholder="Enter phone number" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" placeholder="Enter password" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDomain(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => setShowAddDomain(false)}
                className="bg-gradient-to-r from-coral to-coral-dark text-white"
              >
                Add Domain
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
