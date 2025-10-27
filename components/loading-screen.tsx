"use client"

import { useEffect, useState } from "react"
import { MahaLogo } from "./maha-logo"
import { Progress } from "@/components/ui/progress"

interface LoadingScreenProps {
  message?: string
  duration?: number
  onComplete?: () => void
}

export function LoadingScreen({ message = "Loading...", duration = 2000, onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(message)

  const loadingMessages = [
    "Initializing Maha One...",
    "Loading your dashboard...",
    "Preparing your services...",
    "Almost ready...",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (duration / 100)

        // Update message based on progress
        if (newProgress > 25 && newProgress <= 50) {
          setCurrentMessage(loadingMessages[1])
        } else if (newProgress > 50 && newProgress <= 75) {
          setCurrentMessage(loadingMessages[2])
        } else if (newProgress > 75) {
          setCurrentMessage(loadingMessages[3])
        }

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onComplete?.()
          }, 500)
          return 100
        }

        return newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [duration, onComplete])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center z-50">
      <div className="text-center space-y-8 max-w-md mx-auto px-6">
        {/* Logo */}
        <div className="flex justify-center">
          <MahaLogo size="2xl" variant="primary" showText={true} animated={true} />
        </div>

        {/* Loading Message */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-900 font-serif">{currentMessage}</h2>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-neutral-600">{Math.round(progress)}% complete</p>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-primary rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1s",
              }}
            />
          ))}
        </div>

        {/* Branding */}
        <div className="text-center">
          <p className="text-xs text-neutral-500">© 2024 Al Maha Holdings LLC</p>
          <div className="flex items-center justify-center space-x-4 mt-2 text-xs text-neutral-400">
            <span>⚡ Fast</span>
            <span>🔒 Secure</span>
            <span>📱 Mobile Ready</span>
          </div>
        </div>
      </div>
    </div>
  )
}
