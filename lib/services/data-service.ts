import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import toastService from "./toast-service";
import jwtService from "./jwt-service";
import { PUBLIC_PAGES } from "../constants/common";
import routerService from "./router-service";
import loginEndpoints from "../endpoints/login-endpoints";
import {
  DEFAULT_CONTACT_ADMIN,
  INVALID_CREDENTIALS,
} from "../constants/message-constants";

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
        const expectedError =
          error.response && error.response >= 400 && error.response < 500;

        if (!expectedError) {
          error.response.data.errors.forEach((message: string) =>
            toastService.showErrorMessage(message)
          );
        }

        return Promise.reject(error);
      }
    );

    this.client.interceptors.request.use(
      (config) => {
        const token = jwtService.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
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
