// import {
//   PASSWORD_RESET_REQUEST_SENT,
//   PASSWORD_RESET_SUCCESSFULL,
// } from "@/services/message-service/messages";

let loginEndpoints = {
  login: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: true,
    },
    url: "/api/v1/auth",
    type: "POST",
  },
  expireUseCache: {
    headerParam: {
      showLoading: false,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/security/expire-user-cache",
    type: "POST",
  },
  getApplicationProperties: {
    headerParam: {
      showLoading: false,
      showToast: false,
      skipAuth: false,
    },
    url: "/api/v1/home/getApplicationProperties",
    type: "GET",
  },

  resetPasswordFromEmail: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: true,
    //   message: PASSWORD_RESET_REQUEST_SENT,
    },
    url: "/api/v1/user/updateUserPassword",
    type: "POST",
  },

  onConfirmPassword: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: true,
    //   message: PASSWORD_RESET_SUCCESSFULL,
    },
    url: "/api/v1/user/updateUserForgetPassword",
    type: "POST",
  },
};

export default loginEndpoints;
