import axios from "axios";
// import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";
import useAuthStore from "../stores/useAuthStore";
import { BASE_URL } from "../constants/env";

const baseURL = BASE_URL;

// const baseURL = "http://localhost:81/api/v1";

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
    "content-type": "application/json",
  },
  withCredentials: true,
  timeout: 60000, // 60 seconds
});

export const axiosClientPrivate = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
    "content-type": "application/json",
  },
  timeout: 300000,
  withCredentials: true,
});

axiosClientPrivate.interceptors.request.use(
  async (config) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      useAuthStore.getState().logout();
    }

    return config;
  },
  (error) => {
    return Promise.reject(error?.response?.data);
  }
);

axiosClientPrivate.interceptors.response.use(
  function (response) {
    return response.data?.data;
  },
  function (error) {
    // console.log('error', error);
    if (error.code === "ERR_NETWORK") {
      toast.error("Đã có lỗi xảy ra");
    }
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    // console.log('error axios', error);
    return Promise.reject(error?.response?.data);
  }
);

axiosClient.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data?.data;
  },
  function (error) {
    if (error?.code === "ERR_NETWORK") {
      toast.error("Đã có lỗi xảy ra");
    }

    return Promise.reject(error?.response?.data);
  }
);

export default axiosClient;
