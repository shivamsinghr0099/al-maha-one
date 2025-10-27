"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { MahaLogo } from "@/components/maha-logo"
import { LoadingScreen } from "@/components/loading-screen"
import { OnboardingFlow } from "@/components/onboarding"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

const userTypes = [
  {
    type: "tenant",
    title: "Tenant",
    titleAr: "مستأجر",
    description: "Access your rental services and property management tools",
    descriptionAr: "الوصول إلى خدمات الإيجار وأدوات إدارة الممتلكات",
    color: "from-primary to-primary-600",
    bgColor: "bg-primary/10",
    route: "/tenant/dashboard",
  },
  {
    type: "landlord",
    title: "Landlord",
    titleAr: "مالك العقار",
    description: "Manage your properties and tenant relationships",
    descriptionAr: "إدارة ممتلكاتك وعلاقات المستأجرين",
    color: "from-secondary to-secondary-600",
    bgColor: "bg-secondary/10",
    route: "/landlord/dashboard",
  },
  {
    type: "building-manager",
    title: "Building Manager",
    titleAr: "مدير المبنى",
    description: "Oversee building operations and tenant services",
    descriptionAr: "الإشراف على عمليات المبنى وخدمات المستأجرين",
    color: "from-neutral to-neutral-600",
    bgColor: "bg-neutral/10",
    route: "/building-manager/dashboard",
  },
  {
    type: "super-admin",
    title: "Super Admin",
    titleAr: "المدير العام",
    description: "Complete system administration and oversight",
    descriptionAr: "إدارة النظام الكاملة والإشراف",
    color: "from-accent to-accent-600",
    bgColor: "bg-accent/10",
    route: "/super-admin/dashboard",
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

  // Simulate initial loading (1 second as per guidelines)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      try {
        // Check if user is first time visitor
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedUserType || !credentials.username || !credentials.password) {
      alert(isArabic ? "يرجى ملء جميع الحقول" : "Please fill in all fields")
      return
    }

    // Show loading for login process
    setIsLoading(true)

    // Dummy credentials for testing
    const dummyCredentials = {
      tenant: { username: "tenant", password: "tenant123" },
      landlord: { username: "landlord", password: "landlord123" },
      "building-manager": { username: "manager", password: "manager123" },
      "super-admin": { username: "admin", password: "admin123" },
    }

    setTimeout(() => {
      const validCredentials = dummyCredentials[selectedUserType as keyof typeof dummyCredentials]

      if (
        validCredentials &&
        credentials.username === validCredentials.username &&
        credentials.password === validCredentials.password
      ) {
        const userType = userTypes.find((type) => type.type === selectedUserType)
        if (userType) {
          try {
            // Store user info in localStorage for the session
            localStorage.setItem("userType", selectedUserType)
            localStorage.setItem("username", credentials.username)
            window.location.href = userType.route
          } catch (error) {
            console.error("Failed to save user data:", error)
            setIsLoading(false)
          }
        }
      } else {
        setIsLoading(false)
        alert(isArabic ? "بيانات الدخول غير صحيحة" : "Invalid credentials. Please try again.")
      }
    }, 800) // Simulate network delay
  }

  const handleOnboardingComplete = (userType: string) => {
    setShowOnboarding(false)
    setSelectedUserType(userType)
  }

  if (isLoading) {
    return <LoadingScreen message="Welcome to MahaOne" duration={1000} />
  }

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-brand-pattern opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>

      {/* Top Navigation */}
      <div className="absolute top-4 right-4 z-50 flex items-center space-x-2">
        <DarkModeToggle />
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsArabic(!isArabic)}
          className="bg-white/90 backdrop-blur-sm border-primary/30 text-neutral hover:bg-primary/10 font-medium"
        >
          {isArabic ? "English" : "عربي"}
        </Button>
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-8">
              <MahaLogo size="2xl" variant="primary" showText={true} animated={false} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-neutral mb-4 font-serif">
              {isArabic ? "مرحباً بك في ماها ون" : "Welcome to MahaOne"}
            </h1>
            <p className="text-xl md:text-2xl text-neutral/80 max-w-3xl mx-auto font-medium">
              {isArabic
                ? "منصة إدارة الممتلكات الذكية - اختر نوع حسابك للمتابعة"
                : "Smart Property Management Platform - Select your account type to continue"}
            </p>
            <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-neutral/60">
              <span>⚡</span>
              <span>{isArabic ? "سريع • بسيط • متصل" : "Fast • Simple • Connected"}</span>
              <span>⚡</span>
            </div>
          </div>

          {!selectedUserType ? (
            /* User Type Selection */
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {userTypes.map((userType) => (
                <Card
                  key={userType.type}
                  className={`border-0 shadow-brand-lg hover:shadow-brand transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                    userType.bgColor
                  } backdrop-blur-sm overflow-hidden relative group`}
                  onClick={() => setSelectedUserType(userType.type)}
                  style={{
                    // Ensure touch targets are optimized
                    minHeight: "200px",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 group-hover:from-white/70 group-hover:to-white/40 transition-all duration-500"></div>

                  <CardHeader className="relative text-center pb-4 pt-8">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${userType.color} rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-brand-lg group-hover:shadow-brand transition-all duration-500 transform group-hover:scale-110`}
                    >
                      <span className="text-3xl">
                        {userType.type === "tenant"
                          ? "🏠"
                          : userType.type === "landlord"
                            ? "🏢"
                            : userType.type === "building-manager"
                              ? "⚙️"
                              : "🛡️"}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-bold text-neutral font-serif">
                      {isArabic ? userType.titleAr : userType.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative pb-8">
                    <p className="text-sm text-neutral/70 text-center leading-relaxed px-2">
                      {isArabic ? userType.descriptionAr : userType.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Login Form */
            <div className="max-w-md mx-auto">
              <Card className="border-0 shadow-brand-lg bg-white/95 backdrop-blur-md">
                <CardHeader className="text-center pb-6">
                  <div className="flex items-center justify-center mb-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedUserType(null)}
                      className="absolute left-4 top-4 text-neutral/70 hover:text-neutral"
                    >
                      ←
                    </Button>
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${
                        userTypes.find((t) => t.type === selectedUserType)?.color
                      } rounded-3xl flex items-center justify-center shadow-brand-lg`}
                    >
                      <span className="text-3xl">
                        {selectedUserType === "tenant"
                          ? "🏠"
                          : selectedUserType === "landlord"
                            ? "🏢"
                            : selectedUserType === "building-manager"
                              ? "⚙️"
                              : "🛡️"}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-neutral font-serif">
                    {isArabic ? "تسجيل الدخول" : "Sign In"}
                  </CardTitle>
                  <p className="text-neutral/70 font-medium">
                    {isArabic
                      ? `تسجيل الدخول كـ ${userTypes.find((t) => t.type === selectedUserType)?.titleAr}`
                      : `Sign in as ${userTypes.find((t) => t.type === selectedUserType)?.title}`}
                  </p>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-neutral font-semibold">
                        {isArabic ? "اسم المستخدم" : "Username"}
                      </Label>
                      <Input
                        id="username"
                        type="text"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        placeholder={isArabic ? "أدخل اسم المستخدم" : "Enter your username"}
                        className="border-neutral/30 focus:border-primary focus:ring-primary/20 rounded-xl h-12 text-base"
                        required
                        style={{ minHeight: "48px" }} // Touch target optimization
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-neutral font-semibold">
                        {isArabic ? "كلمة المرور" : "Password"}
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={credentials.password}
                          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                          placeholder={isArabic ? "أدخل كلمة المرور" : "Enter your password"}
                          className="border-neutral/30 focus:border-primary focus:ring-primary/20 rounded-xl h-12 text-base pr-12"
                          required
                          style={{ minHeight: "48px" }}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-neutral/50 hover:text-neutral"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className={`w-full h-14 bg-gradient-to-r ${
                        userTypes.find((t) => t.type === selectedUserType)?.color
                      } hover:shadow-brand-lg text-white font-bold text-lg shadow-brand transition-all duration-500 rounded-xl`}
                      style={{ minHeight: "56px" }} // Touch target optimization
                    >
                      {isArabic ? "تسجيل الدخول" : "Sign In"}
                    </Button>

                    <div className="text-center">
                      <Button variant="link" className="text-neutral/70 hover:text-primary text-sm font-medium">
                        {isArabic ? "نسيت كلمة المرور؟" : "Forgot Password?"}
                      </Button>
                    </div>
                  </form>

                  {/* Demo Credentials */}
                  <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <h4 className="font-bold text-neutral mb-2 text-sm">
                      {isArabic ? "بيانات تجريبية للاختبار:" : "Demo Credentials for Testing:"}
                    </h4>
                    <div className="text-xs text-neutral/70 space-y-1 font-mono">
                      {selectedUserType === "tenant" && (
                        <>
                          <p>
                            <strong>Username:</strong> tenant
                          </p>
                          <p>
                            <strong>Password:</strong> tenant123
                          </p>
                        </>
                      )}
                      {selectedUserType === "landlord" && (
                        <>
                          <p>
                            <strong>Username:</strong> landlord
                          </p>
                          <p>
                            <strong>Password:</strong> landlord123
                          </p>
                        </>
                      )}
                      {selectedUserType === "building-manager" && (
                        <>
                          <p>
                            <strong>Username:</strong> manager
                          </p>
                          <p>
                            <strong>Password:</strong> manager123
                          </p>
                        </>
                      )}
                      {selectedUserType === "super-admin" && (
                        <>
                          <p>
                            <strong>Username:</strong> admin
                          </p>
                          <p>
                            <strong>Password:</strong> admin123
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-neutral/60 text-sm font-medium">
              {isArabic
                ? "© 2024 شركة المها القابضة ذ.م.م - جميع الحقوق محفوظة"
                : "© 2024 Al Maha Holdings LLC - All rights reserved"}
            </p>
            <div className="mt-2 flex items-center justify-center space-x-4 text-xs text-neutral/50">
              <span>⚡ Load time: &lt;1.5s</span>
              <span>📱 Touch optimized</span>
              <span>🌙 Dark mode ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
