# Backend API Endpoints for SUPER_ADMIN Flow

## Authentication Endpoints

### Login
- **POST** `/api/v1/auth/login`
  - Request: `{ email: string, password: string }`
  - Response: `{ token: string, user: User }`

### Logout
- **POST** `/api/v1/auth/logout`
  - Request: `{ token: string }`
  - Response: `{ message: string }`

### Forgot Password
- **POST** `/api/v1/auth/forgot-password`
  - Request: `{ email: string }`
  - Response: `{ message: string }`

### Reset Password
- **POST** `/api/v1/auth/reset-password`
  - Request: `{ token: string, newPassword: string }`
  - Response: `{ message: string }`

## User Management Endpoints

### Get All Users
- **GET** `/api/v1/users`
  - Query Parameters: `page`, `limit`, `search`, `status`, `companyId`
  - Response: `{ data: User[], total: number, page: number, limit: number }`

### Get User by ID
- **GET** `/api/v1/users/:id`
  - Response: `{ data: User }`

### Create User
- **POST** `/api/v1/users`
  - Request: `{ nic: string, mobile: string, firstName: string, lastName: string, designation?: string, workplace?: string, email: string, password: string, address: string, companyId?: number }`
  - Response: `{ data: User }`

### Update User
- **PUT** `/api/v1/users/:id`
  - Request: `{ nic?: string, mobile?: string, firstName?: string, lastName?: string, designation?: string, workplace?: string, email?: string, address?: string, status?: string, companyId?: number }`
  - Response: `{ data: User }`

### Delete User
- **DELETE** `/api/v1/users/:id`
  - Response: `{ message: string }`

### Change Password
- **POST** `/api/v1/users/:id/change-password`
  - Request: `{ currentPassword: string, newPassword: string }`
  - Response: `{ message: string }`

### Reset User Password
- **POST** `/api/v1/users/:id/reset-password`
  - Response: `{ message: string }`

### Get User Statistics
- **GET** `/api/v1/users/stats`
  - Response: `{ data: { totalUsers: number, activeUsers: number, inactiveUsers: number, usersByCompany: any[] } }`

## Company Management Endpoints

### Get All Companies
- **GET** `/api/v1/companies`
  - Query Parameters: `page`, `limit`, `search`, `status`
  - Response: `{ data: Company[], total: number, page: number, limit: number }`

### Get Company by ID
- **GET** `/api/v1/companies/:id`
  - Response: `{ data: Company }`

### Create Company
- **POST** `/api/v1/companies`
  - Request: `{ name: string, address: string, status?: string }`
  - Response: `{ data: Company }`

### Update Company
- **PUT** `/api/v1/companies/:id`
  - Request: `{ name?: string, address?: string, status?: string }`
  - Response: `{ data: Company }`

### Delete Company
- **DELETE** `/api/v1/companies/:id`
  - Response: `{ message: string }`

### Get Company Employees
- **GET** `/api/v1/companies/:id/employees`
  - Query Parameters: `page`, `limit`, `search`, `status`
  - Response: `{ data: User[], total: number, page: number, limit: number }`

### Add Employee to Company
- **POST** `/api/v1/companies/:id/employees`
  - Request: `{ nic: string, mobile: string, firstName: string, lastName: string, designation?: string, workplace?: string, email: string, password: string, address: string }`
  - Response: `{ data: User }`

### Update Company Employee
- **PUT** `/api/v1/companies/:id/employees/:employeeId`
  - Request: `{ nic?: string, mobile?: string, firstName?: string, lastName?: string, designation?: string, workplace?: string, email?: string, address?: string, status?: string }`
  - Response: `{ data: User }`

### Remove Employee from Company
- **DELETE** `/api/v1/companies/:id/employees/:employeeId`
  - Response: `{ message: string }`

### Get Company Statistics
- **GET** `/api/v1/companies/stats`
  - Response: `{ data: { totalCompanies: number, activeCompanies: number, inactiveCompanies: number, totalEmployees: number, totalRevenue: number } }`

## Payment Management Endpoints

### Get All Payments
- **GET** `/api/v1/payments`
  - Query Parameters: `page`, `limit`, `search`, `status`, `paymentStatus`, `userId`, `companyId`, `startDate`, `endDate`
  - Response: `{ data: Payment[], total: number, page: number, limit: number }`

