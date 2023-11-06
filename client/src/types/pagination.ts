export type OffsetPagination = {
  page: number;
  limit: number;
};

export type PaginationResponse<T> = {
  data: T;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  first: number;
  last: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number;
  prevPage: number;
};
