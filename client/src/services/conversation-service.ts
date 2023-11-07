import { axiosClientPrivate } from "../configs/axios";
import { Conversation } from "../types/conversation";
import { OffsetPagination, PaginationResponse } from "../types/pagination";
// import queryString from "query-string";

const url = "/conversations";

const conversationService = {
  getConverastionByUserId: async (params: Partial<OffsetPagination>) => {
    const res: PaginationResponse<Conversation[]> =
      await axiosClientPrivate.get(
        `${url}/?limit=${params.limit}&page=${params.page}`
      );

    return res.data;
  },
};

export const { getConverastionByUserId } = conversationService;
