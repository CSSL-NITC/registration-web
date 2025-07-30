import { API_PREFIX } from "../constants/common";


let emailValidationEndpoints = {
  sendCode: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: true,
    },
    url: `${API_PREFIX}/email/send-code`,
    type: "POST",
  },
  verifyCode: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: true,
    },
    url: `${API_PREFIX}/email/verify-code`,
    type: "POST",
  },
  checkVerified: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: true,
    },
    url: `${API_PREFIX}/email/is-verified`,
    type: "POST",
  },
};

export default emailValidationEndpoints;
