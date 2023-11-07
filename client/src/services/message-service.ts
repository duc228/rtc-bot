import { MessageResponse } from "./../types/message";
import { axiosClientPrivate } from "../configs/axios";
import { Message, MessageRequest } from "../types/message";
import { OffsetPagination, PaginationResponse } from "../types/pagination";
import { Response } from "../types/api";

const url = "/messages";

const messageService = {
  getMessagesByConversationId: async (
    conversationId: number,
    params: Partial<OffsetPagination>
  ) => {
    const res: PaginationResponse<Message[]> = await axiosClientPrivate.get(
      `${url}/${conversationId}?limit=${params.limit}&page=${params.page}`
    );
    return res.data;
  },
  createMessage: async (data: MessageRequest) => {
    const res: Response<MessageResponse> = await axiosClientPrivate.post(
      `${url}/`,
      data
    );
    return res.data;
  },
};

export const { getMessagesByConversationId, createMessage } = messageService;
