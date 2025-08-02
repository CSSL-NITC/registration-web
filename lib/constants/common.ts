export const STORAGE = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN",
  LOGGED_USER_ENC: "LOGGED_USER_ENC",
};

export const PUBLIC_PAGES = {
  HOME_PAGE: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  USER_VALIDATION: "/user-validation",
  CONTRACTOR_REGISTRATION: "/contractor-registration",
};

export const DASHBOARD_PAGE = "/dashboard";

export const DashboardPages = {
  DASHBOARD: `${DASHBOARD_PAGE}`,
  REGISTRATIONS: `${DASHBOARD_PAGE}/registrations`,
  COMPANIES: `${DASHBOARD_PAGE}/companies`,
  PAYMENTS: `${DASHBOARD_PAGE}/payments`,
  QR_CODES: `${DASHBOARD_PAGE}/qr-codes`,
  REPORTS: `${DASHBOARD_PAGE}/reports`,
  SETTINGS: `${DASHBOARD_PAGE}/settings`,
  SETTINGS_USERS: `${DASHBOARD_PAGE}/settings/users`,
  SETTINGS_ROLES: `${DASHBOARD_PAGE}/settings/roles`,
}

export const APP_PROPERTIES = {
  storageBaseUrl: "",
  maximumFileUploadSize: "",
};

export const API_PREFIX = "/api/v1";
