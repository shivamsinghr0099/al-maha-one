"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  ArrowLeft,
  CreditCard,
  DollarSign,
  Calendar,
  Download,
  Receipt,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  Building,
  Car,
  Shield,
  Plus,
} from "lucide-react"
import Link from "next/link"

const outstandingBills = [
  {
    id: "BILL001",
    type: "Service Charges",
    amount: 1250,
    currency: "AED",
    dueDate: "2024-01-31",
    status: "overdue",
    description: "Monthly service charges for January 2024",
    category: "recurring",
  },
  {
    id: "BILL002",
    type: "Utility Bills",
    amount: 450,
    currency: "AED",
    dueDate: "2024-02-05",
    status: "due",
    description: "Electricity and water charges",
    category: "utility",
  },
  {
    id: "BILL003",
    type: "Parking Fine",
    amount: 200,
    currency: "AED",
    dueDate: "2024-02-10",
    status: "pending",
    description: "Violation: Parking in visitor space",
    category: "violation",
  },
  {
    id: "BILL004",
    type: "Gym Booking",
    amount: 50,
    currency: "AED",
    dueDate: "2024-01-25",
    status: "due",
    description: "Personal training session booking",
    category: "amenity",
  },
]

const paymentHistory = [
  {
    id: "PAY001",
    type: "Service Charges",
    amount: 1250,
    currency: "AED",
    date: "2023-12-28",
    status: "completed",
    method: "Credit Card",
    reference: "TXN123456789",
  },
  {
    id: "PAY002",
    type: "Maintenance Service",
    amount: 150,
    currency: "AED",
    date: "2024-01-15",
    status: "completed",
    method: "Bank Transfer",
    reference: "TXN987654321",
  },
  {
    id: "PAY003",
    type: "Pool Booking",
    amount: 25,
    currency: "AED",
    date: "2024-01-10",
    status: "completed",
    method: "Digital Wallet",
    reference: "TXN456789123",
  },
]

