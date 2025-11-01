"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Building2,
  Users,
  UserCheck,
  Calendar,
  FileText,
  Settings,
  Bell,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  Clock,
  Lock,
  Mail,
} from "lucide-react"
import { MahaLogo } from "@/components/maha-logo"
import { buildingManagerService } from "@/lib/api"

export default function BuildingManagerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const [editingProperty, setEditingProperty] = useState<any>(null)
  const [editingTenant, setEditingTenant] = useState<any>(null)
  const [editingLandlord, setEditingLandlord] = useState<any>(null)
  const [editingVisit, setEditingVisit] = useState<any>(null)
  const [editingVisitPurpose, setEditingVisitPurpose] = useState<any>(null)
  const [editingAmenity, setEditingAmenity] = useState<any>(null)
  const [editingAmenityBooking, setEditingAmenityBooking] = useState<any>(null)
  const [editingHomeService, setEditingHomeService] = useState<any>(null)
  const [editingServiceProduct, setEditingServiceProduct] = useState<any>(null)
  const [editingServiceBooking, setEditingServiceBooking] = useState<any>(null)
  const [editingServiceProvider, setEditingServiceProvider] = useState<any>(null)
  const [editingReport, setEditingReport] = useState<any>(null)
  const [editingReportPriority, setEditingReportPriority] = useState<any>(null)
  const [editingReportCategory, setEditingReportCategory] = useState<any>(null)
  const [editingCommunityPost, setEditingCommunityPost] = useState<any>(null)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false)

  const [properties, setProperties] = useState<any[]>([])
  const [tenants, setTenants] = useState<any[]>([])
  const [landlords, setLandlords] = useState<any[]>([])
  const [visits, setVisits] = useState<any[]>([])
  const [visitPurposes, setVisitPurposes] = useState<any[]>([])
  const [amenities, setAmenities] = useState<any[]>([])
  const [amenityBookings, setAmenityBookings] = useState<any[]>([])
  const [homeServices, setHomeServices] = useState<any[]>([])
  const [serviceProducts, setServiceProducts] = useState<any[]>([])
  const [serviceBookings, setServiceBookings] = useState<any[]>([])
  const [serviceProviders, setServiceProviders] = useState<any[]>([])
  const [reports, setReports] = useState<any[]>([])
  const [reportPriorities, setReportPriorities] = useState<any[]>([])
  const [reportCategories, setReportCategories] = useState<any[]>([])
  const [communityPosts, setCommunityPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Mock data - to be removed once API integration is complete
  // const properties = [
  //   {
  //     id: 1,
  //     nameEn: "Tower A",
  //     nameAr: "برج أ",
  //     location: "Dubai Marina",
  //     area: "1200 sqft",
  //     bedrooms: 2,
  //     floor: 15,
  //     type: "Apartment",
  //   },
  //   {
  //     id: 2,
  //     nameEn: "Villa B",
  //     nameAr: "فيلا ب",
  //     location: "Palm Jumeirah",
  //     area: "3500 sqft",
  //     bedrooms: 4,
  //     floor: 1,
  //     type: "Villa",
  //   },
  // ]

  // const tenants = [
  //   {
  //     id: 1,
  //     name: "Ahmed Al Mansouri",
  //     email: "ahmed@email.com",
  //     phone: "+971 50 123 4567",
  //     unit: "A-101",
  //     property: "Tower A",
  //     status: "Active",
  //   },
  //   {
  //     id: 2,
  //     name: "Sarah Johnson",
  //     email: "sarah@email.com",
  //     phone: "+971 55 987 6543",
  //     unit: "B-205",
  //     property: "Villa B",
  //     status: "Active",
  //   },
  // ]

  // const landlords = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     email: "john.doe@example.com",
  //     phone: "+971 50 987 0543",
  //     properties: 3,
  //     status: "Active",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     email: "jane.smith@example.com",
  //     phone: "+971 55 123 4567",
  //     properties: 2,
  //     status: "Active",
  //   },
  // ]

  // const visits = [
  //   {
  //     id: 1,
  //     visitorName: "Ali Hassan",
  //     purpose: "Delivery",
  //     tenant: "Ahmed Al Mansouri",
  //     unit: "A-101",
  //     date: "2024-01-20",
  //     status: "Pending",
  //   },
  //   {
  //     id: 2,
  //     visitorName: "Sara Ahmed",
  //     purpose: "Guest",
  //     tenant: "Sarah Johnson",
  //     unit: "B-205",
  //     date: "2024-01-21",
  //     status: "Approved",
  //   },
  // ]

  // const visitPurposes = [
  //   { id: 1, nameEn: "Delivery", nameAr: "توصيل", autoApprove: true, status: "Active" },
  //   { id: 2, nameEn: "Guest", nameAr: "ضيف", autoApprove: false, status: "Active" },
  // ]

  // const amenities = [
  //   {
  //     id: 1,
  //     property: "Tower A",
  //     name: "Swimming Pool",
  //     description: "Olympic size pool",
  //     capacity: 50,
  //     price: "Free",
  //     status: "Active",
  //   },
  //   {
  //     id: 2,
  //     property: "Tower A",
  //     name: "Gym",
  //     description: "Fully equipped fitness center",
  //     capacity: 30,
  //     price: "Free",
  //     status: "Active",
  //   },
  // ]

  // const amenityBookings = [
  //   {
  //     id: 1,
  //     amenity: "Swimming Pool",
  //     tenant: "Ahmed Al Mansouri",
  //     date: "2024-01-25",
  //     time: "10:00 AM",
  //     status: "Confirmed",
  //   },
  //   { id: 2, amenity: "Gym", tenant: "Sarah Johnson", date: "2024-01-26", time: "6:00 PM", status: "Pending" },
  // ]

  // const homeServices = [
  //   {
  //     id: 1,
  //     property: "Tower A",
  //     title: "AC Maintenance",
  //     name: "Annual AC Service",
  //     basePrice: "AED 350",
  //     status: "Active",
  //   },
  //   {
  //     id: 2,
  //     property: "Villa B",
  //     title: "Plumbing",
  //     name: "Emergency Plumbing",
  //     basePrice: "AED 200",
  //     status: "Active",
  //   },
  // ]

  // const serviceProducts = [
  //   {
  //     id: 1,
  //     service: "AC Maintenance",
  //     nameEn: "Filter Replacement",
  //     nameAr: "استبدال الفلتر",
  //     price: "AED 50",
  //     status: "Active",
  //   },
  //   { id: 2, service: "Plumbing", nameEn: "Pipe Repair", nameAr: "إصلاح الأنابيب", price: "AED 100", status: "Active" },
  // ]

  // const serviceBookings = [
  //   {
  //     id: 1,
  //     service: "AC Maintenance",
  //     tenant: "Ahmed Al Mansouri",
  //     date: "2024-01-28",
  //     time: "2:00 PM",
  //     status: "Scheduled",
  //   },
  //   { id: 2, service: "Plumbing", tenant: "Sarah Johnson", date: "2024-01-29", time: "10:00 AM", status: "Completed" },
  // ]

  // const serviceProviders = [
  //   {
  //     id: 1,
  //     serviceType: "AC Maintenance",
  //     nameEn: "Cool Tech",
  //     nameAr: "كول تك",
  //     email: "info@cooltech.ae",
  //     phone: "+971 4 123 4567",
  //     status: "Active",
  //   },
  //   {
  //     id: 2,
  //     serviceType: "Plumbing",
  //     nameEn: "Fix It Pro",
  //     nameAr: "فيكس إت برو",
  //     email: "service@fixitpro.ae",
  //     phone: "+971 4 987 6543",
  //     status: "Active",
  //   },
  // ]

  // const reports = [
  //   {
  //     id: 1,
  //     title: "Broken Elevator",
  //     category: "Maintenance",
  //     priority: "High",
  //     tenant: "Ahmed Al Mansouri",
  //     status: "Open",
  //     date: "2024-01-20",
  //   },
  //   {
  //     id: 2,
  //     title: "Noise Complaint",
  //     category: "Complaint",
  //     priority: "Medium",
  //     tenant: "Sarah Johnson",
  //     status: "In Progress",
  //     date: "2024-01-21",
  //   },
  // ]

  // const reportPriorities = [
  //   { id: 1, name: "High Priority", status: "Active" },
  //   { id: 2, name: "Medium Priority", status: "Active" },
  //   { id: 3, name: "Low Priority", status: "Active" },
  // ]

  // const reportCategories = [
  //   { id: 1, name: "Maintenance", status: "Active" },
  //   { id: 2, name: "Complaint", status: "Active" },
  //   { id: 3, name: "Emergency", status: "Active" },
  // ]

  // const communityPosts = [
  //   {
  //     id: 1,
  //     title: "Community BBQ Event",
  //     type: "Event",
  //     description: "Join us for a community BBQ this Saturday!",
  //     author: "Building Manager",
  //     date: "2024-01-20",
  //     status: "Published",
  //   },
  //   {
  //     id: 2,
  //     title: "Pool Maintenance Notice",
  //     type: "Announcement",
  //     description: "Pool will be closed for maintenance on Jan 25",
  //     author: "Building Manager",
  //     date: "2024-01-21",
  //     status: "Published",
  //   },
  // ]

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      console.log("[v0] Loading Building Manager data from API...")

      const [
        propertiesData,
        tenantsData,
        landlordsData,
        visitsData,
        visitPurposesData,
        amenitiesData,
        amenityBookingsData,
        homeServicesData,
        serviceProductsData,
        serviceBookingsData,
        serviceProvidersData,
        reportsData,
        reportPrioritiesData,
        reportCategoriesData,
        communityPostsData,
      ] = await Promise.all([
        buildingManagerService.getProperties(),
        buildingManagerService.getTenants(),
        buildingManagerService.getLandlords(),
        buildingManagerService.getVisits(),
        buildingManagerService.getVisitPurposes(),
        buildingManagerService.getAmenities(),
        buildingManagerService.getAmenityBookings(),
        buildingManagerService.getHomeServices(),
        buildingManagerService.getServiceProducts(),
        buildingManagerService.getServiceBookings(),
        buildingManagerService.getServiceProviders(),
        buildingManagerService.getReports(),
        buildingManagerService.getReportPriorities(),
        buildingManagerService.getReportCategories(),
        buildingManagerService.getCommunityWall(),
      ])

      setProperties(propertiesData)
      setTenants(tenantsData)
      setLandlords(landlordsData)
      setVisits(visitsData)
      setVisitPurposes(visitPurposesData)
      setAmenities(amenitiesData)
      setAmenityBookings(amenityBookingsData)
      setHomeServices(homeServicesData)
      setServiceProducts(serviceProductsData)
      setServiceBookings(serviceBookingsData)
      setServiceProviders(serviceProvidersData)
      setReports(reportsData)
      setReportPriorities(reportPrioritiesData)
      setReportCategories(reportCategoriesData)
      setCommunityPosts(communityPostsData)

      console.log("[v0] Data loaded successfully")
    } catch (err: any) {
      console.error("[v0] Error loading data:", err)
      setError(err.message || "Failed to load data")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddProperty = async (data: any) => {
    try {
      await buildingManagerService.addProperty(data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleEditProperty = async (id: number, data: any) => {
    try {
      await buildingManagerService.editProperty(id, data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeleteProperty = async (id: number) => {
    try {
      await buildingManagerService.removeProperty(id)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleAddTenant = async (data: any) => {
    try {
      await buildingManagerService.addTenant(data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleEditTenant = async (id: number, data: any) => {
    try {
      await buildingManagerService.editTenant(id, data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeleteTenant = async (id: number) => {
    try {
      await buildingManagerService.removeTenant(id)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleAddLandlord = async (data: any) => {
    try {
      await buildingManagerService.addLandlord(data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleEditLandlord = async (id: number, data: any) => {
    try {
      await buildingManagerService.editLandlord(id, data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeleteLandlord = async (id: number) => {
    try {
      await buildingManagerService.removeLandlord(id)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleAddVisit = async (data: any) => {
    try {
      await buildingManagerService.addVisit(data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleEditVisit = async (id: number, data: any) => {
    try {
      await buildingManagerService.editVisit(id, data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleAddVisitPurpose = async (data: any) => {
    try {
      await buildingManagerService.addVisitPurpose(data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleEditVisitPurpose = async (id: number, data: any) => {
    try {
      await buildingManagerService.editVisitPurpose(id, data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeleteVisitPurpose = async (id: number) => {
    try {
      await buildingManagerService.removeVisitPurpose(id)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleAddAmenity = async (data: any) => {
    try {
      await buildingManagerService.addAmenity(data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleEditAmenity = async (id: number, data: any) => {
    try {
      await buildingManagerService.editAmenity(id, data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeleteAmenity = async (id: number) => {
    try {
      await buildingManagerService.removeAmenity(id)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleAddAmenityBooking = async (data: any) => {
    try {
      await buildingManagerService.addAmenityBooking(data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleEditAmenityBooking = async (id: number, data: any) => {
    try {
      await buildingManagerService.editAmenityBooking(id, data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeleteAmenityBooking = async (id: number) => {
    try {
      await buildingManagerService.removeAmenityBooking(id)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleAddHomeService = async (data: any) => {
    try {
      await buildingManagerService.addHomeService(data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleEditHomeService = async (id: number, data: any) => {
    try {
      await buildingManagerService.editHomeService(id, data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeleteHomeService = async (id: number) => {
    try {
      await buildingManagerService.removeHomeService(id)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleAddServiceProduct = async (data: any) => {
    try {
      await buildingManagerService.addServiceProduct(data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleEditServiceProduct = async (id: number, data: any) => {
    try {
      await buildingManagerService.editServiceProduct(id, data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeleteServiceProduct = async (id: number) => {
    try {
      await buildingManagerService.removeServiceProduct(id)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleAddServiceBooking = async (data: any) => {
    try {
      await buildingManagerService.addServiceBooking(data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleEditServiceBooking = async (id: number, data: any) => {
    try {
      await buildingManagerService.editServiceBooking(id, data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeleteServiceBooking = async (id: number) => {
    try {
      await buildingManagerService.removeServiceBooking(id)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleAddServiceProvider = async (data: any) => {
    try {
      await buildingManagerService.addServiceProvider(data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleEditServiceProvider = async (id: number, data: any) => {
    try {
      await buildingManagerService.editServiceProvider(id, data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeleteServiceProvider = async (id: number) => {
    try {
      await buildingManagerService.removeServiceProvider(id)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleAddReport = async (data: any) => {
    try {
      await buildingManagerService.addReport(data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleEditReport = async (id: number, data: any) => {
    try {
      await buildingManagerService.editReport(id, data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeleteReport = async (id: number) => {
    try {
      await buildingManagerService.removeReport(id)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleAddReportPriority = async (data: any) => {
    try {
      await buildingManagerService.addReportPriority(data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleEditReportPriority = async (id: number, data: any) => {
    try {
      await buildingManagerService.editReportPriority(id, data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeleteReportPriority = async (id: number) => {
    try {
      await buildingManagerService.removeReportPriority(id)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleAddReportCategory = async (data: any) => {
    try {
      await buildingManagerService.addReportCategory(data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleEditReportCategory = async (id: number, data: any) => {
    try {
      await buildingManagerService.editReportCategory(id, data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeleteReportCategory = async (id: number) => {
    try {
      await buildingManagerService.removeReportCategory(id)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleAddCommunityPost = async (data: any) => {
    try {
      await buildingManagerService.addCommunityPost(data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleEditCommunityPost = async (id: number, data: any) => {
    try {
      await buildingManagerService.editCommunityPost(id, data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeleteCommunityPost = async (id: number) => {
    try {
      await buildingManagerService.removeCommunityPost(id)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "approved":
      case "confirmed":
      case "completed":
      case "published":
        return "bg-green-100 text-green-800"
      case "pending":
      case "scheduled":
        return "bg-yellow-100 text-yellow-800"
      case "in progress":
      case "open":
        return "bg-blue-100 text-blue-800"
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
                <h1 className="text-xl font-bold text-teal font-serif">Building Manager Portal</h1>
                <p className="text-xs text-teal/60">Manage properties, tenants, and services</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5 text-teal" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-coral rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setActiveTab("settings")}>
                <Settings className="h-5 w-5 text-teal" />
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar className="ring-2 ring-gold/20">
                  <AvatarFallback className="bg-gradient-to-br from-teal to-teal-dark text-white">BM</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-teal">Building Manager</p>
                  <p className="text-xs text-teal/60">manager@mahaone.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-teal/70">Total Properties</p>
                  <p className="text-2xl font-bold text-teal">{properties.length}</p>
                  {/* <p className="text-xs text-emerald-600">+2 this month</p> */}
                </div>
                <div className="p-3 rounded-xl bg-teal/10">
                  <Building2 className="h-6 w-6 text-teal" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-teal/70">Active Tenants</p>
                  <p className="text-2xl font-bold text-teal">{tenants.length}</p>
                  {/* <p className="text-xs text-emerald-600">+12 this month</p> */}
                </div>
                <div className="p-3 rounded-xl bg-gold/10">
                  <Users className="h-6 w-6 text-gold" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-teal/70">Pending Requests</p>
                  <p className="text-2xl font-bold text-teal">8</p>
                  <p className="text-xs text-coral">2 urgent</p>
                </div>
                <div className="p-3 rounded-xl bg-coral/10">
                  <Clock className="h-6 w-6 text-coral" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-teal/70">Revenue</p>
                  <p className="text-2xl font-bold text-teal">AED 245K</p>
                  <p className="text-xs text-emerald-600">+15% vs last month</p>
                </div>
                <div className="p-3 rounded-xl bg-stone/10">
                  <TrendingUp className="h-6 w-6 text-stone" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 shadow-sm">
            <TabsList className="inline-flex w-full overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-stone/30 scrollbar-track-transparent">
              <TabsTrigger value="overview" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="properties" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                Properties
              </TabsTrigger>
              <TabsTrigger value="tenants" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                Tenants
              </TabsTrigger>
              <TabsTrigger value="landlords" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                Landlords
              </TabsTrigger>
              <TabsTrigger value="visits" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                Visits
              </TabsTrigger>
              <TabsTrigger
                value="visit-purposes"
                className="data-[state=active]:bg-teal data-[state=active]:text-white"
              >
                Visit Purposes
              </TabsTrigger>
              <TabsTrigger value="amenities" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                Amenities
              </TabsTrigger>
              <TabsTrigger
                value="amenity-bookings"
                className="data-[state=active]:bg-teal data-[state=active]:text-white"
              >
                Amenity Bookings
              </TabsTrigger>
              <TabsTrigger value="home-services" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                Home Services
              </TabsTrigger>
              <TabsTrigger
                value="service-products"
                className="data-[state=active]:bg-teal data-[state=active]:text-white"
              >
                Service Products
              </TabsTrigger>
              <TabsTrigger
                value="service-bookings"
                className="data-[state=active]:bg-teal data-[state=active]:text-white"
              >
                Service Bookings
              </TabsTrigger>
              <TabsTrigger
                value="service-providers"
                className="data-[state=active]:bg-teal data-[state=active]:text-white"
              >
                Service Providers
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                Reports
              </TabsTrigger>
              <TabsTrigger
                value="report-priorities"
                className="data-[state=active]:bg-teal data-[state=active]:text-white"
              >
                Report Priorities
              </TabsTrigger>
              <TabsTrigger
                value="report-categories"
                className="data-[state=active]:bg-teal data-[state=active]:text-white"
              >
                Report Categories
              </TabsTrigger>
              <TabsTrigger
                value="community-wall"
                className="data-[state=active]:bg-teal data-[state=active]:text-white"
              >
                Community Wall
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                Settings
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-teal font-serif">Recent Activities</CardTitle>
                  <CardDescription>Latest updates across all properties</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-stone/5">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-teal">New tenant registered</p>
                        <p className="text-xs text-teal/60">Tower A, Unit 1205</p>
                        <p className="text-xs text-teal/40">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-stone/5">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-teal">Maintenance request completed</p>
                        <p className="text-xs text-teal/60">Tower B, Unit 804</p>
                        <p className="text-xs text-teal/40">5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-stone/5">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-teal">Amenity booking confirmed</p>
                        <p className="text-xs text-teal/60">Pool Area</p>
                        <p className="text-xs text-teal/40">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-teal font-serif">Quick Actions</CardTitle>
                  <CardDescription>Common management tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={() => setActiveTab("properties")}
                      className="h-24 flex-col space-y-2 bg-gradient-to-br from-teal/10 to-teal/20 text-teal hover:from-teal/20 hover:to-teal/30 border-0"
                    >
                      <Plus className="h-6 w-6" />
                      <span className="text-sm">Add Property</span>
                    </Button>
                    <Button
                      onClick={() => setActiveTab("tenants")}
                      className="h-24 flex-col space-y-2 bg-gradient-to-br from-gold/10 to-gold/20 text-gold hover:from-gold/20 hover:to-gold/30 border-0"
                    >
                      <UserCheck className="h-6 w-6" />
                      <span className="text-sm">Add Tenant</span>
                    </Button>
                    <Button
                      onClick={() => setActiveTab("amenity-bookings")}
                      className="h-24 flex-col space-y-2 bg-gradient-to-br from-coral/10 to-coral/20 text-coral hover:from-coral/20 hover:to-coral/30 border-0"
                    >
                      <Calendar className="h-6 w-6" />
                      <span className="text-sm">View Bookings</span>
                    </Button>
                    <Button
                      onClick={() => setActiveTab("reports")}
                      className="h-24 flex-col space-y-2 bg-gradient-to-br from-stone/10 to-stone/20 text-stone hover:from-stone/20 hover:to-stone/30 border-0"
                    >
                      <FileText className="h-6 w-6" />
                      <span className="text-sm">Generate Report</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-teal font-serif">Property Management</h2>
                <p className="text-teal/60">Manage all properties in your portfolio</p>
              </div>
              <Button
                className="bg-gradient-to-r from-teal to-teal-dark text-white"
                onClick={() => handleAddProperty({})}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name (EN)</TableHead>
                      <TableHead>Name (AR)</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead>Bedrooms</TableHead>
                      <TableHead>Floor</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {properties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="font-medium">{property.nameEn}</TableCell>
                        <TableCell>{property.nameAr}</TableCell>
                        <TableCell>{property.location}</TableCell>
                        <TableCell>{property.area}</TableCell>
                        <TableCell>{property.bedrooms}</TableCell>
                        <TableCell>{property.floor}</TableCell>
                        <TableCell>{property.type}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => setEditingProperty(property)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteProperty(property.id)}>
                              <Trash2 className="h-4 w-4 text-coral" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tenants Tab */}
          <TabsContent value="tenants" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-teal font-serif">Tenant Management</h2>
                <p className="text-teal/60">Manage tenant information and leases</p>
              </div>
              <Button
                className="bg-gradient-to-r from-teal to-teal-dark text-white"
                onClick={() => handleAddTenant({})}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Tenant
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
                      <TableHead>Unit</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tenants.map((tenant) => (
                      <TableRow key={tenant.id}>
                        <TableCell className="font-medium">{tenant.name}</TableCell>
                        <TableCell>{tenant.email}</TableCell>
                        <TableCell>{tenant.phone}</TableCell>
                        <TableCell>{tenant.unit}</TableCell>
                        <TableCell>{tenant.property}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(tenant.status)}>{tenant.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => setEditingTenant(tenant)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteTenant(tenant.id)}>
                              <Trash2 className="h-4 w-4 text-coral" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Landlords Tab */}
          <TabsContent value="landlords" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-teal font-serif">Landlord Management</h2>
                <p className="text-teal/60">Manage property owners and their portfolios</p>
              </div>
              <Button
                className="bg-gradient-to-r from-teal to-teal-dark text-white"
                onClick={() => handleAddLandlord({})}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Landlord
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
                      <TableHead>Properties</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {landlords.map((landlord) => (
                      <TableRow key={landlord.id}>
                        <TableCell className="font-medium">{landlord.name}</TableCell>
                        <TableCell>{landlord.email}</TableCell>
                        <TableCell>{landlord.phone}</TableCell>
                        <TableCell>{landlord.properties} Properties</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(landlord.status)}>{landlord.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => setEditingLandlord(landlord)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteLandlord(landlord.id)}>
                              <Trash2 className="h-4 w-4 text-coral" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visits Tab */}
          <TabsContent value="visits" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-teal font-serif">Visit Management</h2>
                <p className="text-teal/60">Manage visitor requests and approvals</p>
              </div>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Visitor Name</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visits.map((visit) => (
                      <TableRow key={visit.id}>
                        <TableCell className="font-medium">{visit.visitorName}</TableCell>
                        <TableCell>{visit.purpose}</TableCell>
                        <TableCell>{visit.tenant}</TableCell>
                        <TableCell>{visit.unit}</TableCell>
                        <TableCell>{visit.date}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(visit.status)}>{visit.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => setEditingVisit(visit)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            {/* <Button size="sm" variant="ghost" onClick={() => handleDeleteVisit(visit.id)}>
                              <Trash2 className="h-4 w-4 text-coral" />
                            </Button> */}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visit Purposes Tab */}
          <TabsContent value="visit-purposes" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-teal font-serif">Visit Purpose Management</h2>
                <p className="text-teal/60">Manage visit purpose types</p>
              </div>
              <Button
                className="bg-gradient-to-r from-teal to-teal-dark text-white"
                onClick={() => handleAddVisitPurpose({})}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Visit Purpose
              </Button>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name (EN)</TableHead>
                      <TableHead>Name (AR)</TableHead>
                      <TableHead>Auto Approve</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visitPurposes.map((purpose) => (
                      <TableRow key={purpose.id}>
                        <TableCell className="font-medium">{purpose.nameEn}</TableCell>
                        <TableCell>{purpose.nameAr}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              purpose.autoApprove ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }
                          >
                            {purpose.autoApprove ? "Yes" : "No"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(purpose.status)}>{purpose.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => setEditingVisitPurpose(purpose)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteVisitPurpose(purpose.id)}>
                              <Trash2 className="h-4 w-4 text-coral" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Amenities Tab */}
          <TabsContent value="amenities" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-teal font-serif">Amenity Management</h2>
                <p className="text-teal/60">Manage property amenities and facilities</p>
              </div>
              <Button
                className="bg-gradient-to-r from-teal to-teal-dark text-white"
                onClick={() => handleAddAmenity({})}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Amenity
              </Button>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {amenities.map((amenity) => (
                      <TableRow key={amenity.id}>
                        <TableCell className="font-medium">{amenity.property}</TableCell>
                        <TableCell>{amenity.name}</TableCell>
                        <TableCell>{amenity.description}</TableCell>
                        <TableCell>{amenity.capacity}</TableCell>
                        <TableCell>{amenity.price}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(amenity.status)}>{amenity.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => setEditingAmenity(amenity)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteAmenity(amenity.id)}>
                              <Trash2 className="h-4 w-4 text-coral" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Amenity Bookings Tab */}
          <TabsContent value="amenity-bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-teal font-serif">Amenity Booking Management</h2>
                <p className="text-teal/60">Manage amenity reservations</p>
              </div>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Amenity</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {amenityBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.amenity}</TableCell>
                        <TableCell>{booking.tenant}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>{booking.time}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => setEditingAmenityBooking(booking)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteAmenityBooking(booking.id)}>
                              <Trash2 className="h-4 w-4 text-coral" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Home Services Tab */}
          <TabsContent value="home-services" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-teal font-serif">Home Service Management</h2>
                <p className="text-teal/60">Manage available home services</p>
              </div>
              <Button
                className="bg-gradient-to-r from-teal to-teal-dark text-white"
                onClick={() => handleAddHomeService({})}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Home Service
              </Button>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Base Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {homeServices.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{service.property}</TableCell>
                        <TableCell>{service.title}</TableCell>
                        <TableCell>{service.name}</TableCell>
                        <TableCell>{service.basePrice}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => setEditingHomeService(service)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteHomeService(service.id)}>
                              <Trash2 className="h-4 w-4 text-coral" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Service Products Tab */}
          <TabsContent value="service-products" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-teal font-serif">Home Service Product Management</h2>
                <p className="text-teal/60">Manage service products and add-ons</p>
              </div>
              <Button
                className="bg-gradient-to-r from-teal to-teal-dark text-white"
                onClick={() => handleAddServiceProduct({})}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Service Product
              </Button>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Name (EN)</TableHead>
                      <TableHead>Name (AR)</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {serviceProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.service}</TableCell>
                        <TableCell>{product.nameEn}</TableCell>
                        <TableCell>{product.nameAr}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => setEditingServiceProduct(product)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteServiceProduct(product.id)}>
                              <Trash2 className="h-4 w-4 text-coral" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Service Bookings Tab */}
          <TabsContent value="service-bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-teal font-serif">Service Booking Management</h2>
                <p className="text-teal/60">Manage home service bookings</p>
              </div>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {serviceBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.service}</TableCell>
                        <TableCell>{booking.tenant}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>{booking.time}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => setEditingServiceBooking(booking)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteServiceBooking(booking.id)}>
                              <Trash2 className="h-4 w-4 text-coral" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Service Providers Tab */}
          <TabsContent value="service-providers" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-teal font-serif">Service Provider Management</h2>
                <p className="text-teal/60">Manage service provider vendors</p>
              </div>
              <Button
                className="bg-gradient-to-r from-teal to-teal-dark text-white"
                onClick={() => handleAddServiceProvider({})}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Service Provider
              </Button>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service Type</TableHead>
                      <TableHead>Name (EN)</TableHead>
                      <TableHead>Name (AR)</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {serviceProviders.map((provider) => (
                      <TableRow key={provider.id}>
                        <TableCell className="font-medium">{provider.serviceType}</TableCell>
                        <TableCell>{provider.nameEn}</TableCell>
                        <TableCell>{provider.nameAr}</TableCell>
                        <TableCell>{provider.email}</TableCell>
                        <TableCell>{provider.phone}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(provider.status)}>{provider.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => setEditingServiceProvider(provider)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteServiceProvider(provider.id)}>
                              <Trash2 className="h-4 w-4 text-coral" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-teal font-serif">Report Management</h2>
                <p className="text-teal/60">Manage tenant reports and issues</p>
              </div>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.title}</TableCell>
                        <TableCell>{report.category}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              report.priority === "High" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {report.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{report.tenant}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => setEditingReport(report)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteReport(report.id)}>
                              <Trash2 className="h-4 w-4 text-coral" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Report Priorities Tab */}
          <TabsContent value="report-priorities" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-teal font-serif">Report Priority Management</h2>
                <p className="text-teal/60">Manage report priority levels</p>
              </div>
              <Button
                className="bg-gradient-to-r from-teal to-teal-dark text-white"
                onClick={() => handleAddReportPriority({})}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Priority
              </Button>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Priority Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportPriorities.map((priority) => (
                      <TableRow key={priority.id}>
                        <TableCell className="font-medium">{priority.name}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(priority.status)}>{priority.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => setEditingReportPriority(priority)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteReportPriority(priority.id)}>
                              <Trash2 className="h-4 w-4 text-coral" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Report Categories Tab */}
          <TabsContent value="report-categories" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-teal font-serif">Report Category Management</h2>
                <p className="text-teal/60">Manage report category types</p>
              </div>
              <Button
                className="bg-gradient-to-r from-teal to-teal-dark text-white"
                onClick={() => handleAddReportCategory({})}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(category.status)}>{category.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => setEditingReportCategory(category)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteReportCategory(category.id)}>
                              <Trash2 className="h-4 w-4 text-coral" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Wall Tab */}
          <TabsContent value="community-wall" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-teal font-serif">Community Wall Management</h2>
                <p className="text-teal/60">Manage community posts and announcements</p>
              </div>
              <Button
                className="bg-gradient-to-r from-teal to-teal-dark text-white"
                onClick={() => handleAddCommunityPost({})}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Post
              </Button>
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {communityPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>{post.type}</TableCell>
                        <TableCell className="max-w-xs truncate">{post.description}</TableCell>
                        <TableCell>{post.author}</TableCell>
                        <TableCell>{post.date}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(post.status)}>{post.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => setEditingCommunityPost(post)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteCommunityPost(post.id)}>
                              <Trash2 className="h-4 w-4 text-coral" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-teal font-serif mb-2">Settings</h2>
              <p className="text-teal/60">Manage your account and preferences</p>
            </div>

            <div className="grid gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-teal font-serif">Profile Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="Building Manager" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="manager@mahaone.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+971 50 123 4567" />
                  </div>
                  <Button className="bg-gradient-to-r from-teal to-teal-dark text-white">Save Changes</Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-teal font-serif">Password & Security</CardTitle>
                  <CardDescription>Manage your password and security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => setShowPasswordDialog(true)}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => setShowResetPasswordDialog(true)}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Reset Password via Email
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-teal font-serif">Notification Preferences</CardTitle>
                  <CardDescription>Choose what notifications you want to receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-teal">Email Notifications</p>
                      <p className="text-sm text-teal/60">Receive email updates</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-teal">SMS Notifications</p>
                      <p className="text-sm text-teal/60">Receive SMS alerts</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-teal">Push Notifications</p>
                      <p className="text-sm text-teal/60">Receive push notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Property Edit Dialog */}
      <Dialog open={!!editingProperty} onOpenChange={() => setEditingProperty(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name (English)</Label>
              <Input defaultValue={editingProperty?.nameEn} />
            </div>
            <div className="space-y-2">
              <Label>Name (Arabic)</Label>
              <Input defaultValue={editingProperty?.nameAr} />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input defaultValue={editingProperty?.location} />
            </div>
            <div className="space-y-2">
              <Label>Area</Label>
              <Input defaultValue={editingProperty?.area} />
            </div>
            <div className="space-y-2">
              <Label>Bedrooms</Label>
              <Input type="number" defaultValue={editingProperty?.bedrooms} />
            </div>
            <div className="space-y-2">
              <Label>Floor</Label>
              <Input type="number" defaultValue={editingProperty?.floor} />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Type</Label>
              <Select defaultValue={editingProperty?.type}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Apartment">Apartment</SelectItem>
                  <SelectItem value="Villa">Villa</SelectItem>
                  <SelectItem value="Townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingProperty(null)}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-teal to-teal-dark text-white"
              onClick={() => handleEditProperty(editingProperty.id, {})}
            >
              Update Property
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Visit Purpose Edit Dialog */}
      <Dialog open={!!editingVisitPurpose} onOpenChange={() => setEditingVisitPurpose(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Visit Purpose</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name (English)</Label>
              <Input defaultValue={editingVisitPurpose?.nameEn} />
            </div>
            <div className="space-y-2">
              <Label>Name (Arabic)</Label>
              <Input defaultValue={editingVisitPurpose?.nameAr} />
            </div>
            <div className="flex items-center space-x-2">
              <Switch defaultChecked={editingVisitPurpose?.autoApprove} />
              <Label>Auto Approve</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingVisitPurpose(null)}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-teal to-teal-dark text-white"
              onClick={() => handleEditVisitPurpose(editingVisitPurpose.id, {})}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Amenity Edit Dialog */}
      <Dialog open={!!editingAmenity} onOpenChange={() => setEditingAmenity(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Amenity</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Property</Label>
              <Select defaultValue={editingAmenity?.property}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tower A">Tower A</SelectItem>
                  <SelectItem value="Villa B">Villa B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Name</Label>
              <Input defaultValue={editingAmenity?.name} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea defaultValue={editingAmenity?.description} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Capacity</Label>
                <Input type="number" defaultValue={editingAmenity?.capacity} />
              </div>
              <div className="space-y-2">
                <Label>Price</Label>
                <Input defaultValue={editingAmenity?.price} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingAmenity(null)}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-teal to-teal-dark text-white"
              onClick={() => handleEditAmenity(editingAmenity.id, {})}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Home Service Edit Dialog */}
      <Dialog open={!!editingHomeService} onOpenChange={() => setEditingHomeService(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Home Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Property</Label>
              <Select defaultValue={editingHomeService?.property}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tower A">Tower A</SelectItem>
                  <SelectItem value="Villa B">Villa B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input defaultValue={editingHomeService?.title} />
            </div>
            <div className="space-y-2">
              <Label>Name</Label>
              <Input defaultValue={editingHomeService?.name} />
            </div>
            <div className="space-y-2">
              <Label>Base Price</Label>
              <Input defaultValue={editingHomeService?.basePrice} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingHomeService(null)}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-teal to-teal-dark text-white"
              onClick={() => handleEditHomeService(editingHomeService.id, {})}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Service Product Edit Dialog */}
      <Dialog open={!!editingServiceProduct} onOpenChange={() => setEditingServiceProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Service</Label>
              <Select defaultValue={editingServiceProduct?.service}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AC Maintenance">AC Maintenance</SelectItem>
                  <SelectItem value="Plumbing">Plumbing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Name (English)</Label>
              <Input defaultValue={editingServiceProduct?.nameEn} />
            </div>
            <div className="space-y-2">
              <Label>Name (Arabic)</Label>
              <Input defaultValue={editingServiceProduct?.nameAr} />
            </div>
            <div className="space-y-2">
              <Label>Price</Label>
              <Input defaultValue={editingServiceProduct?.price} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingServiceProduct(null)}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-teal to-teal-dark text-white"
              onClick={() => handleEditServiceProduct(editingServiceProduct.id, {})}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Service Provider Edit Dialog */}
      <Dialog open={!!editingServiceProvider} onOpenChange={() => setEditingServiceProvider(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service Provider</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Service Type</Label>
              <Select defaultValue={editingServiceProvider?.serviceType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AC Maintenance">AC Maintenance</SelectItem>
                  <SelectItem value="Plumbing">Plumbing</SelectItem>
                  <SelectItem value="Electrical">Electrical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name (English)</Label>
                <Input defaultValue={editingServiceProvider?.nameEn} />
              </div>
              <div className="space-y-2">
                <Label>Name (Arabic)</Label>
                <Input defaultValue={editingServiceProvider?.nameAr} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" defaultValue={editingServiceProvider?.email} />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input defaultValue={editingServiceProvider?.phone} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingServiceProvider(null)}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-teal to-teal-dark text-white"
              onClick={() => handleEditServiceProvider(editingServiceProvider.id, {})}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Priority Edit Dialog */}
      <Dialog open={!!editingReportPriority} onOpenChange={() => setEditingReportPriority(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Report Priority</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Priority Name</Label>
              <Input defaultValue={editingReportPriority?.name} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select defaultValue={editingReportPriority?.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingReportPriority(null)}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-teal to-teal-dark text-white"
              onClick={() => handleEditReportPriority(editingReportPriority.id, {})}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Category Edit Dialog */}
      <Dialog open={!!editingReportCategory} onOpenChange={() => setEditingReportCategory(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Report Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Category Name</Label>
              <Input defaultValue={editingReportCategory?.name} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select defaultValue={editingReportCategory?.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingReportCategory(null)}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-teal to-teal-dark text-white"
              onClick={() => handleEditReportCategory(editingReportCategory.id, {})}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Community Post Edit Dialog */}
      <Dialog open={!!editingCommunityPost} onOpenChange={() => setEditingCommunityPost(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Community Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input defaultValue={editingCommunityPost?.title} />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select defaultValue={editingCommunityPost?.type}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Event">Event</SelectItem>
                  <SelectItem value="Announcement">Announcement</SelectItem>
                  <SelectItem value="News">News</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea defaultValue={editingCommunityPost?.description} rows={4} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingCommunityPost(null)}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-teal to-teal-dark text-white"
              onClick={() => handleEditCommunityPost(editingCommunityPost.id, {})}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input type="password" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-teal to-teal-dark text-white">Change Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={showResetPasswordDialog} onOpenChange={setShowResetPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-teal/70">A password reset link will be sent to your registered email address.</p>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input type="email" defaultValue="manager@mahaone.com" disabled />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResetPasswordDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-teal to-teal-dark text-white">Send Reset Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal"></div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-coral/10 border border-coral/30">
          <p className="text-sm text-coral text-center">{error}</p>
        </div>
      )}
    </div>
  )
}
