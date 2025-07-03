"use client";

import { Avatar, Box } from "@chakra-ui/react";
import ChooseAvatarDialog from "./ChooseAvatarDialog";
import { useSession } from "next-auth/react";

const UserAvatar = () => {
  const { data: sesstion } = useSession();

  return (
    <Box className="flex flex-col gap-2 mt-3 justify-center items-center">
      <Avatar.Root size="2xl" className="border-4 border-[#25272f]">
        <Avatar.Fallback name={sesstion?.user?.username as string} />
        <Avatar.Image src={sesstion?.user?.image as string} />
      </Avatar.Root>
      <ChooseAvatarDialog />
    </Box>
  );
};

export default UserAvatar;
