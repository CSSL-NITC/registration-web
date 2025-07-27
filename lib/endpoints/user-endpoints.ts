import { DEFAULT_SAVE_UPDATE } from "../constants/message-constants";

const userEndpoints = {
  getPagedUsers: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: false,
    },
    url: "/api/v1/user/getPagedUsers",
    type: "POST",
  },
  saveOrUpdateUser: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: false,
      message: DEFAULT_SAVE_UPDATE,
    },
    url: "/api/v1/user/saveOrUpdateUser",
    type: "POST",
  },
  getUser: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: false,
    },
    url: "/api/v1/users",
    type: "GET",
  },
  getSystemRoles: {
    headerParam: {
      showLoading: true,
      showToast: true,
      skipAuth: false,
    },
    url: "/api/v1/role/getSystemRoles",
    type: "GET",
  },
};

export default userEndpoints;
