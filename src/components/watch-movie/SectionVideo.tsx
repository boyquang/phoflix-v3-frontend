"use client";

import { RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SectionVideo = () => {
  const { currentEpisode, isValidEpisodes, movie } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );

  const [source, setSource] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (isValidEpisodes && currentEpisode?.link_embed) {
      setSource(currentEpisode.link_embed);
      setTitle(currentEpisode.name || "Tập phim");
    } else if (movie?.trailer_url) {
      const trailerEmbed = movie.trailer_url.replace("/watch?v=", "/embed/");
      setSource(trailerEmbed);
      setTitle(movie.name || "Trailer");
    } else {
      setSource(null);
      setTitle("");
    }
  }, [isValidEpisodes, currentEpisode, movie]);

  return (
    <Box className="xs:rounded-t-2xl border border-[#ffffff10] rounded-t-none overflow-hidden">
      <Box className="relative h-0 pt-[56.25%]">
        {source ? (
          <iframe
            src={source}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            frameBorder="0"
            allowFullScreen
            className="absolute w-full h-full inset-0 xs:rounded-t-2xl rounded-t-none"
          ></iframe>
        ) : (
          <Box className="absolute w-full h-full inset-0 flex items-center justify-center bg-[#08080a]">
            <h1 className="text-white md:text-2xl text-sm p-4 text-center">
              Video không khả dụng hoặc bị lỗi, vui lòng thử lại sau!
            </h1>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SectionVideo;
