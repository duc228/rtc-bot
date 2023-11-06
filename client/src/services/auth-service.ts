import axiosClient, { axiosClientPrivate } from "../configs/axios";
import { Response } from "../types/api";
import { SignUpRequest, LoginRequest } from "../features/auth/components";

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
  getProfile: () => axiosClientPrivate.get(`${url}/me`),
};

export const { login, signUp, getProfile } = authService;
