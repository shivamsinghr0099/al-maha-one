"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building2,
  MapPin,
  Bed,
  Bath,
  Square,
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  ArrowLeft,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"
import { MahaLogo } from "@/components/maha-logo"
import Link from "next/link"

// Mock landlord data
const landlordData = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+971 50 987 0543",
  totalProperties: 3,
  totalUnits: 24,
  occupancyRate: 87.5,
  monthlyRevenue: "AED 245,000",
  joinDate: "2022-03-15",
  status: "active",
}

// Mock properties data with comprehensive details
const properties = [
  {
    id: 1,
    name: "Marina Heights Tower A",
    nameAr: "برج مارينا هايتس أ",
    location: "Dubai Marina, Dubai",
    locationAr: "دبي مارينا، دبي",
    type: "Residential",
    status: "active",
    totalUnits: 12,
    occupiedUnits: 10,
    vacantUnits: 2,
    area: "2,500 sqft",
    bedrooms: "2-3 BR",
    bathrooms: "2-3",
    floors: "15-20",
    yearBuilt: 2020,
    monthlyRent: "AED 85,000",
    annualRevenue: "AED 1,020,000",
    occupancyRate: 83,
    amenities: ["Pool", "Gym", "Parking", "Security"],
    maintenanceStatus: "good",
    lastInspection: "2024-01-15",
    nextInspection: "2024-04-15",
    image: "/placeholder.svg?height=200&width=400&text=Marina+Heights",
  },
  {
    id: 2,
    name: "Business Bay Plaza",
    nameAr: "بلازا الخليج التجاري",
    location: "Business Bay, Dubai",
    locationAr: "الخليج التجاري، دبي",
    type: "Commercial",
    status: "active",
    totalUnits: 8,
    occupiedUnits: 7,
    vacantUnits: 1,
    area: "3,200 sqft",
    bedrooms: "N/A",
    bathrooms: "2-4",
    floors: "Ground-5",
    yearBuilt: 2019,
    monthlyRent: "AED 120,000",
    annualRevenue: "AED 1,440,000",
    occupancyRate: 87.5,
    amenities: ["Parking", "Security", "Conference Room", "Reception"],
    maintenanceStatus: "excellent",
    lastInspection: "2024-01-20",
    nextInspection: "2024-04-20",
    image: "/placeholder.svg?height=200&width=400&text=Business+Bay",
  },
  {
    id: 3,
    name: "Palm Residences",
    nameAr: "مساكن النخلة",
    location: "Palm Jumeirah, Dubai",
    locationAr: "نخلة جميرا، دبي",
    type: "Luxury Residential",
    status: "active",
    totalUnits: 4,
    occupiedUnits: 4,
    vacantUnits: 0,
    area: "4,500 sqft",
    bedrooms: "4-5 BR",
    bathrooms: "4-5",
    floors: "Villa",
    yearBuilt: 2021,
    monthlyRent: "AED 40,000",
    annualRevenue: "AED 480,000",
    occupancyRate: 100,
    amenities: ["Private Pool", "Garden", "Maid's Room", "Beach Access"],
    maintenanceStatus: "good",
    lastInspection: "2024-01-10",
    nextInspection: "2024-04-10",
    image: "/placeholder.svg?height=200&width=400&text=Palm+Residences",
  },
]

