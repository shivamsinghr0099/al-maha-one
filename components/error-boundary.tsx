"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { MahaLogo } from "./maha-logo"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo })

    // Log error to monitoring service
    console.error("Error Boundary caught an error:", error, errorInfo)

    // You can also log the error to an error reporting service here
    // Example: Sentry.captureException(error, { contexts: { react: errorInfo } })
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />
      }

      return <DefaultErrorFallback error={this.state.error!} resetError={this.resetError} />
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error, resetError }: { error: Error; resetError: () => void }) {
  const isDevelopment = process.env.NODE_ENV === "development"

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-brand-lg">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <MahaLogo size="lg" variant="primary" showText={true} />
          </div>
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-xl font-bold text-neutral-900 font-serif">Oops! Something went wrong</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-neutral-600 text-center">
            We encountered an unexpected error. Don't worry, our team has been notified and is working on a fix.
          </p>

          {isDevelopment && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">Error Details (Development)</h4>
              <p className="text-sm text-red-700 font-mono break-all">{error.message}</p>
              {error.stack && (
                <details className="mt-2">
                  <summary className="text-sm text-red-600 cursor-pointer">Stack Trace</summary>
                  <pre className="text-xs text-red-600 mt-2 overflow-auto max-h-32">{error.stack}</pre>
                </details>
              )}
            </div>
          )}

          <div className="space-y-3">
            <Button onClick={resetError} className="w-full bg-gradient-to-r from-primary to-secondary text-white">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>

            <Button variant="outline" onClick={() => (window.location.href = "/")} className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Go to Homepage
            </Button>
          </div>

          <div className="text-center pt-4 border-t border-neutral-200">
            <p className="text-xs text-neutral-500">If this problem persists, please contact our support team.</p>
            <Button
              variant="link"
              size="sm"
              onClick={() => (window.location.href = "/help")}
              className="text-xs text-primary"
            >
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Hook for functional components
export function useErrorBoundary() {
  const [error, setError] = React.useState<Error | null>(null)

  const resetError = React.useCallback(() => {
    setError(null)
  }, [])

  const captureError = React.useCallback((error: Error) => {
    setError(error)
  }, [])

  React.useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])

  return { captureError, resetError }
}
