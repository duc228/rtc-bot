export type Response<T> = {
  code: number;
  data: T;
};

export type ErrorResponse<T> = {
  error: T;
};
