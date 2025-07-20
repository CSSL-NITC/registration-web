"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Building2,
  Users,
  Plus,
  Upload,
  Download,
  FileText,
  Mail,
  ArrowLeft,
  Activity,
  Edit,
  Trash2,
  Eye,
  Search,
} from "lucide-react"
import Link from "next/link"
import {
  getCompanyEmployees,
  addCompanyEmployee,
  updateCompanyEmployee,
  deleteCompanyEmployee,
} from "@/lib/mock-api/companies"
import { generateInvoice, getCompanyInvoices } from "@/lib/mock-api/invoices"
import { InvoicePDFDownload } from "@/components/invoice-pdf"
import { downloadExcelTemplate } from "@/lib/utils/excel-template"
import type { CompanyEmployee } from "@/lib/mock-api/companies"
import { useAppDispatch, useAppSelector } from "@/lib/store"
import {
  setEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  setSearchTerm,
  setStatusFilter,
  setPackageFilter,
  setLoading as setEmployeeLoading,
} from "@/lib/store/slices/employeesSlice"
import { setInvoices, addInvoice, setLoading as setInvoiceLoading } from "@/lib/store/slices/invoicesSlice"
import { addNotification, openModal, closeModal } from "@/lib/store/slices/uiSlice"
import { THEME_COLORS } from "@/lib/constants/colors"

