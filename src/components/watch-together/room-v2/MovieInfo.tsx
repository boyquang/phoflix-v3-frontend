"use client";

import BadgeCustom from "@/components/shared/BadgeCustom";
import DecodeText from "@/components/shared/DecodeText";
import Image from "@/components/shared/Image";
import { TagClassic } from "@/components/shared/TagClassic";
import TmdbRatingBadge from "@/components/shared/TmdbRatingBadge";

interface MovieInfoProps {
  movie: Movie;
}

const MovieInfo = ({ movie }: MovieInfoProps) => {
  return (
    <div className="py-8 border border-[#fff2] md:block hidden">
      <div className="flex gap-8 mx-6 px-6">
        <div className="w-[120px] flex-shrink-0">
          <div className="relative w-full pb-[150%] h-0">
            <Image
              src={movie?.poster_url || ""}
              alt={movie?.name || "Poster"}
              className="rounded-md"
            />
          </div>
        </div>
        <div>
          <DecodeText
            as="h3"
            text={movie?.name}
            className="lg:text-xl md:text-lg text-sm line-clamp-2 text-white font-semibold"
          />
          <DecodeText
            as="p"
            text={movie?.name}
            className="text-sm mt-1 text-gray-300"
          />
          <div className="flex items-center mt-2 gap-2">
            <TmdbRatingBadge rating={movie?.tmdb?.vote_average} />
            <BadgeCustom
              className="bg-primary linear-gradient text-black"
              text={movie?.quality || "Quality: N/A"}
            />
            <BadgeCustom
              size="xs"
              text={movie?.episode_current || "Episode: N/A"}
            />
            <BadgeCustom size="xs" text={movie?.year || "Year: N/A"} />
            <BadgeCustom size="xs" text={movie?.time || "Time: N/A"} />
          </div>
          <div className="lg:flex hidden flex-wrap gap-2 mt-2.5">
            {movie?.categories?.map((caterogy, index: number) => (
              <TagClassic
                key={index}
                text={caterogy?.name || "Thể loại: N/A"}
                isRedirect
                href={`/chi-tiet/the-loai/${caterogy?.slug}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
