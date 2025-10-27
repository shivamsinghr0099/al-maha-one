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
import {
  ArrowLeft,
  Eye,
  AlertTriangle,
  Camera,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Search,
  MessageSquare,
  ThumbsUp,
  Share2,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const complaintCategories = [
  { id: "parking", label: "Parking Issues", color: "bg-red-100 text-red-800" },
  { id: "noise", label: "Noise Complaints", color: "bg-orange-100 text-orange-800" },
  { id: "security", label: "Security Concerns", color: "bg-yellow-100 text-yellow-800" },
  { id: "amenities", label: "Amenities Issues", color: "bg-blue-100 text-blue-800" },
  { id: "maintenance", label: "Common Area Maintenance", color: "bg-green-100 text-green-800" },
  { id: "cleanliness", label: "Cleanliness", color: "bg-purple-100 text-purple-800" },
  { id: "other", label: "Other", color: "bg-gray-100 text-gray-800" },
]

const myComplaints = [
  {
    id: "AE001",
    title: "Broken elevator in Tower A",
    category: "maintenance",
    description: "The elevator has been out of order for 3 days, causing inconvenience to residents.",
    location: "Tower A, Ground Floor",
    status: "in-progress",
    priority: "high",
    date: "2024-01-18",
    images: ["/placeholder.svg?height=200&width=300&text=Elevator+Issue"],
    responses: 2,
    likes: 5,
    resolution: "Technician assigned, parts ordered. Expected completion: Jan 25",
  },
  {
    id: "AE002",
    title: "Parking space occupied by unauthorized vehicle",
    category: "parking",
    description: "My assigned parking space P-A101 has been occupied by an unknown vehicle for 2 days.",
    location: "Basement Level 1, Space P-A101",
    status: "resolved",
    priority: "medium",
    date: "2024-01-15",
    images: ["/placeholder.svg?height=200&width=300&text=Parking+Issue"],
    responses: 1,
    likes: 3,
    resolution: "Vehicle removed, warning issued to owner",
  },
]

const communityComplaints = [
  {
    id: "AE003",
    title: "Pool area needs cleaning",
    category: "cleanliness",
    description: "The swimming pool area has not been cleaned properly, debris floating in water.",
    location: "Swimming Pool Area",
    status: "pending",
    priority: "medium",
    date: "2024-01-20",
    author: "Anonymous",
    responses: 4,
    likes: 8,
  },
  {
    id: "AE004",
    title: "Gym equipment malfunction",
    category: "amenities",
    description: "Two treadmills in the gym are not working properly, display shows error messages.",
    location: "Gym, Level 2",
    status: "acknowledged",
    priority: "low",
    date: "2024-01-19",
    author: "Resident #205",
    responses: 2,
    likes: 6,
  },
]

export default function AzureEyePage() {
  const [activeTab, setActiveTab] = useState("community")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "acknowledged":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return CheckCircle
      case "in-progress":
        return Clock
      case "acknowledged":
        return AlertCircle
      case "pending":
        return Clock
      case "rejected":
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
              <Eye className="h-6 w-6 text-red-600" />
              <h1 className="text-xl font-semibold text-gray-900">Azure Eye</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="community">Community Feed</TabsTrigger>
            <TabsTrigger value="my-complaints">My Complaints</TabsTrigger>
            <TabsTrigger value="report">Report Issue</TabsTrigger>
          </TabsList>

          <TabsContent value="community" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search complaints..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {complaintCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-6">
              {communityComplaints.map((complaint) => {
                const StatusIcon = getStatusIcon(complaint.status)
                const categoryInfo = complaintCategories.find((c) => c.id === complaint.category)
                return (
                  <Card key={complaint.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{complaint.title}</h3>
                            <Badge className={getStatusColor(complaint.status)}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {complaint.status.replace("-", " ")}
                            </Badge>
                            <Badge className={getPriorityColor(complaint.priority)}>{complaint.priority}</Badge>
                            {categoryInfo && (
                              <Badge variant="outline" className={categoryInfo.color}>
                                {categoryInfo.label}
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-700 mb-3">{complaint.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{complaint.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{complaint.date}</span>
                            </div>
                            <span>by {complaint.author}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {complaint.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              {complaint.responses}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="my-complaints" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Complaints</h2>
              <Button onClick={() => setActiveTab("report")}>
                <Plus className="h-4 w-4 mr-2" />
                Report New Issue
              </Button>
            </div>

            <div className="space-y-6">
              {myComplaints.map((complaint) => {
                const StatusIcon = getStatusIcon(complaint.status)
                const categoryInfo = complaintCategories.find((c) => c.id === complaint.category)
                return (
                  <Card key={complaint.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{complaint.title}</h3>
                            <Badge className={getStatusColor(complaint.status)}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {complaint.status.replace("-", " ")}
                            </Badge>
                            <Badge className={getPriorityColor(complaint.priority)}>{complaint.priority}</Badge>
                            {categoryInfo && (
                              <Badge variant="outline" className={categoryInfo.color}>
                                {categoryInfo.label}
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-700 mb-3">{complaint.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{complaint.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{complaint.date}</span>
                            </div>
                            <span>ID: {complaint.id}</span>
                          </div>
                          {complaint.resolution && (
                            <div className="bg-blue-50 p-3 rounded-lg mb-3">
                              <p className="text-sm text-blue-800">
                                <strong>Update:</strong> {complaint.resolution}
                              </p>
                            </div>
                          )}
                          {complaint.images && complaint.images.length > 0 && (
                            <div className="flex space-x-2 mb-3">
                              {complaint.images.map((image, index) => (
                                <Image
                                  key={index}
                                  src={image || "/placeholder.svg"}
                                  alt={`Complaint image ${index + 1}`}
                                  width={100}
                                  height={80}
                                  className="rounded object-cover cursor-pointer hover:opacity-80"
                                />
                              ))}
                            </div>
                          )}
                          <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {complaint.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              {complaint.responses}
                            </Button>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="report" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Report an Issue</h2>
              <p className="text-gray-600">Help us improve our community by reporting issues</p>
            </div>

            <ReportIssueForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ReportIssueForm() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    priority: "medium",
    anonymous: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Issue reported:", formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Issue Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Issue Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Brief description of the issue"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {complaintCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Specific location of the issue"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority Level</Label>
            <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - Minor inconvenience</SelectItem>
                <SelectItem value="medium">Medium - Moderate impact</SelectItem>
                <SelectItem value="high">High - Significant impact</SelectItem>
                <SelectItem value="urgent">Urgent - Safety concern</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide detailed information about the issue..."
              rows={5}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Upload Photos/Videos</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PNG, JPG, MP4 up to 10MB each</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="anonymous"
              checked={formData.anonymous}
              onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
              className="rounded"
            />
            <Label htmlFor="anonymous" className="text-sm">
              Submit anonymously
            </Label>
          </div>

          <div className="flex space-x-4">
            <Button type="button" variant="outline" className="flex-1">
              Save as Draft
            </Button>
            <Button type="submit" className="flex-1">
              Submit Report
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
