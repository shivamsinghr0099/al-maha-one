"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Wrench,
  Hammer,
  CreditCard,
  Eye,
  HardHat,
  AlertTriangle,
  Calendar,
  Users,
  DollarSign,
  MessageSquare,
  Bell,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Building,
  Car,
  Wifi,
  Shield,
  CableCarIcon as Elevator,
  HelpCircle,
} from "lucide-react"
import { MahaLogo } from "@/components/maha-logo"
import { TouchNavigation, FloatingActionButton } from "@/components/touch-navigation"
import { SmartRecommendations, QuickRecommendations } from "@/components/recommendations"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import { SmartSearch } from "@/components/smart-search"

const quickActions = [
  {
    id: "move-in-out",
    title: "Move In/Out",
    titleAr: "الانتقال للداخل/الخارج",
    description: "Schedule moving services",
    descriptionAr: "جدولة خدمات النقل",
    icon: Home,
    color: "from-primary to-primary-600",
    bgColor: "bg-primary/10",
    route: "/move-in-out",
    urgent: false,
  },
  {
    id: "home-services",
    title: "Home Services",
    titleAr: "الخدمات المنزلية",
    description: "AC, Plumbing, Electrical",
    descriptionAr: "التكييف، السباكة، الكهرباء",
    icon: Wrench,
    color: "from-secondary to-secondary-600",
    bgColor: "bg-secondary/10",
    route: "/maintenance",
    urgent: false,
  },
  {
    id: "home-modification",
    title: "Home Modification",
    titleAr: "تعديل المنزل",
    description: "Structural changes",
    descriptionAr: "التغييرات الهيكلية",
    icon: Hammer,
    color: "from-neutral to-neutral-600",
    bgColor: "bg-neutral/10",
    route: "/tenant/home-modification",
    urgent: false,
  },
  {
    id: "parking-access",
    title: "Parking & Access",
    titleAr: "المواقف والوصول",
    description: "Cards & permits",
    descriptionAr: "البطاقات والتصاريح",
    icon: CreditCard,
    color: "from-accent to-accent-600",
    bgColor: "bg-accent/10",
    route: "/parking",
    urgent: false,
  },
  {
    id: "azure-eye",
    title: "Azure Eye",
    titleAr: "عين أزور",
    description: "Report issues",
    descriptionAr: "الإبلاغ عن المشاكل",
    icon: Eye,
    color: "from-primary to-primary-600",
    bgColor: "bg-primary/10",
    route: "/azure-eye",
    urgent: false,
  },
  {
    id: "contractor-permit",
    title: "Contractor Permit",
    titleAr: "تصريح المقاول",
    description: "Access permits",
    descriptionAr: "تصاريح الوصول",
    icon: HardHat,
    color: "from-secondary to-secondary-600",
    bgColor: "bg-secondary/10",
    route: "/tenant/contractor-permit",
    urgent: false,
  },
  {
    id: "violations",
    title: "Violations & Penalties",
    titleAr: "المخالفات والغرامات",
    description: "View notices",
    descriptionAr: "عرض الإشعارات",
    icon: AlertTriangle,
    color: "from-accent to-accent-600",
    bgColor: "bg-accent/10",
    route: "/tenant/violations",
    urgent: true,
  },
  {
    id: "amenities",
    title: "Amenities Booking",
    titleAr: "حجز المرافق",
    description: "Pool, Gym, BBQ",
    descriptionAr: "المسبح، الجيم، الشواء",
    icon: Calendar,
    color: "from-success to-success-600",
    bgColor: "bg-success/10",
    route: "/amenities",
    urgent: false,
  },
  {
    id: "visitors",
    title: "Visitor Management",
    titleAr: "إدارة الزوار",
    description: "Add & track visitors",
    descriptionAr: "إضافة وتتبع الزوار",
    icon: Users,
    color: "from-primary to-primary-600",
    bgColor: "bg-primary/10",
    route: "/tenant/visitors",
    urgent: false,
  },
  {
    id: "lift-booking",
    title: "Lift Booking",
    titleAr: "حجز المصعد",
    description: "Reserve lift usage",
    descriptionAr: "حجز استخدام المصعد",
    icon: Elevator,
    color: "from-secondary to-secondary-600",
    bgColor: "bg-secondary/10",
    route: "/tenant/lift-booking",
    urgent: false,
  },
  {
    id: "payments",
    title: "Payments & Billing",
    titleAr: "المدفوعات والفواتير",
    description: "Pay bills & fees",
    descriptionAr: "دفع الفواتير والرسوم",
    icon: DollarSign,
    color: "from-warning to-warning-600",
    bgColor: "bg-warning/10",
    route: "/payments",
    urgent: false,
  },
  {
    id: "community",
    title: "Community Forum",
    titleAr: "منتدى المجتمع",
    description: "Discussions & announcements",
    descriptionAr: "المناقشات والإعلانات",
    icon: MessageSquare,
    color: "from-accent to-accent-600",
    bgColor: "bg-accent/10",
    route: "/community",
    urgent: false,
  },
  {
    id: "support",
    title: "Support & Help Center",
    titleAr: "مركز الدعم والمساعدة",
    description: "FAQs & emergency requests",
    descriptionAr: "الأسئلة الشائعة والطلبات الطارئة",
    icon: HelpCircle,
    color: "from-info to-info-600",
    bgColor: "bg-info/10",
    route: "/help",
    urgent: false,
  },
]

