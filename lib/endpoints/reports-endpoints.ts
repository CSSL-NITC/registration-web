let reportsEndpoints = {
  getDashboardStats: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/reports/dashboard-stats",
    type: "GET",
  },
  getRegistrationReport: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/reports/registrations",
    type: "GET",
  },
  getFinancialReport: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/reports/financial",
    type: "GET",
  },
  getCompanyReport: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/reports/companies",
    type: "GET",
  },
  getPaymentReport: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/reports/payments",
    type: "GET",
  },
  getQRCodeReport: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/reports/qr-codes",
    type: "GET",
  },
  getUserReport: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/reports/users",
    type: "GET",
  },
  getAttendanceReport: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/reports/attendance",
    type: "GET",
  },
  exportReport: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
      isFileDownload: true,
    },
    url: "/api/v1/reports/export",
    type: "POST",
  },
  getReportTemplates: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/reports/templates",
    type: "GET",
  },
  generateCustomReport: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/reports/custom",
    type: "POST",
  },
};

export default reportsEndpoints; 