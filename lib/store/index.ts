import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux"
import authSlice from "./slices/authSlice"
import employeesSlice from "./slices/employeesSlice"
import invoicesSlice from "./slices/invoicesSlice"
import uiSlice from "./slices/uiSlice"
import userSlice from "./slices/userSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    employees: employeesSlice,
    invoices: invoicesSlice,
    ui: uiSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
