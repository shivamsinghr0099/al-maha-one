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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ArrowLeft,
  HelpCircle,
  Search,
  Phone,
  Mail,
  MessageSquare,
  FileText,
  Video,
  ExternalLink,
  Clock,
  Star,
  ThumbsUp,
  ThumbsDown,
  Send,
  Book,
  Users,
  Settings,
  CreditCard,
  Car,
  Wrench,
  Calendar,
} from "lucide-react"
import Link from "next/link"

const faqCategories = [
  { id: "general", name: "General", icon: HelpCircle, count: 12 },
  { id: "payments", name: "Payments & Billing", icon: CreditCard, count: 8 },
  { id: "maintenance", name: "Maintenance", icon: Wrench, count: 15 },
  { id: "amenities", name: "Amenities", icon: Calendar, count: 10 },
  { id: "parking", name: "Parking", icon: Car, count: 6 },
  { id: "visitors", name: "Visitors", icon: Users, count: 9 },
  { id: "documents", name: "Documents", icon: FileText, count: 7 },
  { id: "account", name: "Account & Profile", icon: Settings, count: 5 },
]

const faqs = [
  {
    id: 1,
    category: "general",
    question: "How do I access the Maha One portal?",
    answer:
      "You can access the Maha One portal through our website or mobile app. Use your registered email and password to log in. If you haven't registered yet, contact building management for your access credentials.",
    helpful: 45,
    notHelpful: 3,
  },
  {
    id: 2,
    category: "payments",
    question: "When are service charges due?",
    answer:
      "Service charges are due on the last day of each month. You'll receive a notification 7 days before the due date. Late payments may incur additional charges as per your lease agreement.",
    helpful: 38,
    notHelpful: 2,
  },
  {
    id: 3,
    category: "maintenance",
    question: "How do I submit a maintenance request?",
    answer:
      "Go to the Maintenance section in the portal, select the type of service needed, describe the issue, and submit your request. You'll receive a confirmation and tracking number.",
    helpful: 52,
    notHelpful: 1,
  },
  {
    id: 4,
    category: "amenities",
    question: "How far in advance can I book amenities?",
    answer:
      "You can book amenities up to 30 days in advance. Some popular facilities like the function room may require earlier booking during peak seasons.",
    helpful: 29,
    notHelpful: 4,
  },
  {
    id: 5,
    category: "parking",
    question: "How do I get an additional parking space?",
    answer:
      "Submit a parking request through the Parking Management section. Additional spaces are subject to availability and may incur monthly charges.",
    helpful: 33,
    notHelpful: 6,
  },
  {
    id: 6,
    category: "visitors",
    question: "How long is a visitor pass valid?",
    answer:
      "Standard visitor passes are valid for 24 hours from the time of entry. For extended stays, you can request multi-day passes through the visitor management system.",
    helpful: 41,
    notHelpful: 2,
  },
]

const supportTickets = [
  {
    id: "TKT001",
    subject: "Unable to access gym booking",
    category: "Technical",
    status: "open",
    priority: "medium",
    created: "2024-01-22",
    lastUpdate: "2024-01-22",
    assignedTo: "Tech Support",
  },
  {
    id: "TKT002",
    subject: "Parking access card not working",
    category: "Access",
    status: "in-progress",
    priority: "high",
    created: "2024-01-20",
    lastUpdate: "2024-01-21",
    assignedTo: "Security Team",
  },
  {
    id: "TKT003",
    subject: "Question about service charges",
    category: "Billing",
    status: "resolved",
    priority: "low",
    created: "2024-01-18",
    lastUpdate: "2024-01-19",
    assignedTo: "Finance Team",
  },
]

const tutorials = [
  {
    id: 1,
    title: "Getting Started with Maha One Portal",
    description: "Learn the basics of navigating the portal",
    duration: "5 min",
    type: "video",
    category: "general",
  },
  {
    id: 2,
    title: "How to Submit Maintenance Requests",
    description: "Step-by-step guide to reporting issues",
    duration: "3 min",
    type: "video",
    category: "maintenance",
  },
  {
    id: 3,
    title: "Booking Amenities Guide",
    description: "Reserve community facilities easily",
    duration: "4 min",
    type: "guide",
    category: "amenities",
  },
  {
    id: 4,
    title: "Managing Your Payments",
    description: "View bills and make payments",
    duration: "6 min",
    type: "video",
    category: "payments",
  },
]

