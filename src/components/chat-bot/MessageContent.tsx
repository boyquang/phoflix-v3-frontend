"use client";

import { Box } from "@chakra-ui/react";
import Link from "next/link";
import Image from "../shared/Image";
import { generateUrlImage } from "@/lib/utils";
import HoverOutlineWrapper from "../shared/HoverOutlineWrapper";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { setOpenDialog } from "@/store/slices/chat-bot.slice";
import { motion } from "framer-motion";

interface MessageContentProps {
  content: string;
  role: "user" | "bot";
  movies: Movie[];
}

const MessageContent = ({ content, role, movies }: MessageContentProps) => {
  const dispatch: AppDispatch = useDispatch();

  const textMapping = {
    user: "text-black",
    bot: "text-gray-100",
  };

  return (
    <motion.div transition={{ duration: 0.5, ease: "easeOut" }}>
      <p className={`${textMapping[role]} text-sm`}>{content}</p>
      {movies?.length > 0 && (
        <Box className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 my-6">
          {movies?.map((movie) => (
            <Box
              onClick={() => dispatch(setOpenDialog(false))}
              key={movie._id}
              className="group relative"
            >
              <Link
                href={`/thong-tin-phim/${movie.slug}`}
                className="flex gap-2 flex-col items-start"
              >
                <Box className="flex-shrink-0 w-full relative">
                  <HoverOutlineWrapper rounded="md" ringSize="2">
                    <Box className="relative pb-[150%] w-full h-0 ">
                      <Image
                        src={generateUrlImage(movie?.poster_url)}
                        alt={movie?.name}
                        className="rounded-md"
                      />
                    </Box>
                  </HoverOutlineWrapper>
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
    </motion.div>
  );
};

export default MessageContent;
