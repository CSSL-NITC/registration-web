"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building2, CreditCard, QrCode, TrendingUp, TrendingDown } from "lucide-react"

interface StatsCardsProps {
  stats: {
    totalRegistrations: number
    totalCompanies: number
    totalRevenue: number
    qrCodesGenerated: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Registrations",
      value: stats.totalRegistrations.toLocaleString(),
      change: "+12%",
      changeType: "increase" as const,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Companies",
      value: stats.totalCompanies.toLocaleString(),
      change: "+3",
      changeType: "increase" as const,
      icon: Building2,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Revenue",
      value: `LKR ${(stats.totalRevenue / 1000000).toFixed(1)}M`,
      change: "+18%",
      changeType: "increase" as const,
      icon: CreditCard,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "QR Codes Generated",
      value: stats.qrCodesGenerated.toLocaleString(),
      change: "76%",
      changeType: "neutral" as const,
      icon: QrCode,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{card.title}</CardTitle>
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-1">{card.value}</div>
            <div className="flex items-center text-xs">
              {card.changeType === "increase" && <TrendingUp className="h-3 w-3 text-green-500 mr-1" />}
              {card.changeType === "decrease" && <TrendingDown className="h-3 w-3 text-red-500 mr-1" />}
              <span
                className={
                  card.changeType === "increase"
                    ? "text-green-600"
                    : card.changeType === "decrease"
                      ? "text-red-600"
                      : "text-gray-500"
                }
              >
                {card.change}
              </span>
              <span className="text-gray-500 ml-1">
                {card.changeType !== "neutral" ? "from last week" : "of registrations"}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
