import { axiosClientPrivate } from "../configs/axios";
import { OffsetPagination } from "../types/pagination";
import queryString from "query-string";

const url = "/conversation";

const conversationService = {
  getConverastionByUserId: async (params: Partial<OffsetPagination>) => {
    const path = queryString.stringifyUrl({
      url: url,
      query: params,
    });
    // console.log("path", path);
    // return axiosClientPrivate.get(path);
    return axiosClientPrivate.get(
      `${url}/?limit=${params.limit}&page=${params.page}`
    );
  },
};

export const { getConverastionByUserId } = conversationService;
