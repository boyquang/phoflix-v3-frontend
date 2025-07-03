type MovieRequestStatus = "pending" | "approved" | "rejected" | "all";

interface MovieRequest {
  id: string;
  movie_name: string;
  description: string | null;
  release_year: number | null;
  country: string | null;
  genre: string | null;
  admin_response: string | null;
  username: string;
  status: MovieRequestStatus;
  created_at: string;
}
