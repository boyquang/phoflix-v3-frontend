import { NEXT_PUBLIC_BACKEND_URL } from "@/constants/env.contant";
import { io } from "socket.io-client";

export const socket = io(NEXT_PUBLIC_BACKEND_URL);
