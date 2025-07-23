import { STORAGE } from "@/lib/constants/common";
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from "@/lib/utils/storage-utils";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AppUtil from "../utils/app-utils";

class JwtService extends AppUtil.EventEmitter {
  init() {
    /* if (isInBrowser()) {
      this.setInterceptors();
      this.handleAuthentication();
    } */
    this.handleAuthentication();
  }

  handleAuthentication = () => {
    let accessToken = this.getAccessToken();

    if (!accessToken) {
      this.emit("onRedirectLogin", "access token not found");
      return;
    }
    console.log("this.isAuthTokenValid(accessToken): ", this.isAuthTokenValid(accessToken))
    if (this.isAuthTokenValid(accessToken)) {
      this.setAccessToken(accessToken);
      this.emit("onAutoLogin", true);
    } else {
      this.setAccessToken(null);
      this.emit("onAutoLogout", "accessToken expired");
    }
  };

  isAuthTokenValid = (accessToken: string) => {
    if (!accessToken) {
      return false;
    }
    const decoded = jwtDecode(accessToken);
    const currentTimeMs = Date.now() / 1000;
    if (decoded.exp && decoded.exp < currentTimeMs) {
      console.warn("access token expired");
      return false;
    } else {
      return true;
    }
  };

  onLoginSuccess = (user: Object) => {
    this.emit("onLoginSuccess", user);
  };

  setAccessToken = (accessToken: string | null) => {
    if (accessToken) {
      setStorageItem(STORAGE.ACCESS_TOKEN, accessToken);
      axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
    } else {
      removeStorageItem(STORAGE.ACCESS_TOKEN);
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  isUserLoggedIn = () => {
    let token = this.getAccessToken();

    return this.isAuthTokenValid(token);
  };

  getAccessToken = () => {
    return getStorageItem(STORAGE.ACCESS_TOKEN);
  };

  setRefreshToken = (token: string) => {
    setStorageItem(STORAGE.REFRESH_TOKEN, token);
  };

  getRefreshToken = () => {
    return getStorageItem(STORAGE.REFRESH_TOKEN);
  };

  setLoginUser = (user: Object) => {
    setStorageItem(STORAGE.LOGGED_USER_ENC, JSON.stringify(user));
  };

  getLoginUser = () => {
    return getStorageItem(STORAGE.LOGGED_USER_ENC, true);
  };

  restoreUser = (user: Object) => {
    if (user) {
      this.emit("onLoggedInUserRestored", user);
    }
  };

  logout = () => {
    this.setAccessToken(null);
    removeStorageItem(STORAGE.REFRESH_TOKEN);
    removeStorageItem(STORAGE.LOGGED_USER_ENC);
  };
}

const jwtService = new JwtService();

export default jwtService;