export default function LandlordPropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMaintenanceColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "fair":
        return "text-yellow-600"
      case "poor":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getOccupancyColor = (rate: number) => {
    if (rate >= 90) return "text-green-600"
    if (rate >= 70) return "text-blue-600"
    if (rate >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || property.type === filterType
    const matchesStatus = filterStatus === "all" || property.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

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
                <p className="text-xs text-teal/60">Landlord Properties</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/building-manager/dashboard" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Dashboard</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Landlord Profile Section */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20 ring-4 ring-gold/20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80&text=JD" />
                  <AvatarFallback className="bg-gradient-to-br from-teal to-teal-dark text-white text-2xl">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-teal font-serif">{landlordData.name}</h2>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2 text-teal/70">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{landlordData.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-teal/70">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{landlordData.phone}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className={getStatusColor(landlordData.status)}>{landlordData.status}</Badge>
                    <span className="text-sm text-teal/60">Member since {landlordData.joinDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="border-gold text-gold hover:bg-gold hover:text-white bg-transparent"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button
                  variant="outline"
                  className="border-teal text-teal hover:bg-teal hover:text-white bg-transparent"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Documents
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-teal/70">Total Properties</p>
                  <p className="text-3xl font-bold text-teal">{landlordData.totalProperties}</p>
                  <p className="text-xs text-teal/60 mt-1">{landlordData.totalUnits} total units</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-50">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-teal/70">Occupancy Rate</p>
                  <p className="text-3xl font-bold text-teal">{landlordData.occupancyRate}%</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +5% vs last month
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-green-50">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-teal/70">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-teal">{landlordData.monthlyRevenue}</p>
                  <p className="text-xs text-teal/60 mt-1">From all properties</p>
                </div>
                <div className="p-3 rounded-xl bg-gold/10">
                  <DollarSign className="h-6 w-6 text-gold" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-teal/70">Vacant Units</p>
                  <p className="text-3xl font-bold text-teal">
                    {properties.reduce((sum, p) => sum + p.vacantUnits, 0)}
                  </p>
                  <p className="text-xs text-teal/60 mt-1">Available for rent</p>
                </div>
                <div className="p-3 rounded-xl bg-orange-50">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Properties Section */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-teal font-serif">Property Portfolio</h2>
              <p className="text-teal/70">Manage and view all properties owned by {landlordData.name}</p>
            </div>

            <Button className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-white">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Filters */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-teal/40" />
                    <Input
                      placeholder="Search properties by name or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-stone/30 focus:border-gold focus:ring-gold/20"
                    />
                  </div>
                </div>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full md:w-48 border-stone/30 focus:border-gold focus:ring-gold/20">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Luxury Residential">Luxury Residential</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-48 border-stone/30 focus:border-gold focus:ring-gold/20">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Properties Grid */}
        <div className="grid gap-6">
          {filteredProperties.map((property) => (
            <Card
              key={property.id}
              className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Property Image */}
                  <div className="relative h-64 md:h-auto">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.name}
                      className="w-full h-full object-cover rounded-l-lg"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <Badge className={getStatusColor(property.status)}>{property.status}</Badge>
                      <Badge className="bg-teal/90 text-white">{property.type}</Badge>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="md:col-span-2 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-teal font-serif mb-1">{property.name}</h3>
                        <p className="text-sm text-teal/60 mb-2">{property.nameAr}</p>
                        <div className="flex items-center space-x-2 text-teal/70">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{property.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-teal/60">Monthly Revenue</p>
                        <p className="text-2xl font-bold text-gold">{property.monthlyRent}</p>
                      </div>
                    </div>

                    {/* Property Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-5 w-5 text-teal/60" />
                        <div>
                          <p className="text-xs text-teal/60">Total Units</p>
                          <p className="font-semibold text-teal">{property.totalUnits}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-xs text-teal/60">Occupied</p>
                          <p className="font-semibold text-teal">{property.occupiedUnits}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-5 w-5 text-orange-600" />
                        <div>
                          <p className="text-xs text-teal/60">Vacant</p>
                          <p className="font-semibold text-teal">{property.vacantUnits}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <TrendingUp className={`h-5 w-5 ${getOccupancyColor(property.occupancyRate)}`} />
                        <div>
                          <p className="text-xs text-teal/60">Occupancy</p>
                          <p className={`font-semibold ${getOccupancyColor(property.occupancyRate)}`}>
                            {property.occupancyRate}%
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Property Features */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-stone/20">
                      <div className="flex items-center space-x-2 text-teal/70">
                        <Square className="h-4 w-4" />
                        <span className="text-sm">{property.area}</span>
                      </div>
                      {property.bedrooms !== "N/A" && (
                        <div className="flex items-center space-x-2 text-teal/70">
                          <Bed className="h-4 w-4" />
                          <span className="text-sm">{property.bedrooms}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 text-teal/70">
                        <Bath className="h-4 w-4" />
                        <span className="text-sm">{property.bathrooms} Bath</span>
                      </div>
                      <div className="flex items-center space-x-2 text-teal/70">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">Built {property.yearBuilt}</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-teal mb-2">Amenities</p>
                      <div className="flex flex-wrap gap-2">
                        {property.amenities.map((amenity, index) => (
                          <Badge key={index} variant="outline" className="border-gold text-gold">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Maintenance Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-3 bg-stone/5 rounded-lg">
                      <div>
                        <p className="text-xs text-teal/60 mb-1">Maintenance Status</p>
                        <p className={`font-semibold capitalize ${getMaintenanceColor(property.maintenanceStatus)}`}>
                          {property.maintenanceStatus}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-teal/60 mb-1">Last Inspection</p>
                        <p className="font-semibold text-teal">{property.lastInspection}</p>
                      </div>
                      <div>
                        <p className="text-xs text-teal/60 mb-1">Next Inspection</p>
                        <p className="font-semibold text-teal flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {property.nextInspection}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-teal text-teal hover:bg-teal hover:text-white bg-transparent"
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gold text-gold hover:bg-gold hover:text-white bg-transparent"
                      >
                        View Tenants
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-coral text-coral hover:bg-coral hover:text-white bg-transparent"
                      >
                        Maintenance History
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-stone text-stone hover:bg-stone hover:text-white bg-transparent"
                      >
                        Financial Report
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Building2 className="h-16 w-16 text-teal/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-teal mb-2">No Properties Found</h3>
              <p className="text-teal/70 mb-4">
                No properties match your current filters. Try adjusting your search criteria.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setFilterType("all")
                  setFilterStatus("all")
                }}
                variant="outline"
                className="border-gold text-gold hover:bg-gold hover:text-white"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
