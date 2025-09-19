"use client";

import { getUsers } from "@/lib/actions/admin-client.action";
import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import TableUsers from "./TableUsers";
import PaginationCustom from "@/components/shared/PaginationCustom";
import Loading from "@/app/loading";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

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
        const response = await getUsers({
          page: page,
          limit: 20,
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
    <Box className="text-gray-50">
      <h1 className="lg:text-3xl text-xl">Quản lý người dùng</h1>

      {response?.errorType === "ServerError" ||
      response?.errorType === "InvalidToken" ? (
        <p className="text-red-500 text-base mt-4">
          {response?.errorType === "InvalidToken"
            ? "Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại."
            : response?.message}
        </p>
      ) : (
        <>
          <TableUsers
            items={response?.result?.users}
            offset={(page - 1) * 20}
          />
          {response?.result?.totalItems >= 20 && (
            <PaginationCustom
              currentPage={page}
              totalItems={response?.result?.totalItems}
              itemsPerPage={20}
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
