"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Star,
  Building,
  Phone,
  Mail,
  Share2,
  Calendar,
  Car,
  Wifi,
  Shield,
  Zap,
  Trees,
  Dumbbell,
  Camera,
  ArrowLeft,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data - in a real app, this would come from an API
const property = {
  id: 1,
  title: "Modern Luxury Villa",
  location: "Beverly Hills, CA",
  price: "$2,500,000",
  type: "For Sale",
  category: "Residential",
  bedrooms: 4,
  bathrooms: 3,
  area: "3,200 sq ft",
  yearBuilt: 2020,
  lotSize: "0.5 acres",
  images: [
    "/placeholder.svg?height=600&width=800&text=Main+View",
    "/placeholder.svg?height=400&width=600&text=Living+Room",
    "/placeholder.svg?height=400&width=600&text=Kitchen",
    "/placeholder.svg?height=400&width=600&text=Master+Bedroom",
    "/placeholder.svg?height=400&width=600&text=Bathroom",
    "/placeholder.svg?height=400&width=600&text=Garden",
  ],
  rating: 4.8,
  description:
    "This stunning modern luxury villa offers the perfect blend of contemporary design and comfortable living. Located in the prestigious Beverly Hills area, this property features an open-concept layout with high-end finishes throughout. The gourmet kitchen boasts premium appliances and a large island perfect for entertaining. The master suite includes a walk-in closet and spa-like bathroom. Outside, you'll find a beautifully landscaped garden with a pool and outdoor entertainment area.",
  features: [
    "Swimming Pool",
    "Garage Parking",
    "High-Speed Internet",
    "Security System",
    "Solar Panels",
    "Garden/Landscaping",
    "Home Gym",
    "Smart Home Technology",
  ],
  agent: {
    name: "Sarah Johnson",
    title: "Senior Real Estate Agent",
    phone: "+1 (555) 123-4567",
    email: "sarah@mahaone.com",
    image: "/placeholder.svg?height=100&width=100&text=Agent",
    rating: 4.9,
    properties: 150,
  },
}

const featureIcons = {
  "Swimming Pool": Trees,
  "Garage Parking": Car,
  "High-Speed Internet": Wifi,
  "Security System": Shield,
  "Solar Panels": Zap,
  "Garden/Landscaping": Trees,
  "Home Gym": Dumbbell,
  "Smart Home Technology": Zap,
}

export default function PropertyDetailPage() {
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
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/properties">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative">
                <Image
                  src={property.images[0] || "/placeholder.svg"}
                  alt={property.title}
                  width={800}
                  height={600}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant={property.type === "For Sale" ? "default" : "secondary"}>{property.type}</Badge>
                  <Badge variant="outline">{property.category}</Badge>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="sm" variant="secondary">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <Button size="sm" variant="secondary" className="absolute bottom-4 right-4 gap-2">
                  <Camera className="h-4 w-4" />
                  View All Photos ({property.images.length})
                </Button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {property.images.slice(1).map((image, index) => (
                  <Image
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`Property view ${index + 2}`}
                    width={200}
                    height={150}
                    className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{property.rating}</span>
                  </div>
                </div>
                <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                <div className="flex items-center gap-1 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{property.location}</span>
                </div>
                <div className="text-3xl font-bold text-primary">{property.price}</div>
              </div>

              <div className="flex items-center gap-8 text-lg">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="h-5 w-5" />
                  <span>{property.area}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-2xl font-semibold mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </div>

              <Separator />

              <div>
                <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Property Type:</span>
                      <span className="font-medium">{property.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Year Built:</span>
                      <span className="font-medium">{property.yearBuilt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lot Size:</span>
                      <span className="font-medium">{property.lotSize}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bedrooms:</span>
                      <span className="font-medium">{property.bedrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bathrooms:</span>
                      <span className="font-medium">{property.bathrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Floor Area:</span>
                      <span className="font-medium">{property.area}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-2xl font-semibold mb-4">Features & Amenities</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {property.features.map((feature, index) => {
                    const IconComponent = featureIcons[feature as keyof typeof featureIcons] || Building
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <IconComponent className="h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Agent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={property.agent.image || "/placeholder.svg"} alt={property.agent.name} />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{property.agent.name}</h3>
                    <p className="text-sm text-muted-foreground">{property.agent.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">
                        {property.agent.rating} ({property.agent.properties} properties)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full gap-2">
                    <Phone className="h-4 w-4" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Mail className="h-4 w-4" />
                    Send Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Tour */}
            <Card>
              <CardHeader>
                <CardTitle>Schedule a Tour</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Name</label>
                  <Input placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input type="tel" placeholder="Enter your phone" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Preferred Date</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea placeholder="Any specific requirements..." />
                </div>
                <Button className="w-full gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule Tour
                </Button>
              </CardContent>
            </Card>

            {/* Mortgage Calculator */}
            <Card>
              <CardHeader>
                <CardTitle>Mortgage Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Loan Amount</label>
                  <Input placeholder="$2,000,000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Interest Rate (%)</label>
                  <Input placeholder="3.5" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Loan Term (years)</label>
                  <Input placeholder="30" />
                </div>
                <Button variant="outline" className="w-full">
                  Calculate Payment
                </Button>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">$8,988</div>
                  <div className="text-sm text-muted-foreground">Monthly Payment</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
