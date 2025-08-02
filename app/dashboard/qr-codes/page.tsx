"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getQRCodes, generateQRCode, bulkGenerateQRCodes, getQRCodeStats } from "@/lib/api/qr-api"
import { Search, QrCode, Download, Eye, Plus } from "lucide-react"
import { toast } from "sonner"

interface QRCode {
  qrId: number
  content: string
  image?: string
  status: string
  assignTo: number
  createdAt: string
  modifiedAt: string
  version?: number
  user?: {
    firstName: string
    lastName: string
    email: string
  }
}

export default function QRCodesPage() {
  const [qrCodes, setQRCodes] = useState<QRCode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    loadQRCodes()
    loadStats()
  }, [])

  const loadQRCodes = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await getQRCodes({
        search: searchTerm,
        limit: 50
      })
      console.log("QR Codes loaded:", response)
      setQRCodes(response.data || [])
    } catch (error) {
      console.error("Failed to load QR codes:", error)
      setError("Failed to load QR codes. Please try again.")
      toast.error("Failed to load QR codes")
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const response = await getQRCodeStats()
      console.log("QR Code stats loaded:", response)
      setStats(response.data)
    } catch (error) {
      console.error("Failed to load QR code stats:", error)
    }
  }

  const handleGenerateQRCode = async (userId: number) => {
    try {
      await generateQRCode(userId)
      toast.success("QR Code generated successfully")
      loadQRCodes()
      loadStats()
    } catch (error) {
      console.error("Failed to generate QR code:", error)
      toast.error("Failed to generate QR code")
    }
  }

  const handleBulkGenerate = async (userIds: number[]) => {
    try {
      await bulkGenerateQRCodes(userIds)
      toast.success("QR Codes generated successfully")
      loadQRCodes()
      loadStats()
    } catch (error) {
      console.error("Failed to generate QR codes:", error)
      toast.error("Failed to generate QR codes")
    }
  }

  const filteredQRCodes = qrCodes.filter(
    (qrCode) =>
      qrCode.user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qrCode.user?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qrCode.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qrCode.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading QR Codes</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={loadQRCodes} className="bg-blue-800 hover:bg-blue-900">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">QR Code Management</h1>
          <p className="text-gray-600">Generate and manage QR codes for conference attendees</p>
        </div>
        <Button className="bg-blue-800 hover:bg-blue-900">
          <Plus className="mr-2 h-4 w-4" />
          Generate QR Codes
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total QR Codes</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.totalQRCodes || qrCodes.length}</p>
              </div>
              <QrCode className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Generated QR Codes</p>
                <p className="text-2xl font-bold text-green-600">{stats?.generatedQRCodes || qrCodes.filter(q => q.status === "active").length}</p>
              </div>
              <QrCode className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending QR Codes</p>
                <p className="text-2xl font-bold text-yellow-600">{stats?.pendingQRCodes || qrCodes.filter(q => q.status === "pending").length}</p>
              </div>
              <Eye className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Used QR Codes</p>
                <p className="text-2xl font-bold text-purple-600">{qrCodes.filter(q => q.status === "used").length}</p>
              </div>
              <Download className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* QR Codes Table */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>All QR Codes</CardTitle>
          <CardDescription>Manage and track QR codes for conference attendees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search */}
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search QR codes..."
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
                    <TableHead>User</TableHead>
                    <TableHead>QR Code ID</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Generated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQRCodes.map((qrCode) => (
                    <TableRow key={qrCode.qrId}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900">
                            {qrCode.user?.firstName} {qrCode.user?.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{qrCode.user?.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-mono text-sm">#{qrCode.qrId}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-mono text-sm max-w-xs truncate">
                          {qrCode.content}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            qrCode.status === "active"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : qrCode.status === "pending"
                                ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                : qrCode.status === "used"
                                  ? "bg-purple-100 text-purple-800 border-purple-200"
                                  : "bg-red-100 text-red-800 border-red-200"
                          }
                        >
                          {qrCode.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-500">
                          {new Date(qrCode.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                          {!qrCode.status || qrCode.status === "pending" && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleGenerateQRCode(qrCode.assignTo)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <QrCode className="h-4 w-4" />
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
