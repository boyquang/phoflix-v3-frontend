"use client";

import { tabs } from "@/constants/movie-request";
import { Button, Spinner } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

const MovieRequestTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [pending, startTransition] = useTransition();
  const [targetTab, setTargetTab] = useState<string | null>(null);

  let activeTab = "";
  switch (tab) {
    case "pending":
    case "approved":
    case "rejected":
      activeTab = tab;
      break;
    default:
      activeTab = "all";
  }

  const handleChangeTab = (
    tab: "all" | "pending" | "approved" | "rejected"
  ) => {
    if (activeTab === tab) return;

    const params = new URLSearchParams(window.location.search);

    params.set("tab", tab.toString());

    setTargetTab(tab);

    startTransition(() => {
      router.replace(`?${params.toString()}`, {
        scroll: false,
      });
    });
  };

  return (
    <div className="flex-wrap flex gap-3 items-center my-6">
      {tabs.map((item) => (
        <Button
          rounded="full"
          size="sm"
          key={item.value}
          disabled={pending && targetTab !== item.value}
          className={`xs:text-sm md:h-9 h-7 text-xs xs:px-4 px-2 ${
            activeTab === item.value
              ? "text-gray-900 bg-gray-200 cursor-not-allowed"
              : "text-gray-100 bg-[#2f3346]"
          }`}
          onClick={() =>
            handleChangeTab(
              item.value as "all" | "pending" | "approved" | "rejected"
            )
          }
        >
          {pending && targetTab === item.value && <Spinner size="xs" />}
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default MovieRequestTabs;
