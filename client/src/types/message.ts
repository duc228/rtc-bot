import { Base } from "./base";

export type Message = {
  content: string;
  userId: string;
} & Base;
