"use client";

import { Box, HStack, Stack } from "@chakra-ui/react";
import AvatarUser from "../layout/header/AvatarUser";
import { useSession } from "next-auth/react";
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton";
import StatusTag from "./StatusTag";

const ProfileHeader = () => {
  const { data: session, status }: any = useSession();

  if (status === "loading") {
    return (
      <HStack gap="2">
        <SkeletonCircle size="9" />
        <Stack flex="1">
          <Skeleton height="3" />
          <Skeleton height="3" width="80%" />
        </Stack>
      </HStack>
    );
  }

  if (!session) return null;

  return (
    <Box className="flex gap-2 items-center">
      <AvatarUser src={session?.user.image} name={session?.user?.name} />
      <Box className="overflow-hidden">
        <Box className="flex items-center gap-2">
          {session?.user?.role === "admin" && <StatusTag text="ADMIN" />}
          <p className="text-sm font-semibold truncate text-gray-50">
            {session?.user?.name}
          </p>
        </Box>
        <p className="text-xs text-gray-500 truncate">{session?.user?.email}</p>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
