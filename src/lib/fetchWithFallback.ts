import { fetcher } from "./fetcher";

/**
 * Thực hiện yêu cầu fetch với URL chính và URL dự phòng.
 * Nếu yêu cầu với URL chính thất bại (không trả về mã trạng thái 2xx),
 * nó sẽ tự động thử lại với URL dự phòng.
 * @param primaryUrl - URL chính để lấy dữ liệu.
 * @param fallbackUrl - URL dự phòng để lấy dữ liệu nếu URL chính thất bại.
 * @param options - Các tùy chọn fetch (tuỳ chọn).
 * @returns - Một Promise trả về kết quả từ yêu cầu fetch.
 * @throws - Ném ra lỗi nếu cả hai yêu cầu đều thất bại.
 */

export async function fetchWithFallback(
  primaryUrl: string,
  fallbackUrl: string,
  options?: RequestInit
) {
  const res = await fetcher(primaryUrl, options);
  if (res.ok) return res;

  const fallbackRes = await fetcher(fallbackUrl, options);
  if (fallbackRes.ok) return fallbackRes;

  return new Response(null, {
    status: 500,
    statusText: "Đã có lỗi xảy ra.Vui lòng liên hệ quản trị viên.",
  });
}
