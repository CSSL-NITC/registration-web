"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getDashboardStats } from "@/lib/mock-api/stats"
import { getRegistrations } from "@/lib/mock-api/registrations"
import { getCompanies } from "@/lib/mock-api/companies"
import { FileText, Download, TrendingUp, Users, Building2, CreditCard } from "lucide-react"
import type { DashboardStats } from "@/lib/mock-api/stats"
import type { Registration } from "@/lib/mock-api/registrations"
import type { Company } from "@/lib/mock-api/companies"

export default function ReportsPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadReportData()
  }, [])

  const loadReportData = async () => {
    setLoading(true)
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
      console.error("Failed to load report data:", error)
    } finally {
      setLoading(false)
    }
  }

  const reportTypes = [
    {
      title: "Registration Summary Report",
      description: "Complete overview of all registrations with payment status",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Financial Report",
      description: "Revenue breakdown by packages and payment methods",
      icon: CreditCard,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Company Registration Report",
      description: "Corporate registrations and bulk booking analysis",
      icon: Building2,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Package Analysis Report",
      description: "Popular packages and attendance patterns",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate comprehensive reports and analyze conference data</p>
        </div>
        <Button className="bg-blue-800 hover:bg-blue-900">
          <Download className="mr-2 h-4 w-4" />
          Export All Reports
        </Button>
      </div>

      {/* Quick Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Registrations</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalRegistrations}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">LKR {(stats.totalRevenue / 1000000).toFixed(1)}M</p>
                </div>
                <CreditCard className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Companies</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.totalCompanies}</p>
                </div>
                <Building2 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">QR Codes</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.qrCodesGenerated}</p>
                </div>
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Report Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reportTypes.map((report, index) => (
          <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${report.bgColor}`}>
                  <report.icon className={`h-6 w-6 ${report.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{report.description}</p>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-blue-800 hover:bg-blue-900">
                      <FileText className="mr-2 h-4 w-4" />
                      Generate
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Package Distribution */}
      {stats && (
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Package Distribution Analysis</CardTitle>
            <CardDescription>Breakdown of registrations by conference packages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stats.packageBreakdown.day1}</div>
                <p className="text-gray-600">Day 1 - Inauguration</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(stats.packageBreakdown.day1 / stats.totalRegistrations) * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{stats.packageBreakdown.day1_2}</div>
                <p className="text-gray-600">Day 1 + Day 2</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(stats.packageBreakdown.day1_2 / stats.totalRegistrations) * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{stats.packageBreakdown.all3}</div>
                <p className="text-gray-600">All 3 Days</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${(stats.packageBreakdown.all3 / stats.totalRegistrations) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Recent Report Activity</CardTitle>
          <CardDescription>Latest generated reports and downloads</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Registration Summary Report", date: "2025-01-15", status: "Generated", user: "Admin User" },
              { name: "Financial Report", date: "2025-01-14", status: "Downloaded", user: "Finance Team" },
              { name: "Company Registration Report", date: "2025-01-13", status: "Generated", user: "Admin User" },
              { name: "Package Analysis Report", date: "2025-01-12", status: "Downloaded", user: "Marketing Team" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{activity.name}</p>
                    <p className="text-sm text-gray-500">by {activity.user}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">{activity.status}</Badge>
                  <span className="text-sm text-gray-500">{activity.date}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
