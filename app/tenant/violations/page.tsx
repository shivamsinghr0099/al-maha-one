"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ArrowLeft,
  AlertTriangle,
  CreditCard,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Download,
  MessageSquare,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

const violations = [
  {
    id: "VN001",
    type: "Noise Complaint",
    description: "Loud music after 10 PM on weekdays",
    date: "2024-01-18",
    time: "22:30",
    location: "Unit A-1205",
    status: "acknowledged",
    fine: "AED 200",
    dueDate: "2024-02-01",
    reportedBy: "Building Management",
    evidence: "/placeholder.svg?height=200&width=300&text=Noise+Violation",
    canAppeal: true,
  },
  {
    id: "VN002",
    type: "Parking Violation",
    description: "Parking in visitor space without permit",
    date: "2024-01-15",
    time: "14:00",
    location: "Parking Space V-05",
    status: "paid",
    fine: "AED 150",
    dueDate: "2024-01-30",
    reportedBy: "Security Team",
    evidence: "/placeholder.svg?height=200&width=300&text=Parking+Violation",
    canAppeal: false,
  },
  {
    id: "VN003",
    type: "Safety Violation",
    description: "Blocking emergency exit with personal items",
    date: "2024-01-10",
    time: "16:45",
    location: "Floor 12 Emergency Exit",
    status: "disputed",
    fine: "AED 300",
    dueDate: "2024-01-25",
    reportedBy: "Fire Safety Inspector",
    evidence: "/placeholder.svg?height=200&width=300&text=Safety+Violation",
    canAppeal: true,
  },
]

const violationCategories = [
  { id: "noise", name: "Noise Disturbance", description: "Loud music, parties, construction noise" },
  { id: "parking", name: "Parking Violations", description: "Unauthorized parking, blocking spaces" },
  { id: "safety", name: "Safety Violations", description: "Fire safety, emergency exit blocking" },
  { id: "pets", name: "Pet Violations", description: "Unleashed pets, noise, cleanliness" },
  { id: "smoking", name: "Smoking Violations", description: "Smoking in prohibited areas" },
  { id: "waste", name: "Waste Management", description: "Improper disposal, littering" },
  { id: "amenity", name: "Amenity Misuse", description: "Pool rules, gym violations, common area misuse" },
  { id: "other", name: "Other Violations", description: "Other building rule violations" },
]

