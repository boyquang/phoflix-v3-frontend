type ResponseApi<T> = {
  status: boolean;
  message: string;
  result: T | null;
};
