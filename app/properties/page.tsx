"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, MapPin, Bed, Bath, Square, Heart, Star, Filter, Grid, List, Building } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const properties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    location: "Beverly Hills, CA",
    price: 2500000,
    priceText: "$2,500,000",
    type: "For Sale",
    category: "Residential",
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    areaText: "3,200 sq ft",
    image: "/placeholder.svg?height=300&width=400&text=Luxury+Villa",
    rating: 4.8,
    featured: true,
  },
  {
    id: 2,
    title: "Downtown Apartment",
    location: "Manhattan, NY",
    price: 4500,
    priceText: "$4,500/month",
    type: "For Rent",
    category: "Residential",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    areaText: "1,200 sq ft",
    image: "/placeholder.svg?height=300&width=400&text=Downtown+Apartment",
    rating: 4.6,
    featured: false,
  },
  {
    id: 3,
    title: "Commercial Office Space",
    location: "Silicon Valley, CA",
    price: 8000,
    priceText: "$8,000/month",
    type: "For Rent",
    category: "Commercial",
    bedrooms: 0,
    bathrooms: 2,
    area: 2500,
    areaText: "2,500 sq ft",
    image: "/placeholder.svg?height=300&width=400&text=Office+Space",
    rating: 4.7,
    featured: false,
  },
  {
    id: 4,
    title: "Cozy Family Home",
    location: "Austin, TX",
    price: 450000,
    priceText: "$450,000",
    type: "For Sale",
    category: "Residential",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    areaText: "1,800 sq ft",
    image: "/placeholder.svg?height=300&width=400&text=Family+Home",
    rating: 4.5,
    featured: false,
  },
  {
    id: 5,
    title: "Luxury Penthouse",
    location: "Miami, FL",
    price: 1200000,
    priceText: "$1,200,000",
    type: "For Sale",
    category: "Luxury",
    bedrooms: 3,
    bathrooms: 3,
    area: 2200,
    areaText: "2,200 sq ft",
    image: "/placeholder.svg?height=300&width=400&text=Luxury+Penthouse",
    rating: 4.9,
    featured: true,
  },
  {
    id: 6,
    title: "Studio Apartment",
    location: "Chicago, IL",
    price: 1800,
    priceText: "$1,800/month",
    type: "For Rent",
    category: "Residential",
    bedrooms: 0,
    bathrooms: 1,
    area: 600,
    areaText: "600 sq ft",
    image: "/placeholder.svg?height=300&width=400&text=Studio+Apartment",
    rating: 4.3,
    featured: false,
  },
]

export default function PropertiesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 3000000])
  const [propertyType, setPropertyType] = useState("all")
  const [category, setCategory] = useState("all")
  const [bedrooms, setBedrooms] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1]
    const matchesType = propertyType === "all" || property.type === propertyType
    const matchesCategory = category === "all" || property.category === category
    const matchesBedrooms = bedrooms === "all" || property.bedrooms.toString() === bedrooms

    return matchesSearch && matchesPrice && matchesType && matchesCategory && matchesBedrooms
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">Maha One</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/properties" className="text-primary font-medium">
                Properties
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search properties..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <Card className="p-6 mb-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Property Type</label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="For Sale">For Sale</SelectItem>
                      <SelectItem value="For Rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Residential">Residential</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Bedrooms</label>
                  <Select value={bedrooms} onValueChange={setBedrooms}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="0">Studio</SelectItem>
                      <SelectItem value="1">1 Bedroom</SelectItem>
                      <SelectItem value="2">2 Bedrooms</SelectItem>
                      <SelectItem value="3">3 Bedrooms</SelectItem>
                      <SelectItem value="4">4+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={3000000}
                    min={0}
                    step={50000}
                    className="mt-2"
                  />
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Properties ({filteredProperties.length} found)</h1>
          <Select defaultValue="newest">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Properties Grid/List */}
        <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
          {filteredProperties.map((property) => (
            <Card
              key={property.id}
              className={`overflow-hidden hover:shadow-lg transition-shadow ${viewMode === "list" ? "flex" : ""}`}
            >
              <div className={`relative ${viewMode === "list" ? "w-80 flex-shrink-0" : ""}`}>
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  width={400}
                  height={300}
                  className={`object-cover ${viewMode === "list" ? "w-full h-full" : "w-full h-48"}`}
                />
                <Badge
                  className="absolute top-4 left-4"
                  variant={property.type === "For Sale" ? "default" : "secondary"}
                >
                  {property.type}
                </Badge>
                {property.featured && <Badge className="absolute top-4 right-12 bg-yellow-500">Featured</Badge>}
                <Button size="sm" variant="secondary" className="absolute top-4 right-4">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <CardContent className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{property.rating}</span>
                  </div>
                  <Badge variant="outline">{property.category}</Badge>
                </div>

                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <div className="flex items-center gap-1 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{property.location}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      <span>{property.bedrooms} Beds</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="h-4 w-4" />
                    <span>{property.areaText}</span>
                  </div>
                </div>

                <div className={`flex items-center ${viewMode === "list" ? "justify-between" : "justify-between"}`}>
                  <div className="text-2xl font-bold text-primary">{property.priceText}</div>
                  <Button asChild>
                    <Link href={`/properties/${property.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No properties found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
