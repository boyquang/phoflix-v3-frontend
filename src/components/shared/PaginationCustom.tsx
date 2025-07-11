"use client";

import useNotification from "@/hooks/useNotification";
import { generatePagination } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface PaginationCustomProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  isScroll?: boolean;
  showToaster?: boolean;
  callback?(): void;
}

const PaginationCustom = ({
  currentPage,
  totalItems,
  itemsPerPage,
  isScroll = true,
  showToaster = true,
  callback,
}: PaginationCustomProps) => {
  const router = useRouter();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginationItems = generatePagination(currentPage, totalPages);
  const [pending, startTransition] = useTransition();
  const { notificationAlert } = useNotification();

  const handleChangePage = (page: number | string) => {
    const params = new URLSearchParams(window.location.search);

    params.set("page", page.toString());

    startTransition(() => {
      router.replace(`?${params.toString()}`, { scroll: false });
    });

    if (isScroll) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (showToaster) {
      notificationAlert({
        title: "Thông báo",
        description: `Bạn đã chuyển đến trang ${page}`,
      });
    }

    // Gọi callback nếu có
    if (callback) {
      callback();
    }
  };

  return (
    <div className="flex justify-center mt-12">
      <div className="flex flex-wrap gap-2 justify-center items-center">
        {paginationItems?.map((page: string | number, index: number) => {
          if (page === "...") {
            return (
              <div
                key={index}
                className="flex select-none rounded-md text-sm bg-[#2a314e] items-center justify-center px-4 py-2 text-gray-100"
              >
                {page}
              </div>
            );
          } else {
            return (
              <button
                onClick={() => handleChangePage(page)}
                disabled={page === currentPage}
                key={index}
                className={`inline-flex text-sm select-none font-semibold items-center justify-center px-4 py-2 text-gray-100 rounded-md ${
                  page === currentPage
                    ? "bg-primary text-gray-900 cursor-not-allowed"
                    : "bg-[#2a314e] text-gray-100 cursor-pointer hover:opacity-80 transition-all duration-200"
                }`}
              >
                {page}
              </button>
            );
          }
        })}
      </div>
    </div>
  );
};

export default PaginationCustom;
