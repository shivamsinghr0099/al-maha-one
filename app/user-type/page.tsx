"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Home, Users, ArrowRight, Shield, Star } from "lucide-react"
import Link from "next/link"
import { MahaLogo } from "@/components/maha-logo"

const userTypes = [
  {
    type: "landlord",
    title: "Landlord",
    subtitle: "Property Owner",
    description: "Manage your properties with intelligent tools designed for modern property management",
    features: [
      "Smart Property Analytics",
      "Tenant Relationship Management",
      "Automated Rent Collection",
      "Maintenance Oversight",
      "Financial Reporting",
      "Digital Lease Management",
    ],
    icon: Building,
    gradient: "from-gold to-gold-dark",
    bgPattern: "bg-gradient-to-br from-pearl to-pearl-dark",
    textColor: "text-teal",
    accentColor: "bg-gold",
  },
  {
    type: "tenant",
    title: "Tenant",
    subtitle: "Property Resident",
    description: "Experience seamless living with connected services at your fingertips",
    features: [
      "One-Touch Rent Payment",
      "Instant Maintenance Requests",
      "Digital Lease Access",
      "Community Connection",
      "Smart Service Booking",
      "24/7 Support Access",
    ],
    icon: Home,
    gradient: "from-teal to-teal-dark",
    bgPattern: "bg-gradient-to-br from-pearl to-stone-light",
    textColor: "text-teal",
    accentColor: "bg-teal",
  },
]

export default function UserTypePage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pearl via-pearl-light to-stone-light relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-desert-pattern opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-teal/5"></div>

      {/* Header */}
      <header className="relative bg-white/90 backdrop-blur-md border-b border-stone/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <MahaLogo size="xl" variant="primary" showText={true} />
            </div>
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-teal mb-4 font-serif">
                Welcome to the Future of
                <span className="text-gold block">Property Management</span>
              </h1>
              <p className="text-xl text-teal/80 leading-relaxed">
                Choose your experience and discover how MahaOne transforms property interactions through intelligent
                design and responsive technology.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* User Type Cards */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {userTypes.map((userType) => (
            <Card
              key={userType.type}
              className={`border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                selectedType === userType.type ? "ring-4 ring-gold/50 shadow-gold/20" : ""
              } ${userType.bgPattern} backdrop-blur-sm overflow-hidden relative group`}
              onClick={() => setSelectedType(userType.type)}
            >
              {/* Card Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 group-hover:from-white/70 group-hover:to-white/40 transition-all duration-500"></div>

              {/* Selection Indicator */}
              {selectedType === userType.type && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-gold rounded-full flex items-center justify-center animate-fade-in">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              )}

              <CardHeader className="relative text-center pb-6 pt-8">
                <div
                  className={`w-24 h-24 bg-gradient-to-br ${userType.gradient} rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110`}
                >
                  <userType.icon className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-teal mb-2 font-serif">{userType.title}</CardTitle>
                <p className="text-lg text-teal/70 font-medium">{userType.subtitle}</p>
              </CardHeader>

              <CardContent className="relative space-y-8 pb-8">
                <p className="text-teal/80 text-center leading-relaxed text-lg">{userType.description}</p>

                <div className="space-y-4">
                  <h4 className="font-bold text-teal text-lg font-serif">Key Features:</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {userType.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all duration-300"
                      >
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${userType.gradient} shadow-sm`}></div>
                        <span className="text-teal font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    asChild
                    className={`w-full h-14 bg-gradient-to-r ${userType.gradient} hover:shadow-xl text-white font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 rounded-2xl`}
                  >
                    <Link href={`/${userType.type}/dashboard`}>
                      <span>Continue as {userType.title}</span>
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Support Section */}
        <div className="text-center">
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-xl max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-gold to-teal rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-teal mb-4 font-serif">Need Assistance?</h3>
              <p className="text-teal/70 mb-6 leading-relaxed">
                Our dedicated support team is here to help you get started with MahaOne. Experience the difference of
                personalized property management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  className="border-2 border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300 font-semibold px-8 py-3 rounded-xl"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Schedule Demo
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-teal text-teal hover:bg-teal hover:text-white transition-all duration-300 font-semibold px-8 py-3 rounded-xl"
                >
                  <Shield className="h-5 w-5 mr-2" />
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Brand Values */}
        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-dark rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-teal mb-2 font-serif">Prestige</h4>
              <p className="text-teal/70 text-sm">Premium experience with Middle Eastern heritage</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-teal to-teal-dark rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Building className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-teal mb-2 font-serif">Smart Living</h4>
              <p className="text-teal/70 text-sm">Intelligent tools for modern property management</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-gold to-teal rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-teal mb-2 font-serif">Connected</h4>
              <p className="text-teal/70 text-sm">Seamless communication and responsive support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
