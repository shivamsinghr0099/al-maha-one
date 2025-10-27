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
  Car,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  CreditCard,
  Key,
  Camera,
  Shield,
} from "lucide-react"
import Link from "next/link"

const parkingSpaces = [
  {
    id: "P-A101",
    level: "Basement Level 1",
    type: "Assigned",
    status: "occupied",
    unit: "Villa A-101",
    vehicle: "Toyota Camry - ABC 1234",
    validUntil: "2024-12-31",
  },
  {
    id: "P-A102",
    level: "Basement Level 1",
    type: "Visitor",
    status: "available",
    unit: "-",
    vehicle: "-",
    validUntil: "-",
  },
]

const parkingRequests = [
  {
    id: "PR001",
    type: "Additional Space",
    status: "pending",
    requestDate: "2024-01-20",
    space: "P-A103",
    reason: "Second vehicle",
    amount: "AED 200/month",
  },
  {
    id: "PR002",
    type: "Access Card Replacement",
    status: "approved",
    requestDate: "2024-01-18",
    space: "P-A101",
    reason: "Lost card",
    amount: "AED 50",
  },
]

const violations = [
  {
    id: "PV001",
    type: "Unauthorized Parking",
    date: "2024-01-19",
    time: "14:30",
    location: "Visitor Space V-05",
    fine: "AED 200",
    status: "unpaid",
    description: "Vehicle parked in visitor space without permit",
    evidence: "/placeholder.svg?height=200&width=300&text=Violation+Photo",
  },
  {
    id: "PV002",
    type: "Expired Permit",
    date: "2024-01-15",
    time: "09:15",
    location: "P-A101",
    fine: "AED 100",
    status: "paid",
    description: "Parking with expired access card",
    evidence: "/placeholder.svg?height=200&width=300&text=Expired+Permit",
  },
]

