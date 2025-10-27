"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MahaLogo } from "./maha-logo"
import { Home, Building, Settings, Shield, ArrowRight, Check, Smartphone, Zap, Users } from "lucide-react"

interface OnboardingProps {
  onComplete: (userType: string) => void
}

const userTypes = [
  {
    type: "tenant",
    title: "Tenant",
    description: "Access your rental services and property management tools",
    icon: Home,
    color: "from-primary to-primary-600",
    bgColor: "bg-primary/10",
    features: ["Pay bills", "Book amenities", "Request maintenance", "Manage visitors"],
  },
  {
    type: "landlord",
    title: "Landlord",
    description: "Manage your properties and tenant relationships",
    icon: Building,
    color: "from-secondary to-secondary-600",
    bgColor: "bg-secondary/10",
    features: ["Property management", "Tenant communication", "Revenue tracking", "Maintenance oversight"],
  },
  {
    type: "building-manager",
    title: "Building Manager",
    description: "Oversee building operations and tenant services",
    icon: Settings,
    color: "from-neutral to-neutral-600",
    bgColor: "bg-neutral/10",
    features: ["Service management", "Tenant support", "Vendor coordination", "Facility oversight"],
  },
  {
    type: "super-admin",
    title: "Super Admin",
    description: "Complete system administration and oversight",
    icon: Shield,
    color: "from-accent to-accent-600",
    bgColor: "bg-accent/10",
    features: ["System management", "User administration", "Analytics", "Security oversight"],
  },
]

const onboardingSteps = [
  {
    title: "Welcome to MahaOne",
    subtitle: "Your all-in-one property management platform",
    icon: Smartphone,
    color: "text-primary",
  },
  {
    title: "Lightning Fast",
    subtitle: "Optimized for speed and efficiency",
    icon: Zap,
    color: "text-secondary",
  },
  {
    title: "Connected Community",
    subtitle: "Bringing property management into the digital age",
    icon: Users,
    color: "text-accent",
  },
]

export function OnboardingFlow({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null)

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setCurrentStep(onboardingSteps.length) // Move to user type selection
    }
  }

  const handleUserTypeSelect = (userType: string) => {
    setSelectedUserType(userType)
    setTimeout(() => {
      onComplete(userType)
    }, 500)
  }

  if (currentStep < onboardingSteps.length) {
    const step = onboardingSteps[currentStep]

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <MahaLogo size="xl" variant="primary" showText={true} animated={true} />
          </div>

          {/* Step content */}
          <div className="space-y-6">
            <div
              className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${
                currentStep === 0
                  ? "from-primary to-primary-600"
                  : currentStep === 1
                    ? "from-secondary to-secondary-600"
                    : "from-accent to-accent-600"
              } flex items-center justify-center shadow-brand-lg`}
            >
              <step.icon className="h-10 w-10 text-white" />
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-neutral-900 font-serif">{step.title}</h1>
              <p className="text-neutral-600 text-lg">{step.subtitle}</p>
            </div>
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center space-x-2">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= currentStep ? "bg-primary" : "bg-neutral-200"
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <Button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 rounded-xl shadow-brand"
            >
              {currentStep === onboardingSteps.length - 1 ? "Get Started" : "Continue"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {currentStep > 0 && (
              <Button
                variant="ghost"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="w-full text-neutral-600"
              >
                Back
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // User type selection
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <MahaLogo size="lg" variant="primary" showText={true} />
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-4 font-serif">Choose Your Role</h1>
          <p className="text-xl text-neutral-600">Select your account type to get started</p>
        </div>

        {/* User type cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {userTypes.map((userType) => (
            <Card
              key={userType.type}
              className={`border-0 shadow-brand-lg hover:shadow-brand transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                userType.bgColor
              } backdrop-blur-sm overflow-hidden relative group ${
                selectedUserType === userType.type ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleUserTypeSelect(userType.type)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 group-hover:from-white/70 group-hover:to-white/40 transition-all duration-300"></div>

              <CardContent className="relative p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${userType.color} rounded-2xl flex items-center justify-center shadow-brand`}
                  >
                    <userType.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2 font-serif">{userType.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{userType.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-neutral-800">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {userType.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-success" />
                        <span className="text-sm text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedUserType === userType.type && (
                  <div className="mt-6 flex items-center justify-center">
                    <Badge className="bg-primary text-white px-4 py-2">
                      <Check className="h-4 w-4 mr-2" />
                      Selected
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-neutral-500">Don't worry, you can always change your role later in settings</p>
        </div>
      </div>
    </div>
  )
}

// Minimal onboarding for returning users
export function QuickOnboarding({ onComplete }: OnboardingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <MahaLogo size="xl" variant="primary" showText={true} animated={true} />

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-neutral-900 font-serif">Welcome Back!</h1>
          <p className="text-xl text-neutral-600">Choose your role to continue</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {userTypes.map((userType) => (
            <Button
              key={userType.type}
              onClick={() => onComplete(userType.type)}
              className={`h-auto p-6 flex-col space-y-3 bg-gradient-to-br ${userType.color} hover:shadow-brand text-white border-0`}
            >
              <userType.icon className="h-8 w-8" />
              <span className="font-semibold">{userType.title}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
