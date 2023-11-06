import { MessageResponse } from "./../types/message";
import { axiosClientPrivate } from "../configs/axios";
import { Message, MessageRequest } from "../types/message";
import { OffsetPagination, PaginationResponse } from "../types/pagination";

const url = "/messages";

const messageService = {
  getMessagesByConversationId: async (
    conversationId: number,
    params: Partial<OffsetPagination>
  ) => {
    const res: PaginationResponse<Message[]> = await axiosClientPrivate.get(
      `${url}/${conversationId}?limit=${params.limit}&page=${params.page}`
    );
    return res;
  },
  createMessage: async (data: MessageRequest) => {
    const res: MessageResponse = await axiosClientPrivate.post(`${url}/`, data);
    return res;
  },
};

export const { getMessagesByConversationId, createMessage } = messageService;
