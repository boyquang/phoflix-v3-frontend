"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import EventDialog from "./EventDialog";
import AddNewButton from "@/components/shared/AddNewButton";
import TableEvents from "./TableEvents";
import { getEventList } from "@/lib/actions/event.action";
import { toast } from "sonner";
import Loading from "@/app/loading";

const ClientWrapper = () => {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const [triggerRefresh, setTriggerRefresh] = useState<boolean>(false);

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getEventList(
          session?.user?.accessToken as string
        );

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
  }, [status, triggerRefresh]);

  if (loading) return <Loading />;

  return (
    <div className="text-gray-50">
      <div className="flex items-center justify-between">
        <h1 className="lg:text-3xl text-xl font-semibold">Quản lý sự kiện</h1>
        {!response?.errorType && (
          <EventDialog
            triggerRefresh={() => setTriggerRefresh(!triggerRefresh)}
            action="create"
            trigger={<AddNewButton label="Thêm sự kiện" size="sm" />}
          />
        )}
      </div>
      <div className="mt-8">
        {response?.errorType === "InvalidToken" ||
        response?.errorType === "ServerError" ? (
          <div className="text-red-500 text-base">{response?.message}</div>
        ) : (
          <TableEvents
            triggerRefresh={() => setTriggerRefresh(!triggerRefresh)}
            items={response?.result}
            offset={0}
          />
        )}
      </div>
    </div>
  );
};

export default ClientWrapper;
