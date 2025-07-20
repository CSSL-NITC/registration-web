export const ADMIN_CONSTANTS = {
  ITEMS_PER_PAGE: 10,
  REFRESH_INTERVAL: 30000, // 30 seconds
  EXPORT_FORMATS: ["CSV", "Excel", "PDF"],
  PAYMENT_STATUSES: {
    PENDING: "pending",
    VERIFIED: "verified",
    FAILED: "failed",
  },
  QR_CODE_STATUSES: {
    GENERATED: "generated",
    NOT_GENERATED: "not_generated",
  },
  COMPANY_STATUSES: {
    ACTIVE: "active",
    PENDING: "pending",
    INACTIVE: "inactive",
  },
}

export const ADMIN_TOOLTIPS = {
  VERIFY_PAYMENT: "Verify and approve this payment",
  GENERATE_INVOICE: "Generate invoice for this registration",
  GENERATE_QR: "Generate QR code for conference entry",
  VIEW_DETAILS: "View detailed information",
  EDIT_RECORD: "Edit this record",
  DELETE_RECORD: "Delete this record",
  EXPORT_DATA: "Export data to file",
  REFRESH_DATA: "Refresh data from server",
}

export const QUICK_ACTIONS = [
  {
    id: "add-company",
    title: "Add Company",
    description: "Register a new company account",
    icon: "Plus",
    action: "ADD_COMPANY",
    color: "blue",
  },
  {
    id: "export-reports",
    title: "Export Reports",
    description: "Download comprehensive reports",
    icon: "Download",
    action: "EXPORT_REPORTS",
    color: "green",
  },
  {
    id: "view-analytics",
    title: "View Analytics",
    description: "Access detailed analytics dashboard",
    icon: "Activity",
    action: "VIEW_ANALYTICS",
    color: "purple",
  },
  {
    id: "send-notifications",
    title: "Send Notifications",
    description: "Send bulk notifications to participants",
    icon: "Mail",
    action: "SEND_NOTIFICATIONS",
    color: "orange",
  },
]
