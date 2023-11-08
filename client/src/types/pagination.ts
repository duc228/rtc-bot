export type OffsetPagination = {
  page: number;
  limit: number;
};

export type PaginationResponse<T> = {
  data: T;
  pagination: Pagination;
};

export type Pagination = {
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
