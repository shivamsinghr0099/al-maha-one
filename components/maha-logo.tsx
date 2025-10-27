"use client"

interface MahaLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  variant?: "primary" | "secondary" | "white" | "dark"
  showText?: boolean
  className?: string
  animated?: boolean
}

export function MahaLogo({
  size = "md",
  variant = "primary",
  showText = true,
  className = "",
  animated = false,
}: MahaLogoProps) {
  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
    "2xl": "w-32 h-32",
  }

  const textSizeClasses = {
    xs: "text-sm",
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
    "2xl": "text-5xl",
  }

  const getColors = () => {
    switch (variant) {
      case "primary":
        return {
          primary: "#2E7D8F", // Deep Teal Blue
          secondary: "#F4A261", // Warm Orange
          accent: "#E76F51", // Coral Red
          text: "#264653", // Dark Green
        }
      case "secondary":
        return {
          primary: "#F4A261", // Warm Orange
          secondary: "#2E7D8F", // Deep Teal Blue
          accent: "#E76F51", // Coral Red
          text: "#264653", // Dark Green
        }
      case "white":
        return {
          primary: "#FFFFFF",
          secondary: "#F4A261", // Warm Orange
          accent: "#E76F51", // Coral Red
          text: "#FFFFFF",
        }
      case "dark":
        return {
          primary: "#264653", // Dark Green
          secondary: "#2E7D8F", // Deep Teal Blue
          accent: "#F4A261", // Warm Orange
          text: "#264653",
        }
      default:
        return {
          primary: "#2E7D8F",
          secondary: "#F4A261",
          accent: "#E76F51",
          text: "#264653",
        }
    }
  }

  const colors = getColors()

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Modern Maha One Logo with Property Elements */}
      <div className={`${sizeClasses[size]} relative ${animated ? "animate-pulse-slow" : ""}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id={`gradient-${variant}-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="50%" stopColor={colors.secondary} />
              <stop offset="100%" stopColor={colors.accent} />
            </linearGradient>
            <filter id={`shadow-${variant}-${size}`}>
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.2" />
            </filter>
          </defs>

          {/* Main circular background with gradient */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill={`url(#gradient-${variant}-${size})`}
            filter={`url(#shadow-${variant}-${size})`}
          />

          {/* Modern geometric M design */}
          <g transform="translate(50,50)">
            {/* Base M structure */}
            <path
              d="M-18,15 L-18,-15 L-6,0 L6,0 L18,-15 L18,15 L8,15 L8,-5 L2,5 L-2,5 L-8,-5 L-8,15 Z"
              fill={variant === "white" ? colors.primary : "#FFFFFF"}
              opacity="0.95"
            />

            {/* Property building elements */}
            <rect x="-12" y="8" width="4" height="7" fill={colors.accent} opacity="0.7" rx="1" />
            <rect x="-4" y="8" width="4" height="7" fill={colors.accent} opacity="0.7" rx="1" />
            <rect x="4" y="8" width="4" height="7" fill={colors.accent} opacity="0.7" rx="1" />
            <rect x="12" y="8" width="4" height="7" fill={colors.accent} opacity="0.7" rx="1" />

            {/* Modern geometric accent */}
            <polygon points="-8,-8 0,-12 8,-8 0,-4" fill={colors.secondary} opacity="0.8" />

            {/* Tech/connectivity dots */}
            <circle cx="-10" cy="-10" r="1.5" fill={variant === "white" ? colors.primary : "#FFFFFF"} />
            <circle cx="10" cy="-10" r="1.5" fill={variant === "white" ? colors.primary : "#FFFFFF"} />
            <circle cx="0" cy="-15" r="1.5" fill={colors.accent} />

            {/* Connection lines */}
            <line x1="-10" y1="-10" x2="0" y2="-15" stroke={colors.secondary} strokeWidth="1" opacity="0.6" />
            <line x1="10" y1="-10" x2="0" y2="-15" stroke={colors.secondary} strokeWidth="1" opacity="0.6" />
          </g>
        </svg>
      </div>

      {/* Brand text with modern typography */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-bold ${textSizeClasses[size]} font-sans tracking-tight leading-none`}
            style={{ color: colors.text }}
          >
            Maha<span style={{ color: colors.primary }}>One</span>
          </span>
          {size !== "xs" && size !== "sm" && (
            <span className="text-xs font-medium opacity-75 font-sans tracking-wide" style={{ color: colors.text }}>
              Property. Simplified. Connected.
            </span>
          )}
        </div>
      )}
    </div>
  )
}
