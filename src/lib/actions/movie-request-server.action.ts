import {
  ENV,
  NEXT_PUBLIC_API_VERSION,
  NEXT_PUBLIC_BACKEND_URL,
} from "../../constants/env.contant";

const BASE_URL = `${NEXT_PUBLIC_BACKEND_URL}/api/${NEXT_PUBLIC_API_VERSION}/user`;

interface GetMovieRequest {
  limit: number;
  userId: string;
  status: "all" | "pending" | "approved" | "rejected";
  afterTime?: number | null;
}

export const getMovieRequests = async ({
  limit,
  userId,
  status,
  afterTime,
}: GetMovieRequest): Promise<any> => {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
      userId,
      status,
    });

    if (afterTime) {
      params.append("afterTime", afterTime.toString());
    }

    const url = `${BASE_URL}/movieRequests?${params.toString()}`;

    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
      const { status, message, result } = data || {};
      return {
        status: status || false,
        message: message || "Lỗi server! Vui lòng thử lại sau.",
        result: result || null,
      };
    }

    return data;
  } catch (error) {
    if (ENV === "development") {
      console.log("Error fetching movie requests:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

interface CreateMovieRequest {
  userId: string;
  movieName: string;
  releaseYear?: number | string | null;
  country?: string | null;
  genre?: string | null;
  description?: string | null;
}

export const createMovieRequest = async ({
  userId,
  movieName,
  releaseYear,
  country,
  genre,
  description,
}: CreateMovieRequest): Promise<any> => {
  try {
    const url = `${BASE_URL}/movieRequest`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        movieName,
        releaseYear: releaseYear ? parseInt(releaseYear as string) : undefined,
        country: country ? country.trim() : undefined,
        genre: genre ? genre.trim() : undefined,
        description: description ? description.trim() : undefined,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const { status, message, result } = data || {};
      return {
        status: status || false,
        message: message || "Lỗi server! Vui lòng thử lại sau.",
        result: result || null,
      };
    }

    return data;
  } catch (error) {
    if (ENV === "development") {
      console.log("Error creating movie request:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

interface DeleteMovieRequest {
  userId: string;
  requestId: string;
}

export const deleteMovieRequest = async ({
  userId,
  requestId,
}: DeleteMovieRequest): Promise<any> => {
  try {
    const params = new URLSearchParams({
      userId,
      requestId,
    });

    const url = `${BASE_URL}/movieRequest?${params.toString()}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      const { status, message, result } = data || {};
      return {
        status: status || false,
        message: message || "Lỗi server! Vui lòng thử lại sau.",
        result: result || null,
      };
    }

    return data;
  } catch (error) {
    if (ENV === "development") {
      console.log("Error deleting movie request:", error);
    }
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};
