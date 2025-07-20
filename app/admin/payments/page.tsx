"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getRegistrations, verifyPayment } from "@/lib/mock-api/registrations"
import { CreditCard, CheckCircle, Clock, Search, FileText } from "lucide-react"
import type { Registration } from "@/lib/mock-api/registrations"

export default function PaymentsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadPayments()
  }, [])

  const loadPayments = async () => {
    setLoading(true)
    try {
      const data = await getRegistrations()
      setRegistrations(data)
    } catch (error) {
      console.error("Failed to load payments:", error)
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

  const filteredRegistrations = registrations.filter(
    (registration) =>
      registration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const stats = {
    totalRevenue: registrations.reduce((sum, r) => sum + r.finalPrice, 0),
    verified: registrations.filter((r) => r.paymentStatus === "verified").length,
    pending: registrations.filter((r) => r.paymentStatus === "pending").length,
    failed: registrations.filter((r) => r.paymentStatus === "failed").length,
    verifiedRevenue: registrations
      .filter((r) => r.paymentStatus === "verified")
      .reduce((sum, r) => sum + r.finalPrice, 0),
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-600">Verify payments and manage financial transactions</p>
        </div>
        <Button variant="outline" className="bg-transparent">
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">LKR {(stats.totalRevenue / 1000000).toFixed(1)}M</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
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
                <p className="text-sm font-medium text-gray-600">Verified Revenue</p>
                <p className="text-2xl font-bold text-green-600">LKR {(stats.verifiedRevenue / 1000000).toFixed(1)}M</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Payment Transactions</CardTitle>
          <CardDescription>Review and verify payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search */}
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Table */}
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Participant</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Original Price</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Final Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrations.map((registration) => (
                    <TableRow key={registration.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900">{registration.name}</div>
                          <div className="text-sm text-gray-500">{registration.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{registration.packageName}</div>
                          <div className="text-sm text-gray-500">{registration.workplace}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">LKR {registration.originalPrice.toLocaleString()}</div>
                      </TableCell>
                      <TableCell>
                        {registration.discountPercentage > 0 ? (
                          <div className="text-green-600 font-medium">{registration.discountPercentage}%</div>
                        ) : (
                          <div className="text-gray-400">-</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-blue-800">LKR {registration.finalPrice.toLocaleString()}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(registration.paymentStatus)}>
                          {registration.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {registration.paymentStatus === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => handleVerifyPayment(registration.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Verify
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
