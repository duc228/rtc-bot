import { Base } from "./base";

export type Message = {
  content: string;
  isBot: boolean;
} & Base;
