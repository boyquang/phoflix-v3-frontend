"use client";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import MovieRequestDialog from "./MovieRequestDialog";
import MovieRequestTabs from "./MovieRequestTabs";
import MovieRequests, { IMovieRequest } from "./MovieRequests";
import { useEffect, useState } from "react";
import { getMovieRequests } from "@/lib/actions/movie-request-server.action";
import Loading from "@/app/loading";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type Data = {
  items: IMovieRequest[];
  has_more: boolean;
  total_items: number;
  status: "pending" | "approved" | "rejected" | "all";
};

const dataDefault: Data = {
  items: [],
  has_more: false,
  total_items: 0,
  status: "all",
};

const ClientWrapper = () => {
  const { data: session, status: sessionStatus } = useSession();
  const searchParams = useSearchParams();
  const [data, setData] = useState<any>(dataDefault);
  const [loading, setLoading] = useState<boolean>(false);
  const { refreshMovieRequests } = useSelector(
    (state: RootState) => state.user.movieRequest
  );
  const status = searchParams.get("tab")
    ? String(searchParams.get("tab"))
    : "all";
  const afterTime = searchParams.get("afterTime")
    ? Number(searchParams.get("afterTime"))
    : 0;
  const limit = 10;

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getMovieRequests({
          userId: session.user.id as string,
          status: status as "pending" | "approved" | "rejected" | "all",
          limit,
          afterTime,
        });

        setData(response?.result);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session?.user?.id, status, afterTime, refreshMovieRequests]);

  if (sessionStatus === "loading") return <Loading type="bars" height="h-96" />;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg text-gray-50">Yêu cầu phim</h3>
        <MovieRequestDialog />
      </div>
      <MovieRequestTabs />

      {loading ? (
        <Loading type="bars" height="h-96" />
      ) : (
        <MovieRequests data={data} />
      )}
    </div>
  );
};

export default ClientWrapper;
