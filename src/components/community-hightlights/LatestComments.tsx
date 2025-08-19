"use client";

import { getLatestFeedbacks } from "@/lib/actions/feedback.action";
import { Box } from "@chakra-ui/react";
import { useEffect, useRef, useState, useTransition } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import SwiperContainer from "../shared/SwipperContainer";
import { SwiperSlide } from "swiper/react";
import Image from "../shared/Image";
import CommentUserBadge from "../shared/CommentUserBadge";
import { FaPlay } from "react-icons/fa6";
import Link from "next/link";
import Loading from "@/app/loading";
import NotDataAvailable from "./NotDataAvailable";

type TLatestComment = {
  _id: string;
  content: string;
  name: string;
  slug: string;
  author: {
    name: string;
    avatar: string;
    role: "admin" | "member";
    gender: "male" | "female" | "other";
    is_anonymous: number | boolean;
  };
  created_at: string;
};

const LatestComments = () => {
  const [comments, setComments] = useState<TLatestComment[]>([]);
  const [pending, startTransition] = useTransition();
  const fetched = useRef<boolean>(false);

  useEffect(() => {
    try {
      if (fetched?.current) return;

      startTransition(async () => {
        const data = await getLatestFeedbacks();
        const items = data?.result?.items || [];
        setComments(items);
      });
    } catch (error) {
      console.log("error loading top comments", error);
    } finally {
      fetched.current = true;
    }
  }, []);

  return (
    <Box className="p-6 flex-1 xl:block hidden overflow-hidden">
      <Box className="flex items-center gap-2 mb-4">
        <Box className="text-primary">
          <AiFillThunderbolt />
        </Box>
        <h4 className="xl:text-base text-sm uppercase text-white font-semibold">
          Bình luận mới
        </h4>
      </Box>

      {pending ? (
        <Loading height="h-28" />
      ) : (
        <>
          {!comments || comments?.length === 0 ? (
            <NotDataAvailable />
          ) : (
            <Box className="relative ">
              <SwiperContainer
                isMovieSlider={false}
                className="max-h-[330px]"
                direction="vertical"
                showNavigation={false}
                slidesPerView="auto"
                autoHeight={false}
                spaceBetween={8}
              >
                {comments?.map((comment, index) => (
                  <SwiperSlide key={index}>
                    <Link
                      href={`/thong-tin-phim/${comment?.slug}`}
                      className="flex items-start gap-4 bg-[#0005] overflow-hidden p-2 rounded-md border border-transparent hover:border-[#fff2]"
                    >
                      <Box className="relative flex-shrink-0 w-10 h-10">
                        <Image
                          src={comment.author.avatar}
                          alt={comment.author.name}
                          className="rounded-full"
                        />
                      </Box>
                      <Box className="flex-1 overflow-hidden">
                        <Box className="mb-2 flex items-center gap-2 overflow-hidden">
                          <CommentUserBadge
                            isAnonymous={comment.author.is_anonymous}
                            author={{
                              name: comment.author.name,
                              role: comment.author.role,
                              gender: comment.author.gender,
                            }}
                          />
                          <p className="min-w-0 text-xs text-[#aaa] break-all truncate flex-1">
                            {comment.content || "N/a"}
                          </p>
                        </Box>
                        <Box className="flex items-center gap-1 text-xs text-gray-500 truncate">
                          <FaPlay className="text-primary flex-shrink-0" />
                          <span className="block break-all flex-1 min-w-0 truncate">
                            {comment?.name || "N/a"}
                          </span>
                        </Box>
                      </Box>
                    </Link>
                  </SwiperSlide>
                ))}
              </SwiperContainer>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default LatestComments;
