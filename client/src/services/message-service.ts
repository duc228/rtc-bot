import { axiosClientPrivate } from "../configs/axios";
import { OffsetPagination } from "../types/pagination";
import queryString from "query-string";

const url = "/message";

const messageService = {
  getMessagesByConversationId: async (
    conversationId: number,
    params: Partial<OffsetPagination>
  ) => {
    const path = queryString.stringifyUrl({
      url: url,
      query: params,
    });
    console.log("path", path);
    // return axiosClientPrivate.get(path);
    return axiosClientPrivate.get(
      `${url}/${conversationId}?limit=${params.limit}&page=${params.page}`
    );
  },
};

export const { getMessagesByConversationId } = messageService;
