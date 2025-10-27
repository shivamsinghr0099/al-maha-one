"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import {
  ArrowLeft,
  CableCarIcon as Elevator,
  CalendarIcon,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Package,
  Truck,
} from "lucide-react"
import Link from "next/link"

const timeSlots = ["08:00 - 10:00", "10:00 - 12:00", "12:00 - 14:00", "14:00 - 16:00", "16:00 - 18:00", "18:00 - 20:00"]

const myBookings = [
  {
    id: "LB001",
    date: "2024-01-25",
    timeSlot: "10:00 - 12:00",
    purpose: "Moving furniture",
    status: "confirmed",
    requestDate: "2024-01-20",
    cost: "AED 100",
    notes: "Moving sofa and dining table to unit",
  },
  {
    id: "LB002",
    date: "2024-01-28",
    timeSlot: "14:00 - 16:00",
    purpose: "Appliance delivery",
    status: "pending",
    requestDate: "2024-01-22",
    cost: "AED 100",
    notes: "Washing machine delivery from store",
  },
  {
    id: "LB003",
    date: "2024-01-20",
    timeSlot: "16:00 - 18:00",
    purpose: "Moving out items",
    status: "completed",
    requestDate: "2024-01-18",
    cost: "AED 100",
    notes: "Moving old furniture to storage",
  },
]

