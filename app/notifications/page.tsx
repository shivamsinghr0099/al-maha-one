"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowLeft,
  Bell,
  Search,
  BookMarkedIcon as MarkAsRead,
  Trash2,
  Settings,
  CheckCircle,
  Calendar,
  CreditCard,
  Wrench,
  Users,
  Building,
  Eye,
  MessageSquare,
  Clock,
} from "lucide-react"
import Link from "next/link"

const notifications = [
  {
    id: 1,
    title: "Maintenance Request Completed",
    message: "Your AC servicing request #MR001 has been completed successfully.",
    type: "maintenance",
    priority: "medium",
    read: false,
    timestamp: "2024-01-22T10:30:00Z",
    actionRequired: false,
    category: "Service",
    icon: Wrench,
  },
  {
    id: 2,
    title: "Payment Due Reminder",
    message: "Your service charges payment of AED 1,250 is due on January 31st.",
    type: "payment",
    priority: "high",
    read: false,
    timestamp: "2024-01-22T09:15:00Z",
    actionRequired: true,
    category: "Billing",
    icon: CreditCard,
  },
  {
    id: 3,
    title: "Visitor Access Approved",
    message: "John Smith's visitor pass for today has been approved.",
    type: "visitor",
    priority: "low",
    read: true,
    timestamp: "2024-01-21T16:45:00Z",
    actionRequired: false,
    category: "Access",
    icon: Users,
  },
  {
    id: 4,
    title: "Community Event: BBQ Night",
    message: "Join us for a community BBQ event this Saturday at 6 PM in the BBQ area.",
    type: "event",
    priority: "medium",
    read: false,
    timestamp: "2024-01-21T14:20:00Z",
    actionRequired: false,
    category: "Community",
    icon: Calendar,
  },
  {
    id: 5,
    title: "Pool Maintenance Notice",
    message: "The swimming pool will be closed for maintenance on January 25-26.",
    type: "announcement",
    priority: "high",
    read: true,
    timestamp: "2024-01-20T11:00:00Z",
    actionRequired: false,
    category: "Facility",
    icon: Building,
  },
  {
    id: 6,
    title: "Azure Eye Report Update",
    message: "Your complaint #AE001 about the broken elevator has been acknowledged.",
    type: "complaint",
    priority: "medium",
    read: false,
    timestamp: "2024-01-20T08:30:00Z",
    actionRequired: false,
    category: "Complaint",
    icon: Eye,
  },
  {
    id: 7,
    title: "New Community Forum Post",
    message: "Sarah Johnson posted about organizing a community cleanup day.",
    type: "forum",
    priority: "low",
    read: true,
    timestamp: "2024-01-19T19:15:00Z",
    actionRequired: false,
    category: "Community",
    icon: MessageSquare,
  },
  {
    id: 8,
    title: "Amenity Booking Confirmed",
    message: "Your gym booking for tomorrow 8-10 AM has been confirmed.",
    type: "booking",
    priority: "medium",
    read: false,
    timestamp: "2024-01-19T15:30:00Z",
    actionRequired: false,
    category: "Booking",
    icon: CheckCircle,
  },
]

