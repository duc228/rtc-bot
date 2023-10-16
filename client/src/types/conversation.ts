import { Base } from "./base";
import { Message } from "./message";

export type Conversation = {
  userId: number;
  messages?: Message[];
  lastMessageId?: number;
} & Base;