### Get Payment by ID
- **GET** `/api/v1/payments/:id`
  - Response: `{ data: Payment }`

### Get Payment by UUID
- **GET** `/api/v1/payments/uuid/:uuid`
  - Response: `{ data: Payment }`

### Create Payment
- **POST** `/api/v1/payments`
  - Request: `{ requestId: string, amount: number, currency: string, paidBy: number, statusMessage?: string, responseData?: any }`
  - Response: `{ data: Payment }`

### Update Payment
- **PUT** `/api/v1/payments/:id`
  - Request: `{ paymentStatus?: string, amount?: number, currency?: string, statusMessage?: string, responseData?: any }`
  - Response: `{ data: Payment }`

### Delete Payment
- **DELETE** `/api/v1/payments/:id`
  - Response: `{ message: string }`

### Verify Payment
- **POST** `/api/v1/payments/:id/verify`
  - Response: `{ data: Payment }`

### Get Payments by User
- **GET** `/api/v1/payments/user/:userId`
  - Query Parameters: `page`, `limit`, `status`, `paymentStatus`
  - Response: `{ data: Payment[], total: number, page: number, limit: number }`

### Get Payments by Company
- **GET** `/api/v1/payments/company/:companyId`
  - Query Parameters: `page`, `limit`, `status`, `paymentStatus`
  - Response: `{ data: Payment[], total: number, page: number, limit: number }`

### Get Payment Statistics
- **GET** `/api/v1/payments/stats`
  - Query Parameters: `startDate`, `endDate`, `companyId`
  - Response: `{ data: { totalPayments: number, verifiedPayments: number, pendingPayments: number, totalRevenue: number, revenueByMonth: any[] } }`

## QR Code Management Endpoints

### Get All QR Codes
- **GET** `/api/v1/qr-codes`
  - Query Parameters: `page`, `limit`, `search`, `status`, `userId`, `companyId`, `startDate`, `endDate`
  - Response: `{ data: QRCode[], total: number, page: number, limit: number }`

### Get QR Code by ID
- **GET** `/api/v1/qr-codes/:id`
  - Response: `{ data: QRCode }`

### Get QR Code by Content
- **GET** `/api/v1/qr-codes/content/:content`
  - Response: `{ data: QRCode }`

### Create QR Code
- **POST** `/api/v1/qr-codes`
  - Request: `{ content: string, assignTo: number, status?: string }`
  - Response: `{ data: QRCode }`

### Update QR Code
- **PUT** `/api/v1/qr-codes/:id`
  - Request: `{ content?: string, status?: string, assignTo?: number }`
  - Response: `{ data: QRCode }`

### Delete QR Code
- **DELETE** `/api/v1/qr-codes/:id`
  - Response: `{ message: string }`

### Generate QR Code for User
- **POST** `/api/v1/qr-codes/generate`
  - Request: `{ userId: number, content?: string, status?: string }`
  - Response: `{ data: QRCode }`

### Get QR Code Image
- **GET** `/api/v1/qr-codes/:id/image`
  - Response: `{ data: { image: string, contentType: string } }`

### Get QR Codes by User
- **GET** `/api/v1/qr-codes/user/:userId`
  - Query Parameters: `page`, `limit`, `status`
  - Response: `{ data: QRCode[], total: number, page: number, limit: number }`

### Get QR Codes by Company
- **GET** `/api/v1/qr-codes/company/:companyId`
  - Query Parameters: `page`, `limit`, `status`
  - Response: `{ data: QRCode[], total: number, page: number, limit: number }`

### Bulk Generate QR Codes
- **POST** `/api/v1/qr-codes/bulk-generate`
  - Request: `{ userIds: number[], content?: string, status?: string }`
  - Response: `{ data: QRCode[] }`

### Export QR Codes
- **GET** `/api/v1/qr-codes/export`
  - Query Parameters: `format`, `userId`, `companyId`, `status`, `startDate`, `endDate`
  - Response: `{ data: { file: string, contentType: string } }`

### Get QR Code Statistics
- **GET** `/api/v1/qr-codes/stats`
  - Query Parameters: `startDate`, `endDate`, `companyId`
  - Response: `{ data: { totalQRCodes: number, generatedQRCodes: number, pendingQRCodes: number, qrCodesByCompany: any[] } }`

