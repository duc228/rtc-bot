import axiosClient, { axiosClientPrivate } from "../configs/axios";

const url = "/auth";
// import axios from "axios";

const authService = {
  login: (data: any) => axiosClient.post(`${url}/login`, data),
  signUp: (data: any) => axiosClient.post(`${url}/signup`, data),
  getProfile: () => axiosClientPrivate.get(`${url}/me`),
};

export const { login, signUp, getProfile } = authService;
