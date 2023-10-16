import axios from "axios";
import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";
import { ENV } from "../constants/env";
import useAuthStore from "../stores/useAuthStore";

const baseURL = ENV.APP_API_URL;

// console.log('baseURL', baseURL);

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
    return response.data;
  },
  function (error) {
    // console.log('error', error);
    if (error.code === "ERR_NETWORK") {
      // window.location.href = '/404';
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
    return response.data;
  },
  function (error) {
    if (error?.response?.status === 401) {
      // window.location.href = '/404';
      //   store.dispatch(logout());
    }
    if (error?.code === "ERR_NETWORK") {
      toast.error("Đã có lỗi xảy ra");
    }
    // console.log('error axios client', error);

    return Promise.reject(error?.response?.data);
  }
);

export default axiosClient;
