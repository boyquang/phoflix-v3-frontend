"use client";

import { Box } from "@chakra-ui/react";
import Link from "next/link";
import Image from "../shared/Image";
import { generateUrlImage } from "@/lib/utils";

interface MessageContentProps {
  content: string;
  role: "user" | "bot";
  movies: Movie[];
}

const MessageContent = ({ content, role, movies }: MessageContentProps) => {
  const textMapping = {
    user: "text-black",
    bot: "text-gray-200",
  };

  return (
    <Box>
      <p className={`${textMapping[role]} text-sm`}>{content}</p>
      {movies?.length > 0 && (
        <Box className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 my-6">
          {movies?.map((movie) => (
            <Box key={movie._id} className="group">
              <Link
                href={`/thong-tin-phim/${movie.slug}`}
                className="group-hover:scale-105 transition-all flex gap-2 flex-col items-start"
              >
                <Box className="lg:w-[84px] w-[64px] flex-shrink-0">
                  <Box className="relative pb-[150%] w-full h-0 ">
                    <Image
                      src={generateUrlImage(movie?.poster_url)}
                      alt={movie?.name}
                      className="rounded-md"
                    />
                  </Box>
                </Box>
                <Box className="flex-1 overflow-hidden">
                  <h3 className="text-sm text-white group-hover:text-[#ffd875] font-semibold line-clamp-2">
                    {movie?.name || "Không xác định"}
                  </h3>
                  <p className="text-xs text-gray-200 mt-0.5 line-clamp-1">
                    {movie?.origin_name || "Không xác định"}
                  </p>
                </Box>
              </Link>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MessageContent;
