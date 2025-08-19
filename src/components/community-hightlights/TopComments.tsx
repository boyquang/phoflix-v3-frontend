"use client";

import { getMostRakingFeedbacks } from "@/lib/actions/feedback.action";
import { Box } from "@chakra-ui/react";
import { useEffect, useRef, useState, useTransition } from "react";
import SwiperContainer from "../shared/SwipperContainer";
import { SwiperSlide } from "swiper/react";
import Image from "../shared/Image";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { TbMessageFilled } from "react-icons/tb";
import Link from "next/link";
import { FaMedal } from "react-icons/fa";
import CommentUserBadge from "../shared/CommentUserBadge";
import Loading from "@/app/loading";
import NotDataAvailable from "./NotDataAvailable";

type TTopComment = {
  parent_id: string | null;
  author: {
    _id: string;
    name: string;
    role: "admin" | "member";
    gender: "other" | "male" | "female";
    avatar: string;
  };
  movie_slug: string;
  movie_thumb: string;
  movie_poster: string;
  content: string;
  is_anonymous: number;
  created_at: number;
  total_children: number;
  total_dislike: number;
  total_like: number;
};

const TopComments = () => {
  const [comments, setComments] = useState<TTopComment[] | []>([]);
  const [pending, startTransition] = useTransition();
  const fetched = useRef<boolean>(false);

  useEffect(() => {
    try {
      if (fetched?.current) return;

      startTransition(async () => {
        const data = await getMostRakingFeedbacks();
        const comments = data?.result?.items || [];
        setComments(comments);
      });
    } catch (error) {
      console.log("error loading top comments", error);
    } finally {
      fetched.current = true;
    }
  }, []);

  return (
    <Box className="border-b 2xl:border-solid border-dashed border-[#fff2]">
      <Box className="xl:p-6 p-4">
        <Box className="">
          <Box className="flex items-center gap-2">
            <FaMedal className="text-primary" />
            <h4 className="xl:text-base text-sm uppercase text-white font-semibold">
              Top bình luận
            </h4>
          </Box>

          {pending ? (
            <Loading height="h-28" />
          ) : (
            <>
              {!comments || comments?.length === 0 ? (
                <NotDataAvailable />
              ) : (
                <Box className="relative">
                  <SwiperContainer
                    showNavigation={false}
                    breakpoints={{
                      320: {
                        slidesPerView: 1,
                        spaceBetween: 8,
                      },
                      768: {
                        slidesPerView: 2,
                        spaceBetween: 8,
                      },
                      1024: {
                        slidesPerView: 3,
                        spaceBetween: 8,
                      },
                      1280: {
                        slidesPerView: 4,
                        spaceBetween: 12,
                      },
                      1440: {
                        slidesPerView: 5,
                        spaceBetween: 16,
                      },
                      1920: {
                        slidesPerView: 6,
                        spaceBetween: 18,
                      },
                    }}
                  >
                    {comments?.map((comment, index) => (
                      <SwiperSlide key={index}>
                        <Box className="rounded-lg group flex flex-col gap-4 relative p-4">
                          <Box
                            style={{
                              WebkitMaskImage:
                                "linear-gradient(180deg, black 0, transparent 80%)",
                              maskImage:
                                "linear-gradient(180deg, black 0, transparent 80%)",
                            }}
                            className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-all"
                          >
                            <Image
                              src={comment?.movie_thumb || ""}
                              alt={comment?.movie_slug || ""}
                              className="rounded-lg"
                            />
                          </Box>
                          <Box className="flex flex-col relative z-[2]">
                            <Box className="flex items-start justify-between">
                              <Box className="relative w-12 h-12 rounded-full border-2 border-transparent group-hover:border-white">
                                <Image
                                  src={comment?.author?.avatar || ""}
                                  alt={comment?.author?.name || ""}
                                  className="rounded-full"
                                />
                              </Box>

                              <Link
                                href={`/thong-tin-phim/${comment?.movie_slug}?cid=${comment?.parent_id}`}
                              >
                                <Box className="w-[50px] flex-shrink-0">
                                  <Box className="relative z-[5] pb-[150%]">
                                    <Image
                                      src={comment?.movie_thumb || ""}
                                      alt={comment?.movie_slug || ""}
                                      className="rounded-md"
                                    />
                                  </Box>
                                </Box>
                              </Link>
                            </Box>
                            <Box className="flex flex-col gap-2 mt-2">
                              <CommentUserBadge
                                isAnonymous={comment?.is_anonymous}
                                author={{
                                  gender: comment?.author?.gender,
                                  name: comment?.author?.name,
                                  role: comment?.author?.role,
                                }}
                              />

                              <p className="text-[#fff8] text-xs truncate mt-1">
                                {comment.content}
                              </p>
                              <Box className="flex items-center gap-4 text-xs text-gray-400 mt-2">
                                <Box className="flex items-center gap-1">
                                  <AiFillLike />
                                  {comment.total_like}
                                </Box>
                                <Box className="flex items-center gap-1">
                                  <AiFillDislike />
                                  {comment.total_dislike}
                                </Box>
                                <Box className="flex items-center gap-1">
                                  <TbMessageFilled />
                                  {comment.total_children}
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </SwiperSlide>
                    ))}
                  </SwiperContainer>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TopComments;
