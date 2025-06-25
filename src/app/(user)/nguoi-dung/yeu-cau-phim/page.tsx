import Loading from "@/app/loading";
import { auth } from "@/auth";
import MovieRequestDialog from "@/features/user/movie-request/MovieRequestDialog";
import MovieRequests from "@/features/user/movie-request/MovieRequests";
import MovieRequestTabs from "@/features/user/movie-request/MovieRequestTabs";
import { getMovieRequests } from "@/lib/actions/movieRequestActionsServer";
import { NEXTAUTH_URL } from "@/lib/env";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata() {
  const title = "PHOFLIX-V3 - Yêu cầu phim bạn muốn xem";
  const description =
    "Gửi yêu cầu phim bạn yêu thích để chúng tôi có thể cập nhật và phục vụ bạn nhanh chóng trên PHOFLIX-V3.";

  return {
    title,
    description,
    keywords: [
      "yêu cầu phim",
      "đề xuất phim",
      "phim yêu thích",
      "gợi ý phim",
      "PHOFLIX yêu cầu",
      "thêm phim mới",
    ],
    robots: "index, follow",
    openGraph: {
      title,
      description,
      url: `${NEXTAUTH_URL}/yeu-cau-phim`,
      siteName: "PHOFLIX-V3",
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const session: any = await auth();
  const userId = session?.user?.id as string;
  const params = await searchParams;

  const status = params?.tab ? String(params?.tab) : "all";
  const afterTime = params?.afterTime ? Number(params?.afterTime) : 0;
  const limit = 10;

  const response = await getMovieRequests({
    userId,
    status: status as "pending" | "approved" | "rejected" | "all",
    limit,
    afterTime,
  });

  const data = response?.result;

  return (
    <Suspense fallback={<Loading height="h-96" type="bars" />}>
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-lg text-gray-50">Yêu cầu phim</h3>
          <MovieRequestDialog />
        </div>
        <MovieRequestTabs />

        <MovieRequests data={data} />
      </div>
    </Suspense>
  );
};

export default Page;
