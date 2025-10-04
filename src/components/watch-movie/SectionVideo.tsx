"use client";

import { RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "../shared/Image";
import { deniedGif } from "@/constants/image.contant";
import dynamic from "next/dynamic";
import useVideoArtEvent from "@/hooks/useVideoArtEvent";

const ArtPlayer = dynamic(() => import("../shared/ArtPlayer"), { ssr: false });

const SectionVideo = () => {
  const { currentEpisode, isValidEpisodes, movie } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );
  const { currentTime } = useSelector(
    (state: RootState) => state.user.movieViewingStatus
  );
  const [source, setSource] = useState<string | null>(null);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const videoEvents = useVideoArtEvent();

  useEffect(() => {
    setSource(currentEpisode?.link_m3u8 || movie?.trailer_url || null);
  }, [isValidEpisodes, currentEpisode, movie]);

  return (
    <Box className="md:rounded-t-xl rounded-t-none overflow-hidden">
      <Box className="relative h-0 pt-[56.25%]">
        <Box className={`transition-all duration-500 ${videoLoaded ? "opacity-100 visible" : "opacity-0 invisible"}`}>
          {source ? (
            <ArtPlayer
              url={source}
              poster={movie?.thumb_url as string}
              options={{
                currentTime: currentTime || 0,
              }}
              events={{
                pause: (art) => videoEvents.onPause(art),
                "video:loadedmetadata": (art) =>
                  videoEvents.onLoadedData(art, () => setVideoLoaded(true)),
                "video:seeking": (art) => videoEvents.onSeeking(art),
                "video:ended": (art) => videoEvents.onEnded(art),
                "video:seeked": (art) => videoEvents.onSeeked(art),
                "video:timeupdate": (art) => videoEvents.onTimeUpdate(art),
              }}
            />
          ) : (
            <Box className="absolute w-full h-full inset-0 flex items-center justify-center bg-[#08080a]">
              <Box className="absolute inset-0 bg-[url('/images/denied-bg.webp')] bg-center bg-cover opacity-20"></Box>
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

        <Box className={`${videoLoaded ? "hidden" : "absolute w-full h-full inset-0 flex items-center justify-center bg-[#08080a]"}`} />
      </Box>
    </Box>
  );
};

export default SectionVideo;
