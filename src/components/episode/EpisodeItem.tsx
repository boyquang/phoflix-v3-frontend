"use client";

import { getIdFromLinkEmbed } from "@/lib/utils";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { BsPlayFill } from "react-icons/bs";

interface EpisodeItemProps {
  item: EpisodeMerged;
  language: string;
  currentEpisode: EpisodeMerged | null;
  redirect?: boolean;
  handleSetCurrentEpisode(item: EpisodeMerged): void;
}

const EpisodeItem = ({
  item,
  redirect,
  language,
  currentEpisode,
  handleSetCurrentEpisode,
}: EpisodeItemProps) => {
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const segment = pathname?.split("/")[1];
  const id = getIdFromLinkEmbed(item?.link_embed, 8) || "error-link-embed";
  const episode = item?.slug || "error-episode";
  const queryParams = `id=${id}&episode=${episode}&language=${language}`;
  const isCurrentEpisode = currentEpisode?.link_embed === item?.link_embed;

  // Tạo đường dẫn href dựa trên segment và params
  let href = "";

  if (segment === "thong-tin-phim") {
    const updatedFlag = searchParams?.get("updated") ? "&updated=true" : "";
    href = `/dang-xem/${params?.slug}?${queryParams}${updatedFlag}`;
  } else if (segment === "xem-chung") {
    href = `/xem-chung/${params?.roomId}?${queryParams}`;
  }

  const classNameEpisode = `flex w-full items-center justify-center flex-wrap rounded-md gap-x-1 min-h-[50px] max-h-[64px] px-2 shadow break-words transition-all ${
    isCurrentEpisode && !redirect
      ? "bg-primary text-[#282b3a]"
      : "text-gray-50 bg-[#282B3A] hover:text-[#ffd875]"
  }`;

  const classNameEpisodeName =
    "block max-w-full lg:text-xs truncate-lines-2 text-[10px] font-semibold";

  if (redirect) {
    return (
      <Link
        href={href}
        onClick={() => handleSetCurrentEpisode(item)}
        className={classNameEpisode}
      >
        <BsPlayFill className="flex-shrink-1" />
        <span className={classNameEpisodeName}>{item?.name}</span>
      </Link>
    );
  } else {
    return (
      <Button
        datatype={language}
        onClick={() => handleSetCurrentEpisode(item)}
        className={classNameEpisode}
      >
        <BsPlayFill className="flex-shrink-1" />
        <span className={classNameEpisodeName}>{item?.name}</span>
      </Button>
    );
  }
};

export default EpisodeItem;
