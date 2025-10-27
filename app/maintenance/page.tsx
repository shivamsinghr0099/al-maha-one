"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Wrench,
  Zap,
  Droplets,
  Hammer,
  Paintbrush,
  Bug,
  Home,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Upload,
  Calendar,
} from "lucide-react"
import Link from "next/link"

const maintenanceCategories = [
  {
    id: "ac",
    title: "AC Maintenance",
    icon: Home,
    color: "bg-blue-50 text-blue-600",
    services: [
      { name: "AC Cleaning", price: "AED 150", type: "paid" },
      { name: "AC Repair", price: "AED 200-500", type: "paid" },
      { name: "Filter Replacement", price: "AED 80", type: "paid" },
      { name: "Gas Refill", price: "AED 120", type: "paid" },
    ],
  },
  {
    id: "plumbing",
    title: "Plumbing",
    icon: Droplets,
    color: "bg-cyan-50 text-cyan-600",
    services: [
      { name: "Leak Repair", price: "AED 100-300", type: "paid" },
      { name: "Pipe Installation", price: "AED 200-600", type: "paid" },
      { name: "Drain Cleaning", price: "AED 120", type: "paid" },
      { name: "Faucet Repair", price: "AED 80", type: "paid" },
    ],
  },
  {
    id: "electrical",
    title: "Electrical",
    icon: Zap,
    color: "bg-yellow-50 text-yellow-600",
    services: [
      { name: "Switch/Socket Repair", price: "AED 50-100", type: "paid" },
      { name: "Light Installation", price: "AED 80-150", type: "paid" },
      { name: "Electrical Wiring", price: "AED 200-800", type: "paid" },
      { name: "Circuit Breaker", price: "AED 150-300", type: "paid" },
    ],
  },
  {
    id: "carpentry",
    title: "Carpentry",
    icon: Hammer,
    color: "bg-orange-50 text-orange-600",
    services: [
      { name: "Door Repair", price: "AED 100-250", type: "paid" },
      { name: "Cabinet Installation", price: "AED 300-800", type: "paid" },
      { name: "Shelf Mounting", price: "AED 80-150", type: "paid" },
      { name: "Window Repair", price: "AED 150-400", type: "paid" },
    ],
  },
  {
    id: "painting",
    title: "Painting",
    icon: Paintbrush,
    color: "bg-purple-50 text-purple-600",
    services: [
      { name: "Wall Painting", price: "AED 15-25/sqm", type: "paid" },
      { name: "Touch-up Paint", price: "AED 100-200", type: "paid" },
      { name: "Ceiling Paint", price: "AED 20-30/sqm", type: "paid" },
    ],
  },
  {
    id: "pest",
    title: "Pest Control",
    icon: Bug,
    color: "bg-green-50 text-green-600",
    services: [
      { name: "General Pest Control", price: "AED 200-400", type: "paid" },
      { name: "Termite Treatment", price: "AED 300-600", type: "paid" },
      { name: "Rodent Control", price: "AED 150-300", type: "paid" },
    ],
  },
]

const activeRequests = [
  {
    id: "REQ001",
    category: "AC Maintenance",
    service: "AC Cleaning",
    status: "in-progress",
    date: "2024-01-20",
    technician: "Ahmed Hassan",
    amount: "AED 150",
  },
  {
    id: "REQ002",
    category: "Plumbing",
    service: "Leak Repair",
    status: "scheduled",
    date: "2024-01-22",
    technician: "Mohammed Ali",
    amount: "AED 200",
  },
  {
    id: "REQ003",
    category: "Electrical",
    service: "Switch Repair",
    status: "completed",
    date: "2024-01-18",
    technician: "Omar Khalil",
    amount: "AED 80",
  },
]

export default function MaintenancePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("request")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "scheduled":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle
      case "in-progress":
        return Clock
      case "scheduled":
        return Calendar
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
              <Wrench className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">Home Services & Maintenance</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="request">New Request</TabsTrigger>
            <TabsTrigger value="history">My Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="request" className="space-y-6">
            {!selectedCategory ? (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">What do you need help with?</h2>
                  <p className="text-gray-600">Select a service category to get started</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {maintenanceCategories.map((category) => (
                    <Card
                      key={category.id}
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <CardContent className="p-6 text-center">
                        <div
                          className={`w-16 h-16 rounded-full ${category.color} mx-auto mb-4 flex items-center justify-center`}
                        >
                          <category.icon className="h-8 w-8" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
                        <p className="text-sm text-gray-600">{category.services.length} services available</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <ServiceRequestForm
                category={maintenanceCategories.find((c) => c.id === selectedCategory)!}
                onBack={() => setSelectedCategory(null)}
              />
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Maintenance Requests</h2>
              <Button onClick={() => setActiveTab("request")}>
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </div>

            <div className="space-y-4">
              {activeRequests.map((request) => {
                const StatusIcon = getStatusIcon(request.status)
                return (
                  <Card key={request.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{request.service}</h3>
                            <Badge className={getStatusColor(request.status)}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {request.status.replace("-", " ")}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">Category: {request.category}</p>
                          <p className="text-sm text-gray-600 mb-1">Request ID: {request.id}</p>
                          <p className="text-sm text-gray-600 mb-1">Technician: {request.technician}</p>
                          <p className="text-sm text-gray-600">Date: {request.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{request.amount}</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            View Details
                          </Button>
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

function ServiceRequestForm({
  category,
  onBack,
}: {
  category: (typeof maintenanceCategories)[0]
  onBack: () => void
}) {
  const [selectedService, setSelectedService] = useState("")
  const [description, setDescription] = useState("")
  const [preferredDate, setPreferredDate] = useState("")
  const [preferredTime, setPreferredTime] = useState("")
  const [priority, setPriority] = useState("normal")
  const [paymentMethod, setPaymentMethod] = useState("token")

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center`}>
          <category.icon className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
          <p className="text-gray-600">Submit your service request</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Request Form</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="service">Select Service</Label>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a service" />
              </SelectTrigger>
              <SelectContent>
                {category.services.map((service, index) => (
                  <SelectItem key={index} value={service.name}>
                    <div className="flex items-center justify-between w-full">
                      <span>{service.name}</span>
                      <span className="ml-4 text-sm text-gray-500">{service.price}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Please describe the issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Preferred Date</Label>
              <Input id="date" type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Preferred Time</Label>
              <Select value={preferredTime} onValueChange={setPreferredTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12PM - 4PM)</SelectItem>
                  <SelectItem value="evening">Evening (4PM - 8PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority Level</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - Can wait a few days</SelectItem>
                <SelectItem value="normal">Normal - Within 2-3 days</SelectItem>
                <SelectItem value="high">High - Within 24 hours</SelectItem>
                <SelectItem value="urgent">Urgent - Same day</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="token">Token Payment (Advance)</SelectItem>
                <SelectItem value="full">Full Payment Now</SelectItem>
                <SelectItem value="after">Pay After Service</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Upload Photos (Optional)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" onClick={onBack} className="flex-1">
              Back
            </Button>
            <Button className="flex-1">Submit Request</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
