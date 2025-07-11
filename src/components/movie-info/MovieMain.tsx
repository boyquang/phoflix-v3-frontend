"use client";

import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import MovieTabs from "./MovieTabs";
import FavoriteButton from "@/components/shared/FavoriteButton";
import ShareButton from "@/components/shared/ShareButton";
import ReviewButton from "@/components/shared/ReviewButton";
import FeedbackSection from "@/components/feedback/FeedbackSection";
import CommentButton from "@/components/shared/FeedbackButton";
import { FaPlay } from "react-icons/fa6";
import PopoverPlaylist from "../user/playlist/PopoverPlaylist";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const MovieMain = () => {
  const params = useParams();
  const slug = params.slug;
  const { isValidEpisodes } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );

  return (
    <Box className="relative h-full z-[10] flex flex-col gap-4 lg:p-8 md:p-6 p-4 xl:rounded-tl-4xl xl:rounded-tr-4xl xl:rounded-br-4xl xl:rounded-bl-none lg:rounded-bl-4xl lg:rounded-br-4xl lg:bg-[#282b3a8a] lg:backdrop-blur-lg">
      <Box className="flex flex-col gap-8">
        <Box className="flex gap-6 md:flex-row flex-col md:justify-start justify-center md:items-start items-center ">
          {isValidEpisodes && (
            <Link
              href={`/dang-xem/${slug}`}
              className="md:min-w-auto min-w-[300px]"
            >
              <Button
                className="w-full h-14 text-lg shadow-lg shadow-primary bg-primary linear-gradient border-none text-gray-800"
                rounded="full"
              >
                <FaPlay />
                Xem ngay
              </Button>
            </Link>
          )}
          <Box className="flex justify-between gap-6 flex-1 items-center xs:w-auto w-full">
            <Box className="flex xs:gap-3 gap-2">
              <FavoriteButton placement="vertical" />
              <PopoverPlaylist placement="vertical" />
              <ShareButton placement="vertical" />
              <CommentButton placement="vertical" />
            </Box>
            <ReviewButton />
          </Box>
        </Box>
        <MovieTabs />

        <Box className="w-full h-[0.5px] bg-[#ffffff10] my-6"></Box>

        <FeedbackSection />
      </Box>
    </Box>
  );
};

export default MovieMain;
