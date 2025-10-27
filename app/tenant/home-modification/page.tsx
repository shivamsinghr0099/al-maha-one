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
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Hammer, Upload, CheckCircle, Clock, AlertCircle, Home, Palette, Wrench, Zap } from "lucide-react"
import Link from "next/link"

const modificationCategories = [
  {
    id: "structural",
    title: "Structural Changes",
    icon: Home,
    color: "bg-blue-50 text-blue-600",
    description: "Wall removal, room division, layout changes",
    requiresPermit: true,
    estimatedTime: "2-4 weeks",
  },
  {
    id: "electrical",
    title: "Electrical Modifications",
    icon: Zap,
    color: "bg-yellow-50 text-yellow-600",
    description: "Additional outlets, lighting changes, smart home upgrades",
    requiresPermit: true,
    estimatedTime: "1-2 weeks",
  },
  {
    id: "plumbing",
    title: "Plumbing Changes",
    icon: Wrench,
    color: "bg-cyan-50 text-cyan-600",
    description: "Bathroom renovations, kitchen upgrades, pipe rerouting",
    requiresPermit: true,
    estimatedTime: "1-3 weeks",
  },
  {
    id: "cosmetic",
    title: "Cosmetic Changes",
    icon: Palette,
    color: "bg-purple-50 text-purple-600",
    description: "Painting, flooring, fixtures, non-structural improvements",
    requiresPermit: false,
    estimatedTime: "3-7 days",
  },
]

const myRequests = [
  {
    id: "MOD001",
    type: "Structural Changes",
    description: "Remove wall between kitchen and living room",
    status: "pending-approval",
    submittedDate: "2024-01-20",
    estimatedCompletion: "2024-02-15",
    cost: "AED 8,500",
    contractor: "Elite Renovation Co.",
  },
  {
    id: "MOD002",
    type: "Electrical Modifications",
    description: "Install smart home lighting system",
    status: "approved",
    submittedDate: "2024-01-15",
    estimatedCompletion: "2024-01-30",
    cost: "AED 3,200",
    contractor: "Smart Tech Solutions",
  },
  {
    id: "MOD003",
    type: "Cosmetic Changes",
    description: "Full unit painting - neutral colors",
    status: "completed",
    submittedDate: "2024-01-05",
    estimatedCompletion: "2024-01-12",
    cost: "AED 2,800",
    contractor: "Perfect Paint Pro",
  },
]

