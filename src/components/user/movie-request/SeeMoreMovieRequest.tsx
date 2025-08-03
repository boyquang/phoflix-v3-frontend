"use client";

import { getNotifications } from "@/lib/actions/notification-client-action";
import { Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { MovieRequest } from "./MovieRequests";
import { getMovieRequests } from "@/lib/actions/movie-request-server.action";

interface SeeMoreMovieRequestProps {
  movieRequests: MovieRequest[];
  setMovieRequests: (movieRequest: MovieRequest[]) => void;
  hasMore: boolean;
}

const SeeMoreMovieRequest = ({
  movieRequests,
  setMovieRequests,
  hasMore,
}: SeeMoreMovieRequestProps) => {
  const params = useSearchParams();
  const tab = params.get("tab") || "all";
  const { data: session } = useSession();
  const [pending, startTransition] = useTransition();
  const [hasMore_, setHasMore] = useState(hasMore);

  useEffect(() => {
    setHasMore(hasMore);
  }, [hasMore]);

  const isTabValid = ["all", "pending", "approved", "rejected"].includes(tab);
  const activeTab = isTabValid
    ? (tab as "all" | "pending" | "approved" | "rejected")
    : "all";

  const handleSeeMoreMovieRequest = () => {
    startTransition(async () => {
      const response = await getMovieRequests({
        limit: 5,
        status: session ? activeTab : "all",
        userId: session?.user?.id as string,
        afterTime:
          Number(movieRequests[movieRequests?.length - 1]?.created_at) || null,
      });

      const newMovieRequest = response?.result?.items ?? [];
      const hasMore = response?.result?.has_more ?? false;

      setMovieRequests([...movieRequests, ...newMovieRequest]);
      setHasMore(hasMore);
    });
  };

  if (!hasMore_) return null;

  return (
    <span
      onClick={handleSeeMoreMovieRequest}
      className="text-[#ffd875] text-sm mt-6 inline-flex  gap-1 items-center cursor-pointer hover:underline"
    >
      Xem thêm
      {pending ? <Spinner size="sm" /> : <FaAngleDown />}
    </span>
  );
};

export default SeeMoreMovieRequest;
