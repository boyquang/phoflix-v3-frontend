"use client";

import {
  completeRegistration,
  verifyToken,
} from "@/lib/actions/auth-server.action";
import { setIsShowAuthDialog, setTypeAuth } from "@/store/slices/system.slice";
import { AppDispatch } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const ClientWrapper = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const action = searchParams.get("action");
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    handleVerifyToken();
  }, []);

  const handleVerifyToken = async () => {
    try {
      const response = await verifyToken(token as string);

      if (!response?.status) {
        toast.error(response?.message);
        router.push("/");
        return;
      }

      if (action === "register") {
        const response = await completeRegistration(token as string);

        if (!response?.status) {
          toast.error(response?.message);
          router.push("/");
          return;
        }

        toast.success(response?.message);

        setTimeout(() => {
          dispatch(setTypeAuth("signin"));
          dispatch(setIsShowAuthDialog(true));
        }, 500);

        router.push("/");
      } else if (action === "reset-password") {
        toast.success(response?.message);

        setTimeout(() => {
          dispatch(setTypeAuth("reset-password"));
          dispatch(setIsShowAuthDialog(true));
        }, 500);

        router.push(
          `/?action=reset-password&email=${response?.result?.email}&token=${token}`
        );
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
  };

  return (
    <Box className="flex justify-center items-center min-h-screen">
      <h1 className="text-[#ffd875] lg:text-lg text-sm font-semibold">
        Đang xác thực token, vui lòng chờ trong giây lát...
      </h1>
    </Box>
  );
};

export default ClientWrapper;
