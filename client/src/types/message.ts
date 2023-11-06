import { Base } from "./base";

export type Message = {
  content: string;
  userId: number;
  conversationId: number;
} & Base;

export type MessageRequest = {
  content: string;
  conversationId: number;
};

export type MessageResponse = {
  message: Message;
  messageBot: Message;
};
