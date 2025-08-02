import dataService from "@/lib/services/data-service";
import qrEndpoints from "@/lib/endpoints/qr-endpoints";

// Get all QR codes with pagination and filters
export async function getQRCodes(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  userId?: number;
  companyId?: number;
  startDate?: string;
  endDate?: string;
}) {
  const endpoint = { ...qrEndpoints.getQRCodes };
  if (params) {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.status) queryParams.append('status', params.status);
    if (params.userId) queryParams.append('userId', params.userId.toString());
    if (params.companyId) queryParams.append('companyId', params.companyId.toString());
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    endpoint.url = `${endpoint.url}?${queryParams.toString()}`;
  }
  const response = await dataService.get(endpoint);
  return response;
}

// Get QR code by ID
export async function getQRCode(qrId: number) {
  const endpoint = { ...qrEndpoints.getQRCode };
  endpoint.url = endpoint.url.replace(':id', qrId.toString());
  const response = await dataService.get(endpoint);
  return response;
}

// Get QR code by content
export async function getQRCodeByContent(content: string) {
  const endpoint = { ...qrEndpoints.getQRCodeByContent };
  endpoint.url = endpoint.url.replace(':content', content);
  const response = await dataService.get(endpoint);
  return response;
}

// Create new QR code
export async function createQRCode(qrData: {
  content: string;
  assignTo: number;
  status?: string;
}) {
  const response = await dataService.post(qrEndpoints.createQRCode, qrData);
  return response;
}

// Update QR code
export async function updateQRCode(qrId: number, qrData: Partial<{
  content: string;
  status: string;
  assignTo: number;
}>) {
  const endpoint = { ...qrEndpoints.updateQRCode };
  endpoint.url = endpoint.url.replace(':id', qrId.toString());
  const response = await dataService.post(endpoint, qrData);
  return response;
}

// Delete QR code
export async function deleteQRCode(qrId: number) {
  const endpoint = { ...qrEndpoints.deleteQRCode };
  endpoint.url = endpoint.url.replace(':id', qrId.toString());
  const response = await dataService.post(endpoint);
  return response;
}

// Generate QR code for user
export async function generateQRCode(userId: number, qrData?: {
  content?: string;
  status?: string;
}) {
  const response = await dataService.post(qrEndpoints.generateQRCode, {
    userId,
    ...qrData
  });
  return response;
}

// Get QR code image
export async function getQRCodeImage(qrId: number) {
  const endpoint = { ...qrEndpoints.getQRCodeImage };
  endpoint.url = endpoint.url.replace(':id', qrId.toString());
  const response = await dataService.get(endpoint);
  return response;
}

// Get QR codes by user
export async function getQRCodesByUser(userId: number, params?: {
  page?: number;
  limit?: number;
  status?: string;
}) {
  const endpoint = { ...qrEndpoints.getQRCodesByUser };
  endpoint.url = endpoint.url.replace(':userId', userId.toString());
  if (params) {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.status) queryParams.append('status', params.status);
    endpoint.url = `${endpoint.url}?${queryParams.toString()}`;
  }
  const response = await dataService.get(endpoint);
  return response;
}

// Get QR codes by company
export async function getQRCodesByCompany(companyId: number, params?: {
  page?: number;
  limit?: number;
  status?: string;
}) {
  const endpoint = { ...qrEndpoints.getQRCodesByCompany };
  endpoint.url = endpoint.url.replace(':companyId', companyId.toString());
  if (params) {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.status) queryParams.append('status', params.status);
    endpoint.url = `${endpoint.url}?${queryParams.toString()}`;
  }
  const response = await dataService.get(endpoint);
  return response;
}

// Bulk generate QR codes
export async function bulkGenerateQRCodes(userIds: number[], qrData?: {
  content?: string;
  status?: string;
}) {
  const response = await dataService.post(qrEndpoints.bulkGenerateQRCodes, {
    userIds,
    ...qrData
  });
  return response;
}

// Export QR codes
export async function exportQRCodes(params?: {
  format?: 'pdf' | 'excel' | 'csv';
  userId?: number;
  companyId?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
}) {
  const endpoint = { ...qrEndpoints.exportQRCodes };
  if (params) {
    const queryParams = new URLSearchParams();
    if (params.format) queryParams.append('format', params.format);
    if (params.userId) queryParams.append('userId', params.userId.toString());
    if (params.companyId) queryParams.append('companyId', params.companyId.toString());
    if (params.status) queryParams.append('status', params.status);
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    endpoint.url = `${endpoint.url}?${queryParams.toString()}`;
  }
  const response = await dataService.get(endpoint);
  return response;
}

// Get QR code statistics
export async function getQRCodeStats(params?: {
  startDate?: string;
  endDate?: string;
  companyId?: number;
}) {
  const endpoint = { ...qrEndpoints.getQRCodeStats };
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