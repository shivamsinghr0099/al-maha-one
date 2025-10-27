"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, TrendingUp, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchResult {
  id: string
  title: string
  description: string
  category: string
  route: string
  icon?: string
  priority?: "high" | "medium" | "low"
}

interface SmartSearchProps {
  placeholder?: string
  onSelect?: (result: SearchResult) => void
  className?: string
}

const searchData: SearchResult[] = [
  // Tenant Services
  {
    id: "pay-bills",
    title: "Pay Bills",
    description: "Pay rent and service charges",
    category: "Payments",
    route: "/payments",
    icon: "💳",
    priority: "high",
  },
  {
    id: "book-amenities",
    title: "Book Amenities",
    description: "Reserve pool, gym, or function rooms",
    category: "Amenities",
    route: "/amenities",
    icon: "🏊",
    priority: "medium",
  },
  {
    id: "request-maintenance",
    title: "Request Maintenance",
    description: "AC, plumbing, electrical services",
    category: "Maintenance",
    route: "/maintenance",
    icon: "🔧",
    priority: "high",
  },
  {
    id: "add-visitor",
    title: "Add Visitor",
    description: "Register guests and generate passes",
    category: "Visitors",
    route: "/visitors",
    icon: "👥",
    priority: "medium",
  },
  {
    id: "azure-eye",
    title: "Azure Eye",
    description: "Report issues and track complaints",
    category: "Reporting",
    route: "/azure-eye",
    icon: "👁️",
    priority: "medium",
  },
  {
    id: "parking-access",
    title: "Parking & Access",
    description: "Manage parking cards and permits",
    category: "Access",
    route: "/parking",
    icon: "🚗",
    priority: "medium",
  },
  {
    id: "move-in-out",
    title: "Move In/Out",
    description: "Schedule moving services",
    category: "Logistics",
    route: "/move-in-out",
    icon: "📦",
    priority: "low",
  },
  {
    id: "home-modification",
    title: "Home Modification",
    description: "Request structural changes",
    category: "Modifications",
    route: "/tenant/home-modification",
    icon: "🔨",
    priority: "low",
  },
  {
    id: "contractor-permit",
    title: "Contractor Permit",
    description: "Get contractor access permits",
    category: "Permits",
    route: "/tenant/contractor-permit",
    icon: "👷",
    priority: "low",
  },
  {
    id: "lift-booking",
    title: "Lift Booking",
    description: "Reserve elevator for moving",
    category: "Logistics",
    route: "/tenant/lift-booking",
    icon: "🛗",
    priority: "low",
  },
  {
    id: "violations",
    title: "Violations",
    description: "View penalties and notices",
    category: "Compliance",
    route: "/tenant/violations",
    icon: "⚠️",
    priority: "medium",
  },
  {
    id: "community",
    title: "Community Forum",
    description: "Join discussions and announcements",
    category: "Community",
    route: "/community",
    icon: "💬",
    priority: "low",
  },
  {
    id: "help",
    title: "Help Center",
    description: "FAQs and support",
    category: "Support",
    route: "/help",
    icon: "❓",
    priority: "medium",
  },

  // Quick Actions
  {
    id: "emergency",
    title: "Emergency",
    description: "Report emergency situations",
    category: "Emergency",
    route: "/emergency",
    icon: "🚨",
    priority: "high",
  },
  {
    id: "profile",
    title: "Profile",
    description: "Manage your account settings",
    category: "Account",
    route: "/profile",
    icon: "👤",
    priority: "low",
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "View all notifications",
    category: "Account",
    route: "/notifications",
    icon: "🔔",
    priority: "medium",
  },
  {
    id: "documents",
    title: "Documents",
    description: "Access lease and important documents",
    category: "Documents",
    route: "/documents",
    icon: "📄",
    priority: "medium",
  },
]

const recentSearches = ["Pay Bills", "Book Pool", "AC Repair", "Add Visitor"]

const trendingSearches = ["Amenities Booking", "Maintenance Request", "Visitor Management", "Payment History"]

