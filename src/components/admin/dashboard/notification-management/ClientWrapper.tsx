"use client";

import Loading from "@/app/loading";
import AddNewButton from "@/components/shared/AddNewButton";
import NotificationDialog from "@/components/user/notification/NotificationDialog";
import { getNotifications } from "@/lib/actions/admin-client.action";
import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import TableNotifications from "./TableNotifications";
import PaginationCustom from "@/components/shared/PaginationCustom";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const limit = 20;

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
        const response = await getNotifications({
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
    <Box className="text-gray-50">
      <div className="flex items-center justify-between">
        <h1 className="lg:text-3xl text-xl font-semibold">Quản lý thông báo</h1>
        {!response?.errorType && (
          <NotificationDialog
            trigger={
              <AddNewButton size="sm" label="Tạo thông báo" rounded="full" />
            }
          />
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
          <TableNotifications
            offset={(page - 1) * limit}
            items={response?.result?.notifications}
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
