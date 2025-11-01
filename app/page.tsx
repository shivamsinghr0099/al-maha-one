"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Copy, Check, MapPin, Shield, Building2, User } from "lucide-react"
import { LoadingScreen } from "@/components/loading-screen"
import { OnboardingFlow } from "@/components/onboarding"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import { authService } from "@/lib/api/auth"

const userTypes = [
  {
    type: "tenant",
    title: "Tenant",
    titleAr: "مستأجر",
    description: "Access your rental services and property management tools",
    descriptionAr: "الوصول إلى خدمات الإيجار وأدوات إدارة الممتلكات",
    color: "from-[#1C3F3A] to-[#2E7D8F]",
    bgColor: "bg-[#1C3F3A]/10",
    route: "/tenant/dashboard",
    icon: User,
    username: "tenant@mahaone.ae",
    password: "tenant123",
  },
  {
    type: "landlord",
    title: "Landlord",
    titleAr: "مالك العقار",
    description: "Manage your properties and tenant relationships",
    descriptionAr: "إدارة ممتلكاتك وعلاقات المستأجرين",
    color: "from-[#D4A85F] to-[#F4A261]",
    bgColor: "bg-[#D4A85F]/10",
    route: "/landlord/dashboard",
    icon: Building2,
    username: "landlord@mahaone.ae",
    password: "landlord123",
  },
  {
    type: "building-manager",
    title: "Building Manager",
    titleAr: "مدير المبنى",
    description: "Oversee building operations and tenant services",
    descriptionAr: "الإشراف على عمليات المبنى وخدمات المستأجرين",
    color: "from-[#C2C5AA] to-[#D4A85F]",
    bgColor: "bg-[#C2C5AA]/10",
    route: "/building-manager/dashboard",
    icon: Building2,
    username: "manager@mahaone.ae",
    password: "manager123",
  },
  {
    type: "super-admin",
    title: "Super Admin",
    titleAr: "المدير العام",
    description: "Complete system administration and oversight",
    descriptionAr: "إدارة النظام الكاملة والإشراف",
    color: "from-[#E56A5D] to-[#E76F51]",
    bgColor: "bg-[#E56A5D]/10",
    route: "/super-admin/dashboard",
    icon: Shield,
    username: "admin@mahaone.ae",
    password: "admin123",
  },
]

