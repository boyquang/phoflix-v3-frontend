"use client";

import { generatePagination } from "@/lib/utils";
import { Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { toast } from "sonner";

interface PaginationCustomProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  theme?: "numberic" | "simple";
  isScroll?: boolean;
  showToaster?: boolean;
  callback?(): void;
}

const PaginationCustom = ({
  currentPage,
  totalItems,
  itemsPerPage,
  isScroll = true,
  theme = "numberic",
  showToaster = true,
  callback,
}: PaginationCustomProps) => {
  const router = useRouter();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginationItems = generatePagination(currentPage, totalPages);
  const [pending, startTransition] = useTransition();

  const handleChangePage = (page: number | string) => {
    const params = new URLSearchParams(window.location.search);

    params.set("page", page.toString());

    if (isScroll) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    startTransition(() => {
      router.replace(`?${params.toString()}`, { scroll: false });
    });

    if (showToaster) {
      toast.success(`Bạn đã chuyển đến trang ${page}`);
    }

    // Gọi callback nếu có
    if (callback) {
      callback();
    }
  };

  return (
    <div className="flex justify-center mt-16">
      {theme === "numberic" ? (
        <PaginationNumeric
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          paginationItems={paginationItems}
          onPageChange={handleChangePage}
        />
      ) : (
        <PaginationSimple
          onPrevious={() => {
            if (currentPage > 1) {
              handleChangePage(currentPage - 1);
            }
          }}
          onNext={() => {
            if (currentPage < totalPages) {
              handleChangePage(currentPage + 1);
            }
          }}
          onChangePage={handleChangePage}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default PaginationCustom;

interface PaginationNumericProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  paginationItems: (string | number)[];
  onPageChange(page: number | string): void;
}

const PaginationNumeric = ({
  currentPage,
  paginationItems,
  onPageChange,
}: PaginationNumericProps) => {
  return (
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
              onClick={() => onPageChange(page)}
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
  );
};

interface PaginationSimpleProps {
  onPrevious(): void;
  onNext(): void;
  onChangePage: (page: number | string) => void;
  totalPages: number;
  currentPage: number;
}

const buttonClass =
  "flex items-center justify-center text-md rounded-full w-[50px] h-[50px] text-white bg-[#2f3346] hover:opacity-80";

const PaginationSimple = ({
  onPrevious,
  onNext,
  onChangePage,
  totalPages,
  currentPage,
}: PaginationSimpleProps) => {
  const [pageInput, setPageInput] = useState<string>(currentPage.toString());

  useEffect(() => {
    setPageInput(currentPage.toString());
  }, [currentPage]);

  const handleChangePage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const page = e.target.value;
    if (!page) {
      setPageInput("");
      return;
    }

    const pageNum = Number(page);
    const clamped = Math.max(1, Math.min(totalPages, pageNum));
    setPageInput(clamped.toString());
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={onPrevious}
        disabled={currentPage <= 1}
        className={buttonClass}
      >
        <FaArrowLeft />
      </Button>
      <div className="flex items-center gap-2 px-4 h-[50px] text-white bg-[#2f3346] rounded-full">
        <span>Trang</span>
        <Input
          type="number"
          value={pageInput}
          onChange={handleChangePage}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const pageNum = Number(pageInput);
              if (pageNum >= 1 && pageNum <= totalPages) {
                onChangePage(pageNum);
              }
            }
          }}
          max={totalPages}
          className="w-16 h-8 border border-[#ffffff10] transition-all duration-200 focus:border-[#ffffff40]"
        />
        <span>/ {totalPages}</span>
      </div>
      <Button
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className={buttonClass}
      >
        <span>
          <FaArrowRight />
        </span>
      </Button>
    </div>
  );
};
