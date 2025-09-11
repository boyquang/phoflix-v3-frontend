import {
  NEXT_PUBLIC_BACKEND_URL,
  NEXT_PUBLIC_CRAWL_MOVIES_URL,
} from "@/constants/env.contant";
import { io } from "socket.io-client";

export const socket = io(NEXT_PUBLIC_BACKEND_URL);
export const socketCrawlMovies = io(NEXT_PUBLIC_CRAWL_MOVIES_URL);
