"use client";

import { Box } from "@chakra-ui/react";

interface ChatTimeProps {
  date: string;
}

const ChatTime = ({ date }: ChatTimeProps) => {
  const [day, month, year] = date.split("/").map(Number);
  const inputDate = new Date(year, month - 1, day);
  const now = new Date();
  const isToday = inputDate.toDateString() === now.toDateString();

  return (
    <Box className="inline-block rounded-full px-2 py-0.5 text-center text-xs text-black shadow font-semibold bg-white">
      {isToday ? "Hôm nay" : date}
    </Box>
  );
};

export default ChatTime;
