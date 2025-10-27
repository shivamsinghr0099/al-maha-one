"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building, ArrowRight, CheckCircle, Smartphone, Shield, Zap } from "lucide-react"
import Link from "next/link"

const onboardingSteps = [
  {
    title: "Welcome to Maha One",
    subtitle: "Your smart property management companion",
    description: "Experience seamless property management with our all-in-one platform designed for modern living.",
    icon: Building,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Lightning Fast",
    subtitle: "Optimized for speed",
    description: "Access all features instantly with our optimized platform. Everything loads in under 1.5 seconds.",
    icon: Zap,
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "Secure & Private",
    subtitle: "Your data is protected",
    description: "Bank-level security with end-to-end encryption ensures your personal information stays safe.",
    icon: Shield,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Mobile Optimized",
    subtitle: "Designed for your thumb",
    description: "Intuitive touch targets and thumb-friendly navigation make everything easily accessible.",
    icon: Smartphone,
    color: "from-purple-500 to-indigo-500",
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    unit: "",
  })

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isLastStep = currentStep === onboardingSteps.length - 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= currentStep ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Onboarding Card */}
        <Card className="border-0 shadow-2xl overflow-hidden">
          <CardContent className="p-0">
            {currentStep < onboardingSteps.length ? (
              <div className="text-center p-8">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${onboardingSteps[currentStep].color} rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg`}
                >
                  {React.createElement(onboardingSteps[currentStep].icon, { className: "h-10 w-10 text-white" })}
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">{onboardingSteps[currentStep].title}</h1>

                <h2 className="text-lg text-blue-600 font-medium mb-4">{onboardingSteps[currentStep].subtitle}</h2>

                <p className="text-gray-600 mb-8 leading-relaxed">{onboardingSteps[currentStep].description}</p>

                <div className="flex space-x-3">
                  {currentStep > 0 && (
                    <Button variant="outline" onClick={prevStep} className="flex-1">
                      Back
                    </Button>
                  )}

                  <Button
                    onClick={nextStep}
                    className={`flex-1 bg-gradient-to-r ${onboardingSteps[currentStep].color} hover:shadow-lg transition-all duration-300`}
                  >
                    {isLastStep ? "Get Started" : "Continue"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <QuickSetupForm userInfo={userInfo} setUserInfo={setUserInfo} />
            )}
          </CardContent>
        </Card>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
            Skip for now →
          </Link>
        </div>
      </div>
    </div>
  )
}

function QuickSetupForm({
  userInfo,
  setUserInfo,
}: {
  userInfo: any
  setUserInfo: (info: any) => void
}) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("User info:", userInfo)
  }

  return (
    <div className="p-8">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
          <CheckCircle className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Quick Setup</h1>
        <p className="text-gray-600">Just a few details to personalize your experience</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            placeholder="Enter your full name"
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            placeholder="your@email.com"
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={userInfo.phone}
            onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
            placeholder="+971 50 123 4567"
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="unit">Unit Number</Label>
          <Input
            id="unit"
            value={userInfo.unit}
            onChange={(e) => setUserInfo({ ...userInfo, unit: e.target.value })}
            placeholder="Villa A-101"
            className="h-12"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 mt-6"
          asChild
        >
          <Link href="/">
            Complete Setup
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </form>
    </div>
  )
}
