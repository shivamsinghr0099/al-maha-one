"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, User, Users, Phone, Mail, Edit, Camera, Moon, Sun, Smartphone, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

const userProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+971 50 123 4567",
  emiratesId: "784-1234-5678901-2",
  nationality: "United States",
  dateOfBirth: "1985-06-15",
  occupation: "Software Engineer",
  company: "Tech Solutions LLC",
  address: "Villa A-101, Azure Gardens Community, Dubai",
  emergencyContact: {
    name: "Jane Doe",
    relationship: "Spouse",
    phone: "+971 50 987 6543",
  },
  avatar: "/placeholder.svg?height=100&width=100&text=JD",
}

const familyMembers = [
  {
    id: 1,
    name: "Jane Doe",
    relationship: "Spouse",
    age: 32,
    emiratesId: "784-9876-5432109-8",
    phone: "+971 50 987 6543",
  },
  {
    id: 2,
    name: "Alex Doe",
    relationship: "Child",
    age: 8,
    emiratesId: "784-5555-1111222-3",
    phone: "-",
  },
]

const notificationSettings = {
  email: {
    maintenance: true,
    payments: true,
    announcements: true,
    emergencies: true,
    marketing: false,
  },
  push: {
    maintenance: true,
    payments: true,
    announcements: false,
    emergencies: true,
    marketing: false,
  },
  sms: {
    maintenance: false,
    payments: true,
    announcements: false,
    emergencies: true,
    marketing: false,
  },
}

