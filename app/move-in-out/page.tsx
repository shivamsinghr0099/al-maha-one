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
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowUpDown, Upload, FileText, CheckCircle, Clock, AlertCircle, Home, Package } from "lucide-react"
import Link from "next/link"

const moveInOutRequests = [
  {
    id: "MIO001",
    type: "move-in",
    status: "approved",
    date: "2024-01-15",
    scheduledDate: "2024-01-20",
    unit: "Villa A-101",
    applicant: "John Doe",
    documents: ["Emirates ID", "Lease Agreement", "Security Deposit"],
    checklist: {
      completed: 8,
      total: 12,
    },
  },
  {
    id: "MIO002",
    type: "move-out",
    status: "pending",
    date: "2024-01-18",
    scheduledDate: "2024-01-25",
    unit: "Apartment B-205",
    applicant: "Sarah Johnson",
    documents: ["NOC Request", "Final Bills", "Damage Assessment"],
    checklist: {
      completed: 3,
      total: 10,
    },
  },
]

const requiredDocuments = {
  "move-in": [
    { name: "Emirates ID (Front & Back)", required: true, uploaded: false },
    { name: "Passport Copy", required: true, uploaded: false },
    { name: "Visa Copy", required: true, uploaded: false },
    { name: "Lease Agreement", required: true, uploaded: false },
    { name: "Security Deposit Receipt", required: true, uploaded: false },
    { name: "Salary Certificate", required: false, uploaded: false },
    { name: "Bank Statement", required: false, uploaded: false },
  ],
  "move-out": [
    { name: "NOC Request Form", required: true, uploaded: false },
    { name: "Final Utility Bills", required: true, uploaded: false },
    { name: "Property Condition Report", required: true, uploaded: false },
    { name: "Key Return Form", required: true, uploaded: false },
    { name: "Forwarding Address", required: true, uploaded: false },
    { name: "Damage Assessment", required: false, uploaded: false },
  ],
}

