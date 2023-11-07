import axiosClient, { axiosClientPrivate } from "../configs/axios";
import { Response } from "../types/api";
import { SignUpRequest, LoginRequest } from "../features/auth/components";
import { User } from "../types/user";

const url = "/auth";

export type LoginResponse = {
  token: string;
};

const authService = {
  login: async (data: LoginRequest) => {
    const res: Response<LoginResponse> = await axiosClient.post(
      `${url}/login`,
      data
    );
    return res.data;
  },
  signUp: async (data: SignUpRequest) => {
    const res: Response<LoginResponse> = await axiosClient.post(
      `${url}/signup`,
      data
    );
    return res.data;
  },
  getProfile: async () => {
    const res: Response<User> = await axiosClientPrivate.get(`${url}/me`);
    return res.data;
  },
};

export const { login, signUp, getProfile } = authService;
