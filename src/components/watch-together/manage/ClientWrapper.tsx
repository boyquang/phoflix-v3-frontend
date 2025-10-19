"use client";

import RootLayout from "@/components/layout/RootLayout";
import { Box, Button } from "@chakra-ui/react";
import GuideCreateRoom from "../GuideCreateRoom";
import { GoPlus } from "react-icons/go";
import FilterOptions from "@/components/shared/FilterOptions";
import ListRooms from "../ListRooms";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import PaginationCustom from "@/components/shared/PaginationCustom";
import Loading from "@/app/loading";
import BackButton from "@/components/shared/BackButton";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setWatchTogetherByKey } from "@/store/slices/watch-together-v2.slice";
import { getListRooms } from "@/store/async-thunks/watch-together-v2.thunk";

interface ClientWrapperProps {
  page: number;
  limit: number;
}

const ClientWrapper = ({ page, limit }: ClientWrapperProps) => {
  const { data: session, status } = useSession();
  const { filter, listRooms, loading } = useSelector(
    (state: RootState) => state.watchTogetherV2
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (status !== "authenticated") return;

    dispatch(
      getListRooms({
        accessToken: session?.user?.accessToken as string,
        page,
        limit,
        status: filter,
        scope: "user",
      })
    );
  }, [status, page, filter]);

  if (status === "loading") return <Loading type="bars" />;
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
              { label: "Đang chiếu", value: "active" },
              { label: "Đang chờ", value: "pending" },
              { label: "Đã kết thúc", value: "ended" },
            ]}
            onChange={(value) => {
              dispatch(setWatchTogetherByKey({ key: "filter", value }));
            }}
          />
        </Box>

        {loading.fetchRooms ? (
          <Loading type="bars" height="h-[360px]" />
        ) : (
          <ListRooms
            scope="user"
            rooms={listRooms.rooms}
            classNameGrid="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 lg:gap-4 gap-6"
          />
        )}

        {listRooms.totalItems >= limit && (
          <PaginationCustom
            totalItems={listRooms.totalItems}
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
