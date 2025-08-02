"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  getDashboardStats, 
  getRegistrationReport, 
  getFinancialReport, 
  getCompanyReport,
  getPaymentReport,
  getQRCodeReport,
  getUserReport,
  getAttendanceReport,
  exportReport
} from "@/lib/api/reports-api"
import { Search, Download, FileText, TrendingUp, Users, Building2, CreditCard, QrCode } from "lucide-react"
import { toast } from "sonner"

export default function ReportsPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<any>(null)
  const [selectedReport, setSelectedReport] = useState<string | null>(null)

  useEffect(() => {
    loadDashboardStats()
  }, [])

  const loadDashboardStats = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await getDashboardStats()
      console.log("Dashboard stats loaded:", response)
      setStats(response.data)
    } catch (error) {
      console.error("Failed to load dashboard stats:", error)
      setError("Failed to load dashboard stats. Please try again.")
      toast.error("Failed to load dashboard stats")
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateReport = async (reportType: string, format: 'pdf' | 'excel' | 'csv' = 'pdf') => {
    try {
      setSelectedReport(reportType)
      const response = await exportReport(reportType, { format })
      console.log(`${reportType} report generated:`, response)
      toast.success(`${reportType} report generated successfully`)
      
      // Handle file download if response contains file data
      if (response.data?.file) {
        const link = document.createElement('a')
        link.href = response.data.file
        link.download = `${reportType}-report.${format}`
        link.click()
      }
    } catch (error) {
      console.error(`Failed to generate ${reportType} report:`, error)
      toast.error(`Failed to generate ${reportType} report`)
    } finally {
      setSelectedReport(null)
    }
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Reports</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={loadDashboardStats} className="bg-blue-800 hover:bg-blue-900">
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
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate comprehensive reports and analytics</p>
        </div>
      </div>

      {/* Dashboard Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Registrations</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalRegistrations || 0}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Companies</p>
                  <p className="text-2xl font-bold text-green-600">{stats.totalCompanies || 0}</p>
                </div>
                <Building2 className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-purple-600">LKR {(stats.totalRevenue || 0).toLocaleString()}</p>
                </div>
                <CreditCard className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">QR Codes Generated</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.qrCodesGenerated || 0}</p>
                </div>
                <QrCode className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Report Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registration Report */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-blue-600" />
              Registration Report
            </CardTitle>
            <CardDescription>Detailed registration statistics and participant information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Generate comprehensive reports on conference registrations, including participant details, 
                package selections, and registration trends.
              </p>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  onClick={() => handleGenerateReport('registrations', 'pdf')}
                  disabled={selectedReport === 'registrations'}
                  className="bg-blue-800 hover:bg-blue-900"
                >
                  {selectedReport === 'registrations' ? 'Generating...' : 'PDF'}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleGenerateReport('registrations', 'excel')}
                  disabled={selectedReport === 'registrations'}
                >
                  Excel
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleGenerateReport('registrations', 'csv')}
                  disabled={selectedReport === 'registrations'}
                >
                  CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Report */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-green-600" />
              Financial Report
            </CardTitle>
            <CardDescription>Payment transactions and revenue analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Comprehensive financial reports including payment status, revenue breakdown, 
                and transaction details.
              </p>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  onClick={() => handleGenerateReport('financial', 'pdf')}
                  disabled={selectedReport === 'financial'}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {selectedReport === 'financial' ? 'Generating...' : 'PDF'}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleGenerateReport('financial', 'excel')}
                  disabled={selectedReport === 'financial'}
                >
                  Excel
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleGenerateReport('financial', 'csv')}
                  disabled={selectedReport === 'financial'}
                >
                  CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Report */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="mr-2 h-5 w-5 text-purple-600" />
              Company Report
            </CardTitle>
            <CardDescription>Company registrations and employee statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Reports on company registrations, employee counts, and bulk registration statistics.
              </p>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  onClick={() => handleGenerateReport('companies', 'pdf')}
                  disabled={selectedReport === 'companies'}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {selectedReport === 'companies' ? 'Generating...' : 'PDF'}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleGenerateReport('companies', 'excel')}
                  disabled={selectedReport === 'companies'}
                >
                  Excel
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleGenerateReport('companies', 'csv')}
                  disabled={selectedReport === 'companies'}
                >
                  CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* QR Code Report */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <QrCode className="mr-2 h-5 w-5 text-orange-600" />
              QR Code Report
            </CardTitle>
            <CardDescription>QR code generation and usage statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Reports on QR code generation, usage patterns, and attendance tracking.
              </p>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  onClick={() => handleGenerateReport('qr-codes', 'pdf')}
                  disabled={selectedReport === 'qr-codes'}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {selectedReport === 'qr-codes' ? 'Generating...' : 'PDF'}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleGenerateReport('qr-codes', 'excel')}
                  disabled={selectedReport === 'qr-codes'}
                >
                  Excel
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleGenerateReport('qr-codes', 'csv')}
                  disabled={selectedReport === 'qr-codes'}
                >
                  CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Report */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-red-600" />
              Payment Report
            </CardTitle>
            <CardDescription>Payment verification and transaction details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Detailed payment reports including verification status, transaction details, and payment methods.
              </p>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  onClick={() => handleGenerateReport('payments', 'pdf')}
                  disabled={selectedReport === 'payments'}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {selectedReport === 'payments' ? 'Generating...' : 'PDF'}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleGenerateReport('payments', 'excel')}
                  disabled={selectedReport === 'payments'}
                >
                  Excel
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleGenerateReport('payments', 'csv')}
                  disabled={selectedReport === 'payments'}
                >
                  CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Report */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-indigo-600" />
              Attendance Report
            </CardTitle>
            <CardDescription>Conference attendance and participation statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Attendance tracking reports including session participation, entry/exit times, and attendance rates.
              </p>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  onClick={() => handleGenerateReport('attendance', 'pdf')}
                  disabled={selectedReport === 'attendance'}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  {selectedReport === 'attendance' ? 'Generating...' : 'PDF'}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleGenerateReport('attendance', 'excel')}
                  disabled={selectedReport === 'attendance'}
                >
                  Excel
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleGenerateReport('attendance', 'csv')}
                  disabled={selectedReport === 'attendance'}
                >
                  CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
