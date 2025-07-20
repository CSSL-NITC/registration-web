// Mock invoices API
export interface Invoice {
  id: string
  companyId: string
  companyName: string
  invoiceNumber: string
  date: string
  dueDate: string
  totalAmount: number
  employeeCount: number
  status: "paid" | "pending" | "overdue"
  items: Array<{
    description: string
    quantity: number
    unitPrice: number
    total: number
  }>
}

const mockInvoices: Invoice[] = [
  {
    id: "1",
    companyId: "1",
    companyName: "Tech Solutions Ltd",
    invoiceNumber: "INV-2025-001",
    date: "2025-01-15",
    dueDate: "2025-01-30",
    totalAmount: 600000,
    employeeCount: 15,
    status: "pending",
    items: [
      { description: "Day 1 - Inauguration (5 employees)", quantity: 5, unitPrice: 20000, total: 100000 },
      { description: "Day 1 + Day 2 (4 employees)", quantity: 4, unitPrice: 35000, total: 140000 },
      { description: "All 3 Days (6 employees)", quantity: 6, unitPrice: 50000, total: 300000 },
      { description: "Corporate Package Discount", quantity: 1, unitPrice: -60000, total: -60000 },
    ],
  },
  {
    id: "2",
    companyId: "1",
    companyName: "Tech Solutions Ltd",
    invoiceNumber: "INV-2024-089",
    date: "2024-12-20",
    dueDate: "2025-01-05",
    totalAmount: 450000,
    employeeCount: 12,
    status: "paid",
    items: [{ description: "Previous Conference Registration", quantity: 12, unitPrice: 37500, total: 450000 }],
  },
]

export const generateInvoice = async (companyId: string): Promise<Invoice> => {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const newInvoice: Invoice = {
    id: (mockInvoices.length + 1).toString(),
    companyId,
    companyName: "Tech Solutions Ltd",
    invoiceNumber: `INV-2025-${String(mockInvoices.length + 1).padStart(3, "0")}`,
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    totalAmount: 600000,
    employeeCount: 15,
    status: "pending",
    items: [
      { description: "Day 1 - Inauguration (5 employees)", quantity: 5, unitPrice: 20000, total: 100000 },
      { description: "Day 1 + Day 2 (4 employees)", quantity: 4, unitPrice: 35000, total: 140000 },
      { description: "All 3 Days (6 employees)", quantity: 6, unitPrice: 50000, total: 300000 },
      { description: "Corporate Package Discount", quantity: 1, unitPrice: -60000, total: -60000 },
    ],
  }

  mockInvoices.push(newInvoice)
  return newInvoice
}

export const getCompanyInvoices = async (companyId: string): Promise<Invoice[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return mockInvoices.filter((invoice) => invoice.companyId === companyId)
}