export function SmartSearch({
  placeholder = "Search services, pay bills, book amenities...",
  onSelect,
  className,
}: SmartSearchProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.trim()) {
      const filtered = searchData
        .filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 8)
      setResults(filtered)
    } else {
      setResults([])
    }
    setSelectedIndex(-1)
  }, [query])

  const handleSelect = (result: SearchResult) => {
    setQuery("")
    setIsOpen(false)
    onSelect?.(result)
    window.location.href = result.route
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < (query ? results.length - 1 : recentSearches.length - 1) ? prev + 1 : 0))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : query ? results.length - 1 : recentSearches.length - 1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0) {
          if (query && results[selectedIndex]) {
            handleSelect(results[selectedIndex])
          } else if (!query && recentSearches[selectedIndex]) {
            setQuery(recentSearches[selectedIndex])
          }
        }
        break
      case "Escape":
        setIsOpen(false)
        inputRef.current?.blur()
        break
    }
  }

  const getPriorityColor = (priority?: string) => {
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
    <div className={cn("relative w-full", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-4 h-10 border-neutral-300 focus:border-primary focus:ring-primary/20 rounded-xl"
        />
      </div>

      {isOpen && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-xl shadow-brand-lg z-50 max-h-96 overflow-y-auto"
        >
          {query ? (
            // Search Results
            results.length > 0 ? (
              <div className="p-2">
                <div className="text-xs font-medium text-neutral-500 px-3 py-2">Search Results ({results.length})</div>
                {results.map((result, index) => (
                  <button
                    key={result.id}
                    onClick={() => handleSelect(result)}
                    className={cn(
                      "w-full text-left px-3 py-3 rounded-lg hover:bg-neutral-50 transition-colors",
                      selectedIndex === index && "bg-primary/10",
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{result.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-neutral-900 truncate">{result.title}</p>
                          {result.priority && (
                            <Badge className={cn("text-xs", getPriorityColor(result.priority))}>
                              {result.priority}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-neutral-600 truncate">{result.description}</p>
                        <p className="text-xs text-neutral-400">{result.category}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-neutral-500">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No results found for "{query}"</p>
                <p className="text-xs mt-1">Try searching for services, payments, or amenities</p>
              </div>
            )
          ) : (
            // Default State - Recent & Trending
            <div className="p-2">
              {/* Recent Searches */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 px-3 py-2">
                  <Clock className="h-4 w-4 text-neutral-400" />
                  <span className="text-xs font-medium text-neutral-500">Recent Searches</span>
                </div>
                {recentSearches.map((search, index) => (
                  <button
                    key={search}
                    onClick={() => setQuery(search)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors",
                      selectedIndex === index && "bg-primary/10",
                    )}
                  >
                    <p className="text-sm text-neutral-700">{search}</p>
                  </button>
                ))}
              </div>

              {/* Trending Searches */}
              <div>
                <div className="flex items-center space-x-2 px-3 py-2">
                  <TrendingUp className="h-4 w-4 text-neutral-400" />
                  <span className="text-xs font-medium text-neutral-500">Trending</span>
                </div>
                {trendingSearches.map((search) => (
                  <button
                    key={search}
                    onClick={() => setQuery(search)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <Zap className="h-3 w-3 text-primary" />
                      <p className="text-sm text-neutral-700">{search}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="border-t border-neutral-100 mt-4 pt-4">
                <div className="text-xs font-medium text-neutral-500 px-3 py-2">Quick Actions</div>
                <div className="grid grid-cols-2 gap-2 px-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start h-8 text-xs"
                    onClick={() =>
                      handleSelect({
                        id: "pay-bills",
                        title: "Pay Bills",
                        description: "",
                        category: "Payments",
                        route: "/payments",
                      })
                    }
                  >
                    💳 Pay Bills
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start h-8 text-xs"
                    onClick={() =>
                      handleSelect({
                        id: "book-amenities",
                        title: "Book Amenities",
                        description: "",
                        category: "Amenities",
                        route: "/amenities",
                      })
                    }
                  >
                    🏊 Book Pool
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
