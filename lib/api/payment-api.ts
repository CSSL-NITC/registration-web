import dataService from "@/lib/services/data-service";
import paymentEndpoints from "@/lib/endpoints/payment-endpoints";

// Get all payments with pagination and filters
export async function getPayments(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  paymentStatus?: string;
  userId?: number;
  companyId?: number;
  startDate?: string;
  endDate?: string;
}) {
  const endpoint = { ...paymentEndpoints.getPayments };
  if (params) {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.status) queryParams.append('status', params.status);
    if (params.paymentStatus) queryParams.append('paymentStatus', params.paymentStatus);
    if (params.userId) queryParams.append('userId', params.userId.toString());
    if (params.companyId) queryParams.append('companyId', params.companyId.toString());
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    endpoint.url = `${endpoint.url}?${queryParams.toString()}`;
  }
  const response = await dataService.get(endpoint);
  return response;
}

// Get payment by ID
export async function getPayment(paymentId: number) {
  const endpoint = { ...paymentEndpoints.getPayment };
  endpoint.url = endpoint.url.replace(':id', paymentId.toString());
  const response = await dataService.get(endpoint);
  return response;
}

// Get payment by UUID
export async function getPaymentByUUID(uuid: string) {
  const endpoint = { ...paymentEndpoints.getPaymentByUUID };
  endpoint.url = endpoint.url.replace(':uuid', uuid);
  const response = await dataService.get(endpoint);
  return response;
}

// Create new payment
export async function createPayment(paymentData: {
  requestId: string;
  amount: number;
  currency: string;
  paidBy: number;
  statusMessage?: string;
  responseData?: any;
}) {
  const response = await dataService.post(paymentEndpoints.createPayment, paymentData);
  return response;
}

// Update payment
export async function updatePayment(paymentId: number, paymentData: Partial<{
  paymentStatus: string;
  amount: number;
  currency: string;
  statusMessage: string;
  responseData: any;
}>) {
  const endpoint = { ...paymentEndpoints.updatePayment };
  endpoint.url = endpoint.url.replace(':id', paymentId.toString());
  const response = await dataService.post(endpoint, paymentData);
  return response;
}

// Delete payment
export async function deletePayment(paymentId: number) {
  const endpoint = { ...paymentEndpoints.deletePayment };
  endpoint.url = endpoint.url.replace(':id', paymentId.toString());
  const response = await dataService.post(endpoint);
  return response;
}

// Verify payment
export async function verifyPayment(paymentId: number) {
  const endpoint = { ...paymentEndpoints.verifyPayment };
  endpoint.url = endpoint.url.replace(':id', paymentId.toString());
  const response = await dataService.post(endpoint);
  return response;
}

// Get payments by user
export async function getPaymentsByUser(userId: number, params?: {
  page?: number;
  limit?: number;
  status?: string;
  paymentStatus?: string;
}) {
  const endpoint = { ...paymentEndpoints.getPaymentsByUser };
  endpoint.url = endpoint.url.replace(':userId', userId.toString());
  if (params) {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.status) queryParams.append('status', params.status);
    if (params.paymentStatus) queryParams.append('paymentStatus', params.paymentStatus);
    endpoint.url = `${endpoint.url}?${queryParams.toString()}`;
  }
  const response = await dataService.get(endpoint);
  return response;
}

// Get payments by company
export async function getPaymentsByCompany(companyId: number, params?: {
  page?: number;
  limit?: number;
  status?: string;
  paymentStatus?: string;
}) {
  const endpoint = { ...paymentEndpoints.getPaymentsByCompany };
  endpoint.url = endpoint.url.replace(':companyId', companyId.toString());
  if (params) {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.status) queryParams.append('status', params.status);
    if (params.paymentStatus) queryParams.append('paymentStatus', params.paymentStatus);
    endpoint.url = `${endpoint.url}?${queryParams.toString()}`;
  }
  const response = await dataService.get(endpoint);
  return response;
}

// Get payment statistics
export async function getPaymentStats(params?: {
  startDate?: string;
  endDate?: string;
  companyId?: number;
}) {
  const endpoint = { ...paymentEndpoints.getPaymentStats };
  if (params) {
    const queryParams = new URLSearchParams();
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    if (params.companyId) queryParams.append('companyId', params.companyId.toString());
    endpoint.url = `${endpoint.url}?${queryParams.toString()}`;
  }
  const response = await dataService.get(endpoint);
  return response;
} 