export default function MoveInOutPage() {
  const [activeTab, setActiveTab] = useState("request")
  const [requestType, setRequestType] = useState<"move-in" | "move-out" | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
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
              <ArrowUpDown className="h-6 w-6 text-teal-600" />
              <h1 className="text-xl font-semibold text-gray-900">Move In/Out Services</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="request">New Request</TabsTrigger>
            <TabsTrigger value="status">My Requests</TabsTrigger>
            <TabsTrigger value="checklist">Checklist</TabsTrigger>
          </TabsList>

          <TabsContent value="request" className="space-y-6">
            {!requestType ? (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Move In/Out Services</h2>
                  <p className="text-gray-600">Select the type of service you need</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <Card
                    className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-300"
                    onClick={() => setRequestType("move-in")}
                  >
                    <CardContent className="p-8 text-center">
                      <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <Home className="h-10 w-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Move In</h3>
                      <p className="text-gray-600 mb-6">
                        Complete your move-in process with document verification and property handover
                      </p>
                      <ul className="text-sm text-gray-500 space-y-2">
                        <li>• Document verification</li>
                        <li>• Property inspection</li>
                        <li>• Key handover</li>
                        <li>• Utility connections</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card
                    className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-300"
                    onClick={() => setRequestType("move-out")}
                  >
                    <CardContent className="p-8 text-center">
                      <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <Package className="h-10 w-10 text-orange-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Move Out</h3>
                      <p className="text-gray-600 mb-6">
                        Process your move-out with NOC generation and final clearances
                      </p>
                      <ul className="text-sm text-gray-500 space-y-2">
                        <li>• NOC processing</li>
                        <li>• Final inspection</li>
                        <li>• Security deposit return</li>
                        <li>• Utility disconnection</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <MoveInOutForm type={requestType} onBack={() => setRequestType(null)} />
            )}
          </TabsContent>

          <TabsContent value="status" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Move In/Out Requests</h2>
              <Button onClick={() => setActiveTab("request")}>
                <ArrowUpDown className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </div>

            <div className="space-y-4">
              {moveInOutRequests.map((request) => {
                const StatusIcon = getStatusIcon(request.status)
                return (
                  <Card key={request.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 capitalize">
                              {request.type.replace("-", " ")} - {request.unit}
                            </h3>
                            <Badge className={getStatusColor(request.status)}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {request.status}
                            </Badge>
                          </div>
                          <div className="space-y-2 text-sm text-gray-600">
                            <p>Applicant: {request.applicant}</p>
                            <p>Request Date: {request.date}</p>
                            <p>Scheduled Date: {request.scheduledDate}</p>
                            <p>
                              Progress: {request.checklist.completed}/{request.checklist.total} items completed
                            </p>
                          </div>
                          <div className="mt-3">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{
                                  width: `${(request.checklist.completed / request.checklist.total) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Download NOC
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="checklist" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Move In/Out Checklist</h2>
              <p className="text-gray-600">Track your progress and ensure all requirements are met</p>
            </div>

            <MoveInOutChecklist />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function MoveInOutForm({ type, onBack }: { type: "move-in" | "move-out"; onBack: () => void }) {
  const [formData, setFormData] = useState({
    unit: "",
    moveDate: "",
    contactNumber: "",
    email: "",
    emergencyContact: "",
    specialRequests: "",
    movingCompany: "",
    truckSize: "",
    timeSlot: "",
  })

  const documents = requiredDocuments[type]

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 capitalize">{type.replace("-", " ")} Request</h2>
          <p className="text-gray-600">Complete the form to process your request</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="unit">Unit Number</Label>
              <Input
                id="unit"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                placeholder="e.g., Villa A-101"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="moveDate">Preferred {type === "move-in" ? "Move In" : "Move Out"} Date</Label>
              <Input
                id="moveDate"
                type="date"
                value={formData.moveDate}
                onChange={(e) => setFormData({ ...formData, moveDate: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeSlot">Preferred Time Slot</Label>
              <Select
                value={formData.timeSlot}
                onValueChange={(value) => setFormData({ ...formData, timeSlot: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (8:00 AM - 12:00 PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12:00 PM - 4:00 PM)</SelectItem>
                  <SelectItem value="evening">Evening (4:00 PM - 8:00 PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                placeholder="+971 50 123 4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                placeholder="+971 50 987 6543"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Moving Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="movingCompany">Moving Company (Optional)</Label>
              <Input
                id="movingCompany"
                value={formData.movingCompany}
                onChange={(e) => setFormData({ ...formData, movingCompany: e.target.value })}
                placeholder="Company name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="truckSize">Truck Size</Label>
              <Select
                value={formData.truckSize}
                onValueChange={(value) => setFormData({ ...formData, truckSize: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select truck size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (3-ton)</SelectItem>
                  <SelectItem value="medium">Medium (7-ton)</SelectItem>
                  <SelectItem value="large">Large (10-ton)</SelectItem>
                  <SelectItem value="extra-large">Extra Large (15-ton)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequests">Special Requests</Label>
              <Textarea
                id="specialRequests"
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                placeholder="Any special requirements or instructions..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Required Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{doc.name}</p>
                    <p className="text-sm text-gray-500">{doc.required ? "Required" : "Optional"}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-1" />
                  Upload
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button className="flex-1">Submit Request</Button>
      </div>
    </div>
  )
}

function MoveInOutChecklist() {
  const moveInChecklist = [
    { id: 1, task: "Submit required documents", completed: true, category: "Documentation" },
    { id: 2, task: "Pay security deposit", completed: true, category: "Payment" },
    { id: 3, task: "Schedule property inspection", completed: true, category: "Inspection" },
    { id: 4, task: "Receive property keys", completed: false, category: "Handover" },
    { id: 5, task: "Complete utility connections", completed: false, category: "Utilities" },
    { id: 6, task: "Register with building management", completed: false, category: "Registration" },
    { id: 7, task: "Obtain parking access card", completed: false, category: "Access" },
    { id: 8, task: "Submit emergency contact details", completed: false, category: "Safety" },
  ]

  const moveOutChecklist = [
    { id: 1, task: "Submit move-out notice", completed: true, category: "Notice" },
    { id: 2, task: "Schedule final inspection", completed: true, category: "Inspection" },
    { id: 3, task: "Clear all outstanding bills", completed: false, category: "Payment" },
    { id: 4, task: "Return all keys and access cards", completed: false, category: "Handover" },
    { id: 5, task: "Disconnect utilities", completed: false, category: "Utilities" },
    { id: 6, task: "Obtain NOC certificate", completed: false, category: "Documentation" },
    { id: 7, task: "Receive security deposit refund", completed: false, category: "Refund" },
  ]

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Home className="h-5 w-5 text-green-600" />
            <span>Move In Checklist</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {moveInChecklist.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <Checkbox checked={item.completed} />
                <div className="flex-1">
                  <p className={`font-medium ${item.completed ? "text-gray-500 line-through" : "text-gray-900"}`}>
                    {item.task}
                  </p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
                {item.completed && <CheckCircle className="h-5 w-5 text-green-600" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-orange-600" />
            <span>Move Out Checklist</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {moveOutChecklist.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <Checkbox checked={item.completed} />
                <div className="flex-1">
                  <p className={`font-medium ${item.completed ? "text-gray-500 line-through" : "text-gray-900"}`}>
                    {item.task}
                  </p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
                {item.completed && <CheckCircle className="h-5 w-5 text-green-600" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
