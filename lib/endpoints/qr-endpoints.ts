let qrEndpoints = {
  getQRCodes: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/qr-codes",
    type: "GET",
  },
  getQRCode: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/qr-codes/:id",
    type: "GET",
  },
  getQRCodeByContent: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/qr-codes/content/:content",
    type: "GET",
  },
  createQRCode: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: false,
      message: "QR Code created successfully",
    },
    url: "/api/v1/qr-codes",
    type: "POST",
  },
  updateQRCode: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: false,
      message: "QR Code updated successfully",
    },
    url: "/api/v1/qr-codes/:id",
    type: "PUT",
  },
  deleteQRCode: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: false,
      message: "QR Code deleted successfully",
    },
    url: "/api/v1/qr-codes/:id",
    type: "DELETE",
  },
  generateQRCode: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: false,
      message: "QR Code generated successfully",
    },
    url: "/api/v1/qr-codes/generate",
    type: "POST",
  },
  getQRCodeImage: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/qr-codes/:id/image",
    type: "GET",
  },
  getQRCodesByUser: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/qr-codes/user/:userId",
    type: "GET",
  },
  getQRCodesByCompany: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/qr-codes/company/:companyId",
    type: "GET",
  },
  bulkGenerateQRCodes: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: false,
      message: "QR Codes generated successfully",
    },
    url: "/api/v1/qr-codes/bulk-generate",
    type: "POST",
  },
  exportQRCodes: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
      isFileDownload: true,
    },
    url: "/api/v1/qr-codes/export",
    type: "GET",
  },
  getQRCodeStats: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/qr-codes/stats",
    type: "GET",
  },
};

export default qrEndpoints; 