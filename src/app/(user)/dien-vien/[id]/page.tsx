import Loading from "@/app/loading";
import { getActorDetails } from "@/lib/actions/actor-server.action";
import { Metadata } from "next";
import { Suspense } from "react";
import { orderBy } from "lodash";
import { NEXT_PUBLIC_SITE_URL } from "@/constants/env.contant";
import ActorDetail from "@/components/actor/ActorDetail";
import MoviesByActor from "@/components/actor/MoviesByActor";
import {
  fetchActorDetail,
  fetchMoviesByActor,
} from "@/lib/actions/movie-server.action";
import { PageProps } from "@/app/page";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const response = await fetchActorDetail(Number(id), "vi");
  const actor = response?.data || null;

  const name = actor?.name || "Diễn viên";
  const knownFor = actor?.known_for_department || "diễn viên điện ảnh";
  const biography =
    actor?.biography?.slice(0, 160) ||
    `Thông tin chi tiết về ${name} trên PHOFLIX-V3.`;

  return {
    title: `Diễn viên ${name} - PHOFLIX-V3`,
    description: biography,
    keywords: [
      name,
      "diễn viên",
      knownFor,
      "nghệ sĩ nổi bật",
      "tiểu sử diễn viên",
      "PHOFLIX",
    ],
    robots: "index, follow",
    openGraph: {
      title: `Diễn viên ${name} - PHOFLIX-V3`,
      description: biography,
      url: `${NEXT_PUBLIC_SITE_URL}/actors/${id}`,
      siteName: "PHOFLIX-V3",
      locale: "vi_VN",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `Diễn viên ${name} - PHOFLIX-V3`,
      description: biography,
    },
  };
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  const [resActorDetail, resMoviesByActor] = await Promise.all([
    fetchActorDetail(Number(id), "vi"),
    fetchMoviesByActor(Number(id), "vi"),
  ]);

  // Sắp xếp danh sách phim theo ngày phát hành
  const moviesByActorSorted = orderBy(
    resMoviesByActor?.movie?.cast,
    [(movie) => movie?.release_date || movie?.first_air_date || "0000-00-00"],
    ["desc"]
  );

  return (
    <Suspense fallback={<Loading type="text" />}>
      <div className="max-w-[1620px] mx-auto 2xl:px-12 px-4 lg:pt-28 pt-24">
        <div className="flex lg:flex-row flex-col">
          <ActorDetail data={resActorDetail.data} />
          <MoviesByActor data={moviesByActorSorted} />
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
