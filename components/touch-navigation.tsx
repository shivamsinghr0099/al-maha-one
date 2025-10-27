"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Wrench, Eye, User, MoreHorizontal, Bell, Search, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SmartSearch } from "./smart-search"

const mainNavItems = [
  { name: "Home", href: "/tenant/dashboard", icon: Home },
  { name: "Services", href: "/services", icon: Wrench },
  { name: "Azure Eye", href: "/azure-eye", icon: Eye },
  { name: "Profile", href: "/profile", icon: User },
  { name: "More", href: "/more", icon: MoreHorizontal },
]

export function TouchNavigation() {
  const pathname = usePathname()
  const [showSearch, setShowSearch] = useState(false)

  const isActive = (href: string) => {
    if (href === "/tenant/dashboard") {
      return pathname === "/" || pathname === "/tenant/dashboard"
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Bottom Navigation - Touch Optimized */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        {/* Safe area padding for devices with home indicator */}
        <div className="bg-white/95 backdrop-blur-md border-t border-neutral-200 px-2 pt-2 pb-safe shadow-brand-lg">
          <div className="flex items-center justify-around">
            {mainNavItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-200 min-w-[60px] min-h-[60px] justify-center touch-target ${
                    active ? "bg-primary/10 text-primary" : "text-neutral-600 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  <item.icon className={`h-6 w-6 ${active ? "scale-110" : ""} transition-transform`} />
                  <span className={`text-xs font-medium ${active ? "font-semibold" : ""}`}>{item.name}</span>
                  {active && <div className="w-1 h-1 bg-primary rounded-full" />}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Top Navigation Bar - Mobile */}
      <div className="sticky top-0 z-30 md:hidden">
        <div className="bg-white/95 backdrop-blur-md border-b border-neutral-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-lg font-bold text-primary">MahaOne</h1>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSearch(true)}
                className="w-10 h-10 p-0 touch-target"
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="sm" className="w-10 h-10 p-0 relative touch-target">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-accent">3</Badge>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
          <div className="bg-white h-full">
            <div className="flex items-center justify-between p-4 border-b border-neutral-200">
              <h2 className="text-lg font-semibold text-neutral-900">Search</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowSearch(false)} className="touch-target">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4">
              <SmartSearch
                onSelect={() => setShowSearch(false)}
                placeholder="Search services, pay bills, book amenities..."
              />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <div className="bg-white/95 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <Home className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-primary">MahaOne</span>
                </Link>

                <nav className="flex items-center space-x-6">
                  {mainNavItems.slice(0, -1).map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                        isActive(item.href)
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-neutral-600 hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-80">
                  <SmartSearch />
                </div>

                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-accent">3</Badge>
                </Button>

                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Floating Action Button for quick actions
export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  const quickActions = [
    { name: "Pay Bills", icon: "💳", href: "/payments" },
    { name: "Book Amenity", icon: "🏊", href: "/amenities" },
    { name: "Request Service", icon: "🔧", href: "/maintenance" },
    { name: "Add Visitor", icon: "👥", href: "/visitors" },
  ]

  return (
    <div className="fixed bottom-20 right-4 z-30 md:bottom-6">
      {/* Quick action buttons */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-3 mb-2">
          {quickActions.map((action, index) => (
            <Link
              key={action.name}
              href={action.href}
              className="flex items-center space-x-3 bg-white shadow-brand rounded-full px-4 py-3 transform transition-all duration-200 hover:scale-105 animate-fade-in"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">{action.icon}</span>
              <span className="text-sm font-medium text-neutral-700 whitespace-nowrap">{action.name}</span>
            </Link>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary shadow-brand-lg hover:shadow-brand transition-all duration-300 touch-target ${
          isOpen ? "rotate-45" : ""
        }`}
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : <span className="text-2xl">⚡</span>}
      </Button>
    </div>
  )
}
