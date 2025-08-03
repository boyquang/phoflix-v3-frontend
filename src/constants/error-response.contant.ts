interface ErrorResponse<T = any> {
  status: boolean;
  message: string;
  result: T;
}

type ErrorResponseKey = "default" | "notFound" | "unauthorized";

export const ErrorResponses: Record<ErrorResponseKey, ErrorResponse> = {
  default: {
    status: false,
    message: "Lỗi server! Vui lòng thử lại sau.",
    result: null,
  },
  notFound: {
    status: false,
    message: "Không tìm thấy dữ liệu yêu cầu.",
    result: null,
  },
  unauthorized: {
    status: false,
    message: "Bạn không có quyền truy cập vào dữ liệu này.",
    result: null,
  },
};

/**
 * 
 * @param status Mã lỗi HTTP (mặc định là -1)
 * @returns Đối tượng ErrorResponse tương ứng với mã lỗi
 */

export const getKeyErrorResponse = (status: number = -1): ErrorResponse => {
  switch (status) {
    case 404:
      return ErrorResponses.notFound;
    case 401:
      return ErrorResponses.unauthorized;
    default:
      return ErrorResponses.default;
  }
};
