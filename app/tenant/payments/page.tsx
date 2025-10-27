"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  CreditCard,
  Building,
  Calendar,
  DollarSign,
  Receipt,
  History,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Clock,
  Download,
  Eye,
  Smartphone,
  University,
  Bell,
  MessageSquare,
  Phone,
  FileText,
} from "lucide-react"
import Link from "next/link"

const paymentHistory = [
  {
    id: 1,
    date: "2024-01-01",
    amount: 4500,
    status: "paid",
    method: "Credit Card",
    reference: "PAY-2024-001",
    dueDate: "2024-01-01",
    lateFee: 0,
  },
  {
    id: 2,
    date: "2023-12-01",
    amount: 4500,
    status: "paid",
    method: "Bank Transfer",
    reference: "PAY-2023-012",
    dueDate: "2023-12-01",
    lateFee: 0,
  },
  {
    id: 3,
    date: "2023-11-01",
    amount: 4500,
    status: "paid",
    method: "Credit Card",
    reference: "PAY-2023-011",
    dueDate: "2023-11-01",
    lateFee: 0,
  },
  {
    id: 4,
    date: "2023-10-03",
    amount: 4650,
    status: "paid",
    method: "Credit Card",
    reference: "PAY-2023-010",
    dueDate: "2023-10-01",
    lateFee: 150,
  },
]

const upcomingPayments = [
  {
    id: 1,
    type: "Rent",
    amount: 4500,
    dueDate: "2024-02-01",
    status: "upcoming",
    daysUntilDue: 5,
  },
  {
    id: 2,
    type: "Utilities",
    amount: 350,
    dueDate: "2024-02-05",
    status: "upcoming",
    daysUntilDue: 9,
  },
]

const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    description: "Visa, Mastercard, American Express",
    icon: CreditCard,
    processingFee: "2.9%",
    processingTime: "Instant",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    description: "Direct bank transfer (UAE banks)",
    icon: University,
    processingFee: "Free",
    processingTime: "1-2 business days",
  },
  {
    id: "wallet",
    name: "Digital Wallet",
    description: "Apple Pay, Google Pay, Samsung Pay",
    icon: Smartphone,
    processingFee: "2.9%",
    processingTime: "Instant",
  },
]

