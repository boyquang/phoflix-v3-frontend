import Clipboard from "@/components/shared/Clipboard";
import { NEXT_PUBLIC_SITE_URL } from "@/lib/env";
import { Box, Image } from "@chakra-ui/react";

export async function generateMetadata() {
  const title = "PHOFLIX-V3 - Đóng góp và ủng hộ phát triển dịch vụ";
  const description =
    "Hãy ủng hộ PHOFLIX-V3 để chúng tôi có thể duy trì và phát triển dịch vụ xem phim chất lượng cao, miễn phí cho bạn.";

  return {
    title,
    description,
    keywords: [
      "đóng góp PHOFLIX",
      "ủng hộ phát triển",
      "quyên góp xem phim",
      "PHOFLIX",
      "hỗ trợ dịch vụ phim",
    ],
    robots: "index, follow",
    openGraph: {
      title,
      description,
      url: `${NEXT_PUBLIC_SITE_URL}/nguoi-dung/ung-ho`,
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
    <Box className="lg:max-w-[560px] lg:mr-auto">
      <h3 className="text-lg text-gray-50">Ủng hộ tôi</h3>
      <p className="text-sm text-gray-400 my-2">
        Website này chạy bằng đam mê và... tiền điện. Nếu bạn thấy phim hay,
        load nhanh, không quảng cáo, thì hãy donate để tôi không phải quay lại
        nghề code dạo. Mỗi ly trà sữa bạn nhường lại là một bước tiến cho thế
        giới phim không giật lag!
      </p>

      <Box className="grid grid-cols-2 my-6 gap-6">
        <Box className="flex flex-col gap-2">
          <h3 className="md:text-sm text-xs text-gray-50">Ủng hộ qua MoMo</h3>
          <Box className="h-0 rounded-xl overflow-hidden pb-[100%] relative">
            <Image
              className="absolute inset-0 w-full h-full object-cover"
              src="/images/bank/momo.jpg"
              alt="Donate"
            />
          </Box>
          <Box>
            <Clipboard value="0789648381" label="0789648381" />
            <p className="md:text-sm text-xs text-gray-400 my-2">
              Quét mã QR hoặc nhập số điện thoại để ủng hộ chúng tôi qua MoMo.
            </p>
          </Box>
        </Box>
        <Box className="flex flex-col gap-2">
          <h3 className="md:text-sm text-xs text-gray-50">
            Ủng hộ qua Vietinbank
          </h3>
          <Box className="h-0 rounded-xl overflow-hidden pb-[100%] relative">
            <Image
              className="absolute inset-0 w-full h-full object-cover"
              src="/images/bank/vietinbank.jpg"
              alt="Donate"
            />
          </Box>
          <Box>
            <Box className="flex gap-2 items-center justify-between flex-wrap">
              <Clipboard value="0789648381" label="0789648381" />
              <Clipboard value="107873364069" label="107873364069" />
            </Box>
            <p className="md:text-sm text-xs text-gray-400 my-2">
              Quét mã QR hoặc nhập số tài khoản để ủng hộ chúng tôi qua
              Vietinbank.
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
