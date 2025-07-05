"use client";

import { updateSearchParams } from "@/lib/utils";
import { fetchDataMovieSearch } from "@/store/asyncThunks/movieAsyncThunk";
import { AppDispatch } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useDispatch } from "react-redux";
import FilterItem from "./FilterItem";
import FilterActions from "./FilterActions";
import { isEqual } from "lodash";
import { filterOptions } from "@/constants/filter-movie";
import Refreshicon from "../icons/RefresIcon";

const options = {
  charactor: "a",
  country: "",
  category: "",
  year: "",
  sort_lang: "",
  sort_type: "desc",
};

const FilterBox = () => {
  const dispatch: AppDispatch = useDispatch();
  const [filter, setFilter] = useState<any>(options);
  const [pending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();

  const objSearchParams = {
    charactor: searchParams.get("keyword") || "a",
    country: searchParams.get("country") || "",
    category: searchParams.get("category") || "",
    year: searchParams.get("year") || "",
    sort_lang: searchParams.get("sort_lang") || "",
    sort_type: searchParams.get("sort_type") || "desc",
  };

  const handleSetFilter = (key: string, value: any) => {
    setFilter((prev: any) => ({
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
      const newQuery = updateSearchParams({ page: 1, ...filter });
      router.replace(`?${newQuery}`);
    }
  };

  return (
    <Box className="flex flex-col border border-[#ffffff10] rounded-2xl my-12">
      <>
        {filterOptions.map((option) => (
          <Box
            key={option.id}
            className="flex lg:gap-6 gap-4 items-start p-4 border-b border-[#ffffff10]"
          >
            <span className="lg:text-sm text-xs text-end lg:min-w-32 min-w-20 text-gray-50 font-semibold">
              {`${option.title}:`}
            </span>
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
            onClick={() => handleSearch()}
            className="rounded-full text-sm cursor-pointer px-4 h-10 shadow-primary bg-[#ffda7d] text-[#1e2939]"
          >
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
    </Box>
  );
};

export default FilterBox;
