"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import {
  ArrowLeft,
  CalendarIcon,
  Clock,
  Users,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Dumbbell,
  Waves,
  UtensilsCrossed,
  Home,
  Car,
  TreePine,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const amenities = [
  {
    id: "gym",
    name: "Fitness Center",
    icon: Dumbbell,
    color: "bg-red-50 text-red-600",
    price: "Free",
    capacity: "20 people",
    hours: "6:00 AM - 10:00 PM",
    description: "Fully equipped gym with modern cardio and strength training equipment",
    image: "/placeholder.svg?height=200&width=300&text=Fitness+Center",
    features: ["Cardio Equipment", "Weight Training", "Personal Training Available"],
    bookingSlots: [
      "06:00-08:00",
      "08:00-10:00",
      "10:00-12:00",
      "14:00-16:00",
      "16:00-18:00",
      "18:00-20:00",
      "20:00-22:00",
    ],
  },
  {
    id: "pool",
    name: "Swimming Pool",
    icon: Waves,
    color: "bg-blue-50 text-blue-600",
    price: "AED 25/hour",
    capacity: "15 people",
    hours: "7:00 AM - 9:00 PM",
    description: "Olympic-size swimming pool with separate children's area",
    image: "/placeholder.svg?height=200&width=300&text=Swimming+Pool",
    features: ["Olympic Size", "Children's Pool", "Lifeguard on Duty"],
    bookingSlots: [
      "07:00-09:00",
      "09:00-11:00",
      "11:00-13:00",
      "14:00-16:00",
      "16:00-18:00",
      "18:00-20:00",
      "20:00-21:00",
    ],
  },
  {
    id: "function-room",
    name: "Function Room",
    icon: Home,
    color: "bg-purple-50 text-purple-600",
    price: "AED 200/hour",
    capacity: "50 people",
    hours: "9:00 AM - 11:00 PM",
    description: "Spacious function room perfect for events and gatherings",
    image: "/placeholder.svg?height=200&width=300&text=Function+Room",
    features: ["Audio/Visual Equipment", "Catering Allowed", "Air Conditioned"],
    bookingSlots: ["09:00-12:00", "12:00-15:00", "15:00-18:00", "18:00-21:00", "21:00-23:00"],
  },
  {
    id: "bbq-area",
    name: "BBQ Area",
    icon: UtensilsCrossed,
    color: "bg-orange-50 text-orange-600",
    price: "AED 100/session",
    capacity: "25 people",
    hours: "4:00 PM - 11:00 PM",
    description: "Outdoor BBQ area with grills and seating arrangements",
    image: "/placeholder.svg?height=200&width=300&text=BBQ+Area",
    features: ["Gas Grills", "Outdoor Seating", "Cleaning Service"],
    bookingSlots: ["16:00-19:00", "19:00-22:00", "22:00-23:00"],
  },
  {
    id: "playground",
    name: "Children's Playground",
    icon: TreePine,
    color: "bg-green-50 text-green-600",
    price: "Free",
    capacity: "Unlimited",
    hours: "6:00 AM - 8:00 PM",
    description: "Safe and fun playground area for children of all ages",
    image: "/placeholder.svg?height=200&width=300&text=Playground",
    features: ["Age-Appropriate Equipment", "Soft Play Area", "Shaded Seating"],
    bookingSlots: ["06:00-10:00", "10:00-14:00", "14:00-18:00", "18:00-20:00"],
  },
  {
    id: "tennis-court",
    name: "Tennis Court",
    icon: Car,
    color: "bg-yellow-50 text-yellow-600",
    price: "AED 50/hour",
    capacity: "4 people",
    hours: "6:00 AM - 10:00 PM",
    description: "Professional tennis court with equipment rental available",
    image: "/placeholder.svg?height=200&width=300&text=Tennis+Court",
    features: ["Professional Court", "Equipment Rental", "Lighting Available"],
    bookingSlots: [
      "06:00-08:00",
      "08:00-10:00",
      "10:00-12:00",
      "14:00-16:00",
      "16:00-18:00",
      "18:00-20:00",
      "20:00-22:00",
    ],
  },
]

const myBookings = [
  {
    id: "BOOK001",
    amenity: "Swimming Pool",
    date: "2024-01-25",
    time: "16:00-18:00",
    status: "confirmed",
    amount: "AED 50",
    guests: 3,
  },
  {
    id: "BOOK002",
    amenity: "Function Room",
    date: "2024-01-28",
    time: "18:00-21:00",
    status: "pending",
    amount: "AED 600",
    guests: 25,
  },
  {
    id: "BOOK003",
    amenity: "Fitness Center",
    date: "2024-01-22",
    time: "08:00-10:00",
    status: "completed",
    amount: "Free",
    guests: 1,
  },
]

