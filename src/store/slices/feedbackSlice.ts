import { createSlice } from "@reduxjs/toolkit";
import {
  deleteFeedback,
  getFeedbacks,
  getMoreFeedbacks,
  getMoreReplyListFeedback,
  getReplyListFeedback,
  getVoteListFeedback,
  addVote,
  updateContentFeedback,
} from "../asyncThunks/feedbackAsyncThunk";

const initialState: FeedbackSlice = {
  feedbackData: {
    items: [],
    itemCount: 0,
    totalFeedbacks: 0,
    error: false,
    hasMore: false,
    loading: false,
    loadingMore: false,
    showFeedbackId: null,
    fetched: false,
  },
  voteList: {
    userLikedFeedbacks: {},
    userDislikedFeedbacks: {},
    fetched: false,
  },
  repliesData: {
    data: {},
    showReplyId: null,
  },
  parentId: null,
  replyId: null,
  feedbackType: "comment",
  idEditFeedback: null,
};

const feedbackSlice = createSlice({
  name: "feedbackData",
  initialState,
  reducers: {
    setFeedbackType: (state, action) => {
      state.feedbackType = action.payload;
    },

    // Dùng để reply lại một feedback nào đó
    setParentId: (state, action) => {
      state.parentId = action.payload;
    },

    setReplyId: (state, action) => {
      state.replyId = action.payload;
    },

    setIdEditFeedback: (state, action) => {
      state.idEditFeedback = action.payload;
    },

    // Đặt ID của reply đang hiển thị (mở phần phản hồi)
    setShowReplyId: (state, action) => {
      state.repliesData.showReplyId = action.payload;
    },

    // Đặt ID feedback đang hiển thị chi tiết
    setShowFeedbackId: (state, action) => {
      state.feedbackData.showFeedbackId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedbacks.pending, (state) => {
      state.feedbackData.loading = true;
      state.feedbackData.error = false;
    });

    builder.addCase(getFeedbacks.fulfilled, (state, action) => {
      state.feedbackData.loading = false;
      state.feedbackData.items = action.payload?.result?.items || [];
      state.feedbackData.totalFeedbacks =
        action.payload?.result?.total_feedbacks;
      state.feedbackData.hasMore = action.payload?.result?.has_more || false;
      state.feedbackData.itemCount = action.payload?.result?.item_count || 0;
      state.feedbackData.error = false;
    });

    builder.addCase(getFeedbacks.rejected, (state) => {
      state.feedbackData.loading = false;
      state.feedbackData.error = true;
      state.feedbackData.items = [];
      state.feedbackData.totalFeedbacks = 0;
      state.feedbackData.hasMore = false;
      state.feedbackData.itemCount = 0;
    });

    builder.addCase(getMoreFeedbacks.pending, (state, action) => {
      state.feedbackData.loadingMore = true;
      state.feedbackData.error = false;
    });

    builder.addCase(getMoreFeedbacks.fulfilled, (state, action) => {
      state.feedbackData.loadingMore = false;
      state.feedbackData.items = [
        ...state.feedbackData.items,
        ...(action.payload?.result?.items || []),
      ];
      state.feedbackData.hasMore = action.payload?.result?.has_more ?? false;
      state.feedbackData.itemCount = action.payload?.result?.item_count ?? 0;
      state.feedbackData.error = false;
    });

    builder.addCase(getMoreFeedbacks.rejected, (state) => {
      state.feedbackData.loadingMore = false;
      state.feedbackData.error = true;
      state.feedbackData.items = [];
      state.feedbackData.totalFeedbacks = 0;
      state.feedbackData.hasMore = false;
      state.feedbackData.itemCount = 0;
    });

    builder.addCase(getReplyListFeedback.pending, (state, action) => {
      const parentId: string = action.meta.arg.parentId;

      if (!state.repliesData.data[parentId]) {
        state.repliesData.data[parentId] = {
          items: [],
          hasMore: false,
          loading: false,
          error: false,
          itemCount: 0,
        };
      }

      state.repliesData.data[parentId].loading = true;
      state.repliesData.data[parentId].error = false;
    });

    builder.addCase(getReplyListFeedback.fulfilled, (state, action) => {
      const parentId = action.meta.arg.parentId;

      if (!state.repliesData.data[parentId]) {
        state.repliesData.data[parentId] = {
          items: [],
          hasMore: false,
          loading: false,
          itemCount: 0,
          error: false,
        };
      }

      state.repliesData.data[parentId].loading = false;
      state.repliesData.data[parentId].items =
        action.payload?.result?.items || [];
      state.repliesData.data[parentId].hasMore =
        action.payload?.result?.has_more ?? false;
      state.repliesData.data[parentId].error = false;
    });

    builder.addCase(getReplyListFeedback.rejected, (state, action) => {
      const parentId = action.meta.arg.parentId;

      state.repliesData.data[parentId] = {
        items: [],
        hasMore: false,
        loading: false,
        error: false,
        itemCount: 0,
      };
    });

    builder.addCase(getMoreReplyListFeedback.pending, (state, action) => {
      const parentId = action.meta.arg.parentId;

      state.repliesData.data[parentId].loading = true;
      state.repliesData.data[parentId].error = false;
    });

    builder.addCase(getMoreReplyListFeedback.fulfilled, (state, action) => {
      const parentId = action.meta.arg.parentId;

      state.repliesData.data[parentId].loading = false;
      state.repliesData.data[parentId].items = [
        ...state.repliesData.data[parentId].items,
        ...(action.payload?.result?.items || []),
      ];
      state.repliesData.data[parentId].itemCount =
        action.payload?.result?.item_count ?? 0;
      state.repliesData.data[parentId].hasMore =
        action.payload?.result?.has_more ?? false;
      state.repliesData.data[parentId].error = false;
    });

    builder.addCase(getMoreReplyListFeedback.rejected, (state, action) => {
      const parentId = action.meta.arg.parentId;

      state.repliesData.data[parentId] = {
        items: [],
        itemCount: 0,
        hasMore: false,
        loading: false,
        error: false,
      };
    });

    builder.addCase(getVoteListFeedback.pending, (state, action) => {
      state.voteList.userLikedFeedbacks = {};
      state.voteList.userDislikedFeedbacks = {};
    });

    builder.addCase(getVoteListFeedback.fulfilled, (state, action) => {
      state.voteList.userLikedFeedbacks =
        action.payload?.result?.user_liked_feedbacks || [];
      state.voteList.userDislikedFeedbacks =
        action.payload?.result?.user_disliked_feedbacks || [];
      state.voteList.fetched = true;
    });

    builder.addCase(getVoteListFeedback.rejected, (state, action) => {
      state.voteList.userLikedFeedbacks = {};
      state.voteList.userDislikedFeedbacks = {};
      state.voteList.fetched = false;
    });

    builder.addCase(updateContentFeedback.pending, (state) => {});
    builder.addCase(updateContentFeedback.fulfilled, (state, action) => {
      const { feedbackId, content, rootFeedbackId } = action.meta.arg;

      // Xử lý khi cập nhật nội dung phản hồi gốc
      if (feedbackId === rootFeedbackId) {
        const feedbackIndex = state.feedbackData.items.findIndex(
          (feedback) => feedback._id === feedbackId
        );

        if (feedbackIndex !== -1) {
          state.feedbackData.items[feedbackIndex].content = content;
        }
      } else {
        if (rootFeedbackId) {
          const repliesData = state.repliesData.data[rootFeedbackId];

          if (repliesData) {
            const replyIndex = repliesData.items.findIndex(
              (reply) => reply._id === feedbackId
            );

            if (replyIndex !== -1) {
              repliesData.items[replyIndex].content = content;
            }
          }
        }
      }
    });
    builder.addCase(updateContentFeedback.rejected, (state) => {});

    builder.addCase(deleteFeedback.pending, (state) => {});
    builder.addCase(deleteFeedback.fulfilled, (state, action) => {
      const { feedbackId, rootFeedbackId } = action.meta.arg;

      if (feedbackId === rootFeedbackId) {
        const feedbackIndex = state.feedbackData.items.findIndex(
          (feedback) => feedback._id === feedbackId
        );
        if (feedbackIndex !== -1) {
          // Xóa phản hồi khỏi danh sách phản hồi gốc
          state.feedbackData.items.splice(feedbackIndex, 1);

          // Cập nhật số lượng phản hồi
          state.feedbackData.totalFeedbacks -= 1;

          // Cập nhật trạng thái hasMore
          state.feedbackData.hasMore =
            state.feedbackData.totalFeedbacks > state.feedbackData.itemCount;
        }
      } else {
        if (rootFeedbackId) {
          const repliesData = state.repliesData.data[rootFeedbackId];

          if (repliesData) {
            const replyIndex = repliesData.items.findIndex(
              (reply) => reply._id === feedbackId
            );

            if (replyIndex !== -1) {
              // Tìm vị trí phản hồi trong danh sách phản hồi gốc
              const rootFeedbackIndex = state.feedbackData.items.findIndex(
                (feedback) => feedback._id === rootFeedbackId
              );

              // Xóa phản hồi khỏi danh sách phản hồi gốc
              state.repliesData.data[rootFeedbackId].items.splice(
                replyIndex,
                1
              );

              // Cập nhật số lượng phản hồi trong phản hồi gốc
              state.feedbackData.items[rootFeedbackIndex].total_children -= 1;

              // Cập nhật số lượng phản hồi trong dữ liệu phản hồi gốc
              state.repliesData.data[rootFeedbackId].itemCount -= 1;

              // Cập nhật trạng thái hasMore
              state.repliesData.data[rootFeedbackId].hasMore =
                state.repliesData.data[rootFeedbackId].itemCount >
                state.repliesData.data[rootFeedbackId].items.length;
            }
          }
        }
      }
    });
    builder.addCase(deleteFeedback.rejected, (state) => {});

    builder.addCase(addVote.pending, (state) => {});
    builder.addCase(addVote.fulfilled, (state, action) => {
      const { userId, feedbackId, voteType } = action.meta.arg;

      const { userLikedFeedbacks, userDislikedFeedbacks } = state.voteList;

      // Khởi tạo nếu chưa có
      userLikedFeedbacks[feedbackId] = userLikedFeedbacks[feedbackId] || [];
      userDislikedFeedbacks[feedbackId] =
        userDislikedFeedbacks[feedbackId] || [];

      const likedUsers = userLikedFeedbacks[feedbackId];
      const dislikedUsers = userDislikedFeedbacks[feedbackId];

      const isLiked = likedUsers.includes(userId);
      const isDisliked = dislikedUsers.includes(userId);

      if (voteType === "like") {
        if (isDisliked) {
          // Đổi từ dislike sang like
          userDislikedFeedbacks[feedbackId] = dislikedUsers.filter(
            (id) => id !== userId
          );
          likedUsers.push(userId);
        } else if (isLiked) {
          // Gỡ like
          userLikedFeedbacks[feedbackId] = likedUsers.filter(
            (id) => id !== userId
          );
        } else {
          // Like lần đầu
          likedUsers.push(userId);
        }
      }

      if (voteType === "dislike") {
        if (isLiked) {
          // Đổi từ like sang dislike
          userLikedFeedbacks[feedbackId] = likedUsers.filter(
            (id) => id !== userId
          );
          dislikedUsers.push(userId);
        } else if (isDisliked) {
          // Gỡ dislike
          userDislikedFeedbacks[feedbackId] = dislikedUsers.filter(
            (id) => id !== userId
          );
        } else {
          // Dislike lần đầu
          dislikedUsers.push(userId);
        }
      }
    });

    builder.addCase(addVote.rejected, (state) => {});
  },
});

export const {
  setFeedbackType,
  setParentId,
  setShowReplyId,
  setShowFeedbackId,
  setReplyId,
  setIdEditFeedback,
} = feedbackSlice.actions;
export default feedbackSlice.reducer;
