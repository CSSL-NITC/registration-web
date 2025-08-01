import { API_PREFIX } from "../constants/common";


let registerEndpoints = {
  init: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: true,
    },
    url: `${API_PREFIX}/registration/init`,
    type: "POST",
  },
  complete: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: true,
    },
    url: `${API_PREFIX}/registration/complete`,
    type: "POST",
  },
  company: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: true,
    },
    url: `${API_PREFIX}/registration/company`,
    type: "POST",
  },
  membershipValidation: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: true,
    },
    url: `${API_PREFIX}/registration/membership/validate-code`,
    type: "POST",
  },
};

export default registerEndpoints;
