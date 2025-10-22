import Loading from "@/app/loading";
import RootLayout from "@/components/layout/RootLayout";
import AnimateWrapper from "@/components/shared/AnimateWrapper";
import BackButton from "@/components/shared/BackButton";
import BadgeCustom from "@/components/shared/BadgeCustom";
import DecodeText from "@/components/shared/DecodeText";
import Image from "@/components/shared/Image";
import { TagClassic } from "@/components/shared/TagClassic";
import TmdbRatingBadge from "@/components/shared/TmdbRatingBadge";
import Steps from "@/components/watch-together/create-room/Steps";
import { fetchMovieInfo } from "@/lib/actions/movie.action";
import { Suspense } from "react";
import NotFound from "@/app/not-found";

const Page = async ({ searchParams, params }: PageProps) => {
  const { slug } = await params;
  const { movie, status } = await fetchMovieInfo(slug as string);

  if (!status) return <NotFound />;

  return (
    <Suspense fallback={<Loading type="text" />}>
      <AnimateWrapper>
        <RootLayout maxWidth="max-w-[1200px]">
          <div className="lg:pt-28 pt-24 relative z-10">
            <div className="flex items-center gap-2 text-white mb-6">
              <BackButton href={`/dang-xem/${movie?.slug}`} />
              <h3 className="lg:text-xl md:text-lg text-base">
                Tạo phòng xem chung
              </h3>
            </div>
            <div className="flex gap-6 lg:flex-row flex-col">
              <div className="flex-shrink-0 relative lg:w-[430px] overflow-hidden w-full flex lg:flex-col sm:flex-row flex-col gap-6 lg:justify-end lg:p-8 p-4 bg-[#212a56] rounded-2xl">
                <div
                  style={{
                    maskImage:
                      "linear-gradient(0deg, transparent 0, transparent 10%, black 70%)",
                    WebkitMaskImage:
                      "linear-gradient(0deg, transparent 0, transparent 10%, black 70%)",
                  }}
                  className="lg:w-full md:w-[140px] w-[120px] lg:absolute relative lg:inset-0 flex-shrink-0"
                >
                  <div className="w-full pb-[150%] relative h-0 rounded-lg overflow-hidden bg-[#2F3346]">
                    <Image
                      src={movie?.poster_url || ""}
                      alt={movie?.name || "poster"}
                    />
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="flex flex-col gap-2 items-start overflow-hidden">
                    <DecodeText
                      as="h4"
                      text={movie?.name || "Tên phim: N/A"}
                      className="lg:text-2xl text-lg text-gray-50 font-semibold line-clamp-2 break-words lg:text-left text-center"
                    />
                    <DecodeText
                      as="p"
                      text={movie?.origin_name || "Tên gốc: N/A"}
                      className="text-primary text-sm line-clamp-2 lg:text-left text-center"
                    />
                    <div className="flex flex-wrap gap-2 items-center">
                      <TmdbRatingBadge rating={movie?.tmdb?.vote_average} />
                      <BadgeCustom text={movie?.quality || "N/A"} />
                      <BadgeCustom text={movie?.year || "N/A"} />
                      <BadgeCustom text={movie?.time || "N/A"} />
                      <BadgeCustom text={movie?.episode_current || "N/A"} />
                    </div>

                    <div className="flex flex-wrap gap-2 items-center mt-1">
                      {movie?.categories?.map((category, index: number) => (
                        <TagClassic
                          key={index}
                          text={category?.name || "Thể loại: N/A"}
                          isRedirect
                          href={`/chi-tiet/the-loai/${category?.slug}`}
                        />
                      ))}
                    </div>
                    <DecodeText
                      as="p"
                      text={movie?.content || "Không có mô tả"}
                      className="text-gray-400 text-sm text-justify mt-2 line-clamp-3"
                    />
                  </div>
                </div>
              </div>
              <Steps movie={movie as Movie} />
            </div>
          </div>
        </RootLayout>
      </AnimateWrapper>
    </Suspense>
  );
};

export default Page;
