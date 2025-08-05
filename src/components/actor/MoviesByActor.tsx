"use client";

import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import ActorMovieAll from "./ActorMoviesAll";
import ActorMoviesTime from "./ActorMoviesTime";
import { setFilterActor } from "@/store/slices/movie.slice";
import EmptyData from "../shared/EmptyData";
import { RiMovieFill } from "react-icons/ri";

interface MoviesByActorProps {
  data: MoviesByActor[];
}

const tabs = [
  { id: "all", value: "all", label: "Tất cả" },
  { id: "time", value: "time", label: "Thời gian" },
];

const MoviesByActor = ({ data }: MoviesByActorProps) => {
  const { filter } = useSelector((state: RootState) => state.movie.actorDetail);
  const dispatch: AppDispatch = useDispatch();

  const handleChangeTab = (value: "all" | "time") => {
    if (value !== filter) {
      dispatch(setFilterActor(value));
    }
  };

  return (
    <div className="lg:pl-10 flex-1">
      <div className="flex items-center justify-between mb-8">
        <h4 className="lg:text-2xl text-lg text-gray-50">
          Các phim đã tham gia
        </h4>
        <div className="flex gap-0 border items-baseline border-gray-50 rounded-lg h-8 p-0.5 overflow-hidden">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleChangeTab(tab.value as "all" | "time")}
              className={`flex items-center transition-all duration-300 justify-center rounded-md border-none h-[26px] lg:text-sm xs:text-xs text-[10px] px-2 ${
                filter === tab.value
                  ? "bg-white text-black cursor-default"
                  : "bg-transparent text-white cursor-pointer"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {!data || data?.length === 0 ? (
        <EmptyData
          className="h-48 bg-[#0003] rounded-2xl"
          icon={<RiMovieFill />}
          title="Đang cập nhật"
          description="Danh sách phim hiện tại chưa có dữ liệu."
        />
      ) : (
        <>
          {filter === "all" ? (
            <ActorMovieAll data={data} />
          ) : (
            <ActorMoviesTime data={data} />
          )}
        </>
      )}
    </div>
  );
};

export default MoviesByActor;
