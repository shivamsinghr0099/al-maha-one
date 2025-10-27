"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  DollarSign,
  Wrench,
  Users,
  Car,
  Building,
  Activity,
  FileText,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"

const reportCategories = [
  { id: "financial", name: "Financial Reports", icon: DollarSign, count: 8 },
  { id: "maintenance", name: "Maintenance Reports", icon: Wrench, count: 12 },
  { id: "occupancy", name: "Occupancy Reports", icon: Building, count: 6 },
  { id: "amenities", name: "Amenities Usage", icon: Activity, count: 10 },
  { id: "parking", name: "Parking Reports", icon: Car, count: 5 },
  { id: "visitors", name: "Visitor Analytics", icon: Users, count: 7 },
]

const financialMetrics = {
  totalRevenue: { value: "AED 2,450,000", change: "+12.5%", trend: "up" },
  outstandingPayments: { value: "AED 125,000", change: "-8.2%", trend: "down" },
  collectionRate: { value: "94.8%", change: "+2.1%", trend: "up" },
  averagePaymentTime: { value: "3.2 days", change: "-0.8 days", trend: "down" },
}

const maintenanceMetrics = {
  totalRequests: { value: "342", change: "+15.3%", trend: "up" },
  avgResolutionTime: { value: "2.4 days", change: "-0.6 days", trend: "down" },
  satisfactionRate: { value: "4.6/5.0", change: "+0.2", trend: "up" },
  pendingRequests: { value: "23", change: "-12.1%", trend: "down" },
}

const occupancyMetrics = {
  occupancyRate: { value: "96.2%", change: "+1.8%", trend: "up" },
  totalUnits: { value: "250", change: "0%", trend: "neutral" },
  vacantUnits: { value: "9", change: "-2 units", trend: "down" },
  avgLeaseLength: { value: "18 months", change: "+2 months", trend: "up" },
}

const recentReports = [
  {
    id: 1,
    name: "Monthly Financial Summary - January 2024",
    type: "financial",
    generatedDate: "2024-01-31",
    size: "2.4 MB",
    format: "PDF",
  },
  {
    id: 2,
    name: "Maintenance Performance Report - Q4 2023",
    type: "maintenance",
    generatedDate: "2024-01-15",
    size: "1.8 MB",
    format: "Excel",
  },
  {
    id: 3,
    name: "Amenities Usage Analytics - December 2023",
    type: "amenities",
    generatedDate: "2024-01-10",
    size: "3.1 MB",
    format: "PDF",
  },
  {
    id: 4,
    name: "Visitor Traffic Report - January 2024",
    type: "visitors",
    generatedDate: "2024-01-08",
    size: "1.2 MB",
    format: "Excel",
  },
]

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const getMetricIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getMetricColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
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
              <BarChart3 className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">Reports & Analytics</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
              <TabsTrigger value="custom">Custom Reports</TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-6">
            {/* Report Categories */}
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {reportCategories.map((category) => (
                <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <category.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-xs text-gray-500">{category.count} reports</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Key Metrics Overview */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Financial Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span>Financial Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(financialMetrics).map(([key, metric]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </p>
                        <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getMetricIcon(metric.trend)}
                        <span className={`text-sm ${getMetricColor(metric.trend)}`}>{metric.change}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Maintenance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wrench className="h-5 w-5 text-blue-600" />
                    <span>Maintenance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(maintenanceMetrics).map(([key, metric]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </p>
                        <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getMetricIcon(metric.trend)}
                        <span className={`text-sm ${getMetricColor(metric.trend)}`}>{metric.change}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Occupancy Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5 text-purple-600" />
                    <span>Occupancy Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(occupancyMetrics).map(([key, metric]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </p>
                        <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getMetricIcon(metric.trend)}
                        <span className={`text-sm ${getMetricColor(metric.trend)}`}>{metric.change}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Reports</CardTitle>
                  <Button variant="outline" size="sm">
                    View All Reports
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{report.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Generated: {report.generatedDate}</span>
                            <span>Size: {report.size}</span>
                            <Badge variant="outline">{report.format}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <FinancialReports />
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-6">
            <MaintenanceReports />
          </TabsContent>

          <TabsContent value="occupancy" className="space-y-6">
            <OccupancyReports />
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            <CustomReports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function FinancialReports() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Financial Reports</h2>
        <p className="text-gray-600">Track revenue, payments, and financial performance</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Revenue Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Collection Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Month</th>
                  <th className="text-right p-2">Revenue</th>
                  <th className="text-right p-2">Collections</th>
                  <th className="text-right p-2">Outstanding</th>
                  <th className="text-right p-2">Collection Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">January 2024</td>
                  <td className="text-right p-2">AED 245,000</td>
                  <td className="text-right p-2">AED 232,000</td>
                  <td className="text-right p-2">AED 13,000</td>
                  <td className="text-right p-2">94.7%</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">December 2023</td>
                  <td className="text-right p-2">AED 240,000</td>
                  <td className="text-right p-2">AED 238,000</td>
                  <td className="text-right p-2">AED 2,000</td>
                  <td className="text-right p-2">99.2%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MaintenanceReports() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Maintenance Reports</h2>
        <p className="text-gray-600">Monitor service requests and maintenance performance</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Request Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Request Volume Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resolution Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Resolution Time Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">45</div>
              <div className="text-sm text-gray-600">AC Maintenance</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">32</div>
              <div className="text-sm text-gray-600">Plumbing</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">28</div>
              <div className="text-sm text-gray-600">Electrical</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">19</div>
              <div className="text-sm text-gray-600">General</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function OccupancyReports() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Occupancy Reports</h2>
        <p className="text-gray-600">Track unit occupancy and tenant information</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Occupancy Rate Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Unit Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Unit Types Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Building Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-gray-900">250</div>
              <div className="text-sm text-gray-600">Total Units</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">241</div>
              <div className="text-sm text-gray-600">Occupied</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-red-600">9</div>
              <div className="text-sm text-gray-600">Vacant</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">96.2%</div>
              <div className="text-sm text-gray-600">Occupancy Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CustomReports() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Custom Reports</h2>
        <p className="text-gray-600">Create and schedule custom reports based on your needs</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Builder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Name</label>
              <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter report name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="occupancy">Occupancy</SelectItem>
                  <SelectItem value="amenities">Amenities</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-week">Last Week</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-quarter">Last Quarter</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Filters</label>
            <div className="grid md:grid-cols-3 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Building" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Buildings</SelectItem>
                  <SelectItem value="tower-a">Tower A</SelectItem>
                  <SelectItem value="tower-b">Tower B</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Unit Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" className="flex-1">
              Save Template
            </Button>
            <Button className="flex-1">Generate Report</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Monthly Financial Summary</h4>
                <p className="text-sm text-gray-600">Runs on the 1st of every month</p>
              </div>
              <div className="flex space-x-2">
                <Badge variant="secondary">Active</Badge>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Weekly Maintenance Report</h4>
                <p className="text-sm text-gray-600">Runs every Monday at 9 AM</p>
              </div>
              <div className="flex space-x-2">
                <Badge variant="secondary">Active</Badge>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
