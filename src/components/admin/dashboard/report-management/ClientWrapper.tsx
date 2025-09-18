"use client";

import Loading from "@/app/loading";
import { getReports } from "@/lib/actions/admin-client.action";
import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import TableReports from "./TableReports";
import PaginationCustom from "@/components/shared/PaginationCustom";

const limit = 20;

const ClientWrapper = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const { data: session, status } = useSession();
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getReports({
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
  }, [page, status]);

  if (loading) return <Loading />;

  return (
    <Box className="text-gray-50">
      <h1 className="lg:text-3xl text-xl">Quản lý báo cáo</h1>

      {response?.errorType === "InvalidToken" ||
      response?.errorType === "ServerError" ? (
        <p className="text-red-500 text-base mt-4">
          {response?.errorType === "InvalidToken"
            ? "Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại."
            : response?.message}
        </p>
      ) : (
        <>
          <TableReports
            items={response?.result?.reports}
            offset={(page - 1) * limit}
          />
          {response?.result?.totalItems >= limit && (
            <PaginationCustom
              currentPage={page}
              totalItems={response?.result?.totalItems}
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