export default function LiftBookingPage() {
  const [activeTab, setActiveTab] = useState("book")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "confirmed":
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
      case "completed":
      case "confirmed":
        return CheckCircle
      case "pending":
        return Clock
      case "cancelled":
        return AlertCircle
      default:
        return Clock
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
              <Elevator className="h-6 w-6 text-indigo-600" />
              <h1 className="text-xl font-semibold text-gray-900">Lift Booking</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="book">Book Lift</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="info">Information</TabsTrigger>
          </TabsList>

          <TabsContent value="book" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Lift Usage</h2>
              <p className="text-gray-600">Reserve the service lift for moving furniture or large items</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calendar */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5" />
                    <span>Select Date</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 5 || date.getDay() === 6} // Disable past dates and weekends
                    className="rounded-md border"
                  />
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Lift booking is not available on weekends (Friday & Saturday)
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Time Slots */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Available Time Slots</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {timeSlots.map((slot) => (
                      <div
                        key={slot}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedTimeSlot === slot
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedTimeSlot(slot)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{slot}</span>
                          <Badge variant="secondary">Available</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">2-hour slot • AED 100</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            {selectedDate && selectedTimeSlot && (
              <Card>
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <LiftBookingForm selectedDate={selectedDate} selectedTimeSlot={selectedTimeSlot} />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Lift Bookings</h2>
              <Button onClick={() => setActiveTab("book")}>
                <Elevator className="h-4 w-4 mr-2" />
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
                            <h3 className="text-lg font-semibold text-gray-900">{booking.purpose}</h3>
                            <Badge className={getStatusColor(booking.status)}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Booking ID</p>
                              <p className="font-medium text-gray-900">{booking.id}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Date & Time</p>
                              <p className="font-medium text-gray-900">
                                {booking.date} • {booking.timeSlot}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Cost</p>
                              <p className="font-medium text-gray-900">{booking.cost}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Request Date</p>
                              <p className="font-medium text-gray-900">{booking.requestDate}</p>
                            </div>
                          </div>
                          {booking.notes && (
                            <div className="mt-3">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Notes:</span> {booking.notes}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          {booking.status === "pending" && (
                            <Button variant="outline" size="sm">
                              Cancel Booking
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="info" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Lift Booking Information</h2>
              <p className="text-gray-600">Rules, pricing, and guidelines for lift usage</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-700">Booking Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span>Maximum 2-hour booking slots</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span>Available Monday to Thursday only</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span>Operating hours: 8:00 AM - 8:00 PM</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span>48-hour advance booking required</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span>Resident must be present during usage</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700">Pricing & Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-green-800">Standard Rate</span>
                        <span className="text-xl font-bold text-green-600">AED 100</span>
                      </div>
                      <p className="text-sm text-green-700 mt-1">Per 2-hour slot</p>
                    </div>
                    <div className="text-sm space-y-2">
                      <p>• Payment required at time of booking</p>
                      <p>• Refundable if cancelled 24 hours in advance</p>
                      <p>• Additional charges for overtime usage</p>
                      <p>• Damage deposit may be required for large items</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Usage Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Package className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Furniture Moving</h4>
                    <p className="text-sm text-gray-600">
                      Moving furniture within the building or to/from storage areas
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Truck className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Appliance Delivery</h4>
                    <p className="text-sm text-gray-600">Receiving large appliances and electronic items</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Moving Services</h4>
                    <p className="text-sm text-gray-600">Professional moving company access for relocations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Important Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2">Safety Requirements</h4>
                    <p className="text-yellow-800">
                      All items must be properly secured during transport. Building management is not responsible for
                      damages during lift usage.
                    </p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-2">Prohibited Items</h4>
                    <p className="text-red-800">
                      Hazardous materials, oversized items exceeding lift capacity, and items that may damage the lift
                      interior are strictly prohibited.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Emergency Access</h4>
                    <p className="text-blue-800">
                      In case of emergencies, building management reserves the right to cancel bookings and use the
                      service lift for emergency purposes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function LiftBookingForm({
  selectedDate,
  selectedTimeSlot,
}: {
  selectedDate: Date
  selectedTimeSlot: string
}) {
  const [formData, setFormData] = useState({
    purpose: "",
    description: "",
    itemCount: "",
    assistanceNeeded: false,
    contactNumber: "",
    specialRequirements: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Lift booking submitted:", {
      ...formData,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="purpose">Purpose of Booking *</Label>
          <Select value={formData.purpose} onValueChange={(value) => setFormData({ ...formData, purpose: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select purpose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="furniture-moving">Furniture Moving</SelectItem>
              <SelectItem value="appliance-delivery">Appliance Delivery</SelectItem>
              <SelectItem value="moving-in">Moving In</SelectItem>
              <SelectItem value="moving-out">Moving Out</SelectItem>
              <SelectItem value="storage-access">Storage Access</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="itemCount">Number of Items</Label>
          <Select value={formData.itemCount} onValueChange={(value) => setFormData({ ...formData, itemCount: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select item count" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-3">1-3 items</SelectItem>
              <SelectItem value="4-6">4-6 items</SelectItem>
              <SelectItem value="7-10">7-10 items</SelectItem>
              <SelectItem value="10+">More than 10 items</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description of Items *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the items you'll be moving (e.g., sofa, dining table, washing machine)..."
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactNumber">Contact Number *</Label>
        <Input
          id="contactNumber"
          value={formData.contactNumber}
          onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
          placeholder="+971 50 123 4567"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialRequirements">Special Requirements</Label>
        <Textarea
          id="specialRequirements"
          value={formData.specialRequirements}
          onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
          placeholder="Any special requirements or assistance needed..."
          rows={2}
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="assistance"
          checked={formData.assistanceNeeded}
          onChange={(e) => setFormData({ ...formData, assistanceNeeded: e.target.checked })}
          className="rounded"
        />
        <Label htmlFor="assistance" className="text-sm">
          I need assistance from building staff (additional charges may apply)
        </Label>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">Booking Summary</h3>
        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Date:</span>
            <span>{selectedDate.toDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Time Slot:</span>
            <span>{selectedTimeSlot}</span>
          </div>
          <div className="flex justify-between">
            <span>Duration:</span>
            <span>2 hours</span>
          </div>
          <div className="flex justify-between font-medium text-gray-900 pt-2 border-t">
            <span>Total Cost:</span>
            <span>AED 100</span>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button type="button" variant="outline" className="flex-1">
          Save as Draft
        </Button>
        <Button type="submit" className="flex-1">
          Confirm Booking
        </Button>
      </div>
    </form>
  )
}