const contactMethods = [
  {
    title: "Live Chat",
    description: "Chat with our support team",
    availability: "24/7",
    responseTime: "< 5 minutes",
    icon: MessageSquare,
    action: "Start Chat",
  },
  {
    title: "Phone Support",
    description: "Call our helpline",
    availability: "8 AM - 8 PM",
    responseTime: "Immediate",
    icon: Phone,
    action: "Call Now",
  },
  {
    title: "Email Support",
    description: "Send us an email",
    availability: "24/7",
    responseTime: "< 2 hours",
    icon: Mail,
    action: "Send Email",
  },
  {
    title: "Video Call",
    description: "Schedule a video consultation",
    availability: "9 AM - 6 PM",
    responseTime: "Same day",
    icon: Video,
    action: "Schedule Call",
  },
]

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState("faq")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
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
              <HelpCircle className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">Help & Support</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for help articles, guides, or ask a question..."
              className="pl-12 py-3 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-6">
            {/* FAQ Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
              <Card
                className={`cursor-pointer transition-all ${
                  selectedCategory === "all" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                }`}
                onClick={() => setSelectedCategory("all")}
              >
                <CardContent className="p-4 text-center">
                  <HelpCircle className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                  <h3 className="text-sm font-medium text-gray-900">All</h3>
                  <p className="text-xs text-gray-500">{faqs.length}</p>
                </CardContent>
              </Card>
              {faqCategories.map((category) => (
                <Card
                  key={category.id}
                  className={`cursor-pointer transition-all ${
                    selectedCategory === category.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardContent className="p-4 text-center">
                    <category.icon className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                    <h3 className="text-sm font-medium text-gray-900">{category.name}</h3>
                    <p className="text-xs text-gray-500">{category.count}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* FAQ List */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFaqs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id.toString()}>
                      <AccordionTrigger className="text-left hover:no-underline">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium">{faq.question}</span>
                          <Badge variant="outline" className="ml-auto">
                            {faqCategories.find((cat) => cat.id === faq.category)?.name}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-4">
                          <p className="text-gray-700 mb-4">{faq.answer}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">Was this helpful?</div>
                            <div className="flex items-center space-x-4">
                              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                {faq.helpful}
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <ThumbsDown className="h-4 w-4 mr-1" />
                                {faq.notHelpful}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tutorials" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Video Tutorials & Guides</h2>
              <p className="text-gray-600">Learn how to use Maha One portal features</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.map((tutorial) => (
                <Card key={tutorial.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      {tutorial.type === "video" ? (
                        <Video className="h-8 w-8 text-blue-600" />
                      ) : (
                        <Book className="h-8 w-8 text-green-600" />
                      )}
                      <div>
                        <Badge variant="outline">{tutorial.category}</Badge>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{tutorial.title}</h3>
                    <p className="text-gray-600 mb-4">{tutorial.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{tutorial.duration}</span>
                      </div>
                      <Button size="sm">
                        {tutorial.type === "video" ? "Watch" : "Read"}
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Support</h2>
              <p className="text-gray-600">Choose the best way to reach our support team</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {contactMethods.map((method, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <method.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-600 mb-3">{method.description}</p>
                    <div className="space-y-1 text-sm text-gray-500 mb-4">
                      <p>Available: {method.availability}</p>
                      <p>Response: {method.responseTime}</p>
                    </div>
                    <Button className="w-full">{method.action}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Support Tickets</h2>
              <Button>
                <MessageSquare className="h-4 w-4 mr-2" />
                New Ticket
              </Button>
            </div>

            <div className="space-y-4">
              {supportTickets.map((ticket) => (
                <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{ticket.subject}</h3>
                          <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                          <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>Ticket ID: {ticket.id}</p>
                          <p>Category: {ticket.category}</p>
                          <p>Assigned to: {ticket.assignedTo}</p>
                          <p>Created: {ticket.created}</p>
                          <p>Last Update: {ticket.lastUpdate}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Add Comment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Share Your Feedback</h2>
              <p className="text-gray-600">Help us improve Maha One portal with your suggestions</p>
            </div>

            <FeedbackForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ContactForm() {
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    priority: "medium",
    description: "",
    attachments: [],
  })

  return (
    <form className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Brief description of your issue"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technical">Technical Issue</SelectItem>
              <SelectItem value="billing">Billing Question</SelectItem>
              <SelectItem value="access">Access Problem</SelectItem>
              <SelectItem value="feature">Feature Request</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low - General inquiry</SelectItem>
            <SelectItem value="medium">Medium - Standard issue</SelectItem>
            <SelectItem value="high">High - Urgent problem</SelectItem>
            <SelectItem value="critical">Critical - System down</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Please provide detailed information about your issue..."
          rows={6}
        />
      </div>

      <div className="space-y-2">
        <Label>Attachments (Optional)</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Click to upload files or drag and drop</p>
          <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button type="button" variant="outline" className="flex-1">
          Save as Draft
        </Button>
        <Button type="submit" className="flex-1">
          <Send className="h-4 w-4 mr-2" />
          Send Message
        </Button>
      </div>
    </form>
  )
}

function FeedbackForm() {
  const [rating, setRating] = useState(0)
  const [feedbackType, setFeedbackType] = useState("")
  const [feedback, setFeedback] = useState("")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rate Your Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-gray-600 mb-4">How would you rate your overall experience with Maha One portal?</p>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button key={star} variant="ghost" size="sm" onClick={() => setRating(star)} className="p-1">
                <Star className={`h-8 w-8 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
              </Button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              {rating === 5
                ? "Excellent!"
                : rating === 4
                  ? "Good"
                  : rating === 3
                    ? "Average"
                    : rating === 2
                      ? "Poor"
                      : "Very Poor"}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="feedbackType">Feedback Type</Label>
          <Select value={feedbackType} onValueChange={setFeedbackType}>
            <SelectTrigger>
              <SelectValue placeholder="What would you like to share?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="compliment">Compliment</SelectItem>
              <SelectItem value="suggestion">Suggestion</SelectItem>
              <SelectItem value="complaint">Complaint</SelectItem>
              <SelectItem value="bug-report">Bug Report</SelectItem>
              <SelectItem value="feature-request">Feature Request</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="feedback">Your Feedback</Label>
          <Textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Please share your thoughts, suggestions, or report any issues..."
            rows={5}
          />
        </div>

        <div className="flex space-x-4">
          <Button variant="outline" className="flex-1">
            Cancel
          </Button>
          <Button className="flex-1">
            <Send className="h-4 w-4 mr-2" />
            Submit Feedback
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
