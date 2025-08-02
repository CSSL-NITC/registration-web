import dataService from "@/lib/services/data-service";
import reportsEndpoints from "@/lib/endpoints/reports-endpoints";

// Get dashboard statistics
export async function getDashboardStats(params?: {
  startDate?: string;
  endDate?: string;
  companyId?: number;
}) {
  const endpoint = { ...reportsEndpoints.getDashboardStats };
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

// Get registration report
export async function getRegistrationReport(params?: {
  startDate?: string;
  endDate?: string;
  companyId?: number;
  status?: string;
  format?: 'pdf' | 'excel' | 'csv';
}) {
  const endpoint = { ...reportsEndpoints.getRegistrationReport };
  if (params) {
    const queryParams = new URLSearchParams();
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    if (params.companyId) queryParams.append('companyId', params.companyId.toString());
    if (params.status) queryParams.append('status', params.status);
    if (params.format) queryParams.append('format', params.format);
    endpoint.url = `${endpoint.url}?${queryParams.toString()}`;
  }
  const response = await dataService.get(endpoint);
  return response;
}

// Get financial report
export async function getFinancialReport(params?: {
  startDate?: string;
  endDate?: string;
  companyId?: number;
  paymentStatus?: string;
  format?: 'pdf' | 'excel' | 'csv';
}) {
  const endpoint = { ...reportsEndpoints.getFinancialReport };
  if (params) {
    const queryParams = new URLSearchParams();
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    if (params.companyId) queryParams.append('companyId', params.companyId.toString());
    if (params.paymentStatus) queryParams.append('paymentStatus', params.paymentStatus);
    if (params.format) queryParams.append('format', params.format);
    endpoint.url = `${endpoint.url}?${queryParams.toString()}`;
  }
  const response = await dataService.get(endpoint);
  return response;
}

// Get company report
export async function getCompanyReport(params?: {
  startDate?: string;
  endDate?: string;
  status?: string;
  format?: 'pdf' | 'excel' | 'csv';
}) {
  const endpoint = { ...reportsEndpoints.getCompanyReport };
  if (params) {
    const queryParams = new URLSearchParams();
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    if (params.status) queryParams.append('status', params.status);
    if (params.format) queryParams.append('format', params.format);
    endpoint.url = `${endpoint.url}?${queryParams.toString()}`;
  }
  const response = await dataService.get(endpoint);
  return response;
}

// Get payment report
export async function getPaymentReport(params?: {
  startDate?: string;
  endDate?: string;
  companyId?: number;
  paymentStatus?: string;
  format?: 'pdf' | 'excel' | 'csv';
}) {
  const endpoint = { ...reportsEndpoints.getPaymentReport };
  if (params) {
    const queryParams = new URLSearchParams();
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    if (params.companyId) queryParams.append('companyId', params.companyId.toString());
    if (params.paymentStatus) queryParams.append('paymentStatus', params.paymentStatus);
    if (params.format) queryParams.append('format', params.format);
    endpoint.url = `${endpoint.url}?${queryParams.toString()}`;
  }
  const response = await dataService.get(endpoint);
  return response;
}

// Get QR code report
export async function getQRCodeReport(params?: {
  startDate?: string;
  endDate?: string;
  companyId?: number;
  status?: string;
  format?: 'pdf' | 'excel' | 'csv';
}) {
  const endpoint = { ...reportsEndpoints.getQRCodeReport };
  if (params) {
    const queryParams = new URLSearchParams();
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    if (params.companyId) queryParams.append('companyId', params.companyId.toString());
    if (params.status) queryParams.append('status', params.status);
    if (params.format) queryParams.append('format', params.format);
    endpoint.url = `${endpoint.url}?${queryParams.toString()}`;
  }
  const response = await dataService.get(endpoint);
  return response;
}

// Get user report
export async function getUserReport(params?: {
  startDate?: string;
  endDate?: string;
  companyId?: number;
  status?: string;
  format?: 'pdf' | 'excel' | 'csv';
}) {
  const endpoint = { ...reportsEndpoints.getUserReport };
  if (params) {
    const queryParams = new URLSearchParams();
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    if (params.companyId) queryParams.append('companyId', params.companyId.toString());
    if (params.status) queryParams.append('status', params.status);
    if (params.format) queryParams.append('format', params.format);
    endpoint.url = `${endpoint.url}?${queryParams.toString()}`;
  }
  const response = await dataService.get(endpoint);
  return response;
}

// Get attendance report
export async function getAttendanceReport(params?: {
  startDate?: string;
  endDate?: string;
  companyId?: number;
  format?: 'pdf' | 'excel' | 'csv';
}) {
  const endpoint = { ...reportsEndpoints.getAttendanceReport };
  if (params) {
    const queryParams = new URLSearchParams();
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    if (params.companyId) queryParams.append('companyId', params.companyId.toString());
    if (params.format) queryParams.append('format', params.format);
    endpoint.url = `${endpoint.url}?${queryParams.toString()}`;
  }
  const response = await dataService.get(endpoint);
  return response;
}

// Export report
export async function exportReport(reportType: string, params?: {
  startDate?: string;
  endDate?: string;
  companyId?: number;
  format?: 'pdf' | 'excel' | 'csv';
  filters?: any;
}) {
  const response = await dataService.post(reportsEndpoints.exportReport, {
    reportType,
    ...params
  });
  return response;
}

// Get report templates
export async function getReportTemplates() {
  const response = await dataService.get(reportsEndpoints.getReportTemplates);
  return response;
}

// Generate custom report
export async function generateCustomReport(reportConfig: {
  type: string;
  filters: any;
  columns: string[];
  format?: 'pdf' | 'excel' | 'csv';
  startDate?: string;
  endDate?: string;
  companyId?: number;
}) {
  const response = await dataService.post(reportsEndpoints.generateCustomReport, reportConfig);
  return response;
} 