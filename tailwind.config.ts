import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#2E7D8F", // Deep Teal Blue
          50: "#F0F8FA",
          100: "#D9EDF2",
          200: "#B3DBE5",
          300: "#8DC9D8",
          400: "#67B7CB",
          500: "#2E7D8F", // Main
          600: "#256A7A",
          700: "#1C5765",
          800: "#134450",
          900: "#0A313B",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F4A261", // Warm Orange
          50: "#FEF7F0",
          100: "#FDEBD6",
          200: "#FBD7AD",
          300: "#F9C384",
          400: "#F7AF5B",
          500: "#F4A261", // Main
          600: "#E8924A",
          700: "#DC8233",
          800: "#D0721C",
          900: "#C46205",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#E76F51", // Coral Red
          50: "#FDF4F2",
          100: "#FAE3DD",
          200: "#F5C7BB",
          300: "#F0AB99",
          400: "#EB8F77",
          500: "#E76F51", // Main
          600: "#E25A3A",
          700: "#DD4523",
          800: "#D8300C",
          900: "#C12A0B",
          foreground: "#FFFFFF",
        },
        neutral: {
          DEFAULT: "#264653", // Dark Green
          50: "#F2F4F3",
          100: "#E0E5E2",
          200: "#C1CBC5",
          300: "#A2B1A8",
          400: "#83978B",
          500: "#647D6E",
          600: "#526657",
          700: "#3F4F44",
          800: "#2D3831",
          900: "#264653", // Main
          foreground: "#FFFFFF",
        },
        // Additional utility colors
        success: {
          DEFAULT: "#10B981",
          50: "#ECFDF5",
          500: "#10B981",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#F59E0B",
          50: "#FFFBEB",
          500: "#F59E0B",
          foreground: "#FFFFFF",
        },
        error: {
          DEFAULT: "#EF4444",
          50: "#FEF2F2",
          500: "#EF4444",
          foreground: "#FFFFFF",
        },
        // Legacy colors for compatibility
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(14, 165, 233, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(14, 165, 233, 0.8)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      boxShadow: {
        brand: "0 4px 14px 0 rgba(46, 125, 143, 0.15)",
        "brand-lg": "0 10px 25px -3px rgba(46, 125, 143, 0.2), 0 4px 6px -2px rgba(46, 125, 143, 0.1)",
      },
      backgroundImage: {
        "brand-pattern": "radial-gradient(circle at 1px 1px, rgba(14, 165, 233, 0.15) 1px, transparent 0)",
      },
      spacing: {
        safe: "env(safe-area-inset-bottom)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