## Reports Endpoints

### Get Dashboard Statistics
- **GET** `/api/v1/reports/dashboard-stats`
  - Query Parameters: `startDate`, `endDate`, `companyId`
  - Response: `{ data: { totalRegistrations: number, totalCompanies: number, totalRevenue: number, qrCodesGenerated: number, pendingPayments: number, verifiedToday: number, packageBreakdown: any, revenueByMonth: any[], registrationsByDay: any[] } }`

### Get Registration Report
- **GET** `/api/v1/reports/registrations`
  - Query Parameters: `startDate`, `endDate`, `companyId`, `status`, `format`
  - Response: `{ data: any[] }` or file download

### Get Financial Report
- **GET** `/api/v1/reports/financial`
  - Query Parameters: `startDate`, `endDate`, `companyId`, `paymentStatus`, `format`
  - Response: `{ data: any[] }` or file download

### Get Company Report
- **GET** `/api/v1/reports/companies`
  - Query Parameters: `startDate`, `endDate`, `status`, `format`
  - Response: `{ data: any[] }` or file download

### Get Payment Report
- **GET** `/api/v1/reports/payments`
  - Query Parameters: `startDate`, `endDate`, `companyId`, `paymentStatus`, `format`
  - Response: `{ data: any[] }` or file download

### Get QR Code Report
- **GET** `/api/v1/reports/qr-codes`
  - Query Parameters: `startDate`, `endDate`, `companyId`, `status`, `format`
  - Response: `{ data: any[] }` or file download

### Get User Report
- **GET** `/api/v1/reports/users`
  - Query Parameters: `startDate`, `endDate`, `companyId`, `status`, `format`
  - Response: `{ data: any[] }` or file download

### Get Attendance Report
- **GET** `/api/v1/reports/attendance`
  - Query Parameters: `startDate`, `endDate`, `companyId`, `format`
  - Response: `{ data: any[] }` or file download

### Export Report
- **POST** `/api/v1/reports/export`
  - Request: `{ reportType: string, startDate?: string, endDate?: string, companyId?: number, format?: string, filters?: any }`
  - Response: `{ data: { file: string, contentType: string } }`

### Get Report Templates
- **GET** `/api/v1/reports/templates`
  - Response: `{ data: any[] }`

### Generate Custom Report
- **POST** `/api/v1/reports/custom`
  - Request: `{ type: string, filters: any, columns: string[], format?: string, startDate?: string, endDate?: string, companyId?: number }`
  - Response: `{ data: any[] }` or file download

## Database Schema

### User Table (t_user)
```sql
CREATE TABLE t_user (
  USER_ID INT PRIMARY KEY AUTO_INCREMENT,
  NIC VARCHAR(20) UNIQUE NOT NULL,
  MOBILE VARCHAR(15) NOT NULL,
  FIRST_NAME VARCHAR(100) NOT NULL,
  LAST_NAME VARCHAR(100) NOT NULL,
  DESIGNATION VARCHAR(100),
  WORKPLACE VARCHAR(200),
  EMAIL VARCHAR(255) UNIQUE NOT NULL,
  PASSWORD VARCHAR(255) NOT NULL,
  ADDRESS TEXT NOT NULL,
  STATUS ENUM('active', 'inactive', 'pending') DEFAULT 'active',
  IS_TEMPORARY_PASSWORD BOOLEAN DEFAULT FALSE,
  LINK_EXPIRE_TIME DATETIME,
  FORGET_PASSWORD_UUID VARCHAR(255),
  FAILED_LOGIN_ATTEMPT_COUNT INT DEFAULT 0,
  COMPANY_ID INT,
  CREATED_BY INT,
  CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  MODIFIED_BY INT,
  MODIFIED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  VERSION INT DEFAULT 1,
  FOREIGN KEY (COMPANY_ID) REFERENCES t_company(COMPANY_ID),
  FOREIGN KEY (CREATED_BY) REFERENCES t_user(USER_ID),
  FOREIGN KEY (MODIFIED_BY) REFERENCES t_user(USER_ID)
);
```