const notificationStats = {
  total: notifications.length,
  unread: notifications.filter((n) => !n.read).length,
  actionRequired: notifications.filter((n) => n.actionRequired).length,
  high: notifications.filter((n) => n.priority === "high").length,
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "maintenance":
        return Wrench
      case "payment":
        return CreditCard
      case "visitor":
        return Users
      case "event":
        return Calendar
      case "announcement":
        return Building
      case "complaint":
        return Eye
      case "forum":
        return MessageSquare
      case "booking":
        return CheckCircle
      default:
        return Bell
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "maintenance":
        return "bg-blue-100 text-blue-800"
      case "payment":
        return "bg-purple-100 text-purple-800"
      case "visitor":
        return "bg-green-100 text-green-800"
      case "event":
        return "bg-orange-100 text-orange-800"
      case "announcement":
        return "bg-red-100 text-red-800"
      case "complaint":
        return "bg-yellow-100 text-yellow-800"
      case "forum":
        return "bg-indigo-100 text-indigo-800"
      case "booking":
        return "bg-teal-100 text-teal-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || notification.type === filterType
    const matchesPriority = filterPriority === "all" || notification.priority === filterPriority
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "unread" && !notification.read) ||
      (activeTab === "action" && notification.actionRequired)

    return matchesSearch && matchesType && matchesPriority && matchesTab
  })

  const toggleNotificationSelection = (id: number) => {
    setSelectedNotifications((prev) => (prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id]))
  }

  const selectAllNotifications = () => {
    setSelectedNotifications(filteredNotifications.map((n) => n.id))
  }

  const clearSelection = () => {
    setSelectedNotifications([])
  }

  const markAsRead = () => {
    // Implementation for marking selected notifications as read
    console.log("Mark as read:", selectedNotifications)
    clearSelection()
  }

  const deleteSelected = () => {
    // Implementation for deleting selected notifications
    console.log("Delete:", selectedNotifications)
    clearSelection()
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
              <Bell className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">Notifications</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{notificationStats.total}</div>
              <div className="text-sm text-gray-500">Total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{notificationStats.unread}</div>
              <div className="text-sm text-gray-500">Unread</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{notificationStats.actionRequired}</div>
              <div className="text-sm text-gray-500">Action Required</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{notificationStats.high}</div>
              <div className="text-sm text-gray-500">High Priority</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <TabsList>
              <TabsTrigger value="all">All ({notificationStats.total})</TabsTrigger>
              <TabsTrigger value="unread">Unread ({notificationStats.unread})</TabsTrigger>
              <TabsTrigger value="action">Action Required ({notificationStats.actionRequired})</TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search notifications..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="visitor">Visitor</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="announcement">Announcement</SelectItem>
                <SelectItem value="complaint">Complaint</SelectItem>
                <SelectItem value="forum">Forum</SelectItem>
                <SelectItem value="booking">Booking</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Actions */}
          {selectedNotifications.length > 0 && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-blue-900">
                      {selectedNotifications.length} notification{selectedNotifications.length > 1 ? "s" : ""} selected
                    </span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={selectAllNotifications}>
                        Select All
                      </Button>
                      <Button size="sm" variant="outline" onClick={clearSelection}>
                        Clear
                      </Button>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={markAsRead}>
                      <MarkAsRead className="h-4 w-4 mr-2" />
                      Mark as Read
                    </Button>
                    <Button size="sm" variant="outline" onClick={deleteSelected}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <TabsContent value={activeTab} className="space-y-4">
            {filteredNotifications.map((notification) => {
              const IconComponent = getNotificationIcon(notification.type)
              return (
                <Card
                  key={notification.id}
                  className={`transition-all hover:shadow-md ${
                    !notification.read ? "bg-blue-50 border-blue-200" : ""
                  } ${selectedNotifications.includes(notification.id) ? "ring-2 ring-blue-500" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        checked={selectedNotifications.includes(notification.id)}
                        onCheckedChange={() => toggleNotificationSelection(notification.id)}
                      />
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <IconComponent className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3
                            className={`text-lg font-semibold ${
                              !notification.read ? "text-gray-900" : "text-gray-700"
                            }`}
                          >
                            {notification.title}
                          </h3>
                          {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                          <Badge className={getPriorityColor(notification.priority)}>{notification.priority}</Badge>
                          <Badge variant="outline" className={getTypeColor(notification.type)}>
                            {notification.category}
                          </Badge>
                          {notification.actionRequired && (
                            <Badge className="bg-orange-100 text-orange-800">Action Required</Badge>
                          )}
                        </div>
                        <p className={`mb-3 ${!notification.read ? "text-gray-900" : "text-gray-600"}`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>{formatTimeAgo(notification.timestamp)}</span>
                          </div>
                          <div className="flex space-x-2">
                            {notification.actionRequired && <Button size="sm">Take Action</Button>}
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            {!notification.read && (
                              <Button variant="ghost" size="sm">
                                <MarkAsRead className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {filteredNotifications.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search terms</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
