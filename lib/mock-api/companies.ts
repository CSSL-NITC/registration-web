export interface Company {
  id: string
  name: string
  email: string
  contactPerson: string
  phone: string
  address: string
  status: "active" | "pending" | "inactive"
  employeeCount: number
  totalAmount: number
  createdAt: string
  updatedAt: string
}

export interface CompanyEmployee {
  id: string
  companyId: string
  name: string
  email: string
  mobile: string
  nic: string
  address: string
  designation: string
  package: "day1" | "day1-2" | "day2-3" | "all3"
  packageName: string
  amount: number
  status: "registered" | "pending" | "cancelled"
  qrCodeGenerated: boolean
  createdAt: string
  updatedAt: string
}

// Mock data
const mockCompanies: Company[] = [
  {
    id: "1",
    name: "Tech Solutions Ltd",
    email: "admin@techsolutions.lk",
    contactPerson: "John Silva",
    phone: "0112345678",
    address: "123 Galle Road, Colombo 03",
    status: "active",
    employeeCount: 15,
    totalAmount: 525000,
    createdAt: "2024-12-01T10:00:00Z",
    updatedAt: "2024-12-15T14:30:00Z",
  },
  {
    id: "2",
    name: "Digital Innovations Pvt Ltd",
    email: "hr@digitalinnovations.lk",
    contactPerson: "Sarah Fernando",
    phone: "0117654321",
    address: "456 Union Place, Colombo 02",
    status: "active",
    employeeCount: 8,
    totalAmount: 280000,
    createdAt: "2024-12-05T09:15:00Z",
    updatedAt: "2024-12-10T16:45:00Z",
  },
  {
    id: "3",
    name: "Future Systems",
    email: "contact@futuresystems.lk",
    contactPerson: "Michael Perera",
    phone: "0119876543",
    address: "789 Duplication Road, Colombo 04",
    status: "pending",
    employeeCount: 12,
    totalAmount: 420000,
    createdAt: "2024-12-08T11:30:00Z",
    updatedAt: "2024-12-12T13:20:00Z",
  },
]

const mockEmployees: CompanyEmployee[] = [
  {
    id: "1",
    companyId: "1",
    name: "Alice Johnson",
    email: "alice@techsolutions.lk",
    mobile: "0771234567",
    nic: "123456789V",
    address: "123 Main Street, Colombo",
    designation: "Software Engineer",
    package: "all3",
    packageName: "Full Conference with Inauguration (All 3 Days)",
    amount: 50000,
    status: "registered",
    qrCodeGenerated: true,
    createdAt: "2024-12-01T10:00:00Z",
    updatedAt: "2024-12-15T14:30:00Z",
  },
  {
    id: "2",
    companyId: "1",
    name: "Bob Smith",
    email: "bob@techsolutions.lk",
    mobile: "0779876543",
    nic: "987654321V",
    address: "456 Second Street, Colombo",
    designation: "Project Manager",
    package: "day1-2",
    packageName: "NITC Conference Day 01 (Day 02)",
    amount: 35000,
    status: "registered",
    qrCodeGenerated: false,
    createdAt: "2024-12-02T11:00:00Z",
    updatedAt: "2024-12-14T15:30:00Z",
  },
  {
    id: "3",
    companyId: "1",
    name: "Carol Davis",
    email: "carol@techsolutions.lk",
    mobile: "0765432109",
    nic: "456789123V",
    address: "789 Third Avenue, Colombo",
    designation: "UI/UX Designer",
    package: "day1",
    packageName: "Day 1 - Inauguration",
    amount: 20000,
    status: "registered",
    qrCodeGenerated: true,
    createdAt: "2024-12-03T12:00:00Z",
    updatedAt: "2024-12-13T16:30:00Z",
  },
]

// API functions
export const getCompanies = async (): Promise<Company[]> => {
  console.log("getCompanies called")
  try {
    await new Promise((resolve) => setTimeout(resolve, 800))
    console.log("getCompanies returning:", mockCompanies)
    return [...mockCompanies]
  } catch (error) {
    console.error("getCompanies error:", error)
    throw error
  }
}

export const getCompanyById = async (id: string): Promise<Company | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockCompanies.find((company) => company.id === id) || null
}

export const createCompany = async (companyData: Omit<Company, "id" | "createdAt" | "updatedAt">): Promise<Company> => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const newCompany: Company = {
    ...companyData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  mockCompanies.push(newCompany)
  return newCompany
}

export const updateCompany = async (id: string, updates: Partial<Company>): Promise<Company> => {
  await new Promise((resolve) => setTimeout(resolve, 600))
  const index = mockCompanies.findIndex((company) => company.id === id)
  if (index === -1) throw new Error("Company not found")

  mockCompanies[index] = {
    ...mockCompanies[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  return mockCompanies[index]
}

export const deleteCompany = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 400))
  const index = mockCompanies.findIndex((company) => company.id === id)
  if (index === -1) throw new Error("Company not found")
  mockCompanies.splice(index, 1)
}

export const getCompanyEmployees = async (companyId: string): Promise<CompanyEmployee[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return mockEmployees.filter((employee) => employee.companyId === companyId)
}

export const addCompanyEmployee = async (
  employeeData: Omit<CompanyEmployee, "id" | "createdAt" | "updatedAt">,
): Promise<CompanyEmployee> => {
  await new Promise((resolve) => setTimeout(resolve, 600))
  const newEmployee: CompanyEmployee = {
    ...employeeData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  mockEmployees.push(newEmployee)
  return newEmployee
}

export const updateCompanyEmployee = async (
  id: string,
  updates: Partial<CompanyEmployee>,
): Promise<CompanyEmployee> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const index = mockEmployees.findIndex((employee) => employee.id === id)
  if (index === -1) throw new Error("Employee not found")

  mockEmployees[index] = {
    ...mockEmployees[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  return mockEmployees[index]
}

export const deleteCompanyEmployee = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const index = mockEmployees.findIndex((employee) => employee.id === id)
  if (index === -1) throw new Error("Employee not found")
  mockEmployees.splice(index, 1)
}
