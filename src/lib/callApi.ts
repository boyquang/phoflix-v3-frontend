import { RESPONSE_FAIL } from "@/constants/api-response.contant";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiRequestParams {
  method?: HttpMethod;
  body?: any;
  accessToken?: string;
  url: string;
}

export const callApi = async <T>({
  url,
  method = "GET",
  body,
  accessToken,
}: ApiRequestParams): Promise<ResponseApi<T>> => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data: ResponseApi<T> = await response.json();

    if (!response.ok) {
      return {
        status: data.status || false,
        message: data.message || "Lỗi server! Vui lòng thử lại sau.",
        result: data.result || null,
      };
    }

    return {
      status: true,
      message: data.message || "Thành công",
      result: data.result || null,
    };
  } catch (error) {
    console.error("API call error:", error);
    return RESPONSE_FAIL;
  }
};
