"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
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
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { MahaLogo } from "@/components/maha-logo"
// The export exists in lib/api/super-admin.service.ts but isn't being recognized
// import { superAdminService } from "@/lib/api/super-admin.service"
import { domainHomeService, type DomainHomeStats, type Amenity, type FinanceStats } from "@/lib/api"

// All the data from previous implementation plus new comprehensive data
const systemStats = [
  {
    title: "Total Properties",
    value: "45",
    change: "+5 this month",
    trend: "up",
    icon: Building,
    color: "text-[#1C3F3A]", // Deep Teal
    bgColor: "bg-[#F5F3E7]", // Soft Cream
  },
  {
    title: "Building Managers",
    value: "12",
    change: "2 pending approval",
    trend: "neutral",
    icon: Settings,
    color: "text-[#D4745E]", // Terracotta
    bgColor: "bg-[#F5F3E7]", // Soft Cream
  },
  {
    title: "Total Users",
    value: "1,247",
    change: "+89 this month",
    trend: "up",
    icon: Users,
    color: "text-[#1C3F3A]", // Deep Teal
    bgColor: "bg-[#F5F3E7]", // Soft Cream
  },
  {
    title: "System Health",
    value: "99.8%",
    change: "All systems operational",
    trend: "excellent",
    icon: Activity,
    color: "text-[#D4745E]", // Terracotta
    bgColor: "bg-[#F5F3E7]", // Soft Cream
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
  const [searchTerm, setSearchTerm] = useState("") // Changed from searchQuery to searchTerm
  const [showAddManagerModal, setShowAddManagerModal] = useState(false)
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false)
  const [selectedServiceCategory, setSelectedServiceCategory] = useState("all")
  const [error, setError] = useState<string | null>(null) // Declare setError

  // Initialize state variables with actual types from API response
  const [languages, setLanguages] = useState<any[]>([])
  const [currencies, setCurrencies] = useState<any[]>([])
  const [timezones, setTimezones] = useState<any[]>([])
  const [roles, setRoles] = useState<any[]>([])
  const [modules, setModules] = useState<any[]>([])
  const [permissions, setPermissions] = useState<any[]>([])
  const [domains, setDomains] = useState<any[]>([])
  const [countries, setCountries] = useState<any[]>([])
  const [cities, setCities] = useState<any[]>([])
  const [areas, setAreas] = useState<any[]>([])
  const [propertyTypes, setPropertyTypes] = useState<any[]>([])

  const [homeStats, setHomeStats] = useState<DomainHomeStats | null>(null)
  const [amenities, setAmenities] = useState<Amenity[]>([])
  const [financeStats, setFinanceStats] = useState<FinanceStats | null>(null)
  const [isLoading, setIsLoading] = useState(true) // Changed from false to true

  const [activeDomainTab, setActiveDomainTab] = useState("languages")
  const [showAddDomainModal, setShowAddDomainModal] = useState(false)
  const [showEditDomainModal, setShowEditDomainModal] = useState(false)
  const [selectedDomainItem, setSelectedDomainItem] = useState<any>(null)
  const [domainFormData, setDomainFormData] = useState<any>({})

  useEffect(() => {
    const fetchDomainData = async () => {
      try {
        setIsLoading(true)
        const [stats, amenityList, finance] = await Promise.all([
          domainHomeService.getHomeStats(),
          domainHomeService.getAmenityList({ limit: 50 }),
          domainHomeService.getFinanceStats(),
        ])

        setHomeStats(stats)
        setAmenities(amenityList.rows)
        setFinanceStats(finance)
      } catch (error) {
        console.error("[v0] Error fetching domain data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDomainData()
  }, [])

  const systemStats = homeStats
    ? [
        {
          title: "Total Properties",
          value: homeStats.totalProperties.count.toString(),
          change: `+${homeStats.totalProperties.thisMonth} this month`,
          trend: homeStats.totalProperties.thisMonth > 0 ? "up" : "neutral",
          icon: Building,
          color: "text-[#1C3F3A]",
          bgColor: "bg-[#F5F3E7]",
        },
        {
          title: "Building Managers",
          value: homeStats.totalBuildingManager.toString(),
          change: "Active managers",
          trend: "neutral",
          icon: Settings,
          color: "text-[#D4745E]",
          bgColor: "bg-[#F5F3E7]",
        },
        {
          title: "Total Users",
          value: homeStats.totalUsers.toString(),
          change: "Registered users",
          trend: "up",
          icon: Users,
          color: "text-[#1C3F3A]",
          bgColor: "bg-[#F5F3E7]",
        },
        {
          title: "System Health",
          value: "99.8%",
          change: "All systems operational",
          trend: "excellent",
          icon: Activity,
          color: "text-[#D4745E]",
          bgColor: "bg-[#F5F3E7]",
        },
      ]
    : [
        {
          title: "Total Properties",
          value: "45",
          change: "+5 this month",
          trend: "up",
          icon: Building,
          color: "text-[#1C3F3A]",
          bgColor: "bg-[#F5F3E7]",
        },
        {
          title: "Building Managers",
          value: "12",
          change: "2 pending approval",
          trend: "neutral",
          icon: Settings,
          color: "text-[#D4745E]",
          bgColor: "bg-[#F5F3E7]",
        },
        {
          title: "Total Users",
          value: "1,247",
          change: "+89 this month",
          trend: "up",
          icon: Users,
          color: "text-[#1C3F3A]",
          bgColor: "bg-[#F5F3E7]",
        },
        {
          title: "System Health",
          value: "99.8%",
          change: "All systems operational",
          trend: "excellent",
          icon: Activity,
          color: "text-[#D4745E]",
          bgColor: "bg-[#F5F3E7]",
        },
      ]

  const loadData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      console.log("[v0] Loading Super Admin data from API...")

      // Mocking data for now due to build system issue
      // const languagesData = [{ id: 1, name: "English" }]
      // const currenciesData = [{ id: 1, code: "AED" }]
      // const timezonesData = [{ id: 1, name: "UTC+4" }]
      // const rolesData = [{ id: 1, name: "Admin" }]
      // const modulesData = [{ id: 1, name: "Dashboard" }]
      // const permissionsData = [{ id: 1, name: "Read" }]
      // const domainsData = [{ id: 1, name: "example.com" }]

      // Fetch data from domainHomeService
      const [
        languagesData,
        currenciesData,
        timezonesData,
        rolesData,
        modulesData,
        permissionsData,
        domainsData,
        countriesData,
        citiesData,
        areasData,
        propertyTypesData,
        amenitiesData,
        domainHomeStatsData,
        financeStatsData,
      ] = await Promise.all([
        domainHomeService.getLanguages(),
        domainHomeService.getCurrencies(),
        domainHomeService.getTimezones(),
        domainHomeService.getRoles(),
        domainHomeService.getModules(),
        domainHomeService.getPermissions(),
        domainHomeService.getDomains(),
        domainHomeService.getCountries(),
        domainHomeService.getCities(),
        domainHomeService.getAreas(),
        domainHomeService.getPropertyTypes(),
        domainHomeService.getAmenities(),
        domainHomeService.getHomeStats(),
        domainHomeService.getFinanceStats(),
      ])

      setLanguages(languagesData)
      setCurrencies(currenciesData)
      setTimezones(timezonesData)
      setRoles(rolesData)
      setModules(modulesData)
      setPermissions(permissionsData)
      setDomains(domainsData)
      setCountries(countriesData)
      setCities(citiesData)
      setAreas(areasData)
      setPropertyTypes(propertyTypesData)
      setAmenities(amenitiesData)
      // setDomainHomeStats(domainHomeStatsData) // Corrected: use setHomeStats
      setHomeStats(domainHomeStatsData)
      setFinanceStats(financeStatsData)

      console.log("[v0] Data loaded successfully")
    } catch (err: any) {
      console.error("[v0] Error loading data:", err)
      setError(err.message || "Failed to load data")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddLanguage = async (data: any) => {
    try {
      // await superAdminService.addLanguage(data)
      await domainHomeService.addLanguage(data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleEditLanguage = async (id: number, data: any) => {
    try {
      // await superAdminService.editLanguage(id, data)
      await domainHomeService.editLanguage(id, data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeleteLanguage = async (id: number) => {
    try {
      // await superAdminService.removeLanguage(id)
      await domainHomeService.deleteLanguage(id)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  // ... similar handlers for other entities ...
  const handleAddCurrency = async (data: any) => {
    try {
      await domainHomeService.addCurrency(data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }
  const handleEditCurrency = async (id: number, data: any) => {
    try {
      await domainHomeService.editCurrency(id, data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }
  const handleDeleteCurrency = async (id: number) => {
    try {
      await domainHomeService.deleteCurrency(id)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleAddTimezone = async (data: any) => {
    try {
      await domainHomeService.addTimezone(data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }
  const handleEditTimezone = async (id: number, data: any) => {
    try {
      await domainHomeService.editTimezone(id, data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }
  const handleDeleteTimezone = async (id: number) => {
    try {
      await domainHomeService.deleteTimezone(id)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleAddRole = async (data: any) => {
    try {
      await domainHomeService.addRole(data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }
  const handleEditRole = async (id: number, data: any) => {
    try {
      await domainHomeService.editRole(id, data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }
  const handleDeleteRole = async (id: number) => {
    try {
      await domainHomeService.deleteRole(id)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleAddModule = async (data: any) => {
    try {
      await domainHomeService.addModule(data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }
  const handleEditModule = async (id: number, data: any) => {
    try {
      await domainHomeService.editModule(id, data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }
  const handleDeleteModule = async (id: number) => {
    try {
      await domainHomeService.deleteModule(id)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleAddPermission = async (data: any) => {
    try {
      await domainHomeService.addPermission(data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }
  const handleEditPermission = async (id: number, data: any) => {
    try {
      await domainHomeService.editPermission(id, data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }
  const handleDeletePermission = async (id: number) => {
    try {
      await domainHomeService.deletePermission(id)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleAddDomain = async (data: any) => {
    try {
      await domainHomeService.addDomain(data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }
  const handleEditDomain = async (id: number, data: any) => {
    try {
      await domainHomeService.editDomain(id, data)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }
  const handleDeleteDomain = async (id: number) => {
    try {
      await domainHomeService.deleteDomain(id)
      await loadData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleAddDomainItem = () => {
    setDomainFormData({})
    setSelectedDomainItem(null)
    setShowAddDomainModal(true)
  }

  const handleEditDomainItem = (item: any) => {
    setDomainFormData(item)
    setSelectedDomainItem(item)
    setShowEditDomainModal(true)
  }

  const handleDeleteDomainItem = async (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      // API call would go here
      // Example:
      switch (activeDomainTab) {
        case "languages":
          await handleDeleteLanguage(id)
          break
        case "currencies":
          await handleDeleteCurrency(id)
          break
        case "timezones":
          await handleDeleteTimezone(id)
          break
        case "roles":
          await handleDeleteRole(id)
          break
        case "modules":
          await handleDeleteModule(id)
          break
        case "permissions":
          await handleDeletePermission(id)
          break
        case "domains":
          await handleDeleteDomain(id)
          break
        // Add cases for other domain tabs if they have delete functionality
        default:
          break
      }
    }
  }

  const handleSaveDomainItem = async () => {
    try {
      // API call would go here based on activeDomainTab
      console.log("[v0] Saving domain item:", domainFormData)
      setShowAddDomainModal(false)
      setShowEditDomainModal(false)

      const activeTab = activeDomainTab
      const data = { ...domainFormData, isActive: domainFormData.isActive !== false } // Ensure isActive is boolean

      if (showEditDomainModal && selectedDomainItem) {
        switch (activeTab) {
          case "languages":
            await handleEditLanguage(selectedDomainItem.id, data)
            break
          case "currencies":
            await handleEditCurrency(selectedDomainItem.id, data)
            break
          case "timezones":
            await handleEditTimezone(selectedDomainItem.id, data)
            break
          case "roles":
            await handleEditRole(selectedDomainItem.id, data)
            break
          case "modules":
            await handleEditModule(selectedDomainItem.id, data)
            break
          case "permissions":
            await handleEditPermission(selectedDomainItem.id, data)
            break
          case "domains":
            await handleEditDomain(selectedDomainItem.id, data)
            break
          // Add cases for other domain tabs
          default:
            break
        }
      } else {
        switch (activeTab) {
          case "languages":
            await handleAddLanguage(data)
            break
          case "currencies":
            await handleAddCurrency(data)
            break
          case "timezones":
            await handleAddTimezone(data)
            break
          case "roles":
            await handleAddRole(data)
            break
          case "modules":
            await handleAddModule(data)
            break
          case "permissions":
            await handleAddPermission(data)
            break
          case "domains":
            await handleAddDomain(data)
            break
          // Add cases for other domain tabs
          default:
            break
        }
      }
      await loadData() // Refresh data after save
    } catch (err: any) {
      setError(err.message)
    } finally {
      setShowAddDomainModal(false)
      setShowEditDomainModal(false)
      setDomainFormData({})
      setSelectedDomainItem(null)
    }
  }

  const getDomainData = () => {
    switch (activeDomainTab) {
      case "languages":
        return languages
      case "currencies":
        return currencies
      case "timezones":
        return timezones
      case "roles": // Assuming roles are managed here too
        return roles
      case "modules": // Assuming modules are managed here too
        return modules
      case "permissions": // Assuming permissions are managed here too
        return permissions
      case "domains":
        return domains
      case "countries":
        return countries
      case "cities":
        return cities
      case "areas":
        return areas
      case "property-types":
        return propertyTypes
      case "amenities":
        return amenities
      default:
        return []
    }
  }

  const getDomainFields = () => {
    switch (activeDomainTab) {
      case "languages":
        return [
          { name: "name", label: "Language Name", type: "text", placeholder: "e.g., English" },
          { name: "code", label: "Language Code", type: "text", placeholder: "e.g., en" },
        ]
      case "currencies":
        return [
          { name: "name", label: "Currency Name", type: "text", placeholder: "e.g., UAE Dirham" },
          { name: "code", label: "Currency Code", type: "text", placeholder: "e.g., AED" },
          { name: "symbol", label: "Symbol", type: "text", placeholder: "e.g., د.إ" },
        ]
      case "timezones":
        return [
          { name: "name", label: "Timezone Name", type: "text", placeholder: "e.g., Gulf Standard Time" },
          { name: "code", label: "Code", type: "text", placeholder: "e.g., GST" },
          { name: "offset", label: "UTC Offset", type: "text", placeholder: "e.g., +04:00" },
        ]
      case "roles":
        return [
          { name: "name", label: "Role Name", type: "text", placeholder: "e.g., Administrator" },
          { name: "description", label: "Description", type: "textarea", placeholder: "Role description" },
        ]
      case "modules":
        return [
          { name: "name", label: "Module Name", type: "text", placeholder: "e.g., Dashboard" },
          { name: "description", label: "Description", type: "textarea", placeholder: "Module description" },
        ]
      case "permissions":
        return [
          { name: "name", label: "Permission Name", type: "text", placeholder: "e.g., Read" },
          { name: "description", label: "Description", type: "textarea", placeholder: "Permission description" },
        ]
      case "domains":
        return [{ name: "name", label: "Domain Name", type: "text", placeholder: "e.g., mahaone.com" }]
      case "countries":
        return [
          { name: "name", label: "Country Name", type: "text", placeholder: "e.g., United Arab Emirates" },
          { name: "code", label: "Country Code", type: "text", placeholder: "e.g., AE" },
        ]
      case "cities":
        return [
          { name: "name", label: "City Name", type: "text", placeholder: "e.g., Dubai" },
          { name: "countryId", label: "Country", type: "select", options: countries },
        ]
      case "areas":
        return [
          { name: "name", label: "Area Name", type: "text", placeholder: "e.g., Dubai Marina" },
          { name: "cityId", label: "City", type: "select", options: cities },
        ]
      case "property-types":
        return [
          { name: "name", label: "Property Type", type: "text", placeholder: "e.g., Villa" },
          { name: "description", label: "Description", type: "textarea", placeholder: "Brief description" },
        ]
      case "amenities":
        return [
          { name: "name", label: "Amenity Name", type: "text", placeholder: "e.g., Swimming Pool" },
          { name: "icon", label: "Icon", type: "text", placeholder: "e.g., pool" },
        ]
      default:
        return []
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
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
    <div className="min-h-screen bg-[#F5F3E7]">
      <header className="bg-white border-b-2 border-[#1C3F3A]/20 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-6">
              <MahaLogo size="md" variant="primary" showText={true} />
              <div className="h-8 w-px bg-[#1C3F3A]/20"></div>
              <div>
                <h1 className="text-2xl font-bold text-[#1C3F3A] font-serif">Super Admin</h1>
                <p className="text-sm text-[#1C3F3A]/60">Complete System Control</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search services..."
                  className="w-64 bg-[#F5F3E7] border-[#1C3F3A]/20 text-[#1C3F3A] placeholder:text-[#1C3F3A]/40"
                />
              </div>

              <Button
                variant="outline"
                size="sm"
                className="border-[#1C3F3A]/20 text-[#1C3F3A] hover:bg-[#1C3F3A]/10 bg-transparent"
              >
                <Bell className="h-5 w-5 mr-2" />
                <span className="hidden md:inline">Notifications</span>
                <Badge className="ml-2 bg-[#D4745E] text-white">25</Badge>
              </Button>

              <div className="flex items-center space-x-3">
                <Avatar className="ring-2 ring-[#1C3F3A]/20 h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40&text=SA" alt="Super Admin" />
                  <AvatarFallback className="bg-[#1C3F3A] text-white font-bold">SA</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-[#1C3F3A]">Omar Al Rashid</p>
                  <p className="text-xs text-[#1C3F3A]/60">Super Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1C3F3A] mb-3 font-serif">MahaOne Control Center</h1>
          <p className="text-lg text-[#1C3F3A]/70">
            Operational compliance, regulatory oversight, and system monitoring
          </p>
        </div>

        {/* System Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {systemStats.map((stat, index) => (
            <Card
              key={index}
              className="border-2 border-[#1C3F3A]/20 shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#1C3F3A]/70">{stat.title}</p>
                    <p className="text-2xl font-bold text-[#1C3F3A] mt-1">{stat.value}</p>
                    <p className="text-xs text-[#1C3F3A]/60 mt-1">{stat.change}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#1C3F3A]/10">
                    <stat.icon className="h-6 w-6 text-[#1C3F3A]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1C3F3A] mb-4">Finance Overview</h2>
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : financeStats ? (
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-white border-[#1C3F3A]/20">
                <CardHeader>
                  <CardTitle className="text-[#1C3F3A] flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-[#D4745E]" />
                    Amenity Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#1C3F3A]/70">Total Revenue</span>
                      <span className="text-2xl font-bold text-[#1C3F3A]">
                        AED {financeStats.amenity.totalRevenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#1C3F3A]/70">This Month</span>
                      <span className="text-lg font-semibold text-[#1C3F3A]">
                        AED {financeStats.amenity.revenueThisMonth.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#1C3F3A]/70">Previous Month</span>
                      <span className="text-lg font-semibold text-[#1C3F3A]">
                        AED {financeStats.amenity.revenuePrevMonth.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      {Number.parseFloat(financeStats.amenity.revenueChangePercent) >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          Number.parseFloat(financeStats.amenity.revenueChangePercent) >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {financeStats.amenity.revenueChangePercent}% change
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#1C3F3A]/20">
                <CardHeader>
                  <CardTitle className="text-[#1C3F3A] flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-[#D4745E]" />
                    Home Service Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#1C3F3A]/70">Total Revenue</span>
                      <span className="text-2xl font-bold text-[#1C3F3A]">
                        AED {financeStats.homeService.totalRevenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#1C3F3A]/70">This Month</span>
                      <span className="text-lg font-semibold text-[#1C3F3A]">
                        AED {financeStats.homeService.revenueThisMonth.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#1C3F3A]/70">Previous Month</span>
                      <span className="text-lg font-semibold text-[#1C3F3A]">
                        AED {financeStats.homeService.revenuePrevMonth.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      {Number.parseFloat(financeStats.homeService.revenueChangePercent) >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          Number.parseFloat(financeStats.homeService.revenueChangePercent) >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {financeStats.homeService.revenueChangePercent}% change
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="bg-white">
              <CardContent className="p-6 text-center text-[#1C3F3A]/70">No finance data available</CardContent>
            </Card>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1C3F3A] mb-4">Amenities Overview</h2>
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-white">
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : amenities.length > 0 ? (
            <>
              <div className="grid gap-4 md:grid-cols-3 mb-4">
                <Card className="bg-white border-[#1C3F3A]/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#1C3F3A]/70">Total Amenities</p>
                        <p className="text-3xl font-bold text-[#1C3F3A]">{amenities.length}</p>
                      </div>
                      <Building className="h-10 w-10 text-[#D4745E]" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white border-[#1C3F3A]/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#1C3F3A]/70">Active Amenities</p>
                        <p className="text-3xl font-bold text-[#1C3F3A]">
                          {amenities.filter((a) => a.status === "ACTIVE").length}
                        </p>
                      </div>
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white border-[#1C3F3A]/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#1C3F3A]/70">Avg. Price</p>
                        <p className="text-3xl font-bold text-[#1C3F3A]">
                          AED {Math.round(amenities.reduce((sum, a) => sum + a.price, 0) / amenities.length)}
                        </p>
                      </div>
                      <DollarSign className="h-10 w-10 text-[#D4745E]" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card className="bg-white border-[#1C3F3A]/20">
                <CardHeader>
                  <CardTitle className="text-[#1C3F3A]">Recent Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {amenities.slice(0, 5).map((amenity) => (
                      <div key={amenity.id} className="flex items-center justify-between p-4 bg-[#F5F3E7] rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#1C3F3A]">{amenity.name.en}</h4>
                          <p className="text-sm text-[#1C3F3A]/70">{amenity.description.en}</p>
                          <div className="flex items-center gap-4 mt-2">
                            {amenity.capacity && (
                              <span className="text-xs text-[#1C3F3A]/60">Capacity: {amenity.capacity}</span>
                            )}
                            <Badge variant={amenity.status === "ACTIVE" ? "default" : "secondary"}>
                              {amenity.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-[#D4745E]">AED {amenity.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="bg-white">
              <CardContent className="p-6 text-center text-[#1C3F3A]/70">No amenities available</CardContent>
            </Card>
          )}
        </div>

        {/* System Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive">
              <p className="text-sm text-destructive text-center">{error}</p>
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="flex flex-wrap gap-2 bg-white border-2 border-[#1C3F3A]/20 p-2 rounded-lg h-auto">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-[#1C3F3A] data-[state=active]:text-white text-[#1C3F3A] font-medium px-4 py-2 rounded-md transition-all"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="tenant-services"
                className="data-[state=active]:bg-[#1C3F3A] data-[state=active]:text-white text-[#1C3F3A] font-medium px-4 py-2 rounded-md transition-all"
              >
                Tenant Services
              </TabsTrigger>
              <TabsTrigger
                value="building-ops"
                className="data-[state=active]:bg-[#1C3F3A] data-[state=active]:text-white text-[#1C3F3A] font-medium px-4 py-2 rounded-md transition-all"
              >
                Building Ops
              </TabsTrigger>
              <TabsTrigger
                value="landlord-tools"
                className="data-[state=active]:bg-[#1C3F3A] data-[state=active]:text-white text-[#1C3F3A] font-medium px-4 py-2 rounded-md transition-all"
              >
                Landlord Tools
              </TabsTrigger>
              <TabsTrigger
                value="financial"
                className="data-[state=active]:bg-[#1C3F3A] data-[state=active]:text-white text-[#1C3F3A] font-medium px-4 py-2 rounded-md transition-all"
              >
                Financial
              </TabsTrigger>
              <TabsTrigger
                value="approvals"
                className="data-[state=active]:bg-[#1C3F3A] data-[state=active]:text-white text-[#1C3F3A] font-medium px-4 py-2 rounded-md transition-all"
              >
                Approvals
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-[#1C3F3A] data-[state=active]:text-white text-[#1C3F3A] font-medium px-4 py-2 rounded-md transition-all"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="emergency"
                className="data-[state=active]:bg-[#1C3F3A] data-[state=active]:text-white text-[#1C3F3A] font-medium px-4 py-2 rounded-md transition-all"
              >
                Emergency
              </TabsTrigger>
              <TabsTrigger
                value="domains"
                className="data-[state=active]:bg-[#1C3F3A] data-[state=active]:text-white text-[#1C3F3A] font-medium px-4 py-2 rounded-md transition-all"
              >
                Domains
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="data-[state=active]:bg-[#1C3F3A] data-[state=active]:text-white text-[#1C3F3A] font-medium px-4 py-2 rounded-md transition-all"
              >
                Reports
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {/* System Health */}
                <Card className="border-2 border-[#1C3F3A]/20 shadow-lg bg-white hover:shadow-xl transition-shadow w-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-[#1C3F3A] font-serif text-xl">
                      <div className="p-2 bg-[#1C3F3A]/10 rounded-lg">
                        <Activity className="h-6 w-6 text-[#1C3F3A]" />
                      </div>
                      <span>System Health</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#1C3F3A]/70">Server Uptime</span>
                        <Badge className="bg-green-100 text-green-800 border-0">
                          {homeStats?.serverUptime || "99.8%"}
                        </Badge>
                      </div>
                      <p className="text-3xl font-bold text-[#1C3F3A]">{homeStats?.serverUptime || "99.8%"}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#1C3F3A]/70">Active Users</span>
                        <Badge className="bg-[#D4745E]/10 text-[#D4745E] border-0">
                          {homeStats?.activeUsers || "1,245"}
                        </Badge>
                      </div>
                      <p className="text-3xl font-bold text-[#1C3F3A]">{homeStats?.activeUsers || "1,245"}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#1C3F3A]/70">System Load</span>
                        <Badge className="bg-green-100 text-green-800 border-0">
                          {homeStats?.systemLoad || "Normal"}
                        </Badge>
                      </div>
                      <Progress value={65} className="h-3 bg-[#C2C5AA]/30" />
                    </div>

                    <div className="pt-3 border-t border-[#1C3F3A]/10">
                      <p className="text-xs text-[#1C3F3A]/60">Last Updated: {new Date().toLocaleTimeString()}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-2 border-[#1C3F3A]/20 shadow-lg bg-white hover:shadow-xl transition-shadow w-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-3 text-[#1C3F3A] font-serif text-xl">
                      <div className="p-2 bg-[#D4745E]/10 rounded-lg">
                        <Settings className="h-6 w-6 text-[#D4745E]" />
                      </div>
                      <span>Quick Actions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        onClick={() => setShowAddPropertyModal(true)}
                        className="h-24 flex-col space-y-2 bg-[#1C3F3A] text-white hover:bg-[#1C3F3A]/90 border-0"
                      >
                        <Building className="h-7 w-7" />
                        <span className="text-sm font-semibold">Add Property</span>
                      </Button>
                      <Button
                        onClick={() => setShowAddManagerModal(true)}
                        className="h-24 flex-col space-y-2 bg-[#D4745E] text-white hover:bg-[#D4745E]/90 border-0"
                      >
                        <UserPlus className="h-7 w-7" />
                        <span className="text-sm font-semibold">Add Manager</span>
                      </Button>
                      <Button className="h-24 flex-col space-y-2 bg-[#C2C5AA] text-[#1C3F3A] hover:bg-[#C2C5AA]/80 border-0">
                        <Database className="h-7 w-7" />
                        <span className="text-sm font-semibold">Backup</span>
                      </Button>
                      <Button className="h-24 flex-col space-y-2 bg-white text-[#1C3F3A] hover:bg-[#F5F3E7] border-2 border-[#1C3F3A]/20">
                        <FileText className="h-7 w-7" />
                        <span className="text-sm font-semibold">Reports</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activities */}
                <Card className="border-2 border-[#1C3F3A]/20 shadow-lg bg-white hover:shadow-xl transition-shadow w-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-3 text-[#1C3F3A] font-serif text-xl">
                      <div className="p-2 bg-[#1C3F3A]/10 rounded-lg">
                        <Clock className="h-6 w-6 text-[#1C3F3A]" />
                      </div>
                      <span>Recent Activities</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto">
                      {[
                        {
                          icon: CheckCircle,
                          title: "Maintenance Approved",
                          desc: "Azure Gardens - AC Repair",
                          color: "bg-green-50 border-green-200 text-green-800",
                        },
                        {
                          icon: AlertTriangle,
                          title: "Compliance Alert",
                          desc: "Pearl Towers - Fire Safety",
                          color: "bg-yellow-50 border-yellow-200 text-yellow-800",
                        },
                        {
                          icon: DollarSign,
                          title: "Payment Received",
                          desc: "Marina Heights - Unit C-205",
                          color: "bg-blue-50 border-blue-200 text-blue-800",
                        },
                        {
                          icon: UserCheck,
                          title: "New Tenant Added",
                          desc: "Skyline Residences - Unit A-101",
                          color: "bg-purple-50 border-purple-200 text-purple-800",
                        },
                        {
                          icon: Wrench,
                          title: "Emergency Request",
                          desc: "Golden Sands - Plumbing Issue",
                          color: "bg-red-50 border-red-200 text-red-800",
                        },
                        {
                          icon: FileText,
                          title: "Report Generated",
                          desc: "Monthly Financial Summary",
                          color: "bg-gray-50 border-gray-200 text-gray-800",
                        },
                      ].map((activity, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-3 p-3 rounded-lg border ${activity.color}`}
                        >
                          <activity.icon className="h-5 w-5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">{activity.title}</p>
                            <p className="text-xs opacity-75 truncate">{activity.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Financial Overview */}
              <Card className="border-2 border-[#1C3F3A]/20 shadow-lg bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 text-[#1C3F3A] font-serif text-xl">
                    <div className="p-2 bg-[#D4745E]/10 rounded-lg">
                      <DollarSign className="h-6 w-6 text-[#D4745E]" />
                    </div>
                    <span>Financial Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {financialOverview.map((item, index) => (
                      <div key={index} className="text-center p-5 bg-[#F5F3E7] rounded-xl shadow-inner">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br from-[#1C3F3A] to-[#1C3F3A]/70 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-md`}
                        >
                          <item.icon className={`h-8 w-8 text-white`} />
                        </div>
                        <p className="text-2xl font-bold text-[#1C3F3A]">
                          {financeStats
                            ? financeStats[item.title.toLowerCase().replace(/\s+/g, "") as keyof FinanceStats]
                            : "N/A"}
                        </p>
                        <p className="text-base font-medium text-[#1C3F3A]/80 mt-1">{item.title}</p>
                        <p
                          className={`text-sm font-semibold ${item.trend === "up" ? "text-green-600" : "text-red-600"}`}
                        >
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
                <h2 className="text-2xl font-semibold text-foreground font-serif">Complete Tenant Services</h2>
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
                    className="border-2 border-[#1C3F3A]/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 bg-white overflow-hidden relative group"
                    onClick={() => (window.location.href = service.route)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1C3F3A]/5 to-[#C2C5AA]/5 group-hover:from-[#1C3F3A]/10 group-hover:to-[#C2C5AA]/10 transition-all duration-300"></div>

                    <CardContent className="relative p-6 text-center h-full flex flex-col justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#D4745E] to-[#D4745E]/80 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <service.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-[#1C3F3A] text-lg mb-2">{service.title}</h3>
                      <p className="text-sm text-[#1C3F3A]/70 leading-relaxed">{service.description}</p>
                      <Badge className="mt-3 mx-auto bg-[#1C3F3A]/10 text-[#1C3F3A] border-[#1C3F3A]/20">
                        {service.category}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Building Operations Tab - All building manager features */}
            <TabsContent value="building-ops" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground font-serif">Building Operations Management</h2>
                <Badge className="bg-primary/10 text-primary">All Building Manager Features</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {buildingManagerTools.map((tool) => (
                  <Card
                    key={tool.id}
                    className="border border-border shadow-lg hover:shadow-xl transition-all duration-300 bg-card cursor-pointer"
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg`}
                      >
                        <tool.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-foreground text-lg mb-2">{tool.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                      <Badge className="bg-primary/10 text-primary">{tool.count}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Building Manager Quick Actions */}
              <Card className="border border-border shadow-lg bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground font-serif">Building Management Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button className="h-auto p-4 flex-col space-y-2 bg-primary/10 text-primary hover:bg-primary/20 border-0">
                      <UserPlus className="h-6 w-6" />
                      <span className="text-sm">Add Tenant</span>
                    </Button>
                    <Button className="h-auto p-4 flex-col space-y-2 bg-accent/10 text-accent hover:bg-accent/20 border-0">
                      <Wrench className="h-6 w-6" />
                      <span className="text-sm">Schedule Service</span>
                    </Button>
                    <Button className="h-auto p-4 flex-col space-y-2 bg-secondary/10 text-secondary hover:bg-secondary/20 border-0">
                      <Truck className="h-6 w-6" />
                      <span className="text-sm">Add Vendor</span>
                    </Button>
                    <Button className="h-auto p-4 flex-col space-y-2 bg-destructive/10 text-destructive hover:bg-destructive/20 border-0">
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
                <h2 className="text-2xl font-semibold text-foreground font-serif">Landlord Management Tools</h2>
                <Badge className="bg-primary/10 text-primary">All Landlord Features</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-grid-cols-2 lg:grid-cols-4 gap-6">
                {landlordTools.map((tool) => (
                  <Card
                    key={tool.id}
                    className="border border-border shadow-lg hover:shadow-xl transition-all duration-300 bg-card cursor-pointer"
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg`}
                      >
                        <tool.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-foreground text-lg mb-2">{tool.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                      <Badge className="bg-primary/10 text-primary">{tool.count}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Landlord Quick Actions */}
              <Card className="border border-border shadow-lg bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground font-serif">Landlord Management Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button className="h-auto p-4 flex-col space-y-2 bg-primary/10 text-primary hover:bg-primary/20 border-0">
                      <Building className="h-6 w-6" />
                      <span className="text-sm">Add Property</span>
                    </Button>
                    <Button className="h-auto p-4 flex-col space-y-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 border-0">
                      <DollarSign className="h-6 w-6" />
                      <span className="text-sm">Collect Rent</span>
                    </Button>
                    <Button className="h-auto p-4 flex-col space-y-2 bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-0">
                      <UserCheck className="h-6 w-6" />
                      <span className="text-sm">Screen Tenant</span>
                    </Button>
                    <Button className="h-auto p-4 flex-col space-y-2 bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20 border-0">
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
                <h2 className="text-2xl font-semibold text-foreground font-serif">Complete Financial Management</h2>
                <div className="flex space-x-2">
                  <Badge className="bg-green-500/10 text-green-500">
                    Revenue: AED {financeStats?.totalMonthlyRevenue?.toLocaleString() ?? "N/A"}
                  </Badge>
                  <Badge className="bg-red-500/10 text-red-500">
                    Outstanding: AED {financeStats?.outstandingPayments?.toLocaleString() ?? "N/A"}
                  </Badge>
                </div>
              </div>

              {/* Financial Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {financialOverview.map((item, index) => (
                  <Card key={index} className="border border-border shadow-lg bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                          <p className="text-xl font-bold text-foreground">
                            {financeStats
                              ? financeStats[item.title.toLowerCase().replace(/\s+/g, "") as keyof FinanceStats]
                              : "N/A"}
                          </p>
                          <p className={`text-xs ${item.trend === "up" ? "text-green-500" : "text-red-500"}`}>
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
              <Card className="border border-border shadow-lg bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground font-serif">Financial Operations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button className="h-auto p-4 flex-col space-y-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 border-0">
                      <DollarSign className="h-6 w-6" />
                      <span className="text-sm">Process Payments</span>
                    </Button>
                    <Button className="h-auto p-4 flex-col space-y-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 border-0">
                      <AlertTriangle className="h-6 w-6" />
                      <span className="text-sm">Overdue Notices</span>
                    </Button>
                    <Button className="h-auto p-4 flex-col space-y-2 bg-primary/10 text-primary hover:bg-primary/20 border-0">
                      <BarChart3 className="h-6 w-6" />
                      <span className="text-sm">Financial Reports</span>
                    </Button>
                    <Button className="h-auto p-4 flex-col space-y-2 bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-0">
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
                <h2 className="text-2xl font-semibold text-foreground font-serif">Emergency Management Center</h2>
                <Badge className="bg-destructive/10 text-destructive">2 Active Emergencies</Badge>
              </div>

              {/* Emergency Contacts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {emergencyTools.map((contact, index) => (
                  <Card key={index} className="border border-border shadow-lg bg-card">
                    <CardContent className="p-4 text-center">
                      <div
                        className={`w-12 h-12 ${contact.color} rounded-xl mx-auto mb-3 flex items-center justify-center`}
                      >
                        <contact.icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-foreground text-sm">{contact.title}</h4>
                      <p className="text-lg font-bold text-foreground">{contact.contact}</p>
                      <Button size="sm" className="mt-2 w-full">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Emergency Actions */}
              <Card className="border border-border shadow-lg bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground font-serif">Emergency Response Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button className="h-auto p-4 flex-col space-y-2 bg-destructive/10 text-destructive hover:bg-destructive/20 border-0">
                      <AlertTriangle className="h-6 w-6" />
                      <span className="text-sm">Declare Emergency</span>
                    </Button>
                    <Button className="h-auto p-4 flex-col space-y-2 bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-0">
                      <Bell className="h-6 w-6" />
                      <span className="text-sm">Send Alert</span>
                    </Button>
                    <Button className="h-auto p-4 flex-col space-y-2 bg-primary/10 text-primary hover:bg-primary/20 border-0">
                      <Phone className="h-6 w-6" />
                      <span className="text-sm">Contact Security</span>
                    </Button>
                    <Button className="h-auto p-4 flex-col space-y-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 border-0">
                      <CheckCircle className="h-6 w-6" />
                      <span className="text-sm">All Clear</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Approvals, System, Analytics, and Reports Tabs */}
            <TabsContent value="approvals" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground font-serif">Approval Management</h2>
                <Badge className="bg-destructive/10 text-destructive">18 Pending Approvals</Badge>
              </div>

              <Card className="border border-border shadow-lg bg-card">
                <CardContent className="p-6">
                  <p className="text-muted-foreground text-center py-8">
                    Comprehensive approval system for all tenant requests, building modifications, and system changes.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground font-serif">Analytics & Insights</h2>
                <Badge className="bg-primary/10 text-primary">Real-time Data</Badge>
              </div>

              <Card className="border border-border shadow-lg bg-card">
                <CardContent className="p-6">
                  <p className="text-muted-foreground text-center py-8">
                    Comprehensive analytics dashboard with property performance, tenant satisfaction, and financial
                    insights.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground font-serif">System Administration</h2>
                <Badge className="bg-green-500/10 text-green-500">All Systems Operational</Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border border-border shadow-lg bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-foreground font-serif">
                      <Database className="h-5 w-5 text-primary" />
                      <span>Database Management</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Database Size</span>
                      <span className="font-bold text-foreground">2.4 GB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Last Backup</span>
                      <span className="font-bold text-foreground">2024-01-20 02:00</span>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-primary to-primary-dark text-white">
                      <Database className="h-4 w-4 mr-2" />
                      Create Backup
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border border-border shadow-lg bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-foreground font-serif">
                      <Lock className="h-5 w-5 text-destructive" />
                      <span>Security Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">SSL Certificate</span>
                      <Badge className="bg-green-500/10 text-green-500">Valid</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Firewall Status</span>
                      <Badge className="bg-green-500/10 text-green-500">Active</Badge>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-destructive to-destructive-dark text-white">
                      <Lock className="h-4 w-4 mr-2" />
                      Security Scan
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground font-serif">Reports & Documentation</h2>
                <Button className="bg-gradient-to-r from-primary to-primary-dark text-white">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>

              <Card className="border border-border shadow-lg bg-card">
                <CardContent className="p-6">
                  <p className="text-muted-foreground text-center py-8">
                    Comprehensive reporting system for all aspects of property management, financial performance, and
                    system usage.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="domains" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground font-serif">Domain & List Management</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage all system master data: languages, currencies, locations, and property configurations
                  </p>
                </div>
                <Button
                  onClick={handleAddDomainItem}
                  className="bg-gradient-to-r from-primary to-primary-dark text-white"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </div>

              <Card className="border border-border shadow-lg bg-card">
                <CardContent className="p-6">
                  <Tabs value={activeDomainTab} onValueChange={setActiveDomainTab}>
                    <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-muted">
                      <TabsTrigger value="languages" className="text-xs">
                        Languages
                      </TabsTrigger>
                      <TabsTrigger value="currencies" className="text-xs">
                        Currencies
                      </TabsTrigger>
                      <TabsTrigger value="timezones" className="text-xs">
                        Timezones
                      </TabsTrigger>
                      <TabsTrigger value="roles" className="text-xs">
                        {" "}
                        {/* Added Roles Tab */}
                        Roles
                      </TabsTrigger>
                      <TabsTrigger value="modules" className="text-xs">
                        {" "}
                        {/* Added Modules Tab */}
                        Modules
                      </TabsTrigger>
                      <TabsTrigger value="permissions" className="text-xs">
                        {" "}
                        {/* Added Permissions Tab */}
                        Permissions
                      </TabsTrigger>
                      <TabsTrigger value="domains" className="text-xs">
                        Domains
                      </TabsTrigger>
                      <TabsTrigger value="countries" className="text-xs">
                        Countries
                      </TabsTrigger>
                      <TabsTrigger value="cities" className="text-xs">
                        Cities
                      </TabsTrigger>
                      <TabsTrigger value="areas" className="text-xs">
                        Areas
                      </TabsTrigger>
                      <TabsTrigger value="property-types" className="text-xs">
                        Property Types
                      </TabsTrigger>
                      <TabsTrigger value="amenities" className="text-xs">
                        Amenities
                      </TabsTrigger>
                    </TabsList>

                    <div className="mt-6">
                      <div className="mb-4">
                        <Input
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="max-w-sm"
                        />
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">ID</th>
                              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Name</th>
                              {(activeDomainTab === "currencies" ||
                                activeDomainTab === "languages" ||
                                activeDomainTab === "timezones" ||
                                activeDomainTab === "countries" ||
                                activeDomainTab === "domains") && (
                                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                                  {activeDomainTab === "currencies"
                                    ? "Code"
                                    : activeDomainTab === "languages"
                                      ? "Code"
                                      : activeDomainTab === "timezones"
                                        ? "Code"
                                        : activeDomainTab === "countries"
                                          ? "Code"
                                          : "Domain"}
                                </th>
                              )}
                              {activeDomainTab === "currencies" && (
                                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Symbol</th>
                              )}
                              {activeDomainTab === "timezones" && (
                                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Offset</th>
                              )}
                              {(activeDomainTab === "roles" ||
                                activeDomainTab === "modules" ||
                                activeDomainTab === "permissions") && (
                                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                                  Description
                                </th>
                              )}
                              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
                              <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getDomainData()
                              .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                              .map((item) => (
                                <tr key={item.id} className="border-b border-border hover:bg-accent/5">
                                  <td className="py-3 px-4 text-sm text-foreground">{item.id}</td>
                                  <td className="py-3 px-4 text-sm text-foreground font-medium">{item.name}</td>
                                  {(activeDomainTab === "currencies" ||
                                    activeDomainTab === "languages" ||
                                    activeDomainTab === "timezones" ||
                                    activeDomainTab === "countries" ||
                                    activeDomainTab === "domains") && (
                                    <td className="py-3 px-4 text-sm text-foreground">
                                      {activeDomainTab === "currencies"
                                        ? item.code
                                        : activeDomainTab === "languages"
                                          ? item.code
                                          : activeDomainTab === "timezones"
                                            ? item.code
                                            : activeDomainTab === "countries"
                                              ? item.code
                                              : item.name}
                                    </td>
                                  )}
                                  {activeDomainTab === "currencies" && (
                                    <td className="py-3 px-4 text-sm text-foreground">{item.symbol}</td>
                                  )}
                                  {activeDomainTab === "timezones" && (
                                    <td className="py-3 px-4 text-sm text-foreground">{item.offset}</td>
                                  )}
                                  {(activeDomainTab === "roles" ||
                                    activeDomainTab === "modules" ||
                                    activeDomainTab === "permissions") && (
                                    <td className="py-3 px-4 text-sm text-muted-foreground">{item.description}</td>
                                  )}
                                  <td className="py-3 px-4">
                                    <Badge
                                      className={
                                        item.isActive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                                      }
                                    >
                                      {item.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                  </td>
                                  <td className="py-3 px-4 text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleEditDomainItem(item)}
                                        className="text-foreground hover:text-foreground hover:bg-accent/10"
                                      >
                                        Edit
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleDeleteDomainItem(item.id)}
                                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                      >
                                        Delete
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Modals for adding manager/property */}
        {showAddManagerModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md bg-card">
              <CardHeader>
                <CardTitle className="text-foreground font-serif">Add New Building Manager</CardTitle>
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
                    className="flex-1 bg-gradient-to-r from-primary to-primary-dark text-white"
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
            <Card className="w-full max-w-md bg-card">
              <CardHeader>
                <CardTitle className="text-foreground font-serif">Add New Property</CardTitle>
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
                    className="flex-1 bg-gradient-to-r from-primary to-primary-dark text-white"
                  >
                    Add Property
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Modal for adding/editing domain items */}
        {(showAddDomainModal || showEditDomainModal) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md bg-card max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="text-foreground font-serif">
                  {showEditDomainModal ? "Edit" : "Add"} {activeDomainTab.replace("-", " ").toUpperCase()}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {getDomainFields().map((field) => (
                  <div key={field.name} className="space-y-2">
                    <Label htmlFor={field.name}>{field.label}</Label>
                    {field.type === "select" ? (
                      <Select
                        value={domainFormData[field.name]?.toString() || ""}
                        onValueChange={(value) =>
                          setDomainFormData({
                            ...domainFormData,
                            [field.name]: Number.isNaN(Number(value)) ? value : Number(value),
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={`Select ${field.label}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option: any) => (
                            <SelectItem key={option.id} value={option.id.toString()}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        placeholder={field.placeholder}
                        value={domainFormData[field.name] || ""}
                        onChange={(e) => setDomainFormData({ ...domainFormData, [field.name]: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        rows={3}
                      />
                    ) : (
                      <Input
                        id={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={domainFormData[field.name] || ""}
                        onChange={(e) => setDomainFormData({ ...domainFormData, [field.name]: e.target.value })}
                        className="text-foreground placeholder:text-muted-foreground"
                      />
                    )}
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={domainFormData.isActive !== false}
                    onChange={(e) => setDomainFormData({ ...domainFormData, isActive: e.target.checked })}
                    className="rounded border-border"
                  />
                  <Label htmlFor="isActive" className="cursor-pointer">
                    Active
                  </Label>
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button
                    onClick={() => {
                      setShowAddDomainModal(false)
                      setShowEditDomainModal(false)
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveDomainItem}
                    className="flex-1 bg-gradient-to-r from-primary to-primary-dark text-white"
                  >
                    {showEditDomainModal ? "Update" : "Add"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
