import RootLayout from "@/components/layout/RootLayout";
import { topicBackgrounds } from "@/constants/color.contant";
import { categories, countries } from "@/constants/movie.contant";
import { NEXT_PUBLIC_SITE_URL } from "@/constants/env.contant";
import { Metadata } from "next";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";
import AnimateWrapper from "@/components/shared/AnimateWrapper";

export const metadata: Metadata = {
  title: "Khám phá thế giới phim | PHOFLIX-V3",
  description:
    "Khám phá những bộ phim nổi bật, đang thịnh hành và được đề xuất dành riêng cho bạn trên PHOFLIX-V3. Trải nghiệm xem phim online miễn phí, chất lượng cao, không quảng cáo.",
  keywords: [
    "khám phá phim",
    "phim đề xuất",
    "phim nổi bật",
    "gợi ý phim hay",
    "phim hot hôm nay",
    "xem phim miễn phí",
    "phim online chất lượng cao",
    "phim không quảng cáo",
    "PHOFLIX-V3",
  ],
  openGraph: {
    title: "Khám phá thế giới phim | PHOFLIX-V3",
    description:
      "Khám phá kho phim đề xuất và đang thịnh hành trên PHOFLIX-V3. Xem phim online miễn phí, không giật lag, hình ảnh sắc nét, hỗ trợ mọi thiết bị.",
    url: `${NEXT_PUBLIC_SITE_URL}/kham-pha`,
    siteName: "PHOFLIX-V3",
    type: "website",
  },
};

const classTopicDefault = `
  relative rounded-lg before:content-[''] before:absolute before:inset-0 before:bg-[url('/images/wave.png')]
  before:bg-no-repeat before:bg-[length:200px_140px] before:bg-[position:100%_100%] before:opacity-30
  before:[mask-image:linear-gradient(-45deg,black,transparent_40%)]
  before:[-webkit-mask-image:linear-gradient(-45deg,black,transparent_40%)]
  rounded-lg overflow-hidden hover:-translate-y-2 hover:opacity-90 transition-all duration-300
`;

const Page = () => {
  const combined = [
    ...countries.map((country) => ({ ...country, describe: "quoc-gia" })),
    ...categories.map((category) => ({ ...category, describe: "the-loai" })),
  ];

  return (
    <RootLayout>
      <AnimateWrapper>
        <div className="lg:pt-28 pt-24 relative z-10">
          <h3 className="inline-block xl:text-3xl lg:text-2xl text-xl text-gradient font-bold">
            Khám phá thế giới phim
          </h3>
          <div className="mt-12 grid gap-4 3xl:grid-cols-8 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
            {combined.map((item, index) => (
              <div
                key={index}
                className={`
                    ${classTopicDefault}
                    ${topicBackgrounds[index % topicBackgrounds.length]}
                  `}
              >
                <Link
                  className="relative z-10 flex flex-col justify-center gap-2 lg:min-h-32 min-h-28 p-4 text-gray-50"
                  href={`/chi-tiet/${item.describe}/${item.slug}`}
                >
                  <h4 className="text-lg font-bold">{item.name}</h4>
                  <div className="flex items-center">
                    <span className="text-sm">Xem chi tiết</span>
                    <MdChevronRight />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </AnimateWrapper>
    </RootLayout>
  );
};

export default Page;