const recentActivities = [
  {
    id: 1,
    type: "maintenance",
    title: "AC Maintenance Request",
    titleAr: "طلب صيانة التكييف",
    status: "completed",
    date: "2024-01-15",
    time: "10:30 AM",
  },
  {
    id: 2,
    type: "visitor",
    title: "Visitor Gate Pass",
    titleAr: "تصريح دخول زائر",
    status: "approved",
    date: "2024-01-14",
    time: "2:15 PM",
  },
  {
    id: 3,
    type: "payment",
    title: "Monthly Rent Payment",
    titleAr: "دفع الإيجار الشهري",
    status: "paid",
    date: "2024-01-10",
    time: "9:00 AM",
  },
  {
    id: 4,
    type: "amenity",
    title: "Pool Booking",
    titleAr: "حجز المسبح",
    status: "confirmed",
    date: "2024-01-12",
    time: "6:00 PM",
  },
]

const notifications = [
  {
    id: 1,
    type: "announcement",
    title: "Building Maintenance Notice",
    titleAr: "إشعار صيانة المبنى",
    message: "Scheduled maintenance on Sunday 9 AM - 12 PM",
    messageAr: "صيانة مجدولة يوم الأحد 9 صباحاً - 12 ظهراً",
    date: "2024-01-16",
    urgent: true,
  },
  {
    id: 2,
    type: "payment",
    title: "Payment Reminder",
    titleAr: "تذكير بالدفع",
    message: "Monthly service fee due in 3 days",
    messageAr: "رسوم الخدمة الشهرية مستحقة خلال 3 أيام",
    date: "2024-01-15",
    urgent: false,
  },
  {
    id: 3,
    type: "approval",
    title: "Request Approved",
    titleAr: "تم الموافقة على الطلب",
    message: "Your home modification request has been approved",
    messageAr: "تم الموافقة على طلب تعديل المنزل الخاص بك",
    date: "2024-01-14",
    urgent: false,
  },
]

