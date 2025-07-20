import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Invoice } from "@/lib/mock-api/invoices"

interface InvoicesState {
  invoices: Invoice[]
  isLoading: boolean
  error: string | null
}

const initialState: InvoicesState = {
  invoices: [],
  isLoading: false,
  error: null,
}

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setInvoices: (state, action: PayloadAction<Invoice[]>) => {
      state.invoices = action.payload
      state.isLoading = false
      state.error = null
    },
    addInvoice: (state, action: PayloadAction<Invoice>) => {
      state.invoices.unshift(action.payload)
    },
    updateInvoice: (state, action: PayloadAction<Invoice>) => {
      const index = state.invoices.findIndex((inv) => inv.id === action.payload.id)
      if (index !== -1) {
        state.invoices[index] = action.payload
      }
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

export const { setLoading, setInvoices, addInvoice, updateInvoice, setError, clearError } = invoicesSlice.actions

export default invoicesSlice.reducer
