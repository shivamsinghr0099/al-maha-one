"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock, Star, ArrowRight, Zap, Target, Users } from "lucide-react"

interface Recommendation {
  id: string
  title: string
  description: string
  type: "service" | "payment" | "booking" | "maintenance"
  priority: "high" | "medium" | "low"
  action: string
  route: string
  icon: string
  estimatedTime?: string
  savings?: string
  popularity?: number
}

const sampleRecommendations: Recommendation[] = [
  {
    id: "1",
    title: "Pay Outstanding Bills",
    description: "You have 2 pending payments due in 3 days",
    type: "payment",
    priority: "high",
    action: "Pay Now",
    route: "/payments",
    icon: "💳",
    estimatedTime: "2 min",
  },
  {
    id: "2",
    title: "Book Pool Session",
    description: "Based on your previous bookings, pool is available this weekend",
    type: "booking",
    priority: "medium",
    action: "Book Now",
    route: "/amenities",
    icon: "🏊",
    popularity: 85,
  },
  {
    id: "3",
    title: "Schedule AC Maintenance",
    description: "It's been 6 months since your last AC service",
    type: "maintenance",
    priority: "medium",
    action: "Schedule",
    route: "/maintenance",
    icon: "❄️",
    estimatedTime: "1 hour",
  },
  {
    id: "4",
    title: "Renew Parking Permit",
    description: "Your parking permit expires in 2 weeks",
    type: "service",
    priority: "medium",
    action: "Renew",
    route: "/parking",
    icon: "🚗",
    savings: "AED 50 early renewal discount",
  },
]

export function SmartRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading behavior-based recommendations
    const timer = setTimeout(() => {
      setRecommendations(sampleRecommendations)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-accent text-white"
      case "medium":
        return "bg-secondary text-white"
      case "low":
        return "bg-neutral-200 text-neutral-700"
      default:
        return "bg-neutral-200 text-neutral-700"
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-neutral-900">Smart Recommendations</h2>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-0 shadow-brand">
              <CardContent className="p-4">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                  <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
                  <div className="h-8 bg-neutral-200 rounded w-20"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-neutral-900">Smart Recommendations</h2>
        </div>
        <Badge variant="outline" className="text-xs">
          <Zap className="h-3 w-3 mr-1" />
          AI Powered
        </Badge>
      </div>

      <div className="grid gap-4">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="border-0 shadow-brand hover:shadow-brand-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">{rec.icon}</div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-neutral-900">{rec.title}</h3>
                    <Badge className={getPriorityColor(rec.priority)} size="sm">
                      {rec.priority}
                    </Badge>
                  </div>

                  <p className="text-sm text-neutral-600 mb-3">{rec.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-neutral-500">
                      {rec.estimatedTime && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{rec.estimatedTime}</span>
                        </div>
                      )}
                      {rec.popularity && (
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-3 w-3" />
                          <span>{rec.popularity}% popular</span>
                        </div>
                      )}
                      {rec.savings && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3" />
                          <span>{rec.savings}</span>
                        </div>
                      )}
                    </div>

                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-primary to-secondary text-white"
                      onClick={() => (window.location.href = rec.route)}
                    >
                      {rec.action}
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Behavior insights */}
      <Card className="border-0 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Your Activity Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-neutral-600">Services Used</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">85%</div>
              <div className="text-neutral-600">On-time Payments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">4.8</div>
              <div className="text-neutral-600">Satisfaction Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Quick recommendations widget for dashboard
export function QuickRecommendations() {
  const topRecommendations = sampleRecommendations.slice(0, 2)

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Target className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-neutral-900">Recommended for You</h3>
      </div>

      {topRecommendations.map((rec) => (
        <Card key={rec.id} className="border-0 shadow-sm hover:shadow-brand transition-shadow">
          <CardContent className="p-3">
            <div className="flex items-center space-x-3">
              <span className="text-lg">{rec.icon}</span>
              <div className="flex-1">
                <h4 className="font-medium text-sm text-neutral-900">{rec.title}</h4>
                <p className="text-xs text-neutral-600">{rec.description}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => (window.location.href = rec.route)}
              >
                {rec.action}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