export default function TenantDashboard() {
  const [isArabic, setIsArabic] = useState(false)
  const [userInfo, setUserInfo] = useState({ username: "", userType: "" })

  useEffect(() => {
    try {
      const username = localStorage.getItem("username") || "Tenant"
      const userType = localStorage.getItem("userType") || "tenant"
      setUserInfo({ username, userType })
    } catch (error) {
      console.warn("Failed to load user info:", error)
      setUserInfo({ username: "Tenant", userType: "tenant" })
    }
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "paid":
      case "approved":
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-error" />
      default:
        return <AlertCircle className="h-4 w-4 text-primary" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "paid":
      case "approved":
      case "confirmed":
        return "bg-success/10 text-success"
      case "pending":
        return "bg-warning/10 text-warning"
      case "rejected":
        return "bg-error/10 text-error"
      default:
        return "bg-primary/10 text-primary"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Touch Navigation */}
      <TouchNavigation />

      {/* Desktop Header */}
      <div className="hidden md:block bg-white/95 backdrop-blur-md border-b border-neutral/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <MahaLogo size="sm" variant="primary" />
              <div>
                <h1 className="text-xl font-bold text-neutral font-serif">
                  {isArabic ? "لوحة تحكم المستأجر" : "Tenant Dashboard"}
                </h1>
                <p className="text-sm text-neutral/70">
                  {isArabic ? `مرحباً، ${userInfo.username}` : `Welcome, ${userInfo.username}`}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-80">
                <SmartSearch />
              </div>

              <DarkModeToggle />

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsArabic(!isArabic)}
                className="border-primary/30 text-neutral hover:bg-primary/10"
              >
                {isArabic ? "English" : "عربي"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="border-accent/30 text-accent hover:bg-accent/10"
                onClick={() => {
                  try {
                    localStorage.clear()
                    window.location.href = "/"
                  } catch (error) {
                    console.warn("Failed to clear storage:", error)
                    window.location.href = "/"
                  }
                }}
              >
                {isArabic ? "تسجيل الخروج" : "Logout"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        {/* Property Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card className="border-0 shadow-brand bg-white/90 backdrop-blur-sm">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral/70 mb-1">{isArabic ? "الوحدة" : "Unit"}</p>
                  <p className="text-xl md:text-2xl font-bold text-neutral">A-1205</p>
                </div>
                <Building className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-brand bg-white/90 backdrop-blur-sm">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral/70 mb-1">{isArabic ? "موقف السيارة" : "Parking"}</p>
                  <p className="text-xl md:text-2xl font-bold text-neutral">P-45</p>
                </div>
                <Car className="h-6 w-6 md:h-8 md:w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-brand bg-white/90 backdrop-blur-sm">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral/70 mb-1">{isArabic ? "الحالة" : "Status"}</p>
                  <Badge className="bg-success/10 text-success">{isArabic ? "نشط" : "Active"}</Badge>
                </div>
                <Shield className="h-6 w-6 md:h-8 md:w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-brand bg-white/90 backdrop-blur-sm">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral/70 mb-1">{isArabic ? "الإنترنت" : "Internet"}</p>
                  <Badge className="bg-primary/10 text-primary">{isArabic ? "متصل" : "Connected"}</Badge>
                </div>
                <Wifi className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Grid - Updated to include all services from documentation */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neutral mb-6 font-serif">
            {isArabic ? "الإجراءات السريعة" : "Quick Actions"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {quickActions.map((action) => (
              <Card
                key={action.id}
                className={`border-0 shadow-brand hover:shadow-brand-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${action.bgColor} backdrop-blur-sm overflow-hidden relative group`}
                onClick={() => (window.location.href = action.route)}
                style={{
                  minHeight: "120px", // Touch target optimization
                }}
              >
                {action.urgent && (
                  <div className="absolute top-2 right-2 z-10">
                    <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 group-hover:from-white/70 group-hover:to-white/40 transition-all duration-300"></div>

                <CardContent className="relative p-4 text-center h-full flex flex-col justify-center">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl mx-auto mb-3 flex items-center justify-center shadow-brand group-hover:shadow-brand-lg transition-all duration-300`}
                  >
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-neutral text-sm mb-1">
                    {isArabic ? action.titleAr : action.title}
                  </h3>
                  <p className="text-xs text-neutral/70 leading-tight">
                    {isArabic ? action.descriptionAr : action.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Smart Recommendations */}
            <div className="hidden md:block">
              <SmartRecommendations />
            </div>

            {/* Recent Activities */}
            <Card className="border-0 shadow-brand bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-neutral font-serif flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  {isArabic ? "الأنشطة الأخيرة" : "Recent Activities"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-neutral/5 rounded-xl">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(activity.status)}
                        <div>
                          <h4 className="font-medium text-neutral">{isArabic ? activity.titleAr : activity.title}</h4>
                          <p className="text-sm text-neutral/70">
                            {activity.date} at {activity.time}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mobile Recommendations */}
            <div className="md:hidden">
              <QuickRecommendations />
            </div>

            {/* Notifications */}
            <Card className="border-0 shadow-brand bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-neutral font-serif flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-accent" />
                  {isArabic ? "الإشعارات" : "Notifications"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-xl border-l-4 ${
                        notification.urgent ? "border-accent bg-accent/5" : "border-primary bg-primary/5"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-neutral text-sm">
                          {isArabic ? notification.titleAr : notification.title}
                        </h4>
                        {notification.urgent && <AlertTriangle className="h-4 w-4 text-accent flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-neutral/70 mb-2">
                        {isArabic ? notification.messageAr : notification.message}
                      </p>
                      <p className="text-xs text-neutral/50">{notification.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Outstanding Payments */}
            <Card className="border-0 shadow-brand bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-neutral font-serif flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-warning" />
                  {isArabic ? "المدفوعات المستحقة" : "Outstanding Payments"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-warning/10 rounded-xl">
                    <span className="text-sm font-medium text-neutral">{isArabic ? "رسوم الخدمة" : "Service Fee"}</span>
                    <span className="font-bold text-warning">AED 150</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-error/10 rounded-xl">
                    <span className="text-sm font-medium text-neutral">{isArabic ? "غرامة التأخير" : "Late Fee"}</span>
                    <span className="font-bold text-error">AED 50</span>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl h-12"
                    style={{ minHeight: "48px" }} // Touch target optimization
                    onClick={() => (window.location.href = "/payments")}
                  >
                    {isArabic ? "ادفع الآن" : "Pay Now"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  )
}