export default function ViolationsPage() {
  const [activeTab, setActiveTab] = useState("violations")
  const [selectedViolation, setSelectedViolation] = useState<string | null>(null)
  const [showAppealDialog, setShowAppealDialog] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "acknowledged":
        return "bg-blue-100 text-blue-800"
      case "disputed":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "under-review":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return CheckCircle
      case "acknowledged":
        return Eye
      case "disputed":
      case "under-review":
        return Clock
      case "overdue":
        return AlertTriangle
      default:
        return XCircle
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
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h1 className="text-xl font-semibold text-gray-900">Violation Notices & Penalties</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Violations</p>
                  <p className="text-2xl font-bold text-gray-900">{violations.length}</p>
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
                  <p className="text-2xl font-bold text-red-600">
                    AED{" "}
                    {violations
                      .filter((v) => v.status !== "paid")
                      .reduce((sum, v) => sum + Number.parseInt(v.fine.replace("AED ", "")), 0)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Paid Fines</p>
                  <p className="text-2xl font-bold text-green-600">
                    AED{" "}
                    {violations
                      .filter((v) => v.status === "paid")
                      .reduce((sum, v) => sum + Number.parseInt(v.fine.replace("AED ", "")), 0)}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Under Dispute</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {violations.filter((v) => v.status === "disputed").length}
                  </p>
                </div>
                <MessageSquare className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="violations">My Violations</TabsTrigger>
            <TabsTrigger value="categories">Violation Types</TabsTrigger>
            <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          </TabsList>

          <TabsContent value="violations" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Violation Notices</h2>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export History
                </Button>
              </div>
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
                              {violation.status.replace("-", " ")}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{violation.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Violation ID</p>
                              <p className="font-medium text-gray-900">{violation.id}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Date & Time</p>
                              <p className="font-medium text-gray-900">
                                {violation.date} • {violation.time}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Location</p>
                              <p className="font-medium text-gray-900">{violation.location}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Reported By</p>
                              <p className="font-medium text-gray-900">{violation.reportedBy}</p>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <div>
                              <span className="text-sm text-gray-500">Fine Amount: </span>
                              <span className="text-lg font-bold text-red-600">{violation.fine}</span>
                              <span className="text-sm text-gray-500 ml-2">Due: {violation.dueDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Evidence
                          </Button>
                          {violation.status !== "paid" && (
                            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                              <CreditCard className="h-4 w-4 mr-2" />
                              Pay Fine
                            </Button>
                          )}
                          {violation.canAppeal && violation.status !== "paid" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedViolation(violation.id)
                                setShowAppealDialog(true)
                              }}
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Appeal
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

          <TabsContent value="categories" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Violation Categories</h2>
              <p className="text-gray-600">Understanding different types of building violations</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {violationCategories.map((category) => (
                <Card key={category.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guidelines" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Violation Guidelines</h2>
              <p className="text-gray-600">Rules, penalties, and appeal process</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-700">Common Violations & Fines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                      <span>Noise after 10 PM</span>
                      <span className="font-bold text-red-600">AED 200</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                      <span>Unauthorized parking</span>
                      <span className="font-bold text-red-600">AED 150</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                      <span>Safety violations</span>
                      <span className="font-bold text-red-600">AED 300</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                      <span>Pet violations</span>
                      <span className="font-bold text-red-600">AED 100</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                      <span>Smoking violations</span>
                      <span className="font-bold text-red-600">AED 250</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-700">Appeal Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Submit Appeal</h4>
                        <p className="text-gray-600">File your appeal within 7 days of receiving the notice</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Review Process</h4>
                        <p className="text-gray-600">
                          Management reviews your appeal and evidence within 5 business days
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Decision</h4>
                        <p className="text-gray-600">
                          You'll receive the final decision via email and app notification
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Important Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2">Payment Terms</h4>
                    <p className="text-yellow-800">
                      All fines must be paid within 14 days of the violation notice. Late payments may incur additional
                      charges.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Repeat Violations</h4>
                    <p className="text-blue-800">
                      Repeated violations of the same type may result in increased fines and potential lease termination
                      proceedings.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Good Standing</h4>
                    <p className="text-green-800">
                      Residents with no violations for 12 consecutive months may be eligible for good standing benefits
                      and discounts.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Appeal Dialog */}
      <Dialog open={showAppealDialog} onOpenChange={setShowAppealDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Appeal Violation Notice</DialogTitle>
          </DialogHeader>
          <AppealForm
            violationId={selectedViolation}
            onSubmit={() => setShowAppealDialog(false)}
            onCancel={() => setShowAppealDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

function AppealForm({
  violationId,
  onSubmit,
  onCancel,
}: {
  violationId: string | null
  onSubmit: () => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    reason: "",
    explanation: "",
    evidence: "",
    contactPreference: "email",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Appeal submitted:", { violationId, ...formData })
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="reason">Reason for Appeal *</Label>
        <Select value={formData.reason} onValueChange={(value) => setFormData({ ...formData, reason: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select reason for appeal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="incorrect-information">Incorrect Information</SelectItem>
            <SelectItem value="not-responsible">I was not responsible</SelectItem>
            <SelectItem value="emergency-situation">Emergency Situation</SelectItem>
            <SelectItem value="technical-error">Technical Error</SelectItem>
            <SelectItem value="insufficient-evidence">Insufficient Evidence</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="explanation">Detailed Explanation *</Label>
        <Textarea
          id="explanation"
          value={formData.explanation}
          onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
          placeholder="Please provide a detailed explanation of why you believe this violation notice should be overturned..."
          rows={5}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Supporting Evidence</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Upload supporting documents, photos, or videos</p>
          <p className="text-xs text-gray-500">PDF, JPG, PNG, MP4 up to 10MB each</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactPreference">Preferred Contact Method</Label>
        <Select
          value={formData.contactPreference}
          onValueChange={(value) => setFormData({ ...formData, contactPreference: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="phone">Phone Call</SelectItem>
            <SelectItem value="app">App Notification</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">Appeal Process Information</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Appeals must be submitted within 7 days of receiving the violation notice</li>
          <li>• Review process typically takes 5-7 business days</li>
          <li>• You will be notified of the decision via your preferred contact method</li>
          <li>• If appeal is successful, the fine will be waived</li>
        </ul>
      </div>

      <div className="flex space-x-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          Submit Appeal
        </Button>
      </div>
    </form>
  )
}
