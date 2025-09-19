"use client";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import StatusSelectorFilter from "./StatusSelecterFilter";
import TableMovieRequest from "./TableMovieRequest";
import PaginationCustom from "@/components/shared/PaginationCustom";
import { useEffect, useState } from "react";
import { getMovieRequests } from "@/lib/actions/admin-client.action";
import { toast } from "sonner";
import { Box } from "@chakra-ui/react";
import Loading from "@/app/loading";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

type StatusType = "all" | "pending" | "approved" | "rejected";

const limit = 20;

const ClientWrapper = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const status = (searchParams.get("status") as StatusType) || "all";
  const { data: session, status: sessionStatus } = useSession();
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { triggerRefresh } = useSelector((state: RootState) => state.system);

  useEffect(() => {
    if (sessionStatus !== "authenticated") return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getMovieRequests({
          page,
          limit,
          accessToken: session?.user?.accessToken as string,
          status,
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
  }, [page, status, sessionStatus, triggerRefresh]);

  if (loading) return <Loading height="h-96" />;

  return (
    <Box className="text-gray-50">
      <div className="flex items-center justify-between">
        <h1 className="lg:text-3xl text-xl">Quản lý yêu cầu phim</h1>
        {!response?.errorType && (
          <StatusSelectorFilter status={status || "all"} />
        )}
      </div>

      {response?.errorType === "InvalidToken" ||
      response?.errorType === "ServerError" ? (
        <p className="text-red-500 text-base mt-4">
          {response?.errorType === "InvalidToken"
            ? "Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại."
            : response?.message}
        </p>
      ) : (
        <>
          <TableMovieRequest
            items={response?.result?.items || []}
            offset={(page - 1) * limit}
          />
          {response?.result?.item_count >= limit && (
            <PaginationCustom
              currentPage={page}
              totalItems={response?.result?.item_count || 0}
              itemsPerPage={limit}
              isScroll={true}
              showToaster={false}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default ClientWrapper;
