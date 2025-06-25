"use client";

import { tabs } from "@/constants/movie-request";
import { Button } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";

const MovieRequestTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  let activeTab = "";

  switch (tab) {
    case "all":
      activeTab = "all";
      break;
    case "pending":
      activeTab = "pending";
      break;
    case "approved":
      activeTab = "approved";
      break;
    case "rejected":
      activeTab = "rejected";
      break;
    default:
      activeTab = "all";
  }

  const handleChangeTab = (
    tab: "all" | "pending" | "approved" | "rejected"
  ) => {
    const params = new URLSearchParams(window.location.search);

    params.set("tab", tab.toString());
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="flex-wrap flex gap-3 items-center my-6">
      {tabs.map((item) => (
        <Button
          rounded="full"
          size="sm"
          key={item.value}
          className={`xs:text-sm md:h-9 h-7 text-xs xs:px-4 px-2 ${
            activeTab === item.value
              ? "text-gray-900 bg-gray-200"
              : "text-gray-100 bg-[#2f3346]"
          }`}
          onClick={() =>
            handleChangeTab(
              item.value as "all" | "pending" | "approved" | "rejected"
            )
          }
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default MovieRequestTabs;
