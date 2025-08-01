"use client"

import { useState, useEffect } from "react"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RegistrationsTable } from "@/components/dashboard/registrations-table"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { getDashboardStats } from "@/lib/mock-api/stats"
import { getRegistrations, verifyPayment, generateInvoice, generateQRCode } from "@/lib/mock-api/registrations"
import { getCompanies } from "@/lib/mock-api/companies"
import { Download, TrendingUp, Calendar } from "lucide-react"
import type { Registration } from "@/lib/mock-api/registrations"
import type { Company } from "@/lib/mock-api/companies"
import type { DashboardStats } from "@/lib/mock-api/stats"

export default function Page() {
  // Data states
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setDataLoading(true)
    try {
      const [statsData, registrationsData, companiesData] = await Promise.all([
        getDashboardStats(),
        getRegistrations(),
        getCompanies(),
      ])

      setStats(statsData)
      setRegistrations(registrationsData)
      setCompanies(companiesData)
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setDataLoading(false)
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

  return (
    <div className="p-4 lg:p-6 space-y-6 lg:space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Welcome back!</h1>
          <p className="text-gray-600 dark:text-gray-400">Here's what's happening with CSSL NITC 2025.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden sm:flex bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Live
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && <StatsCards stats={stats} />}

      {/* Quick Actions and Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">New registrations today</span>
              <Badge variant="secondary">+12</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Payments verified</span>
              <Badge variant="secondary">+8</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">QR codes generated</span>
              <Badge variant="secondary">+15</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-blue-800 dark:text-blue-400" />
              Conference Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Days remaining</span>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200">
                45 days
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Registration deadline</span>
              <Badge variant="outline">March 1, 2025</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Early bird ends</span>
              <Badge className="bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-200">
                Feb 15, 2025
              </Badge>
            </div>
          </CardContent>
        </Card>

        <QuickActions />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="registrations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="registrations">Registrations</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="registrations">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Recent Registrations</CardTitle>
              <CardDescription>Latest individual conference registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <RegistrationsTable
                registrations={registrations.slice(0, 5)}
                onVerifyPayment={handleVerifyPayment}
                onGenerateInvoice={handleGenerateInvoice}
                onGenerateQR={handleGenerateQR}
                loading={dataLoading}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Company Overview</CardTitle>
              <CardDescription>Recent company registrations and statistics</CardDescription>
            </CardHeader>
            <CardContent>
              {dataLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {companies.slice(0, 3).map((company) => (
                    <div
                      key={company.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{company.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{company.email}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{company.employeeCount} employees</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            LKR {company.totalAmount.toLocaleString()}
                          </p>
                        </div>
                        <Badge
                          className={
                            company.status === "active"
                              ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200"
                              : "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200"
                          }
                        >
                          {company.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Payment Overview</CardTitle>
              <CardDescription>Payment statistics and recent transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="border border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                      {stats?.pendingPayments || 0}
                    </div>
                    <p className="text-sm text-orange-700 dark:text-orange-300">Pending Payments</p>
                  </CardContent>
                </Card>
                <Card className="border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                      {stats?.verifiedToday || 0}
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">Verified Today</p>
                  </CardContent>
                </Card>
                <Card className="border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-2">
                      LKR {stats ? (stats.totalRevenue / 1000000).toFixed(1) : 0}M
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Total Revenue</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
              <CardDescription>Key metrics and performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg">Package Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {stats && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Day 1 Only</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-blue-800 dark:bg-blue-600 h-2 rounded-full"
                                style={{
                                  width: `${(stats.packageBreakdown.day1 / stats.totalRegistrations) * 100}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium">{stats.packageBreakdown.day1}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Day 1 + 2</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-green-600 dark:bg-green-500 h-2 rounded-full"
                                style={{
                                  width: `${(stats.packageBreakdown.day1_2 / stats.totalRegistrations) * 100}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium">{stats.packageBreakdown.day1_2}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">All 3 Days</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full"
                                style={{
                                  width: `${(stats.packageBreakdown.all3 / stats.totalRegistrations) * 100}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium">{stats.packageBreakdown.all3}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg">Registration Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <TrendingUp className="mx-auto h-8 w-8 text-gray-300 dark:text-gray-600 mb-2" />
                      <p className="text-sm">Registration trend chart would be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
