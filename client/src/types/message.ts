import { Base } from "./base";

export type Message = {
  content: string;
  userId: number;
  conversationId: number;
} & Base;
