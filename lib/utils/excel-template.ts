export const EXCEL_TEMPLATE_COLUMNS = [
  { key: "name", label: "Full Name" },
  { key: "email", label: "Email Address" },
  { key: "mobile", label: "Mobile Number" },
  { key: "nic", label: "NIC Number" },
  { key: "address", label: "Address" },
  { key: "designation", label: "Designation" },
  { key: "package", label: "Package (Day1/Day1-2/All3)" },
]

export const generateExcelTemplate = () => {
  // Create CSV content for Excel template
  const headers = EXCEL_TEMPLATE_COLUMNS.map((col) => col.label)
  const sampleRow1 = [
    "John Doe",
    "john.doe@company.com",
    "0771234567",
    "123456789V",
    "123 Main Street, Colombo 03",
    "Software Engineer",
    "All3",
  ]
  const sampleRow2 = [
    "Jane Smith",
    "jane.smith@company.com",
    "0777654321",
    "987654321V",
    "456 Galle Road, Colombo 04",
    "Project Manager",
    "Day1-2",
  ]

  const csvContent = [
    headers.join(","),
    sampleRow1.map((cell) => `"${cell}"`).join(","),
    sampleRow2.map((cell) => `"${cell}"`).join(","),
  ].join("\n")

  return csvContent
}

export const downloadExcelTemplate = () => {
  const headers = ["Name", "Email", "Mobile", "NIC", "Address", "Designation", "Package"]
  const sampleData = [
    ["John Doe", "john@company.com", "0771234567", "123456789V", "123 Main St, Colombo", "Software Engineer", "All3"],
    [
      "Jane Smith",
      "jane@company.com",
      "0779876543",
      "987654321V",
      "456 Second St, Colombo",
      "Project Manager",
      "Day1-2",
    ],
  ]

  const csvContent = [headers.join(","), ...sampleData.map((row) => row.join(","))].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)

  link.setAttribute("href", url)
  link.setAttribute("download", "employee_template.csv")
  link.style.visibility = "hidden"

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const validateExcelRow = (row: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  if (!row.name?.trim()) errors.push("Name is required")
  if (!row.email?.trim()) errors.push("Email is required")
  if (!row.mobile?.trim()) errors.push("Mobile is required")
  if (!row.nic?.trim()) errors.push("NIC is required")
  if (!row.address?.trim()) errors.push("Address is required")
  if (!row.package?.trim()) errors.push("Package is required")

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (row.email && !emailRegex.test(row.email)) {
    errors.push("Invalid email format")
  }

  // Mobile validation
  if (row.mobile && !/^07[0-9]{8}$/.test(row.mobile)) {
    errors.push("Invalid mobile format (should be 10 digits starting with 07)")
  }

  // Package validation
  const validPackages = ["Day1", "Day1-2", "All3"]
  if (row.package && !validPackages.includes(row.package)) {
    errors.push("Invalid package (must be Day1, Day1-2, or All3)")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
