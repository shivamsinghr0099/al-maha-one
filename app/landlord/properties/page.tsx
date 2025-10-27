"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Building,
  Home,
  Users,
  DollarSign,
  MapPin,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const properties = [
  {
    id: 1,
    name: "Azure Gardens Villa Complex",
    address: "Dubai Marina, Dubai",
    type: "Villa Complex",
    totalUnits: 12,
    occupiedUnits: 11,
    vacantUnits: 1,
    monthlyRevenue: 54000,
    yearBuilt: 2020,
    amenities: ["Pool", "Gym", "Parking", "Security"],
    image: "/placeholder.svg?height=200&width=300&text=Azure+Gardens",
    status: "excellent",
    occupancyRate: 92,
    averageRent: 4500,
    maintenanceRequests: 2,
    leaseExpirations: 1,
  },
  {
    id: 2,
    name: "Sunset Apartments",
    address: "JBR, Dubai",
    type: "Apartment Building",
    totalUnits: 24,
    occupiedUnits: 22,
    vacantUnits: 2,
    monthlyRevenue: 48000,
    yearBuilt: 2018,
    amenities: ["Pool", "Gym", "Beach Access", "Concierge"],
    image: "/placeholder.svg?height=200&width=300&text=Sunset+Apartments",
    status: "good",
    occupancyRate: 92,
    averageRent: 2200,
    maintenanceRequests: 5,
    leaseExpirations: 3,
  },
  {
    id: 3,
    name: "Marina Heights",
    address: "Dubai Marina, Dubai",
    type: "High-rise Tower",
    totalUnits: 8,
    occupiedUnits: 7,
    vacantUnits: 1,
    monthlyRevenue: 28000,
    yearBuilt: 2019,
    amenities: ["Gym", "Parking", "Security", "Balcony"],
    image: "/placeholder.svg?height=200&width=300&text=Marina+Heights",
    status: "attention",
    occupancyRate: 88,
    averageRent: 3500,
    maintenanceRequests: 8,
    leaseExpirations: 2,
  },
  {
    id: 4,
    name: "Palm Residences",
    address: "Palm Jumeirah, Dubai",
    type: "Luxury Villas",
    totalUnits: 6,
    occupiedUnits: 6,
    vacantUnits: 0,
    monthlyRevenue: 42000,
    yearBuilt: 2021,
    amenities: ["Private Pool", "Beach Access", "Parking", "Garden"],
    image: "/placeholder.svg?height=200&width=300&text=Palm+Residences",
    status: "excellent",
    occupancyRate: 100,
    averageRent: 7000,
    maintenanceRequests: 1,
    leaseExpirations: 0,
  },
]

const units = [
  {
    id: 1,
    propertyId: 1,
    unitNumber: "A-101",
    type: "4BR Villa",
    tenant: "John Doe",
    rent: 4500,
    leaseStart: "2024-01-01",
    leaseEnd: "2024-12-31",
    status: "occupied",
    paymentStatus: "current",
    maintenanceRequests: 0,
  },
  {
    id: 2,
    propertyId: 1,
    unitNumber: "A-102",
    type: "4BR Villa",
    tenant: "Sarah Johnson",
    rent: 4500,
    leaseStart: "2024-02-01",
    leaseEnd: "2025-01-31",
    status: "occupied",
    paymentStatus: "current",
    maintenanceRequests: 1,
  },
  {
    id: 3,
    propertyId: 1,
    unitNumber: "A-103",
    type: "4BR Villa",
    tenant: null,
    rent: 4500,
    leaseStart: null,
    leaseEnd: null,
    status: "vacant",
    paymentStatus: null,
    maintenanceRequests: 0,
  },
]

export default function LandlordPropertiesPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "attention":
        return "bg-yellow-100 text-yellow-800"
      case "poor":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUnitStatusColor = (status: string) => {
    switch (status) {
      case "occupied":
        return "bg-green-100 text-green-800"
      case "vacant":
        return "bg-red-100 text-red-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredProperties = properties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === "all" || property.status === filterStatus),
  )

  const totalProperties = properties.length
  const totalUnits = properties.reduce((sum, prop) => sum + prop.totalUnits, 0)
  const totalOccupied = properties.reduce((sum, prop) => sum + prop.occupiedUnits, 0)
  const totalRevenue = properties.reduce((sum, prop) => sum + prop.monthlyRevenue, 0)
  const averageOccupancy = Math.round((totalOccupied / totalUnits) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/landlord/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">Property Management</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                asChild
              >
                <Link href="/landlord/properties/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Properties</p>
                  <p className="text-3xl font-bold text-gray-900">{totalProperties}</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-50">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Units</p>
                  <p className="text-3xl font-bold text-gray-900">{totalUnits}</p>
                  <p className="text-xs text-emerald-600">{totalOccupied} occupied</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50">
                  <Home className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">AED {totalRevenue.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-xl bg-green-50">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                  <p className="text-3xl font-bold text-gray-900">{averageOccupancy}%</p>
                  <Progress value={averageOccupancy} className="h-2 mt-2" />
                </div>
                <div className="p-3 rounded-xl bg-purple-50">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="attention">Needs Attention</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card
              key={property.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48">
                <Image src={property.image || "/placeholder.svg"} alt={property.name} fill className="object-cover" />
                <div className="absolute top-4 right-4">
                  <Badge className={getStatusColor(property.status)}>{property.status}</Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.address}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {property.type} • Built {property.yearBuilt}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{property.totalUnits}</div>
                    <div className="text-xs text-gray-600">Total Units</div>
                  </div>
                  <div className="text-center p-3 bg-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">{property.occupancyRate}%</div>
                    <div className="text-xs text-gray-600">Occupied</div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Monthly Revenue:</span>
                    <span className="font-bold text-gray-900">AED {property.monthlyRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Average Rent:</span>
                    <span className="font-medium text-gray-900">AED {property.averageRent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Vacant Units:</span>
                    <span className={`font-medium ${property.vacantUnits > 0 ? "text-red-600" : "text-green-600"}`}>
                      {property.vacantUnits}
                    </span>
                  </div>
                </div>

                {/* Alerts */}
                {(property.maintenanceRequests > 0 || property.leaseExpirations > 0) && (
                  <div className="mb-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">Attention Required</span>
                    </div>
                    <div className="mt-1 text-xs text-yellow-700">
                      {property.maintenanceRequests > 0 && (
                        <div>{property.maintenanceRequests} maintenance request(s)</div>
                      )}
                      {property.leaseExpirations > 0 && <div>{property.leaseExpirations} lease(s) expiring soon</div>}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={`/landlord/properties/${property.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/landlord/properties/${property.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by adding your first property."}
              </p>
              <Button
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                asChild
              >
                <Link href="/landlord/properties/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Property
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
