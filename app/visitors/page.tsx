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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Users,
  QrCode,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Eye,
  Download,
  Upload,
  Phone,
  MapPin,
} from "lucide-react"
import Link from "next/link"

const visitorHistory = [
  {
    id: "VIS001",
    name: "Sarah Johnson",
    phone: "+971 50 123 4567",
    purpose: "Personal Visit",
    date: "2024-01-20",
    time: "14:30",
    status: "approved",
    passGenerated: true,
    entryTime: "14:35",
    exitTime: "16:20",
  },
  {
    id: "VIS002",
    name: "Ahmed Hassan",
    phone: "+971 55 987 6543",
    purpose: "Delivery",
    date: "2024-01-19",
    time: "10:00",
    status: "completed",
    passGenerated: true,
    entryTime: "10:05",
    exitTime: "10:15",
  },
  {
    id: "VIS003",
    name: "Maria Garcia",
    phone: "+971 52 456 7890",
    purpose: "Maintenance",
    date: "2024-01-22",
    time: "09:00",
    status: "pending",
    passGenerated: false,
  },
]

const upcomingVisitors = [
  {
    id: "VIS004",
    name: "John Smith",
    phone: "+971 50 111 2222",
    purpose: "Personal Visit",
    date: "2024-01-25",
    time: "15:00",
    status: "approved",
    passGenerated: true,
  },
  {
    id: "VIS005",
    name: "Lisa Wong",
    phone: "+971 55 333 4444",
    purpose: "Business Meeting",
    date: "2024-01-26",
    time: "11:30",
    status: "pending",
    passGenerated: false,
  },
]

export default function VisitorsPage() {
  const [activeTab, setActiveTab] = useState("add")
  const [showAddDialog, setShowAddDialog] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
      case "completed":
        return CheckCircle
      case "pending":
        return Clock
      case "rejected":
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
              <Users className="h-6 w-6 text-purple-600" />
              <h1 className="text-xl font-semibold text-gray-900">Visitor Management</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="add">Add Visitor</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="add" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Add New Visitor</h2>
              <p className="text-gray-600">Register your visitor for easy access</p>
            </div>

            <AddVisitorForm />
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Visitors</h2>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Visitor
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Visitor</DialogTitle>
                  </DialogHeader>
                  <AddVisitorForm onSuccess={() => setShowAddDialog(false)} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {upcomingVisitors.map((visitor) => {
                const StatusIcon = getStatusIcon(visitor.status)
                return (
                  <Card key={visitor.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{visitor.name}</h3>
                            <Badge className={getStatusColor(visitor.status)}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {visitor.status}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4" />
                              <span>{visitor.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {visitor.date} at {visitor.time}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4" />
                              <span>{visitor.purpose}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          {visitor.passGenerated && (
                            <Button variant="outline" size="sm">
                              <QrCode className="h-4 w-4 mr-2" />
                              View Pass
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Visitor History</h2>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            <div className="space-y-4">
              {visitorHistory.map((visitor) => {
                const StatusIcon = getStatusIcon(visitor.status)
                return (
                  <Card key={visitor.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{visitor.name}</h3>
                            <Badge className={getStatusColor(visitor.status)}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {visitor.status}
                            </Badge>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4" />
                                <span>{visitor.phone}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {visitor.date} at {visitor.time}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4" />
                                <span>{visitor.purpose}</span>
                              </div>
                            </div>
                            {visitor.entryTime && (
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4" />
                                  <span>Entry: {visitor.entryTime}</span>
                                </div>
                                {visitor.exitTime && (
                                  <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4" />
                                    <span>Exit: {visitor.exitTime}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Details
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

function AddVisitorForm({ onSuccess }: { onSuccess?: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    purpose: "",
    date: "",
    time: "",
    duration: "",
    notes: "",
    visitorType: "personal",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    onSuccess?.()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visitor Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter visitor's full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+971 50 123 4567"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="visitor@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="visitorType">Visitor Type</Label>
            <Select
              value={formData.visitorType}
              onValueChange={(value) => setFormData({ ...formData, visitorType: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal Visit</SelectItem>
                <SelectItem value="business">Business Meeting</SelectItem>
                <SelectItem value="delivery">Delivery</SelectItem>
                <SelectItem value="maintenance">Maintenance/Service</SelectItem>
                <SelectItem value="contractor">Contractor</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose of Visit</Label>
            <Textarea
              id="purpose"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              placeholder="Brief description of the visit purpose"
              rows={3}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Visit Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Visit Time *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Expected Duration</Label>
              <Select
                value={formData.duration}
                onValueChange={(value) => setFormData({ ...formData, duration: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30min">30 minutes</SelectItem>
                  <SelectItem value="1hour">1 hour</SelectItem>
                  <SelectItem value="2hours">2 hours</SelectItem>
                  <SelectItem value="halfday">Half day</SelectItem>
                  <SelectItem value="fullday">Full day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Upload Emirates ID (Required for first-time visitors)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload front and back of Emirates ID</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 5MB each</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any special instructions or notes"
              rows={3}
            />
          </div>

          <div className="flex space-x-4">
            <Button type="button" variant="outline" className="flex-1">
              Save as Draft
            </Button>
            <Button type="submit" className="flex-1">
              Submit Request
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
