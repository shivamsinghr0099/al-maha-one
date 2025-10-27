"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Wrench, Eye, User, MoreHorizontal, Bell, Search, X, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MahaLogo } from "./maha-logo"
import { SmartSearch } from "./smart-search"
import { DarkModeToggle } from "./dark-mode-toggle"

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Services", href: "/services", icon: Wrench },
  { name: "Azure Eye", href: "/azure-eye", icon: Eye },
  { name: "Profile", href: "/profile", icon: User },
  { name: "More", href: "/more", icon: MoreHorizontal },
]

export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === "/tenant/dashboard"
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white/95 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <MahaLogo size="sm" variant="primary" />
              </Link>

              <div className="flex items-center space-x-6">
                {navigationItems.slice(0, -1).map((item) => (
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
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-80">
                <SmartSearch />
              </div>

              <DarkModeToggle />

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
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white/95 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <MahaLogo size="sm" variant="primary" />

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
                <Search className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="sm" className="w-10 h-10 p-0 relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-accent">3</Badge>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 p-0"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-50">
            <div className="bg-white h-full w-80 ml-auto">
              <div className="p-4 border-b border-neutral-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="p-4 space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-neutral-600 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
