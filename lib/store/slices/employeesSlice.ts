import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CompanyEmployee } from "@/lib/mock-api/companies"

interface EmployeesState {
  employees: CompanyEmployee[]
  isLoading: boolean
  error: string | null
  searchTerm: string
  statusFilter: string
  packageFilter: string
}

const initialState: EmployeesState = {
  employees: [],
  isLoading: false,
  error: null,
  searchTerm: "",
  statusFilter: "all",
  packageFilter: "all",
}

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setEmployees: (state, action: PayloadAction<CompanyEmployee[]>) => {
      state.employees = action.payload
      state.isLoading = false
      state.error = null
    },
    addEmployee: (state, action: PayloadAction<CompanyEmployee>) => {
      state.employees.push(action.payload)
    },
    updateEmployee: (state, action: PayloadAction<CompanyEmployee>) => {
      const index = state.employees.findIndex((emp) => emp.id === action.payload.id)
      if (index !== -1) {
        state.employees[index] = action.payload
      }
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      state.employees = state.employees.filter((emp) => emp.id !== action.payload)
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload
    },
    setPackageFilter: (state, action: PayloadAction<string>) => {
      state.packageFilter = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  setLoading,
  setEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  setSearchTerm,
  setStatusFilter,
  setPackageFilter,
  setError,
  clearError,
} = employeesSlice.actions

export default employeesSlice.reducer
