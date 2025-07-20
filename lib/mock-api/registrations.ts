// Mock registrations API
export interface Registration {
  id: string
  name: string
  email: string
  mobile: string
  nic: string
  address: string
  workplace: string
  designation?: string
  package: "day1" | "day1-2" | "all3"
  packageName: string
  originalPrice: number
  discountPercentage: number
  finalPrice: number
  isCSSLMember: boolean
  csslMembershipId?: string
  paymentStatus: "pending" | "verified" | "failed"
  emailVerified: boolean
  qrCodeGenerated: boolean
  invoiceGenerated: boolean
  createdAt: string
}

const mockRegistrations: Registration[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    mobile: "0771234567",
    nic: "123456789V",
    address: "123 Main Street, Colombo 03",
    workplace: "ABC Technologies",
    designation: "Software Engineer",
    package: "all3",
    packageName: "All 3 Days",
    originalPrice: 50000,
    discountPercentage: 20,
    finalPrice: 40000,
    isCSSLMember: true,
    csslMembershipId: "CSSL001",
    paymentStatus: "pending",
    emailVerified: true,
    qrCodeGenerated: false,
    invoiceGenerated: false,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    mobile: "0779876543",
    nic: "987654321V",
    address: "456 Oak Avenue, Kandy",
    workplace: "XYZ Corporation",
    designation: "Project Manager",
    package: "day1",
    packageName: "Day 1 - Inauguration",
    originalPrice: 20000,
    discountPercentage: 15,
    finalPrice: 17000,
    isCSSLMember: false,
    paymentStatus: "verified",
    emailVerified: true,
    qrCodeGenerated: true,
    invoiceGenerated: true,
    createdAt: "2024-01-14T14:20:00Z",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    mobile: "0765432109",
    nic: "456789123V",
    address: "789 Pine Road, Galle",
    workplace: "Digital Innovations",
    designation: "UI/UX Designer",
    package: "day1-2",
    packageName: "Day 1 + Day 2",
    originalPrice: 35000,
    discountPercentage: 15,
    finalPrice: 29750,
    isCSSLMember: false,
    paymentStatus: "verified",
    emailVerified: true,
    qrCodeGenerated: true,
    invoiceGenerated: true,
    createdAt: "2024-01-13T09:15:00Z",
  },
]

export const getRegistrations = async (): Promise<Registration[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return [...mockRegistrations]
}

export const verifyPayment = async (id: string): Promise<Registration> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const registration = mockRegistrations.find((r) => r.id === id)
  if (!registration) throw new Error("Registration not found")

  registration.paymentStatus = "verified"
  return registration
}

export const generateInvoice = async (id: string): Promise<Registration> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const registration = mockRegistrations.find((r) => r.id === id)
  if (!registration) throw new Error("Registration not found")

  registration.invoiceGenerated = true
  return registration
}

export const generateQRCode = async (id: string): Promise<Registration> => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const registration = mockRegistrations.find((r) => r.id === id)
  if (!registration) throw new Error("Registration not found")

  registration.qrCodeGenerated = true
  return registration
}

export const createRegistration = async (data: Omit<Registration, "id" | "createdAt">): Promise<Registration> => {
  await new Promise((resolve) => setTimeout(resolve, 1200))

  const newRegistration: Registration = {
    ...data,
    id: (mockRegistrations.length + 1).toString(),
    createdAt: new Date().toISOString(),
  }

  mockRegistrations.push(newRegistration)
  return newRegistration
}
