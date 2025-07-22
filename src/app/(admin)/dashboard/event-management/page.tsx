import Loading from "@/app/loading";
import { PageProps } from "@/app/page";
import EventDialog from "@/components/admin/dashboard/event-management/EventDialog";
import TableEvents from "@/components/admin/dashboard/event-management/TableEvents";
import AddNewButton from "@/components/shared/AddNewButton";
import { getEventList } from "@/lib/actions/eventAction";
import { Suspense } from "react";

const Page = async ({ params, searchParams }: PageProps) => {
  const response = await getEventList();
  const { status, result } = response || {};

  console.log("Event List Response:", response);
  console.log("Event List Result:", result);

  return (
    <Suspense fallback={<Loading type="bars" />}>
      <div className="text-gray-50">
        <div className="flex items-center justify-between">
          <h1 className="lg:text-3xl text-xl font-semibold">Quản lý sự kiện</h1>
          <EventDialog
            action="create"
            trigger={<AddNewButton label="Thêm sự kiện" size="sm" />}
          />
        </div>
        <div className="mt-8">
          <TableEvents items={result} offset={0} />
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
