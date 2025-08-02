"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Bell, Shield, Database, Globe } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "Nation IT Conference 2025",
    siteDescription: "43rd National IT Conference",
    adminEmail: "admin@nitconf.lk",
    supportEmail: "support@nitconf.lk",
    emailNotifications: true,
    smsNotifications: true,
    autoVerifyPayments: false,
    allowRegistrations: true,
    maxRegistrations: 500,
    earlyBirdDiscount: 15,
    csslMemberDiscount: 20,
  })

  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSave = async () => {
    setSaving(true)
    setSaveStatus("idle")
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log("Settings saved:", settings)
      setSaveStatus("success")
      
      // Reset success status after 3 seconds
      setTimeout(() => setSaveStatus("idle"), 3000)
    } catch (error) {
      console.error("Failed to save settings:", error)
      setSaveStatus("error")
      
      // Reset error status after 3 seconds
      setTimeout(() => setSaveStatus("idle"), 3000)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">Configure system preferences and application settings</p>
        </div>
        <div className="flex items-center space-x-2">
          {saveStatus === "success" && (
            <span className="text-green-600 text-sm">Settings saved successfully!</span>
          )}
          {saveStatus === "error" && (
            <span className="text-red-600 text-sm">Failed to save settings</span>
          )}
          <Button 
            onClick={handleSave} 
            disabled={saving}
            className="bg-blue-800 hover:bg-blue-900"
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>Basic configuration for the conference system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Input
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="maxRegistrations">Maximum Registrations</Label>
                  <Input
                    id="maxRegistrations"
                    type="number"
                    value={settings.maxRegistrations}
                    onChange={(e) => setSettings({ ...settings, maxRegistrations: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="allowRegistrations"
                    checked={settings.allowRegistrations}
                    onCheckedChange={(checked) => setSettings({ ...settings, allowRegistrations: checked })}
                  />
                  <Label htmlFor="allowRegistrations">Allow New Registrations</Label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="earlyBirdDiscount">Early Bird Discount (%)</Label>
                  <Input
                    id="earlyBirdDiscount"
                    type="number"
                    value={settings.earlyBirdDiscount}
                    onChange={(e) => setSettings({ ...settings, earlyBirdDiscount: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="csslMemberDiscount">CSSL Member Discount (%)</Label>
                  <Input
                    id="csslMemberDiscount"
                    type="number"
                    value={settings.csslMemberDiscount}
                    onChange={(e) => setSettings({ ...settings, csslMemberDiscount: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Email Configuration
              </CardTitle>
              <CardDescription>Configure email settings and templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="adminEmail">Admin Email</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={settings.adminEmail}
                    onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="emailTemplate">Email Template</Label>
                <Textarea id="emailTemplate" placeholder="Email template content..." className="min-h-32" />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Email Templates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start bg-transparent">
                    Registration Confirmation
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    Payment Verification
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    QR Code Delivery
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    Event Reminder
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Send email notifications for registrations and payments</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-gray-500">Send SMS notifications for important updates</p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoVerifyPayments">Auto-verify Payments</Label>
                    <p className="text-sm text-gray-500">Automatically verify payments (use with caution)</p>
                  </div>
                  <Switch
                    id="autoVerifyPayments"
                    checked={settings.autoVerifyPayments}
                    onCheckedChange={(checked) => setSettings({ ...settings, autoVerifyPayments: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure security and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>

              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>

              <Button className="bg-blue-800 hover:bg-blue-900">Update Password</Button>

              <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4">Session Management</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    View Active Sessions
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Revoke All Sessions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Advanced Settings
              </CardTitle>
              <CardDescription>Advanced system configuration and maintenance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Database Management</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline">Backup Database</Button>
                  <Button variant="outline">Restore Database</Button>
                  <Button variant="outline">Clear Cache</Button>
                  <Button variant="outline">Optimize Database</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">System Maintenance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline">Export All Data</Button>
                  <Button variant="outline">Import Data</Button>
                  <Button variant="outline">System Health Check</Button>
                  <Button variant="outline">View System Logs</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">API Configuration</h3>
                <div>
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input id="apiKey" value="sk-1234567890abcdef" readOnly />
                </div>
                <Button variant="outline">Regenerate API Key</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
