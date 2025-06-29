"use client";

import Image from "@/components/shared/Image";
import {
  generateUrlImage,
  highlightMultipleMatches,
  removeHtmlEntities,
} from "@/lib/utils";
import { RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { useSelector } from "react-redux";
import HighlightText from "../shared/HightlightText";
import { TagClassic } from "@/components/shared/TagClassic";

interface SearchPreviewItemProps {
  item: any;
  callback: (movieName: string) => void;
}

const SearchPreviewItem = ({ item, callback }: SearchPreviewItemProps) => {
  const keyword = useSelector(
    (state: RootState) => state.user.searchHistory.keyword
  );

  const itemName = removeHtmlEntities(item?.name) || "Không xác định";
  const itemOriginName =
    removeHtmlEntities(item?.origin_name) || "Không xác định";
  const partsName = highlightMultipleMatches(itemName, keyword);
  const partsNameOrigin = highlightMultipleMatches(itemOriginName, keyword);

  return (
    <li onClick={() => callback(item?.name)}>
      <Link href={`/thong-tin-phim/${item?.slug}`} className="block">
        <Box className="flex gap-4 p-4 hover:bg-[#ffffff05] transition-all">
          <Box className="w-20 h-28 relative flex-shrink-0">
            <Image
              src={generateUrlImage(item?.poster_url)}
              alt={item?.name}
              className="rounded-md"
            />
          </Box>
          <Box className="flex-1 overflow-hidden">
            <h3 className="text-sm text-gray-50 truncate-lines-2">
              {partsName.length > 0 ? (
                <HighlightText parts={partsName} />
              ) : (
                <span>{itemName}</span>
              )}
            </h3>
            <p className="text-xs text-gray-300 truncate">
              {partsNameOrigin.length > 0 ? (
                <HighlightText parts={partsNameOrigin} />
              ) : (
                <span>{itemOriginName}</span>
              )}
            </p>
            <Box className="flex flex-wrap gap-2 items-center mt-2">
              <TagClassic text={item?.quality || "Không xác định"} />
              <TagClassic text={item?.lang || "Không xác định"} />
              <TagClassic text={item?.year || "Không xác định"} />
              <TagClassic text={item?.time || "Không xác định"} />
              <TagClassic text={item?.episode_current || "Không xác định"} />
            </Box>
          </Box>
        </Box>
      </Link>
    </li>
  );
};

export default SearchPreviewItem;
