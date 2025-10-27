"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Users,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  QrCode,
  ArrowLeft,
  User,
  HardHat,
  Star,
  History,
  AlertCircle,
} from "lucide-react"
import { MahaLogo } from "@/components/maha-logo"

const existingVisitors = [
  { id: 1, name: "Ahmed Al-Rashid", phone: "+971501234567", lastVisit: "2024-01-10" },
  { id: 2, name: "Sarah Johnson", phone: "+971509876543", lastVisit: "2024-01-08" },
  { id: 3, name: "Mohammed Hassan", phone: "+971507654321", lastVisit: "2024-01-05" },
  { id: 4, name: "Lisa Chen", phone: "+971502468135", lastVisit: "2024-01-03" },
]

const upcomingVisitors = [
  {
    id: 1,
    name: "Ahmed Al-Rashid",
    phone: "+971501234567",
    date: "2024-01-20",
    time: "14:00",
    purpose: "Family visit",
    purposeAr: "زيارة عائلية",
    accompanying: 2,
    status: "approved",
    type: "guest",
    qrCode: "QR123456",
  },
  {
    id: 2,
    name: "AC Repair Services",
    phone: "+971504567890",
    date: "2024-01-21",
    time: "10:00",
    purpose: "AC maintenance",
    purposeAr: "صيانة التكييف",
    accompanying: 1,
    status: "pending",
    type: "contractor",
    qrCode: null,
  },
  {
    id: 3,
    name: "Dr. Sarah Wilson",
    phone: "+971503456789",
    date: "2024-01-22",
    time: "16:00",
    purpose: "Medical consultation",
    purposeAr: "استشارة طبية",
    accompanying: 0,
    status: "approved",
    type: "special",
    qrCode: "QR789012",
  },
]

const pastVisitors = [
  {
    id: 1,
    name: "Mohammed Hassan",
    phone: "+971507654321",
    date: "2024-01-15",
    time: "18:30",
    purpose: "Business meeting",
    purposeAr: "اجتماع عمل",
    accompanying: 0,
    status: "completed",
    type: "guest",
  },
  {
    id: 2,
    name: "Cleaning Services Co.",
    phone: "+971506789012",
    date: "2024-01-12",
    time: "09:00",
    purpose: "Deep cleaning",
    purposeAr: "تنظيف عميق",
    accompanying: 2,
    status: "completed",
    type: "contractor",
  },
]

