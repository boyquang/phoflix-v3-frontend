import { createSlice } from "@reduxjs/toolkit";
import { fetchChatHistory } from "../async-thunks/chat-bot.thunk";
import { formatTimestamp } from "@/lib/utils";

interface ChatBotState {
  loading: boolean;
  error: boolean;
  hasMore: boolean;
  existChat: boolean;
  dailyChatLimit: number;
  fetched: boolean;
  chatHistory: Array<{
    id: string;
    role: "user" | "bot";
    content: string;
    movies: Movie[];
    createdAt: number; // Timestamp
  }>;
  loadingSendQuestion: boolean;
  groupedChatByDate: Array<{
    date: string;
    messages: Array<{
      id: string;
      role: "user" | "bot";
      content: string;
      createdAt: number;
      movies: Movie[];
    }>;
  }>;
}

const initialState: ChatBotState = {
  loading: false,
  error: false,
  existChat: false,
  hasMore: false,
  fetched: false,
  chatHistory: [],
  dailyChatLimit: 0,
  loadingSendQuestion: false,
  groupedChatByDate: [],
};

const chatBotSlice = createSlice({
  name: "chatBot",
  initialState,
  reducers: {
    setGroupedChatByDate: (state, action) => {
      const { date, message } = action.payload;

      // Kiểm tra nếu đã có nhóm với ngày này chưa
      const existingGroup = state.groupedChatByDate.find(
        (group) => group.date === date
      );

      // Nếu có thì thêm tin nhắn vào nhóm đó, nếu không thì tạo nhóm mới
      if (existingGroup) {
        existingGroup.messages.push(message);
      } else {
        state.groupedChatByDate.push({
          date,
          messages: [message],
        });
      }
    },
    setLoadingSendQuestion: (state, action) => {
      state.loadingSendQuestion = action.payload;
    },
    resetChat: (state) => {
      state.chatHistory = [];
      state.groupedChatByDate = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatHistory.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.existChat = action.payload.result?.existChat || false;
        state.hasMore = action.payload.result?.hasMore || false;
        state.dailyChatLimit = action.payload.result?.dailyChatLimit || 0;
        state.fetched = true;

        const newChats = action.payload.result?.chatHistory || [];

        // Gộp dữ liệu mới với dữ liệu cũ (prepend nếu load thêm)
        if (state.chatHistory.length > 0) {
          // Gộp tin nhắn cũ vào đầu danh sách
          state.chatHistory = [...newChats, ...state.chatHistory];
        } else {
          // Lần đầu gọi API
          state.chatHistory = newChats;
        }

        // Gộp nhóm lại theo ngày sau khi đã gộp toàn bộ chatHistory
        const grouped: Record<string, any[]> = {};

        state.chatHistory.forEach((chat: any) => {
          const date = formatTimestamp(chat.createdAt, "DD/MM/YYYY");

          // Nếu chưa có nhóm cho ngày này thì tạo mới
          if (!grouped[date]) {
            grouped[date] = [];
          }

          // Thêm tin nhắn vào nhóm tương ứng
          grouped[date].push({
            id: chat.id,
            role: chat.role,
            content: chat.content,
            movies: chat.movies || [],
            createdAt: chat.createdAt,
          });
        });

        state.groupedChatByDate = Object.entries(grouped).flatMap(
          ([date, messages]) => ({
            date,
            messages,
          })
        );
      })

      .addCase(fetchChatHistory.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.hasMore = false;
        state.fetched = false;
        state.existChat = false;
        state.chatHistory = [];
      });
  },
});

export const { resetChat, setGroupedChatByDate, setLoadingSendQuestion } =
  chatBotSlice.actions;
export default chatBotSlice.reducer;
