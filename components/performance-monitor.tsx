"use client"

import { useEffect } from "react"

interface PerformanceMetrics {
  loadTime: number
  domContentLoaded: number
  firstContentfulPaint?: number
  largestContentfulPaint?: number
  firstInputDelay?: number
  cumulativeLayoutShift?: number
}

export function PerformanceMonitor() {
  useEffect(() => {
    // Monitor page load performance
    const measurePerformance = () => {
      if (typeof window !== "undefined" && "performance" in window) {
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming

        const metrics: PerformanceMetrics = {
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        }

        // Web Vitals
        if ("PerformanceObserver" in window) {
          // First Contentful Paint
          const fcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const fcp = entries.find((entry) => entry.name === "first-contentful-paint")
            if (fcp) {
              metrics.firstContentfulPaint = fcp.startTime
            }
          })
          fcpObserver.observe({ entryTypes: ["paint"] })

          // Largest Contentful Paint
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1]
            if (lastEntry) {
              metrics.largestContentfulPaint = lastEntry.startTime
            }
          })
          lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] })

          // First Input Delay
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach((entry: any) => {
              if (entry.processingStart && entry.startTime) {
                metrics.firstInputDelay = entry.processingStart - entry.startTime
              }
            })
          })
          fidObserver.observe({ entryTypes: ["first-input"] })

          // Cumulative Layout Shift
          let clsValue = 0
          const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value
                metrics.cumulativeLayoutShift = clsValue
              }
            })
          })
          clsObserver.observe({ entryTypes: ["layout-shift"] })
        }

        // Log metrics in development
        if (process.env.NODE_ENV === "development") {
          setTimeout(() => {
            console.group("🚀 Performance Metrics")
            console.log("Load Time:", metrics.loadTime.toFixed(2), "ms")
            console.log("DOM Content Loaded:", metrics.domContentLoaded.toFixed(2), "ms")
            if (metrics.firstContentfulPaint) {
              console.log("First Contentful Paint:", metrics.firstContentfulPaint.toFixed(2), "ms")
            }
            if (metrics.largestContentfulPaint) {
              console.log("Largest Contentful Paint:", metrics.largestContentfulPaint.toFixed(2), "ms")
            }
            if (metrics.firstInputDelay) {
              console.log("First Input Delay:", metrics.firstInputDelay.toFixed(2), "ms")
            }
            if (metrics.cumulativeLayoutShift) {
              console.log("Cumulative Layout Shift:", metrics.cumulativeLayoutShift.toFixed(4))
            }
            console.groupEnd()

            // Performance scoring
            const score = calculatePerformanceScore(metrics)
            if (score < 70) {
              console.warn("⚠️ Performance issues detected. Consider optimization.")
            } else if (score > 90) {
              console.log("✅ Excellent performance!")
            }
          }, 3000)
        }

        // Send metrics to analytics (in production)
        if (process.env.NODE_ENV === "production") {
          // Example: Send to analytics service
          // analytics.track('page_performance', metrics)
        }
      }
    }

    // Run performance measurement after page load
    if (document.readyState === "complete") {
      measurePerformance()
    } else {
      window.addEventListener("load", measurePerformance)
    }

    return () => {
      window.removeEventListener("load", measurePerformance)
    }
  }, [])

  return null // This component doesn't render anything
}

function calculatePerformanceScore(metrics: PerformanceMetrics): number {
  let score = 100

  // Penalize slow load times
  if (metrics.loadTime > 3000) score -= 20
  else if (metrics.loadTime > 1500) score -= 10

  // Penalize slow FCP
  if (metrics.firstContentfulPaint && metrics.firstContentfulPaint > 3000) score -= 15
  else if (metrics.firstContentfulPaint && metrics.firstContentfulPaint > 1800) score -= 8

  // Penalize slow LCP
  if (metrics.largestContentfulPaint && metrics.largestContentfulPaint > 4000) score -= 20
  else if (metrics.largestContentfulPaint && metrics.largestContentfulPaint > 2500) score -= 10

  // Penalize high FID
  if (metrics.firstInputDelay && metrics.firstInputDelay > 300) score -= 15
  else if (metrics.firstInputDelay && metrics.firstInputDelay > 100) score -= 8

  // Penalize high CLS
  if (metrics.cumulativeLayoutShift && metrics.cumulativeLayoutShift > 0.25) score -= 20
  else if (metrics.cumulativeLayoutShift && metrics.cumulativeLayoutShift > 0.1) score -= 10

  return Math.max(0, score)
}
