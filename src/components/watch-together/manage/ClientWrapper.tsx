"use client";

import RootLayout from "@/components/layout/RootLayout";
import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import GuideCreateRoom from "../GuideCreateRoom";
import { GoPlus } from "react-icons/go";
import FilterOptions from "@/components/shared/FilterOptions";
import ListRooms from "../room/ListRooms";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getListRoomsByUser } from "@/lib/actions/watch-together.action";
import PaginationCustom from "@/components/shared/PaginationCustom";
import Loading from "@/app/loading";
import BackButton from "@/components/shared/BackButton";

const ClientWrapper = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const limit = 12;
  const { data: session, status } = useSession();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getListRoomsByUser({
          userId: session?.user?.id as string,
          page,
          limit,
          accessToken: session?.user?.accessToken as string,
        });

        if (response?.status) {
          setData(response?.result || null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [status, page]);

  if (status !== "authenticated") return <Box className="min-h-screen" />;

  return (
    <RootLayout>
      <Box className="lg:pt-28 pt-24 min-h-[50vh] ">
        <Box className="flex items-center gap-4 text-white mb-8">
          <BackButton href="/xem-chung" />
          <h3 className="inline-block lg:text-2xl text-xl text-white font-semibold md:flex-grow-0 flex-grow-1">
            Quản lý
          </h3>
          <GuideCreateRoom
            trigger={
              <Button className="bg-white gap-1 h-[30px] hover:opacity-75 text-black rounded-full text-xs px-2 py-0.5">
                <GoPlus />
                Tạo mới
              </Button>
            }
          />
          <FilterOptions
            options={[
              { label: "Tất cả", value: "all" },
              { label: "Đã kết thúc", value: "ended" },
            ]}
            onChange={(value) => console.log(value)}
          />
        </Box>

        {loading ? (
          <Loading type="bars" height="h-[360px]"/>
        ) : (
          <ListRooms
            rooms={data?.rooms}
            classNameGrid="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
          />
        )}

        {data?.totalItems >= limit && (
          <PaginationCustom
            totalItems={data?.totalItems}
            itemsPerPage={limit}
            currentPage={page}
            showToaster={false}
          />
        )}
      </Box>
    </RootLayout>
  );
};

export default ClientWrapper;
