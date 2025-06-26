import SwitchSnowEffectWrapper from "@/features/user/setting/SwitchSnowEffectWrapper";
import { NEXTAUTH_URL } from "@/lib/env";
import { Box } from "@chakra-ui/react";

export async function generateMetadata() {
  const title = "PHOFLIX-V3 - Cài đặt tài khoản người dùng";
  const description =
    "Tùy chỉnh cài đặt hệ thống và tài khoản người dùng trên PHOFLIX-V3. Quản lý hiệu ứng, bảo mật và các tùy chọn khác để nâng cao trải nghiệm của bạn.";

  return {
    title,
    description,
    keywords: [
      "cài đặt tài khoản",
      "quản lý người dùng",
      "thiết lập tài khoản",
      "PHOFLIX",
      "bảo mật người dùng",
    ],
    robots: "index, follow",
    openGraph: {
      title,
      description,
      url: `${NEXTAUTH_URL}/nguoi-dung/cai-dat`,
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

const Page = () => {
  return (
    <Box>
      <h3 className="text-gray-50 text-lg">Cài đặt</h3>
      <ul className="flex flex-col gap-2 mt-6">
        <li className=" flex items-center justify-between gap-6">
          <span className="xs:text-sm text-xs text-gray-200">
            Hiệu ứng tuyết rơi{" "}
            <span className="text-primary">
              &#40;Bạn chỉ có thể tùy chỉnh vào dịp Giáng sinh&#41;
            </span>
          </span>
          <SwitchSnowEffectWrapper />
        </li>
      </ul>
    </Box>
  );
};

export default Page;
