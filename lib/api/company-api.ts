import dataService from "@/lib/services/data-service";
import companyEndpoints from "@/lib/endpoints/company-endpoints";

// Get all companies with pagination and filters
export async function getCompanies(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) {
  const endpoint = { ...companyEndpoints.getCompanies };
  if (params) {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.status) queryParams.append('status', params.status);
    endpoint.url = `${endpoint.url}?${queryParams.toString()}`;
  }
  const response = await dataService.get(endpoint);
  return response;
}

// Get company by ID
export async function getCompany(companyId: number) {
  const endpoint = { ...companyEndpoints.getCompany };
  endpoint.url = endpoint.url.replace(':id', companyId.toString());
  const response = await dataService.get(endpoint);
  return response;
}

// Create new company
export async function createCompany(companyData: {
  name: string;
  address: string;
  status?: string;
}) {
  const response = await dataService.post(companyEndpoints.createCompany, companyData);
  return response;
}

// Update company
export async function updateCompany(companyId: number, companyData: Partial<{
  name: string;
  address: string;
  status: string;
}>) {
  const endpoint = { ...companyEndpoints.updateCompany };
  endpoint.url = endpoint.url.replace(':id', companyId.toString());
  const response = await dataService.post(endpoint, companyData);
  return response;
}

// Delete company
export async function deleteCompany(companyId: number) {
  const endpoint = { ...companyEndpoints.deleteCompany };
  endpoint.url = endpoint.url.replace(':id', companyId.toString());
  const response = await dataService.post(endpoint);
  return response;
}

// Get company employees
export async function getCompanyEmployees(companyId: number, params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) {
  const endpoint = { ...companyEndpoints.getCompanyEmployees };
  endpoint.url = endpoint.url.replace(':id', companyId.toString());
  if (params) {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.status) queryParams.append('status', params.status);
    endpoint.url = `${endpoint.url}?${queryParams.toString()}`;
  }
  const response = await dataService.get(endpoint);
  return response;
}

// Add employee to company
export async function addCompanyEmployee(companyId: number, employeeData: {
  nic: string;
  mobile: string;
  firstName: string;
  lastName: string;
  designation?: string;
  workplace?: string;
  email: string;
  password: string;
  address: string;
}) {
  const endpoint = { ...companyEndpoints.addCompanyEmployee };
  endpoint.url = endpoint.url.replace(':id', companyId.toString());
  const response = await dataService.post(endpoint, employeeData);
  return response;
}

// Update company employee
export async function updateCompanyEmployee(companyId: number, employeeId: number, employeeData: Partial<{
  nic: string;
  mobile: string;
  firstName: string;
  lastName: string;
  designation: string;
  workplace: string;
  email: string;
  address: string;
  status: string;
}>) {
  const endpoint = { ...companyEndpoints.updateCompanyEmployee };
  endpoint.url = endpoint.url.replace(':id', companyId.toString()).replace(':employeeId', employeeId.toString());
  const response = await dataService.post(endpoint, employeeData);
  return response;
}

// Remove employee from company
export async function removeCompanyEmployee(companyId: number, employeeId: number) {
  const endpoint = { ...companyEndpoints.removeCompanyEmployee };
  endpoint.url = endpoint.url.replace(':id', companyId.toString()).replace(':employeeId', employeeId.toString());
  const response = await dataService.post(endpoint);
  return response;
}

// Get company statistics
export async function getCompanyStats() {
  const response = await dataService.get(companyEndpoints.getCompanyStats);
  return response;
} 