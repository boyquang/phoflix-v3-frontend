import Loading from "@/app/loading";
import { PageProps } from "@/app/page";
import { auth } from "@/auth";
import ClientWrapper from "@/components/admin/dashboard/event-management/ClientWrapper";
import EventDialog from "@/components/admin/dashboard/event-management/EventDialog";
import TableEvents from "@/components/admin/dashboard/event-management/TableEvents";
import AddNewButton from "@/components/shared/AddNewButton";
import { getEventList } from "@/lib/actions/event.action";
import { Suspense } from "react";

const Page = async ({ params, searchParams }: PageProps) => {
  // const session = await auth();
  // const response = await getEventList(session?.user?.accessToken as string);

  // const result = response?.result || [];
  // const errorType = response?.errorType;
  // const message = response?.message || "Lỗi hệ thống. Vui lòng thử lại sau!";

  return (
    <Suspense fallback={<Loading type="bars" height="h-96" />}>
      {/* <div className="text-gray-50">
        <div className="flex items-center justify-between">
          <h1 className="lg:text-3xl text-xl font-semibold">Quản lý sự kiện</h1>
          {!errorType && (
            <EventDialog
              action="create"
              trigger={<AddNewButton label="Thêm sự kiện" size="sm" />}
            />
          )}
        </div>
        <div className="mt-8">
          {errorType === "InvalidToken" || errorType === "ServerError" ? (
            <div className="text-red-500 text-base">{message}</div>
          ) : (
            <TableEvents items={result} offset={0} />
          )}
        </div>
      </div> */}
      <ClientWrapper />
    </Suspense>
  );
};

export default Page;
