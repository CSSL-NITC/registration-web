let paymentEndpoints = {
  getPayments: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/payments",
    type: "GET",
  },
  getPayment: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/payments/:id",
    type: "GET",
  },
  getPaymentByUUID: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/payments/uuid/:uuid",
    type: "GET",
  },
  createPayment: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: false,
      message: "Payment created successfully",
    },
    url: "/api/v1/payments",
    type: "POST",
  },
  updatePayment: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: false,
      message: "Payment updated successfully",
    },
    url: "/api/v1/payments/:id",
    type: "PUT",
  },
  deletePayment: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: false,
      message: "Payment deleted successfully",
    },
    url: "/api/v1/payments/:id",
    type: "DELETE",
  },
  verifyPayment: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: false,
      message: "Payment verified successfully",
    },
    url: "/api/v1/payments/:id/verify",
    type: "POST",
  },
  getPaymentsByUser: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/payments/user/:userId",
    type: "GET",
  },
  getPaymentsByCompany: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/payments/company/:companyId",
    type: "GET",
  },
  getPaymentStats: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/payments/stats",
    type: "GET",
  },
};

export default paymentEndpoints; 