export default function TenantPaymentsPage() {
  const [selectedPayment, setSelectedPayment] = useState<number | null>(null)
  const [selectedMethod, setSelectedMethod] = useState("card")
  const [autoPayEnabled, setAutoPayEnabled] = useState(false)
  const [showPaymentForm, setShowPaymentForm] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "overdue":
        return <AlertCircle className="h-4 w-4" />
      case "upcoming":
        return <Calendar className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const totalPaid = paymentHistory.reduce((sum, payment) => sum + payment.amount, 0)
  const nextPaymentAmount = upcomingPayments[0]?.amount || 0
  const nextPaymentDate = upcomingPayments[0]?.dueDate || ""

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-24 md:pb-8">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/tenant/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Payment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Next Payment</p>
                  <p className="text-2xl font-bold text-gray-900">AED {nextPaymentAmount.toLocaleString()}</p>
                  <p className="text-sm text-red-600">Due: {new Date(nextPaymentDate).toLocaleDateString()}</p>
                </div>
                <div className="p-3 rounded-xl bg-red-50">
                  <Calendar className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Paid (2024)</p>
                  <p className="text-2xl font-bold text-gray-900">AED {totalPaid.toLocaleString()}</p>
                  <p className="text-sm text-green-600">All payments on time</p>
                </div>
                <div className="p-3 rounded-xl bg-green-50">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Payment Status</p>
                  <p className="text-2xl font-bold text-green-600">Current</p>
                  <p className="text-sm text-gray-600">No outstanding balance</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-50">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Payments */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>Upcoming Payments</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-500 rounded-xl">
                          <DollarSign className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{payment.type}</h3>
                          <p className="text-sm text-gray-600">Due: {new Date(payment.dueDate).toLocaleDateString()}</p>
                          <p className="text-xs text-blue-600">{payment.daysUntilDue} days remaining</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">AED {payment.amount.toLocaleString()}</p>
                        <Button
                          className="mt-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                          onClick={() => {
                            setSelectedPayment(payment.id)
                            setShowPaymentForm(true)
                          }}
                        >
                          Pay Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            {showPaymentForm && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-green-600" />
                    <span>Make Payment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Payment Amount */}
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Payment Amount:</span>
                        <span className="text-2xl font-bold text-gray-900">
                          AED {nextPaymentAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div>
                      <Label className="text-base font-semibold">Select Payment Method</Label>
                      <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="mt-3">
                        {paymentMethods.map((method) => (
                          <div
                            key={method.id}
                            className="flex items-center space-x-3 p-4 border rounded-xl hover:bg-gray-50"
                          >
                            <RadioGroupItem value={method.id} id={method.id} />
                            <div className="flex items-center space-x-3 flex-1">
                              <method.icon className="h-6 w-6 text-gray-600" />
                              <div className="flex-1">
                                <Label htmlFor={method.id} className="font-medium cursor-pointer">
                                  {method.name}
                                </Label>
                                <p className="text-sm text-gray-600">{method.description}</p>
                                <div className="flex space-x-4 mt-1">
                                  <span className="text-xs text-green-600">Fee: {method.processingFee}</span>
                                  <span className="text-xs text-blue-600">Time: {method.processingTime}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Payment Details Form */}
                    {selectedMethod === "card" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                          </div>
                          <div>
                            <Label htmlFor="cardName">Cardholder Name</Label>
                            <Input id="cardName" placeholder="John Doe" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedMethod === "bank" && (
                      <div className="p-4 bg-blue-50 rounded-xl">
                        <h4 className="font-semibold text-blue-900 mb-2">Bank Transfer Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-blue-700">Bank Name:</span>
                            <span className="font-medium">Emirates NBD</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">Account Number:</span>
                            <span className="font-medium">1234567890</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">IBAN:</span>
                            <span className="font-medium">AE070331234567890123456</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">Reference:</span>
                            <span className="font-medium">RENT-A101-{new Date().getMonth() + 1}-2024</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <Separator />

                    {/* Payment Summary */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Rent Amount:</span>
                        <span>AED {nextPaymentAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Processing Fee:</span>
                        <span>
                          {selectedMethod === "bank" ? "Free" : `AED ${Math.round(nextPaymentAmount * 0.029)}`}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total Amount:</span>
                        <span>
                          AED{" "}
                          {selectedMethod === "bank"
                            ? nextPaymentAmount.toLocaleString()
                            : (nextPaymentAmount + Math.round(nextPaymentAmount * 0.029)).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button variant="outline" className="flex-1" onClick={() => setShowPaymentForm(false)}>
                        Cancel
                      </Button>
                      <Button className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Complete Payment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment History */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <History className="h-5 w-5 text-purple-600" />
                    <span>Payment History</span>
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentHistory.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-lg bg-gray-100">{getStatusIcon(payment.status)}</div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">Rent Payment</h3>
                            <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            Paid on {new Date(payment.date).toLocaleDateString()} • {payment.method}
                          </p>
                          <p className="text-xs text-gray-500">Ref: {payment.reference}</p>
                          {payment.lateFee > 0 && (
                            <p className="text-xs text-red-600">Late fee: AED {payment.lateFee}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">AED {payment.amount.toLocaleString()}</p>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Receipt
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Auto-Pay Settings */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Receipt className="h-5 w-5 text-emerald-600" />
                  <span>Auto-Pay</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Enable Auto-Pay</h4>
                      <p className="text-sm text-gray-600">Automatically pay rent on due date</p>
                    </div>
                    <Switch checked={autoPayEnabled} onCheckedChange={setAutoPayEnabled} />
                  </div>

                  {autoPayEnabled && (
                    <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                      <p className="text-sm text-emerald-800">
                        Auto-pay will be processed 1 day before the due date using your default payment method.
                      </p>
                    </div>
                  )}

                  <Button variant="outline" className="w-full" size="sm">
                    Manage Payment Methods
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Reminders */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-blue-600" />
                  <span>Reminders</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Email reminders</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">SMS reminders</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Push notifications</span>
                    <Switch defaultChecked />
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="text-sm text-gray-600">
                  <p className="mb-2">Reminder schedule:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• 7 days before due date</li>
                    <li>• 3 days before due date</li>
                    <li>• 1 day before due date</li>
                    <li>• On due date</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-orange-600" />
                  <span>Need Help?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Landlord
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Payment Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Payment FAQ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
