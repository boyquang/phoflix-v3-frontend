"use client";

import Image from "@/components/shared/Image";
import SwitchCustom from "@/components/shared/SwitchCustom";
import { Button, Input } from "@chakra-ui/react";
import Link from "next/link";
import { toast } from "sonner";

interface StepsProps {
  movie: Movie;
}

const Steps = ({ movie }: StepsProps) => {
  const stepClasses = "lg:p-8 p-4 rounded-2xl bg-[#282b3a] w-full";

  return (
    <div className="flex-grow-1 flex flex-col gap-4">
      <div className={stepClasses}>
        <h4 className="lg:text-base text-sm text-white mb-3">1. Tên phòng</h4>
        <Input
          size="lg"
          placeholder={`Cùng xem ${movie?.name || "phim"} nhé`}
          className="border border-[#fff2] focus:border-white text-white outline-0 transition-colors duration-300 rounded-md"
        />
      </div>
      <div className={`${stepClasses} flex items-start`}>
        <h4 className="lg:text-base text-sm text-white mb-3 flex-grow-1">
          2. Poster hiển thị
        </h4>
        <div className="w-[70px] flex-shrink-0">
          <div className="w-full h-0 pb-[150%] relative">
            <Image
              src={movie?.poster_url || ""}
              alt={movie?.name || "poster"}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
      <div className={`${stepClasses} flex items-start gap-6`}>
        <div className="flex-grow-1">
          <h4 className="lg:text-base text-sm text-white mb-3">
            3. Số người tham gia tối đa
          </h4>
          <p className="text-sm text-gray-300">
            Mặc định là <strong>10 người</strong>. Bạn có thể thay đổi nếu muốn
            và tối đa là <strong>20 người</strong>.
          </p>
        </div>
        <div className="flex-grow-1">
          <Input
            size="lg"
            placeholder="10"
            className="border border-[#fff2] focus:border-white text-white outline-0 transition-colors duration-300 rounded-md w-24 ml-4"
          />
        </div>
      </div>
      <div className={`${stepClasses} flex items-start gap-6`}>
        <div className="flex-grow-1">
          <h4 className="lg:text-base text-sm text-white mb-3">
            4. Bạn chỉ muốn xem chung với bạn bè?
          </h4>
          <p className="text-sm text-gray-300">
            Nếu bật, chỉ có thành viên có link mới xem được phòng này.
          </p>
        </div>
        <SwitchCustom callback={() => {}} />
      </div>
      <div className="flex lg:flex-row flex-col items-center gap-4 mt-6">
        <Button
          size="2xl"
          rounded="lg"
          onClick={() => toast.info("Chức năng đang được phát triển!")}
          className="bg-primary text-lg text-black hover:opacity-75 lg:flex-grow-1 lg:w-auto w-full"
        >
          Tạo phòng
        </Button>
        <Button
          size="2xl"
          rounded="lg"
          className="bg-white text-lg text-black hover:opacity-75 lg:w-auto w-full"
          asChild
        >
          <Link href={`/dang-xem/${movie?.slug}`}>Hủy bỏ</Link>
        </Button>
      </div>
    </div>
  );
};

export default Steps;
