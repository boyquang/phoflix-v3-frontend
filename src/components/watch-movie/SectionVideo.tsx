"use client";

import { RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const SectionVideo = () => {
  const { currentEpisode, isValidEpisodes, movie } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [source, setSource] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

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
    <Box className="md:rounded-t-xl rounded-t-none overflow-hidden">
      <Box className="relative h-0 pt-[56.25%]">
        {source ? (
          <>
            <div
              className={`absolute bg-[#08080a] w-full h-full inset-0 md:rounded-t-2xl rounded-t-none items-center justify-center ${
                loading ? "flex" : "hidden"
              }`}
            >
              <div className="text-white p-4 xl:text-3xl lg:text-2xl text-lg">
                Đang tải phim đợi tí nhé!
              </div>
            </div>

            <iframe
              src={source}
              title={title}
              ref={iframeRef}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              frameBorder="0"
              allowFullScreen
              onLoad={() => setLoading(false)}
              className={`absolute w-full h-full inset-0 md:rounded-t-2xl rounded-t-none ${
                loading ? "hidden" : "block"
              }`}
            ></iframe>
          </>
        ) : (
          <Box className="absolute w-full h-full inset-0 flex items-center justify-center bg-[#08080a]">
            <h1 className="text-white md:text-2xl text-sm p-4 text-center">
              Phim đang lỗi, vui lòng thử lại sau!
            </h1>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SectionVideo;
