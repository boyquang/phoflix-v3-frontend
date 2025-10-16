type ApiResponse<T> = {
  status: boolean;
  message: string;
  result: T | null;
};
