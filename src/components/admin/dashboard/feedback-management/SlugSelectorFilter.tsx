"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface SlugSelectorFilterProps {
  slugs: string[];
}

const SlugSelectorFilter = ({ slugs }: SlugSelectorFilterProps) => {
  const router = useRouter();
  const [slugSelected, setSlugSelected] = useState<string | "all">("all");

  const handleChangeSlug = (newSlug: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    setSlugSelected(newSlug);
    searchParams.set("slug", newSlug.toString());
    router.replace(`?${searchParams.toString()}`);
  };

  return (
    <select
      value={slugSelected}
      className="border lg:text-sm text-xs w-full lg:max-w-64 max-w-44 h-8 px-3 border-[#ffffff10] text-while rounded-sm focus:border-gray-50"
      onChange={(e) => handleChangeSlug(e.target.value)}
    >
      {["all", ...slugs].map((slug: string) => (
        <option key={slug} value={slug} className="text-black">
          {slug === "all" ? "Tất cả" : slug}
        </option>
      ))}
    </select>
  );
};

export default SlugSelectorFilter;
