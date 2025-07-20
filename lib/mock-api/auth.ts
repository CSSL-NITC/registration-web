// Mock authentication API
export interface LoginCredentials {
  email: string
  password: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "company"
  company?: string
}

// Mock login credentials
export const MOCK_CREDENTIALS = {
  admin: {
    email: "admin@nitconf.lk",
    password: "admin123",
    user: {
      id: "1",
      name: "Admin User",
      email: "admin@nitconf.lk",
      role: "admin" as const,
    },
  },
  company: {
    email: "admin@techsolutions.com",
    password: "company123",
    user: {
      id: "2",
      name: "Tech Solutions Admin",
      email: "admin@techsolutions.com",
      role: "company" as const,
      company: "Tech Solutions Ltd",
    },
  },
}

export const mockLogin = async (credentials: LoginCredentials): Promise<User> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check admin credentials
  if (credentials.email === MOCK_CREDENTIALS.admin.email && credentials.password === MOCK_CREDENTIALS.admin.password) {
    return MOCK_CREDENTIALS.admin.user
  }

  // Check company credentials
  if (
    credentials.email === MOCK_CREDENTIALS.company.email &&
    credentials.password === MOCK_CREDENTIALS.company.password
  ) {
    return MOCK_CREDENTIALS.company.user
  }

  throw new Error("Invalid credentials")
}

export const mockLogout = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
}
