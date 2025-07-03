"use client";

import ReviewDialog from "@/components/feedback/review/ReviewDialog";
import { showDialogSinInWhenNotLogin } from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import { Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { MdReviews } from "react-icons/md";
import { useDispatch } from "react-redux";

const ReviewButton = () => {
  const { data: session } = useSession();
  const dispatch: AppDispatch = useDispatch();

  if (!session) {
    return (
      <Button
        onClick={() => dispatch(showDialogSinInWhenNotLogin())}
        className="px-4 py-2 md:min-w-32 shadow-review-button text-gray-50 rounded-full bg-[#3556b6]"
      >
        <MdReviews />
        <span className="md:texts-sm text-xs block">Đánh giá</span>
      </Button>
    );
  }

  return (
    <ReviewDialog
      trigger={
        <Button className="px-4 py-2 shadow-review-button md:min-w-32 text-gray-50 rounded-full bg-[#3556b6]">
          <MdReviews />
          <span className="md:texts-sm text-xs block">Đánh giá</span>
        </Button>
      }
    />
  );
};

export default ReviewButton;
