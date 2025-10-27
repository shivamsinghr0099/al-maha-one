"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building,
  Heart,
  Eye,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Bed,
  Bath,
  Square,
  Star,
  TrendingUp,
  Users,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const userProperties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    location: "Beverly Hills, CA",
    price: "$2,500,000",
    type: "For Sale",
    status: "Active",
    bedrooms: 4,
    bathrooms: 3,
    area: "3,200 sq ft",
    image: "/placeholder.svg?height=200&width=300&text=Luxury+Villa",
    views: 245,
    inquiries: 12,
    dateAdded: "2024-01-15",
  },
  {
    id: 2,
    title: "Downtown Apartment",
    location: "Manhattan, NY",
    price: "$4,500/month",
    type: "For Rent",
    status: "Rented",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,200 sq ft",
    image: "/placeholder.svg?height=200&width=300&text=Downtown+Apartment",
    views: 189,
    inquiries: 8,
    dateAdded: "2024-01-10",
  },
]

const favoriteProperties = [
  {
    id: 3,
    title: "Cozy Family Home",
    location: "Austin, TX",
    price: "$450,000",
    type: "For Sale",
    bedrooms: 3,
    bathrooms: 2,
    area: "1,800 sq ft",
    image: "/placeholder.svg?height=200&width=300&text=Family+Home",
    rating: 4.5,
  },
  {
    id: 4,
    title: "Luxury Penthouse",
    location: "Miami, FL",
    price: "$1,200,000",
    type: "For Sale",
    bedrooms: 3,
    bathrooms: 3,
    area: "2,200 sq ft",
    image: "/placeholder.svg?height=200&width=300&text=Luxury+Penthouse",
    rating: 4.9,
  },
]

const recentInquiries = [
  {
    id: 1,
    propertyTitle: "Modern Luxury Villa",
    inquirerName: "John Smith",
    email: "john@example.com",
    message: "I'm interested in scheduling a viewing for this property.",
    date: "2024-01-20",
    status: "New",
  },
  {
    id: 2,
    propertyTitle: "Downtown Apartment",
    inquirerName: "Sarah Johnson",
    email: "sarah@example.com",
    message: "Is this property still available for rent?",
    date: "2024-01-19",
    status: "Responded",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

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
              <Link href="/properties" className="text-foreground hover:text-primary transition-colors">
                Properties
              </Link>
              <Link href="/dashboard" className="text-primary font-medium">
                Dashboard
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40&text=User" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, John Doe</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Property
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">My Properties</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">+1 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">434</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">20</div>
                  <p className="text-xs text-muted-foreground">+5 this week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$54,000</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Properties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userProperties.slice(0, 2).map((property) => (
                    <div key={property.id} className="flex items-center gap-4">
                      <Image
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        width={60}
                        height={60}
                        className="rounded object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{property.title}</h4>
                        <p className="text-sm text-muted-foreground">{property.location}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={property.status === "Active" ? "default" : "secondary"}>
                            {property.status}
                          </Badge>
                          <span className="text-sm font-medium">{property.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Inquiries</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentInquiries.slice(0, 2).map((inquiry) => (
                    <div key={inquiry.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{inquiry.inquirerName}</h4>
                        <Badge variant={inquiry.status === "New" ? "default" : "secondary"}>{inquiry.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{inquiry.propertyTitle}</p>
                      <p className="text-sm">{inquiry.message}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="properties" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">My Properties</h2>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Property
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden">
                  <div className="relative">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <Badge
                      className="absolute top-4 left-4"
                      variant={property.type === "For Sale" ? "default" : "secondary"}
                    >
                      {property.type}
                    </Badge>
                    <Badge
                      className="absolute top-4 right-4"
                      variant={property.status === "Active" ? "default" : "secondary"}
                    >
                      {property.status}
                    </Badge>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{property.title}</h3>
                    <div className="flex items-center gap-1 text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{property.location}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="h-4 w-4" />
                        <span>{property.area}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-lg font-bold text-primary">{property.price}</div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        <span>{property.views}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <h2 className="text-2xl font-semibold">Favorite Properties</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden">
                  <div className="relative">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <Badge
                      className="absolute top-4 left-4"
                      variant={property.type === "For Sale" ? "default" : "secondary"}
                    >
                      {property.type}
                    </Badge>
                    <Button size="sm" variant="secondary" className="absolute top-4 right-4">
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </Button>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{property.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-semibold mb-2">{property.title}</h3>
                    <div className="flex items-center gap-1 text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{property.location}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="h-4 w-4" />
                        <span>{property.area}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-primary">{property.price}</div>
                      <Button asChild>
                        <Link href={`/properties/${property.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inquiries" className="space-y-6">
            <h2 className="text-2xl font-semibold">Property Inquiries</h2>

            <div className="space-y-4">
              {recentInquiries.map((inquiry) => (
                <Card key={inquiry.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{inquiry.inquirerName}</h3>
                        <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                        <p className="text-sm text-muted-foreground">Property: {inquiry.propertyTitle}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={inquiry.status === "New" ? "default" : "secondary"}>{inquiry.status}</Badge>
                        <span className="text-sm text-muted-foreground">{inquiry.date}</span>
                      </div>
                    </div>

                    <p className="mb-4">{inquiry.message}</p>

                    <div className="flex gap-2">
                      <Button size="sm">Reply</Button>
                      <Button size="sm" variant="outline">
                        Mark as Read
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-semibold">Account Settings</h2>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" placeholder="Tell us about yourself..." />
                  </div>
                  <Button>Update Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="notifications">Email Notifications</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Notifications</SelectItem>
                        <SelectItem value="important">Important Only</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="pst">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">Pacific Standard Time</SelectItem>
                        <SelectItem value="est">Eastern Standard Time</SelectItem>
                        <SelectItem value="cst">Central Standard Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Save Preferences</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
