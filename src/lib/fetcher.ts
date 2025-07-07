export const REVALIDATE_TIME = 60 * 60; // 1 hour
export const IS_SUCCESS = "success";

/**
 *
 * @param url - URL để lấy dữ liệu.
 * @param options - Các tùy chọn fetch (tuỳ chọn), bao gồm cả timeout.
 * @param options.timeout - Thời gian chờ tối đa (tính bằng mili giây), mặc định là 10000ms.
 * @returns - Một Promise trả về kết quả từ yêu cầu fetch.
 * @throws - Ném ra lỗi nếu yêu cầu bị quá thời gian hoặc fetch thất bại.
 *
 * Hàm này sử dụng Fetch API để gửi yêu cầu HTTP kèm tính năng timeout.
 * Nếu yêu cầu mất nhiều thời gian hơn thời gian timeout đã chỉ định, nó sẽ bị hủy bỏ.
 */

export const fetcher = async (
  url: string,
  options?: RequestInit & { timeout?: number }
) => {
  const controller = new AbortController();
  const timeout = options?.timeout || 20000;
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    return response;
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error(`Request to ${url} timed out after ${timeout}ms`);
    }
    throw error;
  } finally {
    clearTimeout(id);
  }
};
