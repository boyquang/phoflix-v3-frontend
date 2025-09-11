"use client";

import { RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Image from "../shared/Image";
import { deniedGif } from "@/constants/image.contant";

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
            <Box
              className={`absolute bg-[#08080a] w-full h-full inset-0 md:rounded-t-2xl rounded-t-none items-center justify-center ${
                loading ? "flex" : "hidden"
              }`}
            >
              <Image
                src={movie?.thumb_url as string}
                alt={movie?.name || "Poster phim"}
              />
            </Box>

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
            <Box className="absolute inset-0 bg-[url('https://goatembed.com/images/denied-bg.webp')] bg-center bg-cover opacity-20"></Box>
            <Box className="flex gap-6 items-center">
              <Box className="relative rounded-[15%] overflow-hidden lg:h-[220px] h-[100px] w-[100px] lg:w-[220px]">
                <Image src={deniedGif} alt="movie not found" />
              </Box>
              <Box className="lg:text-lg text-sm text-white font-semibold">
                <span className="uppercase">Phim bị lỗi :((</span>
                <br />
                Vui lòng thử lại sau!
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SectionVideo;
