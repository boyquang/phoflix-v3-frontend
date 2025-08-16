"use client";

import { Box } from "@chakra-ui/react";
import Link from "next/link";
import MovieSwiper from "../shared/MovieSwiper";
import { RiArrowRightWideLine } from "react-icons/ri";
import { textBackgrounds } from "@/constants/color.contant";

interface TopicListArr {
    title: string;
    link: string;
    items: Movie[];
}

interface MovieTopicListProps {
    data: TopicListArr[];
}


const MovieTopicList = ({ data }: MovieTopicListProps) => {
    return (
        <Box className="rounded-2xl bg-gradient-to-b from-[#282b3a] via-80% via-transparent xl:p-8 p-4">
            <Box className="flex flex-col gap-12">
                {data?.map((item, index) => (
                    <Box key={index} className="flex xl:flex-row flex-col xl:items-center items-start gap-4">
                        <Box className="flex xl:flex-col flex-row xl:justify-normal justify-between gap-4 xl:px-4 xl:w-[200x] w-full flex-grow-0">
                            <h4 style={{
                                background: textBackgrounds[index % textBackgrounds.length],
                            }} className="tracking-[1px] xl:text-2xl lg:text-xl text-base text-gradient font-bold">
                                {item.title}
                            </h4>
                            <Link href={item.link} className="text-sm text-white flex items-center hover:text-[#ffd875]">
                                Xem toàn bộ
                                <RiArrowRightWideLine />
                            </Link>
                        </Box>
                        <Box className="relative xl:w-[calc(100%-200px)] w-full">
                            <Box className="relative">
                                <MovieSwiper
                                    items={item.items}
                                    loading={false}
                                    error={false}
                                    orientation="horizontal"
                                    breakpoints={{
                                        320: {
                                            slidesPerView: 2,
                                            spaceBetween: 8,
                                        },
                                        640: {
                                            slidesPerView: 2,
                                            spaceBetween: 8,
                                        },
                                        768: {
                                            slidesPerView: 2,
                                            spaceBetween: 8,
                                        },
                                        1024: {
                                            slidesPerView: 3,
                                            spaceBetween: 12,
                                        },
                                        1440: {
                                            slidesPerView: 3,
                                            spaceBetween: 16,
                                        },
                                        1920: {
                                            slidesPerView: 5,
                                            spaceBetween: 18,
                                        },
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default MovieTopicList;