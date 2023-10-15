import { Base } from "./base";

export const Role = {
  USER: 0,
};

export type User = {
  email: string;
  password: string;
  fullName: string;
  isActive: boolean;
  role: number;
} & Base;
