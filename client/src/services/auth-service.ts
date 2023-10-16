import axiosClient, { axiosClientPrivate } from "../configs/axios";
import { User } from "../types/user";
const url = "/auth";

const authService = {
  login: (data: Partial<User>) => axiosClient.post(`${url}/login`, data),
  signUp: (data: Partial<User>) => axiosClient.post(`${url}/signup`, data),
  getProfile: () => axiosClientPrivate.get(`${url}/me`),
};

export const { login, signUp, getProfile } = authService;