const securitySettings = {
  twoFactorEnabled: true,
  biometricEnabled: true,
  sessionTimeout: "30",
  loginAlerts: true,
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

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
              <User className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">Profile & Settings</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Personal Information</CardTitle>
                  <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
                      <AvatarFallback className="text-lg">JD</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full p-2">
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{userProfile.name}</h2>
                    <p className="text-gray-600">{userProfile.occupation}</p>
                    <p className="text-gray-600">{userProfile.company}</p>
                    <Badge variant="secondary" className="mt-2">
                      Villa A-101 Owner
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        defaultValue={userProfile.name}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={userProfile.email}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        defaultValue={userProfile.phone}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emiratesId">Emirates ID</Label>
                      <Input
                        id="emiratesId"
                        defaultValue={userProfile.emiratesId}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationality</Label>
                      <Input
                        id="nationality"
                        defaultValue={userProfile.nationality}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        defaultValue={userProfile.dateOfBirth}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input
                        id="occupation"
                        defaultValue={userProfile.occupation}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        defaultValue={userProfile.company}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        defaultValue={userProfile.address}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <Card className="bg-orange-50 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Emergency Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyName">Name</Label>
                      <Input
                        id="emergencyName"
                        defaultValue={userProfile.emergencyContact.name}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyRelationship">Relationship</Label>
                      <Input
                        id="emergencyRelationship"
                        defaultValue={userProfile.emergencyContact.relationship}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Phone</Label>
                      <Input
                        id="emergencyPhone"
                        defaultValue={userProfile.emergencyContact.phone}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>
                  </CardContent>
                </Card>

                {isEditing && (
                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button onClick={() => setIsEditing(false)} className="flex-1">
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="family" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Family Members</h2>
              <Button>
                <Users className="h-4 w-4 mr-2" />
                Add Family Member
              </Button>
            </div>

            <div className="space-y-4">
              {familyMembers.map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                          <p className="text-sm text-gray-600">
                            {member.relationship} • Age {member.age}
                          </p>
                          <p className="text-sm text-gray-500">Emirates ID: {member.emiratesId}</p>
                          {member.phone !== "-" && <p className="text-sm text-gray-500">Phone: {member.phone}</p>}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
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
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Notification Preferences</h2>
              <p className="text-gray-600">Choose how you want to receive notifications</p>
            </div>

            <NotificationSettings settings={notificationSettings} />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Security Settings</h2>
              <p className="text-gray-600">Manage your account security and privacy</p>
            </div>

            <SecuritySettings settings={securitySettings} />
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">App Preferences</h2>
              <p className="text-gray-600">Customize your app experience</p>
            </div>

            <AppPreferences darkMode={darkMode} setDarkMode={setDarkMode} />
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Management</h2>
              <p className="text-gray-600">Manage your account settings and data</p>
            </div>

            <AccountManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function NotificationSettings({ settings }: { settings: typeof notificationSettings }) {
  const [emailSettings, setEmailSettings] = useState(settings.email)
  const [pushSettings, setPushSettings] = useState(settings.push)
  const [smsSettings, setSmsSettings] = useState(settings.sms)

  const notificationTypes = [
    { key: "maintenance", label: "Maintenance Updates", description: "Service requests and maintenance schedules" },
    { key: "payments", label: "Payment Reminders", description: "Bills, invoices, and payment confirmations" },
    { key: "announcements", label: "Community Announcements", description: "Building news and important updates" },
    { key: "emergencies", label: "Emergency Alerts", description: "Urgent safety and security notifications" },
    { key: "marketing", label: "Marketing Communications", description: "Promotional offers and newsletters" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Email Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {notificationTypes.map((type) => (
            <div key={type.key} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{type.label}</h4>
                <p className="text-sm text-gray-500">{type.description}</p>
              </div>
              <Switch
                checked={emailSettings[type.key as keyof typeof emailSettings]}
                onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, [type.key]: checked })}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5" />
            <span>Push Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {notificationTypes.map((type) => (
            <div key={type.key} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{type.label}</h4>
                <p className="text-sm text-gray-500">{type.description}</p>
              </div>
              <Switch
                checked={pushSettings[type.key as keyof typeof pushSettings]}
                onCheckedChange={(checked) => setPushSettings({ ...pushSettings, [type.key]: checked })}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="h-5 w-5" />
            <span>SMS Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {notificationTypes.map((type) => (
            <div key={type.key} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{type.label}</h4>
                <p className="text-sm text-gray-500">{type.description}</p>
              </div>
              <Switch
                checked={smsSettings[type.key as keyof typeof smsSettings]}
                onCheckedChange={(checked) => setSmsSettings({ ...smsSettings, [type.key]: checked })}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Notification Preferences</Button>
      </div>
    </div>
  )
}

function SecuritySettings({ settings }: { settings: typeof securitySettings }) {
  const [securityConfig, setSecurityConfig] = useState(settings)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Password & Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter current password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" placeholder="Enter new password" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
          </div>

          <Button>Update Password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Enable 2FA</h4>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <Switch
              checked={securityConfig.twoFactorEnabled}
              onCheckedChange={(checked) => setSecurityConfig({ ...securityConfig, twoFactorEnabled: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Biometric Authentication</h4>
              <p className="text-sm text-gray-500">Use fingerprint or face recognition</p>
            </div>
            <Switch
              checked={securityConfig.biometricEnabled}
              onCheckedChange={(checked) => setSecurityConfig({ ...securityConfig, biometricEnabled: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Login Alerts</h4>
              <p className="text-sm text-gray-500">Get notified of new device logins</p>
            </div>
            <Switch
              checked={securityConfig.loginAlerts}
              onCheckedChange={(checked) => setSecurityConfig({ ...securityConfig, loginAlerts: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
            <Select
              value={securityConfig.sessionTimeout}
              onValueChange={(value) => setSecurityConfig({ ...securityConfig, sessionTimeout: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">iPhone 13 Pro</h4>
                <p className="text-sm text-gray-500">Dubai, UAE • Current session</p>
                <p className="text-sm text-gray-500">Last active: Now</p>
              </div>
              <Badge variant="secondary">Current</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">MacBook Pro</h4>
                <p className="text-sm text-gray-500">Dubai, UAE</p>
                <p className="text-sm text-gray-500">Last active: 2 hours ago</p>
              </div>
              <Button variant="outline" size="sm">
                Revoke
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Security Settings</Button>
      </div>
    </div>
  )
}

function AppPreferences({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: (value: boolean) => void }) {
  const [language, setLanguage] = useState("en")
  const [timezone, setTimezone] = useState("asia/dubai")
  const [currency, setCurrency] = useState("aed")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <div>
                <h4 className="font-medium text-gray-900">Dark Mode</h4>
                <p className="text-sm text-gray-500">Switch to dark theme</p>
              </div>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">العربية (Arabic)</SelectItem>
                <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                <SelectItem value="ur">اردو (Urdu)</SelectItem>
                <SelectItem value="fr">Français (French)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asia/dubai">Asia/Dubai (GMT+4)</SelectItem>
                <SelectItem value="asia/riyadh">Asia/Riyadh (GMT+3)</SelectItem>
                <SelectItem value="asia/kuwait">Asia/Kuwait (GMT+3)</SelectItem>
                <SelectItem value="asia/qatar">Asia/Qatar (GMT+3)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aed">AED (UAE Dirham)</SelectItem>
                <SelectItem value="sar">SAR (Saudi Riyal)</SelectItem>
                <SelectItem value="kwd">KWD (Kuwaiti Dinar)</SelectItem>
                <SelectItem value="qar">QAR (Qatari Riyal)</SelectItem>
                <SelectItem value="usd">USD (US Dollar)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Profile Visibility</h4>
              <p className="text-sm text-gray-500">Allow other residents to see your profile</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Activity Status</h4>
              <p className="text-sm text-gray-500">Show when you're active in the app</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Data Analytics</h4>
              <p className="text-sm text-gray-500">Help improve the app with usage data</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Preferences</Button>
      </div>
    </div>
  )
}

function AccountManagement() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Download My Data</h4>
              <p className="text-sm text-gray-500">Get a copy of all your data</p>
            </div>
            <Button variant="outline">Download</Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Export Documents</h4>
              <p className="text-sm text-gray-500">Export all uploaded documents</p>
            </div>
            <Button variant="outline">Export</Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Clear Cache</h4>
              <p className="text-sm text-gray-500">Clear app cache and temporary files</p>
            </div>
            <Button variant="outline">Clear</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
            <div>
              <h4 className="font-medium text-red-900">Deactivate Account</h4>
              <p className="text-sm text-red-600">Temporarily disable your account</p>
            </div>
            <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
              Deactivate
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
            <div>
              <h4 className="font-medium text-red-900">Delete Account</h4>
              <p className="text-sm text-red-600">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Contact Support</h4>
              <p className="text-sm text-gray-500">Get help from our support team</p>
            </div>
            <Button variant="outline">Contact</Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Report a Bug</h4>
              <p className="text-sm text-gray-500">Report technical issues</p>
            </div>
            <Button variant="outline">Report</Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">App Version</h4>
              <p className="text-sm text-gray-500">Version 2.1.0 (Build 2024.01.20)</p>
            </div>
            <Button variant="outline">Check Updates</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