export default function CompanyPortalPage() {
  const dispatch = useAppDispatch()
  const employees = useAppSelector((state) => state.employees)
  const invoices = useAppSelector((state) => state.invoices)
  const ui = useAppSelector((state) => state.ui)

  const [editingEmployee, setEditingEmployee] = useState<CompanyEmployee | null>(null)
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    nic: "",
    address: "",
    designation: "",
    package: "",
  })

  useEffect(() => {
    loadCompanyData()
  }, [])

  const loadCompanyData = async () => {
    dispatch(setEmployeeLoading(true))
    dispatch(setInvoiceLoading(true))

    try {
      const [employeesData, invoicesData] = await Promise.all([getCompanyEmployees("1"), getCompanyInvoices("1")])
      dispatch(setEmployees(employeesData))
      dispatch(setInvoices(invoicesData))
    } catch (error) {
      dispatch(
        addNotification({
          type: "error",
          message: "Failed to load company data",
        }),
      )
    } finally {
      dispatch(setEmployeeLoading(false))
      dispatch(setInvoiceLoading(false))
    }
  }

  const handleGenerateInvoice = async () => {
    dispatch(setInvoiceLoading(true))
    try {
      const newInvoice = await generateInvoice("1")
      dispatch(addInvoice(newInvoice))
      dispatch(
        addNotification({
          type: "success",
          message: "Invoice generated successfully!",
        }),
      )
    } catch (error) {
      dispatch(
        addNotification({
          type: "error",
          message: "Failed to generate invoice",
        }),
      )
    } finally {
      dispatch(setInvoiceLoading(false))
    }
  }

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const employeeData = {
        ...newEmployee,
        companyId: "1",
        status: "registered" as const,
        qrCodeGenerated: false,
        amount: getPackageAmount(newEmployee.package),
        packageName: getPackageName(newEmployee.package),
        package: newEmployee.package as "day1" | "day1-2" | "day2-3" | "all3",
      }

      const addedEmployee = await addCompanyEmployee(employeeData)
      dispatch(addEmployee(addedEmployee))
      dispatch(closeModal("addEmployee"))
      dispatch(
        addNotification({
          type: "success",
          message: "Employee added successfully!",
        }),
      )

      setNewEmployee({
        name: "",
        email: "",
        mobile: "",
        nic: "",
        address: "",
        designation: "",
        package: "",
      })
    } catch (error) {
      dispatch(
        addNotification({
          type: "error",
          message: "Failed to add employee",
        }),
      )
    }
  }

  const handleEditEmployee = (employee: CompanyEmployee) => {
    setEditingEmployee(employee)
    dispatch(openModal("editEmployee"))
  }

  const handleUpdateEmployee = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingEmployee) return

    try {
      const updatedEmployee = await updateCompanyEmployee(editingEmployee.id, editingEmployee)
      dispatch(updateEmployee(updatedEmployee))
      dispatch(closeModal("editEmployee"))
      dispatch(
        addNotification({
          type: "success",
          message: "Employee updated successfully!",
        }),
      )
      setEditingEmployee(null)
    } catch (error) {
      dispatch(
        addNotification({
          type: "error",
          message: "Failed to update employee",
        }),
      )
    }
  }

  const handleDeleteEmployee = async (employeeId: string) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return

    try {
      await deleteCompanyEmployee(employeeId)
      dispatch(deleteEmployee(employeeId))
      dispatch(
        addNotification({
          type: "success",
          message: "Employee deleted successfully!",
        }),
      )
    } catch (error) {
      dispatch(
        addNotification({
          type: "error",
          message: "Failed to delete employee",
        }),
      )
    }
  }

  const handleSendEmail = async (employee: CompanyEmployee) => {
    try {
      // Mock email sending
      await new Promise((resolve) => setTimeout(resolve, 1000))
      dispatch(
        addNotification({
          type: "success",
          message: `Email sent to ${employee.name} successfully!`,
        }),
      )
    } catch (error) {
      dispatch(
        addNotification({
          type: "error",
          message: "Failed to send email",
        }),
      )
    }
  }

  const handleBulkUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Mock file processing
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        // Here you would parse the CSV/Excel file
        dispatch(
          addNotification({
            type: "info",
            message: "Processing bulk upload... This is a demo.",
          }),
        )
      } catch (error) {
        dispatch(
          addNotification({
            type: "error",
            message: "Failed to process file",
          }),
        )
      }
    }
    reader.readAsText(file)
  }

  const getPackageAmount = (packageType: string): number => {
    switch (packageType) {
      case "day1":
        return 20000
      case "day1-2":
        return 35000
      case "all3":
        return 50000
      default:
        return 0
    }
  }

  const getPackageName = (packageType: string): string => {
    switch (packageType) {
      case "day1":
        return "Day 1 - Inauguration"
      case "day1-2":
        return "Day 1 + Day 2"
      case "all3":
        return "All 3 Days"
      default:
        return "Unknown"
    }
  }

  // Filter employees based on search and filters
  const filteredEmployees = employees.employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(employees.searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(employees.searchTerm.toLowerCase())
    const matchesStatus = employees.statusFilter === "all" || employee.status === employees.statusFilter
    const matchesPackage = employees.packageFilter === "all" || employee.package === employees.packageFilter

    return matchesSearch && matchesStatus && matchesPackage
  })

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tech Solutions Ltd</h1>
                <p className="text-gray-600">Company Portal</p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge className={`bg-gradient-to-r ${THEME_COLORS.gradients.success} text-white border-0`}>
                  <Activity className="mr-1 h-3 w-3" />
                  Active
                </Badge>
                <Link href="/">
                  <Button variant="outline">Back to Home</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{employees.employees.length}</div>
                <p className="text-xs text-muted-foreground">Registered for conference</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Day 1 Only</CardTitle>
                <Badge variant="secondary">{employees.employees.filter((e) => e.package === "day1").length}</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {employees.employees.filter((e) => e.package === "day1").length}
                </div>
                <p className="text-xs text-muted-foreground">Inauguration attendees</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Day 1 + 2</CardTitle>
                <Badge variant="secondary">{employees.employees.filter((e) => e.package === "day1-2").length}</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {employees.employees.filter((e) => e.package === "day1-2").length}
                </div>
                <p className="text-xs text-muted-foreground">Two-day attendees</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">All 3 Days</CardTitle>
                <Badge variant="secondary">{employees.employees.filter((e) => e.package === "all3").length}</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {employees.employees.filter((e) => e.package === "all3").length}
                </div>
                <p className="text-xs text-muted-foreground">Full conference</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="employees" className="space-y-6">
            <TabsList>
              <TabsTrigger value="employees">Employee Management</TabsTrigger>
              <TabsTrigger value="bulk-import">Bulk Import</TabsTrigger>
              <TabsTrigger value="payment">Payment & Invoice</TabsTrigger>
            </TabsList>

            <TabsContent value="employees">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Employee Registrations</CardTitle>
                  <CardDescription>
                    Manage your company's employee registrations for NIT Conference 2025
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Search and Filters */}
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                      <div className="flex flex-col sm:flex-row gap-2 flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            placeholder="Search employees..."
                            className="pl-10 max-w-sm"
                            value={employees.searchTerm}
                            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                          />
                        </div>
                        <Select
                          value={employees.statusFilter}
                          onValueChange={(value) => dispatch(setStatusFilter(value))}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="registered">Registered</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select
                          value={employees.packageFilter}
                          onValueChange={(value) => dispatch(setPackageFilter(value))}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Package" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Packages</SelectItem>
                            <SelectItem value="day1">Day 1</SelectItem>
                            <SelectItem value="day1-2">Day 1+2</SelectItem>
                            <SelectItem value="all3">All 3 Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Dialog
                        open={ui.modals.addEmployee}
                        onOpenChange={(open) =>
                          open ? dispatch(openModal("addEmployee")) : dispatch(closeModal("addEmployee"))
                        }
                      >
                        <DialogTrigger asChild>
                          <Button
                            className={`bg-gradient-to-r ${THEME_COLORS.gradients.primary} hover:from-blue-900 hover:to-indigo-900`}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Employee
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Add Employee Registration</DialogTitle>
                            <DialogDescription>Register a new employee for the conference</DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleAddEmployee} className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="emp-name">Full Name *</Label>
                              <Input
                                id="emp-name"
                                placeholder="Employee name"
                                value={newEmployee.name}
                                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="emp-email">Email *</Label>
                              <Input
                                id="emp-email"
                                type="email"
                                placeholder="employee@company.com"
                                value={newEmployee.email}
                                onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="emp-mobile">Mobile *</Label>
                              <Input
                                id="emp-mobile"
                                placeholder="0771234567"
                                value={newEmployee.mobile}
                                onChange={(e) => setNewEmployee({ ...newEmployee, mobile: e.target.value })}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="emp-nic">NIC *</Label>
                              <Input
                                id="emp-nic"
                                placeholder="123456789V"
                                value={newEmployee.nic}
                                onChange={(e) => setNewEmployee({ ...newEmployee, nic: e.target.value })}
                                required
                              />
                            </div>
                            <div className="col-span-2">
                              <Label htmlFor="emp-address">Address *</Label>
                              <Textarea
                                id="emp-address"
                                placeholder="Employee address"
                                value={newEmployee.address}
                                onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="emp-designation">Designation</Label>
                              <Input
                                id="emp-designation"
                                placeholder="Job title"
                                value={newEmployee.designation}
                                onChange={(e) => setNewEmployee({ ...newEmployee, designation: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="emp-package">Conference Package *</Label>
                              <Select
                                value={newEmployee.package}
                                onValueChange={(value) => setNewEmployee({ ...newEmployee, package: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select package" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="day1">Day 1 - Inauguration</SelectItem>
                                  <SelectItem value="day1-2">Day 1 + Day 2</SelectItem>
                                  <SelectItem value="all3">All 3 Days</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="col-span-2 flex justify-end space-x-2 mt-6">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => dispatch(closeModal("addEmployee"))}
                              >
                                Cancel
                              </Button>
                              <Button
                                type="submit"
                                className={`bg-gradient-to-r ${THEME_COLORS.gradients.primary} hover:from-blue-900 hover:to-indigo-900`}
                              >
                                Add Employee
                              </Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>

                    {employees.isLoading ? (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
                        ))}
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Designation</TableHead>
                            <TableHead>Package</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredEmployees.map((employee) => (
                            <TableRow key={employee.id}>
                              <TableCell className="font-medium">{employee.name}</TableCell>
                              <TableCell>{employee.email}</TableCell>
                              <TableCell>{employee.designation}</TableCell>
                              <TableCell>{employee.packageName}</TableCell>
                              <TableCell>LKR {employee.amount.toLocaleString()}</TableCell>
                              <TableCell>
                                <Badge variant={employee.status === "registered" ? "default" : "secondary"}>
                                  {employee.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-1">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button size="sm" variant="outline" onClick={() => handleEditEmployee(employee)}>
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Edit Employee</TooltipContent>
                                  </Tooltip>

                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button size="sm" variant="outline" onClick={() => handleSendEmail(employee)}>
                                        <Mail className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Send Email</TooltipContent>
                                  </Tooltip>

                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-red-600 hover:bg-red-50 bg-transparent"
                                        onClick={() => handleDeleteEmployee(employee.id)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Delete Employee</TooltipContent>
                                  </Tooltip>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bulk-import">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Bulk Employee Import</CardTitle>
                  <CardDescription>Import multiple employees using Excel template</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Upload Employee Data</h3>
                    <p className="text-gray-600 mb-4">Drag and drop your Excel file here, or click to browse</p>
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleBulkUpload}
                      className="hidden"
                      id="bulk-upload"
                    />
                    <label htmlFor="bulk-upload">
                      <Button
                        className={`bg-gradient-to-r ${THEME_COLORS.gradients.primary} hover:from-blue-900 hover:to-indigo-900`}
                        asChild
                      >
                        <span className="cursor-pointer">
                          <Upload className="mr-2 h-4 w-4" />
                          Choose File
                        </span>
                      </Button>
                    </label>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Excel Template Requirements:</h4>
                    <ul className="text-sm space-y-1">
                      <li>
                        • <strong>Name:</strong> Full name of employee (Required)
                      </li>
                      <li>
                        • <strong>Email:</strong> Valid email address (Required)
                      </li>
                      <li>
                        • <strong>Mobile:</strong> 10-digit mobile number (Required)
                      </li>
                      <li>
                        • <strong>NIC:</strong> National Identity Card number (Required)
                      </li>
                      <li>
                        • <strong>Address:</strong> Full address (Required)
                      </li>
                      <li>
                        • <strong>Designation:</strong> Job title (Optional)
                      </li>
                      <li>
                        • <strong>Package:</strong> "Day1", "Day1-2", or "All3" (Required)
                      </li>
                    </ul>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      className={`border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white bg-transparent`}
                      onClick={downloadExcelTemplate}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Excel Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Payment & Invoice</CardTitle>
                  <CardDescription>Manage company payment and generate invoices</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Total Employees:</p>
                        <p className="text-2xl font-bold">{employees.employees.length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Amount:</p>
                        <p className={`text-2xl font-bold text-blue-800`}>
                          LKR {employees.employees.reduce((sum, emp) => sum + emp.amount, 0).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Package Breakdown:</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-sm text-gray-600">Day 1 Only</p>
                          <p className="font-semibold">
                            {employees.employees.filter((e) => e.package === "day1").length} employees
                          </p>
                          <p className="text-blue-800">
                            LKR{" "}
                            {employees.employees
                              .filter((e) => e.package === "day1")
                              .reduce((sum, emp) => sum + emp.amount, 0)
                              .toLocaleString()}
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-sm text-gray-600">Day 1 + 2</p>
                          <p className="font-semibold">
                            {employees.employees.filter((e) => e.package === "day1-2").length} employees
                          </p>
                          <p className="text-blue-800">
                            LKR{" "}
                            {employees.employees
                              .filter((e) => e.package === "day1-2")
                              .reduce((sum, emp) => sum + emp.amount, 0)
                              .toLocaleString()}
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-sm text-gray-600">All 3 Days</p>
                          <p className="font-semibold">
                            {employees.employees.filter((e) => e.package === "all3").length} employees
                          </p>
                          <p className="text-blue-800">
                            LKR{" "}
                            {employees.employees
                              .filter((e) => e.package === "all3")
                              .reduce((sum, emp) => sum + emp.amount, 0)
                              .toLocaleString()}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      className={`flex-1 bg-gradient-to-r ${THEME_COLORS.gradients.primary} hover:from-blue-900 hover:to-indigo-900`}
                      onClick={handleGenerateInvoice}
                      disabled={invoices.isLoading}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      {invoices.isLoading ? "Generating..." : "Generate Invoice"}
                    </Button>

                    <Dialog
                      open={ui.modals.paymentHistory}
                      onOpenChange={(open) =>
                        open ? dispatch(openModal("paymentHistory")) : dispatch(closeModal("paymentHistory"))
                      }
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex-1 border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white bg-transparent"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Payment History
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Payment History</DialogTitle>
                          <DialogDescription>View all invoices and payment records</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          {invoices.isLoading ? (
                            <div className="space-y-3">
                              {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
                              ))}
                            </div>
                          ) : invoices.invoices.length > 0 ? (
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Invoice #</TableHead>
                                  <TableHead>Date</TableHead>
                                  <TableHead>Amount</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead>Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {invoices.invoices.map((invoice) => (
                                  <TableRow key={invoice.id}>
                                    <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                                    <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                                    <TableCell>LKR {invoice.totalAmount.toLocaleString()}</TableCell>
                                    <TableCell>
                                      <Badge
                                        variant={
                                          invoice.status === "paid"
                                            ? "default"
                                            : invoice.status === "pending"
                                              ? "secondary"
                                              : "destructive"
                                        }
                                      >
                                        {invoice.status}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>
                                      <InvoicePDFDownload invoice={invoice} />
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          ) : (
                            <div className="text-center py-8 text-gray-500">
                              <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                              <p>No invoices found</p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> Payment will be processed separately through admin verification. Once
                      payment is confirmed, all employees will receive their QR codes via email and SMS.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Edit Employee Modal */}
        <Dialog
          open={ui.modals.editEmployee}
          onOpenChange={(open) => (open ? dispatch(openModal("editEmployee")) : dispatch(closeModal("editEmployee")))}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Employee</DialogTitle>
              <DialogDescription>Update employee information</DialogDescription>
            </DialogHeader>
            {editingEmployee && (
              <form onSubmit={handleUpdateEmployee} className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Full Name *</Label>
                  <Input
                    id="edit-name"
                    value={editingEmployee.name}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-email">Email *</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingEmployee.email}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-mobile">Mobile *</Label>
                  <Input
                    id="edit-mobile"
                    value={editingEmployee.mobile}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, mobile: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-nic">NIC *</Label>
                  <Input
                    id="edit-nic"
                    value={editingEmployee.nic}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, nic: e.target.value })}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="edit-address">Address *</Label>
                  <Textarea
                    id="edit-address"
                    value={editingEmployee.address}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, address: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-designation">Designation</Label>
                  <Input
                    id="edit-designation"
                    value={editingEmployee.designation}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, designation: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-package">Conference Package *</Label>
                  <Select
                    value={editingEmployee.package}
                    onValueChange={(value) =>
                      setEditingEmployee({
                        ...editingEmployee,
                        package: value as "day1" | "day1-2" | "day2-3" | "all3",
                        amount: getPackageAmount(value),
                        packageName: getPackageName(value),
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day1">Day 1 - Inauguration</SelectItem>
                      <SelectItem value="day1-2">Day 1 + Day 2</SelectItem>
                      <SelectItem value="all3">All 3 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 flex justify-end space-x-2 mt-6">
                  <Button type="button" variant="outline" onClick={() => dispatch(closeModal("editEmployee"))}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className={`bg-gradient-to-r ${THEME_COLORS.gradients.primary} hover:from-blue-900 hover:to-indigo-900`}
                  >
                    Update Employee
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}