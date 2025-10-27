"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  FileText,
  Download,
  Upload,
  Search,
  Eye,
  Share2,
  Plus,
  Calendar,
  User,
  Building,
  Shield,
  CreditCard,
  Home,
} from "lucide-react"
import Link from "next/link"

const documentCategories = [
  { id: "lease", name: "Lease Documents", icon: Home, color: "bg-blue-100 text-blue-600" },
  { id: "noc", name: "NOC Certificates", icon: Shield, color: "bg-green-100 text-green-600" },
  { id: "bills", name: "Bills & Invoices", icon: CreditCard, color: "bg-orange-100 text-orange-600" },
  { id: "maintenance", name: "Maintenance Records", icon: Building, color: "bg-purple-100 text-purple-600" },
  { id: "legal", name: "Legal Documents", icon: FileText, color: "bg-red-100 text-red-600" },
  { id: "personal", name: "Personal Documents", icon: User, color: "bg-gray-100 text-gray-600" },
]

const documents = [
  {
    id: "DOC001",
    name: "Lease Agreement - Villa A-101",
    category: "lease",
    type: "PDF",
    size: "2.4 MB",
    uploadDate: "2024-01-15",
    expiryDate: "2024-12-31",
    status: "active",
    description: "Main lease agreement for Villa A-101",
    tags: ["lease", "villa", "2024"],
    isOfficial: true,
  },
  {
    id: "DOC002",
    name: "NOC Certificate",
    category: "noc",
    type: "PDF",
    size: "1.2 MB",
    uploadDate: "2024-01-10",
    expiryDate: "2024-06-30",
    status: "active",
    description: "No Objection Certificate for move-out",
    tags: ["noc", "move-out"],
    isOfficial: true,
  },
  {
    id: "DOC003",
    name: "Service Charges Invoice - January",
    category: "bills",
    type: "PDF",
    size: "856 KB",
    uploadDate: "2024-01-01",
    expiryDate: "-",
    status: "paid",
    description: "Monthly service charges for January 2024",
    tags: ["invoice", "service-charges", "january"],
    isOfficial: true,
  },
  {
    id: "DOC004",
    name: "AC Maintenance Report",
    category: "maintenance",
    type: "PDF",
    size: "1.8 MB",
    uploadDate: "2024-01-20",
    expiryDate: "-",
    status: "completed",
    description: "AC servicing and maintenance report",
    tags: ["maintenance", "ac", "report"],
    isOfficial: false,
  },
  {
    id: "DOC005",
    name: "Emirates ID Copy",
    category: "personal",
    type: "PDF",
    size: "1.1 MB",
    uploadDate: "2024-01-05",
    expiryDate: "2027-01-05",
    status: "active",
    description: "Copy of Emirates ID for records",
    tags: ["emirates-id", "personal"],
    isOfficial: false,
  },
]

const documentRequests = [
  {
    id: "REQ001",
    type: "NOC Certificate",
    purpose: "Bank loan application",
    status: "processing",
    requestDate: "2024-01-22",
    expectedDate: "2024-01-25",
    fee: "AED 100",
  },
  {
    id: "REQ002",
    type: "Salary Certificate",
    purpose: "Visa renewal",
    status: "ready",
    requestDate: "2024-01-20",
    expectedDate: "2024-01-23",
    fee: "AED 50",
  },
]

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState("my-documents")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "expired":
        return "bg-red-100 text-red-800"
      case "expiring":
        return "bg-yellow-100 text-yellow-800"
      case "paid":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "ready":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

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
              <FileText className="h-6 w-6 text-gray-600" />
              <h1 className="text-xl font-semibold text-gray-900">Document Management</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="my-documents">My Documents</TabsTrigger>
            <TabsTrigger value="official">Official Documents</TabsTrigger>
            <TabsTrigger value="requests">Document Requests</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="my-documents" className="space-y-6">
            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search documents..."
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
                  {documentCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Sort by Date</SelectItem>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="category">Sort by Category</SelectItem>
                  <SelectItem value="size">Sort by Size</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Document Categories */}
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {documentCategories.map((category) => {
                const categoryCount = documents.filter((doc) => doc.category === category.id).length
                return (
                  <Card
                    key={category.id}
                    className={`cursor-pointer transition-all ${
                      selectedCategory === category.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedCategory(selectedCategory === category.id ? "all" : category.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div
                        className={`w-12 h-12 rounded-lg ${category.color} mx-auto mb-2 flex items-center justify-center`}
                      >
                        <category.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-sm font-medium text-gray-900">{category.name}</h3>
                      <p className="text-xs text-gray-500">{categoryCount} documents</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Documents List */}
            <div className="space-y-4">
              {filteredDocuments.map((document) => {
                const category = documentCategories.find((cat) => cat.id === document.category)
                return (
                  <Card key={document.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-lg ${category?.color} flex items-center justify-center`}>
                            <FileText className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{document.name}</h3>
                              <Badge className={getStatusColor(document.status)}>{document.status}</Badge>
                              {document.isOfficial && (
                                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                  Official
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{document.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>
                                {document.type} • {document.size}
                              </span>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>Uploaded: {document.uploadDate}</span>
                              </div>
                              {document.expiryDate !== "-" && (
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>Expires: {document.expiryDate}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {document.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="official" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Official Documents</h2>
              <p className="text-gray-600">Documents issued by building management and authorities</p>
            </div>

            <div className="space-y-4">
              {documents
                .filter((doc) => doc.isOfficial)
                .map((document) => {
                  const category = documentCategories.find((cat) => cat.id === document.category)
                  return (
                    <Card key={document.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className={`w-12 h-12 rounded-lg ${category?.color} flex items-center justify-center`}>
                              <Shield className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{document.name}</h3>
                                <Badge className={getStatusColor(document.status)}>{document.status}</Badge>
                                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                  Official
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{document.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>
                                  {document.type} • {document.size}
                                </span>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>Issued: {document.uploadDate}</span>
                                </div>
                                {document.expiryDate !== "-" && (
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>Valid until: {document.expiryDate}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Document Requests</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </div>

            <div className="space-y-4">
              {documentRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{request.type}</h3>
                          <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>Purpose: {request.purpose}</p>
                          <p>Request ID: {request.id}</p>
                          <p>Request Date: {request.requestDate}</p>
                          <p>Expected Date: {request.expectedDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{request.fee}</p>
                        <div className="flex space-x-2 mt-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          {request.status === "ready" && (
                            <Button size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Documents</h2>
              <p className="text-gray-600">Upload and organize your important documents</p>
            </div>

            <DocumentUploadForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function DocumentUploadForm() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    tags: "",
    expiryDate: "",
    isPrivate: false,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload New Document</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Drop files here or click to upload</h3>
          <p className="text-gray-600 mb-4">Support for PDF, DOC, DOCX, JPG, PNG files up to 10MB</p>
          <Button>Choose Files</Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Document Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter document name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {documentCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief description of the document"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="lease, contract, 2024"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date (optional)</Label>
            <Input
              id="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isPrivate"
            checked={formData.isPrivate}
            onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
            className="rounded"
          />
          <Label htmlFor="isPrivate" className="text-sm">
            Mark as private (only visible to you)
          </Label>
        </div>

        <div className="flex space-x-4">
          <Button variant="outline" className="flex-1">
            Save as Draft
          </Button>
          <Button className="flex-1">Upload Document</Button>
        </div>
      </CardContent>
    </Card>
  )
}
