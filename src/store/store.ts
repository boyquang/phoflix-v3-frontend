import { configureStore } from "@reduxjs/toolkit";
import systemReducer from "./slices/system.slice";
import movieReducer from "./slices/movie.slice";
import userReducer from "./slices/user.slice";
import feedbackReducer from "./slices/feedback.slice";
import notificationReducer from "./slices/notification.slice";
import watchingTogetherReducer from "./slices/watching-together.slice";
import roomUsersReducer from "./slices/room-users.slice";
import chatBotReducer from "./slices/chat-bot.slice";
import crawlMoviesReducer from "./slices/crawl-movies.slice";

export const store = configureStore({
  reducer: {
    system: systemReducer,
    movie: movieReducer,
    user: userReducer,
    feedback: feedbackReducer,
    notification: notificationReducer,
    roomUsers: roomUsersReducer,
    chatBot: chatBotReducer,
    crawlMovies: crawlMoviesReducer,
    watchingTogether: watchingTogetherReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
