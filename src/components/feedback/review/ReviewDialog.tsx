"use client";

import { AppDispatch, RootState } from "@/store/store";
import { Box, Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import ReviewSummary from "./ReviewSummary";
import ReviewEmo from "./ReviewEmo";
import ReviewComment from "./ReviewComment";
import { useEffect, useState, useTransition } from "react";
import { addFeedback, getStatsByMovie } from "@/lib/actions/feedbackAction";
import { useSession } from "next-auth/react";
import { setReviewContent } from "@/store/slices/userSlice";
import { getFeedbacks } from "@/store/asyncThunks/feedbackAsyncThunk";
import { handleShowToaster } from "@/lib/utils";
import { useParams } from "next/navigation";
import useSendSocketFeedback from "@/hooks/useSendSocketFeedback";
import { appConfig } from "@/configs/appConfig";

const { dialog } = appConfig.charka;
const motionPresetDefault = dialog.motionPresetDefault;

interface ReviewDialogProps {
  trigger: React.ReactNode;
}

const ReviewDialog = ({ trigger }: ReviewDialogProps) => {
  const params = useParams();
  const { sendSocketAddNewReview } = useSendSocketFeedback();
  const { data: session } = useSession();
  const dispatch: AppDispatch = useDispatch();
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);
  const { selectedReview, reviewContent } = useSelector(
    (state: RootState) => state.user.reviews
  );
  const { feedbackType } = useSelector((state: RootState) => state.feedback);
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [statsByMovie, setStatsByMovie] = useState({
    averagePoint: 0,
    totalReviews: 0,
  });

  useEffect(() => {
    if (movie && movie?.slug === params?.slug) {
      handleGetStatsByMovie();
    }
  }, [params?.slug]);

  const handleGetStatsByMovie = async () => {
    if (!movie) return;

    const response = await getStatsByMovie(movie.slug);

    if (response?.status) {
      setStatsByMovie({
        averagePoint: response?.result?.average_point,
        totalReviews: response?.result?.total_reviews,
      });
    }
  };

  const handleAddNewReview = () => {
    if (!movie) return;

    if (reviewContent?.trim() === "") {
      handleShowToaster(
        "Thông báo",
        "Nội dung đánh giá không được để trống",
        "error"
      );
      return;
    }

    startTransition(async () => {
      const response = await addFeedback({
        movieSlug: movie?.slug,
        userId: session?.user?.id as string,
        point: Number(selectedReview?.value),
        content: reviewContent as string,
        type: "review",
        accessToken: session?.user?.accessToken as string,
      });

      if (response?.status) {
        handleShowToaster("Thông báo", response?.message, "success");

        // làm mới feedback khi feedbackType là review
        if (feedbackType === "review") {
          await dispatch(
            getFeedbacks({
              movieSlug: movie.slug,
              type: "review",
              limit: 10,
            })
          );
        }

        // Refresh reviews
        handleGetStatsByMovie();

        // Send socket event to notify new review
        sendSocketAddNewReview();

        // Close dialog
        setOpen(false);

        // Reset review content
        dispatch(setReviewContent(""));
      } else {
        handleShowToaster("Thông báo", response?.message, "error");
      }
    });
  };

  return (
    <Dialog.Root
      size="xs"
      open={open}
      motionPreset={motionPresetDefault}
      onOpenChange={({ open }) => setOpen(open)}
      scrollBehavior="outside"
    >
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner
          css={{
            zIndex: "9999 !important",
          }}
        >
          <Dialog.Content className="relative text-gray-50 bg-[#2a314e] rounded-2xl backdrop-blur max-w-[600px] mx-4">
            <Dialog.CloseTrigger
              asChild
              className="absolute top-2 right-2 text-gray-300 hover:text-gray-100 hover:bg-transparent"
            >
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>

            <Dialog.Header>
              <Dialog.Title className="text-center">{movie?.name}</Dialog.Title>
              <ReviewSummary
                averagePoint={statsByMovie?.averagePoint}
                totalReviews={statsByMovie?.totalReviews}
              />
            </Dialog.Header>
            <Dialog.Body>
              <Box className="flex flex-col gap-6">
                <ReviewEmo />
                <ReviewComment />
              </Box>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  size="xs"
                  variant="solid"
                  className="bg-gray-50 text-gray-900 min-w-24"
                >
                  Hủy bỏ
                </Button>
              </Dialog.ActionTrigger>
              <Button
                loading={pending}
                onClick={handleAddNewReview}
                size="xs"
                className="min-w-24 shadow-primary bg-primary text-gray-900"
              >
                Gửi đánh giá
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ReviewDialog;