export default function AmenitiesPage() {
  const [activeTab, setActiveTab] = useState("browse")
  const [selectedAmenity, setSelectedAmenity] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
      case "completed":
        return CheckCircle
      case "pending":
        return Clock
      case "cancelled":
        return XCircle
      default:
        return AlertCircle
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <CalendarIcon className="h-6 w-6 text-green-600" />
              <h1 className="text-xl font-semibold text-gray-900">Amenities Booking</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">Browse Amenities</TabsTrigger>
            <TabsTrigger value="book">Book Now</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Community Amenities</h2>
              <p className="text-gray-600">Discover and book our premium facilities</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {amenities.map((amenity) => (
                <Card key={amenity.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={amenity.image || "/placeholder.svg"}
                      alt={amenity.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90">
                        {amenity.price}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-10 h-10 rounded-full ${amenity.color} flex items-center justify-center`}>
                        <amenity.icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{amenity.name}</h3>
                    </div>

                    <p className="text-gray-600 mb-4">{amenity.description}</p>

                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>Capacity: {amenity.capacity}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Hours: {amenity.hours}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4" />
                        <span>Price: {amenity.price}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {amenity.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => {
                        setSelectedAmenity(amenity.id)
                        setActiveTab("book")
                      }}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="book" className="space-y-6">
            {selectedAmenity ? (
              <BookingForm
                amenity={amenities.find((a) => a.id === selectedAmenity)!}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                onBack={() => setSelectedAmenity(null)}
              />
            ) : (
              <div className="text-center py-12">
                <CalendarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select an Amenity</h3>
                <p className="text-gray-600 mb-4">Choose an amenity from the browse section to start booking</p>
                <Button onClick={() => setActiveTab("browse")}>Browse Amenities</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
              <Button onClick={() => setActiveTab("browse")}>
                <Plus className="h-4 w-4 mr-2" />
                New Booking
              </Button>
            </div>

            <div className="space-y-4">
              {myBookings.map((booking) => {
                const StatusIcon = getStatusIcon(booking.status)
                return (
                  <Card key={booking.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{booking.amenity}</h3>
                            <Badge className={getStatusColor(booking.status)}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{booking.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{booking.time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4" />
                              <span>
                                {booking.guests} guest{booking.guests > 1 ? "s" : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{booking.amount}</p>
                          <div className="flex space-x-2 mt-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            {booking.status === "confirmed" && (
                              <Button variant="outline" size="sm">
                                Cancel
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function BookingForm({
  amenity,
  selectedDate,
  onDateChange,
  onBack,
}: {
  amenity: (typeof amenities)[0]
  selectedDate: Date | undefined
  onDateChange: (date: Date | undefined) => void
  onBack: () => void
}) {
  const [selectedSlot, setSelectedSlot] = useState("")
  const [guests, setGuests] = useState("1")
  const [specialRequests, setSpecialRequests] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Booking submitted:", {
      amenity: amenity.id,
      date: selectedDate,
      slot: selectedSlot,
      guests,
      specialRequests,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className={`w-12 h-12 rounded-full ${amenity.color} flex items-center justify-center`}>
          <amenity.icon className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{amenity.name}</h2>
          <p className="text-gray-600">Complete your booking</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Select Date & Time</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-3 block">Choose Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={onDateChange}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </div>

            <div>
              <Label htmlFor="slot" className="text-base font-medium">
                Available Time Slots
              </Label>
              <Select value={selectedSlot} onValueChange={setSelectedSlot}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  {amenity.bookingSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="guests">Number of Guests</Label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} guest{num > 1 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="requests">Special Requests (Optional)</Label>
                <textarea
                  id="requests"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Any special requirements or requests..."
                  className="mt-2 w-full p-3 border border-gray-300 rounded-md resize-none"
                  rows={4}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Booking Summary</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Amenity:</span>
                    <span>{amenity.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{selectedDate?.toDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span>{selectedSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests:</span>
                    <span>{guests}</span>
                  </div>
                  <div className="flex justify-between font-medium text-gray-900 pt-2 border-t">
                    <span>Total:</span>
                    <span>{amenity.price}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                  Back
                </Button>
                <Button type="submit" className="flex-1" disabled={!selectedDate || !selectedSlot}>
                  Confirm Booking
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
