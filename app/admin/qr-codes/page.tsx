"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getRegistrations, generateQRCode } from "@/lib/mock-api/registrations"
import { QrCode, Download, Search, Eye, RefreshCw } from "lucide-react"
import type { Registration } from "@/lib/mock-api/registrations"

export default function QRCodesPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadQRCodes()
  }, [])

  const loadQRCodes = async () => {
    setLoading(true)
    try {
      const data = await getRegistrations()
      setRegistrations(data)
    } catch (error) {
      console.error("Failed to load QR codes:", error)
    } finally {
      setLoading(false)
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

  const filteredRegistrations = registrations.filter(
    (registration) =>
      registration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const stats = {
    total: registrations.length,
    generated: registrations.filter((r) => r.qrCodeGenerated).length,
    pending: registrations.filter((r) => !r.qrCodeGenerated && r.paymentStatus === "verified").length,
    verified: registrations.filter((r) => r.paymentStatus === "verified").length,
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">QR Code Management</h1>
          <p className="text-gray-600">Generate and manage QR codes for conference entry</p>
        </div>
        <Button variant="outline" className="bg-transparent">
          <Download className="mr-2 h-4 w-4" />
          Export QR Codes
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
              <QrCode className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">QR Codes Generated</p>
                <p className="text-2xl font-bold text-green-600">{stats.generated}</p>
              </div>
              <QrCode className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Generation</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <RefreshCw className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verified Payments</p>
                <p className="text-2xl font-bold text-blue-600">{stats.verified}</p>
              </div>
              <QrCode className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* QR Codes Table */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>QR Code Status</CardTitle>
          <CardDescription>Generate and manage QR codes for verified registrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search */}
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search registrations..."
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
                    <TableHead>Payment Status</TableHead>
                    <TableHead>QR Code Status</TableHead>
                    <TableHead>Generated Date</TableHead>
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
                        <Badge
                          className={
                            registration.paymentStatus === "verified"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : registration.paymentStatus === "pending"
                                ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                : "bg-red-100 text-red-800 border-red-200"
                          }
                        >
                          {registration.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            registration.qrCodeGenerated
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-gray-100 text-gray-800 border-gray-200"
                          }
                        >
                          {registration.qrCodeGenerated ? "Generated" : "Not Generated"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-500">
                          {registration.qrCodeGenerated ? new Date(registration.createdAt).toLocaleDateString() : "-"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {registration.paymentStatus === "verified" && !registration.qrCodeGenerated && (
                            <Button
                              size="sm"
                              onClick={() => handleGenerateQR(registration.id)}
                              className="bg-blue-800 hover:bg-blue-900"
                            >
                              <QrCode className="h-4 w-4 mr-1" />
                              Generate
                            </Button>
                          )}
                          {registration.qrCodeGenerated && (
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          {registration.qrCodeGenerated && (
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
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
