"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  HardHat,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  FileText,
  Phone,
  Calendar,
  User,
} from "lucide-react"
import Link from "next/link"

const contractorRequests = [
  {
    id: "CP001",
    companyName: "Elite Construction Co.",
    contactPerson: "Ahmed Hassan",
    phone: "+971 50 123 4567",
    date: "2024-01-25",
    time: "09:00 - 17:00",
    scopeOfWork: "Bathroom renovation and tiling work",
    status: "approved",
    requestDate: "2024-01-20",
    tradeLicense: "TL123456789",
  },
  {
    id: "CP002",
    companyName: "Smart Tech Solutions",
    contactPerson: "Sarah Johnson",
    phone: "+971 55 987 6543",
    date: "2024-01-28",
    time: "10:00 - 16:00",
    scopeOfWork: "Smart home automation installation",
    status: "pending",
    requestDate: "2024-01-22",
    tradeLicense: "TL987654321",
  },
  {
    id: "CP003",
    companyName: "Perfect Paint Pro",
    contactPerson: "Mohammed Ali",
    phone: "+971 52 456 7890",
    date: "2024-01-20",
    time: "08:00 - 18:00",
    scopeOfWork: "Complete unit painting - interior walls",
    status: "completed",
    requestDate: "2024-01-15",
    tradeLicense: "TL456789123",
  },
]

export default function ContractorPermitPage() {
  const [activeTab, setActiveTab] = useState("new-request")
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    phone: "",
    date: "",
    time: "",
    scopeOfWork: "",
    tradeLicense: "",
    specialRequirements: "",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "approved":
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
      case "completed":
      case "approved":
        return CheckCircle
      case "pending":
        return Clock
      case "rejected":
        return AlertCircle
      default:
        return Clock
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contractor permit request submitted:", formData)
    alert("Contractor permit request submitted successfully!")
    setFormData({
      companyName: "",
      contactPerson: "",
      phone: "",
      date: "",
      time: "",
      scopeOfWork: "",
      tradeLicense: "",
      specialRequirements: "",
    })
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
              <HardHat className="h-6 w-6 text-orange-600" />
              <h1 className="text-xl font-semibold text-gray-900">Contractor Access Permit</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new-request">New Request</TabsTrigger>
            <TabsTrigger value="request-logs">Request Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="new-request" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Contractor Access Permit</h2>
              <p className="text-gray-600">Submit a request for contractor access to your unit</p>
            </div>

            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HardHat className="h-5 w-5 text-orange-600" />
                  <span>Contractor Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-gray-700 font-medium">
                        Company Name *
                      </Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Enter company name"
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-200"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactPerson" className="text-gray-700 font-medium">
                        Contact Person Name *
                      </Label>
                      <Input
                        id="contactPerson"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        placeholder="Enter contact person name"
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-200"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700 font-medium">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+971 50 123 4567"
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-200"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tradeLicense" className="text-gray-700 font-medium">
                        Trade License Number *
                      </Label>
                      <Input
                        id="tradeLicense"
                        value={formData.tradeLicense}
                        onChange={(e) => setFormData({ ...formData, tradeLicense: e.target.value })}
                        placeholder="Enter trade license number"
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-200"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-gray-700 font-medium">
                        Date & Time *
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-200"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-gray-700 font-medium">
                        Working Hours *
                      </Label>
                      <Input
                        id="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        placeholder="e.g., 09:00 - 17:00"
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scopeOfWork" className="text-gray-700 font-medium">
                      Scope of Work *
                    </Label>
                    <Textarea
                      id="scopeOfWork"
                      value={formData.scopeOfWork}
                      onChange={(e) => setFormData({ ...formData, scopeOfWork: e.target.value })}
                      placeholder="Describe the work to be performed in detail..."
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-200"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialRequirements" className="text-gray-700 font-medium">
                      Special Requirements
                    </Label>
                    <Textarea
                      id="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                      placeholder="Any special requirements or instructions..."
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-200"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Attach Trade License *</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PDF, JPG, PNG up to 5MB</p>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <h4 className="font-medium text-orange-800 mb-2">Important Information</h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• All contractors must provide valid trade license and insurance</li>
                      <li>• Working hours are restricted to 8:00 AM - 6:00 PM on weekdays</li>
                      <li>• No work is permitted on weekends and public holidays</li>
                      <li>• Approval process takes 24-48 hours</li>
                    </ul>
                  </div>

                  <div className="flex space-x-4">
                    <Button type="button" variant="outline" className="flex-1">
                      Save as Draft
                    </Button>
                    <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700">
                      Submit Request
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="request-logs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Contractor Permit Requests</h2>
              <Button onClick={() => setActiveTab("new-request")}>
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </div>

            <div className="space-y-4">
              {contractorRequests.map((request) => {
                const StatusIcon = getStatusIcon(request.status)
                return (
                  <Card key={request.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{request.companyName}</h3>
                            <Badge className={getStatusColor(request.status)}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {request.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-gray-400" />
                              <div>
                                <p className="text-gray-500">Contact Person</p>
                                <p className="font-medium text-gray-900">{request.contactPerson}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <div>
                                <p className="text-gray-500">Phone</p>
                                <p className="font-medium text-gray-900">{request.phone}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <div>
                                <p className="text-gray-500">Date & Time</p>
                                <p className="font-medium text-gray-900">
                                  {request.date} • {request.time}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-gray-400" />
                              <div>
                                <p className="text-gray-500">Request ID</p>
                                <p className="font-medium text-gray-900">{request.id}</p>
                              </div>
                            </div>
                          </div>
                          <div className="mb-3">
                            <p className="text-sm text-gray-500 mb-1">Scope of Work:</p>
                            <p className="text-gray-700">{request.scopeOfWork}</p>
                          </div>
                          <div className="text-xs text-gray-500">
                            <span>Trade License: {request.tradeLicense}</span>
                            <span className="mx-2">•</span>
                            <span>Requested: {request.requestDate}</span>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Track Status
                          </Button>
                          {request.status === "pending" && (
                            <Button variant="outline" size="sm">
                              Cancel Request
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
        </Tabs>
      </div>
    </div>
  )
}
