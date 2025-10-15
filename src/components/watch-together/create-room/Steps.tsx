"use client";

import Image from "@/components/shared/Image";
import SwitchCustom from "@/components/shared/SwitchCustom";
import useWatchTogetherV2 from "@/hooks/useWatchTogetherV2";
import { createRoom } from "@/store/async-thunks/watch-together-v2.thunk";
import { AppDispatch } from "@/store/store";
import { Button, Input, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface StepsProps {
  movie: Movie;
}

const stepClasses = "lg:p-8 p-4 rounded-2xl bg-[#282b3a] w-full";

const Steps = ({ movie }: StepsProps) => {
  const [form, setForm] = useState<FormNewRoom>({
    movieId: "",
    roomName: "",
    isPrivate: false,
    maxParticipants: 10,
  });
  const { handleCreateRoom } = useWatchTogetherV2();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (movie) {
      setForm({
        movieId: movie._id,
        roomName: `Cùng xem ${movie?.name || "phim"} nhé`,
        maxParticipants: 10,
        isPrivate: false,
      });
    }
  }, [movie]);

  const onCreateRoom = async () => {
    if (!form) return;
    handleCreateRoom(form, setLoading);
  };

  return (
    <div className="flex-grow-1 flex flex-col gap-4">
      <div className={stepClasses}>
        <h4 className="lg:text-base text-sm text-white mb-3">1. Tên phòng</h4>
        <Input
          size="lg"
          value={form.roomName}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, roomName: e.target.value }))
          }
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
            type="number"
            value={form.maxParticipants}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                maxParticipants: Math.min(20, e.target.valueAsNumber),
              }))
            }
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
        <SwitchCustom
          callback={() => {
            setForm((prev) => ({ ...prev, isPrivate: !prev.isPrivate }));
          }}
          defaultChecked={form.isPrivate}
        />
      </div>
      <div className="flex lg:flex-row flex-col items-center gap-4 mt-6">
        <Button
          size="2xl"
          rounded="lg"
          onClick={onCreateRoom}
          className="bg-primary text-lg text-black hover:opacity-75 lg:flex-grow-1 lg:w-auto w-full"
        >
          Tạo phòng
          {loading && <Spinner size="sm" className="ml-1" />}
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
