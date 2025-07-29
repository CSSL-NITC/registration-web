// Mock registrations API
export interface Registration {
  id: string
  firstName: string
  lastName: string
  email: string
  mobile: string
  nic: string
  address: string
  workplace: string
  designation?: string
  package: "day1" | "day1-2" | "day2-3" | "all3" | "company"
  packageName: string
  originalPrice: number
  discountPercentage: number
  finalPrice: number
  isCSSLMember: boolean
  csslMembershipId?: string
  isEarlyBird: boolean
  isBCSMember?: boolean
  isISACAMember?: boolean
  isIESLMember?: boolean
  isFITISMember?: boolean
  isSLASSCOMMember?: boolean
  isIEEEMember?: boolean
  memberId?: string
  paymentStatus: "pending" | "verified" | "failed"
  emailVerified: boolean
  qrCodeGenerated: boolean
  invoiceGenerated: boolean
  createdAt: string
}

// Mock member validation API
export const validateMember = async (memberId: string, memberType: string): Promise<{ valid: boolean; name?: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  
  // Mock validation - in real implementation, this would call the respective organization's API
  const mockValidMembers = {
    CSSL: ["CSSL001", "CSSL002", "CSSL003"],
    BCS: ["BCS001", "BCS002"],
    ISACA: ["ISACA001", "ISACA002"],
    IESL: ["IESL001", "IESL002"],
    FITIS: ["FITIS001", "FITIS002"],
    SLASSCOM: ["SLASSCOM001", "SLASSCOM002"],
    IEEE: ["IEEE001", "IEEE002"]
  }
  
  const valid = mockValidMembers[memberType as keyof typeof mockValidMembers]?.includes(memberId) || false
  
  return {
    valid,
    name: valid ? `Valid ${memberType} Member` : undefined
  }
}

// Mock email verification API
export const sendVerificationEmail = async (email: string): Promise<{ success: boolean; code: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  
  // Generate a random 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString()
  
  // In real implementation, this would send an actual email
  console.log(`Verification code for ${email}: ${code}`)
  
  return {
    success: true,
    code
  }
}

const mockRegistrations: Registration[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    mobile: "0771234567",
    nic: "123456789V",
    address: "123 Main Street, Colombo 03",
    workplace: "ABC Technologies",
    designation: "Software Engineer",
    package: "all3",
    packageName: "Full Conference with Inauguration (All 3 Days)",
    originalPrice: 50000,
    discountPercentage: 20,
    finalPrice: 40000,
    isCSSLMember: true,
    csslMembershipId: "CSSL001",
    isEarlyBird: false,
    paymentStatus: "pending",
    emailVerified: true,
    qrCodeGenerated: false,
    invoiceGenerated: false,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    mobile: "0779876543",
    nic: "987654321V",
    address: "456 Oak Avenue, Kandy",
    workplace: "XYZ Corporation",
    designation: "Project Manager",
    package: "day1",
    packageName: "Day 1 - Inauguration",
    originalPrice: 20000,
    discountPercentage: 10,
    finalPrice: 18000,
    isCSSLMember: false,
    isEarlyBird: true,
    paymentStatus: "verified",
    emailVerified: true,
    qrCodeGenerated: true,
    invoiceGenerated: true,
    createdAt: "2024-01-14T14:20:00Z",
  },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike@example.com",
    mobile: "0765432109",
    nic: "456789123V",
    address: "789 Pine Road, Galle",
    workplace: "Digital Innovations",
    designation: "UI/UX Designer",
    package: "day1-2",
    packageName: "NITC Conference Day 01 (Day 02)",
    originalPrice: 35000,
    discountPercentage: 10,
    finalPrice: 31500,
    isCSSLMember: false,
    isEarlyBird: true,
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
