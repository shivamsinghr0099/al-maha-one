"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Building2,
  Users,
  AlertCircle,
  TrendingUp,
  Bell,
  Settings,
} from "lucide-react"

import OverviewTab from "@/components/dashboard-tabs.tsx/overviewTab"
import PropertiesTab from "@/components/dashboard-tabs.tsx/propertiesTab"
import TenantsTab from "@/components/dashboard-tabs.tsx/tenantsTab"
import LandlordsTab from "@/components/dashboard-tabs.tsx/landlordTab"
import VisitsTab from "@/components/dashboard-tabs.tsx/visitTab"
import VisitPurposesTab from "@/components/dashboard-tabs.tsx/visitPurposeTab"
import AmenitiesTab from "@/components/dashboard-tabs.tsx/amenitiesTab"
import AmenityBookingsTab from "@/components/dashboard-tabs.tsx/amenitiesBookingTab"
import HomeServicesTab from "@/components/dashboard-tabs.tsx/homeServicestab"
import ServiceProductsTab from "@/components/dashboard-tabs.tsx/serviceProductTab"
import ServiceBookingsTab from "@/components/dashboard-tabs.tsx/serviceBookingsTab"
import ServiceProvidersTab from "@/components/dashboard-tabs.tsx/serviceProviderTab"
import ReportsTab from "@/components/dashboard-tabs.tsx/reportsTab"
import ReportPrioritiesTab from "@/components/dashboard-tabs.tsx/reportPrioritiesTab"
import ReportCategoriesTab from "@/components/dashboard-tabs.tsx/reportCategoriesTab"
import CommunityTab from "@/components/dashboard-tabs.tsx/comunitiesTab"
import SettingsTab from "@/components/dashboard-tabs.tsx/settingtabs"


export default function BuildingManagerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    {
      title: "Total Properties",
      value: "24",
      change: "+2 this month",
      icon: Building2,
      color: "text-teal",
    },
    {
      title: "Active Tenants",
      value: "156",
      change: "+12 this month",
      icon: Users,
      color: "text-gold",
    },
    {
      title: "Pending Requests",
      value: "8",
      change: "2 urgent",
      icon: AlertCircle,
      color: "text-coral",
    },
    {
      title: "Revenue",
      value: "AED 245K",
      change: "+15% vs last month",
      icon: TrendingUp,
      color: "text-forest",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone via-white to-teal/10">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-forest">Building Manager Portal</h1>
              <p className="text-sm text-gray-600">Manage properties, tenants, and services</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-teal flex items-center justify-center text-white font-semibold">
                  BM
                </div>
                <div className="text-sm">
                  <p className="font-semibold">Building Manager</p>
                  <p className="text-gray-600">manager@mahaone.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-forest">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="relative">
            <TabsList className="inline-flex w-full overflow-x-auto bg-white/80 backdrop-blur-sm p-1 rounded-lg shadow-sm scrollbar-hide">
              <TabsTrigger value="overview" className="whitespace-nowrap">Overview</TabsTrigger>
              <TabsTrigger value="properties" className="whitespace-nowrap">Properties</TabsTrigger>
              <TabsTrigger value="tenants" className="whitespace-nowrap">Tenants</TabsTrigger>
              <TabsTrigger value="landlords" className="whitespace-nowrap">Landlords</TabsTrigger>
              <TabsTrigger value="visits" className="whitespace-nowrap">Visits</TabsTrigger>
              <TabsTrigger value="visit-purposes" className="whitespace-nowrap">Visit Purposes</TabsTrigger>
              <TabsTrigger value="amenities" className="whitespace-nowrap">Amenities</TabsTrigger>
              <TabsTrigger value="amenity-bookings" className="whitespace-nowrap">Amenity Bookings</TabsTrigger>
              <TabsTrigger value="home-services" className="whitespace-nowrap">Home Services</TabsTrigger>
              <TabsTrigger value="service-products" className="whitespace-nowrap">Service Products</TabsTrigger>
              <TabsTrigger value="service-bookings" className="whitespace-nowrap">Service Bookings</TabsTrigger>
              <TabsTrigger value="service-providers" className="whitespace-nowrap">Service Providers</TabsTrigger>
              <TabsTrigger value="reports" className="whitespace-nowrap">Reports</TabsTrigger>
              <TabsTrigger value="report-priorities" className="whitespace-nowrap">Report Priorities</TabsTrigger>
              <TabsTrigger value="report-categories" className="whitespace-nowrap">Report Categories</TabsTrigger>
              <TabsTrigger value="community" className="whitespace-nowrap">Community Wall</TabsTrigger>
              <TabsTrigger value="settings" className="whitespace-nowrap">Settings</TabsTrigger>
            </TabsList>
          </div>

          {/* ------------------- TAB CONTENTS ------------------- */}
          <TabsContent value="overview"><OverviewTab /></TabsContent>
          <TabsContent value="properties"><PropertiesTab /></TabsContent>
          <TabsContent value="tenants"><TenantsTab /></TabsContent>
          <TabsContent value="landlords"><LandlordsTab /></TabsContent>
          <TabsContent value="visits"><VisitsTab /></TabsContent>
          <TabsContent value="visit-purposes"><VisitPurposesTab /></TabsContent>
          <TabsContent value="amenities"><AmenitiesTab /></TabsContent>
          <TabsContent value="amenity-bookings"><AmenityBookingsTab /></TabsContent>
          <TabsContent value="home-services"><HomeServicesTab /></TabsContent>
          <TabsContent value="service-products"><ServiceProductsTab /></TabsContent>
          <TabsContent value="service-bookings"><ServiceBookingsTab /></TabsContent>
          <TabsContent value="service-providers"><ServiceProvidersTab /></TabsContent>
          <TabsContent value="reports"><ReportsTab /></TabsContent>
          <TabsContent value="report-priorities"><ReportPrioritiesTab /></TabsContent>
          <TabsContent value="report-categories"><ReportCategoriesTab /></TabsContent>
          <TabsContent value="community"><CommunityTab /></TabsContent>
          <TabsContent value="settings"><SettingsTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  )
}