export default function HomeModificationPage() {
  const [activeTab, setActiveTab] = useState("request")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "approved":
        return "bg-blue-100 text-blue-800"
      case "pending-approval":
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
        return CheckCircle
      case "approved":
        return CheckCircle
      case "pending-approval":
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
              <Hammer className="h-6 w-6 text-orange-600" />
              <h1 className="text-xl font-semibold text-gray-900">Home Modifications</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="request">New Request</TabsTrigger>
            <TabsTrigger value="status">My Requests</TabsTrigger>
            <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          </TabsList>

          <TabsContent value="request" className="space-y-6">
            {!selectedCategory ? (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Home Modification Request</h2>
                  <p className="text-gray-600">Select the type of modification you want to make</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {modificationCategories.map((category) => (
                    <Card
                      key={category.id}
                      className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-orange-300"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center`}>
                            <category.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
                            <p className="text-gray-600 mb-3">{category.description}</p>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Permit Required:</span>
                                <Badge variant={category.requiresPermit ? "destructive" : "secondary"}>
                                  {category.requiresPermit ? "Yes" : "No"}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Estimated Time:</span>
                                <span className="font-medium text-gray-900">{category.estimatedTime}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <ModificationRequestForm
                category={modificationCategories.find((c) => c.id === selectedCategory)!}
                onBack={() => setSelectedCategory(null)}
              />
            )}
          </TabsContent>

          <TabsContent value="status" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Modification Requests</h2>
              <Button onClick={() => setActiveTab("request")}>
                <Hammer className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </div>

            <div className="space-y-4">
              {myRequests.map((request) => {
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
                              {request.status.replace("-", " ")}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{request.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Request ID</p>
                              <p className="font-medium text-gray-900">{request.id}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Submitted</p>
                              <p className="font-medium text-gray-900">{request.submittedDate}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Estimated Cost</p>
                              <p className="font-medium text-gray-900">{request.cost}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Contractor</p>
                              <p className="font-medium text-gray-900">{request.contractor}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          {request.status === "pending-approval" && (
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

          <TabsContent value="guidelines" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Modification Guidelines</h2>
              <p className="text-gray-600">Important rules and regulations for home modifications</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700">Permitted Modifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Interior painting and wallpaper</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Flooring replacement (same level)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Kitchen cabinet updates</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Bathroom fixture replacement</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Smart home installations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-700">Restricted Modifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <span>Load-bearing wall modifications</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <span>Balcony enclosures</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <span>External facade changes</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <span>Plumbing main line changes</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <span>HVAC system modifications</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Important Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Approval Process</h4>
                    <p className="text-blue-800">
                      All structural modifications require building management approval. The process typically takes
                      5-10 business days for review.
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2">Working Hours</h4>
                    <p className="text-yellow-800">
                      Construction work is only permitted Monday to Friday, 8:00 AM to 6:00 PM. No work on weekends or
                      public holidays.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Insurance & Liability</h4>
                    <p className="text-green-800">
                      All contractors must provide valid insurance certificates and trade licenses before starting work.
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

function ModificationRequestForm({
  category,
  onBack,
}: {
  category: (typeof modificationCategories)[0]
  onBack: () => void
}) {
  const [formData, setFormData] = useState({
    description: "",
    scope: "",
    startDate: "",
    contractor: "",
    contractorLicense: "",
    estimatedCost: "",
    duration: "",
    specialRequirements: "",
    agreesToTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Modification request submitted:", formData)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center`}>
          <category.icon className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
          <p className="text-gray-600">Submit your modification request</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Modification Request Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the modification you want to make in detail..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scope">Scope of Work *</Label>
              <Textarea
                id="scope"
                value={formData.scope}
                onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                placeholder="List all work to be performed, materials needed, etc..."
                rows={3}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Preferred Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Estimated Duration</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => setFormData({ ...formData, duration: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3-days">1-3 days</SelectItem>
                    <SelectItem value="1-week">1 week</SelectItem>
                    <SelectItem value="2-weeks">2 weeks</SelectItem>
                    <SelectItem value="1-month">1 month</SelectItem>
                    <SelectItem value="2-months">2+ months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contractor">Contractor Name</Label>
                <Input
                  id="contractor"
                  value={formData.contractor}
                  onChange={(e) => setFormData({ ...formData, contractor: e.target.value })}
                  placeholder="Name of contractor/company"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contractorLicense">Trade License Number</Label>
                <Input
                  id="contractorLicense"
                  value={formData.contractorLicense}
                  onChange={(e) => setFormData({ ...formData, contractorLicense: e.target.value })}
                  placeholder="Contractor's trade license"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedCost">Estimated Cost (AED)</Label>
              <Input
                id="estimatedCost"
                value={formData.estimatedCost}
                onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })}
                placeholder="Total estimated cost"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequirements">Special Requirements</Label>
              <Textarea
                id="specialRequirements"
                value={formData.specialRequirements}
                onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                placeholder="Any special requirements, access needs, or considerations..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Required Documents</Label>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Upload Contractor Trade License</p>
                  <p className="text-xs text-gray-500">PDF, JPG up to 5MB</p>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Upload Modification Plans</p>
                  <p className="text-xs text-gray-500">PDF, JPG up to 10MB</p>
                </div>
              </div>
            </div>

            {category.requiresPermit && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Permit Required</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      This type of modification requires building management approval and may need additional permits.
                      Processing time: 5-10 business days.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreesToTerms}
                onCheckedChange={(checked) => setFormData({ ...formData, agreesToTerms: checked as boolean })}
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the building's modification guidelines and terms & conditions
              </Label>
            </div>

            <div className="flex space-x-4">
              <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                Back
              </Button>
              <Button type="submit" className="flex-1" disabled={!formData.agreesToTerms}>
                Submit Request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
