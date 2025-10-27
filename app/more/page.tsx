"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import {
  Building,
  Home,
  Calendar,
  Eye,
  User,
  Settings,
  Bell,
  HelpCircle,
  FileText,
  MessageSquare,
  Car,
  ArrowUpDown,
  BarChart3,
  Shield,
  Moon,
  Globe,
  Smartphone,
  LogOut,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

const moreOptions = [
  {
    title: "Documents",
    description: "Access your property documents",
    icon: FileText,
    href: "/documents",
    color: "text-blue-600",
  },
  {
    title: "Community",
    description: "Connect with neighbors",
    icon: MessageSquare,
    href: "/community",
    color: "text-green-600",
  },
  {
    title: "Parking",
    description: "Manage parking spaces",
    icon: Car,
    href: "/parking",
    color: "text-purple-600",
  },
  {
    title: "Move In/Out",
    description: "Process relocation requests",
    icon: ArrowUpDown,
    href: "/move-in-out",
    color: "text-orange-600",
  },
  {
    title: "Reports",
    description: "View analytics and reports",
    icon: BarChart3,
    href: "/reports",
    color: "text-indigo-600",
  },
  {
    title: "Help & Support",
    description: "Get help and contact support",
    icon: HelpCircle,
    href: "/help",
    color: "text-teal-600",
  },
]

const settingsOptions = [
  {
    title: "Notifications",
    description: "Manage notification preferences",
    icon: Bell,
    href: "/profile?tab=notifications",
    hasToggle: true,
    enabled: true,
  },
  {
    title: "Privacy & Security",
    description: "Security and privacy settings",
    icon: Shield,
    href: "/profile?tab=security",
    hasToggle: false,
  },
  {
    title: "Dark Mode",
    description: "Switch to dark theme",
    icon: Moon,
    href: "#",
    hasToggle: true,
    enabled: false,
  },
  {
    title: "Language",
    description: "Change app language",
    icon: Globe,
    href: "/profile?tab=preferences",
    hasToggle: false,
  },
  {
    title: "App Preferences",
    description: "Customize app behavior",
    icon: Smartphone,
    href: "/profile?tab=preferences",
    hasToggle: false,
  },
]

export default function MorePage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Building className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-primary">Maha One</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64&text=JD" alt="John Doe" />
                <AvatarFallback className="text-lg">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
                <p className="text-gray-600">Villa A-101, Azure Gardens</p>
                <p className="text-sm text-gray-500">Owner • Member since Jan 2024</p>
              </div>
              <Link href="/profile">
                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* More Options */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>More Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {moreOptions.map((option, index) => (
                    <Link key={index} href={option.href}>
                      <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="p-2 rounded-lg bg-gray-100">
                          <option.icon className={`h-5 w-5 ${option.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{option.title}</h3>
                          <p className="text-sm text-gray-600">{option.description}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {settingsOptions.map((setting, index) => (
                    <div key={index}>
                      {setting.hasToggle ? (
                        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-lg bg-gray-100">
                              <setting.icon className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{setting.title}</h3>
                              <p className="text-sm text-gray-600">{setting.description}</p>
                            </div>
                          </div>
                          <Switch defaultChecked={setting.enabled} />
                        </div>
                      ) : (
                        <Link href={setting.href}>
                          <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="p-2 rounded-lg bg-gray-100">
                              <setting.icon className="h-5 w-5 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{setting.title}</h3>
                              <p className="text-sm text-gray-600">{setting.description}</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Account</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/profile">
                      <User className="h-4 w-4 mr-2" />
                      Account Settings
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
        <div className="grid grid-cols-5 py-1">
          <Link href="/" className="flex flex-col items-center py-2 text-gray-400 hover:text-gray-600">
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link href="/services" className="flex flex-col items-center py-2 text-gray-400 hover:text-gray-600">
            <Calendar className="h-5 w-5" />
            <span className="text-xs mt-1">Services</span>
          </Link>
          <Link href="/azure-eye" className="flex flex-col items-center py-2 text-gray-400 hover:text-gray-600">
            <Eye className="h-5 w-5" />
            <span className="text-xs mt-1">Azure Eye</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center py-2 text-gray-400 hover:text-gray-600">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
          <Link href="/more" className="flex flex-col items-center py-2 text-blue-600">
            <Settings className="h-5 w-5" />
            <span className="text-xs mt-1 font-medium">More</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
