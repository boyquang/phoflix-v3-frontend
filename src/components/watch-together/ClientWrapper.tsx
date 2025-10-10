"use client";

import { Box, Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "../shared/Image";
import RootLayout from "../layout/RootLayout";
import Link from "next/link";
import { FaPodcast } from "react-icons/fa";
import ListRooms from "./room/ListRooms";
import PaginationCustom from "../shared/PaginationCustom";
import { getListRooms } from "@/lib/actions/watch-together.action";
import Loading from "@/app/loading";
import GuideCreateRoom from "./GuideCreateRoom";
import { AiFillPlusCircle } from "react-icons/ai";
import FilterOptions from "../shared/FilterOptions";

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
        const response = await getListRooms({
          page: page,
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
    <Box className="relative">
      <Box
        style={{
          maskImage: "linear-gradient(0deg,transparent 0,black 80%)",
          WebkitMaskImage: "linear-gradient(0deg,transparent 0,black 80%)",
        }}
        className="xl:h-[500px] md:h-[400px] sm:h-[250px] h-[200px] absolute top-0 left-0 right-0 w-full before:absolute before:inset-0 before:w-full before:h-full before:content-[''] before:bg-[url('/images/dotted.png')] before:bg-repeat before:filter-none before:z-[2] before:opacity-50 before:absolute before:inset-0"
      >
        <Box className="light-blur" />
        <Box
          style={{
            maskImage: "linear-gradient(0deg,transparent 0,black)",
            WebkitMaskImage: "linear-gradient(0deg,transparent 0,black)",
          }}
          className="absolute top-0 left-0 right-0 w-full h-full overflow-hidden"
        >
          <Image
            className="opacity-[1] z-10"
            src="/images/watch-together/live-cover2.webp"
            alt="Phòng xem chung - Xem phim cùng bạn bè"
          />
        </Box>
      </Box>
      <RootLayout>
        <Box className="lg:pt-28 pt-24 flex flex-col 2xl:gap-24 xl:gap-16 lg:gap-12 gap-6 relative z-20">
          <Box className="h-[140px] flex gap-4 items-center mx-auto">
            <Link
              href="/xem-chung/quan-ly"
              className="h-[54px] font-semibold inline-flex gap-2 hover:no-underline hover:opacity-75 items-center justify-center px-6 rounded-4xl bg-white text-black"
            >
              <FaPodcast />
              Quản lý
            </Link>
            <GuideCreateRoom
              trigger={
                <Button className="h-[54px] font-semibold inline-flex gap-2 hover:no-underline hover:opacity-75 items-center justify-center px-6 rounded-4xl bg-transparent text-white border border-white">
                  <AiFillPlusCircle />
                  Tạo mới
                </Button>
              }
            />
          </Box>

          <Box>
            <Box className="flex items-center gap-4 text-white">
              <h3 className="inline-block lg:text-2xl text-xl text-white font-semibold">
                Xem chung
              </h3>
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
                classNameGrid="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-4"
              />
            )}

            {data?.totalItems >= limit && (
              <PaginationCustom
                showToaster={false}
                currentPage={page}
                totalItems={data?.totalItems}
                itemsPerPage={limit}
                isScroll={true}
              />
            )}
          </Box>
        </Box>
      </RootLayout>
    </Box>
  );
};

export default ClientWrapper;