export default function VisitorManagement() {
  const [isArabic, setIsArabic] = useState(false)
  const [currentView, setCurrentView] = useState("main") // main, add-visitor, visitor-log, gate-pass
  const [selectedVisitorType, setSelectedVisitorType] = useState<"new" | "existing" | null>(null)
  const [selectedExistingVisitor, setSelectedExistingVisitor] = useState<any>(null)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    accompanying: "",
    purpose: "",
    specialInstructions: "",
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

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

  const getVisitorTypeIcon = (type: string) => {
    switch (type) {
      case "contractor":
        return <HardHat className="h-4 w-4" />
      case "special":
        return <Star className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const handleSubmitVisitor = (e: React.FormEvent) => {
    e.preventDefault()
    if (!termsAccepted) {
      alert(isArabic ? "يرجى الموافقة على الشروط والأحكام" : "Please accept the terms and conditions")
      return
    }

    // Here you would typically submit to an API
    alert(isArabic ? "تم إرسال طلب الزائر بنجاح" : "Visitor request submitted successfully")
    setCurrentView("main")
    setSelectedVisitorType(null)
    setSelectedExistingVisitor(null)
    setFormData({
      name: "",
      phone: "",
      date: "",
      time: "",
      accompanying: "",
      purpose: "",
      specialInstructions: "",
    })
    setTermsAccepted(false)
  }

  const renderMainView = () => (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card
          className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={() => setCurrentView("add-visitor")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-blue-800 mb-2">{isArabic ? "إضافة زائر" : "Add Visitor"}</h3>
            <p className="text-sm text-blue-700">
              {isArabic ? "إضافة زائر جديد أو موجود" : "Add new or existing visitor"}
            </p>
          </CardContent>
        </Card>

        <Card
          className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={() => setCurrentView("visitor-log")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <History className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-green-800 mb-2">{isArabic ? "سجل الزوار" : "Visitor Log"}</h3>
            <p className="text-sm text-green-700">
              {isArabic ? "عرض سجل الزوار السابقين" : "View past visitor records"}
            </p>
          </CardContent>
        </Card>

        <Card
          className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={() => setCurrentView("gate-pass")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <QrCode className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-purple-800 mb-2">{isArabic ? "تصريح الدخول" : "Gate Pass Approval"}</h3>
            <p className="text-sm text-purple-700">{isArabic ? "الموافقة على تصاريح الدخول" : "Gate pass approvals"}</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">{isArabic ? "إجمالي الزوار" : "Total Visitors"}</h3>
            <p className="text-2xl font-bold text-gray-800">{upcomingVisitors.length + pastVisitors.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Visitors */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 font-serif flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            {isArabic ? "الزوار القادمون" : "Upcoming Visitors"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingVisitors.map((visitor) => (
              <div
                key={visitor.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getVisitorTypeIcon(visitor.type)}
                    {getStatusIcon(visitor.status)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{visitor.name}</h4>
                    <p className="text-sm text-gray-600">
                      {visitor.date} at {visitor.time}
                    </p>
                    <p className="text-xs text-gray-500">
                      {isArabic ? visitor.purposeAr : visitor.purpose}
                      {visitor.accompanying > 0 && ` • +${visitor.accompanying} ${isArabic ? "مرافق" : "accompanying"}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(visitor.status)}>{visitor.status}</Badge>
                  {visitor.qrCode && (
                    <Button size="sm" variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                      <QrCode className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAddVisitorView = () => (
    <div className="space-y-6">
      {!selectedVisitorType ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif">
            {isArabic ? "اختر نوع الزائر" : "Select Visitor Type"}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card
              className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => setSelectedVisitorType("new")}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <Plus className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{isArabic ? "زائر جديد" : "New Visitor"}</h3>
                <p className="text-blue-700">
                  {isArabic ? "إضافة زائر جديد لم يزر من قبل" : "Add a new visitor who hasn't visited before"}
                </p>
              </CardContent>
            </Card>

            <Card
              className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => setSelectedVisitorType("existing")}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  {isArabic ? "زائر موجود" : "Existing Visitor"}
                </h3>
                <p className="text-green-700">
                  {isArabic ? "اختيار من الزوار السابقين" : "Select from previous visitors"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : selectedVisitorType === "existing" && !selectedExistingVisitor ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif">
            {isArabic ? "اختر زائر موجود" : "Select Existing Visitor"}
          </h2>
          <div className="grid gap-4">
            {existingVisitors.map((visitor) => (
              <Card
                key={visitor.id}
                className="border-0 shadow-lg bg-white/90 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  setSelectedExistingVisitor(visitor)
                  setFormData({
                    ...formData,
                    name: visitor.name,
                    phone: visitor.phone,
                  })
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{visitor.name}</h4>
                        <p className="text-sm text-gray-600">{visitor.phone}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      {isArabic ? "آخر زيارة:" : "Last visit:"} {visitor.lastVisit}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif">
            {isArabic ? "تفاصيل الزائر" : "Visitor Details"}
          </h2>
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <form onSubmit={handleSubmitVisitor} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-medium">
                      {isArabic ? "اسم الزائر" : "Visitor Name"} *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isArabic ? "أدخل اسم الزائر" : "Enter visitor name"}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                      required
                      disabled={selectedVisitorType === "existing"}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700 font-medium">
                      {isArabic ? "رقم الهاتف" : "Phone Number"} *
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={isArabic ? "أدخل رقم الهاتف" : "Enter phone number"}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                      required
                      disabled={selectedVisitorType === "existing"}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-gray-700 font-medium">
                      {isArabic ? "تاريخ الزيارة" : "Date & Time"} *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-gray-700 font-medium">
                      {isArabic ? "وقت الزيارة" : "Visit Time"} *
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accompanying" className="text-gray-700 font-medium">
                      {isArabic ? "عدد المرافقين" : "No. of Accompanying Persons"}
                    </Label>
                    <Input
                      id="accompanying"
                      type="number"
                      min="0"
                      max="10"
                      value={formData.accompanying}
                      onChange={(e) => setFormData({ ...formData, accompanying: e.target.value })}
                      placeholder="0"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purpose" className="text-gray-700 font-medium">
                      {isArabic ? "الغرض من الزيارة" : "Purpose of Visit"} *
                    </Label>
                    <Input
                      id="purpose"
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                      placeholder={isArabic ? "أدخل الغرض من الزيارة" : "Enter purpose of visit"}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructions" className="text-gray-700 font-medium">
                    {isArabic ? "تعليمات خاصة" : "Special Instructions"}
                  </Label>
                  <Textarea
                    id="instructions"
                    value={formData.specialInstructions}
                    onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                    placeholder={isArabic ? "أي تعليمات خاصة للأمن" : "Any special instructions for security"}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-600">
                    {isArabic
                      ? "أوافق على الشروط والأحكام وسياسة الخصوصية"
                      : "I agree to the Terms & Conditions and Privacy Policy"}
                  </Label>
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSelectedVisitorType(null)
                      setSelectedExistingVisitor(null)
                    }}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    {isArabic ? "رجوع" : "Back"}
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-xl flex-1"
                    disabled={!termsAccepted}
                  >
                    {isArabic ? "إرسال الطلب" : "Submit"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )

  const renderVisitorLogView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif">{isArabic ? "سجل الزوار" : "Visitor Log"}</h2>
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            {pastVisitors.map((visitor) => (
              <div
                key={visitor.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getVisitorTypeIcon(visitor.type)}
                    {getStatusIcon(visitor.status)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{visitor.name}</h4>
                    <p className="text-sm text-gray-600">
                      {visitor.date} at {visitor.time}
                    </p>
                    <p className="text-xs text-gray-500">
                      {isArabic ? visitor.purposeAr : visitor.purpose}
                      {visitor.accompanying > 0 && ` • +${visitor.accompanying} ${isArabic ? "مرافق" : "accompanying"}`}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(visitor.status)}>{visitor.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderGatePassView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif">
        {isArabic ? "تصاريح الدخول" : "Gate Pass Approval"}
      </h2>
      <div className="grid gap-6">
        {upcomingVisitors
          .filter((v) => v.qrCode)
          .map((visitor) => (
            <Card key={visitor.id} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                      <QrCode className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{visitor.name}</h4>
                      <p className="text-gray-600">{visitor.phone}</p>
                      <p className="text-sm text-gray-500">
                        {visitor.date} at {visitor.time}
                      </p>
                      <Badge className="bg-green-100 text-green-800 mt-1">{isArabic ? "معتمد" : "Approved"}</Badge>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white border-2 border-blue-500 rounded-lg flex items-center justify-center mb-2">
                      <QrCode className="h-16 w-16 text-blue-600" />
                    </div>
                    <p className="text-xs text-gray-500">{visitor.qrCode}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              {currentView !== "main" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setCurrentView("main")
                    setSelectedVisitorType(null)
                    setSelectedExistingVisitor(null)
                  }}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  {isArabic ? "رجوع" : "Back"}
                </Button>
              )}
              <MahaLogo size="sm" variant="primary" />
              <div>
                <h1 className="text-xl font-bold text-gray-800 font-serif">
                  {isArabic ? "إدارة الزوار" : "Visitor Management"}
                </h1>
                <p className="text-sm text-gray-600">{isArabic ? "إضافة وتتبع الزوار" : "Add and track visitors"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsArabic(!isArabic)}
                className="border-blue-300 text-gray-700 hover:bg-blue-50"
              >
                {isArabic ? "English" : "عربي"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="border-red-300 text-red-600 hover:bg-red-50"
                onClick={() => (window.location.href = "/tenant/dashboard")}
              >
                {isArabic ? "لوحة التحكم" : "Dashboard"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === "main" && renderMainView()}
        {currentView === "add-visitor" && renderAddVisitorView()}
        {currentView === "visitor-log" && renderVisitorLogView()}
        {currentView === "gate-pass" && renderGatePassView()}
      </div>
    </div>
  )
}
