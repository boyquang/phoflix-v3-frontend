"use client";

import { Box } from "@chakra-ui/react";
import DeleteSelectedMovies from "../DeleteSeletedMovies";
import DeleteAllMovies from "../DeleteAllMovies";
import MovieSection from "../MovieSection";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { getUserMovies } from "@/lib/actions/user-movie.action";
import { toast } from "sonner";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const limit = 18;

const ClientWrapper = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const { data: session, status } = useSession();
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { triggerRefresh } = useSelector((state: RootState) => state.system);

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getUserMovies({
          userId: session?.user?.id as string,
          type: "history",
          page: page,
          limit,
          accessToken: session?.user?.accessToken as string,
        });

        if (response?.status) {
          setResponse(response);
        }
      } catch (error) {
        toast.error(
          "Lỗi hệ thống. Vui lòng thử lại sau hoặc liên hệ quản trị viên!"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, status, triggerRefresh]);

  if (loading) return <Loading height="h-96" />;

  return (
    <>
      <Box className="flex items-center justify-between gap-2">
        <h3 className="text-lg text-gray-50">Lịch sử xem</h3>
        <Box className="flex items-center gap-2">
          {response?.result?.movies?.length >= 2 && (
            <DeleteSelectedMovies type="history" />
          )}
          {response?.result?.movies?.length >= 3 && (
            <DeleteAllMovies type="history" />
          )}
        </Box>
      </Box>
      <MovieSection
        movies={response?.result?.movies}
        totalItems={response?.result?.totalItems}
        totalItemsPerPage={response?.result?.totalItemsPerPage}
        currentPage={page}
        limit={limit}
        type="history"
      />
    </>
  );
};

export default ClientWrapper;