export default function ParkingPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "occupied":
        return "bg-red-100 text-red-800"
      case "available":
        return "bg-green-100 text-green-800"
      case "reserved":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "paid":
        return "bg-blue-100 text-blue-800"
      case "unpaid":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
      case "paid":
        return CheckCircle
      case "pending":
        return Clock
      case "rejected":
      case "unpaid":
        return XCircle
      default:
        return AlertTriangle
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
              <Car className="h-6 w-6 text-indigo-600" />
              <h1 className="text-xl font-semibold text-gray-900">Parking Management</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="violations">Violations</TabsTrigger>
            <TabsTrigger value="access-cards">Access Cards</TabsTrigger>
            <TabsTrigger value="new-request">New Request</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Assigned Spaces</p>
                      <p className="text-2xl font-bold text-blue-600">1</p>
                    </div>
                    <Car className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Violations</p>
                      <p className="text-2xl font-bold text-red-600">1</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Outstanding Fines</p>
                      <p className="text-2xl font-bold text-orange-600">AED 200</p>
                    </div>
                    <CreditCard className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>My Parking Spaces</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {parkingSpaces.map((space) => (
                    <div key={space.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Car className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{space.id}</h3>
                          <p className="text-sm text-gray-600">{space.level}</p>
                          <p className="text-sm text-gray-600">
                            {space.type} • {space.unit !== "-" ? `Unit: ${space.unit}` : "Available for visitors"}
                          </p>
                          {space.vehicle !== "-" && <p className="text-sm text-gray-500">Vehicle: {space.vehicle}</p>}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(space.status)}>{space.status}</Badge>
                        {space.validUntil !== "-" && (
                          <p className="text-sm text-gray-500 mt-1">Valid until: {space.validUntil}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Parking Requests</h2>
              <Button onClick={() => setActiveTab("new-request")}>
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </div>

            <div className="space-y-4">
              {parkingRequests.map((request) => {
                const StatusIcon = getStatusIcon(request.status)
                return (
                  <Card key={request.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{request.type}</h3>
                            <Badge className={getStatusColor(request.status)}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {request.status}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p>Request ID: {request.id}</p>
                            <p>Date: {request.requestDate}</p>
                            <p>Space: {request.space}</p>
                            <p>Reason: {request.reason}</p>
                          </div>
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

          <TabsContent value="violations" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Parking Violations</h2>
              <Button variant="outline">
                <Shield className="h-4 w-4 mr-2" />
                Appeal Violation
              </Button>
            </div>

            <div className="space-y-4">
              {violations.map((violation) => {
                const StatusIcon = getStatusIcon(violation.status)
                return (
                  <Card key={violation.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{violation.type}</h3>
                            <Badge className={getStatusColor(violation.status)}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {violation.status}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600 mb-3">
                            <p>Violation ID: {violation.id}</p>
                            <p>
                              Date & Time: {violation.date} at {violation.time}
                            </p>
                            <p>Location: {violation.location}</p>
                            <p>Description: {violation.description}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Button variant="outline" size="sm">
                              <Camera className="h-4 w-4 mr-1" />
                              View Evidence
                            </Button>
                            {violation.status === "unpaid" && (
                              <Button size="sm">
                                <CreditCard className="h-4 w-4 mr-1" />
                                Pay Fine
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-red-600">{violation.fine}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="access-cards" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Cards Management</h2>
              <p className="text-gray-600">Manage your parking access cards and request replacements</p>
            </div>

            <AccessCardsSection />
          </TabsContent>

          <TabsContent value="new-request" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">New Parking Request</h2>
              <p className="text-gray-600">Submit a new parking-related request</p>
            </div>

            <ParkingRequestForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function AccessCardsSection() {
  const accessCards = [
    {
      id: "AC001",
      type: "Primary Access Card",
      cardNumber: "****1234",
      status: "active",
      issuedDate: "2024-01-01",
      expiryDate: "2024-12-31",
      spaces: ["P-A101"],
    },
    {
      id: "AC002",
      type: "Visitor Access Card",
      cardNumber: "****5678",
      status: "inactive",
      issuedDate: "2023-12-15",
      expiryDate: "2024-01-15",
      spaces: ["Visitor Spaces"],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {accessCards.map((card) => (
          <Card key={card.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Key className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{card.type}</h3>
                    <p className="text-sm text-gray-600">Card: {card.cardNumber}</p>
                    <p className="text-sm text-gray-600">
                      Valid: {card.issuedDate} to {card.expiryDate}
                    </p>
                    <p className="text-sm text-gray-500">Access to: {card.spaces.join(", ")}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge className={getStatusColor(card.status)}>{card.status}</Badge>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Deactivate
                    </Button>
                    <Button variant="outline" size="sm">
                      Replace
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6 text-center">
          <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Request New Access Card</h3>
          <p className="text-gray-600 mb-4">Need an additional access card for family members or visitors?</p>
          <Button>Request New Card</Button>
        </CardContent>
      </Card>
    </div>
  )
}

function ParkingRequestForm() {
  const [requestType, setRequestType] = useState("")
  const [formData, setFormData] = useState({
    reason: "",
    vehicleDetails: "",
    duration: "",
    specialRequests: "",
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="requestType">Request Type</Label>
          <Select value={requestType} onValueChange={setRequestType}>
            <SelectTrigger>
              <SelectValue placeholder="Select request type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="additional-space">Additional Parking Space</SelectItem>
              <SelectItem value="visitor-permit">Visitor Parking Permit</SelectItem>
              <SelectItem value="access-card">Access Card Replacement</SelectItem>
              <SelectItem value="space-change">Parking Space Change</SelectItem>
              <SelectItem value="temporary-permit">Temporary Parking Permit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason">Reason for Request</Label>
          <Textarea
            id="reason"
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            placeholder="Please explain why you need this parking service..."
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vehicleDetails">Vehicle Details</Label>
          <Input
            id="vehicleDetails"
            value={formData.vehicleDetails}
            onChange={(e) => setFormData({ ...formData, vehicleDetails: e.target.value })}
            placeholder="Make, Model, Color, Plate Number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (if temporary)</Label>
          <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-week">1 Week</SelectItem>
              <SelectItem value="1-month">1 Month</SelectItem>
              <SelectItem value="3-months">3 Months</SelectItem>
              <SelectItem value="6-months">6 Months</SelectItem>
              <SelectItem value="permanent">Permanent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialRequests">Special Requests</Label>
          <Textarea
            id="specialRequests"
            value={formData.specialRequests}
            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
            placeholder="Any special requirements or preferences..."
            rows={3}
          />
        </div>

        <div className="flex space-x-4">
          <Button variant="outline" className="flex-1">
            Save as Draft
          </Button>
          <Button className="flex-1">Submit Request</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "inactive":
      return "bg-gray-100 text-gray-800"
    case "expired":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