### Company Table (t_company)
```sql
CREATE TABLE t_company (
  COMPANY_ID INT PRIMARY KEY AUTO_INCREMENT,
  NAME VARCHAR(200) NOT NULL,
  ADDRESS TEXT NOT NULL,
  STATUS ENUM('active', 'inactive', 'pending') DEFAULT 'active',
  CREATED_BY INT,
  CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  MODIFIED_BY INT,
  MODIFIED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  VERSION INT DEFAULT 1,
  FOREIGN KEY (CREATED_BY) REFERENCES t_user(USER_ID),
  FOREIGN KEY (MODIFIED_BY) REFERENCES t_user(USER_ID)
);
```

### Payment Table (t_payment)
```sql
CREATE TABLE t_payment (
  PAYMENT_ID INT PRIMARY KEY AUTO_INCREMENT,
  PAYMENT_UUID VARCHAR(255) UNIQUE NOT NULL,
  REQUEST_ID VARCHAR(255) NOT NULL,
  PAYMENT_STATUS ENUM('pending', 'verified', 'failed') DEFAULT 'pending',
  AMOUNT DECIMAL(10,2) NOT NULL,
  CURRENCY VARCHAR(3) DEFAULT 'LKR',
  STATUS_MESSAGE TEXT,
  RESPONSE_DATA JSON,
  PAID_BY INT NOT NULL,
  CREATED_BY INT,
  CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  MODIFIED_BY INT,
  MODIFIED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  VERSION INT DEFAULT 1,
  FOREIGN KEY (PAID_BY) REFERENCES t_user(USER_ID),
  FOREIGN KEY (CREATED_BY) REFERENCES t_user(USER_ID),
  FOREIGN KEY (MODIFIED_BY) REFERENCES t_user(USER_ID)
);
```

### QR Code Table (t_qr)
```sql
CREATE TABLE t_qr (
  QR_ID INT PRIMARY KEY AUTO_INCREMENT,
  CONTENT TEXT NOT NULL,
  IMAGE LONGBLOB,
  STATUS ENUM('active', 'inactive', 'used') DEFAULT 'active',
  ASSIGN_TO INT NOT NULL,
  CREATED_BY INT,
  CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  MODIFIED_BY INT,
  MODIFIED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  VERSION INT DEFAULT 1,
  FOREIGN KEY (ASSIGN_TO) REFERENCES t_user(USER_ID),
  FOREIGN KEY (CREATED_BY) REFERENCES t_user(USER_ID),
  FOREIGN KEY (MODIFIED_BY) REFERENCES t_user(USER_ID)
);
```

## Response Formats

### Success Response
```json
{
  "success": true,
  "data": any,
  "message": "string"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string",
    "details": any
  }
}
```

### Paginated Response
```json
{
  "success": true,
  "data": any[],
  "pagination": {
    "total": number,
    "page": number,
    "limit": number,
    "totalPages": number
  }
}
```

## Authentication & Authorization

### JWT Token Structure
```json
{
  "userId": number,
  "email": string,
  "roles": string[],
  "privileges": string[],
  "iat": number,
  "exp": number
}
```

### Required Privileges for SUPER_ADMIN
- `VIEW.DASHBOARD`
- `VIEW.REGISTRATION`
- `VIEW.COMPANIES`
- `VIEW.PAYMENTS`
- `VIEW.QR_CODES`
- `VIEW.REPORTS`
- `VIEW.SETTINGS`

## File Upload Endpoints

### Upload QR Code Image
- **POST** `/api/v1/upload/qr-code`
  - Request: `FormData with image file`
  - Response: `{ data: { imageUrl: string } }`

### Upload Company Logo
- **POST** `/api/v1/upload/company-logo`
  - Request: `FormData with image file`
  - Response: `{ data: { imageUrl: string } }`

## Export Endpoints

### Export Data to Excel
- **GET** `/api/v1/export/excel`
  - Query Parameters: `type`, `filters`
  - Response: Excel file download

### Export Data to PDF
- **GET** `/api/v1/export/pdf`
  - Query Parameters: `type`, `filters`
  - Response: PDF file download

### Export Data to CSV
- **GET** `/api/v1/export/csv`
  - Query Parameters: `type`, `filters`
  - Response: CSV file download 