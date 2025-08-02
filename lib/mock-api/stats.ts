// Mock statistics API
export interface DashboardStats {
  totalRegistrations: number
  totalCompanies: number
  totalRevenue: number
  qrCodesGenerated: number
  pendingPayments: number
  verifiedToday: number
  packageBreakdown: {
    day1: number
    day1_2: number
    all3: number
  }
  revenueByMonth: Array<{
    month: string
    revenue: number
  }>
  registrationsByDay: Array<{
    date: string
    count: number
  }>
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  console.log("getDashboardStats called")
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const stats = {
      totalRegistrations: 247,
      totalCompanies: 23,
      totalRevenue: 9200000,
      qrCodesGenerated: 189,
      pendingPayments: 47,
      verifiedToday: 23,
      packageBreakdown: {
        day1: 89,
        day1_2: 67,
        all3: 91,
      },
      revenueByMonth: [
        { month: "Oct", revenue: 2100000 },
        { month: "Nov", revenue: 3200000 },
        { month: "Dec", revenue: 2800000 },
        { month: "Jan", revenue: 1100000 },
      ],
      registrationsByDay: [
        { date: "2024-01-10", count: 12 },
        { date: "2024-01-11", count: 18 },
        { date: "2024-01-12", count: 25 },
        { date: "2024-01-13", count: 31 },
        { date: "2024-01-14", count: 28 },
        { date: "2024-01-15", count: 35 },
        { date: "2024-01-16", count: 42 },
      ],
    }
    console.log("getDashboardStats returning:", stats)
    return stats
  } catch (error) {
    console.error("getDashboardStats error:", error)
    throw error
  }
}
