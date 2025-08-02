"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getPayments, verifyPayment, getPaymentStats } from "@/lib/api/payment-api"
import { Search, Eye, CheckCircle, XCircle, Download } from "lucide-react"
import { toast } from "sonner"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination"

interface Payment {
  id: number
  uuid: string
  requestId: string
  paymentStatus: string
  amount: number
  currency: string
  statusMessage?: string | null
  paidBy: number
  createdAt: string
  firstName: string
  lastName: string
  email: string
  paymentDate: string
}

interface PaymentResponse {
  totalNoOfRecords: number
  pageData: Payment[]
  totalNoOfPages: number
  currentPageNo: number
}

interface PaymentStats {
  totalPayments: number
  verifiedPayments: number
  pendingPayments: number
  totalRevenue: number
  revenueByMonth: Array<{
    month: string
    revenue: number
  }>
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [stats, setStats] = useState<PaymentStats | null>(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalRecords: 0
  })

  useEffect(() => {
    loadPayments()
    loadStats()
  }, [pagination.currentPage, searchTerm])

  const loadPayments = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await getPayments({
        search: searchTerm,
        page: pagination.currentPage,
        limit: pagination.pageSize
      })
  
      // Access the data property from the Axios response
      const paymentData: PaymentResponse = response.data
  
      setPayments(paymentData.pageData || [])
      setPagination(prev => ({
        ...prev,
        totalPages: paymentData.totalNoOfPages || 1,
        totalRecords: paymentData.totalNoOfRecords || 0
      }))
    } catch (error) {
      console.error("Failed to load payments:", error)
      setError("Failed to load payments. Please try again.")
      toast.error("Failed to load payments")
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const response = await getPaymentStats()
      setStats(response.data)
    } catch (error) {
      console.error("Failed to load payment stats:", error)
      setStats({
        totalPayments: 0,
        verifiedPayments: 0,
        pendingPayments: 0,
        totalRevenue: 0,
        revenueByMonth: []
      })
    }
  }

  const handleVerifyPayment = async (paymentId: number) => {
    try {
      await verifyPayment(paymentId)
      toast.success("Payment verified successfully")
      loadPayments()
      loadStats()
    } catch (error) {
      console.error("Failed to verify payment:", error)
      toast.error("Failed to verify payment")
    }
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return
    setPagination(prev => ({ ...prev, currentPage: newPage }))
  }

  const filteredPayments = payments.filter(
    (payment) =>
      payment.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.uuid.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return { className: "bg-green-100 text-green-800 border-green-200", label: "Completed" }
      case "pending":
        return { className: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "Pending" }
      default:
        return { className: "bg-gray-100 text-gray-800 border-gray-200", label: status }
    }
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Payments</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={loadPayments} className="bg-blue-800 hover:bg-blue-900">
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
          <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-600">
            Showing {(pagination.currentPage - 1) * pagination.pageSize + 1}-
            {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalRecords)} of {pagination.totalRecords} payments
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Payments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.totalPayments || 0}
                </p>
              </div>
              <Download className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verified Payments</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats?.verifiedPayments || payments.filter(p => p.paymentStatus === "COMPLETED").length}
                </p>
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
                <p className="text-2xl font-bold text-yellow-600">
                  {stats?.pendingPayments || payments.filter(p => p.paymentStatus === "pending").length}
                </p>
              </div>
              <Eye className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">
                  LKR {(stats?.totalRevenue || payments.reduce((sum, p) => sum + p.amount, 0)).toLocaleString()}
                </p>
              </div>
              <Download className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>All Payments</CardTitle>
              <CardDescription>Manage and verify conference payments</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setPagination(prev => ({ ...prev, currentPage: 1 }))
                }}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.length > 0 ? (
                      filteredPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-gray-900">
                                {payment.firstName} {payment.lastName}
                              </div>
                              <div className="text-sm text-gray-500">{payment.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-mono text-sm">{payment.uuid}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">
                              {payment.currency} {payment.amount.toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadgeVariant(payment.paymentStatus).className}>
                              {getStatusBadgeVariant(payment.paymentStatus).label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-500">
                              {new Date(payment.paymentDate).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button size="sm" variant="outline">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>View details</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              {payment.paymentStatus === "pending" && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        onClick={() => handleVerifyPayment(payment.id)}
                                        className="text-green-600 hover:text-green-700"
                                      >
                                        <CheckCircle className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Verify payment</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          {searchTerm ? (
                            <div className="flex flex-col items-center justify-center space-y-2">
                              <Search className="h-8 w-8 text-gray-400" />
                              <p>No payments found matching your search</p>
                              <Button 
                                variant="ghost" 
                                onClick={() => setSearchTerm("")}
                                className="text-blue-600"
                              >
                                Clear search
                              </Button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center space-y-2">
                              <XCircle className="h-8 w-8 text-gray-400" />
                              <p>No payments available</p>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                {filteredPayments.length > 0 && (
                  <div className="flex justify-end">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <Button
                            variant="ghost"
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage === 1}
                          >
                            Previous
                          </Button>
                        </PaginationItem>
                        <PaginationItem>
                          <div className="px-4 py-2 text-sm text-gray-600">
                            Page {pagination.currentPage} of {pagination.totalPages}
                          </div>
                        </PaginationItem>
                        <PaginationItem>
                          <Button
                            variant="ghost"
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage === pagination.totalPages}
                          >
                            Next
                          </Button>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}