import { axiosClientPrivate } from "../configs/axios";
import { OffsetPagination } from "../types/pagination";

const url = "/message";

const messageService = {
  getMessagesByConversationId: async (
    conversationId: number,
    params: Partial<OffsetPagination>
  ) => {
    return axiosClientPrivate.get(
      `${url}/${conversationId}?limit=${params.limit}&page=${params.page}`
    );
  },
  createMessage: (data: any) => {
    return axiosClientPrivate.post(`${url}/`, data);
  },
};

export const { getMessagesByConversationId, createMessage } = messageService;
