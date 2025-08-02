let companyEndpoints = {
  getCompanies: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/companies",
    type: "GET",
  },
  getCompany: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/companies/:id",
    type: "GET",
  },
  createCompany: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: false,
      message: "Company created successfully",
    },
    url: "/api/v1/companies",
    type: "POST",
  },
  updateCompany: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: false,
      message: "Company updated successfully",
    },
    url: "/api/v1/companies/:id",
    type: "PUT",
  },
  deleteCompany: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: false,
      message: "Company deleted successfully",
    },
    url: "/api/v1/companies/:id",
    type: "DELETE",
  },
  getCompanyEmployees: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/companies/:id/employees",
    type: "GET",
  },
  addCompanyEmployee: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: false,
      message: "Employee added successfully",
    },
    url: "/api/v1/companies/:id/employees",
    type: "POST",
  },
  updateCompanyEmployee: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: false,
      message: "Employee updated successfully",
    },
    url: "/api/v1/companies/:id/employees/:employeeId",
    type: "PUT",
  },
  removeCompanyEmployee: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: false,
      message: "Employee removed successfully",
    },
    url: "/api/v1/companies/:id/employees/:employeeId",
    type: "DELETE",
  },
  getCompanyStats: {
    headerParam: {
      showLoading: true,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/companies/stats",
    type: "GET",
  },
};

export default companyEndpoints; 