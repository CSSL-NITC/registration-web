"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination } from "@/components/ui/pagination"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { CheckCircle, FileText, QrCode, Search, Filter, Users } from "lucide-react"
import { ADMIN_CONSTANTS, ADMIN_TOOLTIPS } from "@/lib/constants/admin-constants"
import type { Registration } from "@/lib/mock-api/registrations"
import { toast } from "sonner"

interface RegistrationsTableProps {
  registrations: Registration[]
  onVerifyPayment: (id: string) => void
  onGenerateInvoice: (id: string) => void
  onGenerateQR: (id: string) => void
  loading?: boolean
}

export function RegistrationsTable({
  registrations,
  onVerifyPayment,
  onGenerateInvoice,
  onGenerateQR,
  loading = false,
}: RegistrationsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredRegistrations = registrations.filter((registration) => {
    const matchesSearch =
      registration.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || registration.paymentStatus === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredRegistrations.length / ADMIN_CONSTANTS.ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ADMIN_CONSTANTS.ITEMS_PER_PAGE
  const paginatedRegistrations = filteredRegistrations.slice(startIndex, startIndex + ADMIN_CONSTANTS.ITEMS_PER_PAGE)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  const handleVerifyPayment = async (id: string) => {
    try {
      await onVerifyPayment(id)
      toast.success("Payment verified successfully!")
    } catch (error) {
      toast.error("Failed to verify payment")
    }
  }

  const handleGenerateInvoice = async (id: string) => {
    try {
      await onGenerateInvoice(id)
      toast.success("Invoice generated successfully!")
    } catch (error) {
      toast.error("Failed to generate invoice")
    }
  }

  const handleGenerateQR = async (id: string) => {
    try {
      await onGenerateQR(id)
      toast.success("QR code generated successfully!")
    } catch (error) {
      toast.error("Failed to generate QR code")
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-10 bg-gray-200 rounded w-64 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search registrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50 dark:bg-gray-800">
                <TableRow>
                  <TableHead className="font-semibold">Participant</TableHead>
                  <TableHead className="font-semibold">Package</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">CSSL</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRegistrations.map((registration) => (
                  <TableRow key={registration.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{registration.firstName + " " + registration.lastName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{registration.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{registration.packageName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{registration.workplace}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">LKR {registration.finalPrice.toLocaleString()}</div>
                        {registration.discountPercentage > 0 && (
                          <div className="text-sm text-green-600 dark:text-green-400">
                            {registration.discountPercentage}% discount
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {registration.isCSSLMember ? (
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200"
                        >
                          {registration.csslMembershipId}
                        </Badge>
                      ) : (
                        <Badge variant="outline">No</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(registration.paymentStatus)}>{registration.paymentStatus}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {registration.paymentStatus === "pending" && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                onClick={() => handleVerifyPayment(registration.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{ADMIN_TOOLTIPS.VERIFY_PAYMENT}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleGenerateInvoice(registration.id)}
                              disabled={!registration.invoiceGenerated && registration.paymentStatus !== "verified"}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{ADMIN_TOOLTIPS.GENERATE_INVOICE}</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleGenerateQR(registration.id)}
                              disabled={registration.paymentStatus !== "verified"}
                            >
                              <QrCode className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{ADMIN_TOOLTIPS.GENERATE_QR}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}

        {filteredRegistrations.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Users className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p>No registrations found matching your criteria.</p>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
