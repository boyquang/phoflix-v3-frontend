"use client";

import Image from "next/image";
import RootLayout from "./RootLayout";
import Link from "next/link";
import GithubIcon from "../icons/GithubIcon";
import TelegramIcon from "../icons/TelegramIcon";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  if (pathname.includes("/dashboard")) return null;

  return (
    <footer className="mt-16 bg-[#282b3a] xl:rounded-t-3xl">
      <RootLayout>
        <div className="grid py-12 grid-cols-12 gap-x-6 gap-y-6 lg:gap-x-12 lg:gap-y-4">
          <div className="col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-4">
            <h3 className="text-xl font-bold text-primary">Giới thiệu</h3>
            <p className="text-gray-100 mt-3 text-justify break-words">
              Chào mừng bạn đến với PHOFLIX-V3 – nền tảng xem phim trực tuyến
              hiện đại, nơi hội tụ của hàng ngàn bộ phim hấp dẫn từ khắp nơi
              trên thế giới. Tại PHOFLIX-V3, bạn sẽ dễ dàng khám phá kho nội
              dung phong phú: từ những bom tấn Hollywood, phim nghệ thuật đặc
              sắc, đến các series truyền hình nổi tiếng toàn cầu. Với giao diện
              thân thiện, tốc độ tải siêu nhanh và chất lượng hình ảnh chuẩn HD
              sắc nét, PHOFLIX-V3 cam kết mang đến cho bạn trải nghiệm giải trí
              mượt mà và đắm chìm nhất.
            </p>
          </div>

          <div className="col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-4">
            <h3 className="text-xl font-bold text-primary">Bản quyền</h3>
            <p className="text-gray-100 mt-3 text-justify break-words">
              Tất cả nội dung trên trang web được thu thập từ các nguồn phát
              video trực tuyến công khai trên Internet. Chúng tôi không lưu trữ
              hay phát trực tiếp bất kỳ nội dung bản quyền nào. Nếu bạn là chủ
              sở hữu bản quyền và nhận thấy nội dung nào vi phạm quyền lợi của
              mình, vui lòng liên hệ với chúng tôi để được hỗ trợ xử lý và gỡ bỏ
              kịp thời. Xin chân thành cảm ơn!
            </p>
          </div>

          <div className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-4">
            <h3 className="text-xl font-bold text-primary">Liên hệ với tôi</h3>
            <div className="flex flex-col gap-4 mt-3">
              <Link
                href="https://github.com/phohoccode"
                target="_blank"
                className="text-md text-gray-50 inline-flex gap-2 items-center transition duration-300 ease-in-out hover:text-[#ffd875] hover:underline"
              >
                <GithubIcon />
                <span>Github</span>
              </Link>
              <Link
                href="https://t.me/phohoccode_04"
                target="_blank"
                className="text-md text-gray-50 inline-flex gap-2 items-center transition duration-300 ease-in-out hover:text-[#ffd875] hover:underline"
              >
                <TelegramIcon />
                <span>Telegram</span>
              </Link>
            </div>
          </div>

          <div className="col-span-12 mt-4">
            <div className="flex gap-2 mb-2 items-center p-2 rounded-full bg-[#78140f] max-w-[320px] mx-auto justify-center">
              <div className="w-5 h-5 overflow-hidden">
                <Image
                  src="/images/vn_flag.svg"
                  alt="VietNamNumberOne"
                  width={20}
                  height={20}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="lg:text-sm text-xs text-gray-50">
                Hoàng Sa & Trường Sa là của Việt Nam!
              </span>
            </div>
          </div>

          <div className="col-span-12">
            <p className="text-center text-sm text-gray-100">
              © 2025 - Phát triển bởi phohoccode
            </p>
          </div>
        </div>
      </RootLayout>
    </footer>
  );
};

export default Footer;
