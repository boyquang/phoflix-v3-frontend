"use client";

import { updateSearchParams } from "@/lib/utils";
import { Box, Spinner } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import FilterItem from "./FilterItem";
import { isEqual } from "lodash";
import { filterOptions } from "@/constants/filter-movie.contant";
import Refreshicon from "../icons/RefresIcon";
import useScrollIntoView from "@/hooks/useScrollIntoView";
import { FaFilter } from "react-icons/fa6";

const options = {
  country: "",
  category: "",
  year: "",
  sort_lang: "",
  sort_type: "desc",
};

type FilterOptions = typeof options;

const FilterBox = () => {
  const [filter, setFilter] = useState<FilterOptions>(options);
  const [showFilter, setShowFilter] = useState(true);
  const [pending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();
  const elementScrollRef = useRef<HTMLDivElement | null>(null);

  const objSearchParams = {
    country: searchParams.get("country") || "",
    category: searchParams.get("category") || "",
    year: searchParams.get("year") || "",
    sort_lang: searchParams.get("sort_lang") || "",
    sort_type: searchParams.get("sort_type") || "desc",
  };

  // đồng bộ filter với searchParams
  useEffect(() => {
    setFilter(objSearchParams);
  }, [searchParams]);

  const handleSetFilter = (key: string, value: string) => {
    setFilter((prev: FilterOptions) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetFilter = () => {
    setFilter(options);
  };

  const handleSearch = () => {
    const notChange = isEqual(filter, objSearchParams);

    if (!notChange) {
      const newQuery = updateSearchParams({ page: "1", ...filter });

      startTransition(() => {
        router.replace(`?${newQuery}`, { scroll: false });
      });
    }
  };

  useScrollIntoView({
    ref: elementScrollRef,
    options: { behavior: "smooth", block: "start", delay: 500 },
    dependencys: [searchParams.toString()],
  });

  return (
    <Box className="relative">
      <Box
        className={`flex items-center gap-2 bg-[#191b24] px-2 cursor-pointer text-gray-100 hover:text-white text-base font-semibold z-10
          ${showFilter ? "-top-3 left-4 absolute" : "my-6"}
        `}
        onClick={() => setShowFilter(!showFilter)}
      >
        <FaFilter className={`${showFilter ? "text-primary" : ""}`} />
        <span> Bộ lọc</span>
      </Box>
      {showFilter && (
        <Box className="flex flex-col xs:mx-0 -mx-4 border border-[#ffffff10] xs:rounded-2xl rounded-none my-12 py-4">
          <>
            {filterOptions.map((option) => (
              <Box
                key={option.id}
                className="flex lg:gap-6 gap-4 items-start xs:p-4 py-4 px-0 border-b border-dashed border-[#ffffff10]"
              >
                <div className="lg:text-sm text-xs text-end lg:min-w-32 min-w-20 py-2 text-gray-50 font-bold">
                  {`${option.title}:`}
                </div>
                <FilterItem
                  option={option}
                  handleSetFilter={handleSetFilter}
                  filter={filter}
                />
              </Box>
            ))}
          </>
          <Box className="flex gap-6 items-start p-4">
            <span className=" min-w-32 md:inline-block hidden">&nbsp;</span>
            <Box className="flex gap-4">
              <button
                disabled={pending}
                onClick={() => handleSearch()}
                className={`rounded-full inline-flex items-center gap-2 text-sm cursor-pointer px-4 h-10 shadow-primary bg-primary text-[#1e2939] disabled:cursor-not-allowed disabled:opacity-50`}
              >
                {pending && <Spinner size="sm" />}
                Lọc kết quả
              </button>

              <button
                onClick={handleResetFilter}
                className="rounded-full flex items-center justify-center bg-gray-50 cursor-pointer w-10 h-10 text-gray-900 hover:shadow-[0_5px_10px_10px_rgba(255,255,255,.15)]"
              >
                <Refreshicon />
              </button>
            </Box>
          </Box>

          <div ref={elementScrollRef}></div>
        </Box>
      )}
    </Box>
  );
};

export default FilterBox;
