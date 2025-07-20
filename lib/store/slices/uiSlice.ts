import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Notification {
  id: string
  type: "success" | "error" | "info" | "warning"
  message: string
  duration?: number
}

interface UIState {
  theme: "light" | "dark" | "system"
  sidebarCollapsed: boolean
  notifications: Notification[]
  modals: {
    addEmployee: boolean
    editEmployee: boolean
    paymentHistory: boolean
    [key: string]: boolean
  }
}

const initialState: UIState = {
  theme: "system",
  sidebarCollapsed: false,
  notifications: [],
  modals: {
    addEmployee: false,
    editEmployee: false,
    paymentHistory: false,
  },
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark" | "system">) => {
      state.theme = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, "id">>) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
      }
      state.notifications.push(notification)
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload)
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = true
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = false
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach((key) => {
        state.modals[key] = false
      })
    },
  },
})

export const {
  setTheme,
  toggleSidebar,
  setSidebarCollapsed,
  addNotification,
  removeNotification,
  clearNotifications,
  openModal,
  closeModal,
  closeAllModals,
} = uiSlice.actions

export default uiSlice.reducer