export default function LoginPage() {
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isArabic, setIsArabic] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      try {
        const hasVisited = localStorage.getItem("maha-has-visited")
        if (!hasVisited) {
          setShowOnboarding(true)
          localStorage.setItem("maha-has-visited", "true")
        }
      } catch (error) {
        console.warn("Failed to check visit status:", error)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!selectedUserType || !credentials.username || !credentials.password) {
      setError(isArabic ? "يرجى ملء جميع الحقول" : "Please fill in all fields")
      return
    }

    setIsSubmitting(true)

    try {
      console.log("[v0] Attempting login with:", credentials.username)

      const response = await authService.login(credentials.username, credentials.password)

      console.log("[v0] Login successful, token received")

      const selectedUser = userTypes.find((u) => u.type === selectedUserType)
      if (selectedUser) {
        window.location.href = selectedUser.route
      }
    } catch (err: any) {
      console.error("[v0] Login error:", err)
      setError(err.message || (isArabic ? "فشل تسجيل الدخول" : "Login failed"))
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleUserTypeSelect = (type: string) => {
    setSelectedUserType(type)
    const selectedUser = userTypes.find((u) => u.type === type)
    if (selectedUser) {
      setCredentials({
        username: selectedUser.username,
        password: selectedUser.password,
      })
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  if (showOnboarding) {
    return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />
  }

  const selectedUser = userTypes.find((u) => u.type === selectedUserType)

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#F8F6F3] via-white to-[#F8F6F3]">
      <div className="absolute inset-0 desert-pattern opacity-30" />

      <div className="absolute top-0 left-0 w-96 h-96 bg-[#1C3F3A]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4A85F]/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E56A5D]/3 rounded-full blur-3xl" />

      <div className="relative z-10 flex items-center justify-between p-6 border-b border-[#1C3F3A]/10 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1C3F3A] to-[#D4A85F] flex items-center justify-center shadow-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-serif text-[#1C3F3A]">MahaOne</h1>
            <p className="text-xs text-[#C2C5AA]">Property. Simplified. Connected.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsArabic(!isArabic)}
            className="text-[#1C3F3A] hover:bg-[#1C3F3A]/10"
          >
            {isArabic ? "English" : "العربية"}
          </Button>
          <DarkModeToggle />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-88px)] p-6">
        <Card className="w-full max-w-5xl shadow-2xl border-[#1C3F3A]/10 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2 pb-8">
            <CardTitle className="text-3xl font-bold font-serif text-[#1C3F3A]">
              {isArabic ? "مرحباً بك في MahaOne" : "Welcome to MahaOne"}
            </CardTitle>
            <p className="text-[#C2C5AA] text-lg">
              {isArabic ? "إدارة الممتلكات الذكية للحياة العصرية" : "Smart Property Management for Modern Living"}
            </p>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="space-y-4">
              <Label className="text-base font-semibold text-[#1C3F3A]">
                {isArabic ? "اختر نوع المستخدم" : "Select User Type"}
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {userTypes.map((userType) => {
                  const Icon = userType.icon
                  return (
                    <button
                      key={userType.type}
                      onClick={() => handleUserTypeSelect(userType.type)}
                      className={`group relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        selectedUserType === userType.type
                          ? "border-[#1C3F3A] bg-gradient-to-br " + userType.color + " shadow-lg scale-105"
                          : "border-[#C2C5AA]/30 bg-white hover:border-[#D4A85F] hover:shadow-md"
                      }`}
                    >
                      <div
                        className={`mb-4 w-12 h-12 rounded-lg flex items-center justify-center ${
                          selectedUserType === userType.type ? "bg-white/20" : userType.bgColor
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${selectedUserType === userType.type ? "text-white" : "text-[#1C3F3A]"}`}
                        />
                      </div>
                      <h3
                        className={`font-semibold mb-2 ${
                          selectedUserType === userType.type ? "text-white" : "text-[#1C3F3A]"
                        }`}
                      >
                        {isArabic ? userType.titleAr : userType.title}
                      </h3>
                      <p
                        className={`text-sm ${selectedUserType === userType.type ? "text-white/90" : "text-[#C2C5AA]"}`}
                      >
                        {isArabic ? userType.descriptionAr : userType.description}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {selectedUser && (
              <div className="p-6 rounded-xl bg-gradient-to-br from-[#1C3F3A]/5 to-[#D4A85F]/5 border-2 border-[#D4A85F]/30 space-y-4 animate-fade-in">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1C3F3A] to-[#D4A85F] flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#1C3F3A]">
                    {isArabic ? "بيانات الدخول التجريبية" : "Demo Credentials"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-[#C2C5AA]">{isArabic ? "اسم المستخدم" : "Username"}</Label>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-white border border-[#D4A85F]/30">
                      <code className="flex-1 text-sm font-mono text-[#1C3F3A] font-semibold">
                        {selectedUser.username}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(selectedUser.username, "username")}
                        className="h-8 w-8 p-0 hover:bg-[#D4A85F]/10"
                      >
                        {copiedField === "username" ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-[#1C3F3A]" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-[#C2C5AA]">{isArabic ? "كلمة المرور" : "Password"}</Label>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-white border border-[#D4A85F]/30">
                      <code className="flex-1 text-sm font-mono text-[#1C3F3A] font-semibold">
                        {selectedUser.password}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(selectedUser.password, "password")}
                        className="h-8 w-8 p-0 hover:bg-[#D4A85F]/10"
                      >
                        {copiedField === "password" ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-[#1C3F3A]" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#C2C5AA] text-center mt-4">
                  {isArabic
                    ? "انقر على أيقونة النسخ لنسخ بيانات الاعتماد بسهولة"
                    : "Click the copy icon to easily copy credentials"}
                </p>
              </div>
            )}

            {selectedUserType && (
              <form onSubmit={handleLogin} className="space-y-6 animate-fade-in">
                {error && (
                  <div className="p-4 rounded-lg bg-[#E56A5D]/10 border border-[#E56A5D]/30">
                    <p className="text-sm text-[#E56A5D] text-center">{error}</p>
                  </div>
                )}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-[#1C3F3A]">
                      {isArabic ? "اسم المستخدم" : "Username"}
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      value={credentials.username}
                      onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                      placeholder={isArabic ? "أدخل اسم المستخدم" : "Enter username"}
                      className="h-12 border-[#C2C5AA]/30 focus:border-[#1C3F3A] focus:ring-[#1C3F3A]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[#1C3F3A]">
                      {isArabic ? "كلمة المرور" : "Password"}
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        placeholder={isArabic ? "أدخل كلمة المرور" : "Enter password"}
                        className="h-12 pr-12 border-[#C2C5AA]/30 focus:border-[#1C3F3A] focus:ring-[#1C3F3A]"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-[#1C3F3A]/10"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-[#C2C5AA]" />
                        ) : (
                          <Eye className="w-4 h-4 text-[#C2C5AA]" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#1C3F3A] to-[#2E7D8F] hover:from-[#2E7D8F] hover:to-[#1C3F3A] text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting
                    ? isArabic
                      ? "جاري تسجيل الدخول..."
                      : "Signing In..."
                    : isArabic
                      ? "تسجيل الدخول"
                      : "Sign In"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
