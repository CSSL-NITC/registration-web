"use client"

import { useState, useEffect } from "react"
import { RegistrationsTable } from "@/components/dashboard/registrations-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getRegistrations, verifyPayment, generateInvoice, generateQRCode } from "@/lib/mock-api/registrations"
import { Download, Users, CheckCircle, Clock, AlertCircle } from "lucide-react"
import type { Registration } from "@/lib/mock-api/registrations"

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRegistrations()
  }, [])

  const loadRegistrations = async () => {
    setLoading(true)
    try {
      const data = await getRegistrations()
      setRegistrations(data)
    } catch (error) {
      console.error("Failed to load registrations:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyPayment = async (id: string) => {
    try {
      const updatedRegistration = await verifyPayment(id)
      setRegistrations((prev) => prev.map((reg) => (reg.id === id ? updatedRegistration : reg)))
    } catch (error) {
      console.error("Failed to verify payment:", error)
    }
  }

  const handleGenerateInvoice = async (id: string) => {
    try {
      const updatedRegistration = await generateInvoice(id)
      setRegistrations((prev) => prev.map((reg) => (reg.id === id ? updatedRegistration : reg)))
    } catch (error) {
      console.error("Failed to generate invoice:", error)
    }
  }

  const handleGenerateQR = async (id: string) => {
    try {
      const updatedRegistration = await generateQRCode(id)
      setRegistrations((prev) => prev.map((reg) => (reg.id === id ? updatedRegistration : reg)))
    } catch (error) {
      console.error("Failed to generate QR code:", error)
    }
  }

  const stats = {
    total: registrations.length,
    verified: registrations.filter((r) => r.paymentStatus === "verified").length,
    pending: registrations.filter((r) => r.paymentStatus === "pending").length,
    failed: registrations.filter((r) => r.paymentStatus === "failed").length,
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Individual Registrations</h1>
          <p className="text-gray-600">Manage individual conference registrations and verify payments</p>
        </div>
        <Button variant="outline" className="bg-transparent">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Registrations</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verified Payments</p>
                <p className="text-2xl font-bold text-green-600">{stats.verified}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed Payments</p>
                <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Registrations Table */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>All Registrations</CardTitle>
          <CardDescription>Complete list of individual conference registrations</CardDescription>
        </CardHeader>
        <CardContent>
          <RegistrationsTable
            registrations={registrations}
            onVerifyPayment={handleVerifyPayment}
            onGenerateInvoice={handleGenerateInvoice}
            onGenerateQR={handleGenerateQR}
            loading={loading}
          />
        </CardContent>
      </Card>
    </div>
  )
}
