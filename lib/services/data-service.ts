import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import toastService from "./toast-service";
import jwtService from "./jwt-service";
import { DEFAULT_CONTACT_ADMIN } from "../constants/message-constants";

interface AppAxiosRequestConfig extends AxiosRequestConfig {
  headers?: any;
  headerParam?: HeaderParams;
}

interface HeaderParams {
  isFileDownload?: boolean;
  showLoading?: boolean;
  skipAuth?: boolean;
  message?: string;
  showToast?: boolean;
  isFileUpload?: boolean;
  isMultipart?: boolean;
}

class DataService {
  private client: AxiosInstance | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: "/",
      responseType: "json",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, HEAD",
      },
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const errors = error.response?.data?.errors;

          if (error.config?.headers.showToast) {
            if (Array.isArray(errors) && errors.length > 0) {
              errors.forEach((message: string) =>
                toastService.showErrorMessage(message)
              );
            } else {
              toastService.showErrorMessage(DEFAULT_CONTACT_ADMIN);
            }
          }

          // Optionally handle specific status codes
          if (status === 401) {
            // redirect to login or logout
          }
        }

        return Promise.reject(error);
      }
    );

    this.client.interceptors.request.use(
      (config) => {
        if (!config.headers.skipAuth) {
          if (jwtService.isUserLoggedIn()) {
            let accessToken = jwtService.getAccessToken();
            config.headers.Authorization = "Bearer " + accessToken;
          }
        }

        if (config.headers.isFileUpload) {
          config.headers["Content-Type"] = "multipart/form-data";
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  get = (config: AppAxiosRequestConfig, data?: any) => {
    return this.request(config.url!, "GET", data, config.headerParam!);
  };

  post = (config: AppAxiosRequestConfig, data?: any) => {
    if (!data) {
      data = {};
    }
    return this.request(config.url!, "POST", data, config.headerParam!);
  };

  patch = (config: AppAxiosRequestConfig, data?: any) => {
    if (!data) {
      data = {};
    }
    return this.request(config.url!, "PATCH", data, config.headerParam!);
  };

  request = (
    url: string,
    method: string,
    data: any,
    headerParams: HeaderParams
  ) => {
    let config: AppAxiosRequestConfig = {
      url: url,
      method: method,
      withCredentials: true,
      timeout: 0,
    };

    if (headerParams.isFileUpload) {
      config.data = data;
    } else if (headerParams.isFileDownload) {
      config.responseType = "blob";
      if (data) {
        config.data = data;
      }
    } else {
      if (
        data &&
        (method === "PUT" ||
          method === "POST" ||
          method === "DELETE" ||
          method === "PATCH")
      ) {
        config.data = JSON.stringify(data);
      }

      if (method === "GET" && data) {
        config.params = data;
      }
    }

    if (!config.headers) config.headers = {};
    config.headers.showLoading = headerParams.showLoading;
    config.headers.skipAuth = headerParams.skipAuth;
    config.headers.message = headerParams.message;
    config.headers.showToast = headerParams.showToast;
    config.headers.isFileUpload = headerParams.isFileUpload;

    return this.client!.request(config);
  };
}

export default new DataService();
