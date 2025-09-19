"use client";

import { Box } from "@chakra-ui/react";
import SlugSelectorFilter from "./SlugSelectorFilter";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import TableFeedbacks from "./TableFeedbacks";
import PaginationCustom from "@/components/shared/PaginationCustom";
import { getFeedbacks } from "@/lib/actions/admin-client.action";
import { toast } from "sonner";
import Loading from "@/app/loading";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const ClientWrapper = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const slug = searchParams.get("slug")
    ? searchParams.get("slug")?.toString()
    : "all";
  const { data: session, status } = useSession();
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { triggerRefresh } = useSelector((state: RootState) => state.system);
  const limit = 20;

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getFeedbacks({
          page,
          limit,
          accessToken: session?.user?.accessToken as string,
          slug,
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
  }, [page, status, slug, triggerRefresh]);

  if (loading) return <Loading height="h-96" />;

  return (
    <Box className="text-gray-50">
      <div className="flex items-center justify-between">
        <h1 className="lg:text-3xl text-xl">Quản lý phản hồi</h1>
        {!response?.errorType && (
          <SlugSelectorFilter slugs={response?.result?.slugs || []} />
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
          <TableFeedbacks
            items={response?.result?.feedbacks || []}
            offset={(page - 1) * limit}
          />
          {response?.result?.totalItems >= limit && (
            <PaginationCustom
              currentPage={page}
              totalItems={response?.result?.totalItems || 0}
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
