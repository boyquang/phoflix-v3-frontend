type Feedback = {
  _id: string;
  content: string;
  created_at: number | string;
  is_spam: number;
  is_anonymous: boolean;
  mention_id: string | null;
  mention_user: {
    _id: string;
    name: string;
    avatar: string;
    is_anonymous: boolean;
  } | null;
  movie_slug: string;
  parent_id: string | null;
  reviews: {
    point: number | string;
  } | null;
  reviews_id: string | null;
  total_children: number;
  total_dislike: number;
  total_like: number;
  author: Author;
};

type FeedbackTable = {
  content: string;
  created_at: string;
  id: string;
  movie_slug: string;
  receiver_name: null;
  sender_name: string;
  total_dislikes: number;
  total_likes: number;
  is_spam?: boolean;
  point?: null;
  type: "comment" | "review" | "reply";
};

type Author = {
  _id: string;
  name: string;
  avatar: string;
  role: "member" | "admin";
  gender: "other" | "male" | "female";
};

type FeedbackSlice = {
  feedbackData: {
    items: Feedback[];
    loading: boolean;
    loadingMore: boolean;
    hasMore: boolean;
    totalFeedbacks: number;
    itemCount: number;
    error: boolean;
    showFeedbackId: string | null;
    fetched: boolean;
  };
  voteList: {
    userLikedFeedbacks: Record<string, string[]>;
    userDislikedFeedbacks: Record<string, string[]>;
    fetched: boolean;
  };
  repliesData: {
    data: Record<
      string,
      {
        items: Feedback[];
        hasMore: boolean;
        loading: boolean;
        itemCount: number;
        error: boolean;
      }
    >;
    showReplyId: string | null;
  };
  parentId: string | null;
  replyId: string | null;
  feedbackType: "comment" | "review";
  idEditFeedback: string | null;
};

type EditableFeedbackProps = {
  children: React.ReactNode;
  feedbackId: string;
  defaultValue?: string;
  readonly?: boolean;
};

type FeedbackItemProps = {
  feedback: Feedback;
};

type FeedbackActionsProps = {
  action: "comment" | "review" | "reply";
  data: FeedbackItemProps["feedback"];
};

type FeedbackInputProps = {
  action: "comment" | "reply";
  autoFocus?: boolean;
  feedback?: FeedbackItemProps["feedback"];
};

type ReplyItemProps = {
  reply: FeedbackItemProps["feedback"];
};

type ReplyListProps = {
  data: {
    items: FeedbackItemProps["feedback"][];
    hasMore: boolean;
  };
  loading: boolean;
};

type ReplySectionProps = {
  totalChildren: number;
};

type GetFeedbacks = {
  movieSlug: string;
  limit: number;
  type: "review" | "comment";
};

type AddFeedback = {
  movieData: {
    slug: string;
    thumb: string;
    poster: string;
    name: string;
  };
  userId: string;
  type: "review" | "comment";
  accessToken: string;
  is_anonymous?: boolean;
  point?: number;
  content?: string;
};

type DeleteFeedback = {
  feedbackId: string;
  userId: string;
  accessToken: string;
  rootFeedbackId?: string | null;
};

type UpdateContentFeedback = {
  feedbackId: string;
  userId: string;
  content: string;
  accessToken: string;
  rootFeedbackId?: string | null;
};

type AddReplyFeedback = {
  movieData: {
    slug: string;
    thumb: string;
    poster: string;
    name: string;
  };
  userId: string;
  content: string;
  type: "review" | "comment";
  parentId: string;
  accessToken: string;
  is_anonymous?: boolean;
};

type VoteFeedback = {
  movieSlug: string;
  userId: string;
  feedbackId: string;
  voteType: "like" | "dislike";
  accessToken: string;
};

type GetMoreFeedbacks = {
  movieSlug: string;
  type: "review" | "comment";
  limit: number;
  afterTime: number | string;
};

type GetReplyListFeedback = {
  parentId: string;
  limit: number;
  type: "review" | "comment";
};

type GetMoreReplyListFeedback = {
  parentId: string;
  limit: number;
  type: "review" | "comment";
  afterTime: number | string;
};

type MarkFeedbackAsSpam = {
  feedbackId: string;
  adminId: string;
  accessToken: string;
  spam: "0" | "1";
};
