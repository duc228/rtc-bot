import axiosClient from "../configs/axios";
import { User } from "../types/user";
const url = "/auth";

const authService = {
  login: (data: Partial<User>) => axiosClient.post(`${url}/login`, data),
  signUp: (data: Partial<User>) => axiosClient.post(`${url}/sign-up`, data),
};

export const { login, signUp } = authService;