const autoPaySettings = [
  {
    id: "service-charges",
    name: "Service Charges",
    description: "Monthly recurring service charges",
    enabled: true,
    amount: "AED 1,250",
    nextPayment: "2024-02-01",
  },
  {
    id: "utility-bills",
    name: "Utility Bills",
    description: "Electricity and water charges",
    enabled: false,
    amount: "Variable",
    nextPayment: "N/A",
  },
]

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("outstanding")
  const [selectedBills, setSelectedBills] = useState<string[]>([])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "due":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle
      case "overdue":
        return AlertCircle
      case "due":
        return Clock
      case "pending":
        return Clock
      default:
        return AlertCircle
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "recurring":
        return Building
      case "utility":
        return Zap
      case "violation":
        return Shield
      case "amenity":
        return Car
      default:
        return DollarSign
    }
  }

  const totalOutstanding = outstandingBills.reduce((sum, bill) => sum + bill.amount, 0)
  const selectedTotal = outstandingBills
    .filter((bill) => selectedBills.includes(bill.id))
    .reduce((sum, bill) => sum + bill.amount, 0)

  const toggleBillSelection = (billId: string) => {
    setSelectedBills((prev) => (prev.includes(billId) ? prev.filter((id) => id !== billId) : [...prev, billId]))
  }

  const selectAllBills = () => {
    setSelectedBills(outstandingBills.map((bill) => bill.id))
  }

  const clearSelection = () => {
    setSelectedBills([])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <CreditCard className="h-6 w-6 text-green-600" />
              <h1 className="text-xl font-semibold text-gray-900">Payments & Billing</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Outstanding</p>
                  <p className="text-2xl font-bold text-red-600">AED {totalOutstanding.toLocaleString()}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month Paid</p>
                  <p className="text-2xl font-bold text-green-600">AED 1,625</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Auto-Pay Active</p>
                  <p className="text-2xl font-bold text-blue-600">1 Service</p>
                </div>
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="outstanding">Outstanding</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="autopay">Auto-Pay</TabsTrigger>
            <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          </TabsList>

          <TabsContent value="outstanding" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Outstanding Bills</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={selectAllBills}>
                  Select All
                </Button>
                <Button variant="outline" size="sm" onClick={clearSelection}>
                  Clear
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {outstandingBills.map((bill) => {
                const StatusIcon = getStatusIcon(bill.status)
                const CategoryIcon = getCategoryIcon(bill.category)
                const isSelected = selectedBills.includes(bill.id)

                return (
                  <Card
                    key={bill.id}
                    className={`cursor-pointer transition-all ${
                      isSelected ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                    }`}
                    onClick={() => toggleBillSelection(bill.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <CategoryIcon className="h-6 w-6 text-gray-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{bill.type}</h3>
                              <Badge className={getStatusColor(bill.status)}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {bill.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{bill.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>Due: {bill.dueDate}</span>
                              </div>
                              <span>ID: {bill.id}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">
                            {bill.currency} {bill.amount.toLocaleString()}
                          </p>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleBillSelection(bill.id)}
                            className="mt-2 rounded"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {selectedBills.length > 0 && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {selectedBills.length} bill{selectedBills.length > 1 ? "s" : ""} selected
                      </h3>
                      <p className="text-sm text-gray-600">Total amount to pay</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">AED {selectedTotal.toLocaleString()}</p>
                      <Button className="mt-2">Pay Selected Bills</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Payment History</h2>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            <div className="space-y-4">
              {paymentHistory.map((payment) => {
                const StatusIcon = getStatusIcon(payment.status)
                return (
                  <Card key={payment.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                              <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{payment.type}</h3>
                              <Badge className={getStatusColor(payment.status)}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {payment.status}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{payment.date}</span>
                              </div>
                              <span>Method: {payment.method}</span>
                              <span>Ref: {payment.reference}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">
                            {payment.currency} {payment.amount.toLocaleString()}
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            <Receipt className="h-4 w-4 mr-1" />
                            Receipt
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="autopay" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Auto-Pay Settings</h2>
              <p className="text-gray-600">Set up automatic payments for recurring bills</p>
            </div>

            <div className="space-y-4">
              {autoPaySettings.map((setting) => (
                <Card key={setting.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{setting.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{setting.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Amount: {setting.amount}</span>
                          <span>Next Payment: {setting.nextPayment}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Switch checked={setting.enabled} />
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardContent className="p-6 text-center">
                <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Add New Auto-Pay</h3>
                <p className="text-gray-600 mb-4">Set up automatic payments for other recurring bills</p>
                <Button>Add Auto-Pay</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="methods" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Methods</h2>
              <p className="text-gray-600">Manage your saved payment methods</p>
            </div>

            <PaymentMethodsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function PaymentMethodsSection() {
  const [paymentMethods] = useState([
    {
      id: "card1",
      type: "Credit Card",
      last4: "4242",
      brand: "Visa",
      expiry: "12/26",
      isDefault: true,
    },
    {
      id: "card2",
      type: "Debit Card",
      last4: "8888",
      brand: "Mastercard",
      expiry: "08/25",
      isDefault: false,
    },
  ])

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <Card key={method.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {method.brand} •••• {method.last4}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {method.type} • Expires {method.expiry}
                    </p>
                    {method.isDefault && (
                      <Badge variant="secondary" className="mt-1">
                        Default
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6 text-center">
          <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Add Payment Method</h3>
          <p className="text-gray-600 mb-4">Add a new credit card, debit card, or bank account</p>
          <Button>Add Payment Method</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supported Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <CreditCard className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="text-sm font-medium">Credit Cards</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <CreditCard className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="text-sm font-medium">Debit Cards</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Building className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="text-sm font-medium">Bank Transfer</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <p className="text-sm font-medium">Digital Wallets</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
