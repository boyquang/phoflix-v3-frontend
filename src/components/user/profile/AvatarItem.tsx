"use client";

import Image from "@/components/shared/Image";
import { Box } from "@chakra-ui/react";

interface AvatarItemProps {
  callback: (avatar: string) => void;
  isSelectedAvatar: boolean;
  avatar: string;
}

const AvatarItem = ({
  callback,
  isSelectedAvatar,
  avatar,
}: AvatarItemProps) => {
  return (
    <Box
      onClick={() => callback(avatar)}
      className={`relative cursor-pointer ${
        isSelectedAvatar
          ? "before:content-[''] before:absolute before:inset-0 before:border-4 before:border-white before:z-20 bg-blue-500"
          : ""
      }`}
    >
      <Box className="relative pb-[100%]">
        <Image
          className={`${isSelectedAvatar ? "opacity-100" : "opacity-60"}`}
          src={avatar}
          alt={avatar}
        />
      </Box>
    </Box>
  );
};

export default AvatarItem;
